import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {

    const summaries = [
        {
            id: 1,
            title: "sayali ramkar",
            created_at: "2025-02-10 20:23:19.234234+00",
            summary_text: "description",
            original_file_url: "http://localhost:3000"
        }
    ]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into consice, actionable insights
              </p>
            </div>
            <Button
              variant={"link"}
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 gruop hover:no-underline"
            >
              <Link href={"/upload"} className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary, idx) => (
              <SummaryCard key={idx} {...summary} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
