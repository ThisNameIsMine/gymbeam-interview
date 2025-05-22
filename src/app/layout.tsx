import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

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
      <body className={inter.className}>
        <AuthProvider>
          <Navbar /> {/* Add Navbar here */}
          <main className="container mx-auto px-4 py-8"> {/* Added some padding to main content */}
            {children}
          </main>
          {/* Optional Footer can go here */}
          {/* <footer className="text-center py-4 border-t mt-8">
          <p>© {new Date().getFullYear()} GymBeam Case Study</p>
        </footer> */}
        </AuthProvider>
      </body>
    </html>
  );
}