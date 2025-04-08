"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = () => {
    router.push("/SignIn");
  };

  return (
    <nav className="bg-[#264f61] backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
              Finalyze
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                width={36}
                height={36}
                alt="Profile"
                className="rounded-full border border-teal-400 hover:scale-105 transition-transform"
              />
            ) : (
              <button
                className="bg-transparent border border-teal-400 text-teal-300 hover:bg-teal-500/10 text-sm px-4 py-2 rounded-lg hidden sm:inline-flex"
                onClick={handleSignIn}
              >
                Log in
              </button>
            )}

            <div className="md:hidden flex items-center">
              <button className="text-gray-300 hover:text-cyan-400 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;