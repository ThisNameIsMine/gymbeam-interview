// src/contexts/AuthContext.tsx
"use client"; // Kontext bude používaný v klientskych komponentoch

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Použijeme useRouter z next/navigation pre App Router

// Definícia typov pre kontext
interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean; // Na sledovanie počiatočného načítania stavu autentifikácie
}

// Vytvorenie kontextu s predvolenou hodnotou (undefined, aby sme mohli detekovať, či je Provider použitý)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider komponent
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Začíname s načítavaním
    const router = useRouter();

    // Efekt na kontrolu tokenu v localStorage pri načítaní aplikácie
    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                setToken(storedToken);
                setIsAuthenticated(true);
            }
        } catch (error) {
            // Chyba pri prístupe k localStorage (napr. v SSR prostredí pred hydratáciou, alebo ak je zakázané)
            console.warn('Nepodarilo sa získať prístup k localStorage:', error);
        } finally {
            setIsLoading(false); // Ukončenie načítavania
        }
    }, []);

    // Funkcia pre prihlásenie
    const login = (newToken: string) => {
        try {
            localStorage.setItem('authToken', newToken);
            setToken(newToken);
            setIsAuthenticated(true);
            router.push('/products'); // Presmerovanie na stránku produktov po prihlásení
        } catch (error) {
            console.error('Chyba pri ukladaní tokenu do localStorage:', error);
            // Môžeme sem pridať aj nejakú notifikáciu pre používateľa
        }
    };

    // Funkcia pre odhlásenie
    const logout = () => {
        try {
            localStorage.removeItem('authToken');
            setToken(null);
            setIsAuthenticated(false);
            router.push('/login'); // Presmerovanie na prihlasovaciu stránku po odhlásení
        } catch (error) {
            console.error('Chyba pri odstraňovaní tokenu z localStorage:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook pre jednoduché použitie AuthContextu
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth musí byť použitý v rámci AuthProvidera');
    }
    return context;
};