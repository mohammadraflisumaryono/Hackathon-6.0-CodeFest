import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getUserManagementContractInstance, UserManagementInterface } from '../contracts/UserManagement';

const Login = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = getUserManagementContractInstance(signer);
        setContract(contractInstance);
      }
    };

    initContract();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const registerUser = async () => {
    if (!contract || !account) {
      alert("Please connect your wallet and ensure the contract is initialized.");
      return;
    }
    try {
      const result = await UserManagementInterface.register(contract, account, name, password);
      console.log("Registration result:", result);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. See console for details.");
    }
  };

  const loginUser = async () => {
    if (!contract || !account) {
      alert("Please connect your wallet and ensure the contract is initialized.");
      return;
    }
    try {
      const result = await UserManagementInterface.login(contract, account, password);
      console.log("Login result:", result);
      if (result) {
        alert("Login successful!");
      } else {
        alert("Login failed. Incorrect password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. See console for details.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Login/Register</h2>

      <button
        onClick={connectWallet}
        className={`w-full py-2 px-4 text-white font-semibold rounded-lg mb-4 ${
          account ? 'bg-green-500' : 'bg-blue-500'
        }`}
      >
        {account ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {account && <p className="text-green-500 mb-4 text-center">Connected account: {account}</p>}

      <input
        type="text"
        placeholder="Name"
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
        >
          Register
        </button>
        <button
          onClick={loginUser}
          className="w-1/2 bg-green-500 text-white py-2 px-4 rounded-lg ml-2 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
