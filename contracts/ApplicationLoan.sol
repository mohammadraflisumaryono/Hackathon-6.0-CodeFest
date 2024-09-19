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
        address[] guarantors;
        uint256[] guaranteedAmounts;
        uint256 totalPaid;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanCounter;
    Transaction public transactionContract;

    constructor(address _transactionContractAddress) {
        transactionContract = Transaction(_transactionContractAddress);
    }

    function createLoan(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        loanCounter++;
        loans[loanCounter] = Loan(
            msg.sender,
            _title,
            _description,
            _amount,
            _target,
            _deadline,
            1,
            new address[](0), // Initialize guarantors as empty array
            new uint256[](0), // Initialize guaranteed amounts as empty array
            0 // Initialize total paid as 0
        );
        return loanCounter;
    }

    function makePayment(uint256 _loanId, uint256 _amount) public {
        require(loans[_loanId].isLoanActive == 2, "Loan is not active.");
        require(
            msg.sender == loans[_loanId].owner,
            "Only the borrower can make payments."
        );

        // Record the payment
        loans[_loanId].totalPaid += _amount;

        // Call Transaction contract to log the payment
        transactionContract.recordPayment(
            loans[_loanId].owner,
            msg.sender, // Assume lender is sender in this case
            _loanId,
            _amount
        );

        // Check if loan is fully paid
        if (loans[_loanId].totalPaid >= loans[_loanId].amount) {
            loans[_loanId].isLoanActive = 3; // Mark loan as fully paid
        }
    }

    struct LoanDetails {
        address owner;
        string title;
        string description;
        uint256 amount;
        uint256 target;
        uint256 deadline;
        uint256 isLoanActive;
        address[] guarantors;
        uint256[] guaranteedAmounts;
        uint256 totalPaid;
    }

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
                loan.guarantors,
                loan.guaranteedAmounts,
                loan.totalPaid
            );
    }
}
