// app/signup/page.js
"use client";

import { Button } from "@/components/ui/button";
import { useAuthProvider } from "@/lib/Contextapi";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation"; // To navigate to other pages


export default function SignupPage() {

  const router = useRouter();


  const [username, setUsername] = useState("");
  const [tag, setTag] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { contract, account, provider } = useAuthProvider();

  useEffect(() => {
    if (account && contract && provider) {
      console.log("Account:", account);
      console.log("Contract:", contract);
      console.log("Provider:", provider);
      setPublicAddress(account);
    } else {
      const reloadInterval = setInterval(() => {
        window.location.reload();
      }, 2000);
      return () => clearInterval(reloadInterval);
    }
  }, [account, contract, provider]);

  // Function to send the form data to the smart contract
  const registerUser = async (event) => {
    event.preventDefault();

    if (!username || !tag) {
      alert("Please fill in all the fields and connect your wallet.");
      return;
    }

    console.log("Username:", username, "Tag:", tag);
    setIsLoading(true);
    try {
      const tx = await contract.register(username, tag);
      console.log("Transaction:", tx);
      await tx.wait(); // Wait for the transaction to be mined
      alert("User registered successfully!");
      router.replace("/");
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.code === "ACTION_REJECTED") {
        alert("User rejected the transaction.");
      } else {
        alert("There was an error registering the user.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

        <label className="block font-bold mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your username"
          required
        />

        <label className="block font-bold my-2">Tag</label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your tag"
          required
        />

        <label className="block font-bold my-2">Address</label>
        <p className="my-2 border-2 border-slate-500/30 text-center p-2 rounded">
          {publicAddress}
        </p>

        <div className="flex items-center justify-center">
          <Button
            onClick={registerUser}
            className="py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
}
