/**
 * Structures completes des categories et niveaux pour chaque sport
 *
 * SPORTS D'EQUIPE : Le club declare chaque equipe (categorie + niveau + genre)
 * SPORTS INDIVIDUELS : Le club coche les categories d'age acceptees + genres
 */

export interface NiveauCompetition {
  id: string;
  nom: string;
  divisions?: string[]; // Ex: ["D1", "D2", "D3"] pour Departemental
}

export interface CategorieAge {
  id: string;
  nom: string;
  ageMin?: number;
  ageMax?: number;
  niveauxDisponibles?: NiveauCompetition[]; // Uniquement pour sports d'equipe
  genres: string[]; // ["M", "F"] ou ["M", "F", "Mixte"]
}

export interface SportCategories {
  sport: string;
  federation: string;
  emoji: string;
  type: 'equipe' | 'individuel'; // Determine l'interface d'inscription
  categories: CategorieAge[];
}

export const SPORTS_CATEGORIES: SportCategories[] = [
  // ==========================================
  // SPORTS D'EQUIPE (11 sports)
  // ==========================================

  {
    sport: "Football",
    federation: "FFF",
    emoji: "⚽",
    type: "equipe",
    categories: [
      {
        id: "u6u7",
        nom: "U6-U7",
        ageMin: 6,
        ageMax: 7,
        niveauxDisponibles: [
          { id: "plateau", nom: "Plateau Depart" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u8u9",
        nom: "U8-U9",
        ageMin: 8,
        ageMax: 9,
        niveauxDisponibles: [
          { id: "plateau", nom: "Plateau Depart" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u10u11",
        nom: "U10-U11",
        ageMin: 10,
        ageMax: 11,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental", divisions: ["D1", "D2", "D3"] }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u12u13",
        nom: "U12-U13",
        ageMin: 12,
        ageMax: 13,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental", divisions: ["D1", "D2", "D3"] },
          { id: "regional", nom: "Regional", divisions: ["R1", "R2"] }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u14u15",
        nom: "U14-U15",
        ageMin: 14,
        ageMax: 15,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental", divisions: ["D1", "D2", "D3"] },
          { id: "regional", nom: "Regional", divisions: ["R1", "R2", "R3"] },
          { id: "national", nom: "National" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u16u17",
        nom: "U16-U17",
        ageMin: 16,
        ageMax: 17,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental", divisions: ["D1", "D2", "D3"] },
          { id: "regional", nom: "Regional", divisions: ["R1", "R2", "R3"] },
          { id: "national", nom: "National", divisions: ["N1", "N2", "N3"] }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u18u19",
        nom: "U18-U19",
        ageMin: 18,
        ageMax: 19,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental", divisions: ["D1", "D2", "D3"] },
          { id: "regional", nom: "Regional", divisions: ["R1", "R2", "R3"] },
          { id: "national", nom: "National", divisions: ["N1", "N2", "N3"] }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 18,
        niveauxDisponibles: [
          { id: "ligue1", nom: "Ligue 1" },
          { id: "ligue2", nom: "Ligue 2" },
          { id: "national", nom: "National", divisions: ["N1", "N2", "N3"] },
          { id: "regional", nom: "Regional", divisions: ["R1", "R2", "R3"] },
          { id: "departemental", nom: "Departemental", divisions: ["D1", "D2", "D3", "D4", "D5"] },
          { id: "loisirs", nom: "Loisirs" }
        ],
        genres: ["M", "F", "Mixte"]
      }
    ]
  },

  {
    sport: "Basket-ball",
    federation: "FFBB",
    emoji: "🏀",
    type: "equipe",
    categories: [
      {
        id: "u7",
        nom: "U7",
        ageMax: 7,
        niveauxDisponibles: [
          { id: "baby_basket", nom: "Baby Basket" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u9",
        nom: "U9",
        ageMax: 9,
        niveauxDisponibles: [
          { id: "mini_poussins", nom: "Mini-Poussins" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u13",
        nom: "U13",
        ageMax: 13,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" },
          { id: "elite", nom: "Elite" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" },
          { id: "elite", nom: "Elite" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u20",
        nom: "U20",
        ageMax: 20,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "nm1", nom: "NM1" },
          { id: "espoirs", nom: "Espoirs Pro" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 18,
        niveauxDisponibles: [
          { id: "betclic_elite", nom: "Betclic Elite" },
          { id: "pro_b", nom: "Pro B" },
          { id: "nm1", nom: "NM1" },
          { id: "nm2", nom: "NM2" },
          { id: "nm3", nom: "NM3" },
          { id: "regional", nom: "Regional", divisions: ["R1", "R2", "R3"] },
          { id: "departemental", nom: "Departemental", divisions: ["D1", "D2", "D3"] },
          { id: "loisirs", nom: "Loisirs" }
        ],
        genres: ["M", "F", "Mixte"]
      }
    ]
  },

  {
    sport: "Volley-ball",
    federation: "FFVolley",
    emoji: "🏐",
    type: "equipe",
    categories: [
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        niveauxDisponibles: [
          { id: "plateau_depart", nom: "Plateau Departemental" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u13",
        nom: "U13",
        ageMax: 13,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" },
          { id: "elite", nom: "Elite" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u19",
        nom: "U19",
        ageMax: 19,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" },
          { id: "elite", nom: "Elite" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 18,
        niveauxDisponibles: [
          { id: "ligue_a", nom: "Ligue A" },
          { id: "ligue_b", nom: "Ligue B" },
          { id: "nationale1", nom: "Nationale 1" },
          { id: "nationale2", nom: "Nationale 2" },
          { id: "nationale3", nom: "Nationale 3" },
          { id: "regional", nom: "Regional", divisions: ["R1", "R2", "R3"] },
          { id: "departemental", nom: "Departemental", divisions: ["D1", "D2", "D3"] },
          { id: "loisirs", nom: "Loisirs" }
        ],
        genres: ["M", "F", "Mixte"]
      }
    ]
  },

  {
    sport: "Rugby a XV",
    federation: "FFR",
    emoji: "🏉",
    type: "equipe",
    categories: [
      {
        id: "u6u8",
        nom: "U6-U8",
        ageMin: 6,
        ageMax: 8,
        niveauxDisponibles: [
          { id: "plateau_decouverte", nom: "Plateau Decouverte" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u10",
        nom: "U10",
        ageMax: 10,
        niveauxDisponibles: [
          { id: "plateau_depart", nom: "Plateau Departemental" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u12",
        nom: "U12",
        ageMax: 12,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u14",
        nom: "U14",
        ageMax: 14,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u16",
        nom: "U16",
        ageMax: 16,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "reichel", nom: "Reichel (Elite)" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u18",
        nom: "U18",
        ageMax: 18,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "crabos", nom: "Crabos (Elite)" },
          { id: "espoirs", nom: "Espoirs (Federale)" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 18,
        niveauxDisponibles: [
          { id: "top14", nom: "Top 14" },
          { id: "pro_d2", nom: "Pro D2" },
          { id: "nationale", nom: "Nationale" },
          { id: "federale1", nom: "Federale 1" },
          { id: "federale2", nom: "Federale 2" },
          { id: "federale3", nom: "Federale 3" },
          { id: "regional", nom: "Regional" },
          { id: "departemental", nom: "Departemental" }
        ],
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Rugby a XIII",
    federation: "FF XIII",
    emoji: "🏉",
    type: "equipe",
    categories: [
      {
        id: "u8u10",
        nom: "U8-U10",
        ageMin: 8,
        ageMax: 10,
        niveauxDisponibles: [
          { id: "plateau", nom: "Plateau Depart" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u12",
        nom: "U12",
        ageMax: 12,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u14",
        nom: "U14",
        ageMax: 14,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "national", nom: "National" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u16",
        nom: "U16",
        ageMax: 16,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "national", nom: "National" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u18",
        nom: "U18",
        ageMax: 18,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "national", nom: "National" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 18,
        niveauxDisponibles: [
          { id: "elite1", nom: "Elite 1" },
          { id: "elite2", nom: "Elite 2" },
          { id: "nationale", nom: "Nationale" },
          { id: "regional", nom: "Regional" },
          { id: "departemental", nom: "Departemental" }
        ],
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Handball",
    federation: "FFHandball",
    emoji: "🤾",
    type: "equipe",
    categories: [
      {
        id: "u9",
        nom: "U9",
        ageMax: 9,
        niveauxDisponibles: [
          { id: "plateau", nom: "Plateau Decouverte" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u13",
        nom: "U13",
        ageMax: 13,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" },
          { id: "elite", nom: "Elite" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u19",
        nom: "U19",
        ageMax: 19,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" },
          { id: "elite", nom: "Elite" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 18,
        niveauxDisponibles: [
          { id: "lnh_d1", nom: "Ligue Nationale (D1)" },
          { id: "proligue", nom: "ProLigue (D2)" },
          { id: "nationale1", nom: "Nationale 1" },
          { id: "nationale2", nom: "Nationale 2" },
          { id: "nationale3", nom: "Nationale 3" },
          { id: "regional", nom: "Regional" },
          { id: "departemental", nom: "Departemental" }
        ],
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Hockey sur glace",
    federation: "FFHG",
    emoji: "🏒",
    type: "equipe",
    categories: [
      {
        id: "u7u9",
        nom: "U7-U9",
        ageMin: 7,
        ageMax: 9,
        niveauxDisponibles: [
          { id: "initiation", nom: "Initiation" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u13",
        nom: "U13",
        ageMax: 13,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" },
          { id: "elite", nom: "Elite" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "excellence", nom: "Excellence" },
          { id: "elite", nom: "Elite" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u20",
        nom: "U20",
        ageMax: 20,
        niveauxDisponibles: [
          { id: "elite", nom: "Elite" },
          { id: "excellence", nom: "Excellence" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 18,
        niveauxDisponibles: [
          { id: "synerglace_ligue_magnus", nom: "Synerglace Ligue Magnus" },
          { id: "division1", nom: "Division 1" },
          { id: "division2", nom: "Division 2" },
          { id: "division3", nom: "Division 3" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Hockey sur gazon",
    federation: "FFH",
    emoji: "🏑",
    type: "equipe",
    categories: [
      {
        id: "u8u10",
        nom: "U8-U10",
        ageMin: 8,
        ageMax: 10,
        niveauxDisponibles: [
          { id: "plateau", nom: "Plateau Decouverte" }
        ],
        genres: ["M", "F", "Mixte"]
      },
      {
        id: "u12",
        nom: "U12",
        ageMax: 12,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u14",
        nom: "U14",
        ageMax: 14,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "national", nom: "National" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u16",
        nom: "U16",
        ageMax: 16,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "national", nom: "National" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u18",
        nom: "U18",
        ageMax: 18,
        niveauxDisponibles: [
          { id: "departemental", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "national", nom: "National" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 18,
        niveauxDisponibles: [
          { id: "nationale1", nom: "Nationale 1" },
          { id: "nationale2", nom: "Nationale 2" },
          { id: "nationale3", nom: "Nationale 3" },
          { id: "regional", nom: "Regional" },
          { id: "departemental", nom: "Departemental" }
        ],
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Baseball/Softball",
    federation: "FFBS",
    emoji: "⚾",
    type: "equipe",
    categories: [
      {
        id: "u6",
        nom: "U6",
        ageMax: 6,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u9",
        nom: "U9",
        ageMax: 9,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u10",
        nom: "U10",
        ageMax: 10,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u12",
        nom: "U12",
        ageMax: 12,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "nationale", nom: "Nationale" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "nationale", nom: "Nationale" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u18",
        nom: "U18",
        ageMax: 18,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "nationale", nom: "Nationale" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u23",
        nom: "U23",
        ageMax: 23,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "nationale", nom: "Nationale" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 24,
        niveauxDisponibles: [
          { id: "nationale1", nom: "Nationale 1" },
          { id: "nationale2", nom: "Nationale 2" },
          { id: "nationale3", nom: "Nationale 3" },
          { id: "regional", nom: "Regional" },
          { id: "depart", nom: "Departemental" }
        ],
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Football americain",
    federation: "FAF",
    emoji: "🏈",
    type: "equipe",
    categories: [
      {
        id: "u7",
        nom: "U7",
        ageMax: 7,
        niveauxDisponibles: [
          { id: "plateau_depart_5v5", nom: "Plateau Departemental 5v5" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u9",
        nom: "U9",
        ageMax: 9,
        niveauxDisponibles: [
          { id: "plateau_depart_7v7", nom: "Plateau Departemental 7v7" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        niveauxDisponibles: [
          { id: "depart_9v9", nom: "Departemental 9v9" },
          { id: "regional_9v9", nom: "Regional 9v9" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u13",
        nom: "U13",
        ageMax: 13,
        niveauxDisponibles: [
          { id: "depart_11v11", nom: "Departemental 11v11" },
          { id: "regional_11v11", nom: "Regional 11v11" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "nationale", nom: "Nationale" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "nationale1", nom: "Nationale 1" },
          { id: "nationale2", nom: "Nationale 2" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u20",
        nom: "U20",
        ageMax: 20,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" },
          { id: "nationale1", nom: "Nationale 1" },
          { id: "nationale2", nom: "Nationale 2" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 21,
        niveauxDisponibles: [
          { id: "division1", nom: "Division 1" },
          { id: "division2", nom: "Division 2" },
          { id: "division3", nom: "Division 3" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Futsal",
    federation: "FFF",
    emoji: "⚽",
    type: "equipe",
    categories: [
      {
        id: "u9",
        nom: "U9",
        ageMax: 9,
        niveauxDisponibles: [
          { id: "plateau_depart", nom: "Plateau Departemental" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        niveauxDisponibles: [
          { id: "plateau_depart", nom: "Plateau Departemental" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u13",
        nom: "U13",
        ageMax: 13,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "u19",
        nom: "U19",
        ageMax: 19,
        niveauxDisponibles: [
          { id: "depart", nom: "Departemental" },
          { id: "regional", nom: "Regional" }
        ],
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 20,
        niveauxDisponibles: [
          { id: "nationale1", nom: "Nationale 1" },
          { id: "nationale2", nom: "Nationale 2" },
          { id: "nationale3", nom: "Nationale 3" },
          { id: "regional1", nom: "Regional 1" },
          { id: "regional2", nom: "Regional 2" },
          { id: "departemental1", nom: "Departemental 1" },
          { id: "departemental2", nom: "Departemental 2" },
          { id: "departemental3", nom: "Departemental 3" },
          { id: "departemental4", nom: "Departemental 4" },
          { id: "departemental5", nom: "Departemental 5" }
        ],
        genres: ["M", "F"]
      }
    ]
  },

  // ==========================================
  // SPORTS INDIVIDUELS (33 sports)
  // ==========================================

  {
    sport: "Tennis",
    federation: "FFT",
    emoji: "🎾",
    type: "individuel",
    categories: [
      {
        id: "mini_tennis",
        nom: "Mini-Tennis (U7)",
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "u8u9",
        nom: "U8-U9",
        ageMin: 8,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "u10u11",
        nom: "U10-U11",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "u12u13",
        nom: "U12-U13",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "u14u15",
        nom: "U14-U15",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "u16u17",
        nom: "U16-U17",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "u18",
        nom: "U18",
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 19,
        genres: ["M", "F"]
      },
      {
        id: "veterans_35",
        nom: "Veterans 35+",
        ageMin: 35,
        genres: ["M", "F"]
      },
      {
        id: "veterans_45",
        nom: "Veterans 45+",
        ageMin: 45,
        genres: ["M", "F"]
      },
      {
        id: "veterans_55",
        nom: "Veterans 55+",
        ageMin: 55,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Tennis de table",
    federation: "FFTT",
    emoji: "🏓",
    type: "individuel",
    categories: [
      {
        id: "mini_poussin",
        nom: "Mini-Poussin (U7)",
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "poussin",
        nom: "Poussin (U9)",
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U11)",
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U13)",
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U15)",
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U18)",
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior (U40)",
        ageMin: 19,
        ageMax: 40,
        genres: ["M", "F"]
      },
      {
        id: "veteran_40",
        nom: "Veteran 40+",
        ageMin: 40,
        genres: ["M", "F"]
      },
      {
        id: "veteran_50",
        nom: "Veteran 50+",
        ageMin: 50,
        genres: ["M", "F"]
      },
      {
        id: "veteran_60",
        nom: "Veteran 60+",
        ageMin: 60,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Badminton",
    federation: "FFBad",
    emoji: "🏸",
    type: "individuel",
    categories: [
      {
        id: "poussins",
        nom: "Poussins (U9)",
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U11)",
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U13)",
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U15)",
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U17)",
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior (U19)",
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "adulte",
        nom: "Adulte",
        ageMin: 20,
        genres: ["M", "F"]
      },
      {
        id: "veteran_35",
        nom: "Veteran 35+",
        ageMin: 35,
        genres: ["M", "F"]
      },
      {
        id: "veteran_40",
        nom: "Veteran 40+",
        ageMin: 40,
        genres: ["M", "F"]
      },
      {
        id: "veteran_50",
        nom: "Veteran 50+",
        ageMin: 50,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Judo",
    federation: "FFJDA",
    emoji: "🥋",
    type: "individuel",
    categories: [
      {
        id: "eveil",
        nom: "Eveil Judo (U6-U7)",
        ageMin: 6,
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "poussin",
        nom: "Poussin (U8-U9)",
        ageMin: 8,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U10-U11)",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U12-U13)",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U14-U15)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U16-U17-U18)",
        ageMin: 16,
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "espoir",
        nom: "Espoir (U19-U20)",
        ageMin: 19,
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 21,
        ageMax: 30,
        genres: ["M", "F"]
      },
      {
        id: "veteran1",
        nom: "Veteran 1 (31-35)",
        ageMin: 31,
        ageMax: 35,
        genres: ["M", "F"]
      },
      {
        id: "veteran2",
        nom: "Veteran 2 (36-40)",
        ageMin: 36,
        ageMax: 40,
        genres: ["M", "F"]
      },
      {
        id: "veteran3",
        nom: "Veteran 3 (41-50)",
        ageMin: 41,
        ageMax: 50,
        genres: ["M", "F"]
      },
      {
        id: "veteran4",
        nom: "Veteran 4 (51+)",
        ageMin: 51,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Karate",
    federation: "FFKDA",
    emoji: "🥋",
    type: "individuel",
    categories: [
      {
        id: "baby",
        nom: "Baby Karate (U6-U7)",
        ageMin: 6,
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "poussin",
        nom: "Poussin (U8-U9)",
        ageMin: 8,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "pupille",
        nom: "Pupille (U10-U11)",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U12-U13)",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U14-U15)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U16-U17)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U18-U20)",
        ageMin: 18,
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 21,
        ageMax: 35,
        genres: ["M", "F"]
      },
      {
        id: "veteran",
        nom: "Veteran (35+)",
        ageMin: 35,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Boxe",
    federation: "FFB",
    emoji: "🥊",
    type: "individuel",
    categories: [
      {
        id: "ecole_boxe",
        nom: "Ecole de Boxe (U11)",
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "poussin",
        nom: "Poussin (U12-U13)",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U14-U15)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U16-U17)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U18-U19)",
        ageMin: 18,
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U20-U22)",
        ageMin: 20,
        ageMax: 22,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 23,
        ageMax: 40,
        genres: ["M", "F"]
      },
      {
        id: "master",
        nom: "Master (40+)",
        ageMin: 40,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Lutte",
    federation: "FFLDA",
    emoji: "🤼",
    type: "individuel",
    categories: [
      {
        id: "eveil_lutte",
        nom: "Eveil Lutte (U6-U7)",
        ageMin: 6,
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "poussin",
        nom: "Poussin (U8-U9)",
        ageMin: 8,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U10-U11)",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U12-U13-U14)",
        ageMin: 12,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U15-U16-U17)",
        ageMin: 15,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U18-U19-U20)",
        ageMin: 18,
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 21,
        genres: ["M", "F"]
      },
      {
        id: "veteran",
        nom: "Veteran (35+)",
        ageMin: 35,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Escrime",
    federation: "FFE",
    emoji: "🤺",
    type: "individuel",
    categories: [
      {
        id: "m7",
        nom: "M7",
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "m9",
        nom: "M9",
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "m11",
        nom: "M11",
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "m13",
        nom: "M13",
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "m15",
        nom: "M15",
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "m17",
        nom: "M17",
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "m20",
        nom: "M20",
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 21,
        genres: ["M", "F"]
      },
      {
        id: "veteran",
        nom: "Veteran (40+)",
        ageMin: 40,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Athletisme",
    federation: "FFA",
    emoji: "🏃",
    type: "individuel",
    categories: [
      {
        id: "eveil_athletique",
        nom: "Eveil Athletique (U7-U9)",
        ageMin: 7,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "poussin",
        nom: "Poussin (U10-U11)",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U12-U13)",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U14-U15)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U16-U17)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U18-U19-U20)",
        ageMin: 18,
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "espoir",
        nom: "Espoir (U21-U22-U23)",
        ageMin: 21,
        ageMax: 23,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 24,
        genres: ["M", "F"]
      },
      {
        id: "master",
        nom: "Master (35+)",
        ageMin: 35,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Natation",
    federation: "FFN",
    emoji: "🏊",
    type: "individuel",
    categories: [
      {
        id: "avenirs",
        nom: "Avenirs (U8-U9-U10)",
        ageMin: 8,
        ageMax: 10,
        genres: ["M", "F"]
      },
      {
        id: "jeunes",
        nom: "Jeunes (U11-U12-U13)",
        ageMin: 11,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "juniors",
        nom: "Juniors (U14-U15-U16-U17-U18)",
        ageMin: 14,
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior (19+)",
        ageMin: 19,
        genres: ["M", "F"]
      },
      {
        id: "master",
        nom: "Master (25+)",
        ageMin: 25,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Cyclisme",
    federation: "FFC",
    emoji: "🚴",
    type: "individuel",
    categories: [
      {
        id: "ecole_vtt",
        nom: "Ecole VTT (U7-U9)",
        ageMin: 7,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "pupille",
        nom: "Pupille (U10-U11)",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U12-U13)",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U14-U15)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U16-U17)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U18-U19)",
        ageMin: 18,
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "espoir",
        nom: "Espoir (U20-U22)",
        ageMin: 20,
        ageMax: 22,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 23,
        genres: ["M", "F"]
      },
      {
        id: "master",
        nom: "Master (30+)",
        ageMin: 30,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Aviron",
    federation: "FFAviron",
    emoji: "🚣",
    type: "individuel",
    categories: [
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "u13",
        nom: "U13",
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "u19",
        nom: "U19",
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "u23",
        nom: "U23",
        ageMax: 23,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 24,
        genres: ["M", "F"]
      },
      {
        id: "master",
        nom: "Master (27+)",
        ageMin: 27,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Golf",
    federation: "FFGolf",
    emoji: "⛳",
    type: "individuel",
    categories: [
      {
        id: "poucet1",
        nom: "Poucet1 (U9)",
        ageMin: 9,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "poucet2",
        nom: "Poucet2 (U10)",
        ageMin: 10,
        ageMax: 10,
        genres: ["M", "F"]
      },
      {
        id: "poussin",
        nom: "Poussin (U11)",
        ageMin: 11,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "benjamin1",
        nom: "Benjamin1 (U13)",
        ageMin: 13,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "benjamin2",
        nom: "Benjamin2 (U14)",
        ageMin: 14,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "minime1",
        nom: "Minime1 (U15)",
        ageMin: 15,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "minime2",
        nom: "Minime2 (U16)",
        ageMin: 16,
        ageMax: 16,
        genres: ["M", "F"]
      },
      {
        id: "cadet1",
        nom: "Cadet1 (U17)",
        ageMin: 17,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "cadet2",
        nom: "Cadet2 (U18)",
        ageMin: 18,
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "jeune_adulte",
        nom: "Jeune Adulte (U19-U21)",
        ageMin: 19,
        ageMax: 21,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior (50-59)",
        ageMin: 50,
        ageMax: 59,
        genres: ["M", "F"]
      },
      {
        id: "senior2",
        nom: "Senior 2 (60-69)",
        ageMin: 60,
        ageMax: 69,
        genres: ["M", "F"]
      },
      {
        id: "senior3",
        nom: "Senior 3 (70+)",
        ageMin: 70,
        genres: ["M", "F"]
      },
      {
        id: "toutes_categories",
        nom: "Toutes categories",
        ageMin: 18,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Tir",
    federation: "FFtir",
    emoji: "🎯",
    type: "individuel",
    categories: [
      {
        id: "ecoles_tir",
        nom: "Ecoles de Tir (U9-U13)",
        ageMin: 9,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "benjamins",
        nom: "Benjamins (U14-U15)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "minimes",
        nom: "Minimes (U16-U17)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "juniors",
        nom: "Juniors (U18-U20)",
        ageMin: 18,
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors (21-49)",
        ageMin: 21,
        ageMax: 49,
        genres: ["M", "F"]
      },
      {
        id: "veterans1",
        nom: "Veterans 1 (50-59)",
        ageMin: 50,
        ageMax: 59,
        genres: ["M", "F"]
      },
      {
        id: "veterans2",
        nom: "Veterans 2 (60-69)",
        ageMin: 60,
        ageMax: 69,
        genres: ["M", "F"]
      },
      {
        id: "veterans3",
        nom: "Veterans 3 (70+)",
        ageMin: 70,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Tir a l'arc",
    federation: "FFTA",
    emoji: "🏹",
    type: "individuel",
    categories: [
      {
        id: "poussin",
        nom: "Poussin (≤10 ans)",
        ageMax: 10,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (11-12 ans)",
        ageMin: 11,
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (13-14 ans)",
        ageMin: 13,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (15-17 ans)",
        ageMin: 15,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (18-20 ans)",
        ageMin: 18,
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "senior1",
        nom: "Senior 1 (21-39 ans)",
        ageMin: 21,
        ageMax: 39,
        genres: ["M", "F"]
      },
      {
        id: "senior2",
        nom: "Senior 2 (40-59 ans)",
        ageMin: 40,
        ageMax: 59,
        genres: ["M", "F"]
      },
      {
        id: "senior3",
        nom: "Senior 3 (60+)",
        ageMin: 60,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Equitation",
    federation: "FFE",
    emoji: "🏇",
    type: "individuel",
    categories: [
      {
        id: "poney_a",
        nom: "Poney A (≤12 ans)",
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "poney_b",
        nom: "Poney B (13 ans)",
        ageMin: 13,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "poney_c",
        nom: "Poney C (14 ans)",
        ageMin: 14,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "poney_d",
        nom: "Poney D (≥15 ans)",
        ageMin: 15,
        genres: ["M", "F"]
      },
      {
        id: "amateur1",
        nom: "Amateur 1 (≥16 ans)",
        ageMin: 16,
        genres: ["M", "F"]
      },
      {
        id: "amateur2",
        nom: "Amateur 2 (≥16 ans)",
        ageMin: 16,
        genres: ["M", "F"]
      },
      {
        id: "pro1",
        nom: "Pro 1",
        ageMin: 16,
        genres: ["M", "F"]
      },
      {
        id: "pro2",
        nom: "Pro 2",
        ageMin: 16,
        genres: ["M", "F"]
      },
      {
        id: "pro_elite",
        nom: "Pro Elite",
        ageMin: 16,
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors (50+)",
        ageMin: 50,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Canoe-Kayak",
    federation: "FFCK",
    emoji: "🛶",
    type: "individuel",
    categories: [
      {
        id: "mini_pagaie",
        nom: "Mini Pagaie (U7-U8)",
        ageMin: 7,
        ageMax: 8,
        genres: ["M", "F"]
      },
      {
        id: "poussin",
        nom: "Poussin (U9-U10)",
        ageMin: 9,
        ageMax: 10,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (U11-U12)",
        ageMin: 11,
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (U13-U14)",
        ageMin: 13,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (U15-U16)",
        ageMin: 15,
        ageMax: 16,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (U17-U18)",
        ageMin: 17,
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "senior_u21_u23",
        nom: "Senior U21-U23",
        ageMin: 21,
        ageMax: 23,
        genres: ["M", "F"]
      },
      {
        id: "senior_u34",
        nom: "Senior U34+",
        ageMin: 34,
        genres: ["M", "F"]
      },
      {
        id: "veteran_v1",
        nom: "Veteran V1 (35-39)",
        ageMin: 35,
        ageMax: 39,
        genres: ["M", "F"]
      },
      {
        id: "v2",
        nom: "V2 (40-44)",
        ageMin: 40,
        ageMax: 44,
        genres: ["M", "F"]
      },
      {
        id: "v3_v9",
        nom: "V3-V9 (45-75+)",
        ageMin: 45,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Triathlon",
    federation: "FFTri",
    emoji: "🏊",
    type: "individuel",
    categories: [
      {
        id: "jeunes_6_9",
        nom: "Jeunes 6-9 ans",
        ageMin: 6,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "jeunes_8_11",
        nom: "Jeunes 8-11 ans",
        ageMin: 8,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "jeunes_10_13",
        nom: "Jeunes 10-13 ans",
        ageMin: 10,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (14-15)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (16-17)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (18-19)",
        ageMin: 18,
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior (20+)",
        ageMin: 20,
        genres: ["M", "F"]
      },
      {
        id: "age_groups",
        nom: "Age Groups (20+)",
        ageMin: 20,
        genres: ["M", "F"]
      },
      {
        id: "veterans_30_34",
        nom: "Veterans 30-34",
        ageMin: 30,
        ageMax: 34,
        genres: ["M", "F"]
      },
      {
        id: "veterans_35_39",
        nom: "Veterans 35-39",
        ageMin: 35,
        ageMax: 39,
        genres: ["M", "F"]
      },
      {
        id: "veterans_40",
        nom: "Veterans 40+",
        ageMin: 40,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Escalade",
    federation: "FFME",
    emoji: "🧗",
    type: "individuel",
    categories: [
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "u13",
        nom: "U13",
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "u15",
        nom: "U15",
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "u19",
        nom: "U19",
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 20,
        genres: ["M", "F"]
      },
      {
        id: "veterans",
        nom: "Veterans (40+)",
        ageMin: 40,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Roller / Skateboard",
    federation: "Federation Roller & Skateboard",
    emoji: "🛹",
    type: "individuel",
    categories: [
      {
        id: "u6_u7",
        nom: "U6-U7",
        ageMin: 6,
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "u8_u9",
        nom: "U8-U9",
        ageMin: 8,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "u10_u11",
        nom: "U10-U11",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "u12_u13",
        nom: "U12-U13",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "u14_u15",
        nom: "U14-U15",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "u16_u17",
        nom: "U16-U17",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "u18_u19",
        nom: "U18-U19",
        ageMin: 18,
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 20,
        genres: ["M", "F"]
      },
      {
        id: "veterans_v1",
        nom: "Veterans V1 (35-39)",
        ageMin: 35,
        ageMax: 39,
        genres: ["M", "F"]
      },
      {
        id: "v2",
        nom: "V2 (40-44)",
        ageMin: 40,
        ageMax: 44,
        genres: ["M", "F"]
      },
      {
        id: "v3",
        nom: "V3 (45-49)",
        ageMin: 45,
        ageMax: 49,
        genres: ["M", "F"]
      },
      {
        id: "v4",
        nom: "V4+ (50+)",
        ageMin: 50,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Motocross",
    federation: "FFM",
    emoji: "🏍️",
    type: "individuel",
    categories: [
      {
        id: "minivert_50cc",
        nom: "Minivert 50cc (U6-U7)",
        ageMin: 6,
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "minivert_65cc",
        nom: "Minivert 65cc (U8-U10)",
        ageMin: 8,
        ageMax: 10,
        genres: ["M", "F"]
      },
      {
        id: "espoirs_85cc",
        nom: "Espoirs 85cc (U11-U14)",
        ageMin: 11,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "junior_125cc",
        nom: "Junior 125cc (U13-U15)",
        ageMin: 13,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "elite_mx2",
        nom: "Elite Mx2 125-250cc (U15-U19)",
        ageMin: 15,
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "elite_mx1",
        nom: "Elite Mx1 250-450cc (U19+)",
        ageMin: 19,
        genres: ["M", "F"]
      },
      {
        id: "veteran_bronze",
        nom: "Veteran Bronze (40-46)",
        ageMin: 40,
        ageMax: 46,
        genres: ["M", "F"]
      },
      {
        id: "veteran_argent",
        nom: "Veteran Argent (47-53)",
        ageMin: 47,
        ageMax: 53,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Sports de glisse nautiques",
    federation: "FFVL",
    emoji: "🏄",
    type: "individuel",
    categories: [
      {
        id: "u9",
        nom: "U9",
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "u11",
        nom: "U11",
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "u14",
        nom: "U14",
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "u17",
        nom: "U17",
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "u21",
        nom: "U21",
        ageMax: 21,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 22,
        genres: ["M", "F"]
      },
      {
        id: "veterans",
        nom: "Veterans (+35)",
        ageMin: 35,
        genres: ["M", "F"]
      },
      {
        id: "o40",
        nom: "O40 (+40)",
        ageMin: 40,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Boules / Petanque",
    federation: "FFPJP",
    emoji: "🎱",
    type: "individuel",
    categories: [
      {
        id: "benjamins",
        nom: "Benjamins (-10 ans)",
        ageMax: 10,
        genres: ["M", "F"]
      },
      {
        id: "minimes",
        nom: "Minimes (11-12 ans)",
        ageMin: 11,
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "cadets",
        nom: "Cadets (13-15 ans)",
        ageMin: 13,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "juniors",
        nom: "Juniors (16-17 ans)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors (18-59 ans)",
        ageMin: 18,
        ageMax: 59,
        genres: ["M", "F"]
      },
      {
        id: "veterans",
        nom: "Veterans (60+)",
        ageMin: 60,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Escrime artistique",
    federation: "FFEscrime",
    emoji: "🤺",
    type: "individuel",
    categories: [
      {
        id: "m13",
        nom: "M13",
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "m17",
        nom: "M17",
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 18,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Danse sportive",
    federation: "FFDanseSport",
    emoji: "💃",
    type: "individuel",
    categories: [
      {
        id: "juvenile_i",
        nom: "Juvenile I (11-12 ans)",
        ageMin: 11,
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "juvenile_ii",
        nom: "Juvenile II (13-14 ans)",
        ageMin: 13,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "junior_i",
        nom: "Junior I (15 ans)",
        ageMin: 15,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "junior_ii",
        nom: "Junior II (16-17 ans)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "youth",
        nom: "Youth (18 ans)",
        ageMin: 18,
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "adulte",
        nom: "Adulte (19-29 ans)",
        ageMin: 19,
        ageMax: 29,
        genres: ["M", "F"]
      },
      {
        id: "senior_i",
        nom: "Senior I (30-49 ans)",
        ageMin: 30,
        ageMax: 49,
        genres: ["M", "F"]
      },
      {
        id: "senior_ii",
        nom: "Senior II (50-59 ans)",
        ageMin: 50,
        ageMax: 59,
        genres: ["M", "F"]
      },
      {
        id: "senior_iii",
        nom: "Senior III (60+)",
        ageMin: 60,
        genres: ["M", "F"]
      },
      {
        id: "senior_iv",
        nom: "Senior IV (65+)",
        ageMin: 65,
        genres: ["M", "F"]
      },
      {
        id: "senior_v",
        nom: "Senior V (70+)",
        ageMin: 70,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Ski",
    federation: "FFS",
    emoji: "⛷️",
    type: "individuel",
    categories: [
      {
        id: "u8",
        nom: "U8",
        ageMax: 8,
        genres: ["M", "F"]
      },
      {
        id: "u10",
        nom: "U10",
        ageMax: 10,
        genres: ["M", "F"]
      },
      {
        id: "u12",
        nom: "U12",
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "u14",
        nom: "U14",
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "u16",
        nom: "U16",
        ageMax: 16,
        genres: ["M", "F"]
      },
      {
        id: "u18",
        nom: "U18",
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "u21",
        nom: "U21",
        ageMax: 21,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 22,
        genres: ["M", "F"]
      },
      {
        id: "masters",
        nom: "Masters (30+)",
        ageMin: 30,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Snowboard",
    federation: "FFS",
    emoji: "🏂",
    type: "individuel",
    categories: [
      {
        id: "juvenile_i",
        nom: "Juvenile I (11-12 ans)",
        ageMin: 11,
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "juvenile_ii",
        nom: "Juvenile II (13-14 ans)",
        ageMin: 13,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "junior_i",
        nom: "Junior I (15 ans)",
        ageMin: 15,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "junior_ii",
        nom: "Junior II (16-17 ans)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "youth",
        nom: "Youth (18 ans)",
        ageMin: 18,
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "adulte",
        nom: "Adulte (19-29 ans)",
        ageMin: 19,
        ageMax: 29,
        genres: ["M", "F"]
      },
      {
        id: "senior_i",
        nom: "Senior I (30-49 ans)",
        ageMin: 30,
        ageMax: 49,
        genres: ["M", "F"]
      },
      {
        id: "senior_ii",
        nom: "Senior II (50-59 ans)",
        ageMin: 50,
        ageMax: 59,
        genres: ["M", "F"]
      },
      {
        id: "senior_iii",
        nom: "Senior III (60-69 ans)",
        ageMin: 60,
        ageMax: 69,
        genres: ["M", "F"]
      },
      {
        id: "senior_iv",
        nom: "Senior IV (65+)",
        ageMin: 65,
        genres: ["M", "F"]
      },
      {
        id: "senior_v",
        nom: "Senior V (70+)",
        ageMin: 70,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Surf",
    federation: "FFS",
    emoji: "🏄",
    type: "individuel",
    categories: [
      {
        id: "benjamin",
        nom: "Benjamin (≤12 ans)",
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (13-14 ans)",
        ageMin: 13,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (15-16 ans)",
        ageMin: 15,
        ageMax: 16,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (17-18 ans)",
        ageMin: 17,
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "espoir_open",
        nom: "Espoir/Open (19+)",
        ageMin: 19,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Voile",
    federation: "FFV",
    emoji: "⛵",
    type: "individuel",
    categories: [
      {
        id: "poussin",
        nom: "Poussin (≤11 ans)",
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "benjamin",
        nom: "Benjamin (12-13 ans)",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "minime",
        nom: "Minime (14 ans)",
        ageMin: 14,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "cadet",
        nom: "Cadet (15-16 ans)",
        ageMin: 15,
        ageMax: 16,
        genres: ["M", "F"]
      },
      {
        id: "junior",
        nom: "Junior (17-19 ans)",
        ageMin: 17,
        ageMax: 19,
        genres: ["M", "F"]
      },
      {
        id: "espoir",
        nom: "Espoir (20-22 ans)",
        ageMin: 20,
        ageMax: 22,
        genres: ["M", "F"]
      },
      {
        id: "senior",
        nom: "Senior",
        ageMin: 23,
        genres: ["M", "F"]
      },
      {
        id: "masters",
        nom: "Masters (35+)",
        ageMin: 35,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Taekwondo",
    federation: "FFTDA",
    emoji: "🥋",
    type: "individuel",
    categories: [
      {
        id: "babies_pupilles",
        nom: "Babies/Pupilles (6-7 ans)",
        ageMin: 6,
        ageMax: 7,
        genres: ["M", "F"]
      },
      {
        id: "benjamins",
        nom: "Benjamins (8-9 ans)",
        ageMin: 8,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "minimes",
        nom: "Minimes (10-11 ans)",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "cadets",
        nom: "Cadets (12-14 ans)",
        ageMin: 12,
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "juniors",
        nom: "Juniors (15-17 ans)",
        ageMin: 15,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "espoirs_seniors",
        nom: "Espoirs/Seniors (-30 ans)",
        ageMin: 18,
        ageMax: 30,
        genres: ["M", "F"]
      },
      {
        id: "masters1",
        nom: "Masters 1 (31-40 ans)",
        ageMin: 31,
        ageMax: 40,
        genres: ["M", "F"]
      },
      {
        id: "masters2",
        nom: "Masters 2 (40+)",
        ageMin: 40,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Sambo",
    federation: "FFSambo",
    emoji: "🤼",
    type: "individuel",
    categories: [
      {
        id: "poussins",
        nom: "Poussins (8-9 ans)",
        ageMin: 8,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "benjamins",
        nom: "Benjamins (10-11 ans)",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "minimes",
        nom: "Minimes (12-13 ans)",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "cadets",
        nom: "Cadets (14-15 ans)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "juniors",
        nom: "Juniors (16-17 ans)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "espoirs",
        nom: "Espoirs (18-20 ans)",
        ageMin: 18,
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 21,
        genres: ["M", "F"]
      },
      {
        id: "masters",
        nom: "Masters (35+)",
        ageMin: 35,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Savate boxe francaise",
    federation: "FSBF",
    emoji: "🥊",
    type: "individuel",
    categories: [
      {
        id: "pre_poussins",
        nom: "Pre-Poussins (7-9 ans)",
        ageMin: 7,
        ageMax: 9,
        genres: ["M", "F"]
      },
      {
        id: "poussins",
        nom: "Poussins (10-11 ans)",
        ageMin: 10,
        ageMax: 11,
        genres: ["M", "F"]
      },
      {
        id: "benjamins",
        nom: "Benjamins (12-13 ans)",
        ageMin: 12,
        ageMax: 13,
        genres: ["M", "F"]
      },
      {
        id: "minimes",
        nom: "Minimes (14-15 ans)",
        ageMin: 14,
        ageMax: 15,
        genres: ["M", "F"]
      },
      {
        id: "cadets",
        nom: "Cadets (16-17 ans)",
        ageMin: 16,
        ageMax: 17,
        genres: ["M", "F"]
      },
      {
        id: "juniors",
        nom: "Juniors (18-20 ans)",
        ageMin: 18,
        ageMax: 20,
        genres: ["M", "F"]
      },
      {
        id: "seniors_combat",
        nom: "Seniors Combat (21-34 ans)",
        ageMin: 21,
        ageMax: 34,
        genres: ["M", "F"]
      },
      {
        id: "seniors_assaut",
        nom: "Seniors Assaut (21-39 ans)",
        ageMin: 21,
        ageMax: 39,
        genres: ["M", "F"]
      },
      {
        id: "veterans_combat",
        nom: "Veterans Combat (35+)",
        ageMin: 35,
        genres: ["M", "F"]
      },
      {
        id: "veterans_assaut",
        nom: "Veterans Assaut (40+)",
        ageMin: 40,
        genres: ["M", "F"]
      }
    ]
  },

  {
    sport: "Padel",
    federation: "FFPadel",
    emoji: "🎾",
    type: "individuel",
    categories: [
      {
        id: "u12",
        nom: "U12",
        ageMax: 12,
        genres: ["M", "F"]
      },
      {
        id: "u14",
        nom: "U14",
        ageMax: 14,
        genres: ["M", "F"]
      },
      {
        id: "u16",
        nom: "U16",
        ageMax: 16,
        genres: ["M", "F"]
      },
      {
        id: "u18",
        nom: "U18",
        ageMax: 18,
        genres: ["M", "F"]
      },
      {
        id: "seniors",
        nom: "Seniors",
        ageMin: 19,
        genres: ["M", "F"]
      },
      {
        id: "seniors_45",
        nom: "Seniors +45",
        ageMin: 45,
        genres: ["M", "F"]
      },
      {
        id: "seniors_55",
        nom: "Seniors +55",
        ageMin: 55,
        genres: ["M", "F"]
      }
    ]
  }
];

/**
 * Obtenir les categories d'un sport
 */
export const getSportCategories = (sport: string): SportCategories | undefined => {
  return SPORTS_CATEGORIES.find(s => s.sport === sport);
};

/**
 * Verifier si un sport est un sport d'equipe
 */
export const isSportEquipe = (sport: string): boolean => {
  const sportData = getSportCategories(sport);
  return sportData?.type === 'equipe';
};

/**
 * Obtenir tous les sports d'equipe
 */
export const getSportsEquipe = (): SportCategories[] => {
  return SPORTS_CATEGORIES.filter(s => s.type === 'equipe');
};

/**
 * Obtenir tous les sports individuels
 */
export const getSportsIndividuels = (): SportCategories[] => {
  return SPORTS_CATEGORIES.filter(s => s.type === 'individuel');
};
