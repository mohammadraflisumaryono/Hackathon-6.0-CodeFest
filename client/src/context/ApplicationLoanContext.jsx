import React, { useEffect, useState } from 'react';
import { ethers, Contract } from 'ethers';
import { contractABI, contractAddress } from '../utils/ApllicationLoan';

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


    console.log({
        contractAddress,
        contractABI,
        provider,
        signer,
        contract
    });


    return contract;
};


export const ApplicationLoanProvider = ({ children }) => {
    const contract = getEthereumContract();
    console.log(contract.getAllLoans);

    const [currentAccount, setCurrentAccount] = useState("");
    const [loanApproveData, setLoanApproveData] = useState([]);
    const [formData, setFormData] = useState({
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
        try {
            const loans = await contract.getAllLoans();
            console.log("Fetched loans:", loans);

            setLoanData(loans);
        }
        catch (error) {
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
    const validateFormData = ({ owner, title, description, amount, target, deadline }) => {
        if (!owner || !title || !description || !amount || !target || !deadline) {
            alert("Please fill all fields");
            return false;
        }

        if (title.length <= 5) {
            alert("Title must be more than 5 characters");
            return false;
        }

        if (description.length <= 10) {
            alert("Description must be more than 10 characters");
            return false;
        }

        if (isNaN(amount) || amount <= 0) {
            alert("Amount must be greater than 0");
            return false;
        }

        if (isNaN(target) || target <= 0) {
            alert("Target must be greater than 0");
            return false;
        }

        const currentDate = new Date();
        const deadlineDate = new Date(deadline);

        if (deadlineDate <= currentDate) {
            alert("Deadline must be a future date");
            return false;
        }

        return true;
    };

    const checkEthereumAvailability = () => {
        if (!window.ethereum) {
            alert("Please Install MetaMask");
            return false;
        }
        return true;
    };

    const sendApplication = async () => {
        try {
            // Check MetaMask availability
            if (!checkEthereumAvailability()) return;

            // Validate form data
            if (!validateFormData(formData)) return;

            // Get Ethereum contract instance
            const contract = await getEthereumContract();

            if (!contract) {
                alert("Contract not found");
                return;
            }

            const { owner, title, description, amount, target, deadline } = formData;

            // Call the contract method to create a loan
            await contract.createLoan(owner, title, description, amount, target, deadline);

            console.log("Application sent successfully");
        } catch (error) {
            console.error(error);
            alert('Error while sending application');
        }
    };

    const fetchAllLoansApprv = async () => {
        try {
            const contract = await getEthereumContract();

            const loansApprove = await contract.allLoanApprove();
            console.log("Fetched approved loans:", loansApprove);

            setLoanApproveData(loansApprove);
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        fetchAllLoans();
        fetchAllLoansApprv();
    }, []);

    return (

        <ApplicationLoanContext.Provider
            value={{
                connectWallet,
                currentAccount,
                formData,
                handleChange,
                sendApplication,
                loanApproveData,
                fetchAllLoans,
                loanData
            }}
        >
            {children}
        </ApplicationLoanContext.Provider>
    );
};
