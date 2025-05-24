// src/app/products/page.tsx
"use client"; // For fetching data client-side and using hooks

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute'; // Import the HOC
import { useAuth } from '@/contexts/AuthContext'; // To get the token if needed for API calls
import { Product } from '@/types'; // Assuming you have a Product type defined
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductCard from '@/components/ProductCard';
import Banner from '@/components/Banner';


function ProductsPageContent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]); // To store all products for client-side filtering/sorting
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth(); // Get token, though FakeStoreAPI /products doesn't strictly need it

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // FakeStoreAPI's /products endpoint doesn't require authentication,
                // but in a real app, you might need to pass the token in headers.
                const response = await fetch('https://fakestoreapi.com/products', {
                    // headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err: any) {
                console.error("Failed to fetch products:", err);
                setError(err.message || 'Failed to load products.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [token]); // Re-fetch if token changes, though not critical for this specific API endpoint

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/products/categories');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                const data: string[] = await response.json();
                setCategories(data);
            } catch (err: any) {
                console.error("Failed to fetch categories:", err);
                // Optionally set a specific category error state
            }
        };
        fetchCategories();
    }, []);

    // Fetch products based on selected category, or all products
    useEffect(() => {
        const fetchProductsData = async () => {
            setIsLoading(true);
            setError(null);
            let url = '/api/products'; // Default to all products
            if (selectedCategory) {
                url = `/api/products/category/${encodeURIComponent(selectedCategory)}`;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                const data: Product[] = await response.json();
                setProducts(data); // These are the currently displayed products (can be all or category-specific)
                if (!selectedCategory) {
                    setAllProducts(data); // Store all products only when no category is selected initially
                }
            } catch (err: any) {
                console.error("Failed to fetch products:", err);
                setError(err.message || 'Failed to load products.');
                setProducts([]); // Clear products on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductsData();
    }, [selectedCategory]); // Re-fetch when selectedCategory changes
    const handleCategorySelect = (category: string | null) => {
        setSelectedCategory(category);
        // When a category is selected, products state is updated by the useEffect above.
        // If "All" is selected (category is null), products will be all products.
    };

    if (isLoading && products.length === 0) {
        return <div className="text-center py-10">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }

    if (products.length === 0) {
        return <div className="text-center py-10">No products found.</div>;
    }

    // If loading is finished but products array is empty
    if (!isLoading && products.length === 0 && !error) {
        return (
            <div>
                <div className="text-center py-4">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => handleCategorySelect(cat)}
                            className={`m-1 p-2 rounded ${selectedCategory === cat ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                            {cat}
                        </button>
                    ))}
                    <button onClick={() => handleCategorySelect(null)}
                        className={`m-1 p-2 rounded ${!selectedCategory ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                        All Products
                    </button>
                </div>
                <div className="text-center py-10">No products found for the selected criteria.</div>
            </div>
        );
    }

    return (
        <div>
            <Banner />
            {/* <h1 className="text-4xl font-bold mb-8 text-center text-neutral-800">Recomended Products</h1> */}
            {/* Category Filters UI */}
            <div className="text-center py-4 mb-6">
                <button
                    onClick={() => handleCategorySelect(null)}
                    className={`m-1 py-2 px-4 rounded text-sm font-medium transition-colors duration-150 ease-in-out
                      ${!selectedCategory ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    All Products
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`m-1 py-2 px-4 rounded text-sm font-medium capitalize transition-colors duration-150 ease-in-out
                        ${selectedCategory === category ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            {isLoading && <div className="w-full h-full flex justify-center items-center"><LoadingSpinner loading={isLoading} /></div>}
            {!isLoading && error && <div className="text-center py-10 text-red-500">Error loading products: {error}</div>}
            {!isLoading && !error && products.length === 0 && <div className="text-center py-10">No products found.</div>}

            {!isLoading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

// Wrap the page content with ProtectedRoute
export default function ProductsPage() {
    return (
        <ProtectedRoute>
            <ProductsPageContent />
        </ProtectedRoute>
    );
}