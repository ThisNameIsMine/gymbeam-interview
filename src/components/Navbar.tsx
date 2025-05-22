import Link from "next/link";
import React from 'react'


export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-orange-600">
                    GymBeam
                </Link>
                <div>
                    {/* For unauthenticated state initially */}
                    <Link
                        href="/login"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}