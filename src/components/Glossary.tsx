import React, { useState } from 'react';
import { GLOSSAIRE_COMPLET } from '../data/glossaryData';
import { BookOpen, Search, Info, Filter, X } from 'lucide-react';

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Catégories pour le filtrage
  const categories = [
    { id: 'all', name: 'Tous les paramètres' },
    { id: 'debitmetrie', name: 'Débitmétrie' },
    { id: 'cystometrie', name: 'Cystométrie' },
    { id: 'profil', name: 'Profil urétral' },
    { id: 'emg', name: 'EMG périnéal' },
    { id: 'pression-debit', name: 'Pression-débit' },
    { id: 'tests', name: 'Tests de provocation' },
    { id: 'general', name: 'Paramètres généraux' }
  ];

  const getCategoryFromTerm = (term: string): string => {
    const lowerTerm = term.toLowerCase();
    if (lowerTerm.includes('qmax') || lowerTerm.includes('débit') || lowerTerm.includes('volume vidé') || lowerTerm.includes('temps') || lowerTerm.includes('courbe')) {
      return 'debitmetrie';
    }
    if (lowerTerm.includes('capacité') || lowerTerm.includes('compliance') || lowerTerm.includes('détrusor') || lowerTerm.includes('contraction') || lowerTerm.includes('sensibilité') || lowerTerm.includes('besoin')) {
      return 'cystometrie';
    }
    if (lowerTerm.includes('urétral') || lowerTerm.includes('clôture') || lowerTerm.includes('longueur') || lowerTerm.includes('transmission')) {
      return 'profil';
    }
    if (lowerTerm.includes('emg') || lowerTerm.includes('sphincter') || lowerTerm.includes('synergie') || lowerTerm.includes('réflexe') || lowerTerm.includes('recrutement')) {
      return 'emg';
    }
    if (lowerTerm.includes('obstruction') || lowerTerm.includes('contractilité') || lowerTerm.includes('résistance') || lowerTerm.includes('conductance')) {
      return 'pression-debit';
    }
    if (lowerTerm.includes('test') || lowerTerm.includes('toux') || lowerTerm.includes('valsalva') || lowerTerm.includes('fuite')) {
      return 'tests';
    }
    return 'general';
  };

  const filteredTerms = Object.entries(GLOSSAIRE_COMPLET).filter(([term, data]) => {
    const matchesSearch = term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         data.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || getCategoryFromTerm(term) === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (term: string) => {
    const category = getCategoryFromTerm(term);
    const colors = {
      'debitmetrie': 'bg-blue-100 text-blue-800',
      'cystometrie': 'bg-green-100 text-green-800',
      'profil': 'bg-purple-100 text-purple-800',
      'emg': 'bg-yellow-100 text-yellow-800',
      'pression-debit': 'bg-red-100 text-red-800',
      'tests': 'bg-indigo-100 text-indigo-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Glossaire Urodynamique Complet</h1>
          <p className="text-lg text-gray-600">
            Définitions détaillées de tous les paramètres urodynamiques avec valeurs normales et interprétations cliniques
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Barre de recherche */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Rechercher un paramètre ou une définition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filtre par catégorie */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Compteur de résultats */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredTerms.length} paramètre{filteredTerms.length > 1 ? 's' : ''} trouvé{filteredTerms.length > 1 ? 's' : ''}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <X className="w-4 h-4 mr-1" />
                Effacer la recherche
              </button>
            )}
          </div>
        </div>

        {/* Liste des termes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTerms.map(([term, data]) => (
            <div
              key={term}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">{term}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(term)}`}>
                      {categories.find(cat => cat.id === getCategoryFromTerm(term))?.name || 'Général'}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTerm(selectedTerm === term ? null : term)}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{data.definition}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Unité:</span>
                    <span className="text-gray-800">{data.unite}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Valeurs normales:</span>
                    <span className="text-gray-800 text-right flex-1 ml-2">{data.valeursNormales}</span>
                  </div>
                </div>

                {selectedTerm === term && (
                  <div className="mt-4 space-y-4 p-4 bg-blue-50 rounded-lg border-t border-blue-200">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        Comment l'obtenir
                      </h4>
                      <p className="text-blue-800 text-sm leading-relaxed">{data.obtention}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        Interprétation clinique
                      </h4>
                      <p className="text-blue-800 text-sm leading-relaxed">{data.interpretation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun paramètre trouvé</h3>
            <p className="text-gray-500 mb-4">
              Essayez avec d'autres mots-clés ou changez de catégorie.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Section informative */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">À Propos de ce Glossaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
            <div>
              <h3 className="font-medium mb-2">Contenu Scientifique</h3>
              <p className="text-sm leading-relaxed">
                Ce glossaire contient plus de 50 paramètres urodynamiques avec leurs définitions complètes, 
                conformément aux recommandations de l'International Continence Society (ICS) et aux dernières 
                guidelines européennes et américaines.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Utilisation Clinique</h3>
              <p className="text-sm leading-relaxed">
                Chaque paramètre inclut sa méthode d'obtention, ses valeurs de référence actualisées, 
                et son interprétation clinique détaillée pour une prise en charge optimale des patients.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Classification</h3>
              <p className="text-sm leading-relaxed">
                Les paramètres sont organisés par catégories (débitmétrie, cystométrie, profil urétral, etc.) 
                pour faciliter la navigation et l'apprentissage progressif.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Mise à Jour</h3>
              <p className="text-sm leading-relaxed">
                Les définitions et valeurs normales sont régulièrement mises à jour selon les dernières 
                publications scientifiques et recommandations des sociétés savantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}