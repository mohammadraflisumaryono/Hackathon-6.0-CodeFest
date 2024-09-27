// ignition/modules/UserManagement.js

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UserManagementModule", (m) => {
    // Step 1: Deploy the UserManagement contract
    const userManagement = m.contract("UserManagement");

    // Return the deployed contract
    return { userManagement };
});
