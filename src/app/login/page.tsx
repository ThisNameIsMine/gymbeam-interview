// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hooku
// import { useRouter } from 'next/navigation'; // useRouter už nepotrebujeme priamo tu, AuthContext sa o to postará

export default function LoginPage() {
    const [username, setUsername] = useState('mor_2314'); // Predvyplnené pre testovanie
    const [password, setPassword] = useState('83r5^_'); // Predvyplnené pre testovanie
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth(); // Získanie login funkcie z AuthContextu
    // const router = useRouter(); // Už nie je potrebné

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

            const data = await response.json();

            if (response.ok && data.token) {
                login(data.token); // Zavolanie login funkcie z AuthContextu s prijatým tokenom
                // Presmerovanie je už riešené v AuthContext.login()
                // router.push('/products'); // Toto už nie je potrebné
            } else {
                // FakeStoreAPI vracia 200 OK aj pri zlyhaní, ale bez tokenu, alebo s chybovou správou
                // Dokumentácia hovorí, že pri zlyhaní vráti status 401, čo je lepšie
                // V praxi môže API vrátiť rôzne chybové kódy, tu zjednodušujeme
                setError(data.msg || 'Prihlásenie zlyhalo. Skontrolujte prihlasovacie údaje.');
                console.error('Login failed:', data);
            }
        } catch (err) {
            console.error('Chyba pri prihlasovaní:', err);
            setError('Nastala chyba pri pripojení. Skúste to prosím neskôr.');
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
                            Používateľské meno {/* Slovak label */}
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
                            placeholder="napr. mor_2314"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-neutral-700"
                        >
                            Heslo {/* Slovak label */}
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
                            placeholder="napr. 83r5^_"
                        />
                    </div>
                    <div className="text-xs text-gray-500">
                        Tip: Použite prihlasovacie údaje z <a href="https://fakestoreapi.com/docs" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">FakeStoreAPI Docs</a>.
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300"
                        >
                            {isLoading ? 'Prihlasujem...' : 'Prihlásiť sa'} {/* Slovak button text */}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-neutral-600">
                    Nemáte účet? Registrácia je pre toto demo voliteľná.
                </p>
                <p className="text-sm text-center text-neutral-600">
                    <Link href="/" className="font-medium text-orange-600 hover:text-orange-500">
                        ← Späť na domovskú stránku {/* Slovak link text */}
                    </Link>
                </p>
            </div>
        </div>
    );
}