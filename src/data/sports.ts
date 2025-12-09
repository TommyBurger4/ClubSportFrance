/**
 * Donnees Sports et Federations
 *
 * Source: ligue_france.csv
 * Liste complete des sports et federations francaises
 */

export interface SportData {
  sport: string;
  federation: string;
  emoji?: string;
}

export const SPORTS_DATA: SportData[] = [
  { sport: 'Football', federation: 'FFF', emoji: '⚽' },
  { sport: 'Rugby a XV', federation: 'FFR', emoji: '🏉' },
  { sport: 'Rugby a XIII', federation: 'FF XIII', emoji: '🏉' },
  { sport: 'Basket-ball', federation: 'FFBB', emoji: '🏀' },
  { sport: 'Handball', federation: 'FFHandball', emoji: '🤾' },
  { sport: 'Volley-ball', federation: 'FFVolley', emoji: '🏐' },
  { sport: 'Hockey sur glace', federation: 'FFHG', emoji: '🏒' },
  { sport: 'Hockey sur gazon', federation: 'FFH', emoji: '🏑' },
  { sport: 'Tennis', federation: 'FFT', emoji: '🎾' },
  { sport: 'Tennis de table', federation: 'FFTT', emoji: '🏓' },
  { sport: 'Badminton', federation: 'FFBad', emoji: '🏸' },
  { sport: 'Judo', federation: 'FFJDA', emoji: '🥋' },
  { sport: 'Karate', federation: 'FFKDA', emoji: '🥋' },
  { sport: 'Boxe', federation: 'FFB', emoji: '🥊' },
  { sport: 'Lutte', federation: 'FFLDA', emoji: '🤼' },
  { sport: 'Escrime', federation: 'FFE', emoji: '🤺' },
  { sport: 'Athletisme', federation: 'FFA', emoji: '🏃' },
  { sport: 'Natation', federation: 'FFN', emoji: '🏊' },
  { sport: 'Cyclisme', federation: 'FFC', emoji: '🚴' },
  { sport: 'Aviron', federation: 'FFAviron', emoji: '🚣' },
  { sport: 'Golf', federation: 'FFGolf', emoji: '⛳' },
  { sport: 'Tir', federation: 'FFtir', emoji: '🎯' },
  { sport: 'Tir a l\'arc', federation: 'FFTA', emoji: '🏹' },
  { sport: 'Equitation', federation: 'FFE', emoji: '🏇' },
  { sport: 'Canoe-Kayak', federation: 'FFCK', emoji: '🛶' },
  { sport: 'Triathlon', federation: 'FFTri', emoji: '🏊' },
  { sport: 'Escalade', federation: 'FFME', emoji: '🧗' },
  { sport: 'Roller / Skateboard', federation: 'Federation Roller & Skateboard', emoji: '🛹' },
  { sport: 'Parachutisme', federation: 'FFP', emoji: '🪂' },
  { sport: 'Badminton de plage', federation: 'FFBad', emoji: '🏸' },
  { sport: 'Motocross', federation: 'FFM', emoji: '🏍️' },
  { sport: 'Sports de glisse nautiques', federation: 'FFVL', emoji: '🏄' },
  { sport: 'Boules / Petanque', federation: 'FFPJP', emoji: '🎱' },
  { sport: 'Tir sportif', federation: 'FFtir', emoji: '🎯' },
  { sport: 'Escrime artistique', federation: 'FFEscrime', emoji: '🤺' },
  { sport: 'Danse sportive', federation: 'FFDanseSport', emoji: '💃' },
  { sport: 'Poker sportif', federation: 'FFPoker', emoji: '🃏' },
  { sport: 'Esports', federation: 'FFJeuxVideo', emoji: '🎮' },
  { sport: 'Ski', federation: 'FFS', emoji: '⛷️' },
  { sport: 'Snowboard', federation: 'FFS', emoji: '🏂' },
  { sport: 'Surf', federation: 'FFS', emoji: '🏄' },
  { sport: 'Voile', federation: 'FFV', emoji: '⛵' },
  { sport: 'Plongee', federation: 'FFP', emoji: '🤿' },
  { sport: 'Taekwondo', federation: 'FFTDA', emoji: '🥋' },
  { sport: 'Sambo', federation: 'FFSambo', emoji: '🤼' },
  { sport: 'Aikido', federation: 'FFA', emoji: '🥋' },
  { sport: 'Savate boxe francaise', federation: 'FSBF', emoji: '🥊' },
  { sport: 'Petanque lyonnaise', federation: 'FFPLP', emoji: '🎱' },
  { sport: 'Jeux de boules', federation: 'Federation Francaise de Boules', emoji: '🎱' },
  { sport: 'Padel', federation: 'FFPadel', emoji: '🎾' },
  { sport: 'Pickleball', federation: 'Federation Francaise de Pickleball', emoji: '🏓' },
  { sport: 'Ultimate Frisbee', federation: 'Federation Flying-disc', emoji: '🥏' },
  { sport: 'Baseball/Softball', federation: 'FFBS', emoji: '⚾' },
  { sport: 'Cricket', federation: 'Federation Francaise de Cricket', emoji: '🏏' },
  { sport: 'Football americain', federation: 'FAF', emoji: '🏈' },
  { sport: 'Futsal', federation: 'FFF', emoji: '⚽' },
];

/**
 * Obtenir la federation selon le sport
 */
export const getFederationBySport = (sport: string): string | undefined => {
  const sportData = SPORTS_DATA.find(s => s.sport === sport);
  return sportData?.federation;
};

/**
 * Obtenir l'emoji selon le sport
 */
export const getEmojiSportBySport = (sport: string): string => {
  const sportData = SPORTS_DATA.find(s => s.sport === sport);
  return sportData?.emoji || '🏅';
};

/**
 * Liste des sports pour Select
 */
export const SPORTS_OPTIONS = SPORTS_DATA.map(s => ({
  value: s.sport,
  label: `${s.emoji || '🏅'} ${s.sport}`,
}));
