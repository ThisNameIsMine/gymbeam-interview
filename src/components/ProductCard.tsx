import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/types';
import StarRating from './StarRating';

function ProductCard({ product }: { product: Product }) {
    return (
        <div
            key={product.id}
            className="group border border-neutral-200 rounded-xl p-4 shadow-md bg-white flex flex-col justify-between transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105"
        >
            <div className="w-full h-48 mb-4 overflow-hidden rounded-md bg-neutral-50 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                />
            </div>

            <p className="text-xs text-neutral-400 mb-2 capitalize">{product.category}</p>

            <h2
                className="text-md font-semibold text-neutral-800 mb-1 truncate"
                title={product.title}
            >
                {product.title}
            </h2>

            <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                {product.description}
            </p>

            <div className="text-sm text-neutral-600 flex">
                <StarRating
                    rating={product.rating.rate}
                    className="mb-2"
                />
                <span className="ml-2">({product.rating.count} reviews)</span>
            </div>
            <p className="text-lg font-bold text-orange-600 mb-4">
                ${product.price.toFixed(2)}
            </p>

            <Link
                href={`/products/${product.id}`}
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
                View Details
            </Link>
        </div>
    );
}

export default ProductCard;
