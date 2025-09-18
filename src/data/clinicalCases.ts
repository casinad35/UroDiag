// Cas cliniques séparés du fichier principal
import { PatientData } from './types';

export const CAS_CLINIQUES = [
  // CAS 1 - Hyperactivité Vésicale Idiopathique
  {
    id: 1,
    titre: 'Hyperactivité Vésicale Idiopathique',
    description: 'Femme de 65 ans avec urgenturies et pollakiurie',
    donnee: {
      nomPatient: 'Mme D',
      age: 65,
      sexe: 'F' as const,
      symptomes: ['Urgenturies', 'Pollakiurie', 'Nycturie'],
      antecedents: ['Ménopause'],
      traitements: ['Anticholinergiques'],
      debitMetrie: {
        qMax: 18,
        qMoyen: 12,
        volumeVide: 280,
        tempsVidange: 25,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 3,
        tempsJusquQmax: 8
      },
      cystometrie: {
        capaciteVesicale: 220,
        pressionDetrusor: 45,
        pressionAbdominale: 12,
        pressionVesicale: 57,
        compliance: 15,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 80,
        besoinNormal: 150,
        capaciteMaximale: 220,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 65,
        longueurUretrale: 35,
        pressionClotureUretrale: 35,
        longueurFonctionnelle: 28,
        pressionTransmission: 85,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 35,
        indexObstruction: -1,
        indexContractilite: 125,
        resistanceUretrale: 1.9,
        conductanceUretrale: 0.51
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 16,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitesseRapide: {
          compliance: 14,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitessePhysiologique: {
          compliance: 15,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        }
      },
      residuPostMictionnel: 15
    }
  },

  // CAS 2 - Obstruction Prostatique
  {
    id: 2,
    titre: 'Obstruction Prostatique',
    description: 'Homme de 72 ans avec dysurie et jet faible',
    donnee: {
      nomPatient: 'M. L',
      age: 72,
      sexe: 'M' as const,
      symptomes: ['Dysurie', 'Jet faible', 'Sensation de vidange incomplète', 'Nycturie'],
      antecedents: ['HBP'],
      traitements: ['Alpha-bloquants'],
      debitMetrie: {
        qMax: 8,
        qMoyen: 5,
        volumeVide: 320,
        tempsVidange: 65,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 8,
        tempsJusquQmax: 25
      },
      cystometrie: {
        capaciteVesicale: 480,
        pressionDetrusor: 25,
        pressionAbdominale: 18,
        pressionVesicale: 43,
        compliance: 25,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 180,
        besoinNormal: 320,
        capaciteMaximale: 480,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 95,
        longueurUretrale: 220,
        pressionClotureUretrale: 70,
        longueurFonctionnelle: 32,
        pressionTransmission: 90,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 65,
        indexObstruction: 49,
        indexContractilite: 105,
        resistanceUretrale: 8.1,
        conductanceUretrale: 0.12
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 26,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 24,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 25,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 85
    }
  },

  // CAS 3 - Incontinence d'Effort
  {
    id: 3,
    titre: 'Incontinence d\'Effort',
    description: 'Femme de 45 ans avec fuites à l\'effort',
    donnee: {
      nomPatient: 'Mme R',
      age: 45,
      sexe: 'F' as const,
      symptomes: ['Incontinence d\'effort', 'Fuites à la toux'],
      antecedents: ['Accouchements difficiles', 'Épisiotomie'],
      traitements: [],
      debitMetrie: {
        qMax: 22,
        qMoyen: 15,
        volumeVide: 350,
        tempsVidange: 24,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 2,
        tempsJusquQmax: 7
      },
      cystometrie: {
        capaciteVesicale: 420,
        pressionDetrusor: 28,
        pressionAbdominale: 15,
        pressionVesicale: 43,
        compliance: 22,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 150,
        besoinNormal: 280,
        capaciteMaximale: 420,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 45,
        longueurUretrale: 32,
        pressionClotureUretrale: 18,
        longueurFonctionnelle: 22,
        pressionTransmission: 65,
        profilDynamique: 'diminue' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'diminue' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 22,
        indexObstruction: -22,
        indexContractilite: 132,
        resistanceUretrale: 1.0,
        conductanceUretrale: 1.0
      },
      testsProvocation: {
        testToux: 'positif_fort' as const,
        testValsalva: 'positif_faible' as const,
        testStressUretral: 45,
        pressionFuiteAbdominale: 45
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 23,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 21,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 22,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 10
    }
  },

  // CAS 4 - Dyssynergie Vésico-Sphinctérienne
  {
    id: 4,
    titre: 'Dyssynergie Vésico-Sphinctérienne',
    description: 'Homme de 35 ans avec lésion médullaire',
    donnee: {
      nomPatient: 'M. T',
      age: 35,
      sexe: 'M' as const,
      symptomes: ['Dysurie', 'Sensation de vidange incomplète', 'Infections urinaires récidivantes'],
      antecedents: ['Traumatisme médullaire', 'Paraplégie'],
      traitements: ['Auto-sondages'],
      debitMetrie: {
        qMax: 6,
        qMoyen: 3,
        volumeVide: 150,
        tempsVidange: 55,
        formeDebitmetrie: 'intermittente' as const,
        tempsLatence: 15,
        tempsJusquQmax: 30
      },
      cystometrie: {
        capaciteVesicale: 280,
        pressionDetrusor: 55,
        pressionAbdominale: 20,
        pressionVesicale: 75,
        compliance: 12,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'diminuee' as const,
        premierBesoin: 200,
        besoinNormal: 250,
        capaciteMaximale: 280,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 110,
        longueurUretrale: 200,
        pressionClotureUretrale: 85,
        longueurFonctionnelle: 35,
        pressionTransmission: 95,
        profilDynamique: 'augmente' as const
      },
      emg: {
        activiteBasale: 'augmentee' as const,
        recrutementVolontaire: 'absent' as const,
        reflexeSphincter: 'absent' as const,
        synergieDetrusorSphincter: 'dyssynergie' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 85,
        indexObstruction: 73,
        indexContractilite: 115,
        resistanceUretrale: 14.2,
        conductanceUretrale: 0.07
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 14,
          contractions: 'presentes' as const,
          sensibilite: 'diminuee' as const
        },
        vitesseRapide: {
          compliance: 10,
          contractions: 'presentes' as const,
          sensibilite: 'diminuee' as const
        },
        vitessePhysiologique: {
          compliance: 12,
          contractions: 'presentes' as const,
          sensibilite: 'diminuee' as const
        }
      },
      residuPostMictionnel: 130
    }
  },

  // CAS 5 - Hypocontractilité Détrusorienne
  {
    id: 5,
    titre: 'Hypocontractilité Détrusorienne',
    description: 'Homme de 68 ans avec diabète et vidange incomplète',
    donnee: {
      nomPatient: 'M. B',
      age: 68,
      sexe: 'M' as const,
      symptomes: ['Sensation de vidange incomplète', 'Jet faible', 'Effort de poussée'],
      antecedents: ['Diabète type 2', 'Neuropathie diabétique'],
      traitements: ['Antidiabétiques'],
      debitMetrie: {
        qMax: 9,
        qMoyen: 6,
        volumeVide: 280,
        tempsVidange: 48,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 12,
        tempsJusquQmax: 20
      },
      cystometrie: {
        capaciteVesicale: 650,
        pressionDetrusor: 15,
        pressionAbdominale: 22,
        pressionVesicale: 37,
        compliance: 35,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'diminuee' as const,
        premierBesoin: 300,
        besoinNormal: 500,
        capaciteMaximale: 650,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 75,
        longueurUretrale: 210,
        pressionClotureUretrale: 55,
        longueurFonctionnelle: 28,
        pressionTransmission: 88,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'diminue' as const,
        reflexeSphincter: 'diminue' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 18,
        indexObstruction: 0,
        indexContractilite: 63,
        resistanceUretrale: 2.0,
        conductanceUretrale: 0.5
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 38,
          contractions: 'absentes' as const,
          sensibilite: 'diminuee' as const
        },
        vitesseRapide: {
          compliance: 32,
          contractions: 'absentes' as const,
          sensibilite: 'diminuee' as const
        },
        vitessePhysiologique: {
          compliance: 35,
          contractions: 'absentes' as const,
          sensibilite: 'diminuee' as const
        }
      },
      residuPostMictionnel: 180
    }
  },

  // CAS 6 - Incontinence Mixte Post-Ménopausique
  {
    id: 6,
    titre: 'Incontinence Mixte Post-Ménopausique',
    description: 'Femme de 58 ans avec incontinence d\'effort et d\'urgence',
    donnee: {
      nomPatient: 'Mme C',
      age: 58,
      sexe: 'F' as const,
      symptomes: ['Incontinence d\'effort', 'Urgenturies', 'Fuites mixtes', 'Nycturie'],
      antecedents: ['Ménopause', 'Hystérectomie', 'Prolapsus génital'],
      traitements: ['THS', 'Anticholinergiques'],
      debitMetrie: {
        qMax: 16,
        qMoyen: 11,
        volumeVide: 290,
        tempsVidange: 28,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 4,
        tempsJusquQmax: 9
      },
      cystometrie: {
        capaciteVesicale: 320,
        pressionDetrusor: 38,
        pressionAbdominale: 16,
        pressionVesicale: 54,
        compliance: 18,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 120,
        besoinNormal: 200,
        capaciteMaximale: 320,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 38,
        longueurUretrale: 28,
        pressionClotureUretrale: 15,
        longueurFonctionnelle: 18,
        pressionTransmission: 55,
        profilDynamique: 'diminue' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'diminue' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 28,
        indexObstruction: -4,
        indexContractilite: 108,
        resistanceUretrale: 1.75,
        conductanceUretrale: 0.57
      },
      testsProvocation: {
        testToux: 'positif_fort' as const,
        testValsalva: 'positif_faible' as const,
        testStressUretral: 35,
        pressionFuiteAbdominale: 35
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 19,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitesseRapide: {
          compliance: 17,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitessePhysiologique: {
          compliance: 18,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        }
      },
      residuPostMictionnel: 25
    }
  },

  // CAS 7 - Sténose Urétrale Post-Traumatique
  {
    id: 7,
    titre: 'Sténose Urétrale Post-Traumatique',
    description: 'Homme de 42 ans avec sténose urétrale après traumatisme',
    donnee: {
      nomPatient: 'M. F',
      age: 42,
      sexe: 'M' as const,
      symptomes: ['Dysurie sévère', 'Jet très faible', 'Douleurs mictionnelles'],
      antecedents: ['Traumatisme urétral', 'Urétrotomie'],
      traitements: [],
      debitMetrie: {
        qMax: 4,
        qMoyen: 2,
        volumeVide: 180,
        tempsVidange: 85,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 20,
        tempsJusquQmax: 40
      },
      cystometrie: {
        capaciteVesicale: 450,
        pressionDetrusor: 32,
        pressionAbdominale: 18,
        pressionVesicale: 50,
        compliance: 24,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 180,
        besoinNormal: 320,
        capaciteMaximale: 450,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 45,
        longueurUretrale: 180,
        pressionClotureUretrale: 25,
        longueurFonctionnelle: 15,
        pressionTransmission: 85,
        profilDynamique: 'stenose' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 95,
        indexObstruction: 87,
        indexContractilite: 115,
        resistanceUretrale: 23.8,
        conductanceUretrale: 0.04
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 25,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 23,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 24,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 120
    }
  },

  // CAS 8 - Vessie Neurologique (Sclérose en Plaques)
  {
    id: 8,
    titre: 'Vessie Neurologique - Sclérose en Plaques',
    description: 'Femme de 38 ans avec SEP et troubles vésico-sphinctériens',
    donnee: {
      nomPatient: 'Mme G',
      age: 38,
      sexe: 'F' as const,
      symptomes: ['Urgenturies', 'Incontinence par regorgement', 'Rétention urinaire'],
      antecedents: ['Sclérose en plaques', 'Poussées neurologiques'],
      traitements: ['Immunomodulateurs', 'Auto-sondages'],
      debitMetrie: {
        qMax: 7,
        qMoyen: 4,
        volumeVide: 200,
        tempsVidange: 50,
        formeDebitmetrie: 'intermittente' as const,
        tempsLatence: 18,
        tempsJusquQmax: 25
      },
      cystometrie: {
        capaciteVesicale: 380,
        pressionDetrusor: 48,
        pressionAbdominale: 20,
        pressionVesicale: 68,
        compliance: 16,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'variable' as const,
        premierBesoin: 150,
        besoinNormal: 250,
        capaciteMaximale: 380,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 85,
        longueurUretrale: 32,
        pressionClotureUretrale: 55,
        longueurFonctionnelle: 25,
        pressionTransmission: 75,
        profilDynamique: 'variable' as const
      },
      emg: {
        activiteBasale: 'variable' as const,
        recrutementVolontaire: 'variable' as const,
        reflexeSphincter: 'variable' as const,
        synergieDetrusorSphincter: 'dyssynergie' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 75,
        indexObstruction: 61,
        indexContractilite: 110,
        resistanceUretrale: 10.7,
        conductanceUretrale: 0.09
      },
      testsProvocation: {
        testToux: 'positif_faible' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 55,
        pressionFuiteAbdominale: 55
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 18,
          contractions: 'presentes' as const,
          sensibilite: 'variable' as const
        },
        vitesseRapide: {
          compliance: 14,
          contractions: 'presentes' as const,
          sensibilite: 'variable' as const
        },
        vitessePhysiologique: {
          compliance: 16,
          contractions: 'presentes' as const,
          sensibilite: 'variable' as const
        }
      },
      residuPostMictionnel: 160
    }
  },

  // CAS 9 - Incontinence Post-Prostatectomie
  {
    id: 9,
    titre: 'Incontinence Post-Prostatectomie',
    description: 'Homme de 66 ans avec incontinence après prostatectomie radicale',
    donnee: {
      nomPatient: 'M. H',
      age: 66,
      sexe: 'M' as const,
      symptomes: ['Incontinence d\'effort', 'Fuites permanentes', 'Absence de contrôle'],
      antecedents: ['Cancer prostate', 'Prostatectomie radicale'],
      traitements: ['Rééducation périnéale'],
      debitMetrie: {
        qMax: 25,
        qMoyen: 18,
        volumeVide: 320,
        tempsVidange: 18,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 1,
        tempsJusquQmax: 5
      },
      cystometrie: {
        capaciteVesicale: 420,
        pressionDetrusor: 30,
        pressionAbdominale: 15,
        pressionVesicale: 45,
        compliance: 22,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 160,
        besoinNormal: 280,
        capaciteMaximale: 420,
        vitesseRemplissage: 50,
        pressionFuite: 25
      },
      profilPression: {
        pressionUretrale: 25,
        longueurUretrale: 120,
        pressionClotureUretrale: 5,
        longueurFonctionnelle: 8,
        pressionTransmission: 30,
        profilDynamique: 'deficient' as const
      },
      emg: {
        activiteBasale: 'absente' as const,
        recrutementVolontaire: 'absent' as const,
        reflexeSphincter: 'absent' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 20,
        indexObstruction: -30,
        indexContractilite: 145,
        resistanceUretrale: 0.8,
        conductanceUretrale: 1.25
      },
      testsProvocation: {
        testToux: 'positif_fort' as const,
        testValsalva: 'positif_fort' as const,
        testStressUretral: 15,
        pressionFuiteAbdominale: 15
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 23,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 21,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 22,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 5
    }
  },

  // CAS 10 - Prolapsus Génital avec Troubles Mictionnels
  {
    id: 10,
    titre: 'Prolapsus Génital avec Troubles Mictionnels',
    description: 'Femme de 62 ans avec prolapsus et dysurie',
    donnee: {
      nomPatient: 'Mme I',
      age: 62,
      sexe: 'F' as const,
      symptomes: ['Dysurie', 'Sensation de vidange incomplète', 'Pesanteur pelvienne'],
      antecedents: ['Prolapsus génital', 'Accouchements multiples'],
      traitements: ['Pessaire'],
      debitMetrie: {
        qMax: 12,
        qMoyen: 8,
        volumeVide: 250,
        tempsVidange: 32,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 8,
        tempsJusquQmax: 15
      },
      cystometrie: {
        capaciteVesicale: 380,
        pressionDetrusor: 35,
        pressionAbdominale: 18,
        pressionVesicale: 53,
        compliance: 20,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 150,
        besoinNormal: 250,
        capaciteMaximale: 380,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 42,
        longueurUretrale: 25,
        pressionClotureUretrale: 22,
        longueurFonctionnelle: 18,
        pressionTransmission: 60,
        profilDynamique: 'diminue' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'diminue' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 42,
        indexObstruction: 18,
        indexContractilite: 102,
        resistanceUretrale: 3.5,
        conductanceUretrale: 0.29
      },
      testsProvocation: {
        testToux: 'positif_faible' as const,
        testValsalva: 'positif_faible' as const,
        testStressUretral: 50,
        pressionFuiteAbdominale: 50
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 21,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 19,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 20,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 45
    }
  },

  // CAS 11 - Vessie de Lutte (Obstruction Chronique)
  {
    id: 11,
    titre: 'Vessie de Lutte - Obstruction Chronique',
    description: 'Homme de 75 ans avec HBP évoluée et vessie de lutte',
    donnee: {
      nomPatient: 'M. J',
      age: 75,
      sexe: 'M' as const,
      symptomes: ['Dysurie majeure', 'Pollakiurie', 'Nycturie sévère', 'Infections récidivantes'],
      antecedents: ['HBP évoluée', 'Lithiase vésicale', 'Infections urinaires'],
      traitements: ['Alpha-bloquants', 'Inhibiteurs 5-alpha-réductase'],
      debitMetrie: {
        qMax: 5,
        qMoyen: 3,
        volumeVide: 180,
        tempsVidange: 75,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 25,
        tempsJusquQmax: 35
      },
      cystometrie: {
        capaciteVesicale: 650,
        pressionDetrusor: 18,
        pressionAbdominale: 25,
        pressionVesicale: 43,
        compliance: 8,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'diminuee' as const,
        premierBesoin: 400,
        besoinNormal: 550,
        capaciteMaximale: 650,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 120,
        longueurUretrale: 240,
        pressionClotureUretrale: 95,
        longueurFonctionnelle: 38,
        pressionTransmission: 92,
        profilDynamique: 'augmente' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 85,
        indexObstruction: 75,
        indexContractilite: 110,
        resistanceUretrale: 17.0,
        conductanceUretrale: 0.06
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 10,
          contractions: 'presentes' as const,
          sensibilite: 'diminuee' as const
        },
        vitesseRapide: {
          compliance: 6,
          contractions: 'presentes' as const,
          sensibilite: 'diminuee' as const
        },
        vitessePhysiologique: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'diminuee' as const
        }
      },
      residuPostMictionnel: 220
    }
  },

  // CAS 12 - Cystite Interstitielle/Syndrome Douloureux Vésical
  {
    id: 12,
    titre: 'Cystite Interstitielle/Syndrome Douloureux Vésical',
    description: 'Femme de 44 ans avec douleurs vésicales chroniques',
    donnee: {
      nomPatient: 'Mme K',
      age: 44,
      sexe: 'F' as const,
      symptomes: ['Douleurs vésicales', 'Pollakiurie sévère', 'Urgenturies douloureuses', 'Nycturie'],
      antecedents: ['Cystites récidivantes', 'Fibromyalgie'],
      traitements: ['Antalgiques', 'Instillations vésicales'],
      debitMetrie: {
        qMax: 20,
        qMoyen: 14,
        volumeVide: 180,
        tempsVidange: 15,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 2,
        tempsJusquQmax: 5
      },
      cystometrie: {
        capaciteVesicale: 180,
        pressionDetrusor: 25,
        pressionAbdominale: 12,
        pressionVesicale: 37,
        compliance: 12,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'hyperesthesie' as const,
        premierBesoin: 50,
        besoinNormal: 100,
        capaciteMaximale: 180,
        vitesseRemplissage: 30,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 55,
        longueurUretrale: 30,
        pressionClotureUretrale: 35,
        longueurFonctionnelle: 22,
        pressionTransmission: 85,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'augmentee' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 22,
        indexObstruction: -18,
        indexContractilite: 122,
        resistanceUretrale: 1.1,
        conductanceUretrale: 0.91
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 14,
          contractions: 'absentes' as const,
          sensibilite: 'hyperesthesie' as const
        },
        vitesseRapide: {
          compliance: 10,
          contractions: 'absentes' as const,
          sensibilite: 'hyperesthesie' as const
        },
        vitessePhysiologique: {
          compliance: 12,
          contractions: 'absentes' as const,
          sensibilite: 'hyperesthesie' as const
        }
      },
      residuPostMictionnel: 8
    }
  },

  // CAS 13 - Énurésie Nocturne Primaire (Pédiatrique)
  {
    id: 13,
    titre: 'Énurésie Nocturne Primaire',
    description: 'Garçon de 8 ans avec énurésie nocturne persistante',
    donnee: {
      nomPatient: 'Garçon A',
      age: 8,
      sexe: 'M' as const,
      symptomes: ['Énurésie nocturne', 'Sommeil profond'],
      antecedents: ['Antécédents familiaux d\'énurésie'],
      traitements: [],
      debitMetrie: {
        qMax: 12,
        qMoyen: 8,
        volumeVide: 150,
        tempsVidange: 20,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 3,
        tempsJusquQmax: 6
      },
      cystometrie: {
        capaciteVesicale: 200,
        pressionDetrusor: 20,
        pressionAbdominale: 10,
        pressionVesicale: 30,
        compliance: 18,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 80,
        besoinNormal: 140,
        capaciteMaximale: 200,
        vitesseRemplissage: 30,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 45,
        longueurUretrale: 120,
        pressionClotureUretrale: 30,
        longueurFonctionnelle: 18,
        pressionTransmission: 85,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 18,
        indexObstruction: -6,
        indexContractilite: 78,
        resistanceUretrale: 1.5,
        conductanceUretrale: 0.67
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 19,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 17,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 18,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 5
    }
  },

  // CAS 14 - Vessie Hyperactive Pédiatrique
  {
    id: 14,
    titre: 'Vessie Hyperactive Pédiatrique',
    description: 'Fille de 6 ans avec urgenturies et incontinence diurne',
    donnee: {
      nomPatient: 'Fille B',
      age: 6,
      sexe: 'F' as const,
      symptomes: ['Urgenturies', 'Incontinence diurne', 'Pollakiurie'],
      antecedents: ['Constipation'],
      traitements: ['Rééducation vésicale'],
      debitMetrie: {
        qMax: 10,
        qMoyen: 7,
        volumeVide: 120,
        tempsVidange: 18,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 2,
        tempsJusquQmax: 5
      },
      cystometrie: {
        capaciteVesicale: 140,
        pressionDetrusor: 35,
        pressionAbdominale: 8,
        pressionVesicale: 43,
        compliance: 12,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 50,
        besoinNormal: 90,
        capaciteMaximale: 140,
        vitesseRemplissage: 25,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 40,
        longueurUretrale: 25,
        pressionClotureUretrale: 28,
        longueurFonctionnelle: 18,
        pressionTransmission: 80,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 25,
        indexObstruction: 5,
        indexContractilite: 75,
        resistanceUretrale: 2.5,
        conductanceUretrale: 0.4
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 14,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitesseRapide: {
          compliance: 10,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitessePhysiologique: {
          compliance: 12,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        }
      },
      residuPostMictionnel: 8
    }
  },

  // CAS 15 - Spina Bifida avec Vessie Neurologique (Pédiatrique)
  {
    id: 15,
    titre: 'Spina Bifida avec Vessie Neurologique',
    description: 'Garçon de 12 ans avec spina bifida et vessie neurologique',
    donnee: {
      nomPatient: 'Garçon C',
      age: 12,
      sexe: 'M' as const,
      symptomes: ['Incontinence', 'Infections urinaires récidivantes', 'Absence de sensation'],
      antecedents: ['Spina bifida', 'Dérivation ventriculo-péritonéale'],
      traitements: ['Auto-sondages', 'Anticholinergiques'],
      debitMetrie: {
        qMax: 3,
        qMoyen: 2,
        volumeVide: 80,
        tempsVidange: 45,
        formeDebitmetrie: 'intermittente' as const,
        tempsLatence: 20,
        tempsJusquQmax: 25
      },
      cystometrie: {
        capaciteVesicale: 250,
        pressionDetrusor: 55,
        pressionAbdominale: 15,
        pressionVesicale: 70,
        compliance: 8,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'absente' as const,
        premierBesoin: 0,
        besoinNormal: 0,
        capaciteMaximale: 250,
        vitesseRemplissage: 30,
        pressionFuite: 45
      },
      profilPression: {
        pressionUretrale: 65,
        longueurUretrale: 140,
        pressionClotureUretrale: 35,
        longueurFonctionnelle: 20,
        pressionTransmission: 60,
        profilDynamique: 'variable' as const
      },
      emg: {
        activiteBasale: 'absente' as const,
        recrutementVolontaire: 'absent' as const,
        reflexeSphincter: 'absent' as const,
        synergieDetrusorSphincter: 'dyssynergie' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 70,
        indexObstruction: 64,
        indexContractilite: 85,
        resistanceUretrale: 23.3,
        conductanceUretrale: 0.04
      },
      testsProvocation: {
        testToux: 'positif_fort' as const,
        testValsalva: 'positif_fort' as const,
        testStressUretral: 25,
        pressionFuiteAbdominale: 25
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 10,
          contractions: 'presentes' as const,
          sensibilite: 'absente' as const
        },
        vitesseRapide: {
          compliance: 6,
          contractions: 'presentes' as const,
          sensibilite: 'absente' as const
        },
        vitessePhysiologique: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'absente' as const
        }
      },
      residuPostMictionnel: 150
    }
  },

  // CAS 16 - Syndrome de Hinman (Pédiatrique)
  {
    id: 16,
    titre: 'Syndrome de Hinman (Vessie Non-Neurologique)',
    description: 'Fille de 10 ans avec dysfonction vésico-sphinctérienne non-neurologique',
    donnee: {
      nomPatient: 'Fille D',
      age: 10,
      sexe: 'F' as const,
      symptomes: ['Dysurie', 'Infections urinaires récidivantes', 'Incontinence d\'urgence'],
      antecedents: ['Infections urinaires récidivantes'],
      traitements: [],
      debitMetrie: {
        qMax: 6,
        qMoyen: 3,
        volumeVide: 120,
        tempsVidange: 45,
        formeDebitmetrie: 'intermittente' as const,
        tempsLatence: 12,
        tempsJusquQmax: 20
      },
      cystometrie: {
        capaciteVesicale: 180,
        pressionDetrusor: 45,
        pressionAbdominale: 12,
        pressionVesicale: 57,
        compliance: 10,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 70,
        besoinNormal: 120,
        capaciteMaximale: 180,
        vitesseRemplissage: 25,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 55,
        longueurUretrale: 28,
        pressionClotureUretrale: 35,
        longueurFonctionnelle: 20,
        pressionTransmission: 75,
        profilDynamique: 'augmente' as const
      },
      emg: {
        activiteBasale: 'augmentee' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'dyssynergie' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 65,
        indexObstruction: 53,
        indexContractilite: 95,
        resistanceUretrale: 10.8,
        conductanceUretrale: 0.09
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 12,
          contractions: 'presentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 10,
          contractions: 'presentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 45
    }
  },

  // CAS 17 - Maladie de Parkinson avec Troubles Urinaires
  {
    id: 17,
    titre: 'Maladie de Parkinson avec Troubles Urinaires',
    description: 'Homme de 71 ans avec Parkinson et hyperactivité vésicale',
    donnee: {
      nomPatient: 'M. P',
      age: 71,
      sexe: 'M' as const,
      symptomes: ['Urgenturies', 'Pollakiurie', 'Nycturie sévère', 'Incontinence d\'urgence'],
      antecedents: ['Maladie de Parkinson', 'Troubles cognitifs légers'],
      traitements: ['L-DOPA', 'Anticholinergiques'],
      debitMetrie: {
        qMax: 11,
        qMoyen: 7,
        volumeVide: 220,
        tempsVidange: 35,
        formeDebitmetrie: 'intermittente' as const,
        tempsLatence: 10,
        tempsJusquQmax: 18
      },
      cystometrie: {
        capaciteVesicale: 250,
        pressionDetrusor: 42,
        pressionAbdominale: 18,
        pressionVesicale: 60,
        compliance: 14,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 100,
        besoinNormal: 180,
        capaciteMaximale: 250,
        vitesseRemplissage: 40,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 70,
        longueurUretrale: 190,
        pressionClotureUretrale: 50,
        longueurFonctionnelle: 25,
        pressionTransmission: 80,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'augmentee' as const,
        recrutementVolontaire: 'diminue' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'pseudodyssynergie' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 38,
        indexObstruction: 16,
        indexContractilite: 93,
        resistanceUretrale: 3.5,
        conductanceUretrale: 0.29
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 16,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitesseRapide: {
          compliance: 12,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitessePhysiologique: {
          compliance: 14,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        }
      },
      residuPostMictionnel: 35
    }
  },

  // CAS 18 - Cystocèle avec Obstruction Fonctionnelle
  {
    id: 18,
    titre: 'Cystocèle avec Obstruction Fonctionnelle',
    description: 'Femme de 68 ans avec cystocèle grade III et troubles mictionnels',
    donnee: {
      nomPatient: 'Mme Q',
      age: 68,
      sexe: 'F' as const,
      symptomes: ['Dysurie', 'Sensation de vidange incomplète', 'Manœuvres de réduction'],
      antecedents: ['Cystocèle grade III', 'Accouchements multiples', 'Hystérectomie'],
      traitements: ['Pessaire'],
      debitMetrie: {
        qMax: 8,
        qMoyen: 5,
        volumeVide: 200,
        tempsVidange: 45,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 15,
        tempsJusquQmax: 22
      },
      cystometrie: {
        capaciteVesicale: 420,
        pressionDetrusor: 38,
        pressionAbdominale: 20,
        pressionVesicale: 58,
        compliance: 19,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 180,
        besoinNormal: 300,
        capaciteMaximale: 420,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 35,
        longueurUretrale: 22,
        pressionClotureUretrale: 15,
        longueurFonctionnelle: 12,
        pressionTransmission: 45,
        profilDynamique: 'diminue' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'diminue' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 48,
        indexObstruction: 32,
        indexContractilite: 88,
        resistanceUretrale: 6.0,
        conductanceUretrale: 0.17
      },
      testsProvocation: {
        testToux: 'positif_faible' as const,
        testValsalva: 'positif_faible' as const,
        testStressUretral: 40,
        pressionFuiteAbdominale: 40
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 20,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 18,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 19,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 85
    }
  },

  // CAS 19 - Vessie Post-Radique
  {
    id: 19,
    titre: 'Vessie Post-Radique',
    description: 'Femme de 59 ans avec séquelles de radiothérapie pelvienne',
    donnee: {
      nomPatient: 'Mme S',
      age: 59,
      sexe: 'F' as const,
      symptomes: ['Pollakiurie', 'Urgenturies', 'Douleurs vésicales', 'Hématurie'],
      antecedents: ['Cancer col utérin', 'Radiothérapie pelvienne', 'Hystérectomie radicale'],
      traitements: ['Anti-inflammatoires', 'Instillations vésicales'],
      debitMetrie: {
        qMax: 14,
        qMoyen: 9,
        volumeVide: 160,
        tempsVidange: 20,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 5,
        tempsJusquQmax: 8
      },
      cystometrie: {
        capaciteVesicale: 180,
        pressionDetrusor: 32,
        pressionAbdominale: 15,
        pressionVesicale: 47,
        compliance: 8,
        contractionsInvolontaires: 'presentes' as const,
        sensibilite: 'hyperesthesie' as const,
        premierBesoin: 60,
        besoinNormal: 120,
        capaciteMaximale: 180,
        vitesseRemplissage: 30,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 48,
        longueurUretrale: 25,
        pressionClotureUretrale: 28,
        longueurFonctionnelle: 18,
        pressionTransmission: 70,
        profilDynamique: 'fibrose' as const
      },
      emg: {
        activiteBasale: 'augmentee' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 28,
        indexObstruction: 0,
        indexContractilite: 98,
        resistanceUretrale: 2.0,
        conductanceUretrale: 0.5
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 10,
          contractions: 'presentes' as const,
          sensibilite: 'hyperesthesie' as const
        },
        vitesseRapide: {
          compliance: 6,
          contractions: 'presentes' as const,
          sensibilite: 'hyperesthesie' as const
        },
        vitessePhysiologique: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'hyperesthesie' as const
        }
      },
      residuPostMictionnel: 12
    }
  },

  // CAS 20 - Incontinence d'Effort Sévère - Insuffisance Sphinctérienne
  {
    id: 20,
    titre: 'Incontinence d\'Effort Sévère - Insuffisance Sphinctérienne',
    description: 'Femme de 52 ans avec insuffisance sphinctérienne intrinsèque',
    donnee: {
      nomPatient: 'Mme T',
      age: 52,
      sexe: 'F' as const,
      symptomes: ['Incontinence d\'effort sévère', 'Fuites permanentes', 'Absence de contrôle'],
      antecedents: ['Chirurgie anti-incontinence multiple', 'Érosion de bandelette'],
      traitements: ['Rééducation périnéale'],
      debitMetrie: {
        qMax: 28,
        qMoyen: 20,
        volumeVide: 380,
        tempsVidange: 19,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 1,
        tempsJusquQmax: 4
      },
      cystometrie: {
        capaciteVesicale: 450,
        pressionDetrusor: 25,
        pressionAbdominale: 12,
        pressionVesicale: 37,
        compliance: 25,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 180,
        besoinNormal: 320,
        capaciteMaximale: 450,
        vitesseRemplissage: 50,
        pressionFuite: 18
      },
      profilPression: {
        pressionUretrale: 22,
        longueurUretrale: 28,
        pressionClotureUretrale: 8,
        longueurFonctionnelle: 12,
        pressionTransmission: 25,
        profilDynamique: 'deficient' as const
      },
      emg: {
        activiteBasale: 'absente' as const,
        recrutementVolontaire: 'absent' as const,
        reflexeSphincter: 'diminue' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 18,
        indexObstruction: -38,
        indexContractilite: 158,
        resistanceUretrale: 0.6,
        conductanceUretrale: 1.56
      },
      testsProvocation: {
        testToux: 'positif_fort' as const,
        testValsalva: 'positif_fort' as const,
        testStressUretral: 12,
        pressionFuiteAbdominale: 12
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 26,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 24,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 25,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 8
    }
  },

  // CAS 21 - Rétention Urinaire Aiguë sur HBP
  {
    id: 21,
    titre: 'Rétention Urinaire Aiguë sur HBP',
    description: 'Homme de 78 ans en rétention aiguë sur hypertrophie prostatique',
    donnee: {
      nomPatient: 'M. U',
      age: 78,
      sexe: 'M' as const,
      symptomes: ['Rétention urinaire', 'Douleurs hypogastriques', 'Globe vésical'],
      antecedents: ['HBP', 'Épisodes de rétention', 'Sondage vésical'],
      traitements: ['Sondage à demeure', 'Alpha-bloquants'],
      debitMetrie: {
        qMax: 2,
        qMoyen: 1,
        volumeVide: 50,
        tempsVidange: 60,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 30,
        tempsJusquQmax: 45
      },
      cystometrie: {
        capaciteVesicale: 800,
        pressionDetrusor: 12,
        pressionAbdominale: 25,
        pressionVesicale: 37,
        compliance: 5,
        contractionsInvolontaires: 'absentes' as const,
        sensibilite: 'absente' as const,
        premierBesoin: 600,
        besoinNormal: 700,
        capaciteMaximale: 800,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 140,
        longueurUretrale: 260,
        pressionClotureUretrale: 115,
        longueurFonctionnelle: 45,
        pressionTransmission: 95,
        profilDynamique: 'augmente' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 95,
        indexObstruction: 91,
        indexContractilite: 105,
        resistanceUretrale: 47.5,
        conductanceUretrale: 0.02
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 6,
          contractions: 'absentes' as const,
          sensibilite: 'absente' as const
        },
        vitesseRapide: {
          compliance: 4,
          contractions: 'absentes' as const,
          sensibilite: 'absente' as const
        },
        vitessePhysiologique: {
          compliance: 5,
          contractions: 'absentes' as const,
          sensibilite: 'absente' as const
        }
      },
      residuPostMictionnel: 350
    }
  }
];