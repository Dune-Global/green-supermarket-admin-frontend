import type { Metadata } from "next";
import { poppins } from "@/styles/fonts";
import { MainData } from "@/data";
import "@/styles/globals.css";
import { Toaster } from "@/components/common/ui/toast/toaster";

export const metadata: Metadata = {
  title: MainData.title,
  description: MainData.description,
  keywords: MainData.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster />
        </body>
    </html>
  );
}