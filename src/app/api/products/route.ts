// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { Product } from '@/types/types'; // Assuming you have a Product type defined

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {     
      next: {
        revalidate: 3600, // Revaliduje po 1 hodine (3600 sekúnd)
        tags: ['products'] // Tag pre invalidáciu cache
      }
    });

    if (!response.ok) {
      // V prípade chyby API, logujeme chybu na serveri
      console.error(`API Error: ${response.status} ${response.statusText}`);
      // Vrátime chybovú odpoveď s príslušným statusom
      return NextResponse.json(
        { message: `Failed to fetch products from external API. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const products: Product[] = await response.json();
    return NextResponse.json(products);

  } catch (error: unknown) {    
    console.error('Internal Server Error fetching products:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Internal Server Error', error: message },
      { status: 500 }
    );
  }
}