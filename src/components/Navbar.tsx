// src/components/Navbar.tsx
"use client"; // Potrebné pre použitie useAuth hooku

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth hooku

export default function Navbar() {
    const { isAuthenticated, logout, isLoading } = useAuth(); // Získanie stavu a funkcií

    // Počas načítavania počiatočného stavu autentifikácie môžeme zobraziť placeholder alebo nič
    if (isLoading) {
        return (
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-orange-600">
                        GymBeam
                    </Link>
                    <div className="h-10"></div> {/* Placeholder pre zachovanie výšky */}
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href={isAuthenticated ? "/products" : "/"} className="text-2xl font-bold text-orange-600">
                    GymBeam
                </Link>
                <div>
                    {isAuthenticated ? (
                        // Ak je používateľ prihlásený
                        <button
                            onClick={logout}
                            className="bg-neutral-600 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
                        >
                            Loggout
                        </button>
                    ) : (
                        // Ak používateľ nie je prihlásený
                        <Link
                            href="/login"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
                        >
                            Login {/* Slovak button text */}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}