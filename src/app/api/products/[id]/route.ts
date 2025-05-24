import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: [`product-${id}`],
      },
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
  } catch (error: unknown) {
    console.error(`Internal Server Error fetching product ${id}:`, error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Internal Server Error', error: message },
      { status: 500 }
    );
  }
}
