import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "Summarizer - AI-powered  PDF summarization",
  description: "save hours of reading time. Transform lengthy PDF's into clear, accurate summaries in seconds with our advanced AI technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        </div>
      </body>
    </html>
  );
}
