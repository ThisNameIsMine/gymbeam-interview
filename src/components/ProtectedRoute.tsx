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
        // If authentication status is still loading, don't do anything yet.
        if (isLoading) {
            return;
        }

        // If not authenticated and loading is finished, redirect to login.
        if (!isAuthenticated) {
            router.replace('/login'); // Use replace to avoid adding to history stack
        }
    }, [isAuthenticated, isLoading, router]);

    // If loading, show a loading indicator or null to prevent flash of content
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading authentication status...</p>
            </div>
        );
    }

    // If authenticated, render the children (the protected page content)
    if (isAuthenticated) {
        return <>{children}</>;
    }

    // If not authenticated (and not loading), this part might not be reached due to redirect,
    // but it's good practice to return null or a loader.
    return null;
};

export default ProtectedRoute;