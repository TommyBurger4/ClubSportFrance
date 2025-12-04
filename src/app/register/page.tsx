'use client';

/**
 * Page d'inscription - Espace Club (2 etapes)
 *
 * ETAPE 1 : Informations du compte
 * - Nom du club, Sport, Ligue, Email, Mot de passe
 *
 * ETAPE 2 : Localisation
 * - Adresse (rue, code postal, ville)
 * - Geocodage automatique pour coordonnees GPS
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, Card, Select } from '@/components/ui';
import { isValidEmail, validatePassword, passwordsMatch } from '@/services/auth/authService';
import { SPORTS, LEAGUES } from '@/constants/sports';
import { geocodeAddress, validateAddress } from '@/services/geocoding/geocodingService';

export default function RegisterPage() {
  const router = useRouter();
  const { register, error, clearError } = useAuth();

  // Etape actuelle (1 ou 2)
  const [step, setStep] = useState(1);

  // Etape 1 : Informations du compte
  const [clubName, setClubName] = useState('');
  const [sport, setSport] = useState('');
  const [league, setLeague] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Etape 2 : Adresse
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  // Validation Etape 1
  const validateStep1 = (): boolean => {
    setLocalError('');
    clearError();

    if (!clubName || !sport || !league || !email || !password || !confirmPassword) {
      setLocalError('Veuillez remplir tous les champs');
      return false;
    }

    if (!isValidEmail(email)) {
      setLocalError('Adresse email invalide');
      return false;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setLocalError(passwordValidation.error || 'Mot de passe invalide');
      return false;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      setLocalError('Les mots de passe ne correspondent pas');
      return false;
    }

    return true;
  };

  // Passer a l'etape 2
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  // Retour a l'etape 1
  const handlePreviousStep = () => {
    setStep(1);
    setLocalError('');
    clearError();
  };

  // Inscription finale (Etape 2)
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    // Validation adresse
    const addressValidation = validateAddress(street, postalCode, city);
    if (!addressValidation.valid) {
      setLocalError(addressValidation.error || 'Adresse invalide');
      return;
    }

    setLoading(true);

    // Geocodage de l'adresse
    const geocodingResult = await geocodeAddress(street, postalCode, city);

    if (!geocodingResult.success) {
      setLocalError(geocodingResult.error || 'Impossible de localiser l\'adresse');
      setLoading(false);
      return;
    }

    // Inscription avec toutes les donnees
    const result = await register(
      email,
      password,
      clubName,
      'club',
      sport,
      league,
      {
        street,
        postalCode,
        city,
      },
      {
        latitude: geocodingResult.latitude!,
        longitude: geocodingResult.longitude!,
      }
    );

    if (result.success) {
      // Redirection vers dashboard
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur lors de l\'inscription');
    }

    setLoading(false);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md min-w-[400px]">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🏃‍♂️</span>
            <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">ClubSportFrance</h1>
          </Link>
          <h2 className="text-xl font-semibold text-gray-900 mt-4 whitespace-nowrap">Inscrire mon club</h2>
          <p className="text-gray-600 mt-2 whitespace-normal">
            Etape {step} sur 2 : {step === 1 ? 'Informations du compte' : 'Localisation'}
          </p>
        </div>

        <Card>
          {/* Indicateur d'etapes */}
          <div className="mb-6 flex items-center gap-2">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          </div>

          {/* Erreur */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 whitespace-normal">{displayError}</p>
            </div>
          )}

          {/* ETAPE 1 : Informations du compte */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <Input
                type="text"
                label="Nom du club"
                placeholder="Ex: FC Paris, Tennis Club Lyon..."
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
                fullWidth
                autoComplete="organization"
                helperText="Ce nom sera affiche sur votre fiche club"
              />

              <Select
                label="Sport"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                options={SPORTS}
                required
                fullWidth
                helperText="Selectionnez le sport principal de votre club"
              />

              <Select
                label="Ligue / Federation"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
                options={LEAGUES}
                required
                fullWidth
                helperText="A quelle federation etes-vous rattache ?"
              />

              <Input
                type="email"
                label="Email"
                placeholder="contact@monclub.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoComplete="email"
              />

              <Input
                type="password"
                label="Mot de passe"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                autoComplete="new-password"
                helperText="Minimum 6 caracteres"
              />

              <Input
                type="password"
                label="Confirmer le mot de passe"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                autoComplete="new-password"
              />

              <Button type="submit" fullWidth>
                Suivant
              </Button>
            </form>
          )}

          {/* ETAPE 2 : Localisation */}
          {step === 2 && (
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  📍 Indiquez l'adresse de votre club pour apparaitre sur la carte
                </p>
              </div>

              <Input
                type="text"
                label="Adresse"
                placeholder="12 Rue du Sport"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                fullWidth
                helperText="Numero et nom de rue"
              />

              <Input
                type="text"
                label="Code postal"
                placeholder="67000"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                fullWidth
                maxLength={5}
                helperText="5 chiffres"
              />

              <Input
                type="text"
                label="Ville"
                placeholder="Strasbourg"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                fullWidth
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={handlePreviousStep}
                  disabled={loading}
                >
                  Retour
                </Button>
                <Button type="submit" fullWidth loading={loading}>
                  Creer mon compte
                </Button>
              </div>
            </form>
          )}

          {/* Lien connexion */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 whitespace-normal">
              Vous avez deja un compte ?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline whitespace-nowrap">
                Se connecter
              </Link>
            </p>
          </div>
        </Card>

        {/* Lien retour */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Retour a la carte
          </Link>
        </div>
      </div>
    </div>
  );
}
