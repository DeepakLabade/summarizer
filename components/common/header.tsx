import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import NavLink from "./nav-link";
import { signinAction } from "@/actions/auth-action";
import { Button } from "../ui/button";

const Header = () => {
    const isLoggedIn = false

  return (
    <>
      <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
        <div className="flex lg:flex-1">
          <Link
            href={"/"}
            className="flex items-center gap-1 lg:gap-2 shrink-0"
          >
            <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-800 hover:rotate-12 transform transition duration-200 ease-in-out" />
            <span className="font-extrabold lg:text-xl text-gray-900 font-mono">
              Summarizer
            </span>
          </Link>
        </div>

        <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
          {isLoggedIn && <NavLink href={"/dashboard"}>Your Summaries</NavLink>}
        </div>

        <div className="lg:justify-end flex lg:flex-1">
          {!isLoggedIn ? (
            <div className="flex lg:justify-end lg:flex-1">
              <form action={signinAction}>
                <Button>
                  Sign In
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <NavLink href={"/upload"}>Upload a PDF</NavLink>
              <div>pro</div>
              <button>User</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
