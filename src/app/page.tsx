"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hook
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth(); // Získanie informácie o autentifikácii z AuthContext

  useEffect(() => {
    if (isLoading) return; // Nečakaj redirect, kým sa nenačíta stav
    if (isAuthenticated) {
      redirect('/products'); // Presmerovanie na stránku produktov, ak je používateľ autentifikovaný
    } else {
      redirect('/login'); // Presmerovanie na prihlasovaciu stránku, ak nie je autentifikovaný
    }
  }, [isAuthenticated, isLoading]);


  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to login...</p>
    </div>
  );
}