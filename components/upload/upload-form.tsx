"use client";

import React from "react";
import UploadFormInput from "./upload-form-input";
import { Toaster } from "@/components/ui/sonner";
import { z } from "zod";
import { UploadButton } from "@/app/utils/uploadthing";
import { toast } from "sonner";
import { generateSummary } from "@/actions/upload-action";

const schema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});

const UploadForm = () => {
//   const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
//     onClientUploadComplete: (res: any) => {
//       alert("Uploaded successfully!");
//       console.log(res);
//     },
//     onUploadError: (error: any) => {
//       alert(error.message);
//     },
//     onUploadBegin: ({ file }: any) => {
//       console.log("Upload started:", file.name);
//     },
//   });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted')



    try {

      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      if (!file) return;

      const validated = schema.safeParse({ file });
      console.log(validated)

      if (!validated.success) {
        console.log(validated.error.flatten().fieldErrors.file?.[0]);
        return;
      }

      // const res = await startUpload([file]);
      // if (!res) {
      //   console.log("something went wrong while uploading")
      //   return 
      // }
    } catch (error) {
      console.error("Upload failed:", error);
      toast("Upload Failed")
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <Toaster />
      {/* <UploadFormInput onSubmit={handleSubmit} /> */}
      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={async (res) => {
          console.log("Files: ", res[0].serverData);
          toast("upload completed");
          const summary = await generateSummary([{ serverData: res[0].serverData }])
          console.log("summary: " + summary)
          //@ts-ignore
          const {data = null, message = null} = summary || {}
          if (data) {
            toast("Saving PDF...")
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadForm;
