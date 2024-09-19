import { ethers } from 'ethers';

// Alamat kontrak yang sudah di-deploy
const contractAddress = '0x1234567890123456789012345678901234567890'; // Ganti dengan alamat kontrak yang sebenarnya

// ABI dari kontrak UserManagement
const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_address", "type": "address" },
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_password", "type": "string" }
    ],
    "name": "register",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_address", "type": "address" },
      { "internalType": "string", "name": "_password", "type": "string" }
    ],
    "name": "login",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }],
    "name": "checkIsUserLogged",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }],
    "name": "logout",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Fungsi untuk mendapatkan instance kontrak
export const getUserManagementContractInstance = (provider) => {
  return new ethers.Contract(contractAddress, contractABI, provider);
};

// Objek dengan fungsi-fungsi untuk berinteraksi dengan kontrak
export const UserManagementInterface = {
  register: async (contract, address, name, password) => {
    return await contract.register(address, name, password);
  },
  login: async (contract, address, password) => {
    return await contract.login(address, password);
  },
  checkIsUserLogged: async (contract, address) => {
    return await contract.checkIsUserLogged(address);
  },
  logout: async (contract, address) => {
    return await contract.logout(address);
  }
};