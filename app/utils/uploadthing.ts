import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "../api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// import { generateReactHelpers } from "@uploadthing/react";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";

// export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
