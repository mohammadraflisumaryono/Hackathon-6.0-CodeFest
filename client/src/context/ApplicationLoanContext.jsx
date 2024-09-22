import React, { useEffect , useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/ApllicationLoan';

export const ApplicationLoanContext = React.createContext();

const { ethereum } = window;

const getEtheriumContract = () =>{
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
    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please Install MetaMask");

        const account = await ethereum.request({method: 'eth_requestAccounts'});

        console.log("Account :" + account);
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return (
        <ApplicationLoanContext.Provider value={{value: 'test' }}>
            {children}
        </ApplicationLoanContext.Provider>
    )
}
