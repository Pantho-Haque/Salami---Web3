"use client";

import React, { useContext, useEffect, useState } from "react";

import { ethers } from "ethers";
import abi from "@/abi/Salami.json"; // Import your contract ABI (adjust the path accordingly)

const AuthContext = React.createContext();

export function useAuthProvider() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null)
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        // Check if window.ethereum is available
        if (typeof window.ethereum !== "undefined") {
          const prov = new ethers.providers.Web3Provider(window.ethereum);
          prov.pollingInterval = 10000;
          
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          // Request accounts and get the signer
          await prov.send("eth_requestAccounts", []);
          const signer = prov.getSigner();
          const address = await signer.getAddress();

          // Set account state
          setAccount(address);

          // Initialize contract
          let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const cont = new ethers.Contract(contractAddress, abi.abi, signer);

          // Set contract and provider states
          setContract(cont);
          setProvider(prov);
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log("Error getting contract/account", error);
      }
    };

    loadProvider();
  }, []); // Empty dependency array to run the effect only once

  
  useEffect(() => {
    if (account && contract && provider) {
    } else {
      const reloadInterval = setInterval(() => {
        window.location.reload();
      }, 2000);
      return () => clearInterval(reloadInterval); 
    }
  }, [account, contract, provider]); // Depend on account, contract, and provider


  const login = async () => {
    try {
      const userDetails = await contract.getUserDetails();
      console.log(userDetails);
      if (!userDetails.registered) {
        router.replace("/signup");
      } else {
        setUserInfo(userDetails);
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };




  const value = { contract, account, provider,userInfo,login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
