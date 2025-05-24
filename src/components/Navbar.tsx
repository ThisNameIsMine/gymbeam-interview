// src/components/Navbar.tsx
"use client"; // Potrebné pre použitie useAuth hooku

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth hooku
import { LuUser, LuShoppingCart, LuLogOut, LuLogIn, LuSearch } from "react-icons/lu";
import { useState } from "react";

export default function Navbar() {
    const { isAuthenticated, logout, isLoading } = useAuth(); // Získanie stavu a funkcií
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href={isAuthenticated ? "/products" : "/"} className="text-2xl font-bold text-orange-600 shrink-0">
                    <img src="/GB_Logo_Energy_COM.png" alt="GymBeam" className="h-10 sm:h-12 md:h-14 w-auto" />
                </Link>

                {/* Search bar */}
                <div className="flex-grow px-4 hidden md:block">
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full border border-neutral-300 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                        <LuSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 pointer-events-none" />
                    </div>
                </div>

                {/* Icons and Auth Button Section */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    {/* Profile Icon and Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsProfileDropdownOpen(true)}
                        onMouseLeave={() => setIsProfileDropdownOpen(false)}
                    >
                        <button
                            aria-label="User profile"
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} // Also allow click for touch devices
                        >
                            <LuUser className="text-2xl text-neutral-700" />
                        </button>
                        {isProfileDropdownOpen && (
                            <div className="absolute right-0 w-48 bg-white rounded-md shadow-xl z-20 py-1 border border-gray-200">
                                {isAuthenticated ? (
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsProfileDropdownOpen(false); // Close dropdown on action
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-orange-500 hover:text-white flex items-center rounded-md"
                                    >
                                        <LuLogOut className="mr-2" /> Logout
                                    </button>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown on navigation
                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-orange-500 hover:text-white flex items-center"
                                    >
                                        <LuLogIn className="mr-2" /> Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Cart Icon and Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsCartDropdownOpen(true)}
                        onMouseLeave={() => setIsCartDropdownOpen(false)}
                    >
                        <button
                            aria-label="Shopping cart"
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)} // Also allow click for touch devices
                        >
                            <LuShoppingCart className="text-2xl text-neutral-700" />
                        </button>
                        {isCartDropdownOpen && (
                            <div className="absolute right-0 w-64 sm:w-72 bg-white rounded-md shadow-xl z-20 p-4 border border-gray-200">
                                <p className="text-center text-neutral-600 text-sm">
                                    Your shopping cart is currently empty.
                                </p>
                                {/* If cart had items:
                <div className="mt-2">
                  Item 1...
                </div>
                <Link href="/cart" className="block mt-4 text-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                  View Cart & Checkout
                </Link>
                */}
                            </div>
                        )}
                    </div>

                    {/* Original Login/Logout Button - Now handled by Profile Dropdown, so can be removed or kept for larger screens as an alternative */}
                    {/* For this example, I'll comment it out to rely on the dropdowns */}
                    {/*
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-neutral-600 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out hidden md:block"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out hidden md:block"
            >
              Login
            </Link>
          )}
          */}
                </div>
            </div>
        </nav>
    );
}