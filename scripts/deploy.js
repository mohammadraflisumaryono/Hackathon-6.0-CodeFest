const hre = require("hardhat");

async function main() {
    // Deploy Transaction contract
    const Transaction = await hre.ethers.getContractFactory("Transaction");
    const transaction = await Transaction.deploy();
    await transaction.deployed();
    console.log("Transaction contract deployed to:", transaction.address);

    // Deploy ApplicationLoan contract with Transaction contract address
    const ApplicationLoan = await hre.ethers.getContractFactory("ApplicationLoan");
    const applicationLoan = await ApplicationLoan.deploy(transaction.address); // Pass Transaction contract address
    await applicationLoan.deployed();
    console.log("ApplicationLoan contract deployed to:", applicationLoan.address);

    // Deploy UserManagement contract
    const UserManagement = await hre.ethers.getContractFactory("UserManagement");
    const userManagement = await UserManagement.deploy();
    await userManagement.deployed();
    console.log("UserManagement contract deployed to:", userManagement.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();
