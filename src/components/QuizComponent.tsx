import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Question, QuizResponse, Participant } from '../types';
import { questions } from '../data/questions';

interface QuizComponentProps {
  participant: Participant;
  onComplete: (responses: QuizResponse[], totalTime: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ participant, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [totalTime, setTotalTime] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleTimeUp = () => {
    if (showFeedback) return;
    
    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const response: QuizResponse = {
      questionId: currentQuestion.id,
      selectedAnswers: [],
      correct: false,
      timeSpent,
      timeExpired: true
    };

    setResponses(prev => [...prev, response]);
    setIsCorrect(false);
    setShowFeedback(true);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (showFeedback) return;

    if (currentQuestion.multipleChoice) {
      setSelectedAnswers(prev => 
        prev.includes(optionIndex) 
          ? prev.filter(i => i !== optionIndex)
          : [...prev, optionIndex]
      );
    } else {
      setSelectedAnswers([optionIndex]);
    }
  };

  const handleSubmitAnswer = () => {
    if (showFeedback) return;

    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const correct = currentQuestion.correctAnswers.length === selectedAnswers.length &&
                   currentQuestion.correctAnswers.every(answer => selectedAnswers.includes(answer));

    const response: QuizResponse = {
      questionId: currentQuestion.id,
      selectedAnswers: [...selectedAnswers],
      correct,
      timeSpent,
      timeExpired: false
    };

    setResponses(prev => [...prev, response]);
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setTimeLeft(60);
      setShowFeedback(false);
    } else {
      const finalTotalTime = (Date.now() - startTime) / 1000;
      setTotalTime(finalTotalTime);
      onComplete(responses, finalTotalTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft > 30) return 'text-green-600';
    if (timeLeft > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-blue-900">Quiz Celluloplast</h1>
              <div className={`flex items-center ${getTimeColor()} font-bold text-lg`}>
                <Clock className="w-5 h-5 mr-2" />
                {formatTime(timeLeft)}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Section: <span className="font-semibold text-blue-800">{currentQuestion.section}</span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>

            {currentQuestion.multipleChoice && (
              <p className="text-sm text-blue-600 mb-4 font-medium">
                Plusieurs réponses possibles
              </p>
            )}

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers.includes(index);
                const isCorrect = currentQuestion.correctAnswers.includes(index);
                
                let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:shadow-md ";
                
                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-50 text-green-800";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-50 text-red-800";
                  } else {
                    buttonClass += "border-gray-300 bg-gray-50 text-gray-600";
                  }
                } else {
                  buttonClass += isSelected 
                    ? "border-blue-500 bg-blue-50 text-blue-800" 
                    : "border-gray-300 hover:border-blue-300";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showFeedback}
                  >
                    <div className="flex items-start">
                      <span className="font-semibold mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="flex-1">{option}</span>
                      {showFeedback && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 ml-2" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mr-2" />
                  )}
                  <span className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct !' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Réponse correcte :</strong> {
                    currentQuestion.correctAnswers.map(i => 
                      `${String.fromCharCode(65 + i)}. ${currentQuestion.options[i]}`
                    ).join(', ')
                  }
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Explication :</strong> {currentQuestion.explication}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">
                Participant: {participant.prenom} {participant.nom}
              </div>
              
              {!showFeedback ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswers.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  Valider
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold inline-flex items-center"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Suivant' : 'Terminer'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;