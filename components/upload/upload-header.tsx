import { Sparkles } from 'lucide-react';
import React from 'react'

const UploadHeader = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="relative p-px overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradiant-x group ">
          <div className="max-w-2xl relative px-8 py-1.5 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200 flex cursor-pointer">
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse " />
            <p className="text-base">AI-powered Content Creation</p>
          </div>
        </div>
        <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Start Uploadng{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">Your PDF's</span>
            <span
              className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>{" "}
        </div>
        <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
          <p>Upload your PDF and let our AI do the magic!</p>
        </div>
      </div>
    </div>
  );
}

export default UploadHeader