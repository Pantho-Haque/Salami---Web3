// app/signup/page.js
"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { getContractInstance } from "@/lib/getContractInstance";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [tag, setTag] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to get public address using MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setPublicAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Function to send the form data to the smart contract
  const registerUser = async (event) => {
    event.preventDefault();
    if (!username || !tag || !publicAddress) {
      alert("Please fill in all the fields and connect your wallet.");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your smart contract address and ABI
      const contractInstance = await getContractInstance();

      // Call the smart contract function to register the user
      const tx = await contractInstance.register(username, tag);
      await tx.wait(); // Wait for the transaction to be mined

      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("There was an error registering the user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Preferred Tag
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your preferred tag"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Public Address
            </label>
            {publicAddress ? (
              <p className="py-2 px-3 rounded">{publicAddress}</p>
            ) : (
              <button
                type="button"
                onClick={connectWallet}
                className=" py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Connect MetaMask
              </button>
            )}
          </div>

          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
