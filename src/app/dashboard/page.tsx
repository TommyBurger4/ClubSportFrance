'use client';

/**
 * Dashboard Club
 *
 * Permet au club de gerer :
 * - SPORTS D'EQUIPE : Ses equipes (categorie + niveau + genre)
 * - SPORTS INDIVIDUELS : Les categories d'age acceptees + genres
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getClubById } from '@/services/club/clubService';
import { isSportEquipe, getSportCategories } from '@/data/sportsCategories';
import { Card, Button } from '@/components/ui';
import EquipeManager from './components/EquipeManager';
import CategoriesManager from './components/CategoriesManager';

export default function DashboardPage() {
  const router = useRouter();
  const { user, userData, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clubData, setClubData] = useState<any>(null);
  const [sportType, setSportType] = useState<'equipe' | 'individuel' | null>(null);

  useEffect(() => {
    const loadClubData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Verifier que c'est bien un club
      if (userData?.role !== 'club') {
        router.push('/');
        return;
      }

      // Charger les donnees du club
      const result = await getClubById(user.uid);

      if (result.success && result.club) {
        setClubData(result.club);

        // Determiner le type de sport
        const sportCategories = getSportCategories(result.club.sport);
        if (sportCategories) {
          setSportType(sportCategories.type);
        }
      }

      setLoading(false);
    };

    if (!authLoading) {
      loadClubData();
    }
  }, [user, userData, authLoading, router]);

  // Redirection si non authentifie
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!clubData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <p className="text-red-600">Erreur de chargement des donnees du club</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-2">
                <span className="text-2xl">🏃‍♂️</span>
                <span className="text-xl font-bold text-gray-900">ClubSportFrance</span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{clubData.name}</h1>
              <p className="mt-1 text-sm text-gray-600">
                {clubData.sport} • {clubData.league}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => router.push(`/clubs/${user?.uid}`)}
              >
                Voir ma fiche publique
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push('/')}
              >
                Retour a la carte
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche : Informations generales */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Informations du club
              </h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sport</p>
                  <p className="text-gray-900">{clubData.sport}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Federation</p>
                  <p className="text-gray-900">{clubData.league}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Adresse</p>
                  <p className="text-gray-900">
                    {clubData.address?.street}<br />
                    {clubData.address?.postalCode} {clubData.address?.city}
                  </p>
                </div>

                {clubData.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-gray-900 text-sm whitespace-pre-line">
                      {clubData.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => router.push(`/clubs/${user?.uid}`)}
                >
                  Modifier les informations
                </Button>
              </div>
            </Card>
          </div>

          {/* Colonne droite : Gestion equipes/categories */}
          <div className="lg:col-span-2">
            {sportType === 'equipe' && (
              <EquipeManager clubId={user!.uid} sport={clubData.sport} />
            )}

            {sportType === 'individuel' && (
              <CategoriesManager clubId={user!.uid} sport={clubData.sport} />
            )}

            {!sportType && (
              <Card>
                <p className="text-gray-600">
                  Sport non reconnu. Veuillez mettre a jour votre profil.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
