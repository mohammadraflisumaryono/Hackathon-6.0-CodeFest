const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UserManagementModule", (m) => {
    const userManagement = m.contract("UserManagement");

    m.call(userManagement, "register", [
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "John Doe",
        "password123"
    ]);

    m.call(userManagement, "login", [
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "password123"
    ]);

    return { userManagement };
});