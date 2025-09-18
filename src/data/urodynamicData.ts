// Fichier principal des données urodynamiques - version allégée
import { PatientData, DiagnosticResult } from './types';

// Réexportation des modules
export * from './types';
export * from './constants';
export * from './templates';
export * from './validation';
export { CAS_CLINIQUES } from './clinicalCases';

// Fonction principale d'analyse urodynamique
export function analyserUrodynamique(data: PatientData): DiagnosticResult {
  const indexCalcules = calculerIndex(data);
  const nomogrammes = evaluerNomogrammes(data);
  const diagnostic = determinerDiagnostic(data, indexCalcules, nomogrammes);
  const recommandations = genererRecommandations(data, diagnostic);
  const examensComplementaires = genererExamensComplementaires(data, diagnostic);
  const traitements = genererTraitements(data, diagnostic);
  const surveillance = genererSurveillance(data, diagnostic);
  const pieges = genererPieges(data, diagnostic);
  const alertesCritiques = detecterAlertesCritiques(data);

  return {
    diagnostic,
    certitudeDiagnostique: evaluerCertitudeDiagnostique(data, diagnostic),
    recommandations,
    examensComplementaires,
    traitements,
    surveillance,
    pieges,
    alertesCritiques,
    indexCalcules,
    nomogrammes,
    patientData: data
  };
}

function calculerIndex(data: PatientData): Record<string, number> {
  const index: Record<string, number> = {};

  // Index d'obstruction d'Abrams-Griffiths
  index['Index d\'obstruction (Abrams-Griffiths)'] = 
    data.etudePressionDebit.pressionDetrusorQmax - (2 * data.debitMetrie.qMax);

  // Index de contractilité détrusorienne
  index['Index de contractilité détrusorienne'] = 
    data.etudePressionDebit.pressionDetrusorQmax + (5 * data.debitMetrie.qMax);

  // Résistance urétrale
  index['Résistance urétrale'] = 
    data.etudePressionDebit.pressionDetrusorQmax / data.debitMetrie.qMax;

  // Conductance urétrale
  index['Conductance urétrale'] = 
    data.debitMetrie.qMax / data.etudePressionDebit.pressionDetrusorQmax;

  // Ratio Qmoyen/Qmax
  index['Ratio Qmoyen/Qmax'] = 
    data.debitMetrie.qMoyen / data.debitMetrie.qMax;

  return index;
}

function evaluerNomogrammes(data: PatientData): { schafer?: string; abramsGriffiths?: string } {
  const nomogrammes: { schafer?: string; abramsGriffiths?: string } = {};

  // Nomogramme de Schafer
  const qmax = data.debitMetrie.qMax;
  const pdetQmax = data.etudePressionDebit.pressionDetrusorQmax;

  if (qmax < 10 && pdetQmax > 50) {
    nomogrammes.schafer = 'Obstruction forte';
  } else if (qmax < 15 && pdetQmax > 30) {
    nomogrammes.schafer = 'Obstruction modérée';
  } else if (qmax < 20 && pdetQmax > 20) {
    nomogrammes.schafer = 'Équivoque';
  } else {
    nomogrammes.schafer = 'Normal';
  }

  // Nomogramme d'Abrams-Griffiths
  const indexObstruction = pdetQmax - (2 * qmax);
  if (indexObstruction > 40) {
    nomogrammes.abramsGriffiths = 'Obstrué';
  } else if (indexObstruction > 20) {
    nomogrammes.abramsGriffiths = 'Équivoque';
  } else {
    nomogrammes.abramsGriffiths = 'Non obstrué';
  }

  return nomogrammes;
}

function determinerDiagnostic(
  data: PatientData, 
  indexCalcules: Record<string, number>, 
  nomogrammes: { schafer?: string; abramsGriffiths?: string }
): string {
  const qmax = data.debitMetrie.qMax;
  const pdetQmax = data.etudePressionDebit.pressionDetrusorQmax;
  const indexObstruction = indexCalcules['Index d\'obstruction (Abrams-Griffiths)'];
  const indexContractilite = indexCalcules['Index de contractilité détrusorienne'];
  const contractionsInvolontaires = data.cystometrie.contractionsInvolontaires === 'presentes';
  const dyssynergie = data.emg.synergieDetrusorSphincter === 'dyssynergie';
  const incontinenceEffort = data.symptomes.includes('Incontinence d\'effort') || 
                            data.testsProvocation.testToux !== 'negatif';
  const urgenturies = data.symptomes.includes('Urgenturies');
  const fuitesMixtes = data.symptomes.includes('Fuites mixtes');
  const pressionClotureUretrale = data.profilPression.pressionClotureUretrale;
  
  // Nouveaux critères pour l'obstruction liée au prolapsus
  const symptomesObstructifs = data.symptomes.some(s => 
    ['Dysurie', 'Jet faible', 'Sensation de vidange incomplète', 'Effort de poussée'].includes(s)
  );
  const antecedentsProlapsus = data.antecedents.some(ant => 
    ['Prolapsus génital', 'Cystocèle', 'Rectocèle', 'Accouchements multiples', 'Accouchements difficiles'].includes(ant)
  );
  const pesanteurPelvienne = data.symptomes.includes('Pesanteur pelvienne');

  // Diagnostic selon algorithme clinique amélioré
  
  // Cas d'incontinence mixte (nouvelle logique)
  if ((incontinenceEffort && urgenturies) || fuitesMixtes) {
    if (contractionsInvolontaires && pressionClotureUretrale < 20) {
      return 'Incontinence urinaire mixte (hyperactivité détrusorienne + insuffisance sphinctérienne)';
    } else if (contractionsInvolontaires) {
      return 'Incontinence urinaire mixte à prédominance urgence';
    } else if (pressionClotureUretrale < 20) {
      return 'Incontinence urinaire mixte à prédominance effort';
    } else {
      return 'Incontinence urinaire mixte';
    }
  }

  // Obstruction sévère
  if (indexObstruction > 40) {
    if (dyssynergie) {
      return 'Dyssynergie vésico-sphinctérienne avec obstruction fonctionnelle';
    } else if (data.sexe === 'M' && data.antecedents.includes('HBP')) {
      return 'Obstruction prostatique bénigne';
    } else {
      return 'Obstruction sous-vésicale';
    }
  }

  // Nouvelle logique pour obstruction modérée liée au prolapsus
  if (data.sexe === 'F' && antecedentsProlapsus && symptomesObstructifs) {
    // Critères d'obstruction modérée chez la femme avec prolapsus
    const criteresObstructionModeree = [
      qmax < 15 && qmax >= 10, // Qmax limite
      pdetQmax > 25 && pdetQmax <= 50, // Pression modérément élevée
      nomogrammes.schafer === 'Obstruction modérée' || nomogrammes.schafer === 'Équivoque',
      data.residuPostMictionnel > 30,
      pesanteurPelvienne
    ];
    
    const nombreCriteres = criteresObstructionModeree.filter(Boolean).length;
    
    if (nombreCriteres >= 3) {
      return 'Obstruction sous-vésicale modérée secondaire à un prolapsus génital';
    }
  }

  // Obstruction équivoque nécessitant évaluation clinique
  if (indexObstruction > 15 && indexObstruction <= 40 && symptomesObstructifs) {
    if (data.sexe === 'M' && data.antecedents.includes('HBP')) {
      return 'Obstruction prostatique débutante';
    } else if (data.sexe === 'F' && antecedentsProlapsus) {
      return 'Obstruction sous-vésicale modérée secondaire à un prolapsus génital';
    } else {
      return 'Obstruction sous-vésicale équivoque';
    }
  }

  if (contractionsInvolontaires) {
    if (data.antecedents.some(ant => ['Sclérose en plaques', 'Maladie de Parkinson', 'AVC'].includes(ant))) {
      return 'Hyperactivité détrusorienne neurogenique';
    } else {
      return 'Hyperactivité détrusorienne idiopathique';
    }
  }

  if (incontinenceEffort && pressionClotureUretrale < 20) {
    return 'Incontinence d\'effort par insuffisance sphinctérienne';
  }

  if (indexContractilite < 100 && qmax < 12) {
    return 'Hypocontractilité détrusorienne';
  }

  if (data.cystometrie.capaciteVesicale < 200 && data.symptomes.includes('Douleurs vésicales')) {
    return 'Syndrome douloureux vésical/Cystite interstitielle';
  }

  if (data.residuPostMictionnel > 100) {
    return 'Vidange vésicale incomplète';
  }

  return 'Fonction vésico-sphinctérienne normale';
}

function evaluerCertitudeDiagnostique(data: PatientData, diagnostic: string): 'Élevée' | 'Modérée' | 'Faible' {
  // Critères de certitude élevée
  const criteresEleves = [
    data.debitMetrie.volumeVide > 200, // Volume suffisant
    data.cystometrie.capaciteVesicale > 150, // Capacité mesurable
    Math.abs(data.cystometrie.pressionVesicale - (data.cystometrie.pressionDetrusor + data.cystometrie.pressionAbdominale)) < 5 // Cohérence des pressions
  ];

  const nombreCriteresEleves = criteresEleves.filter(Boolean).length;

  if (nombreCriteresEleves >= 3) return 'Élevée';
  if (nombreCriteresEleves >= 2) return 'Modérée';
  return 'Faible';
}

function genererRecommandations(data: PatientData, diagnostic: string): Array<{ label: string; tooltip: string }> {
  const recommandations: Array<{ label: string; tooltip: string }> = [];

  if (diagnostic.includes('Obstruction prostatique')) {
    recommandations.push({
      label: 'Traitement médical par alpha-bloquants en première intention',
      tooltip: 'Les alpha-bloquants (tamsulosine, alfuzosine) relaxent les fibres musculaires lisses de la prostate et du col vésical, améliorant le débit urinaire. Efficacité rapide (quelques jours) avec amélioration symptomatique dans 60-70% des cas.'
    });
    
    if (data.etudePressionDebit.pressionDetrusorQmax > 60) {
      recommandations.push({
        label: 'Envisager traitement chirurgical (RTUP) si échec médical',
        tooltip: 'La résection trans-urétrale de prostate (RTUP) est indiquée en cas d\'obstruction sévère (Pdet.Qmax >60 cmH2O) ou d\'échec du traitement médical. Amélioration du Qmax de 100-200% et réduction significative des symptômes dans 85-90% des cas.'
      });
    }
  }

  // Nouvelles recommandations pour l'obstruction liée au prolapsus
  if (diagnostic.includes('prolapsus génital')) {
    recommandations.push({
      label: 'Rééducation périnéale spécialisée en première intention',
      tooltip: 'Programme individualisé réalisé par un kinésithérapeute spécialisé. Vise à renforcer les muscles du plancher pelvien, améliorer le contrôle sphinctérien et optimiser la coordination mictionnelle. Indiqué dès les premiers signes de dysfonction, avant tout traitement chirurgical.'
    });
    
    recommandations.push({
      label: 'Évaluation pelvienne complète avec classification POP-Q',
      tooltip: 'Le système POP-Q (Pelvic Organ Prolapse Quantification) permet de quantifier précisément le degré de prolapsus génital et de planifier la stratégie thérapeutique. Examen clinique standardisé indispensable avant tout traitement.'
    });
    
    if (data.residuPostMictionnel > 50 || data.etudePressionDebit.pressionDetrusorQmax > 40) {
      recommandations.push({
        label: 'Traitement chirurgical du prolapsus en cas d’échec de la rééducation ou de symptômes invalidants',
        tooltip: 'Le traitement du prolapsus (pessaire ou chirurgie) est indiqué en cas de symptômes obstructifs persistants malgré la rééducation, ou si le prolapsus compromet la vidange vésicale (RPM >50ml, Pdet >40 cmH2O).'
      });
    }
  }

  if (diagnostic.includes('Hyperactivité détrusorienne') || diagnostic.includes('mixte')) {
    recommandations.push({
      label: 'Rééducation vésicale et techniques comportementales',
      tooltip: 'La rééducation vésicale comprend l\'éducation du patient, les techniques de distraction, les mictions programmées et les exercices de renforcement périnéal. Efficacité de 60-80% sur les symptômes d\'urgence avec amélioration de la qualité de vie.'
    });
    
    recommandations.push({
      label: 'Anticholinergiques si échec des mesures comportementales',
      tooltip: 'Les anticholinergiques (oxybutynine, solifénacine, fésotérodine) bloquent les récepteurs muscariniques du détrusor, réduisant les contractions involontaires. Efficacité sur l\'urgence dans 70% des cas, mais effets secondaires (sécheresse buccale, constipation) chez 30% des patients.'
    });
  }
  
  if (diagnostic.includes('Hypocontractilité détrusorienne')) {
    recommandations.push({
      label: 'Apprentissage des manœuvres de double miction',
      tooltip: 'Technique consistant à tenter une seconde miction après quelques minutes pour améliorer la vidange vésicale.'
    });
    
    recommandations.push({
      label: 'Auto-sondages intermittents propres si RPM > 100 ml persistant',
      tooltip: 'Indiqué en cas de résidu post-mictionnel chronique, pour éviter infections et dilatation des voies urinaires.'
    });
	
    recommandations.push({
      label: 'Surveillance régulière de la fonction rénale et du haut appareil urinaire',
      tooltip: 'Indispensable en cas de vidange incomplète chronique, pour prévenir les complications rénales silencieuses.'
    });
  }

  if (diagnostic.includes('Incontinence d\'effort') || diagnostic.includes('mixte')) {
    // Recommandation fusionnée pour éviter les doublons
    if (diagnostic.includes('mixte')) {
      recommandations.push({
        label: 'Rééducation périnéale spécialisée en première intention, ciblée en cas de fuites d\'effort persistantes',
        tooltip: 'La rééducation périnéale par kinésithérapeute spécialisé comprend exercices de Kegel, biofeedback et électrostimulation. Efficacité de 60-70% sur l\'incontinence d\'effort légère à modérée. Dans l\'incontinence mixte, renforcement ciblé du plancher pelvien en complément des techniques comportementales.'
      });
    } else {
      recommandations.push({
        label: 'Rééducation périnéale spécialisée en première intention',
        tooltip: 'La rééducation périnéale par kinésithérapeute spécialisé comprend exercices de Kegel, biofeedback et électrostimulation. Efficacité de 60-70% sur l\'incontinence d\'effort légère à modérée. Durée recommandée : 3-6 mois avec séances bi-hebdomadaires.'
      });
    }
    
    // Nouvelle recommandation pour l'incontinence mixte
    if (diagnostic.includes('mixte')) {
      recommandations.push({
        label: 'Évaluation du prolapsus si incontinence persistante malgré traitement',
        tooltip: 'Un prolapsus sous-estimé peut compromettre l\'efficacité des traitements conservateurs ou médicamenteux, particulièrement chez les femmes avec antécédents gynécologiques.'
      });
    }
    
    if (data.profilPression.pressionClotureUretrale < 20) {
      recommandations.push({
        label: 'Chirurgie anti-incontinence (bandelette sous-urétrale)',
        tooltip: 'Les bandelettes sous-urétrales (TVT, TOT) sont indiquées en cas d\'insuffisance sphinctérienne (pression clôture <20 cmH2O) ou d\'échec de la rééducation. Taux de succès de 85-90% à 5 ans avec faible morbidité. Technique mini-invasive de référence.'
      });
    }
  }

  if (diagnostic.includes('Dyssynergie')) {
    recommandations.push({
      label: 'Auto-sondages intermittents propres',
      tooltip: 'Les auto-sondages intermittents (4-6 fois/jour) permettent une vidange vésicale complète, préviennent les infections urinaires et protègent le haut appareil urinaire. Technique de référence dans la dyssynergie avec formation du patient et suivi régulier.'
    });
    
    recommandations.push({
      label: 'Anticholinergiques pour contrôler l\'hyperactivité détrusorienne',
      tooltip: 'Dans la dyssynergie, les anticholinergiques réduisent les pressions intravésicales élevées et protègent le haut appareil urinaire. Association systématique avec les auto-sondages pour éviter la rétention. Surveillance de la fonction rénale nécessaire.'
    });
	
    recommandations.push({
      label: `Toxine botulique intra-détrusorienne en cas d'hyperactivité détrusorienne réfractaire ou d'intolérance aux anticholinergiques`,
      tooltip: 'Utilisée en deuxième intention, la toxine botulique permet de diminuer l\'hyperactivité du détrusor lorsque les anticholinergiques sont inefficaces ou mal tolérés.'
    });
	
    recommandations.push({
      label: 'EMG périnéal conseillé pour confirmer une dyssynergie vraie',
      tooltip: 'L\'électromyogramme du sphincter permet de distinguer une dyssynergie vésico-sphinctérienne vraie d\'une fausse poussée abdominale ou d\'un artefact.'
    });
  }

  return recommandations;
}

function genererExamensComplementaires(data: PatientData, diagnostic: string): Array<{ label: string; tooltip: string }> {
  const examens: Array<{ label: string; tooltip: string }> = [];

  if (diagnostic.includes('Obstruction prostatique')) {
    examens.push({
      label: 'Échographie prostatique trans-rectale',
      tooltip: 'L\'échographie trans-rectale permet de mesurer précisément le volume prostatique, d\'évaluer la morphologie (lobe médian) et de guider la stratégie thérapeutique. Volume >40ml évoque une HBP significative. Examen de référence pour planifier la chirurgie.'
    });
    
    examens.push({
      label: 'PSA et toucher rectal',
      tooltip: 'Le dosage du PSA (antigène prostatique spécifique) et le toucher rectal permettent de dépister un cancer prostatique associé. PSA >4 ng/ml ou anomalie au toucher rectal nécessitent des biopsies prostatiques avant tout traitement de l\'HBP.'
    });
  }

  // Nouveaux examens pour l'obstruction liée au prolapsus
  if (diagnostic.includes('prolapsus génital')) {
    examens.push({
      label: 'IRM pelvienne dynamique',
      tooltip: 'L\'IRM pelvienne dynamique permet d\'évaluer précisément le prolapsus génital et ses répercussions sur la vidange vésicale. Examen de référence pour quantifier les prolapsus multi-compartimentaux et planifier la stratégie chirurgicale si nécessaire.'
    });
    
    examens.push({
      label: 'Échographie vésicale pour quantification du RPM',
      tooltip: 'La mesure échographique du résidu post-mictionnel permet de surveiller l\'impact de l\'obstruction sur la vidange vésicale et d\'évaluer l\'efficacité des traitements conservateurs. Surveillance recommandée tous les 3-6 mois.'
    });
  }

  if (data.residuPostMictionnel > 100) {
    examens.push({
      label: 'Échographie rénale et vésicale',
      tooltip: 'L\'échographie rénale recherche une dilatation des cavités pyélocalicielles (retentissement sur le haut appareil). L\'échographie vésicale évalue l\'épaisseur pariétale, la présence de diverticules et confirme le résidu post-mictionnel. Examen de surveillance semestriel.'
    });
  }

  if (diagnostic.includes('neurologique') || data.antecedents.some(ant => ['Sclérose en plaques', 'Traumatisme médullaire'].includes(ant))) {
    examens.push({
      label: 'IRM médullaire',
      tooltip: 'L\'IRM médullaire recherche des lésions de la moelle épinière (compression, démyélinisation, syringomyélie) pouvant expliquer les troubles vésico-sphinctériens. Examen indispensable avant tout traitement invasif dans un contexte neurologique.'
    });
  }

  if (diagnostic.includes('Incontinence d\'effort') || diagnostic.includes('mixte')) {
    examens.push({
      label: 'IRM pelvienne dynamique',
      tooltip: 'L\'IRM pelvienne dynamique évalue les prolapsus associés, la mobilité urétrale et l\'intégrité des structures de soutien. Permet de planifier la chirurgie anti-incontinence et de dépister les prolapsus asymptomatiques. Examen de référence avant chirurgie.'
    });
  }

  if (data.symptomes.includes('Hématurie') || diagnostic.includes('Cystite interstitielle')) {
    examens.push({
      label: 'Cystoscopie diagnostique',
      tooltip: 'La cystoscopie permet l\'examen direct de la muqueuse vésicale, le diagnostic des lésions inflammatoires (cystite interstitielle), tumorales ou lithiasiques. Examen indispensable en cas d\'hématurie ou de douleurs vésicales chroniques.'
    });
  }

  return examens;
}

function genererTraitements(data: PatientData, diagnostic: string): Array<{ label: string; tooltip: string }> {
  const traitements: Array<{ label: string; tooltip: string }> = [];

  if (diagnostic.includes('Hyperactivité détrusorienne') || diagnostic.includes('mixte')) {
    
    traitements.push({
      label: 'Solifénacine 5-10 mg/jour',
      tooltip: 'La solifénacine est un anticholinergique sélectif des récepteurs M3 avec une demi-vie longue (45-68h) permettant une prise unique quotidienne. Efficacité supérieure à l\'oxybutynine avec moins d\'effets secondaires. Réduction de 50-70% des épisodes d\'urgence.'
    });
    
    traitements.push({
      label: 'Mirabégron 50 mg/jour si contre-indication aux anticholinergiques',
      tooltip: 'Le mirabégron est un agoniste des récepteurs β3-adrénergiques qui relaxe le détrusor sans effet anticholinergique. Indiqué chez les patients âgés (risque cognitif), glaucome, ou intolérance aux anticholinergiques. Efficacité comparable avec meilleur profil de tolérance.'
    });
  }
  
  if (diagnostic.includes('Hypocontractilité détrusorienne')) {
    
    traitements.push({
      label: 'Aucun traitement pharmacologique validé',
      tooltip: 'Aucun médicament n\'a démontré d\'efficacité significative dans la restauration de la contractilité détrusorienne.'
    });
    
    traitements.push({
      label: 'Essai de parasympathomimétiques (bénéfice non prouvé, rarement utilisé)',
      tooltip: 'Médicaments stimulant le détrusor (ex. béthanéchol), parfois essayés en dernière intention, mais peu efficaces et mal tolérés.'
    });
  }

  if (diagnostic.includes('Obstruction prostatique')) {
    traitements.push({
      label: 'Tamsulosine 0,4 mg/jour',
      tooltip: 'La tamsulosine est un alpha-bloquant sélectif des récepteurs α1A prostatiques avec une prise unique quotidienne. Amélioration rapide des symptômes (1-2 semaines) et du débit urinaire. Effets secondaires : hypotension orthostatique (5%), troubles éjaculatoires (10%).'
    });
    
    if (data.profilPression.pressionUretrale > 80) {
      traitements.push({
        label: 'Association finastéride 5 mg/jour si prostate >40ml',
        tooltip: 'Le finastéride (inhibiteur 5α-réductase) réduit le volume prostatique de 20-30% en 6-12 mois. Indiqué si volume >40ml pour prévenir la progression et réduire le risque de rétention aiguë. Effets sur la libido (2-5%) et la fonction érectile (3-8%).'
      });
    }
  }

  // Nouveaux traitements pour l'obstruction liée au prolapsus
  if (diagnostic.includes('prolapsus génital')) {
    
    if (data.age > 70 || data.antecedents.includes('Contre-indication chirurgicale')) {
      traitements.push({
        label: 'Pessaire si contre-indication chirurgicale',
        tooltip: 'Le pessaire est un dispositif médical intra-vaginal qui soutient les organes prolabés. Indiqué chez les patientes âgées, à haut risque chirurgical ou refusant la chirurgie. Efficacité de 60-80% sur les symptômes obstructifs avec bonne tolérance.'
      });
    }
    
    if (data.etudePressionDebit.pressionDetrusorQmax > 40 || data.residuPostMictionnel > 80) {
      traitements.push({
        label: 'Chirurgie de correction du prolapsus en cas d\'échec du traitement conservateur',
        tooltip: 'La chirurgie de correction du prolapsus (promontofixation, colposuspension) est indiquée en cas d\'échec de la rééducation et de symptômes obstructifs invalidants. Amélioration des symptômes dans 85-90% des cas avec restauration d\'une vidange normale.'
      });
    }
  }

  if (diagnostic.includes('Incontinence d\'effort') || diagnostic.includes('mixte')) {
    traitements.push({
      label: 'Duloxétine 40 mg × 2/jour',
      tooltip: 'La duloxétine (inhibiteur de recapture sérotonine-noradrénaline) augmente le tonus sphinctérien urétral par action centrale. Réduction de 50% des épisodes d\'incontinence chez 60% des patientes. Effets secondaires : nausées (25%), fatigue (15%). Traitement de 2ème intention.'
    });
  }

  if (diagnostic.includes('Douloureux vésical')) {
    traitements.push({
      label: 'Instillations vésicales d\'acide hyaluronique',
      tooltip: 'L\'acide hyaluronique restaure la couche de glycosaminoglycanes de l\'urothélium, réduisant la perméabilité vésicale et l\'inflammation. Protocole : 8 instillations hebdomadaires puis entretien mensuel. Amélioration des douleurs dans 60-70% des cas de cystite interstitielle.'
    });
  }

  return traitements;
}

function genererSurveillance(data: PatientData, diagnostic: string): Array<{ label: string; tooltip: string }> {
  const surveillance: Array<{ label: string; tooltip: string }> = [];

  surveillance.push({
    label: 'Calendrier mictionnel sur 3 jours, à répéter après 3 mois de traitement',
    tooltip: 'Relevé détaillé des horaires, volumes urinés, épisodes d\'urgence ou fuites sur 72 heures. Permet d\'évaluer l\’efficacité d\’un traitement et l\’évolution des symptômes. À renouveler 3 mois après l\’initiation thérapeutique pour objectiver l\’amélioration ou ajuster la prise en charge.'
  });

  if (data.residuPostMictionnel > 50) {
    surveillance.push({
      label: 'Mesure échographique du résidu post-mictionnel',
      tooltip: 'La surveillance du RPM par échographie sus-pubienne permet de détecter une aggravation de la vidange vésicale. Fréquence : mensuelle si RPM >100ml, trimestrielle si RPM 50-100ml. RPM >150ml de façon répétée nécessite une réévaluation thérapeutique.'
    });
  }

  // Surveillance spécifique pour l'obstruction liée au prolapsus
  if (diagnostic.includes('prolapsus génital')) {
    
    surveillance.push({
      label: 'Débitmétrie libre à 6 mois',
      tooltip: 'La débitmétrie libre de contrôle permet d\'objectiver l\'amélioration du débit urinaire après traitement conservateur du prolapsus. Objectif : Qmax >15 ml/s avec amélioration de la forme de la courbe débitmétrique.'
    });
  }

  if (diagnostic.includes('neurologique') || data.antecedents.some(ant => ['Traumatisme médullaire', 'Spina bifida'].includes(ant))) {
    surveillance.push({
      label: 'Fonction rénale (créatinine, échographie) semestrielle',
      tooltip: 'Dans les vessies neurologiques, la surveillance de la fonction rénale est cruciale car 10-15% développent une insuffisance rénale chronique. Créatinine sérique, échographie rénale et parfois scintigraphie DMSA. Objectif : pressions vésicales <40 cmH2O.'
    });
  }

  if (diagnostic.includes('Obstruction')) {
    surveillance.push({
      label: 'Débitmétrie libre annuelle',
      tooltip: 'Suivi annuel de la qualité de la miction. La débitmétrie libre permet de dépister une récidive d’obstruction ou une dégradation fonctionnelle progressive. Un Qmax <10 ml/s évoque une aggravation nécessitant une réévaluation. Examen simple, non invasif, réalisable en consultation.'
    });
  }

  return surveillance;
}

function genererPieges(data: PatientData, diagnostic: string): Array<{ label: string; tooltip: string }> {
  const pieges: Array<{ label: string; tooltip: string }> = [];

  pieges.push({
    label: 'Ne pas interpréter un Qmax faible avec un petit volume vidé',
    tooltip: 'Un Qmax <15 ml/s n\'est significatif que si le volume vidé est >150ml. Avec un petit volume (<150ml), le Qmax peut être artificiellement bas sans signification pathologique. Toujours corréler Qmax et volume pour une interprétation correcte.'
  });

  // Nouveaux pièges pour l'obstruction liée au prolapsus
  if (diagnostic.includes('prolapsus génital')) {
    pieges.push({
      label: 'Ne pas ignorer un prolapsus modéré pouvant masquer une obstruction',
      tooltip: 'Un prolapsus génital modéré peut provoquer une obstruction fonctionnelle discrète, souvent sous-estimée cliniquement. L\'association symptômes obstructifs + antécédents de prolapsus + index urodynamiques limites doit faire évoquer cette étiologie.'
    });
    
    pieges.push({
      label: 'Toujours corréler clinique et données urodynamiques',
      tooltip: 'Dans l\'obstruction liée au prolapsus, les index urodynamiques peuvent être dans la zone équivoque. L\'interprétation doit intégrer les symptômes, l\'examen clinique et les antécédents gynécologiques pour poser le bon diagnostic.'
    });
  }

  if (data.debitMetrie.formeDebitmetrie === 'intermittente') {
    pieges.push({
      label: 'Différencier dyssynergie vraie et poussées abdominales',
      tooltip: 'Une courbe débitmétrique intermittente peut être due à une dyssynergie vésico-sphinctérienne (pathologique) ou à des poussées abdominales volontaires (artéfact). L\'EMG périnéal et l\'analyse des pressions abdominales permettent la différenciation.'
    });
  }

  if (data.cystometrie.contractionsInvolontaires === 'presentes') {
    pieges.push({
      label: 'Éliminer les artefacts de remplissage rapide',
      tooltip: 'Des contractions détrusoriennes peuvent être artéfactuellement induites par un remplissage trop rapide (>50 ml/min) ou une irritation par la sonde. Confirmer l\'hyperactivité par un remplissage lent et répéter l\'examen si nécessaire.'
    });
  }
  
  if (diagnostic.includes('Hypocontractilité détrusorienne')) {
	pieges.push({
	  label: 'Ne pas confondre hypocontractilité avec obstruction en cas de symptômes similaires',
	  tooltip: 'Une obstruction et une vessie hypoactive peuvent se présenter par des symptômes identiques ; seule la pression-débit fait la distinction.'
	});
	pieges.push({
	  label: 'Écarter une cause médicamenteuse (anticholinergiques, opiacés)',
	  tooltip: 'Certains traitements freinent le détrusor et peuvent mimer une hypocontractilité vraie.'
	});
  }

  if (diagnostic.includes('Incontinence d\'effort') || diagnostic.includes('mixte')) {    
    // Nouveaux pièges pour l'incontinence mixte
    if (diagnostic.includes('mixte') || data.profilPression.pressionClotureUretrale < 20) {
      pieges.push({
        label: 'Ne pas ignorer une composante sphinctérienne associée en cas de pression de clôture basse',
        tooltip: 'Une pression de clôture <20 cmH2O évoque une faiblesse sphinctérienne pouvant expliquer les fuites à l\'effort, même en présence d\'hyperactivité détrusorienne prédominante.'
      });
    }
    
    if (diagnostic.includes('mixte')) {
      pieges.push({
        label: 'Différencier fuites à l\'effort vraies et poussées liées à une urgence mal contrôlée',
        tooltip: 'Certaines patientes rapportent des fuites à l\'effort alors qu\'il s\'agit en fait d\'un besoin urgent déclenché par le mouvement ou l\'effort. L\'interrogatoire précis et les tests de provocation permettent la distinction.'
      });
    }
  }

  return pieges;
}

function detecterAlertesCritiques(data: PatientData): string[] {
  const alertes: string[] = [];

  if (data.residuPostMictionnel > 200) {
    alertes.push('Résidu post-mictionnel très élevé : risque de rétention chronique et d\'atteinte du haut appareil urinaire');
  }

  if (data.etudePressionDebit.pressionDetrusorQmax > 80) {
    alertes.push('Pression détrusorienne très élevée : risque de retentissement sur le haut appareil urinaire');
  }

  if (data.cystometrie.compliance < 10) {
    alertes.push('Compliance vésicale très réduite : risque de détérioration de la fonction rénale');
  }

  if (data.profilPression.pressionClotureUretrale < 10 && data.sexe === 'F') {
    alertes.push('Insuffisance sphinctérienne sévère : risque d\'incontinence majeure');
  }

  return alertes;
}