import React, { useState, useEffect } from 'react';
import { PatientData, SYMPTOMES, ANTECEDENTS, TRAITEMENTS, TEMPLATES_EXAMENS, validerDonneesUrodynamiques, validerCoherenceTemplateSexe, nettoyerAvertissementsTemplate } from '../data/urodynamicData';
import { User, Activity, BarChart3, Target, Zap, TestTube, RotateCcw, FileText, AlertTriangle, Info } from 'lucide-react';

interface ExamFormProps {
  onAnalyze: (data: PatientData) => void;
}

export default function ExamForm({ onAnalyze }: ExamFormProps) {
  const [activeSection, setActiveSection] = useState('patient');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [previousTemplate, setPreviousTemplate] = useState('');
  const [formData, setFormData] = useState<PatientData>({
    nomPatient: '',
    age: 50,
    sexe: 'M',
    symptomes: [],
    antecedents: [],
    traitements: [],
    debitMetrie: {
      qMax: 15,
      qMoyen: 10,
      volumeVide: 300,
      tempsVidange: 30,
      formeDebitmetrie: 'normale',
      tempsLatence: 5,
      tempsJusquQmax: 10
    },
    cystometrie: {
      capaciteVesicale: 400,
      pressionDetrusor: 30,
      pressionAbdominale: 15,
      pressionVesicale: 45,
      compliance: 20,
      contractionsInvolontaires: 'absentes',
      sensibilite: 'normale',
      premierBesoin: 150,
      besoinNormal: 250,
      capaciteMaximale: 400,
      vitesseRemplissage: 50,
      pressionFuite: 0
    },
    profilPression: {
      pressionUretrale: 60,
      longueurUretrale: 200, // Valeur par défaut pour homme
      pressionClotureUretrale: 45,
      longueurFonctionnelle: 25,
      pressionTransmission: 80,
      profilDynamique: 'normal'
    },
    emg: {
      activiteBasale: 'normale',
      recrutementVolontaire: 'normal',
      reflexeSphincter: 'present',
      synergieDetrusorSphincter: 'normale',
      fatigabilite: 'normale'
    },
    etudePressionDebit: {
      pressionDetrusorQmax: 25,
      indexObstruction: 0,
      indexContractilite: 100,
      resistanceUretrale: 1.0,
      conductanceUretrale: 15
    },
    testsProvocation: {
      testToux: 'negatif',
      testValsalva: 'negatif',
      testStressUretral: 0,
      pressionFuiteAbdominale: 0
    },
    cystometrieRemplissage: {
      vitesseLente: {
        compliance: 22,
        contractions: 'absentes',
        sensibilite: 'normale'
      },
      vitesseRapide: {
        compliance: 18,
        contractions: 'absentes',
        sensibilite: 'normale'
      },
      vitessePhysiologique: {
        compliance: 20,
        contractions: 'absentes',
        sensibilite: 'normale'
      }
    },
    residuPostMictionnel: 30
  });

  const [validation, setValidation] = useState(validerDonneesUrodynamiques(formData));

  const sections = [
    { id: 'patient', label: 'Patient', icon: User },
    { id: 'debitmetrie', label: 'Débitmétrie', icon: BarChart3 },
    { id: 'cystometrie', label: 'Cystométrie', icon: Activity },
    { id: 'profil', label: 'Profil Urétral', icon: Target },
    { id: 'emg', label: 'EMG', icon: Zap },
    { id: 'tests', label: 'Tests Complémentaires', icon: TestTube }
  ];

  const handleTemplateChange = (templateId: string) => {
    setPreviousTemplate(selectedTemplate);
    setSelectedTemplate(templateId);
    
    if (templateId && TEMPLATES_EXAMENS[templateId as keyof typeof TEMPLATES_EXAMENS]) {
      const template = TEMPLATES_EXAMENS[templateId as keyof typeof TEMPLATES_EXAMENS];
      const updatedData = { ...formData, ...template.defaultValues };
      setFormData(updatedData);
      
      // Validation avec nettoyage des avertissements de l'ancien template
      let newValidation = validerDonneesUrodynamiques(updatedData);
      
      // Nettoyer les avertissements liés à l'ancien template
      if (previousTemplate === 'dyssynergie_vesico_sphincterienne') {
        newValidation.avertissements = nettoyerAvertissementsTemplate(newValidation.avertissements);
      }
      
      setValidation(newValidation);
    }
  };

  const updateFormData = (newData: Partial<PatientData>) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    
    // Validation standard
    let newValidation = validerDonneesUrodynamiques(updatedData);
    
    // Validation cohérence template-sexe
    const templateError = validerCoherenceTemplateSexe(selectedTemplate, updatedData.sexe);
    
    // Ajouter l'erreur template-sexe aux erreurs de validation si elle existe
    if (templateError) {
      newValidation.erreurs.push(templateError);
      newValidation.coherence = false;
    }
    
    // Nettoyer les avertissements de dyssynergie si on change de template
    if (previousTemplate === 'dyssynergie_vesico_sphincterienne' && selectedTemplate !== 'dyssynergie_vesico_sphincterienne') {
      newValidation.avertissements = nettoyerAvertissementsTemplate(newValidation.avertissements);
    }
    
    setValidation(newValidation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation finale incluant template-sexe
    let finalValidation = validerDonneesUrodynamiques(formData);
    const templateError = validerCoherenceTemplateSexe(selectedTemplate, formData.sexe);
    
    if (templateError) {
      finalValidation.erreurs.push(templateError);
      finalValidation.coherence = false;
    }
    
    // Vérifier qu'il n'y a pas d'erreurs critiques
    if (finalValidation.erreurs.length === 0) {
      onAnalyze(formData);
    } else {
      // Mettre à jour la validation pour afficher les erreurs
      setValidation(finalValidation);
      // Optionnel : faire défiler vers le haut pour voir les erreurs
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setSelectedTemplate('');
    setPreviousTemplate('');
    const defaultData: PatientData = {
      nomPatient: '',
      age: 50,
      sexe: 'M',
      symptomes: [],
      antecedents: [],
      traitements: [],
      debitMetrie: {
        qMax: 15,
        qMoyen: 10,
        volumeVide: 300,
        tempsVidange: 30,
        formeDebitmetrie: 'normale',
        tempsLatence: 5,
        tempsJusquQmax: 10
      },
      cystometrie: {
        capaciteVesicale: 400,
        pressionDetrusor: 30,
        pressionAbdominale: 15,
        pressionVesicale: 45,
        compliance: 20,
        contractionsInvolontaires: 'absentes',
        sensibilite: 'normale',
        premierBesoin: 150,
        besoinNormal: 250,
        capaciteMaximale: 400,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 60,
        longueurUretrale: 200, // Valeur par défaut pour homme
        pressionClotureUretrale: 45,
        longueurFonctionnelle: 25,
        pressionTransmission: 80,
        profilDynamique: 'normal'
      },
      emg: {
        activiteBasale: 'normale',
        recrutementVolontaire: 'normal',
        reflexeSphincter: 'present',
        synergieDetrusorSphincter: 'normale',
        fatigabilite: 'normale'
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 25,
        indexObstruction: 0,
        indexContractilite: 100,
        resistanceUretrale: 1.0,
        conductanceUretrale: 15
      },
      testsProvocation: {
        testToux: 'negatif',
        testValsalva: 'negatif',
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 22,
          contractions: 'absentes',
          sensibilite: 'normale'
        },
        vitesseRapide: {
          compliance: 18,
          contractions: 'absentes',
          sensibilite: 'normale'
        },
        vitessePhysiologique: {
          compliance: 20,
          contractions: 'absentes',
          sensibilite: 'normale'
        }
      },
      residuPostMictionnel: 30
    };
    setFormData(defaultData);
    setValidation(validerDonneesUrodynamiques(defaultData));
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  // Tooltips informatifs pour les paramètres
  const getParameterTooltip = (parameter: string): string => {
    const tooltips: Record<string, string> = {
      'qMax': 'Débit urinaire maximum atteint pendant la miction. Valeurs normales: >15 ml/s. Un Qmax <10 ml/s évoque une obstruction ou une hypocontractilité.',
      'qMoyen': 'Débit urinaire moyen calculé sur l\'ensemble de la miction. Généralement 50-70% du Qmax.',
      'volumeVide': 'Volume total d\'urine évacué pendant la miction. Volume >150ml nécessaire pour une interprétation fiable du Qmax.',
      'tempsVidange': 'Durée totale de la miction. Temps prolongé peut indiquer obstruction ou hypocontractilité.',
      'tempsLatence': 'Délai entre le début de l\'enregistrement et le début effectif de la miction. Valeurs normales: <10 secondes.',
      'formeDebitmetrie': 'Aspect morphologique de la courbe débit/temps. Normale: en cloche, Plateau: obstruction, Intermittente: dyssynergie.',
      'capaciteVesicale': 'Volume vésical au moment où le patient ressent un besoin impérieux. Valeurs normales: 300-600 ml.',
      'pressionDetrusor': 'Pression générée par la contraction du muscle détrusor. Au repos: <15 cmH2O, À la miction: 20-40 cmH2O.',
      'compliance': 'Capacité de la vessie à se distendre. Valeurs normales: >20 ml/cmH2O. Une compliance réduite évoque une fibrose vésicale.',
      'premierBesoin': 'Volume vésical auquel le patient ressent la première sensation de besoin. Valeurs normales: 100-200 ml.',
      'besoinNormal': 'Volume vésical auquel le patient ressent un besoin normal d\'uriner. Valeurs normales: 200-400 ml.',
      'contractionsInvolontaires': 'Contractions spontanées du détrusor pendant le remplissage. Absentes: vessie stable, Présentes: hyperactivité détrusorienne.',
      'pressionUretrale': 'Pression la plus élevée mesurée le long de l\'urètre. Homme: 60-120 cmH2O, Femme: 40-100 cmH2O.',
      'pressionClotureUretrale': 'Différence entre pression urétrale max et pression vésicale. Homme: 40-80 cmH2O, Femme: 20-60 cmH2O.',
      'longueurUretrale': 'Longueur totale de l\'urètre. Homme: 18-24 cm, Femme: 3-5 cm.',
      'activiteBasale': 'Activité électromyographique du sphincter au repos. Normale: tonus présent, Absente: dénervation.',
      'synergieDetrusorSphincter': 'Coordination entre détrusor et sphincter. Normale: relaxation sphinctérienne pendant miction, Dyssynergie: contraction paradoxale.',
      'testToux': 'Test évaluant l\'incontinence d\'effort par manœuvres de toux. Positif: fuite observée, évoque insuffisance sphinctérienne.',
      'pressionDetrusorQmax': 'Pression détrusorienne au moment du débit maximum. Valeurs normales: <40 cmH2O. Une pression élevée évoque une obstruction.',
      'pressionFuiteAbdominale': 'Pression abdominale minimale provoquant une fuite urinaire. >60 cmH2O indique mécanisme sphinctérien préservé.',
      'residuPostMictionnel': 'Volume d\'urine restant après miction complète. Valeurs normales: <50 ml. Un RPM élevé évoque une vidange incomplète.'
    };
    return tooltips[parameter] || '';
  };

  const renderParameterWithTooltip = (label: string, parameter: string, children: React.ReactNode, position: 'left' | 'center' | 'right' = 'left') => (
    <div className="relative">
      <div className="flex items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {getParameterTooltip(parameter) && (
          <div className="ml-2 relative group">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className={`absolute top-full mt-2 w-64 p-2 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none ${
              position === 'right' ? 'right-0' : position === 'center' ? 'left-1/2 transform -translate-x-1/2' : 'left-0'
            }`}>
              {getParameterTooltip(parameter)}
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );

  const renderValidationStatus = () => {
    // Ne rien afficher si tout va bien
    if (validation.erreurs.length === 0 && validation.avertissements.length === 0) {
      return null;
    }

    return (
      <div className="space-y-4 mb-6">
        {/* Erreurs critiques */}
        {validation.erreurs.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Erreurs critiques</h3>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {validation.erreurs.map((erreur, index) => (
                    <li key={index}>{erreur}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Avertissements */}
        {validation.avertissements.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Incohérences détectées</h3>
                <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                  {validation.avertissements.map((avertissement, index) => (
                    <li key={index}>{avertissement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Déterminer si le bouton doit être désactivé
  const isAnalyzeButtonDisabled = validation.erreurs.length > 0;

  const renderPatientSection = () => (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-3">Templates Pré-définis</h4>
        <select
          value={selectedTemplate}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sélectionner un template...</option>
          {Object.entries(TEMPLATES_EXAMENS).map(([key, template]) => (
            <option key={key} value={key}>{template.nom}</option>
          ))}
        </select>
        {selectedTemplate && (
          <p className="text-sm text-blue-700 mt-2">
            {TEMPLATES_EXAMENS[selectedTemplate as keyof typeof TEMPLATES_EXAMENS].description}
          </p>
        )}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du patient</label>
          <input
            type="text"
            value={formData.nomPatient || ''}
            onChange={(e) => updateFormData({ nomPatient: e.target.value })}
            placeholder="Nom du patient"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Âge</label>
          <input
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={(e) => updateFormData({ age: parseInt(e.target.value) || 0 })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sexe</label>
          <select
            value={formData.sexe}
            onChange={(e) => updateFormData({ sexe: e.target.value as 'M' | 'F' })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>
        <div>
          {renderParameterWithTooltip('RPM (ml)', 'residuPostMictionnel',
            <input
              type="number"
              min="0"
              value={formData.residuPostMictionnel}
              onChange={(e) => updateFormData({ residuPostMictionnel: parseInt(e.target.value) || 0 })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'right'
          )}
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Symptômes</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SYMPTOMES.map(symptome => (
            <label key={symptome} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={formData.symptomes.includes(symptome)}
                onChange={() => toggleArrayItem(
                  formData.symptomes,
                  symptome,
                  (newSymptomes) => updateFormData({ symptomes: newSymptomes })
                )}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{symptome}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Antecedents */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Antécédents</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {ANTECEDENTS.map(antecedent => (
            <label key={antecedent} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={formData.antecedents.includes(antecedent)}
                onChange={() => toggleArrayItem(
                  formData.antecedents,
                  antecedent,
                  (newAntecedents) => updateFormData({ antecedents: newAntecedents })
                )}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{antecedent}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Treatments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Traitements en cours</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {TRAITEMENTS.map(traitement => (
            <label key={traitement} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={formData.traitements.includes(traitement)}
                onChange={() => toggleArrayItem(
                  formData.traitements,
                  traitement,
                  (newTraitements) => updateFormData({ traitements: newTraitements })
                )}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{traitement}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDebitmetrieSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          {renderParameterWithTooltip('Qmax (ml/s)', 'qMax',
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.debitMetrie.qMax}
              onChange={(e) => updateFormData({
                debitMetrie: { ...formData.debitMetrie, qMax: parseFloat(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Q moyen (ml/s)', 'qMoyen',
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.debitMetrie.qMoyen}
              onChange={(e) => updateFormData({
                debitMetrie: { ...formData.debitMetrie, qMoyen: parseFloat(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'center'
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Volume vidé (ml)', 'volumeVide',
            <input
              type="number"
              min="0"
              value={formData.debitMetrie.volumeVide}
              onChange={(e) => updateFormData({
                debitMetrie: { ...formData.debitMetrie, volumeVide: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'right'
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Temps vidange (s)', 'tempsVidange',
            <input
              type="number"
              min="0"
              value={formData.debitMetrie.tempsVidange}
              onChange={(e) => updateFormData({
                debitMetrie: { ...formData.debitMetrie, tempsVidange: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Temps latence (s)', 'tempsLatence',
            <input
              type="number"
              min="0"
              value={formData.debitMetrie.tempsLatence}
              onChange={(e) => updateFormData({
                debitMetrie: { ...formData.debitMetrie, tempsLatence: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'center'
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Forme débitmétrie', 'formeDebitmetrie',
            <select
              value={formData.debitMetrie.formeDebitmetrie}
              onChange={(e) => updateFormData({
                debitMetrie: { ...formData.debitMetrie, formeDebitmetrie: e.target.value as any }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="normale">Normale</option>
              <option value="en_plateau">En plateau</option>
              <option value="intermittente">Intermittente</option>
              <option value="en_cloche">En cloche</option>
            </select>, 'right'
          )}
        </div>
      </div>
    </div>
  );

  const renderCystometrieSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          {renderParameterWithTooltip('Capacité vésicale (ml)', 'capaciteVesicale',
            <input
              type="number"
              min="0"
              value={formData.cystometrie.capaciteVesicale}
              onChange={(e) => updateFormData({
                cystometrie: { ...formData.cystometrie, capaciteVesicale: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Pression détrusor (cmH2O)', 'pressionDetrusor',
            <input
              type="number"
              min="0"
              value={formData.cystometrie.pressionDetrusor}
              onChange={(e) => updateFormData({
                cystometrie: { ...formData.cystometrie, pressionDetrusor: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'center'
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Compliance (ml/cmH2O)', 'compliance',
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.cystometrie.compliance}
              onChange={(e) => updateFormData({
                cystometrie: { ...formData.cystometrie, compliance: parseFloat(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'right'
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Premier besoin (ml)', 'premierBesoin',
            <input
              type="number"
              min="0"
              value={formData.cystometrie.premierBesoin}
              onChange={(e) => updateFormData({
                cystometrie: { ...formData.cystometrie, premierBesoin: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Besoin normal (ml)', 'besoinNormal',
            <input
              type="number"
              min="0"
              value={formData.cystometrie.besoinNormal}
              onChange={(e) => updateFormData({
                cystometrie: { ...formData.cystometrie, besoinNormal: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'center'
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Contractions Involontaires', 'contractionsInvolontaires',
            <select
              value={formData.cystometrie.contractionsInvolontaires}
              onChange={(e) => updateFormData({
                cystometrie: { ...formData.cystometrie, contractionsInvolontaires: e.target.value as any }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="absentes">Absentes</option>
              <option value="presentes">Présentes</option>
            </select>, 'right'
          )}
        </div>
      </div>
    </div>
  );

  const renderProfilSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          {renderParameterWithTooltip('Pression urétrale (cmH2O)', 'pressionUretrale',
            <input
              type="number"
              min="0"
              value={formData.profilPression.pressionUretrale}
              onChange={(e) => updateFormData({
                profilPression: { ...formData.profilPression, pressionUretrale: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Pression clôture (cmH2O)', 'pressionClotureUretrale',
            <input
              type="number"
              min="0"
              value={formData.profilPression.pressionClotureUretrale}
              onChange={(e) => updateFormData({
                profilPression: { ...formData.profilPression, pressionClotureUretrale: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'center'
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Longueur urétrale (mm)', 'longueurUretrale',
            <input
              type="number"
              min="0"
              value={formData.profilPression.longueurUretrale}
              onChange={(e) => updateFormData({
                profilPression: { ...formData.profilPression, longueurUretrale: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'right'
          )}
        </div>
      </div>
    </div>
  );

  const renderEMGSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {renderParameterWithTooltip('Activité basale', 'activiteBasale',
            <select
              value={formData.emg.activiteBasale}
              onChange={(e) => updateFormData({
                emg: { ...formData.emg, activiteBasale: e.target.value as any }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="normale">Normale</option>
              <option value="augmentee">Augmentée</option>
              <option value="diminuee">Diminuée</option>
              <option value="absente">Absente</option>
            </select>
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Synergie détrusor-sphincter', 'synergieDetrusorSphincter',
            <select
              value={formData.emg.synergieDetrusorSphincter}
              onChange={(e) => updateFormData({
                emg: { ...formData.emg, synergieDetrusorSphincter: e.target.value as any }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="normale">Normale</option>
              <option value="dyssynergie">Dyssynergie</option>
              <option value="pseudodyssynergie">Pseudo-dyssynergie</option>
            </select>, 'right'
          )}
        </div>
      </div>
    </div>
  );

  const renderTestsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          {renderParameterWithTooltip('Test à la toux', 'testToux',
            <select
              value={formData.testsProvocation.testToux}
              onChange={(e) => updateFormData({
                testsProvocation: { ...formData.testsProvocation, testToux: e.target.value as any }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="negatif">Négatif</option>
              <option value="positif_faible">Positif faible</option>
              <option value="positif_fort">Positif fort</option>
            </select>
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Pression détrusor Qmax (cmH2O)', 'pressionDetrusorQmax',
            <input
              type="number"
              min="0"
              value={formData.etudePressionDebit.pressionDetrusorQmax}
              onChange={(e) => updateFormData({
                etudePressionDebit: { ...formData.etudePressionDebit, pressionDetrusorQmax: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'center'
          )}
        </div>
        <div>
          {renderParameterWithTooltip('Pression fuite abdominale (cmH2O)', 'pressionFuiteAbdominale',
            <input
              type="number"
              min="0"
              value={formData.testsProvocation.pressionFuiteAbdominale}
              onChange={(e) => updateFormData({
                testsProvocation: { ...formData.testsProvocation, pressionFuiteAbdominale: parseInt(e.target.value) || 0 }
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />, 'right'
          )}
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'patient': return renderPatientSection();
      case 'debitmetrie': return renderDebitmetrieSection();
      case 'cystometrie': return renderCystometrieSection();
      case 'profil': return renderProfilSection();
      case 'emg': return renderEMGSection();
      case 'tests': return renderTestsSection();
      default: return renderPatientSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Nouvel Examen Urodynamique</h1>
            <p className="text-blue-100 mt-1">Saisissez les paramètres de l'examen pour obtenir une analyse diagnostique</p>
          </div>
        </div>

        {/* Validation Status */}
        {renderValidationStatus()}

        <form onSubmit={handleSubmit}>
          {/* Navigation Sections */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeSection === section.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Section Content */}
            <div className="p-6">
              {renderSection()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </button>

            <button
              type="submit"
              disabled={isAnalyzeButtonDisabled}
              className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 shadow-lg ${
                isAnalyzeButtonDisabled
                  ? 'bg-gray-400 cursor-not-allowed opacity-50 shadow-none'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              {isAnalyzeButtonDisabled ? 'Corriger les erreurs' : 'Analyser l\'Examen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}