require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // URL Ganache
      accounts: [
        // Masukkan private key akun Ganache di sini (tanpa 0x di depan)
        "PRIVATE_KEY_1",
        "PRIVATE_KEY_2",
        // Tambahkan akun lain jika perlu
      ],
    },
  },
};
