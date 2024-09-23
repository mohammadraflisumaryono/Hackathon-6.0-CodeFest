// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TransactionModule", (m) => {
  // Step 1: Deploy the Transaction contract
  const transaction = m.contract("Transaction");

  // Return the deployed contract
  return { transaction };
});
