// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Transaction.sol"; // Import contract Transaction

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
    Transaction public transactionContract;

    constructor(address _transactionContractAddress) {
        transactionContract = Transaction(_transactionContractAddress);
    }

    // Modify the createLoan function to include the acceptedTerms parameter
    function createLoan(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _target,
        uint256 _deadline,
        bool _acceptedTerms 
    ) public returns (uint256) {
        require(_acceptedTerms, "Terms and conditions must be accepted."); // Check if terms are accepted

        loanCounter++;
        loans[loanCounter] = Loan(
            msg.sender,
            _title,
            _description,
            _amount,
            _target,
            _deadline,
            1, // Loan is active
            _acceptedTerms, // Set the acceptedTerms value
            new address[](0),
            new uint256[](0),
            0, // Initialize total paid as 0
            0 // Initialize total guaranteed as 0
        );
        return loanCounter;
    }

    // Modify the becomeGuarantor function to update totalGuaranteed
    function becomeGuarantor(uint256 _loanId, uint256 _amount) public {
        require(!hasUnpaidLoans(msg.sender), "User has unpaid loans and cannot be a guarantor.");
        Loan storage loan = loans[_loanId];
        require(loan.isLoanActive == 1, "Loan is not accepting guarantees."); // Ensure loan is active for guarantees
        require(loan.totalGuaranteed + _amount <= loan.amount, "Guarantee exceeds loan amount.");

        // Add guarantor and guaranteed amount
        loan.guarantors.push(msg.sender);
        loan.guaranteedAmounts.push(_amount);
        loan.totalGuaranteed += _amount;

        // Record guarantee in Transaction contract
        transactionContract.recordGuarantee(msg.sender, _loanId, _amount);

        // If total guarantees match the loan amount, mark loan as ready for funding
        if (loan.totalGuaranteed == loan.amount) {
            loan.isLoanActive = 2; // Loan is fully guaranteed and ready for lending
        }
    }

    // Lender provides the loan once the full guarantee is met
    function provideLoan(uint256 _loanId, uint256 _amount) public {
        Loan storage loan = loans[_loanId];
        require(loan.isLoanActive == 2, "Loan is not fully guaranteed yet."); // Ensure loan is fully guaranteed
        require(_amount == loan.amount, "Loan amount does not match.");

        // Record the loan disbursement in the Transaction contract
        transactionContract.recordPayment(msg.sender, loan.owner, _loanId, _amount);

        loan.isLoanActive = 3; // Mark loan as funded
    }

    function makePayment(uint256 _loanId, uint256 _amount) public {
        require(loans[_loanId].isLoanActive == 3, "Loan is not active for payment.");
        require(msg.sender == loans[_loanId].owner, "Only the borrower can make payments.");

        // Record the payment
        loans[_loanId].totalPaid += _amount;

        // Call Transaction contract to log the payment
        transactionContract.recordPayment(loans[_loanId].owner, msg.sender, _loanId, _amount);

        // Check if loan is fully paid
        if (loans[_loanId].totalPaid >= loans[_loanId].amount) {
            loans[_loanId].isLoanActive = 4; // Mark loan as fully paid
        }
    }

    function hasUnpaidLoans(address _user) public view returns (bool) {
        for (uint256 i = 1; i <= loanCounter; i++) {
            if (loans[i].owner == _user && loans[i].isLoanActive != 4) {
                return true; // User has unpaid loans
            }
        }
        return false; // No unpaid loans
    }

    function isGuaranteeAprop(uint256 _loanId) public view returns (bool) {
        Loan storage loan = loans[_loanId];
        return loan.totalGuaranteed == loan.amount;
    }

    struct LoanDetails {
        address owner;
        string title;
        string description;
        uint256 amount;
        uint256 target;
        uint256 deadline;
        uint256 isLoanActive;
        bool acceptedTerms; // Include the acceptedTerms in LoanDetails
        address[] guarantors;
        uint256[] guaranteedAmounts;
        uint256 totalPaid;
        uint256 totalGuaranteed;
    }

    function getLoan(uint256 _loanId) public view returns (LoanDetails memory) {
        Loan storage loan = loans[_loanId];
        return LoanDetails(
            loan.owner,
            loan.title,
            loan.description,
            loan.amount,
            loan.target,
            loan.deadline,
            loan.isLoanActive,
            loan.acceptedTerms, // Return the acceptedTerms status
            loan.guarantors,
            loan.guaranteedAmounts,
            loan.totalPaid,
            loan.totalGuaranteed
        );
    }

   function getAllLoans() public view returns (LoanDetails[] memory) {
    // Buat array untuk menyimpan semua LoanDetails
    LoanDetails[] memory allLoans = new LoanDetails[](loanCounter); // `loanCounter` adalah total jumlah pinjaman
    
    // Iterasi melalui setiap loan dan simpan ke dalam array allLoans
    for (uint256 i = 0; i < loanCounter; i++) {
        Loan storage loan = loans[i];
        allLoans[i] = LoanDetails(
            loan.owner,
            loan.title,
            loan.description,
            loan.amount,
            loan.target,
            loan.deadline,
            loan.isLoanActive,
            loan.acceptedTerms, // Mengambil status acceptedTerms
            loan.guarantors,
            loan.guaranteedAmounts,
            loan.totalPaid,
            loan.totalGuaranteed
        );
    }

    return allLoans; // Kembalikan array yang berisi semua LoanDetails
}

}
