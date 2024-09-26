// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ApplicationLoan", (m) => {
  // Step 1: Parameter for Transaction contract address

  console.log("m.getParameter('transactionContractAddress')", m.getParameter("transactionContractAddress"));
  const transactionContractAddress = m.getParameter("transactionContractAddress");

  // Step 2: Deploy the Transaction contract
  const transaction = m.contract("Transaction");

  // Step 3: Deploy ApplicationLoan contract, passing the deployed Transaction contract address
  const applicationLoan = m.contract("ApplicationLoan", [transactionContractAddress || transaction]);

  // Step 4: Deploy UserManagement contract
  const userManagement = m.contract("UserManagement");

  // Return the deployed contracts
  return { transaction, applicationLoan, userManagement };
});
