/**
 * Service de gestion des clubs
 *
 * CRUD complet pour les clubs sportifs
 * - Recuperer tous les clubs (pour la carte)
 * - Recuperer un club par ID
 * - Filtrer clubs par sport, ligue, localisation
 */

import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Interface pour un club sur la carte
export interface Club {
  id: string;
  name: string;
  sport: string;
  league: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt?: any;
}

// Interface pour le resultat des operations
export interface ClubServiceResult {
  success: boolean;
  error?: string;
  clubs?: Club[];
  club?: Club;
}

/**
 * Recuperer tous les clubs avec coordonnees (pour affichage carte)
 * @returns ClubServiceResult avec liste des clubs
 */
export const getAllClubs = async (): Promise<ClubServiceResult> => {
  try {
    // Requete Firestore : tous les users avec role='club' ET qui ont des coordonnees
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'club'));

    const querySnapshot = await getDocs(q);

    const clubs: Club[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Ajouter uniquement si le club a des coordonnees (adresse completee)
      if (data.coordinates && data.coordinates.latitude && data.coordinates.longitude) {
        clubs.push({
          id: doc.id,
          name: data.displayName || 'Club sans nom',
          sport: data.sport || 'Non specifie',
          league: data.league || 'Non specifie',
          address: data.address || {
            street: 'Non renseigne',
            postalCode: '00000',
            city: 'Non renseigne',
          },
          coordinates: {
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
          },
          createdAt: data.createdAt,
        });
      }
    });

    return {
      success: true,
      clubs,
    };
  } catch (error) {
    console.error('Erreur recuperation clubs:', error);
    return {
      success: false,
      error: 'Impossible de charger les clubs',
      clubs: [],
    };
  }
};

/**
 * Recuperer un club par son ID
 * @param clubId - ID du club (uid utilisateur)
 * @returns ClubServiceResult avec le club
 */
export const getClubById = async (clubId: string): Promise<ClubServiceResult> => {
  try {
    const clubDoc = await getDoc(doc(db, 'users', clubId));

    if (!clubDoc.exists()) {
      return {
        success: false,
        error: 'Club introuvable',
      };
    }

    const data = clubDoc.data();

    // Verifier que c'est bien un club
    if (data.role !== 'club') {
      return {
        success: false,
        error: 'Ce n\'est pas un compte club',
      };
    }

    const club: Club = {
      id: clubDoc.id,
      name: data.displayName || 'Club sans nom',
      sport: data.sport || 'Non specifie',
      league: data.league || 'Non specifie',
      address: data.address || {
        street: 'Non renseigne',
        postalCode: '00000',
        city: 'Non renseigne',
      },
      coordinates: data.coordinates || {
        latitude: 0,
        longitude: 0,
      },
      createdAt: data.createdAt,
    };

    return {
      success: true,
      club,
    };
  } catch (error) {
    console.error('Erreur recuperation club:', error);
    return {
      success: false,
      error: 'Impossible de charger le club',
    };
  }
};

/**
 * Filtrer clubs par sport
 * @param sport - Sport a filtrer (ex: "football")
 * @returns ClubServiceResult avec liste des clubs filtres
 */
export const getClubsBySport = async (sport: string): Promise<ClubServiceResult> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('role', '==', 'club'),
      where('sport', '==', sport)
    );

    const querySnapshot = await getDocs(q);

    const clubs: Club[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.coordinates && data.coordinates.latitude && data.coordinates.longitude) {
        clubs.push({
          id: doc.id,
          name: data.displayName || 'Club sans nom',
          sport: data.sport || 'Non specifie',
          league: data.league || 'Non specifie',
          address: data.address || {
            street: 'Non renseigne',
            postalCode: '00000',
            city: 'Non renseigne',
          },
          coordinates: {
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
          },
          createdAt: data.createdAt,
        });
      }
    });

    return {
      success: true,
      clubs,
    };
  } catch (error) {
    console.error('Erreur filtrage clubs par sport:', error);
    return {
      success: false,
      error: 'Impossible de filtrer les clubs',
      clubs: [],
    };
  }
};

/**
 * Filtrer clubs par ligue
 * @param league - Ligue a filtrer (ex: "FFF")
 * @returns ClubServiceResult avec liste des clubs filtres
 */
export const getClubsByLeague = async (league: string): Promise<ClubServiceResult> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('role', '==', 'club'),
      where('league', '==', league)
    );

    const querySnapshot = await getDocs(q);

    const clubs: Club[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.coordinates && data.coordinates.latitude && data.coordinates.longitude) {
        clubs.push({
          id: doc.id,
          name: data.displayName || 'Club sans nom',
          sport: data.sport || 'Non specifie',
          league: data.league || 'Non specifie',
          address: data.address || {
            street: 'Non renseigne',
            postalCode: '00000',
            city: 'Non renseigne',
          },
          coordinates: {
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
          },
          createdAt: data.createdAt,
        });
      }
    });

    return {
      success: true,
      clubs,
    };
  } catch (error) {
    console.error('Erreur filtrage clubs par ligue:', error);
    return {
      success: false,
      error: 'Impossible de filtrer les clubs',
      clubs: [],
    };
  }
};
