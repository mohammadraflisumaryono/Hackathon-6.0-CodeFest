import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Asumsikan bahwa fungsi ini diimpor dari file terpisah
// yang berisi logika untuk berinteraksi dengan kontrak
import { getUserManagementContractInstance } from '../contracts/UserManagement';

const Login = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [contract, setContract] = useState(null);
  const [error, setError] = useState('');
  const [isContractInitialized, setIsContractInitialized] = useState(false);

  useEffect(() => {
    const initContract = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Pastikan ethers tersedia
          if (typeof ethers === 'undefined') {
            throw new Error('Ethers library tidak tersedia');
          }

          // Gunakan BrowserProvider untuk ethers v6
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractInstance = await getUserManagementContractInstance(signer);
          setContract(contractInstance);
          setIsContractInitialized(true);
          console.log("Contract initialized:", contractInstance);
        } catch (error) {
          console.error("Failed to initialize contract:", error);
          setError(`Gagal menginisialisasi kontrak: ${error.message}`);
          setIsContractInitialized(false);
        }
      } else {
        setError("Ethereum provider tidak ditemukan. Silakan instal MetaMask!");
        setIsContractInitialized(false);
      }
    };

    initContract();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          console.log("Connected account:", accounts[0]);
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        setError("Gagal menghubungkan dompet. Silakan coba lagi.");
      }
    } else {
      setError("Silakan instal MetaMask!");
    }
  };

  const registerUser = async () => {
    if (!isContractInitialized) {
      setError("Kontrak belum diinisialisasi. Silakan coba lagi nanti.");
      return;
    }
    if (!contract) {
      setError("Kontrak tidak tersedia. Silakan coba lagi nanti.");
      return;
    }
    if (!account) {
      setError("Silakan hubungkan dompet Anda terlebih dahulu.");
      return;
    }
    if (!name || !password) {
      setError("Silakan isi semua kolom.");
      return;
    }

    try {
      const result = await contract.register(account, name, password);
      console.log("Registration result:", result);

      // Tunggu transaksi selesai
      await result.wait();

      alert("Pendaftaran berhasil!");
      setName('');
      setPassword('');
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.message.includes("User already exists")) {
        setError("Alamat ini sudah terdaftar. Silakan masuk.");
      } else {
        setError("Pendaftaran gagal. Lihat konsol untuk detailnya.");
      }
    }
  };

  const loginUser = async () => {
    if (!isContractInitialized || !contract) {
      setError("Kontrak belum diinisialisasi. Silakan coba lagi nanti.");
      return;
    }
    if (!account) {
      setError("Silakan hubungkan dompet Anda terlebih dahulu.");
      return;
    }
    try {
      const result = await contract.login(account, password);
      console.log("Login result:", result);
      
      // Tunggu transaksi selesai
      await result.wait();

      alert("Login berhasil!");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login gagal. Lihat konsol untuk detailnya.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Login/Register</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          onClick={connectWallet}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg mb-4 ${
            account ? 'bg-green-500' : 'bg-blue-500'
          }`}
        >
          {account ? "Dompet Terhubung" : "Hubungkan Dompet"}
        </button>

        {account && <p className="text-green-500 mb-4 text-center">Akun terhubung: {account}</p>}

        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
        />

        <div className="flex justify-between">
          <button
            onClick={registerUser}
            className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 font-semibold"
            disabled={!isContractInitialized}
          >
            Daftar
          </button>
          <button
            onClick={loginUser}
            className="w-1/2 bg-green-500 text-white py-2 px-4 rounded-lg ml-2 font-semibold"
            disabled={!isContractInitialized}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;