# 🚨 TODO PROCHAINE SESSION

**Date creation :** 09/12/2025 23:00
**Version concernee :** v0.5.0

---

## ⚠️ IMPORTANT : TESTS A EFFECTUER

### 🎯 Systeme de gestion equipes/categories (v0.5.0)

**OBLIGATOIRE** : Tester le workflow complet avant de continuer le developpement.

---

## ✅ CHECKLIST TESTS

### 1️⃣ Test Inscription Club avec Sport d'Equipe (ex: Football)

- [ ] Aller sur `/register`
- [ ] Remplir Etape 1 :
  - Nom du club
  - **Sport : Football ⚽**
  - Federation (verifier auto-remplissage "FFF")
  - Email
  - Mot de passe + confirmation
- [ ] Cliquer "Suivant"
- [ ] Remplir Etape 2 :
  - Adresse complete (rue, code postal, ville)
  - Verifier geocodage automatique
- [ ] Cliquer "Creer mon compte"
- [ ] **Verifier redirection vers `/dashboard`**

### 2️⃣ Test Gestionnaire Equipes (Football)

- [ ] Sur `/dashboard`, verifier affichage :
  - Informations du club (sidebar gauche)
  - Titre "Mes equipes (0)" (colonne droite)
  - Bouton "+ Ajouter une equipe"
- [ ] Cliquer "+ Ajouter une equipe"
- [ ] Verifier formulaire avec :
  - Categorie d'age (dropdown avec U6-U7, U8-U9, U10-U11, U12-U13, U14-U15, U16-U17, U18-U19, Seniors)
  - Niveau competition (dropdown desactive initialement)
  - Genre (dropdown avec options selon categorie)
- [ ] Remplir formulaire :
  - Categorie : **U13**
  - Niveau : **Departemental**
  - Division : **D2**
  - Genre : **Masculin**
- [ ] Cliquer "Ajouter l'equipe"
- [ ] **Verifier** :
  - Equipe apparait dans la liste
  - Affichage : "U13 • Masculin" + "Departemental - D2"
  - Compteur "Mes equipes (1)"
- [ ] Ajouter une 2e equipe :
  - Categorie : **Seniors**
  - Niveau : **Regional**
  - Division : **R1**
  - Genre : **Feminin**
- [ ] **Verifier** :
  - 2 equipes dans la liste
  - Compteur "Mes equipes (2)"

### 3️⃣ Test Suppression Equipe

- [ ] Cliquer "Supprimer" sur une equipe
- [ ] **Verifier** :
  - Popup confirmation "Supprimer cette equipe ?"
  - Apres confirmation, equipe disparait
  - Compteur mis a jour

### 4️⃣ Test Inscription Club avec Sport Individuel (ex: Judo)

- [ ] Deconnexion (si necessaire)
- [ ] Creer nouveau compte club :
  - **Sport : Judo 🥋**
  - Federation (verifier auto-remplissage "FFJDA")
- [ ] Terminer inscription
- [ ] **Verifier redirection vers `/dashboard`**

### 5️⃣ Test Gestionnaire Categories (Judo)

- [ ] Sur `/dashboard`, verifier affichage :
  - Titre "Categories acceptees (0)"
  - Description : "Cochez les categories d'age que votre club accepte..."
  - Liste categories (Eveil Judo U6-U7, Poussin U8-U9, Benjamin U10-U11...)
- [ ] Cocher une categorie : **Benjamin (U10-U11)**
- [ ] **Verifier** :
  - Categorie passe en fond bleu (bg-blue-50)
  - Checkboxes genres apparaissent (Hommes, Femmes)
  - Les 2 genres coches par defaut
  - Compteur "Categories acceptees (1)"
- [ ] Decocher "Femmes"
- [ ] **Verifier** :
  - Seulement "Hommes" reste coche
  - Sauvegarde automatique (message "Sauvegarde en cours...")
- [ ] Cocher une 2e categorie : **Seniors**
- [ ] **Verifier** :
  - 2 categories cochees
  - Compteur "Categories acceptees (2)"

### 6️⃣ Test Deselection Complete

- [ ] Decocher "Hommes" sur Benjamin (seul genre restant)
- [ ] **Verifier** :
  - Categorie Benjamin se decoche automatiquement
  - Compteur revient a "Categories acceptees (1)"

### 7️⃣ Test Persistance Firestore

- [ ] Ouvrir Firebase Console → Firestore Database
- [ ] Aller dans collection `users/`
- [ ] Trouver le club Football cree
- [ ] **Verifier champ `equipes`** :
  ```json
  [
    {
      "id": "u13-departemental-D2-M-1234567890",
      "categorieId": "u13",
      "categorieNom": "U13",
      "niveauId": "departemental",
      "niveauNom": "Departemental",
      "divisionId": "D2",
      "genre": "M"
    }
  ]
  ```
- [ ] Trouver le club Judo cree
- [ ] **Verifier champ `categoriesAcceptees`** :
  ```json
  [
    {
      "categorieId": "benjamin",
      "categorieNom": "Benjamin (U10-U11)",
      "genresAcceptes": ["M"]
    },
    {
      "categorieId": "senior",
      "categorieNom": "Senior",
      "genresAcceptes": ["M", "F"]
    }
  ]
  ```

### 8️⃣ Test Rechargement Page

- [ ] Rafraichir page `/dashboard` (F5)
- [ ] **Verifier** :
  - Equipes/categories toujours presentes
  - Compteurs corrects
  - Pas de perte de donnees

### 9️⃣ Test Differents Sports

Tester au moins 3 sports supplementaires :

**Sports d'equipe :**
- [ ] Basketball (FFBB) - Verifier niveaux Betclic Elite, Pro B, NM1...
- [ ] Volleyball (FFVolley) - Verifier niveaux Ligue A, Ligue B...

**Sports individuels :**
- [ ] Tennis (FFT) - Verifier categories Mini-Tennis, U8-U9, Veterans...
- [ ] Natation (FFN) - Verifier categories Avenirs, Jeunes, Juniors, Seniors, Masters

### 🔟 Test Navigation

- [ ] Depuis `/dashboard`, cliquer "Voir ma fiche publique"
- [ ] **Verifier redirection** vers `/clubs/[clubId]`
- [ ] Depuis fiche publique, verifier bouton retour dashboard (si proprietaire)
- [ ] Depuis `/dashboard`, cliquer "Retour a la carte"
- [ ] **Verifier redirection** vers `/` (carte)

---

## 🐛 PROBLEMES A SIGNALER

Si tu trouves des bugs pendant les tests, note-les ici :

### Bugs trouves :

_Aucun pour le moment_

---

## 📊 METRIQUES ATTENDUES

Apres tous les tests :

- [ ] **0 erreurs** dans la console navigateur
- [ ] **0 erreurs** de compilation TypeScript
- [ ] **Toutes les sauvegardes** Firestore reussies
- [ ] **Toutes les redirections** fonctionnent
- [ ] **Tous les compteurs** corrects
- [ ] **Persistance complete** apres rechargement

---

## 🚀 PROCHAINES ETAPES (apres validation tests)

Une fois tous les tests valides :

1. **Affichage public des equipes/categories** :
   - Afficher equipes sur page `/clubs/[clubId]` (fiche publique)
   - Afficher categories acceptees pour sports individuels
   - Design cartes equipes avec coach, horaires, niveau

2. **Filtres avances sur carte** :
   - Filtrer par categorie d'age
   - Filtrer par niveau de competition
   - Filtrer par genre

3. **Statistiques Dashboard** :
   - Nombre de vues fiche club
   - Nombre de favoris

4. **Edition profil club** :
   - Modal edition informations club
   - Upload photos club (max 5)
   - Gestion equipements

---

**⚠️ IMPORTANT : NE PAS CONTINUER LE DEVELOPPEMENT AVANT D'AVOIR VALIDE TOUS CES TESTS**

Si des bugs sont decouverts, les corriger en priorite avant d'ajouter de nouvelles fonctionnalites.

---

🤖 _Genere avec [Claude Code](https://claude.com/claude-code) le 09/12/2025_
