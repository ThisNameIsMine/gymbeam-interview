// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hooku, ktorý poskytuje prístup k autentifikačným funkciám

export default function LoginPage() {
    const [username, setUsername] = useState('mor_2314'); // Predvyplnené pre testovanie
    const [password, setPassword] = useState('83r5^_');   // Predvyplnené pre testovanie
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth(); // Získanie login funkcie z AuthContextu

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            // Kontrola odpovede z API
            if (response.ok) {
                const data = await response.json(); // This can still throw if the body isn't valid JSON

                if (data.token) { // Simplified from: if (response.ok && data.token)
                    login(data.token); // Zavolanie login funkcie z AuthContextu s prijatým tokenom
                    // Presmerovanie je už riešené v AuthContext.login()
                } else {
                    // Ak API vráti chybu (alebo 200 OK bez tokenu), zaznamenáme ju
                    setError(data.msg || 'Login failed. Please check your credentials.');
                    console.error('Login failed (response ok, but no token or error msg):', data);
                }
            } else {
                // Ak odpoveď nie je OK, spracujeme chybu, 401 su zvyčajne nesprávne prihlasovacie údaje
                if (response.status === 401) {
                    setError('Incorrect credentials. Please try again.');
                } else {
                    setError(`Login failed. Server responded with status: ${response.status}. Please try again later.`);
                    console.error('Login failed with status:', response.status, response.statusText);
                }
            }
        } catch (err) {
            // Ak sa vyskytne chyba pri spracovaní požiadavky, zaznamenáme ju
            console.error('Error during login request:', err);
            setError('An error occurred while trying to connect. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-lg">
                <h1 className="text-3xl font-bold text-center text-neutral-800">Login to GymBeam</h1>

                {error && (
                    <p className="text-red-500 bg-red-100 p-3 rounded-md text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-neutral-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="e.g., mor_2314"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-neutral-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="e.g., 83r5^_"
                        />
                    </div>
                    <div className="text-xs text-gray-500">
                        Tip: Use credentials from <a href="https://fakestoreapi.com/docs" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">FakeStoreAPI Docs</a>.
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-neutral-600">
                    Don't have an account? Registration is optional for this demo.
                </p>
                <p className="text-sm text-center text-neutral-600">
                    <Link href="/" className="font-medium text-orange-600 hover:text-orange-500">
                        ← Back to homepage
                    </Link>
                </p>
            </div>
        </div>
    );
}