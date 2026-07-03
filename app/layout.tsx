import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/lib/store";
import CompareModal from "@/components/CompareModal";
import ContactModal from "@/components/ContactModal";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-next",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-next",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetPlan Compare — Pet Insurance Comparison",
  description:
    "Compare top pet insurance plans for dogs, cats, birds, reptiles, and exotic animals — in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} antialiased`}>
      <body className="bg-apple-canvas text-apple-ink font-[var(--font-inter)] min-h-screen flex flex-col antialiased">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CompareModal />
          <ContactModal />
        </StoreProvider>
      </body>
    </html>
  );
}
