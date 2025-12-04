'use client';

/**
 * Page /dashboard - Dashboard du club
 *
 * Redirige vers la fiche du club en mode edition
 * Accessible uniquement si connecte avec role='club'
 */

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Non connecte → redirection login
        router.push('/login');
      } else if (userData?.role !== 'club') {
        // Connecte mais pas un club → redirection carte
        router.push('/map');
      } else {
        // Connecte en tant que club → redirection vers fiche club en mode edit
        router.push(`/clubs/${user.uid}?edit=true`);
      }
    }
  }, [user, userData, loading, router]);

  // Affichage loading pendant la verification
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="text-gray-600">Redirection vers votre dashboard...</p>
      </div>
    </div>
  );
}
