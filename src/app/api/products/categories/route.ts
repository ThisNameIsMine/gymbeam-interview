// src/app/api/products/categories/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories', {
      next: {
        revalidate: 3600, // Revaliduje po 1 hodine (3600 sekúnd)
        tags: ['categories'] // Tag pre revalidáciu cache
      }
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

  } catch (error: unknown) {
    console.error('Internal Server Error fetching categories:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';    
    return NextResponse.json(
      { message: 'Internal Server Error', error: message },
      { status: 500 }
    );
  }
}