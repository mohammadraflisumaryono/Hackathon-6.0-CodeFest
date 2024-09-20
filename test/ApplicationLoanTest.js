const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ApplicationLoan Contract", function () {
  let applicationLoan;
  let transactionContract;
  let owner, borrower, guarantor;
  let loanId;

  beforeEach(async function () {
    [owner, borrower, guarantor] = await ethers.getSigners();
  
    // Menggunakan ethers.getContractFactory untuk mempersiapkan Transaction contract
    const Transaction = await ethers.getContractFactory("Transaction");
    transactionContract = await Transaction.deploy(); // Deploy kontrak
    await transactionContract.deployed(); // Tunggu sampai kontrak selesai di-deploy
  
    // Deploy ApplicationLoan dan pasang address dari Transaction contract
    const ApplicationLoan = await ethers.getContractFactory("ApplicationLoan");
    applicationLoan = await ApplicationLoan.deploy(transactionContract.address); // Deploy dengan alamat kontrak Transaction
    await applicationLoan.deployed(); // Tunggu sampai deployment selesai
  });
  
  
  it("Should create a loan correctly", async function () {
    const createTx = await applicationLoan
      .connect(borrower)
      .createLoan("Car Loan", "Loan for a new car", 1000, 1500, 10);
    const receipt = await createTx.wait();

    // Check that the loan is created
    const loanCounter = await applicationLoan.loanCounter();
    loanId = loanCounter.toNumber();
    expect(loanCounter).to.equal(1);

    const loan = await applicationLoan.getLoan(loanId);
    expect(loan.owner).to.equal(borrower.address);
    expect(loan.title).to.equal("Car Loan");
    expect(loan.amount).to.equal(1000);
    expect(loan.isLoanActive).to.equal(1);
  });

  it("Should prevent making payments on inactive loans", async function () {
    await applicationLoan
      .connect(borrower)
      .createLoan("Car Loan", "Loan for a new car", 1000, 1500, 10);

    loanId = await applicationLoan.loanCounter();

    await expect(
      applicationLoan.connect(borrower).makePayment(loanId, 500)
    ).to.be.revertedWith("Loan is not active.");
  });

  it("Should allow borrower to make payments", async function () {
    await applicationLoan
      .connect(borrower)
      .createLoan("Car Loan", "Loan for a new car", 1000, 1500, 10);

    loanId = await applicationLoan.loanCounter();

    // Set loan to active (simulate loan activation, as no function for that exists)
    await applicationLoan
      .connect(borrower)
      .loans(loanId)
      .then((loan) => {
        loan.isLoanActive = 2;
      });

    await applicationLoan.connect(borrower).makePayment(loanId, 500);
    const loan = await applicationLoan.getLoan(loanId);

    expect(loan.totalPaid).to.equal(500);
    expect(loan.isLoanActive).to.equal(2);
  });

  it("Should prevent becoming a guarantor with unpaid loans", async function () {
    await applicationLoan
      .connect(borrower)
      .createLoan("Home Loan", "Loan for a new home", 5000, 5500, 15);

    loanId = await applicationLoan.loanCounter();

    await expect(
      applicationLoan.connect(borrower).becomeGuarantor(loanId, 1000)
    ).to.be.revertedWith("User has unpaid loans and cannot be a guarantor.");
  });

  it("Should allow becoming a guarantor if no unpaid loans", async function () {
    await applicationLoan
      .connect(borrower)
      .createLoan("Car Loan", "Loan for a new car", 1000, 1500, 10);

    loanId = await applicationLoan.loanCounter();

    await applicationLoan.connect(guarantor).becomeGuarantor(loanId, 500);
    const loan = await applicationLoan.getLoan(loanId);

    expect(loan.guarantors).to.include(guarantor.address);
    expect(loan.guaranteedAmounts[0]).to.equal(500);
  });

  it("Should verify the total guarantee matches loan amount", async function () {
    await applicationLoan
      .connect(borrower)
      .createLoan("Car Loan", "Loan for a new car", 1000, 1500, 10);

    loanId = await applicationLoan.loanCounter();

    // First guarantor guarantees part of the loan
    await applicationLoan.connect(guarantor).becomeGuarantor(loanId, 500);

    // Another guarantor guarantees the rest
    await applicationLoan.connect(owner).becomeGuarantor(loanId, 500);

    const isFullyGuaranteed = await applicationLoan.isGuaranteeAprop(loanId);
    expect(isFullyGuaranteed).to.be.false;

    // Final guarantor guarantees the remaining amount
    await applicationLoan.connect(guarantor).becomeGuarantor(loanId, 500);
    const isFullyGuaranteedNow = await applicationLoan.isGuaranteeAprop(loanId);
    expect(isFullyGuaranteedNow).to.be.true;
  });
});
