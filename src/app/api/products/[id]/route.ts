// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { Product } from '@/types'; // Assuming you have a shared types file


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next:{
        revalidate: 3600, // Cache for 60 seconds
        tags: [`product-${id}`] // Tag for cache invalidation
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      console.error(`API Error fetching product ${id}: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { message: `Failed to fetch product. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const product: Product = await response.json();
    return NextResponse.json(product);

  } catch (error: any) {
    console.error(`Internal Server Error fetching product ${id}:`, error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}