"use client";

import React from "react";
import { UploadButton } from "@/app/utils/uploadthing";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { generateSummary } from "@/actions/upload-action";
import { useRouter } from "next/navigation";

const UploadForm = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <Toaster />

      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={async (res) => {
          try {
            toast("Upload completed");

            const result = await generateSummary([
              { serverData: res[0].serverData },
            ]);

            if (result?.success && result?.data?.id) {
              toast("Summary saved");
              router.push(`/summaries/${result.data.id}`);
            } else {
              toast.error(result?.msg || "Failed to save summary");
            }
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadForm;
