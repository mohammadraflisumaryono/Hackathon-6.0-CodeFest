import React, { useEffect, useState } from 'react';
import { ethers, Contract } from 'ethers';
import { contractABI, contractAddress } from '../utils/ApllicationLoan';
import FormPeminjaman from '../components/formPeminjaman';

export const ApplicationLoanContext = React.createContext();

// Function to get the contract instance
const getEthereumContract = async () => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider not found");
    }

    console.log("Ethereum provider found");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Ensure that the contract is created using valid address and ABI
    const contract = new Contract(contractAddress, contractABI, signer);

    console.log(
        {
            contractAddress,
            contractABI,
            // provider,
            // signer,
            contract

        }
    )

    return contract;
};


export const ApplicationLoanProvider = ({ children }) => {
      const contract = getEthereumContract();
    console.log(contract.getAllLoans);

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        owner: "",
        title: "",
        description: "",
        amount: "",
        target: "",
        deadline: ""
    });

    const [loanData, setLoanData] = useState([]);
    const fetchAllLoans = async () => {
        const loans = await contract.getAllLoans();

        if (typeof contract.getAllLoans !== 'function') {
            console.error("Function 'getAllLoans' not found on the contract");
            return;
        }
        try{
            const loans = await contract.getAllLoans();
            console.log("Fetched loans:", loans);

            setLoanData(loans);
        }
        catch(error){
            console.error("Error fetching loans:", error);
        }
    }

    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return alert("Please Install MetaMask");

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.');
        }
    }

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please Install MetaMask");

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.');
        }
    }

    const sendApplication = async () => {
        try {


            if (!window.ethereum) return alert("Please Install MetaMask");
            const { owner, title, description, amount, target, deadline } = formData;

            const contract = getEthereumContract();

            if (!contract) return alert("Contract not found");

            // Here you would typically call a contract method
            // For example: await contract.createLoan(owner, title, description, amount, target, deadline);

            console.log("Application sent successfully");
        } catch (error) {
            console.log(error);
            throw new Error('Error while sending application');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        fetchAllLoans();
    }, []);

    return (
        <ApplicationLoanContext.Provider value={{ connectWallet, currentAccount, formData, handleChange, sendApplication, loanData }}>
            {children}
        </ApplicationLoanContext.Provider>
    )
}