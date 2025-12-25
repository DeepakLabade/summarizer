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
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse || !uploadResponse[0]) {
    return {
      success: false,
      msg: "Invalid upload response",
    };
  }

  const {
    serverData: {
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      msg: "PDF URL missing",
    };
  }

  const session = await auth();
  console.log(session?.user)

  if (!session?.user?.id) {
    return {
      success: false,
      msg: "User not authenticated",
    };
  }

  try {
    console.log("📄 Extracting PDF text...");
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    console.log("🤖 Generating summary...");
    const summary = await generateSummaryFromGemini(pdfText);

    if (!summary) {
      return {
        success: false,
        msg: "Failed to generate summary",
      };
    }

    const title = await formatFileNameasTitle(fileName);

    console.log("💾 Saving to database...");
    const saved = await db.pdfSummary.create({
      data: {
        user: {
          connect: { id: session.user.id }, // ✅ FK SAFE
        },
        originalFileUrl: pdfUrl,
        summaryText: summary,
        fileName,
        title,
        status: "completed",
      },
    });

    revalidatePath(`/summaries/${saved.id}`);

    console.log("✅ Saved summary:", saved.id);

    return {
      success: true,
      data: {
        id: saved.id,
        title,
        summary,
      },
    };
  } catch (error) {
    console.error("❌ generateSummary error:", error);
    return {
      success: false,
      msg: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
