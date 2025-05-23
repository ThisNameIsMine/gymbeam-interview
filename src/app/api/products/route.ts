// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

// Define an interface for the product structure (can be imported from a shared types file)
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

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      // In a real scenario with an API key, you'd add it to headers here:
      // headers: {
      //   'Authorization': `Bearer ${process.env.YOUR_API_KEY}`
      // }
      // For caching strategies with fetch in Next.js:
      cache: 'no-store', // Or 'force-cache', or revalidate options like { next: { revalidate: 3600 } }
    });

    if (!response.ok) {
      // Log the error on the server for debugging
      console.error(`API Error: ${response.status} ${response.statusText}`);
      // Return a more generic error to the client
      return NextResponse.json(
        { message: `Failed to fetch products from external API. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const products: Product[] = await response.json();
    return NextResponse.json(products);

  } catch (error: any) {
    // Log the error on the server
    console.error('Internal Server Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}