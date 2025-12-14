import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
        <div className="relative p-px overflow-hidden rounded-full bg-linear-to-r from-rose-300 via-rose-500 to-rose-800 animate-gradiant-x group">
          <div className="relative px-10 py-1.5 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200 flex cursor-pointer">
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </div>
        </div>

      <h1 className="font-bold py-6 text-center">
              Transform PDFs into
              <span className="relative inline-block">
                  <span className="relative z-10 px-2">concise</span>
                  <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1">
                      
                  </span>
              </span>
              summaries
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds
      </h2>
      <div>
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r font-bold hover:no-underline"
        >
          <Link href={"#pricing"} className="flex gap-2 items-center">
            <span>Try Summarizer</span>
            <ArrowRight className="animate-pulse w-20 h-20" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
