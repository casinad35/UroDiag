import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ExamForm from './components/ExamForm';
import ResultsPage from './components/ResultsPage';
import ClinicalCases from './components/ClinicalCases';
import Glossary from './components/Glossary';
import { PatientData, DiagnosticResult, analyserUrodynamique } from './data/urodynamicData';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [currentResult, setCurrentResult] = useState<DiagnosticResult | null>(null);

  const handleAnalyze = (data: PatientData) => {
    const result = analyserUrodynamique(data);
    setCurrentResult(result);
    setActiveSection('resultats');
  };

  const handleAnalyzeCase = ({ result }: { result: DiagnosticResult }) => {
    setCurrentResult(result);
    setActiveSection('resultats');
  };

  const handleStartExam = () => {
    setActiveSection('examen');
  };

  const handleNewExam = () => {
    setCurrentResult(null);
    setActiveSection('examen');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'accueil':
        return <HomePage onStartExam={handleStartExam} />;
      case 'examen':
        return <ExamForm onAnalyze={handleAnalyze} />;
      case 'resultats':
        return <ResultsPage result={currentResult} onNewExam={handleNewExam} />;
      case 'cas-cliniques':
        return <ClinicalCases onAnalyzeCase={handleAnalyzeCase} />;
      case 'glossaire':
        return <Glossary />;
      default:
        return <HomePage onStartExam={handleStartExam} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderContent()}
    </div>
  );
}

export default App;