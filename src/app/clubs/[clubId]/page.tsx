'use client';

/**
 * Page /clubs/[clubId] - Fiche complete d'un club
 *
 * Affiche toutes les informations d'un club sportif
 * Mode edition si l'utilisateur est le proprietaire
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getClubById, Club } from '@/services/club/clubService';
import { Button, Card } from '@/components/ui';

// Charger MiniMap uniquement cote client (pas de SSR)
const MiniMap = dynamic(() => import('@/components/MiniMap').then(mod => ({ default: mod.MiniMap })), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Chargement carte...</p>
    </div>
  ),
});

export default function ClubPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const clubId = params.clubId as string;
  const editMode = searchParams.get('edit') === 'true';
  const { logout } = useAuth();

  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verifier si l'utilisateur est le proprietaire du club
  const isOwner = user && user.uid === clubId;

  // Fonction de deconnexion
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      window.location.href = '/map';
    }
  };

  // Charger les infos du club
  useEffect(() => {
    const loadClub = async () => {
      setLoading(true);
      setError(null);

      const result = await getClubById(clubId);

      if (result.success && result.club) {
        setClub(result.club);
      } else {
        setError(result.error || 'Club introuvable');
      }

      setLoading(false);
    };

    loadClub();
  }, [clubId]);

  // Fonction pour obtenir l'emoji du sport
  const getSportEmoji = (sport: string): string => {
    const sportEmojis: { [key: string]: string } = {
      'football': '⚽',
      'basketball': '🏀',
      'volleyball': '🏐',
      'hockey': '🏒',
    };
    return sportEmojis[sport.toLowerCase()] || '🏅';
  };

  // Fonction pour obtenir le nom complet de la ligue
  const getLeagueName = (league: string): string => {
    const leagues: { [key: string]: string } = {
      'FFF': 'Federation Francaise de Football',
      'FFBB': 'Federation Francaise de Basketball',
      'FFVB': 'Federation Francaise de Volleyball',
      'FFHG': 'Federation Francaise de Hockey sur Glace',
    };
    return leagues[league] || league;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Chargement du club...</p>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
          <p className="text-red-600 mb-4">❌ {error || 'Club introuvable'}</p>
          <Link href="/map">
            <Button>Retour a la carte</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link href="/map" className="flex items-center gap-2">
          <span className="text-2xl">🏃‍♂️</span>
          <h1 className="text-xl font-bold text-gray-900">ClubSportFrance</h1>
        </Link>

        <div className="flex items-center gap-4">
          {isOwner ? (
            <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
              👤 Votre club
            </span>
          ) : (
            <Link href="/map">
              <Button variant="secondary" size="sm">
                Retour a la carte
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* En-tete du club */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Logo du club (emoji du sport pour l'instant) */}
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-4xl">
                {getSportEmoji(club.sport)}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {club.name}
                </h1>
                <div className="flex items-center gap-2">
                  {/* Badge Sport */}
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-sm font-semibold">
                    {getSportEmoji(club.sport)} {club.sport}
                  </span>
                  {/* Badge Ligue */}
                  <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                    {club.league}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons actions */}
            <div className="flex gap-2">
              {isOwner && (
                <Button size="sm">
                  ✏️ Modifier
                </Button>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Colonne gauche (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">📋 Informations</h2>
                {isOwner && (
                  <button className="text-primary hover:text-primary-dark text-sm font-semibold">
                    ✏️ Modifier
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Adresse */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">📍 Adresse</h3>
                  <p className="text-gray-900">
                    {club.address.street}<br />
                    {club.address.postalCode} {club.address.city}
                  </p>
                </div>

                {/* Ligue */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">🏆 Federation</h3>
                  <p className="text-gray-900">{getLeagueName(club.league)}</p>
                </div>

                {/* Description (TODO) */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">📝 Description</h3>
                  <p className="text-gray-600 italic">
                    {isOwner
                      ? 'Cliquez sur "Modifier" pour ajouter une description de votre club'
                      : 'Aucune description disponible'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact (TODO) */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">📞 Contact</h2>
                {isOwner && (
                  <button className="text-primary hover:text-primary-dark text-sm font-semibold">
                    ✏️ Modifier
                  </button>
                )}
              </div>

              <p className="text-gray-600 italic">
                {isOwner
                  ? 'Ajoutez vos coordonnees de contact (telephone, email, site web)'
                  : 'Aucune information de contact disponible'}
              </p>
            </Card>

            {/* Equipements (TODO) */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">🏟️ Equipements</h2>
                {isOwner && (
                  <button className="text-primary hover:text-primary-dark text-sm font-semibold">
                    ✏️ Modifier
                  </button>
                )}
              </div>

              <p className="text-gray-600 italic">
                {isOwner
                  ? 'Listez les equipements disponibles (vestiaires, douches, parking, etc.)'
                  : 'Aucune information sur les equipements'}
              </p>
            </Card>
          </div>

          {/* Colonne droite (1/3) */}
          <div className="space-y-6">
            {/* Carte miniature */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">📍 Localisation</h2>
              <MiniMap
                latitude={club.coordinates.latitude}
                longitude={club.coordinates.longitude}
                clubName={club.name}
                sport={club.sport}
              />
              <p className="text-sm text-gray-600 mt-3">
                {club.address.street}<br />
                {club.address.postalCode} {club.address.city}
              </p>
              <Link
                href={`/map`}
                className="mt-3 inline-block text-primary hover:text-primary-dark font-semibold text-sm"
              >
                Voir sur la carte →
              </Link>
            </Card>

            {/* Stats (si owner) */}
            {isOwner && (
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Statistiques</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Vues</p>
                    <p className="text-2xl font-bold text-primary">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Favoris</p>
                    <p className="text-2xl font-bold text-primary">0</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Actions rapides */}
            {!isOwner && (
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Contact</h2>
                <div className="space-y-2">
                  <Button fullWidth variant="secondary" disabled>
                    📧 Envoyer un email
                  </Button>
                  <Button fullWidth variant="secondary" disabled>
                    📞 Appeler
                  </Button>
                  <Button fullWidth variant="secondary" disabled>
                    🌐 Site web
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Le club n'a pas encore ajoute ses coordonnees
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Bouton deconnexion (si proprietaire) */}
        {isOwner && (
          <div className="mt-8 pb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Deconnexion</h3>
                  <p className="text-sm text-gray-600">Se deconnecter de votre compte club</p>
                </div>
                <Button variant="danger" onClick={handleLogout}>
                  🚪 Se deconnecter
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
