import React, { useState } from 'react';
import { CAS_CLINIQUES, analyserUrodynamique } from '../data/urodynamicData';
import { BookOpen, Play, User, Activity, BarChart } from 'lucide-react';

interface ClinicalCasesProps {
  onAnalyzeCase: (caseData: any) => void;
}

// Fonction pour formater l'affichage du sexe selon l'âge
const formatPatientInfo = (age: number, sexe: 'M' | 'F'): string => {
  if (age < 18) {
    return sexe === 'M' ? `Garçon de ${age} ans` : `Fille de ${age} ans`;
  } else {
    return sexe === 'M' ? `Homme de ${age} ans` : `Femme de ${age} ans`;
  }
};

export default function ClinicalCases({ onAnalyzeCase }: ClinicalCasesProps) {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const handleAnalyzeCase = (caseData: any) => {
    const result = analyserUrodynamique(caseData);
    onAnalyzeCase({ caseData, result });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cas Cliniques de Démonstration</h1>
          <p className="text-lg text-gray-600">
            Explorez des cas cliniques réels pour comprendre l'application des diagnostics uro-dynamiques
          </p>
        </div>

        {/* Liste des cas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CAS_CLINIQUES.map((cas) => (
            <div key={cas.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                    <span className="text-sm font-bold text-blue-600">{cas.id}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{cas.titre}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{cas.description}</p>
                
                {/* Données patient résumées */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    {formatPatientInfo(cas.donnee.age, cas.donnee.sexe)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Activity className="w-4 h-4 mr-2" />
                    Symptômes: {cas.donnee.symptomes.length} identifiés
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BarChart className="w-4 h-4 mr-2" />
                    Qmax: {cas.donnee.debitMetrie.qMax} ml/s
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCase(selectedCase === cas.id ? null : cas.id)}
                    className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                  >
                    {selectedCase === cas.id ? 'Masquer Détails' : 'Voir Détails'}
                  </button>
                  <button
                    onClick={() => handleAnalyzeCase(cas.donnee)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Analyser ce Cas
                  </button>
                </div>
              </div>

              {/* Détails du cas (expandible) */}
              {selectedCase === cas.id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-3">Détails du Patient</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Symptômes</h5>
                      <div className="flex flex-wrap gap-1">
                        {cas.donnee.symptomes.map((symptome, index) => (
                          <span key={index} className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                            {symptome}
                          </span>
                        ))}
                      </div>
                    </div>

                    {cas.donnee.antecedents.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Antécédents</h5>
                        <div className="flex flex-wrap gap-1">
                          {cas.donnee.antecedents.map((antecedent, index) => (
                            <span key={index} className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                              {antecedent}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Débitmétrie</h5>
                        <div className="space-y-1 text-gray-600">
                          <div>Qmax: {cas.donnee.debitMetrie.qMax} ml/s</div>
                          <div>Volume: {cas.donnee.debitMetrie.volumeVide} ml</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Cystométrie</h5>
                        <div className="space-y-1 text-gray-600">
                          <div>Capacité: {cas.donnee.cystometrie.capaciteVesicale} ml</div>
                          <div>Pdet: {cas.donnee.cystometrie.pressionDetrusor} cmH2O</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Profil Urétral</h5>
                      <div className="text-sm text-gray-600">
                        Pression clôture: {cas.donnee.profilPression.pressionClotureUretrale} cmH2O
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">RPM</h5>
                      <div className="text-sm text-gray-600">
                        {cas.donnee.residuPostMictionnel} ml
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Information supplémentaire */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">À Propos de ces Cas Cliniques</h2>
          <div className="text-blue-800 space-y-2">
            <p>
              Ces cas cliniques représentent les situations les plus fréquemment rencontrées en uro-dynamique. 
              Ils ont été sélectionnés pour illustrer les différents types de dysfonctionnements vésico-sphinctériens.
            </p>
            <p>
              Chaque cas peut être analysé pour comprendre la logique diagnostique et les recommandations 
              thérapeutiques associées. C'est un excellent outil de formation et de révision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}