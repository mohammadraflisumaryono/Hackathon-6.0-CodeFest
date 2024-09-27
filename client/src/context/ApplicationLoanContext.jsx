import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/ApllicationLoan';

export const ApplicationLoanContext = React.createContext();

// Function to get the contract instance
const getEthereumContract = async () => {
    if (!window.ethereum) throw new Error("No Ethereum provider found");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("Contract initialized:", contract);
    return contract;
};

export const ApplicationLoanProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [loanApproveData, setLoanApproveData] = useState([]);
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
        try {
            const contract = await getEthereumContract();

            if (typeof contract.getAllLoans !== 'function') {
                console.error("Function 'getAllLoans' not found on the contract");
                return;
            }

            const loans = await contract.getAllLoans();
            console.log("Fetched loans:", loans);

            setLoanData(loans);
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
    };

    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));
    };

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
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please Install MetaMask");

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.');
        }
    };

    const validateFormData = ({ owner, title, description, amount, target, deadline }) => {
        console.log(
            owner,
            title,
            description,
            amount, 
            target, 
            deadline
        )
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
    // Fungsi untuk mengirim aplikasi pinjaman
    const sendApplication = async (formData) => {
        console.log("Form Data:", formData);

        try {
            if (!checkEthereumAvailability()) return;

            if (!validateFormData(formData)) return;

            const contract = await getEthereumContract(); // Memastikan kontrak sudah diperoleh

            if (!contract || typeof contract.createLoan !== 'function') {
                console.error("Contract or createLoan function not found");
                alert("Kontrak tidak ditemukan atau fungsi createLoan tidak tersedia");
                return;
            }

            const { title, description, amount, target, deadline, acceptedTerms } = formData;

            // Cek apakah acceptedTerms memiliki nilai, jika tidak beri nilai default
            if (acceptedTerms === undefined || acceptedTerms === null) {
                alert("Anda harus menerima syarat dan ketentuan");
                return;
            }

            // Konversi amount dan target ke BigNumber
            const amountInWei = ethers.parseUnits(amount.toString(), 'ether');
            const targetInWei = ethers.parseUnits(target.toString(), 'ether');

            // Konversi deadline ke timestamp Unix
            const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

            console.log("Calling createLoan with params:", {
                title,
                description,
                amountInWei: amountInWei.toString(),
                targetInWei: targetInWei.toString(),
                deadlineTimestamp,
                acceptedTerms
            });

            // Panggil metode kontrak untuk membuat pinjaman
            const tx = await contract.createLoan(
                title,
                description,
                amountInWei,
                targetInWei,
                deadlineTimestamp,
                acceptedTerms // Pastikan acceptedTerms sudah memiliki nilai true atau false
            );

            console.log("Transaction sent:", tx.hash);

            // Tunggu transaksi selesai
            const receipt = await tx.wait();


            console.log("Transaction confirmed:", receipt.transactionHash);

            alert("Aplikasi pinjaman berhasil dikirim!");

        } catch (error) {
            console.error("Error in sendApplication:", error);
            alert('Kesalahan saat mengirim aplikasi: ' + (error.message || 'Unknown error'));
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
