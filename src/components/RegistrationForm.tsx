import React, { useState } from 'react';
import { User, Building, Phone, Mail, Stethoscope } from 'lucide-react';
import { Participant } from '../types';

interface RegistrationFormProps {
  onRegister: (participant: Participant) => void;
  onBack: () => void;
}

const specialites = [
  'Médecine générale',
  'Cardiologie',
  'Rhumatologie',
  'Orthopédie',
  'Urologie',
  'Chirurgie',
  'Anesthésie',
  'Radiologie',
  'Autre'
];

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister, onBack }) => {
  const [formData, setFormData] = useState<Participant>({
    nom: '',
    prenom: '',
    specialite: '',
    structure: '',
    telephone: '',
    email: '',
    consentement: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [customSpecialite, setCustomSpecialite] = useState('');

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est obligatoire';
    }

    if (!formData.specialite && !customSpecialite.trim()) {
      newErrors.specialite = 'La spécialité est obligatoire';
    }

    if (!formData.structure.trim()) {
      newErrors.structure = 'La structure est obligatoire';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est obligatoire';
    } else if (!/^(?:\+33|0)[1-9](?:[0-9]{8})$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Format de téléphone invalide';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.consentement) {
      newErrors.consentement = 'Vous devez accepter la collecte de vos informations';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const finalData = {
        ...formData,
        specialite: formData.specialite === 'Autre' ? customSpecialite : formData.specialite
      };
      onRegister(finalData);
    }
  };

  const handleInputChange = (field: keyof Participant, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Inscription au Quiz</h1>
            <p className="text-gray-600">
              Veuillez remplir vos informations pour accéder au quiz
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nom ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Votre nom"
                />
                {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Prénom *
                </label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange('prenom', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.prenom ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Votre prénom"
                />
                {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
              </div>

              {/* Spécialité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Stethoscope className="inline w-4 h-4 mr-2" />
                  Spécialité *
                </label>
                <select
                  value={formData.specialite}
                  onChange={(e) => handleInputChange('specialite', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.specialite ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionnez votre spécialité</option>
                  {specialites.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                {formData.specialite === 'Autre' && (
                  <input
                    type="text"
                    value={customSpecialite}
                    onChange={(e) => setCustomSpecialite(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Précisez votre spécialité"
                  />
                )}
                {errors.specialite && <p className="text-red-500 text-sm mt-1">{errors.specialite}</p>}
              </div>

              {/* Structure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="inline w-4 h-4 mr-2" />
                  Structure (Hôpital/Clinique) *
                </label>
                <input
                  type="text"
                  value={formData.structure}
                  onChange={(e) => handleInputChange('structure', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.structure ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nom de votre établissement"
                />
                {errors.structure && <p className="text-red-500 text-sm mt-1">{errors.structure}</p>}
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.telephone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0X XX XX XX XX"
                />
                {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email (facultatif)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="votre.email@exemple.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Consentement */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.consentement}
                    onChange={(e) => handleInputChange('consentement', e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-700">
                    J'accepte que mes informations soient collectées par Celluloplast dans le cadre de ce quiz. 
                    Ces données seront conservées pendant 12 mois et utilisées uniquement à des fins statistiques. 
                    Vous pouvez demander leur suppression à tout moment. *
                  </span>
                </label>
                {errors.consentement && <p className="text-red-500 text-sm mt-1">{errors.consentement}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Commencer le Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;