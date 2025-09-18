// Templates d'examens pré-définis
import { TemplateExamen } from './types';

export const TEMPLATES_EXAMENS: Record<string, TemplateExamen> = {
  hyperactivite_vesicale: {
    nom: 'Hyperactivité Vésicale',
    description: 'Template pour suspicion d\'hyperactivité vésicale avec urgenturies',
    defaultValues: {
      symptomes: ['Urgenturies', 'Pollakiurie', 'Nycturie'],
      debitMetrie: {
        qMax: 18,
        qMoyen: 12,
        volumeVide: 280,
        tempsVidange: 25,
        formeDebitmetrie: 'normale',
        tempsLatence: 3,
        tempsJusquQmax: 8
      },
      cystometrie: {
        capaciteVesicale: 220,
        pressionDetrusor: 45,
        pressionAbdominale: 12,
        pressionVesicale: 57,
        compliance: 15,
        contractionsInvolontaires: 'presentes',
        sensibilite: 'augmentee',
        premierBesoin: 80,
        besoinNormal: 150,
        capaciteMaximale: 220,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      residuPostMictionnel: 15
    }
  },

  obstruction_prostatique: {
    nom: 'Obstruction Prostatique',
    description: 'Template pour obstruction prostatique avec dysurie',
    defaultValues: {
      sexe: 'M',
      symptomes: ['Dysurie', 'Jet faible', 'Sensation de vidange incomplète', 'Nycturie'],
      antecedents: ['HBP'],
      traitements: ['Alpha-bloquants'],
      debitMetrie: {
        qMax: 8,
        qMoyen: 5,
        volumeVide: 320,
        tempsVidange: 65,
        formeDebitmetrie: 'en_plateau',
        tempsLatence: 8,
        tempsJusquQmax: 25
      },
      cystometrie: {
        capaciteVesicale: 480,
        pressionDetrusor: 25,
        pressionAbdominale: 18,
        pressionVesicale: 43,
        compliance: 25,
        contractionsInvolontaires: 'absentes',
        sensibilite: 'normale',
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
        profilDynamique: 'normal'
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 65,
        indexObstruction: 49,
        indexContractilite: 105,
        resistanceUretrale: 8.1,
        conductanceUretrale: 0.12
      },
      residuPostMictionnel: 85
    }
  },

  incontinence_effort: {
    nom: 'Incontinence d\'Effort',
    description: 'Template pour incontinence d\'effort avec fuites à l\'effort (homme ou femme)',
    defaultValues: {
      sexe: 'F',
      symptomes: ['Incontinence d\'effort', 'Fuites à la toux'],
      antecedents: ['Accouchements difficiles', 'Épisiotomie'],
      debitMetrie: {
        qMax: 22,
        qMoyen: 15,
        volumeVide: 350,
        tempsVidange: 24,
        formeDebitmetrie: 'normale',
        tempsLatence: 2,
        tempsJusquQmax: 7
      },
      cystometrie: {
        capaciteVesicale: 420,
        pressionDetrusor: 28,
        pressionAbdominale: 15,
        pressionVesicale: 43,
        compliance: 22,
        contractionsInvolontaires: 'absentes',
        sensibilite: 'normale',
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
        profilDynamique: 'diminue'
      },
      testsProvocation: {
        testToux: 'positif_fort',
        testValsalva: 'positif_faible',
        testStressUretral: 45,
        pressionFuiteAbdominale: 45
      },
      residuPostMictionnel: 10
    }
  },

  dyssynergie_vesico_sphincterienne: {
    nom: 'Dyssynergie Vésico-Sphinctérienne',
    description: 'Template pour dyssynergie avec lésion neurologique',
    defaultValues: {
      sexe: 'M',
      symptomes: ['Dysurie', 'Sensation de vidange incomplète', 'Infections urinaires récidivantes'],
      antecedents: ['Traumatisme médullaire', 'Paraplégie'],
      traitements: ['Auto-sondages'],
      debitMetrie: {
        qMax: 6,
        qMoyen: 3,
        volumeVide: 220,
        tempsVidange: 55,
        formeDebitmetrie: 'intermittente',
        tempsLatence: 15,
        tempsJusquQmax: 30
      },
      cystometrie: {
        capaciteVesicale: 280,
        pressionDetrusor: 55,
        pressionAbdominale: 20,
        pressionVesicale: 75,
        compliance: 12,
        contractionsInvolontaires: 'presentes',
        sensibilite: 'diminuee',
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
        profilDynamique: 'augmente'
      },
      emg: {
        activiteBasale: 'augmentee',
        recrutementVolontaire: 'absent',
        reflexeSphincter: 'absent',
        synergieDetrusorSphincter: 'dyssynergie',
        fatigabilite: 'normale'
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 85,
        indexObstruction: 73,
        indexContractilite: 115,
        resistanceUretrale: 14.2,
        conductanceUretrale: 0.07
      },
      residuPostMictionnel: 80
    }
  },

  hypocontractilite_detrusorienne: {
    nom: 'Hypocontractilité Détrusorienne',
    description: 'Template pour hypocontractilité avec vidange incomplète',
    defaultValues: {
      symptomes: ['Sensation de vidange incomplète', 'Jet faible', 'Effort de poussée'],
      antecedents: ['Diabète type 2', 'Neuropathie diabétique'],
      traitements: ['Antidiabétiques'],
      debitMetrie: {
        qMax: 9,
        qMoyen: 6,
        volumeVide: 280,
        tempsVidange: 48,
        formeDebitmetrie: 'en_plateau',
        tempsLatence: 12,
        tempsJusquQmax: 20
      },
      cystometrie: {
        capaciteVesicale: 650,
        pressionDetrusor: 15,
        pressionAbdominale: 22,
        pressionVesicale: 37,
        compliance: 35,
        contractionsInvolontaires: 'absentes',
        sensibilite: 'diminuee',
        premierBesoin: 300,
        besoinNormal: 500,
        capaciteMaximale: 650,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 18,
        indexObstruction: 0,
        indexContractilite: 63,
        resistanceUretrale: 2.0,
        conductanceUretrale: 0.5
      },
      residuPostMictionnel: 45
    }
  }
};