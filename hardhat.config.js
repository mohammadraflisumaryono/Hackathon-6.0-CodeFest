require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // URL Ganache
      accounts: [
       '0x1200cef6d0c9a580f04c7a8ffa71cf1f3f35f40fc9561ebcccf7118f8c309994'
      ],
    },
  },
};
