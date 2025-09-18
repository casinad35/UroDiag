import React from 'react';
import { Activity, Users, Award, TrendingUp, Shield, BookOpen } from 'lucide-react';

interface HomePageProps {
  onStartExam: () => void;
}

export default function HomePage({ onStartExam }: HomePageProps) {
  const features = [
    {
      icon: Activity,
      title: 'Analyse Complète',
      description: 'Évaluation complète des paramètres uro-dynamiques avec algorithmes diagnostiques avancés'
    },
    {
      icon: Users,
      title: 'Cas Cliniques',
      description: 'Base de données de cas cliniques réels pour formation et référence'
    },
    {
      icon: Award,
      title: 'Recommandations',
      description: 'Recommandations thérapeutiques personnalisées selon les dernières guidelines'
    },
    {
      icon: TrendingUp,
      title: 'Suivi Evolution',
      description: 'Outils de suivi et comparaison des examens dans le temps'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="text-blue-600">UroDiag</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Plateforme d'aide au diagnostic en uro-dynamique. Analysez vos examens 
              avec des algorithmes diagnostiques validés et obtenez des recommandations personnalisées.
            </p>
            <div className="mt-10">
              <button
                onClick={onStartExam}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Commencer un Examen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Fonctionnalités Principales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Excellence Diagnostique
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">60+</div>
              <div className="text-gray-600">Paramètres analysés</div>
              <p className="text-sm text-gray-500 mt-2">Analyse complète selon les standards ICS</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">21</div>
              <div className="text-gray-600">Cas cliniques intégrés</div>
              <p className="text-sm text-gray-500 mt-2">Pathologies fréquentes, complexes et pédiatriques</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">ICS</div>
              <div className="text-gray-600">Conformité internationale</div>
              <p className="text-sm text-gray-500 mt-2">Standards International Continence Society</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à Analyser Votre Premier Examen ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez les professionnels qui font confiance à UroDiag pour leurs diagnostics uro-dynamiques.
          </p>
          <button
            onClick={onStartExam}
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Démarrer Maintenant
          </button>
        </div>
      </div>
    </div>
  );
}