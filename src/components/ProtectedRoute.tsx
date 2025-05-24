// src/components/ProtectedRoute.tsx
"use client"; // This component handles client-side auth checks and redirection

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Ak nieje ešte načítané autentifikačné údaje, nebudeme robiť nič
        if (isLoading) {
            return;
        }

        // Ak používateľ nie je autentifikovaný, presmerujeme ho na prihlasovaciu stránku
        if (!isAuthenticated) {
            router.replace('/login'); // replace použijeme na zabránenie spätného navigovania na túto stránku
        }
    }, [isAuthenticated, isLoading, router]);

    // Ak sa stále načítavajú autentifikačné údaje, môžeme zobraziť načítavací indikátor alebo placeholder
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading authentication status...</p>
            </div>
        );
    }

    // Ak je používateľ autentifikovaný, zobrazíme obsah stránky
    if (isAuthenticated) {
        return <>{children}</>;
    }

    // V prípade, že používateľ nie je autentifikovaný, nevraciame nič (už sme ho presmerovali)
    return null;
};

export default ProtectedRoute;