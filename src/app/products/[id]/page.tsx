// src/app/products/[id]/page.tsx
"use client"; // For fetching data client-side and using hooks

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Pre získanie parametrov z URL (id produktu)
import ProtectedRoute from '@/components/ProtectedRoute'; // Pre ochranu stránky pred neautorizovaným prístupom
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner'; // Pre zobrazenie načítavacieho indikátora
import StarRating from '@/components/StarRating';
import { Product } from '@/types/types'; // 

function ProductDetailPageContent() {
    const params = useParams(); // Získanie parametrov z URL
    const id = params.id as string; // Získanie ID produktu z parametrov
    // State pre ukladanie produktu, načítavanie a chyby
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth(); // Získanie tokenu z AuthContext

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Získanie produktu z API pomocou ID
                // Tu využijeme vlastný api endpoind, síce pre toto zadanie by sme mohli použiť aj priamo fetch, ale pre demonštráciu použijeme API route (je to dobrý štandard pre Next.js aplikácie)
                // Taktiež sa takto dá zabezpečiť bezpečnosť, aby sa API kľúč neukladal priamo v klientskom kóde
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    const errorData = await response.json(); // Získanie chybových údajov z odpovede
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (err: any) {
                console.error(`Failed to fetch product ${id}:`, err);
                setError(err.message || `Failed to load product ${id}.`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Závislosť na id, aby sa efekt spustil pri zmene ID produktu

    // Ak je načítavanie, zobrazíme načítavací indikátor
    if (isLoading) {
        return <div className="w-full h-full flex justify-center items-center"><LoadingSpinner loading={isLoading} /></div>; // Use LoadingSpinner component
    }

    // Ak nastala chyba, zobrazíme chybovú správu
    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }
    // Ak produkt neexistuje, zobrazíme správu o tom, že produkt nebol nájdený
    if (!product) {
        return <div className="text-center py-10">Product not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Zobrazenie odkazu na späť na zoznam produktov, mohlo/malo by byť tlačidlo ale takto to vyzuálne vyzerá dobre*/}
            <Link href="/products" className="inline-block mb-6 text-orange-600 hover:text-orange-700 font-semibold">
                ← Back to Products
            </Link>
            <div className="grid md:grid-cols-2 gap-8 items-start bg-white p-6 rounded-lg shadow-xl">
                <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-w-full max-h-full object-contain p-4"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-neutral-800 mb-2">{product.title}</h1>
                    <p className="text-sm text-neutral-500 mb-4 capitalize bg-neutral-100 inline-block px-2 py-1 rounded">
                        Category: {product.category}
                    </p>
                    <p className="text-3xl font-extrabold text-orange-600 mb-6">${product.price.toFixed(2)}</p>
                    <p className="text-neutral-700 mb-4 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between">
                        {product.rating && (
                            <div className="text-sm text-neutral-600 flex">
                                <StarRating
                                    rating={product.rating.rate}
                                    className="mb-2"
                                />
                                <span className="ml-2">({product.rating.count} reviews)</span>
                            </div>
                        )}

                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => alert(`Buying ${product.title}`)}
                            className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition-colors"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Hlavný komponent pre stránku detailu produktu, ktorá je chránená pred neautorizovaným prístupom
export default function ProductDetailPage() {
    return (
        <ProtectedRoute>
            <ProductDetailPageContent />
        </ProtectedRoute>
    );
}