"use client";
import { buttonVariants, Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { ModeToggle } from "./theme-toggle";

import { useRouter } from "next/navigation"; // To navigate to other pages

import { getContractInstance } from "@/lib/getContractInstance";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const login = async () => {
    // Check if MetaMask is available
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const contractInstance = await getContractInstance();

        // Check if the user is registered by calling the contract's getUserDetails function
        const userDetails = await contractInstance.getUserDetails();

        if (userDetails.registered) {
          // If registered, navigate to the profile page
          router.push("/profile");
        } else {
          // If not registered, navigate to the signup page
          router.push("/signup");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      } finally {
        // Disconnect from MetaMask (optional)
        // provider.disconnect();
      }
    } else {
      console.error("MetaMask not detected. Please install MetaMask.");
    }
  };


  // If the current path is "/signup", don't render the navigation
  if (pathname.startsWith('/signup')) {
    return <nav className="flex justify-end items-center">
      <ModeToggle />
    </nav>;
  }

  return (
    <nav className="h-16 bg-background/50 sticky top-0 border-b px-8 backdrop-blur flex items-center  z-10">
      <div className="text-lg font-bold md:text-xl sm:ml-16">
        <Link href={"/"}>Salami</Link>
      </div>

      <div className="buttons flex space-x-2 mr-2 justify-end w-full">
        <Button variant="outline" className="" onClick={login}>
          Login
        </Button>
      </div>

      <ModeToggle />
    </nav>
  );
}
