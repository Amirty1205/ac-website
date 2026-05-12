import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { peyda } from "./font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Darab Tahvieh",
  description: "sale and installation of air conditioning systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa-IR"
      dir="rtl"
      className={`${peyda.variable} h-full antialiased`}
    >
      <body className={peyda.className}>
        <div>
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
