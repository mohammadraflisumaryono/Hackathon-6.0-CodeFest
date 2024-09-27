import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { AuthContext } from '../App'; // AuthContext manages global auth state
import { getUserManagementContractInstance, UserManagementInterface } from '../contracts/UserManagement'; // Contract instance

const Login = () => {
  const [account, setAccount] = useState(''); // User's wallet account
  const [name, setName] = useState(''); // User's name
  const [password, setPassword] = useState(''); // User's password
  const [contract, setContract] = useState(null); // UserManagement contract instance
  const [error, setError] = useState(''); // Error messages
  const [isContractInitialized, setIsContractInitialized] = useState(false); // Contract init status
  const navigate = useNavigate(); // Router navigation
  const { setIsLoggedIn } = useContext(AuthContext); // Global login state from context

  // Connect wallet and initialize the contract
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []); // Request wallet connection
        setAccount(accounts[0]); // Set the connected account
        const signer = await provider.getSigner(); // Get signer to sign transactions
        const contractInstance = getUserManagementContractInstance(signer); // Initialize the contract
        setContract(contractInstance); // Set contract instance in state
        setIsContractInitialized(true); // Mark contract as initialized
        console.log("Contract initialized:", contractInstance);
      } catch (error) {
        console.error("Failed to connect wallet or initialize contract:", error);
        setError("Failed to connect wallet. Please try again.");
      }
    } else {
      setError("Please install MetaMask!");
    }
  };

  // Register new user
  const registerUser = async () => {
    if (!isContractInitialized) {
      setError("Contract is not initialized. Please connect your wallet first.");
      return;
    }
    if (!account || !name || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const result = await UserManagementInterface.register(contract, account, name, password); // Call smart contract
      await result.wait(); // Wait for transaction confirmation
      console.log("Registration successful!");
      setIsLoggedIn(true); // Update global state to logged in
      navigate('/penjamin'); // Redirect after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please check the console for details.");
    }
  };

  // Login existing user
  const loginUser = async () => {
    if (!isContractInitialized) {
      setError("Contract is not initialized. Please connect your wallet first.");
      return;
    }
    if (!account || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const result = await UserManagementInterface.login(contract, account, password); // Call smart contract for login
      await result.wait(); // Wait for transaction confirmation
      console.log("Login successful!");
      setIsLoggedIn(true); // Update global state to logged in
      navigate('/penjamin'); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your password and try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Login/Register</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Connect Wallet Button */}
        <button
          onClick={connectWallet}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg mb-4 ${account ? 'bg-green-500' : 'bg-blue-500'}`}
        >
          {account ? "Wallet Connected" : "Connect Wallet"}
        </button>

        {/* Display connected wallet address */}
        {account && <p className="text-green-500 mb-4 text-center">Connected account: {account}</p>}

        {/* Input fields for name and password */}
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

        {/* Register and Login Buttons */}
        <div className="flex justify-between">
          <button
            onClick={registerUser}
            className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 font-semibold"
            disabled={!isContractInitialized}
          >
            Register
          </button>
          <button
            onClick={loginUser}
            className="w-1/2 bg-green-500 text-white py-2 px-4 rounded-lg ml-2 font-semibold"
            disabled={!isContractInitialized}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
