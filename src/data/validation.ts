// Fonctions de validation des données urodynamiques
import { PatientData, ValidationResult } from './types';
import { VALEURS_NORMALES } from './constants';

export function validerDonneesUrodynamiques(data: PatientData): ValidationResult {
  const erreurs: string[] = [];
  const avertissements: string[] = [];

  // Validation des antécédents selon le sexe
  const antecedentsMasculins = ['HBP', 'Prostatectomie', 'Cancer prostate', 'Prostatite', 'Résection prostatique', 'Adénomectomie'];
  const antecedentsFeminins = ['Hystérectomie', 'Césarienne', 'Accouchements difficiles', 'Épisiotomie', 'Prolapsus génital', 'Ménopause', 'Cystocèle', 'Rectocèle', 'Chirurgie anti-incontinence', 'Érosion de bandelette', 'Accouchements multiples', 'Cancer col utérin', 'Hystérectomie radicale'];

  if (data.sexe === 'M') {
    const antecedentsFemininsPresents = data.antecedents.filter(ant => antecedentsFeminins.includes(ant));
    if (antecedentsFemininsPresents.length > 0) {
      erreurs.push(`Incohérence: antécédents féminins (${antecedentsFemininsPresents.join(', ')}) chez un patient masculin`);
    }
  } else if (data.sexe === 'F') {
    const antecedentsMasculinsPresents = data.antecedents.filter(ant => antecedentsMasculins.includes(ant));
    if (antecedentsMasculinsPresents.length > 0) {
      erreurs.push(`Incohérence: antécédents masculins (${antecedentsMasculinsPresents.join(', ')}) chez une patiente féminine`);
    }
  }

  // Validation des symptômes selon le sexe
  const symptomesMasculins = ['Prostatisme'];
  const symptomesFeminins = ['Pesanteur pelvienne'];

  if (data.sexe === 'M') {
    const symptomesFemininsPresents = data.symptomes.filter(symp => symptomesFeminins.includes(symp));
    if (symptomesFemininsPresents.length > 0) {
      avertissements.push(`Symptômes peu cohérents chez un homme: ${symptomesFemininsPresents.join(', ')}`);
    }
  } else if (data.sexe === 'F') {
    const symptomesMasculinsPresents = data.symptomes.filter(symp => symptomesMasculins.includes(symp));
    if (symptomesMasculinsPresents.length > 0) {
      avertissements.push(`Symptômes peu cohérents chez une femme: ${symptomesMasculinsPresents.join(', ')}`);
    }
  }

  // Validation des traitements selon le sexe
  const traitementsMasculins = ['Inhibiteurs 5-alpha-réductase'];
  const traitementsFeminins = ['THS', 'Œstrogènes locaux', 'Pessaire'];

  if (data.sexe === 'M') {
    const traitementsFemininsPresents = data.traitements.filter(trait => traitementsFeminins.includes(trait));
    if (traitementsFemininsPresents.length > 0) {
      avertissements.push(`Traitements peu cohérents chez un homme: ${traitementsFemininsPresents.join(', ')}`);
    }
  } else if (data.sexe === 'F') {
    const traitementsMasculinsPresents = data.traitements.filter(trait => traitementsMasculins.includes(trait));
    if (traitementsMasculinsPresents.length > 0) {
      avertissements.push(`Traitements peu cohérents chez une femme: ${traitementsMasculinsPresents.join(', ')}`);
    }
  }

  // Validation longueur urétrale selon le sexe
  if (data.sexe === 'M' && data.profilPression.longueurUretrale < 150) {
    erreurs.push(`Longueur urétrale trop courte pour un homme: ${data.profilPression.longueurUretrale}mm (minimum 150mm)`);
  } else if (data.sexe === 'F' && data.profilPression.longueurUretrale > 60) {
    erreurs.push(`Longueur urétrale trop longue pour une femme: ${data.profilPression.longueurUretrale}mm (maximum 60mm)`);
  }

  // Validation des pressions urétrales selon le sexe
  if (data.sexe === 'M') {
    if (data.profilPression.pressionUretrale < 40 || data.profilPression.pressionUretrale > 150) {
      avertissements.push(`Pression urétrale hors limites pour un homme: ${data.profilPression.pressionUretrale} cmH2O (normal: 40-150)`);
    }
  } else if (data.sexe === 'F') {
    if (data.profilPression.pressionUretrale < 30 || data.profilPression.pressionUretrale > 120) {
      avertissements.push(`Pression urétrale hors limites pour une femme: ${data.profilPression.pressionUretrale} cmH2O (normal: 30-120)`);
    }
  }

  // Validations mathématiques critiques
  if (data.cystometrie.pressionVesicale !== data.cystometrie.pressionDetrusor + data.cystometrie.pressionAbdominale) {
    erreurs.push(`Erreur de calcul: Pves (${data.cystometrie.pressionVesicale}) ≠ Pdet (${data.cystometrie.pressionDetrusor}) + Pabd (${data.cystometrie.pressionAbdominale})`);
  }

  if (data.debitMetrie.qMoyen > data.debitMetrie.qMax) {
    erreurs.push(`Impossible: le débit moyen (${data.debitMetrie.qMoyen}ml/s) ne peut pas être supérieur au débit maximum (${data.debitMetrie.qMax}ml/s)`);
  }

  if (data.profilPression.pressionClotureUretrale > data.profilPression.pressionUretrale) {
    erreurs.push(`Impossible: la pression de clôture (${data.profilPression.pressionClotureUretrale}) ne peut pas être supérieure à la pression urétrale max (${data.profilPression.pressionUretrale})`);
  }

  if (data.profilPression.longueurFonctionnelle > data.profilPression.longueurUretrale) {
    erreurs.push(`Impossible: la longueur fonctionnelle (${data.profilPression.longueurFonctionnelle}mm) ne peut pas être supérieure à la longueur totale (${data.profilPression.longueurUretrale}mm)`);
  }

  if (data.residuPostMictionnel > data.debitMetrie.volumeVide) {
    erreurs.push(`Impossible: le résidu post-mictionnel (${data.residuPostMictionnel}ml) ne peut pas être supérieur au volume vidé (${data.debitMetrie.volumeVide}ml)`);
  }

  if (data.debitMetrie.tempsJusquQmax && data.debitMetrie.tempsJusquQmax > data.debitMetrie.tempsVidange) {
    erreurs.push(`Impossible: le temps jusqu'au Qmax (${data.debitMetrie.tempsJusquQmax}s) ne peut pas être supérieur au temps total de vidange (${data.debitMetrie.tempsVidange}s)`);
  }

  if (data.cystometrie.premierBesoin > data.cystometrie.besoinNormal) {
    erreurs.push(`Impossible: le premier besoin (${data.cystometrie.premierBesoin}ml) ne peut pas être supérieur au besoin normal (${data.cystometrie.besoinNormal}ml)`);
  }

  if (data.cystometrie.besoinNormal > data.cystometrie.capaciteVesicale) {
    erreurs.push(`Impossible: le besoin normal (${data.cystometrie.besoinNormal}ml) ne peut pas être supérieur à la capacité vésicale (${data.cystometrie.capaciteVesicale}ml)`);
  }

  // Validations d'incohérences (avertissements)
  if (data.debitMetrie.qMax < 5) {
    avertissements.push(`Qmax très faible (${data.debitMetrie.qMax}ml/s): vérifier obstruction ou hypocontractilité`);
  }

  if (data.debitMetrie.qMax > 35) {
    avertissements.push(`Qmax très élevé (${data.debitMetrie.qMax}ml/s): vérifier la mesure`);
  }

  if (data.cystometrie.compliance < 10) {
    avertissements.push(`Compliance très réduite (${data.cystometrie.compliance}ml/cmH2O): évoque fibrose vésicale`);
  }

  if (data.cystometrie.capaciteVesicale < 200) {
    avertissements.push(`Capacité vésicale très réduite (${data.cystometrie.capaciteVesicale}ml): vérifier pathologie inflammatoire`);
  }

  if (data.cystometrie.capaciteVesicale > 800) {
    avertissements.push(`Capacité vésicale très augmentée (${data.cystometrie.capaciteVesicale}ml): évoque vessie neurologique ou obstruction chronique`);
  }

  if (data.residuPostMictionnel > 100) {
    avertissements.push(`RPM élevé (${data.residuPostMictionnel}ml): évoque vidange incomplète`);
  }

  if (data.etudePressionDebit.pressionDetrusorQmax > 100) {
    avertissements.push(`Pression détrusor très élevée au Qmax (${data.etudePressionDebit.pressionDetrusorQmax}cmH2O): vérifier obstruction sévère`);
  }

  if (data.debitMetrie.tempsVidange > 120) {
    avertissements.push(`Temps de vidange très prolongé (${data.debitMetrie.tempsVidange}s): évoque obstruction ou hypocontractilité`);
  }

  return {
    coherence: erreurs.length === 0,
    erreurs,
    avertissements
  };
}

export function validerCoherenceTemplateSexe(templateId: string, sexe: 'M' | 'F'): string | null {
  // Templates spécifiques aux hommes
  const templatesMasculins = ['obstruction_prostatique'];
  
  // Templates spécifiques aux femmes - SUPPRIMÉ incontinence_effort car existe chez l'homme aussi
  const templatesFeminins: string[] = [];

  if (templatesMasculins.includes(templateId) && sexe === 'F') {
    return `Le template "${templateId}" est spécifique aux patients masculins`;
  }

  if (templatesFeminins.includes(templateId) && sexe === 'M') {
    return `Le template "${templateId}" est spécifique aux patientes féminines`;
  }

  return null;
}

// Fonction pour nettoyer les avertissements lors du changement de template
export function nettoyerAvertissementsTemplate(avertissements: string[]): string[] {
  return avertissements.filter(avert => 
    !avert.includes('Dyssynergie sans antécédent neurologique évident')
  );
}