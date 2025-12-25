"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import NavLink from "./nav-link";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    console.log("Session:", session);
  }, [session]);

  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      {/* Logo */}
      <div className="flex lg:flex-1">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-gray-800 hover:rotate-12 transition" />
          <span className="font-extrabold lg:text-xl text-gray-900 font-mono">
            Summarizer
          </span>
        </Link>
      </div>

      {/* Center Links */}
      <div className="flex gap-6 items-center">
        {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
      </div>

      {/* Right Actions */}
      <div className="flex lg:flex-1 justify-end gap-4">
        {!isLoggedIn ? (
          <Button onClick={() => signIn("google")}>Sign In</Button>
        ) : (
          <>
            <NavLink href="/upload">Upload PDF</NavLink>
            <Button variant="outline" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
