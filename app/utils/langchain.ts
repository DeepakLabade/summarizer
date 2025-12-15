import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from "fs";
import path from "path";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const res = await fetch(fileUrl);
  const arrayBuffer = await res.arrayBuffer();

  const filePath = path.join(process.cwd(), "temp.pdf");
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

  const loader = new PDFLoader(filePath);
  const docs = await loader.load();

  return docs.map((doc) => doc.pageContent).join("\n");
}
