import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/ApllicationLoan';


export const ApplicationLoanContext = React.createContext();

export const getUserManagementContractInstance = (signer) => {
    return new ethers.Contract(contractAddress, abi, signer);
 };
 
 export const UserManagementInterface = {
    register: async (contract, account, name, password) => {
       return await contract.register(account, name, password);
    },
    login: async (contract, account, password) => {
       return await contract.login(account, password);
    }
 };
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
        owner:"",
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

            // Fetch loans from the contract
            const loans = await contract.getAllLoans();
            console.log("Fetched loans:", loans);

            // Format the fetched data (BigNumber to string and timestamps)
            const formattedLoans = loans.map(loan => ({
                owner: loan.owner,
                title: loan.title,
                description: loan.description,
                amount: ethers.utils.formatUnits(loan.amount, 18), // Format amount
                target: ethers.utils.formatUnits(loan.target, 18), // Format target
                totalPaid: ethers.utils.formatUnits(loan.totalPaid, 18), // Format total paid
                totalGuaranteed: ethers.utils.formatUnits(loan.totalGuaranteed, 18), // Format total guaranteed
                deadline: new Date(loan.deadline * 1000).toLocaleString(), // Convert deadline to readable date
                isLoanActive: loan.isLoanActive,
                acceptedTerms: loan.acceptedTerms,
                guarantors: loan.guarantors,
                guaranteedAmounts: loan.guaranteedAmounts.map(amt => ethers.utils.formatUnits(amt, 18)) // Format guarantors' amounts
            }));

            console.log("Formatted loans:", formattedLoans);

            // Update state with the formatted loan data
            setLoanData(formattedLoans);

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
        if (typeof window.ethereum !== 'undefined') {
           // Dapatkan provider dan akun yang terhubung dari MetaMask
           const provider = new ethers.BrowserProvider(window.ethereum);
           const accounts = await provider.send("eth_requestAccounts", []);
           setAccount(accounts[0]); // Simpan akun yang terhubung
           
           // Mendapatkan signer dan menginisialisasi kontrak
           const signer = await provider.getSigner();
           const contractInstance = getUserManagementContractInstance(signer);
           setContract(contractInstance); // Simpan instance kontrak
           setIsContractInitialized(true); // Tandai bahwa kontrak telah diinisialisasi
           console.log("Contract initialized:", contractInstance);
        } else {
           setError("Please install MetaMask!");
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


            console.log("Transaction confirmed:", receipt);

            alert("Aplikasi pinjaman berhasil dikirim!");

        } catch (error) {
            console.error("Error in sendApplication:", error);
            alert('Kesalahan saat mengirim aplikasi: ' + (error.message || 'Unknown error'));
        }
    };
    

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
           const result = await UserManagementInterface.register(contract, account, name, password); // Memanggil smart contract
           await result.wait(); // Menunggu konfirmasi transaksi
           console.log("Registration successful!");
           setIsLoggedIn(true); // Tandai pengguna telah login
           navigate('/penjamin'); // Redirect setelah registrasi berhasil
        } catch (error) {
           console.error("Registration failed:", error);
           setError("Registration failed. Please check the console for details.");
        }
     };

     
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
           const result = await UserManagementInterface.login(contract, account, password); // Memanggil smart contract untuk login
           await result.wait(); // Menunggu konfirmasi transaksi
           console.log("Login successful!");
           setIsLoggedIn(true); // Tandai pengguna telah login
           navigate('/penjamin'); // Redirect setelah login berhasil
        } catch (error) {
           console.error("Login failed:", error);
           setError("Login failed. Please check your password and try again.");
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
