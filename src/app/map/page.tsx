'use client';

/**
 * Page /map - Carte interactive des clubs sportifs
 *
 * Ecran principal accessible a tous (avec ou sans connexion)
 * Affiche une carte Leaflet avec tous les clubs sportifs de France
 */

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/AuthContext';
import { getAllClubs, Club } from '@/services/club/clubService';
import { SPORTS } from '@/constants/sports';

// Charger MapView uniquement cote client (pas de SSR)
const MapView = dynamic(() => import('@/components/MapView').then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState<Array<{
    id: string;
    name: string;
    sport: string;
    city: string;
    lat: number;
    lng: number;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Etats pour recherche et filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Charger les clubs depuis Firestore au montage
  useEffect(() => {
    const loadClubs = async () => {
      setLoading(true);
      setError(null);

      const result = await getAllClubs();

      if (result.success && result.clubs) {
        // Convertir les clubs Firestore au format attendu par MapView
        const formattedClubs = result.clubs.map((club) => ({
          id: club.id,
          name: club.name,
          sport: club.sport,
          city: club.address.city,
          lat: club.coordinates.latitude,
          lng: club.coordinates.longitude,
        }));

        setClubs(formattedClubs);
      } else {
        setError(result.error || 'Impossible de charger les clubs');
      }

      setLoading(false);
    };

    loadClubs();
  }, []);

  // Fermer le panneau filtres si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  // Filtrer les clubs selon sports selectionnes uniquement
  const filteredClubs = useMemo(() => {
    let result = clubs;

    // Filtre sports
    if (selectedSports.length > 0) {
      result = result.filter((club) => selectedSports.includes(club.sport));
    }

    return result;
  }, [clubs, selectedSports]);

  // Recherche geographique par ville
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      // Utiliser Nominatim pour geocoder la ville
      const url = `https://nominatim.openstreetmap.org/search?` +
        `city=${encodeURIComponent(searchQuery)}&` +
        `country=France&` +
        `format=json&` +
        `limit=1`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'ClubSportFrance/1.0',
        },
      });

      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const center: [number, number] = [parseFloat(result.lat), parseFloat(result.lon)];
        setMapCenter(center);
      } else {
        alert(`Ville "${searchQuery}" introuvable en France`);
      }
    } catch (error) {
      console.error('Erreur geocodage:', error);
      alert('Impossible de localiser la ville');
    } finally {
      setSearchLoading(false);
    }
  };

  // Toggle sport filter
  const toggleSportFilter = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSports([]);
  };

  // Sport emojis mapping
  const getSportEmoji = (sport: string): string => {
    const sportEmojis: { [key: string]: string } = {
      'Football': '⚽',
      'football': '⚽',
      'Basketball': '🏀',
      'basketball': '🏀',
      'Volleyball': '🏐',
      'volleyball': '🏐',
      'Hockey sur Glace': '🏒',
      'hockey': '🏒',
    };
    return sportEmojis[sport] || '🏅';
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header transparent */}
      <header className="absolute top-0 left-0 right-0 z-[1001] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="bg-white rounded-lg shadow-lg p-2.5">
            <span className="text-2xl">🏃‍♂️</span>
          </Link>

          {/* Groupe droite : Recherche + Filtres + Espace Club */}
          <div className="flex items-center gap-3 flex-1 justify-end max-w-4xl">
            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="flex-1 max-w-3xl flex gap-2">
              <input
                type="text"
                placeholder="Rechercher une ville en France..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={searchLoading}
                className="flex-1 px-4 py-3 border-0 rounded-lg text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={searchLoading || !searchQuery.trim()}
                className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {searchLoading ? '...' : '🔍'}
              </button>
            </form>

            {/* Bouton filtres */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-lg shadow-lg transition-colors ${
                  showFilters || selectedSports.length > 0
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Filtres"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              {selectedSports.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {selectedSports.length}
                </span>
              )}
            </div>

            {/* Bouton Espace Club */}
            <Link
              href={user ? "/dashboard" : "/login"}
              className="bg-primary text-white px-5 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold shadow-lg whitespace-nowrap"
            >
              {user ? "Mon Dashboard" : "Espace Club"}
            </Link>
          </div>
        </div>

        {/* Panneau filtres dropdown */}
        {showFilters && (
          <div ref={filtersRef} className="absolute top-full mt-2 right-4 bg-white rounded-lg shadow-xl p-4 w-80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Filtres sport */}
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-700 mb-2">Sports</p>
              <div className="flex flex-wrap gap-2">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.value}
                    onClick={() => toggleSportFilter(sport.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                      selectedSports.includes(sport.value)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getSportEmoji(sport.value)} {sport.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats et reset */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-primary">{filteredClubs.length}</span> / {clubs.length} club{filteredClubs.length > 1 ? 's' : ''}
              </p>
              {(searchQuery || selectedSports.length > 0) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary hover:text-primary-dark font-semibold"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Carte */}
      <main className="flex-1 relative">
        {loading ? (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
              <p className="text-gray-600">Chargement des clubs...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
              <p className="text-red-600 mb-4">❌ {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                Reessayer
              </button>
            </div>
          </div>
        ) : (
          <MapView
            key="main-map"
            clubs={filteredClubs}
            searchCenter={mapCenter}
            autoZoom={selectedSports.length > 0}
          />
        )}
      </main>
    </div>
  );
}
