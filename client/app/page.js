"use client";
import { useAuthProvider } from "@/lib/Contextapi.js";
import { useEffect, useState } from "react";

import UserCard from "@/components/UserCard";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [allUser, setAllUser] = useState(null);

  const { contract, account, provider, userInfo, login } = useAuthProvider();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (account && contract && provider) {
      console.log("Account:", account);
      console.log("Contract:", contract);
      console.log("Provider:", provider);
      if (!userInfo) {
        login();
      }
      getallUser();
    } else {
      const reloadInterval = setInterval(() => {
        window.location.reload();
      }, 2000);
      return () => clearInterval(reloadInterval);
    }
  }, [account, contract, provider, userInfo]); // Depend on account, contract, and provider

  const getallUser = async () => {
    const alluser = await contract.getAllUsers();

    let otheruser = [];
    alluser.map((user) => {
      if (JSON.stringify(user) != JSON.stringify(userInfo)) {
        otheruser.push(user);
      }
    });
    setAllUser(otheruser);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        // className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        className="ring-0 focus:ring-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col space-y-4 w-1/2 mx-auto mt-5">
        {allUser?.map(
          (user, index) =>
            JSON.stringify(user)
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) && (
              <UserCard user={user} index={index} />
            )
        )}
      </div>
    </div>
  );
}
