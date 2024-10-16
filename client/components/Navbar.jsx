"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme-toggle";

import { useRouter } from "next/navigation"; // To navigate to other pages

import { useAuthProvider } from "@/lib/Contextapi";
import { useEffect, useState } from "react";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  const { contract, account, provider ,userInfo,login} = useAuthProvider();

  useEffect(() => {
    if (account && contract && provider) {
      console.log("Account:", account);
      console.log("Contract:", contract);
      console.log("Provider:", provider);
      login();
      
    } else {
      const reloadInterval = setInterval(() => {
        window.location.reload();
      }, 2000);
      return () => clearInterval(reloadInterval);
    }
  }, [account, contract, provider]); // Depend on account, contract, and provider

 

  // If the current path is "/signup", don't render the navigation
  if (pathname.startsWith("/signup")) {
    return (
      <nav className="flex justify-end items-center mb-20">
        <ModeToggle />
      </nav>
    );
  }

  return (
    <nav className="h-16 bg-background/50 sticky top-0 border-b px-8 backdrop-blur flex items-center  z-10">
      <div className="text-lg font-bold md:text-xl sm:ml-16">
        <Link href={"/"}>Salami</Link>
      </div>

      <div className="buttons flex space-x-2 mr-2 justify-end w-full">
        {userInfo ? (
          <Button variant="outline" className="">
            {userInfo.name}
            {" #"}
            {userInfo.tag}
          </Button>
        ) : (
          <Button variant="outline" className="" onClick={login}>
            Login
          </Button>
        )}
      </div>

      <ModeToggle />
    </nav>
  );
}
