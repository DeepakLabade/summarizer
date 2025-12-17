"use server";

import { db } from "@/app/utils/db";
import { formatFileNameasTitle } from "@/app/utils/format-file";
import { generateSummaryFromGemini } from "@/app/utils/gemini";
import { fetchAndExtractPdfText } from "@/app/utils/langchain";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function generateSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      status: "bad",
      msg: "file upload failed, uploadResponse required",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      status: "bad",
      msg: "file upload failed, pdfUrl required",
      data: null,
    };
  }

  try {
    console.log("Extracting PDF text...");
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    console.log("Generating summary...");
    // ✅ FIX: Added await here
    const summary = await generateSummaryFromGemini(pdfText);

    if (!summary) {
      console.error("Summary generation failed");
      return {
        success: false,
        status: "error",
        msg: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = await formatFileNameasTitle(fileName);

    // ✅ OPTIONAL: Save to database here
    try {
      await storePDFSummary({
        title: formattedFileName,
        fileName,
        summary,
        fileUrl: pdfUrl,
      });
      console.log("✅ Summary saved to database");
    } catch (dbError) {
      console.error("⚠️ Database save failed:", dbError);
      // Continue anyway - user still gets the summary
    }

    return {
      success: true,
      message: "summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (error) {
    console.error("Error in generateSummary:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      success: false,
      status: "bad",
      msg: "Failed to process PDF",
      data: null,
    };
  }
}

export async function storePDFSummary({
  title,
  fileName,
  summary,
  fileUrl,
}: {
  title: string;
  fileName: string;
  summary: string;
  fileUrl: string;
}) {
  let savePDFSummary;
  try {
    const session = await auth();
    const userId = session?.user?.id; // ✅ FIX: Added optional chaining

    if (!userId) {
      return {
        success: false, // ✅ FIX: Fixed typo
        msg: "User not authenticated",
      };
    }

    console.log("Saving to database...");

    savePDFSummary = await db.pdfSummary.create({
      data: {
        userId,
        originalFileUrl: fileUrl,
        summaryText: summary,
        fileName,
        title,
        status: "completed", // ✅ Added status field
      },
    });

    console.log("✅ Saved in DB:", savePDFSummary.id);

    
  } catch (error) {
    console.error("❌ Error saving to database:", error);
    return {
      success: false,
      msg: error instanceof Error ? error.message : "Error saving PDF Summary",
    };
    }
    
    revalidatePath(`/summaries/${savePDFSummary.id}`)

  return {
    success: true,
      msg: "Saved to database successfully",
      data: {
        id: savePDFSummary.id
    }
  };
}
