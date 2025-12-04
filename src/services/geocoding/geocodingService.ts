/**
 * Service de geocodage - Conversion adresse vers coordonnees GPS
 *
 * Utilise l'API Nominatim d'OpenStreetMap (gratuit, sans cle API)
 * Documentation : https://nominatim.org/release-docs/develop/api/Search/
 */

export interface GeocodingResult {
  success: boolean;
  latitude?: number;
  longitude?: number;
  error?: string;
  formattedAddress?: string;
}

/**
 * Convertir une adresse en coordonnees GPS
 * @param street - Numero et nom de rue (ex: "12 Rue du Sport")
 * @param postalCode - Code postal (ex: "67000")
 * @param city - Ville (ex: "Strasbourg")
 * @returns GeocodingResult avec lat/lng si succes
 */
export const geocodeAddress = async (
  street: string,
  postalCode: string,
  city: string
): Promise<GeocodingResult> => {
  try {
    // Construire l'adresse complete
    const fullAddress = `${street}, ${postalCode} ${city}, France`;

    // Appel API Nominatim (limite: 1 requete/seconde)
    const url = `https://nominatim.openstreetmap.org/search?` +
      `street=${encodeURIComponent(street)}&` +
      `postalcode=${encodeURIComponent(postalCode)}&` +
      `city=${encodeURIComponent(city)}&` +
      `country=France&` +
      `format=json&` +
      `limit=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ClubSportFrance/1.0', // Requis par Nominatim
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Erreur lors de la recherche de l\'adresse',
      };
    }

    const data = await response.json();

    // Verifier si des resultats
    if (!data || data.length === 0) {
      return {
        success: false,
        error: 'Adresse introuvable. Verifiez les informations saisies.',
      };
    }

    // Extraire les coordonnees du premier resultat
    const result = data[0];
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);

    return {
      success: true,
      latitude,
      longitude,
      formattedAddress: result.display_name,
    };
  } catch (error) {
    console.error('Erreur geocodage:', error);
    return {
      success: false,
      error: 'Impossible de localiser l\'adresse. Verifiez votre connexion.',
    };
  }
};

/**
 * Valider une adresse francaise
 * @param street - Rue
 * @param postalCode - Code postal
 * @param city - Ville
 * @returns true si valide, message erreur sinon
 */
export const validateAddress = (
  street: string,
  postalCode: string,
  city: string
): { valid: boolean; error?: string } => {
  // Verifier rue
  if (!street || street.trim().length < 3) {
    return {
      valid: false,
      error: 'L\'adresse doit contenir au moins 3 caracteres',
    };
  }

  // Verifier code postal francais (5 chiffres)
  const postalCodeRegex = /^[0-9]{5}$/;
  if (!postalCode || !postalCodeRegex.test(postalCode)) {
    return {
      valid: false,
      error: 'Le code postal doit contenir 5 chiffres',
    };
  }

  // Verifier ville
  if (!city || city.trim().length < 2) {
    return {
      valid: false,
      error: 'La ville doit contenir au moins 2 caracteres',
    };
  }

  return { valid: true };
};
