require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // URL Ganache
      accounts: [
       '0xc2c5eba85cdd7025c095275417b301e643822119c0e8ac1b4ee811f79d375d0d'
      ],
    },
  },
};
