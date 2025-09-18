import React from 'react';
import { PatientData } from '../../data/urodynamicData';

interface NormalValuesComparisonProps {
  data: PatientData;
}

interface Parameter {
  name: string;
  value: number | string;
  normalRange: string;
  unit: string;
  status: 'normal' | 'abnormal' | 'borderline';
  category: string;
}

export default function NormalValuesComparison({ data }: NormalValuesComparisonProps) {
  const getStatus = (value: number, min: number, max: number): 'normal' | 'abnormal' | 'borderline' => {
    if (value >= min && value <= max) return 'normal';
    if (value >= min * 0.8 && value <= max * 1.2) return 'borderline';
    return 'abnormal';
  };

  const parameters: Parameter[] = [
    // Débitmétrie
    {
      name: 'Qmax',
      value: data.debitMetrie.qMax,
      normalRange: data.sexe === 'M' ? '15-25' : '15-25',
      unit: 'ml/s',
      status: getStatus(data.debitMetrie.qMax, 15, 25),
      category: 'Débitmétrie'
    },
    {
      name: 'Q moyen',
      value: data.debitMetrie.qMoyen,
      normalRange: '8-15',
      unit: 'ml/s',
      status: getStatus(data.debitMetrie.qMoyen, 8, 15),
      category: 'Débitmétrie'
    },
    {
      name: 'Volume vidé',
      value: data.debitMetrie.volumeVide,
      normalRange: '150-500',
      unit: 'ml',
      status: getStatus(data.debitMetrie.volumeVide, 150, 500),
      category: 'Débitmétrie'
    },
    
    // Cystométrie
    {
      name: 'Capacité vésicale',
      value: data.cystometrie.capaciteVesicale,
      normalRange: '300-600',
      unit: 'ml',
      status: getStatus(data.cystometrie.capaciteVesicale, 300, 600),
      category: 'Cystométrie'
    },
    {
      name: 'Pression détrusor',
      value: data.cystometrie.pressionDetrusor,
      normalRange: '15-40',
      unit: 'cmH2O',
      status: getStatus(data.cystometrie.pressionDetrusor, 15, 40),
      category: 'Cystométrie'
    },
    {
      name: 'Compliance',
      value: data.cystometrie.compliance,
      normalRange: '>20',
      unit: 'ml/cmH2O',
      status: data.cystometrie.compliance > 20 ? 'normal' : 'abnormal',
      category: 'Cystométrie'
    },
    {
      name: 'Premier besoin',
      value: data.cystometrie.premierBesoin,
      normalRange: '100-200',
      unit: 'ml',
      status: getStatus(data.cystometrie.premierBesoin, 100, 200),
      category: 'Cystométrie'
    },
    
    // Profil urétral
    {
      name: 'Pression clôture urétrale',
      value: data.profilPression.pressionClotureUretrale,
      normalRange: data.sexe === 'M' ? '40-80' : '20-60',
      unit: 'cmH2O',
      status: data.sexe === 'M' 
        ? getStatus(data.profilPression.pressionClotureUretrale, 40, 80)
        : getStatus(data.profilPression.pressionClotureUretrale, 20, 60),
      category: 'Profil urétral'
    },
    {
      name: 'Longueur fonctionnelle',
      value: data.profilPression.longueurFonctionnelle,
      normalRange: data.sexe === 'M' ? '15-35' : '25-45',
      unit: 'mm',
      status: data.sexe === 'M' 
        ? getStatus(data.profilPression.longueurFonctionnelle, 15, 35)
        : getStatus(data.profilPression.longueurFonctionnelle, 25, 45),
      category: 'Profil urétral'
    },
    
    // Étude pression-débit
    {
      name: 'Pdet au Qmax',
      value: data.etudePressionDebit.pressionDetrusorQmax,
      normalRange: '<40',
      unit: 'cmH2O',
      status: data.etudePressionDebit.pressionDetrusorQmax < 40 ? 'normal' : 'abnormal',
      category: 'Pression-débit'
    },
    {
      name: 'Index contractilité',
      value: data.etudePressionDebit.indexContractilite,
      normalRange: '>100',
      unit: '',
      status: data.etudePressionDebit.indexContractilite > 100 ? 'normal' : 'abnormal',
      category: 'Pression-débit'
    },
    
    // RPM
    {
      name: 'Résidu post-mictionnel',
      value: data.residuPostMictionnel,
      normalRange: '<50',
      unit: 'ml',
      status: data.residuPostMictionnel < 50 ? 'normal' : 'abnormal',
      category: 'Général'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'borderline': return 'text-yellow-600 bg-yellow-100';
      case 'abnormal': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return '✓';
      case 'borderline': return '⚠';
      case 'abnormal': return '✗';
      default: return '?';
    }
  };

  const categories = [...new Set(parameters.map(p => p.category))];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-6">Comparaison avec les Valeurs Normales</h4>
      
      {categories.map(category => (
        <div key={category} className="mb-6">
          <h5 className="text-md font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">
            {category}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parameters
              .filter(p => p.category === category)
              .map((param, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-medium text-gray-700 text-sm">{param.name}</h6>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(param.status)}`}>
                      {getStatusIcon(param.status)} {param.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valeur:</span>
                      <span className="font-semibold text-gray-900">
                        {typeof param.value === 'number' ? param.value.toFixed(1) : param.value} {param.unit}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Normal:</span>
                      <span className="text-gray-700">{param.normalRange} {param.unit}</span>
                    </div>
                    
                    {/* Barre de progression visuelle */}
                    {typeof param.value === 'number' && param.normalRange.includes('-') && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              param.status === 'normal' ? 'bg-green-500' :
                              param.status === 'borderline' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{
                              width: `${Math.min(100, Math.max(0, (param.value / (parseFloat(param.normalRange.split('-')[1]) * 1.5)) * 100))}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      
      {/* Résumé global */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-800 mb-3">Résumé Global</h5>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {parameters.filter(p => p.status === 'normal').length}
            </div>
            <div className="text-sm text-gray-600">Normaux</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {parameters.filter(p => p.status === 'borderline').length}
            </div>
            <div className="text-sm text-gray-600">Limites</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {parameters.filter(p => p.status === 'abnormal').length}
            </div>
            <div className="text-sm text-gray-600">Anormaux</div>
          </div>
        </div>
      </div>
    </div>
  );
}