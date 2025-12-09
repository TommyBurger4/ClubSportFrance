/**
 * Constantes pour les sports et ligues
 *
 * Source: ligue_france.csv - 57 sports references
 */

import { SPORTS_DATA, SPORTS_OPTIONS, getFederationBySport } from '@/data/sports';

// Export pour retrocompatibilite
export const SPORTS = SPORTS_OPTIONS;

// Mapper sport -> federation
export { getFederationBySport };

// Export des donnees completes
export { SPORTS_DATA };

// DEPRECATED: Ne plus utiliser LEAGUES en tant que liste figee
// Utiliser getFederationBySport(sport) a la place
export const LEAGUES = [
  { value: 'FFF', label: 'FFF - Federation Francaise de Football' },
  { value: 'FFR', label: 'FFR - Federation Francaise de Rugby' },
  { value: 'FFBB', label: 'FFBB - Federation Francaise de Basketball' },
  { value: 'FFHandball', label: 'FFHandball - Federation Francaise de Handball' },
  { value: 'FFVB', label: 'FFVolley - Federation Francaise de Volleyball' },
  { value: 'FFHG', label: 'FFHG - Federation Francaise de Hockey sur Glace' },
];
