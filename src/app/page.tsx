"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hook
import { redirect } from 'next/navigation';

export default function HomePage() {
  useEffect(() => {
    redirect('/login'); // Redirect to login page if not authenticated
  }), [];
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to login...</p>
    </div>
  );
}