// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // Import ERC20 interface

contract ApplicationLoan {
    struct Loan {
        address owner;
        string title;
        string description;
        uint256 amount;
        uint256 target;
        uint256 deadline;
        uint256 isLoanActive;
        bool acceptedTerms;
        address[] guarantors;
        uint256[] guaranteedAmounts;
        uint256 totalPaid;
        uint256 totalGuaranteed;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanCounter;
    IERC20 public stablecoin; // Stablecoin interface

    // Constructor to initialize stablecoin address
    constructor(address _stablecoinAddress) {
        stablecoin = IERC20(_stablecoinAddress);
    }

    // Create a loan with necessary details
    function createLoan(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _target,
        uint256 _deadline,
        bool _acceptedTerms
    ) public returns (uint256) {
        require(_acceptedTerms, "Terms and conditions must be accepted.");
        require(_acceptedTerms, "Terms and conditions must be accepted.");

        loanCounter++;
        loans[loanCounter] = Loan(
            msg.sender,
            _title,
            _description,
            _amount,
            _target,
            _deadline,
            1,
            _acceptedTerms,
            new address [](0) ,
            new uint256 [](0) ,
            0,
            0
        );
        return loanCounter;
    }

    // Become a guarantor for a specific loan
    function becomeGuarantor(uint256 _loanId, uint256 _amount) public {
        require(
            !hasUnpaidLoans(msg.sender),
            "User has unpaid loans and cannot be a guarantor."
        );
        Loan storage loan = loans[_loanId];
        require(loan.isLoanActive == 1, "Loan is not accepting guarantees.");
        require(loan.isLoanActive == 1, "Loan is not accepting guarantees.");
        require(
            loan.totalGuaranteed + _amount <= loan.amount,
            "Guarantee exceeds loan amount."
        );

        // Transfer stablecoin from guarantor to the contract
        require(
            stablecoin.transferFrom(msg.sender, address(this), _amount),
            "Stablecoin transfer failed."
        );

        loan.guarantors.push(msg.sender);
        loan.guaranteedAmounts.push(_amount);
        loan.totalGuaranteed += _amount;

        if (loan.totalGuaranteed == loan.amount) {
            loan.isLoanActive = 2; // Mark loan as fully guaranteed
        }
    }

    // Provide the loan amount after all guarantees are fulfilled
    function provideLoan(uint256 _loanId, uint256 _amount) public {
        Loan storage loan = loans[_loanId];
        require(loan.isLoanActive == 2, "Loan is not fully guaranteed yet.");
        require(loan.isLoanActive == 2, "Loan is not fully guaranteed yet.");
        require(_amount == loan.amount, "Loan amount does not match.");

        // Transfer stablecoin from provider to the borrower
        require(
            stablecoin.transferFrom(msg.sender, loan.owner, _amount),
            "Stablecoin transfer failed."
        );

        loan.isLoanActive = 3; // Mark loan as active
    }

    // Make a payment for a loan
    function makePayment(uint256 _loanId, uint256 _amount) public {
        require(
            loans[_loanId].isLoanActive == 3,
            "Loan is not active for payment."
        );
        require(
            msg.sender == loans[_loanId].owner,
            "Only the borrower can make payments."
        );

        // Transfer stablecoin from borrower to the contract
        require(
            stablecoin.transferFrom(msg.sender, address(this), _amount),
            "Stablecoin transfer failed."
        );

        // Record the payment
        loans[_loanId].totalPaid += _amount;

        // Check if loan is fully paid
        if (loans[_loanId].totalPaid >= loans[_loanId].amount) {
            loans[_loanId].isLoanActive = 4; // Mark loan as fully paid
        }
    }

    // Check if a user has any unpaid loans
    function hasUnpaidLoans(address _user) public view returns (bool) {
        for (uint256 i = 1; i <= loanCounter; i++) {
            if (loans[i].owner == _user && loans[i].isLoanActive != 4) {
                return true; // User has unpaid loans
            }
        }
        return false; // No unpaid loans
    }

    // Verify if a loan has received full guarantees
    function isGuaranteeAprop(uint256 _loanId) public view returns (bool) {
        Loan storage loan = loans[_loanId];
        return loan.totalGuaranteed == loan.amount;
    }

    // Get loan details
    function getLoan(uint256 _loanId) public view returns (LoanDetails memory) {
        Loan storage loan = loans[_loanId];
        return
            LoanDetails(
                loan.owner,
                loan.title,
                loan.description,
                loan.amount,
                loan.target,
                loan.deadline,
                loan.isLoanActive,
                loan.acceptedTerms,
                loan.guarantors,
                loan.guaranteedAmounts,
                loan.totalPaid,
                loan.totalGuaranteed
            );
    }

    struct LoanDetails {
        address owner;
        string title;
        string description;
        uint256 amount;
        uint256 target;
        uint256 deadline;
        uint256 isLoanActive;
        bool acceptedTerms;
        address[] guarantors;
        uint256[] guaranteedAmounts;
        uint256 totalPaid;
        uint256 totalGuaranteed;
    }

    // Get all loans details
    function getAllLoans() public view returns (LoanDetails[] memory) {
        LoanDetails[] memory allLoans = new LoanDetails[](loanCounter);

        for (uint256 i = 1; i <= loanCounter; i++) {
            Loan storage loan = loans[i];
            allLoans[i - 1] = LoanDetails(
                loan.owner,
                loan.title,
                loan.description,
                loan.amount,
                loan.target,
                loan.deadline,
                loan.isLoanActive,
                loan.acceptedTerms,
                loan.guarantors,
                loan.guaranteedAmounts,
                loan.totalPaid,
                loan.totalGuaranteed
            );
        }

        return allLoans;
    }

    // Get all approved loans
    function allLoanApprove() public view returns (Loan[] memory) {
        uint256 totalApprovedLoans = 0;

        for (uint256 i = 1; i <= loanCounter; i++) {
            if (loans[i].isLoanActive == 2) {
                totalApprovedLoans++;
            }
        }

        Loan[] memory approvedLoans = new Loan[](totalApprovedLoans);
        uint256 index = 0;

        for (uint256 i = 1; i <= loanCounter; i++) {
            if (loans[i].isLoanActive == 2) {
                approvedLoans[index] = loans[i];
                index++;
            }
        }

        return approvedLoans;
    }
}
