// src/app/products/[id]/page.tsx
"use client"; // For fetching data client-side and using hooks

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // To get the [id] from the URL
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import StarRating from '@/components/StarRating';

// Define an interface for the product structure (can be reused or imported)
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

function ProductDetailPageContent() {
    const params = useParams(); // Hook to access route parameters
    const id = params.id as string; // Get the product ID from the URL

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch from your internal API route
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    const errorData = await response.json(); // Get error message from your API route
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
    }, [id]); // Dependency on id and token

    if (isLoading) {
        return <div className="w-full h-full flex justify-center items-center"><LoadingSpinner loading={isLoading} /></div>; // Use LoadingSpinner component
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }

    if (!product) {
        return <div className="text-center py-10">Product not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
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

// Wrap the page content with ProtectedRoute
export default function ProductDetailPage() {
    return (
        <ProtectedRoute>
            <ProductDetailPageContent />
        </ProtectedRoute>
    );
}