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
            new address ,
            new uint256 ,
            0 // Initialize total paid as 0
        );
        return loanCounter;
    }

    function makePayment(uint256 _loanId, uint256 _amount) public {
        require(loans[_loanId].isLoanActive == 2, "Loan is not active.");
        require(msg.sender == loans[_loanId].owner, "Only the borrower can make payments.");

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

    function getLoan(uint256 _loanId)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256,
            address[] memory,
            uint256[] memory,
            uint256
        )
    {
        return (
            loans[_loanId].owner,
            loans[_loanId].title,
            loans[_loanId].description,
            loans[_loanId].amount,
            loans[_loanId].target,
            loans[_loanId].deadline,
            loans[_loanId].isLoanActive,
            loans[_loanId].guarantors,
            loans[_loanId].guaranteedAmounts,
            loans[_loanId].totalPaid
        );
    }
}
