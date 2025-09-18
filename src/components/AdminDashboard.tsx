import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Download, 
  Filter, 
  Search, 
  Calendar,
  Award,
  Clock,
  Mail,
  Phone,
  Building,
  Stethoscope,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { Participant, QuizResult } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

// Mock data pour la démonstration
const mockParticipants: (Participant & { score: number; duree: number; createdAt: string })[] = [
  {
    id: '1',
    nom: 'Martin',
    prenom: 'Jean',
    specialite: 'Cardiologie',
    structure: 'CHU Toulouse',
    telephone: '0567891234',
    email: 'j.martin@chu-toulouse.fr',
    consentement: true,
    createdAt: '2025-01-15T10:30:00Z',
    score: 85,
    duree: 18.5
  },
  {
    id: '2',
    nom: 'Dubois',
    prenom: 'Marie',
    specialite: 'Rhumatologie',
    structure: 'Clinique Saint-Joseph',
    telephone: '0512345678',
    email: 'marie.dubois@clinique-sj.fr',
    consentement: true,
    createdAt: '2025-01-15T14:20:00Z',
    score: 92,
    duree: 16.2
  },
  {
    id: '3',
    nom: 'Leroy',
    prenom: 'Pierre',
    specialite: 'Orthopédie',
    structure: 'Hôpital Privé de la Loire',
    telephone: '0645789123',
    consentement: true,
    createdAt: '2025-01-16T09:15:00Z',
    score: 67,
    duree: 22.8
  }
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [participants, setParticipants] = useState(mockParticipants);
  const [filteredParticipants, setFilteredParticipants] = useState(mockParticipants);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialite, setFilterSpecialite] = useState('');
  const [filterScore, setFilterScore] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);

  const specialites = [...new Set(participants.map(p => p.specialite))];

  useEffect(() => {
    let filtered = participants;

    if (searchTerm) {
      filtered = filtered.filter(p => 
        `${p.prenom} ${p.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.structure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialite.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSpecialite) {
      filtered = filtered.filter(p => p.specialite === filterSpecialite);
    }

    if (filterScore) {
      const [operator, value] = filterScore.split(' ');
      const scoreValue = parseInt(value);
      filtered = filtered.filter(p => {
        if (operator === '>=') return p.score >= scoreValue;
        if (operator === '<=') return p.score <= scoreValue;
        return true;
      });
    }

    setFilteredParticipants(filtered);
  }, [searchTerm, filterSpecialite, filterScore, participants]);

  const handleExportCSV = () => {
    const headers = ['Nom', 'Prénom', 'Spécialité', 'Structure', 'Téléphone', 'Email', 'Score (%)', 'Durée (min)', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredParticipants.map(p => [
        p.nom,
        p.prenom,
        p.specialite,
        p.structure,
        p.telephone,
        p.email || '',
        p.score,
        p.duree,
        new Date(p.createdAt).toLocaleDateString('fr-FR')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-celluloplast-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const averageScore = participants.length > 0 
    ? Math.round(participants.reduce((sum, p) => sum + p.score, 0) / participants.length)
    : 0;

  const averageDuration = participants.length > 0
    ? Math.round((participants.reduce((sum, p) => sum + p.duree, 0) / participants.length) * 10) / 10
    : 0;

  const passedCount = participants.filter(p => p.score >= 70).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Admin</h1>
              <p className="text-gray-600">Quiz Celluloplast - Gestion des participants</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-2xl font-semibold text-gray-900">{participants.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Score Moyen</p>
                <p className="text-2xl font-semibold text-gray-900">{averageScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Durée Moyenne</p>
                <p className="text-2xl font-semibold text-gray-900">{averageDuration} min</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taux de Réussite</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {participants.length > 0 ? Math.round((passedCount / participants.length) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Search */}
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Specialty Filter */}
                <select
                  value={filterSpecialite}
                  onChange={(e) => setFilterSpecialite(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Toutes les spécialités</option>
                  {specialites.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>

                {/* Score Filter */}
                <select
                  value={filterScore}
                  onChange={(e) => setFilterScore(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tous les scores</option>
                  <option value=">= 80">≥ 80%</option>
                  <option value=">= 70">≥ 70%</option>
                  <option value="<= 70">≤ 70%</option>
                  <option value="<= 50">≤ 50%</option>
                </select>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCSV}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Exporter CSV
              </button>
            </div>
          </div>

          {/* Participants Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spécialité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Structure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {participant.prenom} {participant.nom}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Stethoscope className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{participant.specialite}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{participant.structure}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 text-gray-400 mr-1" />
                          {participant.telephone}
                        </div>
                        {participant.email && (
                          <div className="flex items-center">
                            <Mail className="w-3 h-3 text-gray-400 mr-1" />
                            {participant.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          participant.score >= 80 
                            ? 'bg-green-100 text-green-800' 
                            : participant.score >= 70
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {participant.score}%
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          ({participant.duree}min)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {new Date(participant.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedParticipant(participant.id!)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun participant trouvé avec les critères de recherche actuels.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;