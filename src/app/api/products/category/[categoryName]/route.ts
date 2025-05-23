// src/app/api/products/category/[categoryName]/route.ts
import { NextResponse } from 'next/server';

interface Product { /* ... (same Product interface as above) ... */ }

export async function GET(
  request: Request, // First argument is Request object
  { params }: { params: { categoryName: string } } // Second argument contains route params
) {
  const { categoryName } = await params;

  if (!categoryName) {
    return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`API Error fetching products for category ${categoryName}: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { message: `Failed to fetch products for category. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const products: Product[] = await response.json();
    return NextResponse.json(products);

  } catch (error: any) {
    console.error(`Internal Server Error fetching products for category ${categoryName}:`, error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}