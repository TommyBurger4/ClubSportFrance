'use client';

/**
 * Gestionnaire d'equipes pour sports collectifs
 *
 * Permet au club d'ajouter/supprimer des equipes avec :
 * - Categorie d'age
 * - Niveau de competition
 * - Genre (M/F/Mixte)
 */

import React, { useState, useEffect } from 'react';
import { getSportCategories, type CategorieAge, type NiveauCompetition } from '@/data/sportsCategories';
import { Card, Button, Select } from '@/components/ui';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/firebase';

interface Equipe {
  id: string;
  categorieId: string;
  categorieNom: string;
  niveauId: string;
  niveauNom: string;
  divisionId?: string;
  genre: 'M' | 'F' | 'Mixte';
}

interface EquipeManagerProps {
  clubId: string;
  sport: string;
}

export default function EquipeManager({ clubId, sport }: EquipeManagerProps) {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Formulaire ajout equipe
  const [showForm, setShowForm] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<'M' | 'F' | 'Mixte'>('M');

  const sportData = getSportCategories(sport);
  const categories = sportData?.categories || [];

  // Charger les equipes existantes depuis Firestore
  useEffect(() => {
    const loadEquipes = async () => {
      try {
        const clubDoc = await getDoc(doc(db, 'users', clubId));
        if (clubDoc.exists()) {
          const data = clubDoc.data();
          setEquipes(data.equipes || []);
        }
      } catch (error) {
        console.error('Erreur chargement equipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEquipes();
  }, [clubId]);

  // Sauvegarder les equipes dans Firestore
  const saveEquipes = async (newEquipes: Equipe[]) => {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', clubId), {
        equipes: newEquipes,
        updatedAt: new Date()
      });
      setEquipes(newEquipes);
    } catch (error) {
      console.error('Erreur sauvegarde equipes:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  // Ajouter une equipe
  const handleAddEquipe = () => {
    if (!selectedCategorie || !selectedNiveau || !selectedGenre) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const categorie = categories.find(c => c.id === selectedCategorie);
    const niveau = categorie?.niveauxDisponibles?.find(n => n.id === selectedNiveau);

    if (!categorie || !niveau) {
      alert('Categorie ou niveau invalide');
      return;
    }

    const newEquipe: Equipe = {
      id: `${selectedCategorie}-${selectedNiveau}-${selectedDivision || 'nodiv'}-${selectedGenre}-${Date.now()}`,
      categorieId: selectedCategorie,
      categorieNom: categorie.nom,
      niveauId: selectedNiveau,
      niveauNom: niveau.nom,
      divisionId: selectedDivision || undefined,
      genre: selectedGenre
    };

    const newEquipes = [...equipes, newEquipe];
    saveEquipes(newEquipes);

    // Reset form
    setSelectedCategorie('');
    setSelectedNiveau('');
    setSelectedDivision('');
    setSelectedGenre('M');
    setShowForm(false);
  };

  // Supprimer une equipe
  const handleDeleteEquipe = (equipeId: string) => {
    if (confirm('Supprimer cette equipe ?')) {
      const newEquipes = equipes.filter(e => e.id !== equipeId);
      saveEquipes(newEquipes);
    }
  };

  const selectedCategorieData = categories.find(c => c.id === selectedCategorie);
  const niveauxDisponibles = selectedCategorieData?.niveauxDisponibles || [];
  const selectedNiveauData = niveauxDisponibles.find(n => n.id === selectedNiveau);
  const divisionsDisponibles = selectedNiveauData?.divisions || [];

  if (loading) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Mes equipes ({equipes.length})
        </h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Annuler' : '+ Ajouter une equipe'}
        </Button>
      </div>

      {/* Formulaire ajout */}
      {showForm && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">Nouvelle equipe</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Categorie d'age */}
            <Select
              label="Categorie d'age"
              value={selectedCategorie}
              onChange={(e) => {
                setSelectedCategorie(e.target.value);
                setSelectedNiveau('');
                setSelectedDivision('');
              }}
              options={[
                { value: '', label: 'Selectionner...' },
                ...categories.map(c => ({ value: c.id, label: c.nom }))
              ]}
              required
              fullWidth
            />

            {/* Niveau */}
            <Select
              label="Niveau"
              value={selectedNiveau}
              onChange={(e) => {
                setSelectedNiveau(e.target.value);
                setSelectedDivision('');
              }}
              options={[
                { value: '', label: 'Selectionner...' },
                ...niveauxDisponibles.map(n => ({ value: n.id, label: n.nom }))
              ]}
              required
              fullWidth
              disabled={!selectedCategorie}
            />

            {/* Division (si applicable) */}
            {divisionsDisponibles.length > 0 && (
              <Select
                label="Division"
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                options={[
                  { value: '', label: 'Aucune' },
                  ...divisionsDisponibles.map(d => ({ value: d, label: d }))
                ]}
                fullWidth
              />
            )}

            {/* Genre */}
            <Select
              label="Genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value as 'M' | 'F' | 'Mixte')}
              options={
                selectedCategorieData?.genres.map(g => ({
                  value: g,
                  label: g === 'M' ? 'Masculin' : g === 'F' ? 'Feminin' : 'Mixte'
                })) || [{ value: 'M', label: 'Masculin' }]
              }
              required
              fullWidth
            />
          </div>

          <div className="mt-4 flex gap-3">
            <Button onClick={handleAddEquipe} loading={saving}>
              Ajouter l'equipe
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Annuler
            </Button>
          </div>
        </div>
      )}

      {/* Liste des equipes */}
      {equipes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">Aucune equipe enregistree</p>
          <p className="text-sm text-gray-500">
            Cliquez sur "Ajouter une equipe" pour commencer
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {equipes.map((equipe) => (
            <div
              key={equipe.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-900">
                  {equipe.categorieNom} • {equipe.genre === 'M' ? 'Masculin' : equipe.genre === 'F' ? 'Feminin' : 'Mixte'}
                </h3>
                <p className="text-sm text-gray-600">
                  {equipe.niveauNom}
                  {equipe.divisionId && ` - ${equipe.divisionId}`}
                </p>
              </div>
              <button
                onClick={() => handleDeleteEquipe(equipe.id)}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
