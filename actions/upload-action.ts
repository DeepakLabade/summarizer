'use server'

import { fetchAndExtractPdfText } from "@/app/utils/langchain";

export async function generateSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string
        }
    }
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            status: "bad",
            msg: "file upload failed, uploadResponse required",
            data: null
        }
    }

    const {
        serverData: {
            userId,
            file: {url: pdfUrl, name: fileName}
        }
    } = uploadResponse[0]

    if (!pdfUrl) {
        return {
          success: false,
          status: "bad",
          msg: "file upload failed, pdfUrl required",
          data: null,
        };
    }

    try {
        console.log("entered here")
        const pdfText = await fetchAndExtractPdfText(pdfUrl)
        console.log("pdfText: " + pdfText)
    } catch (error) {
        console.log("some error occured: " + error);
        return {
            error,
          success: false,
          status: "bad",
          msg: "file upload failed",
          data: null,
        };
    }
}