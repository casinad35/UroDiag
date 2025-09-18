// Constantes et listes pour les formulaires
export const SYMPTOMES = [
  'Urgenturies',
  'Pollakiurie',
  'Nycturie',
  'Dysurie',
  'Jet faible',
  'Sensation de vidange incomplète',
  'Incontinence d\'effort',
  'Incontinence d\'urgence',
  'Fuites à la toux',
  'Douleurs mictionnelles',
  'Infections urinaires récidivantes',
  'Hématurie',
  'Rétention urinaire',
  'Énurésie nocturne',
  'Incontinence diurne',
  'Douleurs vésicales',
  'Pesanteur pelvienne',
  'Effort de poussée',
  'Fuites permanentes',
  'Absence de contrôle',
  'Globe vésical',
  'Douleurs hypogastriques',
  'Manœuvres de réduction',
  'Sommeil profond',
  'Absence de sensation'
];

export const ANTECEDENTS = [
  // Antécédents masculins
  'HBP',
  'Prostatectomie',
  'Cancer prostate',
  'Prostatite',
  'Résection prostatique',
  'Adénomectomie',
  
  // Antécédents féminins
  'Hystérectomie',
  'Césarienne',
  'Accouchements difficiles',
  'Épisiotomie',
  'Prolapsus génital',
  'Ménopause',
  'Cystocèle',
  'Rectocèle',
  'Chirurgie anti-incontinence',
  'Érosion de bandelette',
  'Accouchements multiples',
  
  // Antécédents neurologiques
  'Traumatisme médullaire',
  'Paraplégie',
  'Sclérose en plaques',
  'Maladie de Parkinson',
  'AVC',
  'Diabète type 2',
  'Neuropathie diabétique',
  'Spina bifida',
  'Dérivation ventriculo-péritonéale',
  'Troubles cognitifs légers',
  
  // Antécédents urologiques
  'Lithiase vésicale',
  'Infections urinaires',
  'Cystites récidivantes',
  'Traumatisme urétral',
  'Urétrotomie',
  'Sondage vésical',
  'Épisodes de rétention',
  'Sténose urétrale',
  
  // Antécédents oncologiques
  'Cancer col utérin',
  'Radiothérapie pelvienne',
  'Hystérectomie radicale',
  'Cystite radique',
  
  // Antécédents généraux
  'Fibromyalgie',
  'Constipation',
  'Antécédents familiaux d\'énurésie',
  'Poussées neurologiques',
  'Infections urinaires récidivantes'
];

export const TRAITEMENTS = [
  // Traitements urologiques
  'Alpha-bloquants',
  'Inhibiteurs 5-alpha-réductase',
  'Anticholinergiques',
  'Agonistes bêta-3',
  'Antispasmodiques',
  
  // Traitements hormonaux
  'THS',
  'Œstrogènes locaux',
  
  // Traitements neurologiques
  'L-DOPA',
  'Immunomodulateurs',
  'Antidiabétiques',
  
  // Traitements symptomatiques
  'Antalgiques',
  'Anti-inflammatoires',
  'Instillations vésicales',
  
  // Traitements non médicamenteux
  'Rééducation périnéale',
  'Rééducation vésicale',
  'Auto-sondages',
  'Sondage à demeure',
  'Pessaire'
];

// Valeurs normales par sexe et âge
export const VALEURS_NORMALES = {
  debitmetrie: {
    qMax: { min: 15, max: 25, unite: 'ml/s' },
    qMoyen: { min: 8, max: 15, unite: 'ml/s' },
    volumeVide: { min: 150, max: 500, unite: 'ml' },
    tempsVidange: { max: 60, unite: 's' },
    tempsLatence: { max: 10, unite: 's' }
  },
  cystometrie: {
    capaciteVesicale: { min: 300, max: 600, unite: 'ml' },
    pressionDetrusor: { repos: { max: 15 }, miction: { min: 20, max: 40 }, unite: 'cmH2O' },
    compliance: { min: 20, unite: 'ml/cmH2O' },
    premierBesoin: { min: 100, max: 200, unite: 'ml' },
    besoinNormal: { min: 200, max: 400, unite: 'ml' }
  },
  profilPression: {
    pressionUretrale: {
      homme: { min: 60, max: 120 },
      femme: { min: 40, max: 100 },
      unite: 'cmH2O'
    },
    pressionClotureUretrale: {
      homme: { min: 40, max: 80 },
      femme: { min: 20, max: 60 },
      unite: 'cmH2O'
    },
    longueurUretrale: {
      homme: { min: 180, max: 240 },
      femme: { min: 30, max: 50 },
      unite: 'mm'
    },
    longueurFonctionnelle: {
      homme: { min: 15, max: 35 },
      femme: { min: 25, max: 45 },
      unite: 'mm'
    }
  },
  etudePressionDebit: {
    pressionDetrusorQmax: { max: 40, unite: 'cmH2O' },
    indexObstruction: { 
      nonObstrue: { max: 20 },
      equivoque: { min: 20, max: 40 },
      obstrue: { min: 40 }
    },
    indexContractilite: { min: 100 }
  },
  residuPostMictionnel: { max: 50, unite: 'ml' }
};