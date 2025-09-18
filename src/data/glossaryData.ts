export const GLOSSAIRE_COMPLET = {
  // Débitmétrie
  "Qmax (Débit maximum)": {
    definition: "Débit urinaire maximum atteint pendant la miction, paramètre clé de l'évaluation de la fonction vésico-sphinctérienne.",
    unite: "ml/s",
    valeursNormales: "Homme: >15 ml/s, Femme: >15 ml/s (volume >150ml)",
    obtention: "Mesuré par débitmètre libre ou lors de l'étude pression-débit. Le patient urine dans un débitmètre qui enregistre le débit en continu.",
    interpretation: "Qmax <10 ml/s évoque une obstruction ou une hypocontractilité détrusorienne. Qmax >25 ml/s est généralement normal. Doit être interprété avec le volume vidé et la pression détrusorienne."
  },
  
  "Q moyen (Débit moyen)": {
    definition: "Débit urinaire moyen calculé sur l'ensemble de la miction, reflète la performance globale de la vidange vésicale.",
    unite: "ml/s",
    valeursNormales: "Généralement 50-70% du Qmax",
    obtention: "Calculé automatiquement par le débitmètre : Volume total vidé / Temps de miction",
    interpretation: "Un rapport Qmoyen/Qmax <0.5 peut indiquer une miction intermittente ou une obstruction. Utile pour évaluer la qualité globale de la miction."
  },

  "Volume vidé": {
    definition: "Volume total d'urine évacué pendant la miction, paramètre essentiel pour l'interprétation des autres mesures débitmètriques.",
    unite: "ml",
    valeursNormales: ">150 ml pour une interprétation fiable du Qmax",
    obtention: "Mesuré directement par le débitmètre ou par pesée",
    interpretation: "Volume <150ml rend l'interprétation du Qmax peu fiable. Volume très élevé peut masquer une obstruction. Doit être corrélé avec la capacité vésicale."
  },

  "Temps de miction": {
    definition: "Durée totale de la miction, du début à la fin de l'écoulement urinaire.",
    unite: "secondes",
    valeursNormales: "Variable selon le volume, généralement <60s pour 300-400ml",
    obtention: "Enregistré automatiquement par le débitmètre",
    interpretation: "Temps prolongé peut indiquer obstruction ou hypocontractilité. Temps très court avec gros volume évoque hypercontractilité ou incontinence."
  },

  "Temps de latence": {
    definition: "Délai entre le début de l'enregistrement et le début effectif de la miction.",
    unite: "secondes",
    valeursNormales: "<10 secondes",
    obtention: "Mesuré du début de l'enregistrement au premier débit détectable",
    interpretation: "Temps prolongé peut indiquer difficulté d'initiation mictionnelle, anxiété ou dysfonction neurologique."
  },

  "Forme de la courbe débitmétrique": {
    definition: "Aspect morphologique de la courbe débit/temps, reflétant le mécanisme de la miction.",
    unite: "Descriptif",
    valeursNormales: "Courbe en cloche avec montée rapide et descente progressive",
    obtention: "Analyse visuelle de la courbe débitmétrique",
    interpretation: "Courbe en plateau évoque obstruction, courbe intermittente suggère dyssynergie ou poussées abdominales, courbe en dents de scie indique instabilité détrusorienne."
  },

  // Cystométrie
  "Capacité vésicale cystométrique": {
    definition: "Volume vésical au moment où le patient ressent un besoin impérieux de miction ou décide d'uriner.",
    unite: "ml",
    valeursNormales: "300-600 ml",
    obtention: "Mesurée lors du remplissage vésical contrôlé en cystométrie",
    interpretation: "Capacité <300ml évoque vessie hyperactive ou compliance réduite. Capacité >600ml peut indiquer hypoesthésie vésicale ou obstruction chronique."
  },

  "Pression détrusorienne": {
    definition: "Pression générée par la contraction du muscle détrusor, calculée en soustrayant la pression abdominale de la pression vésicale.",
    unite: "cmH2O",
    valeursNormales: "Au repos: <15 cmH2O, À la miction: 20-40 cmH2O",
    obtention: "Pdet = Pves - Pabd (mesure simultanée des pressions vésicale et abdominale)",
    interpretation: "Pression élevée au repos évoque hyperactivité détrusorienne. Pression faible à la miction suggère hypocontractilité. Pression très élevée à la miction indique obstruction."
  },

  "Pression vésicale": {
    definition: "Pression intravésicale totale mesurée par sonde vésicale, incluant les pressions détrusorienne et abdominale.",
    unite: "cmH2O",
    valeursNormales: "Variable selon le remplissage et l'activité abdominale",
    obtention: "Mesurée directement par cathéter intravésical relié à un capteur de pression",
    interpretation: "Doit toujours être interprétée en relation avec la pression abdominale pour calculer la pression détrusorienne vraie."
  },

  "Pression abdominale": {
    definition: "Pression intra-abdominale mesurée par sonde rectale ou vaginale, reflétant les variations de pression liées aux mouvements, respiration, contractions abdominales.",
    unite: "cmH2O",
    valeursNormales: "Variable, généralement 5-20 cmH2O au repos",
    obtention: "Mesurée par cathéter rectal ou vaginal avec ballonnet gonflé",
    interpretation: "Permet de différencier les variations de pression vésicale dues au détrusor de celles dues aux pressions abdominales. Essentielle pour le calcul de Pdet."
  },

  "Compliance vésicale": {
    definition: "Capacité de la vessie à se distendre avec une augmentation minimale de pression, reflétant l'élasticité de la paroi vésicale.",
    unite: "ml/cmH2O",
    valeursNormales: ">20 ml/cmH2O",
    obtention: "Calculée : ΔVolume / ΔPression détrusorienne pendant le remplissage",
    interpretation: "Compliance réduite (<20) évoque fibrose vésicale, cystite radique, tuberculose. Compliance très élevée peut indiquer vessie neurologique acontractile."
  },

  "Contractions détrusoriennes involontaires": {
    definition: "Contractions spontanées du détrusor pendant la phase de remplissage, non inhibées par le patient.",
    unite: "Présence/Absence, Amplitude en cmH2O",
    valeursNormales: "Absentes",
    obtention: "Détectées lors de la cystométrie de remplissage comme élévations de la pression détrusorienne",
    interpretation: "Présence évoque hyperactivité détrusorienne (vessie hyperactive). Amplitude >15 cmH2O généralement symptomatique. Peuvent être neurogeniques ou idiopathiques."
  },

  "Sensibilité vésicale": {
    definition: "Capacité du patient à percevoir le remplissage vésical et les différents niveaux de réplétion.",
    unite: "ml (volumes de sensation)",
    valeursNormales: "Premier besoin: 100-200ml, Besoin normal: 200-400ml",
    obtention: "Rapportée par le patient pendant la cystométrie de remplissage",
    interpretation: "Hypoesthésie (sensations retardées) évoque atteinte neurologique. Hyperesthésie (sensations précoces) suggère inflammation ou hypersensibilité vésicale."
  },

  "Premier besoin mictionnel": {
    definition: "Volume vésical auquel le patient ressent la première sensation de besoin d'uriner.",
    unite: "ml",
    valeursNormales: "100-200 ml",
    obtention: "Rapporté par le patient lors de la cystométrie de remplissage",
    interpretation: "Premier besoin précoce (<100ml) évoque hypersensibilité ou inflammation. Premier besoin tardif (>250ml) suggère hypoesthésie neurologique."
  },

  "Besoin normal de miction": {
    definition: "Volume vésical auquel le patient ressent un besoin normal d'uriner, correspondant à une miction physiologique.",
    unite: "ml",
    valeursNormales: "200-400 ml",
    obtention: "Rapporté par le patient lors de la cystométrie",
    interpretation: "Besoin normal précoce évoque vessie hyperactive. Besoin normal tardif peut indiquer hypoesthésie ou grande capacité vésicale."
  },

  "Capacité cystométrique maximale": {
    definition: "Volume maximal que peut contenir la vessie avant miction impérieuse ou fuite, mesuré en cystométrie.",
    unite: "ml",
    valeursNormales: "400-600 ml",
    obtention: "Volume au moment où le patient ne peut plus retenir ou présente des fuites",
    interpretation: "Capacité réduite évoque vessie hyperactive ou compliance diminuée. Capacité très augmentée peut indiquer vessie neurologique ou obstruction chronique."
  },

  // Profil de pression urétral
  "Pression urétrale maximale": {
    definition: "Pression la plus élevée mesurée le long de l'urètre, généralement au niveau du sphincter externe.",
    unite: "cmH2O",
    valeursNormales: "Homme: 60-120 cmH2O, Femme: 40-100 cmH2O",
    obtention: "Mesurée par retrait lent d'un cathéter à capteur de pression de la vessie vers le méat",
    interpretation: "Pression élevée peut indiquer hypertonie sphinctérienne. Pression faible évoque insuffisance sphinctérienne ou atteinte neurologique."
  },

  "Pression de clôture urétrale": {
    definition: "Différence entre la pression urétrale maximale et la pression vésicale, reflétant la capacité de fermeture de l'urètre.",
    unite: "cmH2O",
    valeursNormales: "Homme: 40-80 cmH2O, Femme: 20-60 cmH2O",
    obtention: "Calculée : Pression urétrale maximale - Pression vésicale",
    interpretation: "Pression de clôture faible (<20 cmH2O) évoque insuffisance sphinctérienne et risque d'incontinence d'effort. Valeur élevée peut indiquer obstruction."
  },

  "Longueur urétrale fonctionnelle": {
    definition: "Longueur du segment urétral où la pression est supérieure à la pression vésicale, assurant la continence.",
    unite: "mm",
    valeursNormales: "Homme: 15-35 mm, Femme: 25-45 mm",
    obtention: "Mesurée lors du profil de pression urétral",
    interpretation: "Longueur réduite augmente le risque d'incontinence d'effort. Importante pour planifier les traitements chirurgicaux de l'incontinence."
  },

  "Longueur urétrale anatomique": {
    definition: "Longueur totale de l'urètre du col vésical au méat urétral.",
    unite: "mm",
    valeursNormales: "Homme: 18-24 cm, Femme: 3-5 cm",
    obtention: "Mesurée lors du retrait du cathéter de pression",
    interpretation: "Longueur réduite peut être congénitale ou acquise (chirurgie, traumatisme). Influence la technique chirurgicale."
  },

  "Pression de transmission": {
    definition: "Pourcentage de transmission de la pression abdominale à l'urètre, reflétant l'efficacité du mécanisme de continence à l'effort.",
    unite: "%",
    valeursNormales: ">90%",
    obtention: "Calculée lors des manœuvres d'effort : (Δ Pression urétrale / Δ Pression abdominale) × 100",
    interpretation: "Transmission <90% évoque défaut de soutien urétral et prédispose à l'incontinence d'effort. Importante pour le choix thérapeutique."
  },

  // EMG périnéal
  "Activité EMG basale": {
    definition: "Activité électromyographique du sphincter externe au repos, reflétant le tonus sphinctérien de base.",
    unite: "μV",
    valeursNormales: "Activité tonique présente",
    obtention: "Enregistrement EMG par électrodes de surface ou aiguille au repos",
    interpretation: "Absence d'activité évoque dénervation. Activité excessive peut indiquer dyssynergie ou anxiété. Activité normale assure la continence de repos."
  },

  "Recrutement volontaire EMG": {
    definition: "Capacité d'augmentation volontaire de l'activité EMG sphinctérienne lors de la contraction périnéale.",
    unite: "Rapport d'amplitude",
    valeursNormales: "Augmentation >2-3 fois l'activité basale",
    obtention: "Comparaison EMG repos vs contraction volontaire maximale",
    interpretation: "Recrutement faible évoque faiblesse musculaire ou atteinte neurologique. Bon recrutement indique intégrité neuromusculaire et potentiel de rééducation."
  },

  "Réflexe bulbo-caverneux EMG": {
    definition: "Réponse EMG sphinctérienne à la stimulation du gland ou du clitoris, testant l'intégrité de l'arc réflexe sacré.",
    unite: "Présent/Absent, Latence en ms",
    valeursNormales: "Présent, Latence <40 ms",
    obtention: "Stimulation électrique du nerf dorsal de la verge/clitoris et enregistrement EMG",
    interpretation: "Absence évoque lésion neurologique sacrée. Latence prolongée suggère démyélinisation. Présent indique intégrité de l'arc réflexe S2-S4."
  },

  "Synergie détrusor-sphincter": {
    definition: "Coordination normale entre relaxation sphinctérienne et contraction détrusorienne pendant la miction.",
    unite: "Normale/Dyssynergie",
    valeursNormales: "Synergie normale",
    obtention: "Analyse simultanée EMG sphinctérien et pression détrusorienne pendant la miction",
    interpretation: "Dyssynergie (contraction sphinctérienne pendant miction détrusorienne) évoque atteinte neurologique suprasacrée. Cause d'obstruction fonctionnelle."
  },

  // Étude pression-débit
  "Pression détrusorienne au Qmax": {
    definition: "Pression détrusorienne mesurée au moment du débit maximum, paramètre clé pour évaluer l'obstruction.",
    unite: "cmH2O",
    valeursNormales: "<40 cmH2O",
    obtention: "Lecture de la pression détrusorienne au moment précis du Qmax lors de l'étude pression-débit",
    interpretation: "Pdet.Qmax >40 cmH2O évoque obstruction. Pdet.Qmax <20 cmH2O avec Qmax faible suggère hypocontractilité. Doit être interprétée avec les nomogrammes."
  },

  "Index d'obstruction de Abrams-Griffiths": {
    definition: "Index calculé pour quantifier le degré d'obstruction : Pdet.Qmax - 2×Qmax.",
    unite: "Sans unité",
    valeursNormales: "<20 (non obstrué), 20-40 (équivoque), >40 (obstrué)",
    obtention: "Calculé : Pression détrusorienne au Qmax - (2 × Qmax)",
    interpretation: "Index >40 indique obstruction certaine. Index <20 exclut obstruction significative. Zone 20-40 nécessite évaluation clinique complémentaire."
  },

  "Index de contractilité détrusorienne": {
    definition: "Index évaluant la force de contraction du détrusor : Pdet.Qmax + 5×Qmax.",
    unite: "Sans unité",
    valeursNormales: ">100 (contractilité normale)",
    obtention: "Calculé : Pression détrusorienne au Qmax + (5 × Qmax)",
    interpretation: "Index <100 évoque hypocontractilité détrusorienne. Index >150 indique contractilité forte. Utile pour différencier obstruction et hypocontractilité."
  },

  "Résistance urétrale": {
    definition: "Résistance à l'écoulement urinaire, calculée selon la loi d'Ohm hydraulique.",
    unite: "cmH2O.s/ml",
    valeursNormales: "<0.2 cmH2O.s/ml",
    obtention: "Calculée : Pression détrusorienne / Débit (généralement au Qmax)",
    interpretation: "Résistance élevée indique obstruction anatomique ou fonctionnelle. Résistance normale avec débit faible évoque hypocontractilité."
  },

  "Conductance urétrale": {
    definition: "Inverse de la résistance, reflétant la facilité d'écoulement urinaire.",
    unite: "ml/s/cmH2O",
    valeursNormales: ">5 ml/s/cmH2O",
    obtention: "Calculée : Débit / Pression détrusorienne",
    interpretation: "Conductance faible évoque obstruction. Conductance élevée indique écoulement libre. Paramètre alternatif à la résistance."
  },

  // Tests de provocation
  "Test à la toux": {
    definition: "Test évaluant l'incontinence d'effort par manœuvres de toux répétées à différents volumes vésicaux.",
    unite: "Positif/Négatif",
    valeursNormales: "Négatif",
    obtention: "Observation de fuites lors de toux avec vessie remplie à différents volumes",
    interpretation: "Test positif évoque incontinence d'effort. Volume de fuite renseigne sur la sévérité. Test négatif n'exclut pas l'incontinence d'effort."
  },

  "Pression de fuite à l'effort": {
    definition: "Pression abdominale minimale provoquant une fuite urinaire lors des manœuvres d'effort.",
    unite: "cmH2O",
    valeursNormales: ">60 cmH2O (pas de fuite)",
    obtention: "Mesure de la pression abdominale au moment de la première fuite lors d'efforts progressifs",
    interpretation: "Pression <60 cmH2O évoque insuffisance sphinctérienne sévère. Pression >90 cmH2O indique mécanisme sphinctérien relativement préservé."
  },

  "Test de Valsalva": {
    definition: "Manœuvre d'effort soutenu évaluant l'incontinence d'effort et la transmission des pressions.",
    unite: "Positif/Négatif, Pression en cmH2O",
    valeursNormales: "Pas de fuite",
    obtention: "Patient effectue manœuvre de Valsalva soutenue avec mesure des pressions",
    interpretation: "Fuite évoque incontinence d'effort. Permet d'évaluer la transmission des pressions abdominales à l'urètre."
  },

  // Paramètres généraux
  "Résidu post-mictionnel": {
    definition: "Volume d'urine restant dans la vessie après une miction spontanée complète.",
    unite: "ml",
    valeursNormales: "<50 ml",
    obtention: "Mesuré par échographie, cathétérisme ou scanner après miction",
    interpretation: "RPM >100ml évoque vidange incomplète (obstruction, hypocontractilité). RPM 50-100ml nécessite surveillance. RPM élevé augmente risque infectieux."
  },

  "Vitesse de remplissage": {
    definition: "Débit de perfusion utilisé pour remplir la vessie lors de la cystométrie.",
    unite: "ml/min",
    valeursNormales: "Lent: 10-20 ml/min, Moyen: 20-50 ml/min, Rapide: >50 ml/min",
    obtention: "Contrôlée par pompe de perfusion pendant la cystométrie",
    interpretation: "Vitesse lente plus physiologique mais examen plus long. Vitesse rapide peut masquer certaines anomalies ou créer des artefacts."
  },

  "Pression de fuite détrusorienne": {
    definition: "Pression détrusorienne à laquelle survient une fuite urinaire en l'absence de contraction détrusorienne volontaire.",
    unite: "cmH2O",
    valeursNormales: ">40 cmH2O",
    obtention: "Mesurée lors de la cystométrie de remplissage au moment de la fuite",
    interpretation: "Pression faible évoque insuffisance sphinctérienne. Pression élevée peut indiquer compliance réduite avec fuite par regorgement."
  },

  // Paramètres de cystométrie à différentes vitesses
  "Compliance à vitesse lente": {
    definition: "Compliance vésicale mesurée lors d'un remplissage lent (10-20 ml/min), plus proche des conditions physiologiques.",
    unite: "ml/cmH2O",
    valeursNormales: ">20 ml/cmH2O",
    obtention: "Calculée lors de cystométrie à remplissage lent",
    interpretation: "Compliance réduite à vitesse lente évoque pathologie pariétale vraie. Plus fiable que compliance à vitesse rapide."
  },

  "Contractions à vitesse rapide": {
    definition: "Contractions détrusoriennes involontaires provoquées ou révélées par un remplissage rapide.",
    unite: "Présence/Absence",
    valeursNormales: "Absentes",
    obtention: "Observées lors de cystométrie à remplissage rapide (>50 ml/min)",
    interpretation: "Contractions uniquement à vitesse rapide peuvent être artéfactuelles. Contractions à toutes vitesses évoquent hyperactivité vraie."
  },

  "Sensibilité à vitesse physiologique": {
    definition: "Sensations vésicales rapportées lors d'un remplissage à vitesse physiologique (20-50 ml/min).",
    unite: "ml (volumes de sensation)",
    valeursNormales: "Premier besoin: 100-200ml, Besoin normal: 200-400ml",
    obtention: "Rapportée par le patient lors de cystométrie à vitesse moyenne",
    interpretation: "Sensibilité la plus proche de la physiologie. Référence pour l'interprétation clinique des troubles sensitifs."
  }
};