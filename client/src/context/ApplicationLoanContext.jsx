import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/ApllicationLoan';

export const ApplicationLoanContext = React.createContext();

const { ethereum } = window;

const getEtheriumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        contract,
        provider,
        signer
    });
}


export const ApplicationLoanProvider = ({ children }) => {

    //   address owner;
    //     string title;
    //     string description;
    //     uint256 amount;
    //     uint256 target;
    //     uint256 deadline;
    //     uint256 isLoanActive;
    // address[] guarantors;
    // uint256[] guaranteedAmounts;
    //     uint256 totalPaid;
    //     uint256 totalGuaranteed;
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        owner: "",
        title: "",
        description: "",
        amount: "",
        target: "",
        deadline: ""
    });

    const handleChange = (e, name) => {
        setFormData((prevState) => (
            {
                ...prevState,
                [name]: e.target.value
            }
        ))

    }


    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask");

            const account = await ethereum.request({ method: 'eth_requestAccounts' });

            if (account.length) {
                setCurrentAccount(account[0]);
            } else {
                console.log("No Account Found");
            }

        } catch (error) {
            console.log(error);

            throw new Error('Error while connecting to wallet');
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask");

            const account = await ethereum.request({ method: 'eth_requestAccounts' });


            if (account.length) {
                setCurrentAccount(account[0]);
            } else {
                console.log("No Account Found");
            }

        } catch (error) {
            console.log(error);

            throw new Error('Error while connecting to wallet');
        }
    }

    const sendApllication = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask");

            const account = await ethereum.request({ method: 'eth_requestAccounts' });

            if (account.length) {
                setCurrentAccount(account[0]);
            } else {
                console.log("No Account Found");
            }

        } catch (error) {
            console.log(error);

            throw new Error('Error while connecting to wallet');
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <ApplicationLoanContext.Provider value={{ connectWallet, currentAccount, setFormData, formData, handleChange }}>
            {children}
        </ApplicationLoanContext.Provider>
    )
}
