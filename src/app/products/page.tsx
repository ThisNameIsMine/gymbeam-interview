// src/app/products/page.tsx
"use client";
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute'; // Komponent pre ochranu stránky pred neautorizovaným prístupom
import { useAuth } from '@/contexts/AuthContext'; // Pre získanie autentifikačného kontextu
import { Product } from '@/types/types'; // Typ pre produkt
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductCard from '@/components/ProductCard';
import Banner from '@/components/Banner';


function ProductsPageContent() {
    const [products, setProducts] = useState<Product[]>([]);
    // const [allProducts, setAllProducts] = useState<Product[]>([]); // Ukladá všetky produkty 
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth(); // Získanie tokenu z AuthContext, ak je potrebný pre autentifikáciu API volaní (napríklad pre ochranu API endpointov,
    //  ktoré vyžadujú autentifikáciu), v našom prípade FakeStoreAPI nevyžaduje autentifikáciu, ale pre budúce použitie to môže byť užitočné.

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Tu by sa mohol použiť token, ak by bol potrebný pre autentifikáciu API volaní
                // V tomto prípade FakeStoreAPI nevyžaduje autentifikáciu, takže token nie je potrebný.
                // Rovnako tak by sa mohol použiť fetch priamo na FakeStoreAPI, ale pre túto aplikáciu používame proxy server v Next.js,
                // ktorý smeruje na /api/products, čo je endpoint v našej aplikácii, ktorý sa stará o získavanie produktov.
                const response = await fetch('/api/products', {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}` // Tu by bol token, ak by bol potrebný, ale FakeStoreAPI ho nevyžaduje
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err: unknown) {
                console.error("Failed to fetch products:", err);
                const message = err instanceof Error ? err.message : 'Unknown error';
                setError(message || 'Failed to load products.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [token]); // Závislosť na tokene, ak by bol potrebný pre autentifikáciu API volaní

    // získanie kategórií produktov
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
            } catch (err: unknown) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Získanie produktov podľa vybranej kategórie	
    useEffect(() => {
        const fetchProductsData = async () => {
            setIsLoading(true);
            setError(null);
            let url = '/api/products'; // Predvolená URL pre získanie všetkých produktov
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
                setProducts(data); // Nastavenie produktov podľa vybranej kategórie
                // if (!selectedCategory) {
                //     setAllProducts(data); // Uloženie všetkých produktov, ak nie je vybraná žiadna kategória
                // }
            } catch (err: unknown) {
                console.error("Failed to fetch products:", err);
                const message = err instanceof Error ? err.message : 'Unknown error'; // Získanie chybovej správy, ak je dostupná
                setError(message || 'Failed to load products.');
                setProducts([]); // V prípade chyby nastavíme produkty na prázdne pole
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductsData();
    }, [selectedCategory]); // Závislosť na selectedCategory, aby sa produkty načítali podľa vybranej kategórie, 
    // ak je selectedCategory null, načítajú sa všetky produkty
    // Ak je selectedCategory nastavená, načítajú sa produkty len pre túto kategóriu.

    const handleCategorySelect = (category: string | null) => {
        setSelectedCategory(category);
    };

    // Ak sa načítavajú produkty a žiadne produkty nie sú dostupné, zobrazí sa správa
    if (isLoading && products.length === 0) {
        return <div className="w-full h-full flex justify-center items-center"><LoadingSpinner loading={isLoading} /></div>; // Zobrazenie načítavacieho indikátora počas načítavania produktu
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }

    if (products.length === 0) {
        return <div className="text-center py-10">No products found.</div>;
    }

    // Ak sa nenašli žiadne produkty pre vybranú kategóriu, zobrazí sa správa
    // a tlačidlá pre výber kategórií
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
            {/* Voľba kategórii */}
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

// Hlavná stránka pre produkty, ktorá je chránená pred neautorizovaným prístupom
export default function ProductsPage() {
    return (
        <ProtectedRoute>
            <ProductsPageContent />
        </ProtectedRoute>
    );
}