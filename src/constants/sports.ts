/**
 * Constantes pour les sports et ligues
 */

// Liste des sports disponibles
export const SPORTS = [
  { value: 'football', label: 'Football' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'volleyball', label: 'Volleyball' },
  { value: 'hockey', label: 'Hockey sur Glace' },
] as const;

// Liste des ligues/federations
export const LEAGUES = [
  { value: 'FFF', label: 'Federation Francaise de Football (FFF)' },
  { value: 'FFBB', label: 'Federation Francaise de Basketball (FFBB)' },
  { value: 'FFVB', label: 'Federation Francaise de Volleyball (FFVB)' },
  { value: 'FFHG', label: 'Federation Francaise de Hockey sur Glace (FFHG)' },
] as const;

// Types TypeScript
export type SportValue = typeof SPORTS[number]['value'];
export type LeagueValue = typeof LEAGUES[number]['value'];
