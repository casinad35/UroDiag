import React from 'react';
import { Trophy, Download, RotateCcw, Share, CheckCircle, XCircle, Clock } from 'lucide-react';
import { QuizResult } from '../types';
import { questions } from '../data/questions';

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, onRestart }) => {
  const scorePercentage = Math.round((result.score / result.totalQuestions) * 10000) / 100;
  const totalTimeMinutes = Math.round(result.totalTime / 60 * 100) / 100;
  const passThreshold = 70; // Score minimum pour obtenir le certificat

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownloadCertificate = () => {
    // Génération du certificat PDF
    alert('Fonctionnalité de téléchargement du certificat à implémenter');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Quiz Celluloplast - Résultats',
        text: `J'ai obtenu ${scorePercentage}% au Quiz Celluloplast !`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`J'ai obtenu ${scorePercentage}% au Quiz Celluloplast !`);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'text-green-600';
    if (scorePercentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = () => {
    if (scorePercentage >= 80) return 'bg-green-100';
    if (scorePercentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4">
              <Trophy className={`w-12 h-12 ${getScoreColor()}`} />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Quiz Terminé !</h1>
            <p className="text-gray-600">
              Félicitations {result.participant.prenom} {result.participant.nom}
            </p>
          </div>

          {/* Score Summary */}
          <div className={`${getScoreBg()} rounded-2xl p-8 mb-8 text-center shadow-xl`}>
            <div className={`text-6xl font-bold ${getScoreColor()} mb-4`}>
              {scorePercentage}%
            </div>
            <div className="text-xl text-gray-700 mb-6">
              {result.score} bonnes réponses sur {result.totalQuestions} questions
            </div>
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <Clock className="w-5 h-5 mr-2" />
              Temps total: {totalTimeMinutes} minutes
            </div>

            {scorePercentage >= passThreshold ? (
              <div className="bg-green-600 text-white px-6 py-3 rounded-lg inline-block mb-6">
                🎉 Vous avez réussi le quiz ! Certificat disponible
              </div>
            ) : (
              <div className="bg-orange-500 text-white px-6 py-3 rounded-lg inline-block mb-6">
                Score insuffisant pour le certificat (minimum {passThreshold}%)
              </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
              {scorePercentage >= passThreshold && (
                <button
                  onClick={handleDownloadCertificate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger le Certificat
                </button>
              )}
              
              <button
                onClick={handleShare}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
              >
                <Share className="w-5 h-5 mr-2" />
                Partager
              </button>
              
              <button
                onClick={onRestart}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Recommencer
              </button>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Détail des Réponses</h2>
            
            <div className="space-y-6">
              {questions.map((question, index) => {
                const response = result.responses.find(r => r.questionId === question.id);
                if (!response) return null;

                return (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Question {index + 1}: {question.question}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Section: {question.section}
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        {response.correct ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                        <span className="ml-2 text-sm text-gray-500">
                          {formatTime(response.timeSpent)}
                          {response.timeExpired && ' (Temps expiré)'}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Votre réponse:</p>
                        {response.selectedAnswers.length > 0 ? (
                          <div className="space-y-1">
                            {response.selectedAnswers.map(answerIndex => (
                              <p key={answerIndex} className={`text-sm px-3 py-1 rounded ${
                                response.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {String.fromCharCode(65 + answerIndex)}. {question.options[answerIndex]}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">Pas de réponse (temps expiré)</p>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Bonne(s) réponse(s):</p>
                        <div className="space-y-1">
                          {question.correctAnswers.map(answerIndex => (
                            <p key={answerIndex} className="text-sm px-3 py-1 rounded bg-green-100 text-green-800">
                              {String.fromCharCode(65 + answerIndex)}. {question.options[answerIndex]}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-2 italic">
                          {question.explication}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-600">
            <p>© 2025 Celluloplast - Merci de votre participation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;