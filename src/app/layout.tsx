import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GymBeam Interview",
  description: "GymBeam Interview Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <AnnouncementBar message="Darček k nákupu ASAP Cookie vanilka + ASAP Cookie trojitá čokoláda ZADARMO. Stačí nákup nad 50 € a kód ASAP." />
          <Navbar /> {/* Add Navbar here */}
          <main className="container mx-auto px-4 py-8"> {/* Added some padding to main content */}
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}