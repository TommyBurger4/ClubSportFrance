'use client';

/**
 * Gestionnaire de categories pour sports individuels
 *
 * Permet au club de cocher les categories d'age acceptees avec :
 * - Categorie d'age
 * - Genres acceptes (M/F ou les deux)
 */

import React, { useState, useEffect } from 'react';
import { getSportCategories } from '@/data/sportsCategories';
import { Card, Button } from '@/components/ui';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/firebase';

interface CategorieAcceptee {
  categorieId: string;
  categorieNom: string;
  genresAcceptes: ('M' | 'F')[];
}

interface CategoriesManagerProps {
  clubId: string;
  sport: string;
}

export default function CategoriesManager({ clubId, sport }: CategoriesManagerProps) {
  const [categoriesAcceptees, setCategoriesAcceptees] = useState<CategorieAcceptee[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sportData = getSportCategories(sport);
  const categories = sportData?.categories || [];

  // Charger les categories depuis Firestore
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const clubDoc = await getDoc(doc(db, 'users', clubId));
        if (clubDoc.exists()) {
          const data = clubDoc.data();
          setCategoriesAcceptees(data.categoriesAcceptees || []);
        }
      } catch (error) {
        console.error('Erreur chargement categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [clubId]);

  // Sauvegarder les categories dans Firestore
  const saveCategories = async (newCategories: CategorieAcceptee[]) => {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', clubId), {
        categoriesAcceptees: newCategories,
        updatedAt: new Date()
      });
      setCategoriesAcceptees(newCategories);
    } catch (error) {
      console.error('Erreur sauvegarde categories:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  // Verifier si une categorie est cochee
  const isCategorieChecked = (categorieId: string): boolean => {
    return categoriesAcceptees.some(c => c.categorieId === categorieId);
  };

  // Verifier si un genre est coche pour une categorie
  const isGenreChecked = (categorieId: string, genre: 'M' | 'F'): boolean => {
    const cat = categoriesAcceptees.find(c => c.categorieId === categorieId);
    return cat?.genresAcceptes.includes(genre) || false;
  };

  // Toggle une categorie
  const toggleCategorie = (categorieId: string, categorieNom: string) => {
    if (isCategorieChecked(categorieId)) {
      // Decocher : retirer la categorie
      const newCategories = categoriesAcceptees.filter(c => c.categorieId !== categorieId);
      saveCategories(newCategories);
    } else {
      // Cocher : ajouter la categorie avec M+F par defaut
      const newCategorie: CategorieAcceptee = {
        categorieId,
        categorieNom,
        genresAcceptes: ['M', 'F']
      };
      saveCategories([...categoriesAcceptees, newCategorie]);
    }
  };

  // Toggle un genre pour une categorie
  const toggleGenre = (categorieId: string, genre: 'M' | 'F') => {
    const catIndex = categoriesAcceptees.findIndex(c => c.categorieId === categorieId);
    if (catIndex === -1) return;

    const cat = categoriesAcceptees[catIndex];
    let newGenres: ('M' | 'F')[];

    if (cat.genresAcceptes.includes(genre)) {
      // Retirer le genre
      newGenres = cat.genresAcceptes.filter(g => g !== genre);

      // Si plus aucun genre, decocher la categorie entiere
      if (newGenres.length === 0) {
        toggleCategorie(categorieId, cat.categorieNom);
        return;
      }
    } else {
      // Ajouter le genre
      newGenres = [...cat.genresAcceptes, genre];
    }

    const newCategories = [...categoriesAcceptees];
    newCategories[catIndex] = {
      ...cat,
      genresAcceptes: newGenres
    };

    saveCategories(newCategories);
  };

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Categories acceptees ({categoriesAcceptees.length})
        </h2>
        <p className="text-sm text-gray-600">
          Cochez les categories d'age que votre club accepte et les genres.
        </p>
      </div>

      {/* Liste des categories */}
      <div className="space-y-3">
        {categories.map((categorie) => {
          const isChecked = isCategorieChecked(categorie.id);

          return (
            <div
              key={categorie.id}
              className={`p-4 border rounded-lg transition-all ${
                isChecked
                  ? 'bg-blue-50 border-primary'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox categorie */}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategorie(categorie.id, categorie.nom)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  disabled={saving}
                />

                <div className="flex-1">
                  <label
                    className="font-semibold text-gray-900 cursor-pointer"
                    onClick={() => toggleCategorie(categorie.id, categorie.nom)}
                  >
                    {categorie.nom}
                  </label>

                  {categorie.ageMin !== undefined && categorie.ageMax !== undefined && (
                    <p className="text-sm text-gray-600">
                      {categorie.ageMin}-{categorie.ageMax} ans
                    </p>
                  )}
                  {categorie.ageMin !== undefined && categorie.ageMax === undefined && (
                    <p className="text-sm text-gray-600">
                      {categorie.ageMin}+ ans
                    </p>
                  )}
                  {categorie.ageMin === undefined && categorie.ageMax !== undefined && (
                    <p className="text-sm text-gray-600">
                      Jusqu'a {categorie.ageMax} ans
                    </p>
                  )}

                  {/* Checkboxes genres (si categorie cochee) */}
                  {isChecked && (
                    <div className="mt-3 flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isGenreChecked(categorie.id, 'M')}
                          onChange={() => toggleGenre(categorie.id, 'M')}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          disabled={saving}
                        />
                        <span className="text-sm text-gray-700">Hommes</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isGenreChecked(categorie.id, 'F')}
                          onChange={() => toggleGenre(categorie.id, 'F')}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          disabled={saving}
                        />
                        <span className="text-sm text-gray-700">Femmes</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicateur sauvegarde */}
      {saving && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-sm text-blue-700">Sauvegarde en cours...</p>
        </div>
      )}

      {categoriesAcceptees.length === 0 && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">
            Aucune categorie selectionnee. Cochez les categories que vous acceptez.
          </p>
        </div>
      )}
    </Card>
  );
}
