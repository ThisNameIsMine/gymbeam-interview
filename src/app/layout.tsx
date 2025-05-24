import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

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
          <AnnouncementBar message="FREE gift with purchase of ASAP Cookie vanilla + ASAP Cookie triple chocolate. All you need is a purchase over €50 and the code ASAP." />
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}