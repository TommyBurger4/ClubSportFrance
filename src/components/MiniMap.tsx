'use client';

/**
 * Composant MiniMap - Mini carte Leaflet pour profil club
 *
 * Version simplifiee de MapView :
 * - Affiche un seul marker (le club)
 * - Lecture seule (pas de scroll/drag)
 * - Taille reduite pour sidebar
 */

import React, { useMemo, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MiniMapProps {
  latitude: number;
  longitude: number;
  clubName: string;
  sport: string;
}

export const MiniMap: React.FC<MiniMapProps> = ({
  latitude,
  longitude,
  clubName,
  sport,
}) => {
  const [isClient, setIsClient] = useState(false);

  // Initialiser Leaflet cote client uniquement
  useEffect(() => {
    setIsClient(true);

    // Fix pour les icones Leaflet avec Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  // Fonction pour obtenir l'emoji selon le sport
  const getSportEmoji = (sport: string): string => {
    const sportEmojis: { [key: string]: string } = {
      'football': '⚽',
      'Football': '⚽',
      'basketball': '🏀',
      'Basketball': '🏀',
      'volleyball': '🏐',
      'Volleyball': '🏐',
      'hockey': '🏒',
      'Hockey': '🏒',
      'Hockey sur Glace': '🏒',
    };
    return sportEmojis[sport] || '🏅';
  };

  // Icone personnalisee avec emoji du sport (memoise)
  const clubIcon = useMemo(() => {
    if (!isClient) return null;

    const emoji = getSportEmoji(sport);
    return new L.DivIcon({
      html: `
        <div class="custom-marker-pin">
          <div class="pin-emoji">${emoji}</div>
        </div>
      `,
      className: 'custom-emoji-marker',
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [0, -50],
    });
  }, [sport, isClient]);

  // Afficher placeholder pendant le chargement cote client
  if (!isClient) {
    return (
      <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Chargement carte...</p>
      </div>
    );
  }

  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden">
      <MapContainer
        key={`${latitude}-${longitude}`}
        center={[latitude, longitude]}
        zoom={14}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        className="h-full w-full"
      >
        {/* Tuiles OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker du club */}
        {clubIcon && <Marker position={[latitude, longitude]} icon={clubIcon} />}
      </MapContainer>
    </div>
  );
};
