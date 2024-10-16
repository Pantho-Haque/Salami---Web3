
import { ethers } from "ethers";
import abi from "@/abi/Salami.json"; // Import your contract ABI (adjust the path accordingly)
import { connectWallet } from "./connectMetamask";

export const getContractInstance=async()=>{
    // Request account access
    const userAddress=connectWallet();

    console.log("Connected MetaMask address:", userAddress);
    
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.BrowserProvider(window.etherum)

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
    console.log("Connected account:", await signer.getAddress());

    // Contract interaction (replace 'YOUR_CONTRACT_ADDRESS' with the actual address)
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
    const contractABI = abi.abi; // Replace with your contract ABI

    // Create a contract instance
    return new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
}