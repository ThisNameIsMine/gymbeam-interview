// src/app/api/products/categories/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories', {
      cache: 'no-store', // Or configure as needed
    });

    if (!response.ok) {
      console.error(`API Error fetching categories: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { message: `Failed to fetch categories. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const categories: string[] = await response.json();
    return NextResponse.json(categories);

  } catch (error: any) {
    console.error('Internal Server Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}