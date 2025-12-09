# 📋 CHANGELOG - ClubSportFrance

Toutes les modifications notables de ce projet seront documentees dans ce fichier.

Le format est base sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet respecte [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Non publie]

### En cours
- Configuration OAuth Firebase Console (Google Sign-In + Apple Sign-In)
- Middleware protection routes privees
- Affichage public equipes/categories sur fiche club
- Filtres avances carte (categorie age, niveau, genre)

---

## [0.5.0] - 2025-12-09

### 🎯 Systeme de gestion equipes/categories complet

#### Ajoute
- **Structure sports complete** (src/data/sportsCategories.ts) :
  - 44 sports complets avec categories d'age et niveaux de competition
  - 11 sports d'equipe : Football, Basketball, Volleyball, Rugby XV, Rugby XIII, Handball, Hockey glace, Hockey gazon, Baseball, Football americain, Futsal
  - 33 sports individuels : Tennis, Badminton, Judo, Karate, Boxe, Lutte, Escrime, Athletisme, Natation, Cyclisme, Aviron, Golf, Tir, Tir a l'arc, Equitation, Canoe-Kayak, Triathlon, Escalade, Roller/Skateboard, Motocross, Sports de glisse nautiques, Boules/Petanque, Escrime artistique, Danse sportive, Ski, Snowboard, Surf, Voile, Taekwondo, Sambo, Savate boxe francaise, Padel
  - Interfaces TypeScript completes (CategorieAge, NiveauCompetition, SportCategories)
  - Fonctions utilitaires (getSportCategories, isSportEquipe, getSportsEquipe, getSportsIndividuels)
  - Donnees issues de ligue_france.csv (57 sports references par federations)
- **Dashboard Club redesigne** (/dashboard/page.tsx) :
  - Detection automatique type de sport (equipe vs individuel)
  - Affichage informations club dans sidebar gauche
  - Integration composants specialises selon type de sport
  - Boutons navigation vers fiche publique et carte
  - Protection authentification role='club' uniquement
- **Gestionnaire equipes sports collectifs** (EquipeManager.tsx) :
  - Formulaire ajout equipe avec :
    - Selection categorie d'age (U6-U7, U13, Seniors...)
    - Selection niveau competition (Departemental, Regional, National...)
    - Selection division si applicable (D1, D2, R1, R2...)
    - Selection genre (Masculin, Feminin, Mixte)
  - Liste equipes enregistrees avec affichage details complets
  - Suppression equipe avec popup confirmation
  - Sauvegarde automatique Firestore dans champ equipes[]
  - Validation formulaire complete cote client
- **Gestionnaire categories sports individuels** (CategoriesManager.tsx) :
  - Interface checkbox pour cocher categories d'age acceptees
  - Selection genres pour chaque categorie (Hommes, Femmes, ou les deux)
  - Affichage tranches d'age explicites (ex: "U11: 10-11 ans")
  - Deselection automatique si aucun genre selectionne
  - Sauvegarde automatique Firestore dans champ categoriesAcceptees[]
  - Feedback visuel avec fond bleu pour categories cochees
- **Structure Firestore etendue** :
  - Champ `equipes[]` pour sports d'equipe (id, categorieId, categorieNom, niveauId, niveauNom, divisionId?, genre)
  - Champ `categoriesAcceptees[]` pour sports individuels (categorieId, categorieNom, genresAcceptes[])
  - Timestamp updatedAt mis a jour automatiquement
- **Workflow inscription ameliore** :
  - Etape 1 (register) : Choix sport avec federation auto-remplie
  - Etape 2 (register) : Adresse complete + geocodage
  - Post-inscription : Redirection dashboard pour gerer equipes/categories
- **Donnees sports detaillees par federation** :
  - Football (FFF) : 8 categories U6-Seniors, 6 niveaux competition (Ligue 1, Ligue 2, National, Regional, Departemental, Loisirs)
  - Basketball (FFBB) : 8 categories Baby-Seniors, niveaux Betclic Elite jusqu'a Loisirs
  - Rugby XV (FFR) : 7 categories U6-Seniors, niveaux Top 14 jusqu'a Departemental
  - Tennis (FFT) : 11 categories Mini-Tennis jusqu'a Veterans 55+, mode individuel
  - Judo (FFJDA) : 12 categories Eveil jusqu'a Veterans 4, mode individuel
  - Et 39 autres sports avec structures detaillees officielles
- **Documentation complete** :
  - TODO_NEXT_SESSION.md avec checklist tests detaillee (10 scenarios)
  - PROJECT.md mis a jour avec journal developpement complet
  - CHANGELOG.md avec details fonctionnalites v0.5.0

#### Optimise
- Composants React avec loading states et error handling
- Sauvegarde Firestore debounced automatique
- Validation formulaires cote client avant soumission
- Interface responsive et accessible
- Memorisation donnees sport pour eviter refetch

#### Corrige
- Fix import Select component dans EquipeManager
- Fix types TypeScript pour genres (union type strict)
- Fix structure conditionnelle niveauxDisponibles (optional chaining)
- Fix re-render MapContainer avec key unique

---

## [0.4.0] - 2025-12-04

### 🗺️ Map interactive complete avec clubs reels

#### Ajoute
- **Inscription club avec adresse** :
  - Formulaire 2 etapes : Step 1 (compte), Step 2 (adresse)
  - Composant Select pour dropdowns sports/ligues
  - 3 champs adresse separés (rue, code postal, ville)
  - Geocodage automatique via Nominatim API (gratuit)
  - Stockage address + coordinates dans Firestore
  - Validation adresse avant creation compte
- **Service clubService.ts** :
  - getAllClubs() : recupere tous les clubs avec role='club'
  - getClubById(clubId) : recupere un club specifique
  - getClubsBySport() et getClubsByLeague() (prepares pour filtres futurs)
  - Filtrage clubs sans coordinates (adresse incomplete)
- **Page profil club (/clubs/[clubId])** :
  - Affichage public de toutes les infos club
  - Mode edition si utilisateur = proprietaire
  - Sections : Informations, Contact, Equipements, Localisation, Stats
  - Boutons "Modifier" pour chaque section (UI uniquement, edition a implementer)
  - Bouton deconnexion en bas pour proprietaire
  - Badge "Votre club" si proprietaire
- **Page dashboard (/dashboard)** :
  - Redirection automatique vers /clubs/[userId]?edit=true
  - Verification role='club' obligatoire
  - Redirection /login si non connecte
- **Recherche geographique de villes** :
  - Barre recherche avec bouton 🔍
  - Geocodage ville via Nominatim API
  - Zoom automatique sur ville trouvée (niveau 12)
  - Placeholder "Rechercher une ville en France..."
  - Alert si ville introuvable
- **Filtres par sport** :
  - Dropdown filtres avec icône entonnoir
  - 4 sports disponibles : Football ⚽, Basketball 🏀, Volleyball 🏐, Hockey 🏒
  - Badge rouge avec nombre de filtres actifs
  - Fermeture automatique au clic exterieur
  - Bouton "Réinitialiser" si filtres actifs
  - Compteur clubs filtres (X / Y clubs)
- **Header transparent** :
  - Position absolute au-dessus de la carte
  - Logo seul a gauche
  - Recherche + Filtres + Espace Club a droite
  - Shadow sur chaque element blanc
  - Responsive mobile
- **Affichage clubs reels** :
  - Remplacement complete mock data par Firestore
  - Chargement dynamique depuis collection users/ (role='club')
  - Popup markers avec lien "Voir la fiche →"
  - Emoji sport dans markers personnalises
- **Simplification architecture** :
  - Suppression features utilisateurs reguliers (favoris, profils)
  - Focus uniquement clubs : consultation publique, gestion par proprietaire
  - Users peuvent UNIQUEMENT voir carte et profils clubs (pas de compte user)

#### Modifie
- **Firestore Rules** :
  - Lecture publique pour documents role='club' (visitors peuvent voir clubs)
  - Lecture authentifiee pour role='user' (preparation future)
  - Creation/Update/Delete uniquement par proprietaire
- **MapView** :
  - Prop searchCenter pour zoom sur ville recherchee
  - Prop autoZoom pour zoom sur clubs filtres
  - Composant SearchZoom pour gerer zoom ville
  - Composant AutoZoom pour gerer zoom clubs
  - Memorisation icones (useMemo) pour performance
  - Stabilisation geolocalisation (setView unique)
- **Carte** :
  - Suppression legend overlay (encombrant)
  - Stats en bottom-left (X clubs disponibles)
  - Panneau filtres en dropdown top-right

#### Corrige
- Erreur Leaflet "Map container is being reused" (ajout key unique)
- Erreur "undefined is not an object" geolocalisation (try/catch + hasSetView flag)
- Erreur Firestore photoURL undefined (conditional add uniquement si present)
- Warning Firestore offline mode (temporaire, auto-reconnect)
- Deploiement Firestore Rules (firebase use --add puis firebase deploy --only firestore:rules)

#### Technique
- geocodingService.ts : geocodeAddress() via Nominatim
- clubService.ts : getAllClubs(), getClubById()
- Firestore collection users/ : champs address + coordinates ajoutes
- Composant Select.tsx : dropdown reutilisable
- Constants sports.ts : SPORTS et LEAGUES arrays
- Firebase CLI configure (.firebaserc cree)
- Firestore Rules deployees sur projet clubsportfrance-99127

---

## [0.3.1] - 2025-12-03

### 🧹 Nettoyage arborescence

#### Modifie
- **Reorganisation complete repository** :
  - TestProject/ (repo parent) : Documentation universelle (guides/, templates/) + Config Firebase
  - clubsportfrance/ (sous-repo) : Projet Next.js complet avec tout le code
- **Deplacements vers clubsportfrance/** :
  - Fichiers .md : PROJECT.md, CHANGELOG.md, README.md, ANALYSE_CODE_EXISTANT.md
  - Config projet : package.json, tsconfig.json, next.config.ts, eslint.config.mjs, postcss.config.mjs
  - Storage rules : storage.rules (pour usage futur)
  - Code source : src/, public/
- **Arborescence propre** :
  - Separation claire documentation universelle vs projet specifique
  - Sous-repo Git pour clubsportfrance/ (gitignore dans parent)
  - Navigation facilitee dans Fork

#### Supprime
- ClubSportFrance_backup_mobile/ (backup React Native obsolete)
- Debugscreen/ (screenshots debug)
- Fichiers dupliques a la racine (35 fichiers)

#### Technique
- 35 fichiers supprimes de TestProject/ (12 195 lignes)
- Tous les fichiers essentiels deplaces dans clubsportfrance/
- .gitignore parent mis a jour (ignore clubsportfrance/)

---

## [0.3.0] - 2025-12-03

### 🔐 Authentification clubs complete

#### Ajoute
- **Systeme d'authentification complet** :
  - authService.ts avec toutes les methodes Firebase Auth :
    - registerWithEmail (creation compte + doc Firestore automatique)
    - loginWithEmail (signInWithEmailAndPassword)
    - loginWithGoogle (signInWithPopup + GoogleAuthProvider)
    - loginWithApple (signInWithPopup + OAuthProvider 'apple.com')
    - resetPassword (sendPasswordResetEmail)
    - getUserData (recuperation userData depuis Firestore)
  - Validation formulaires : isValidEmail, validatePassword, passwordsMatch
  - Interface UserData (uid, email, displayName, photoURL, role, timestamps)
- **AuthContext Provider** :
  - Hook useAuth expose toutes les methodes auth
  - State user (Firebase Auth) + userData (Firestore avec role)
  - Auto-fetch userData sur auth state change (onAuthStateChanged)
  - Gestion erreurs et loading states
  - clearError pour reset erreurs
- **Composants UI reutilisables** :
  - Button : 4 variants (primary/secondary/danger/ghost), 3 tailles (sm/md/lg), loading state, fullWidth
  - Input : label, error, helperText, fullWidth, support type password/email/text
  - Card : container avec padding et shadow
- **Pages authentification** :
  - /login : Connexion Email/Password + Google + Apple, lien vers /register et /forgot-password
  - /register : Inscription club (clubName + email + password + confirm), role='club' FORCE
  - /forgot-password : Reinitialisation mot de passe par email avec message succes
  - Toutes les pages : min-w-[400px] pour eviter word-wrapping
  - Header avec logo et titre "ClubSportFrance"
  - Lien retour vers / (carte)
- **Architecture decisionnelle IMPORTANTE** :
  - **Seuls les clubs ont besoin de se connecter** (role='club' automatique)
  - **Les utilisateurs reguliers acceent a TOUT sans authentification** (carte, recherche, detail clubs)
  - Bouton navigation "Se connecter" renomme en "Espace Club" pour clarifier
  - Redirection apres login/register : /dashboard (route a creer)

#### Modifie
- Navigation /map : "Se connecter" → "Espace Club" (clarification)
- globals.css : min-w-[400px] sur containers auth pour fix word-wrapping

#### Corrige
- Word-wrapping : texte coupait a chaque mot (fix: min-w-[400px] sur containers)
- Nettoyage repository : suppression dossiers dupliques ClubSportFrance/ et ClubSportFrance_backup_mobile/ (157 fichiers)
- Suppression .DS_Store

#### A completer
- Configuration OAuth Firebase Console (Google + Apple credentials)
- Middleware protection routes /dashboard/*
- Creation route /dashboard (inexistante actuellement)
- Redirection conditionnelle selon role user/club

#### Technique
- Firebase Auth v11.1.0 (createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider)
- Firestore users/ collection (uid, email, displayName, photoURL, role, createdAt, updatedAt)
- React Context API pour AuthContext
- Tailwind CSS pour styling composants UI
- Next.js App Router pages /login, /register, /forgot-password

---

## [0.2.0] - 2025-12-03

### 🗺️ Carte interactive complete

#### Ajoute
- **Carte interactive Leaflet** :
  - Integration Leaflet 1.9.4 + react-leaflet
  - Tiles OpenStreetMap (gratuit, sans API key)
  - Carte centree sur la France (lat 46.6, lng 1.9)
  - Dynamic import avec ssr: false pour Next.js
- **Geolocalisation utilisateur** :
  - Detection position automatique (navigator.geolocation)
  - Centrage automatique sur position utilisateur
  - Bouton recentrage sur position
  - Marker utilisateur personnalise (pin bleu avec emoji 📍)
- **Markers personnalises** :
  - 15 sports avec emojis (⚽🎾🏀🏊🏐🏉🤾🚴🏃🧗🥊🥋🏇⛳⛷️)
  - Pin rouge avec emoji du sport au centre
  - Marker utilisateur en pin bleu
  - Popup au clic (nom club, sport, emoji)
- **Clustering intelligent** :
  - react-leaflet-cluster pour grouper markers proches
  - 3 niveaux de clusters :
    - Small (< 50 clubs): bleu semi-transparent
    - Medium (50-99 clubs): orange semi-transparent
    - Large (100+ clubs): rouge semi-transparent
  - Opacite 50% pour transparence
  - Animation hover scale(1.1)
  - Border blanc et box-shadow
- **200 clubs de demo** :
  - Generation aleatoire pour tester clustering
  - 15 sports, 35 villes francaises
  - Coordonnees aleatoires France (lat 42-51, lng -5 a 8)
  - Noms generes : "Prefixe Sport Ville"
- **Page /map** :
  - Page principale (redirection depuis /)
  - Header avec navigation
  - Legende explicative en overlay
  - Stats rapides (nombre de clubs)
  - Layout fullscreen responsive

#### Modifie
- Passage de Google Maps a Leaflet (open source, gratuit)
- Structure Next.js 16.0.6 avec React 19
- Tailwind CSS v4

#### Corrige
- SSR error "window is not defined" (dynamic import)
- Clusters invisibles (import CSS manquants)
- Styles clusters override (ajout !important)
- Position emoji dans pin (translateY 0px)

#### Technique
- Leaflet 1.9.4, react-leaflet, react-leaflet-cluster
- OpenStreetMap tiles (CDN gratuit)
- CSS personnalise pour pins et clusters
- Geolocalisation browser native

---

## [0.1.0] - 2025-11-03

### 🎉 Version initiale

#### Ajoute
- Configuration initiale du projet
- Onboarding complet (16 questions)
- Configuration Firebase Console
  - Authentication (Email/Password activé)
  - Firestore Database (mode test, region europe-west1)
  - Firebase Analytics
- Definition architecture technique
- Definition patterns Firestore Rules
- Generation TodoList complete (78 taches)
- Documents legaux prepares (Topal, Strasbourg)

#### Configuration
- **Plateformes :** iOS + Android + Web (React Native Web)
- **Authentification :** Email + Google + Apple Sign-In (Google/Apple a configurer)
- **Fonctionnalites prevues :**
  - Carte interactive France avec clubs sportifs
  - Geolocalisation utilisateur
  - Recherche avancee avec filtres (sport, ville, niveau)
  - Profils utilisateurs publics
  - Chat 1-to-1 prive
  - Systeme de favoris
  - Notifications push (nouveaux messages)
  - Partage social et deep linking
  - Export donnees RGPD (JSON + PDF + CSV)
  - Analytics Firebase
  - Accessibilite WCAG 2.1 AA

#### Decisions techniques
- React Native + Expo v54
- TypeScript (strict mode)
- Firebase (Auth, Firestore, Storage, Analytics, Cloud Functions)
- React Navigation v7
- Zustand (state management)
- react-native-maps (Google Maps)
- React Native Web (Firebase Hosting)
- i18n (francais + anglais)
- Theme clair/sombre

#### Notes
- Firebase Storage a activer plus tard
- Google Sign-In OAuth credentials a configurer
- Apple Sign-In certificats a configurer

---

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_

**Derniere mise a jour :** 03/12/2025
