import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "JRV Car Rental | Sewa Lama Lagi Murah",
  description: "Premium car rental in Seremban. 50+ cars, zero deposit, free delivery, 24/7 service.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={inter.variable}>
      <body className="font-sans antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
