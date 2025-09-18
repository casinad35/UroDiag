// Types et interfaces pour les données urodynamiques
export interface PatientData {
  nomPatient: string;
  age: number;
  sexe: 'M' | 'F';
  symptomes: string[];
  antecedents: string[];
  traitements: string[];
  debitMetrie: DebitMetrie;
  cystometrie: Cystometrie;
  profilPression: ProfilPression;
  emg: EMG;
  etudePressionDebit: EtudePressionDebit;
  testsProvocation: TestsProvocation;
  cystometrieRemplissage: CystometrieRemplissage;
  residuPostMictionnel: number;
}

export interface DebitMetrie {
  qMax: number;
  qMoyen: number;
  volumeVide: number;
  tempsVidange: number;
  formeDebitmetrie: 'normale' | 'en_plateau' | 'intermittente' | 'en_cloche';
  tempsLatence: number;
  tempsJusquQmax?: number;
}

export interface Cystometrie {
  capaciteVesicale: number;
  pressionDetrusor: number;
  pressionAbdominale: number;
  pressionVesicale: number;
  compliance: number;
  contractionsInvolontaires: 'absentes' | 'presentes';
  sensibilite: 'normale' | 'augmentee' | 'diminuee' | 'absente' | 'hyperesthesie' | 'variable';
  premierBesoin: number;
  besoinNormal: number;
  capaciteMaximale: number;
  vitesseRemplissage: number;
  pressionFuite: number;
}

export interface ProfilPression {
  pressionUretrale: number;
  longueurUretrale: number;
  pressionClotureUretrale: number;
  longueurFonctionnelle: number;
  pressionTransmission: number;
  profilDynamique: 'normal' | 'augmente' | 'diminue' | 'deficient' | 'stenose' | 'fibrose' | 'variable';
}

export interface EMG {
  activiteBasale: 'normale' | 'augmentee' | 'diminuee' | 'absente' | 'variable';
  recrutementVolontaire: 'normal' | 'diminue' | 'absent' | 'variable';
  reflexeSphincter: 'present' | 'absent' | 'diminue' | 'variable';
  synergieDetrusorSphincter: 'normale' | 'dyssynergie' | 'pseudodyssynergie';
  fatigabilite: 'normale' | 'augmentee';
}

export interface EtudePressionDebit {
  pressionDetrusorQmax: number;
  indexObstruction: number;
  indexContractilite: number;
  resistanceUretrale: number;
  conductanceUretrale: number;
}

export interface TestsProvocation {
  testToux: 'negatif' | 'positif_faible' | 'positif_fort';
  testValsalva: 'negatif' | 'positif_faible' | 'positif_fort';
  testStressUretral: number;
  pressionFuiteAbdominale: number;
}

export interface CystometrieRemplissage {
  vitesseLente: {
    compliance: number;
    contractions: 'absentes' | 'presentes';
    sensibilite: 'normale' | 'augmentee' | 'diminuee' | 'absente' | 'hyperesthesie' | 'variable';
  };
  vitesseRapide: {
    compliance: number;
    contractions: 'absentes' | 'presentes';
    sensibilite: 'normale' | 'augmentee' | 'diminuee' | 'absente' | 'hyperesthesie' | 'variable';
  };
  vitessePhysiologique: {
    compliance: number;
    contractions: 'absentes' | 'presentes';
    sensibilite: 'normale' | 'augmentee' | 'diminuee' | 'absente' | 'hyperesthesie' | 'variable';
  };
}

export interface DiagnosticResult {
  diagnostic: string;
  certitudeDiagnostique?: 'Élevée' | 'Modérée' | 'Faible';
  recommandations: Array<{
    label: string;
    tooltip: string;
  }>;
  examensComplementaires: Array<{
    label: string;
    tooltip: string;
  }>;
  traitements: Array<{
    label: string;
    tooltip: string;
  }>;
  surveillance: Array<{
    label: string;
    tooltip: string;
  }>;
  pieges: Array<{
    label: string;
    tooltip: string;
  }>;
  alertesCritiques: string[];
  indexCalcules: Record<string, number>;
  nomogrammes: {
    schafer?: string;
    abramsGriffiths?: string;
  };
  patientData?: PatientData;
}

export interface ValidationResult {
  coherence: boolean;
  erreurs: string[];
  avertissements: string[];
}

export interface CasClinique {
  id: number;
  titre: string;
  description: string;
  donnee: PatientData;
}

export interface TemplateExamen {
  nom: string;
  description: string;
  defaultValues: Partial<PatientData>;
}