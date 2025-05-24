// src/app/api/products/category/[categoryName]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types/types'; 


export async function GET(
  request: NextRequest, 
  { params }: { params: { categoryName: string } } // Získavame parametre z URL, ktoré obsahujú názov kategórie
) {
  const { categoryName } = params;

  if (!categoryName) {
    return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`, {
      next: {
        revalidate: 3600, // Revaliduje po 1 hodine (3600 sekúnd)
        tags: [`category-${categoryName}`] // Tag pre invalidáciu cache
      }
    });

    if (!response.ok) {
      console.error(`API Error fetching products for category ${categoryName}: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { message: `Failed to fetch products for category. Status: ${response.status}` },
        { status: response.status }
      );
    }
    // Získame produkty pre danú kategóriu z json odpovede
    const products: Product[] = await response.json();
    return NextResponse.json(products);

  } catch (error: unknown) {
    console.error(`Internal Server Error fetching products for category ${categoryName}:`, error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Internal Server Error', error: message },
      { status: 500 }
    );
  }
}