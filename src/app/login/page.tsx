// Mark this as a client component because we'll need to handle form state and submission
"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        // TODO: Implement actual login logic with Fake Store API
        console.log('Logging in with:', { username, password });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // setError('Login functionality not implemented yet.');
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"> {/* Adjust min-h as needed */}
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
                            placeholder="johnd (e.g. mor_2314)"
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
                            placeholder="m38rmF$ (e.g. 83r5^_)"
                        />
                    </div>
                    <div className="text-xs text-gray-500">
                        Hint: Use credentials from <a href="https://fakestoreapi.com/docs" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">FakeStoreAPI Docs</a> (e.g., mor_2314 / 83r5^_).
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
                        ← Back to Home
                    </Link>
                </p>
            </div>
        </div>
    );
}