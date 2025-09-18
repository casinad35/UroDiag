import { Question } from '../types';

export const questions: Question[] = [
  // Section A — SENSOVISC®
  {
    id: 1,
    section: "SENSOVISC®",
    question: "Qu'est-ce que SENSOVISC® ?",
    options: [
      "Un gel contenant du hyaluronate de sodium purifié destiné à l'injection intra-articulaire",
      "Un médicament anti-inflammatoire oral",
      "Une crème topique pour l'arthrose",
      "Une prothèse articulaire temporaire"
    ],
    correctAnswers: [0],
    explication: "SENSOVISC® est un gel injectable contenant du hyaluronate de sodium utilisé en injection intra-articulaire.",
    multipleChoice: false
  },
  {
    id: 2,
    section: "SENSOVISC®",
    question: "Quels sont les principaux effets de SENSOVISC® sur l'articulation ?",
    options: [
      "Soulagement prolongé de la douleur et amélioration de la lubrification",
      "Régénération complète du cartilage",
      "Réduction de l'acidité du liquide synovial",
      "Blocage de l'inflammation en moins de 24 heures"
    ],
    correctAnswers: [0],
    explication: "Il améliore la lubrification et réduit la douleur; il n'obtient pas une régénération complète instantanée.",
    multipleChoice: false
  },
  {
    id: 3,
    section: "SENSOVISC®",
    question: "Combien de temps après l'injection de SENSOVISC® les effets bénéfiques peuvent-ils être ressentis ?",
    options: [
      "En quelques heures",
      "Après quelques semaines et l'efficacité pourra durer jusqu'à un an",
      "Immédiatement après l'injection",
      "Après plusieurs années"
    ],
    correctAnswers: [1],
    explication: "Les bénéfices apparaissent souvent après quelques semaines et peuvent durer plusieurs mois à un an.",
    multipleChoice: false
  },
  {
    id: 4,
    section: "SENSOVISC®",
    question: "Pourquoi SENSOVISC® est-il considéré comme sûr pour les patients ?",
    options: [
      "Il est d'origine végétale",
      "Il est stérile, non-pyrogène et sans origine animale",
      "Il est absorbé par les muscles au lieu des articulations",
      "Il est utilisé en complément de la morphine"
    ],
    correctAnswers: [1],
    explication: "Sa fabrication garantit qu'il est stérile, non pyrogène et sans origine animale, réduisant les risques immunologiques.",
    multipleChoice: false
  },
  {
    id: 5,
    section: "SENSOVISC®",
    question: "Quel est le dosage de SENSOVISC® ?",
    options: [
      "20 mg seulement",
      "40 mg et 75 mg",
      "32 mg et 60 mg",
      "20, 32, 40, 60 & 75 mg"
    ],
    correctAnswers: [3],
    explication: "SENSOVISC® existe en plusieurs dosages ; l'option la plus complète liste les dosages disponibles.",
    multipleChoice: false
  },
  // Section B — SpeediCath®
  {
    id: 6,
    section: "SpeediCath®",
    question: "Quelle est la particularité de toutes les sondes SpeediCath® ?",
    options: [
      "Autolubrifiée, hydrophile, prête à l'emploi, avec un revêtement qui reste collé, lisse et hydraté",
      "Nécessitent une activation du revêtement par de l'eau et un temps d'attente avant utilisation",
      "Lubrifiées par un simple gel"
    ],
    correctAnswers: [0],
    explication: "Les sondes SpeediCath® sont prêtes à l'emploi avec un revêtement hydrophile unique.",
    multipleChoice: false
  },
  {
    id: 7,
    section: "SpeediCath®",
    question: "Quelles sont les particularités du revêtement des sondes SpeediCath® ? (Plusieurs réponses possibles)",
    options: [
      "Hydrophile",
      "Unique breveté",
      "Homogène sur toute la surface et les œillets",
      "Augmente la friction et le traumatisme urétral"
    ],
    correctAnswers: [0, 1, 2],
    explication: "Le revêtement hydrophile breveté est homogène et conçu pour diminuer la friction et le traumatisme (donc D est faux).",
    multipleChoice: true
  },
  {
    id: 8,
    section: "SpeediCath®",
    question: "Quelles sont les caractéristiques générales de SpeediCath® ? (Plusieurs réponses possibles)",
    options: [
      "Réduisent le risque d'infections urinaires",
      "Réduisent le risque de traumatisme urétral",
      "Offrent une meilleure satisfaction aux patients",
      "Moins de complications = durée d'hospitalisation plus courte",
      "Augmentent le recours aux antibiotiques",
      "Préservent l'environnement et la santé"
    ],
    correctAnswers: [0, 1, 2, 3, 5],
    explication: "SpeediCath® vise à diminuer les complications et améliorer la satisfaction; il ne favorise pas l'usage d'antibiotiques.",
    multipleChoice: true
  },
  {
    id: 9,
    section: "SpeediCath®",
    question: "SpeediCath® Standard : Pour qui sont-elles destinées ?",
    options: [
      "Femme, Homme, Enfant, Nourrissons - Toutes les réponses sont justes"
    ],
    correctAnswers: [0],
    explication: "Existe en modèles adaptés à tous les âges et sexes.",
    multipleChoice: false
  },
  {
    id: 10,
    section: "SpeediCath®",
    question: "SpeediCath® Flex : Quelles sont ses caractéristiques ?",
    options: [
      "Pointe en boule facilitant la navigation dans l'urètre masculin",
      "Technologie NO TOUCH pour éviter les contaminations",
      "Toutes les réponses sont justes"
    ],
    correctAnswers: [2],
    explication: "Flex facilite l'insertion chez l'homme et limite la contamination.",
    multipleChoice: false
  },
  {
    id: 11,
    section: "SpeediCath®",
    question: "SpeediCath® Compact : Quel est son avantage ?",
    options: [
      "Téléscopique",
      "Large poignée de préhension pour une meilleure prise en main",
      "La sonde la plus discrète au monde",
      "Toutes les réponses sont justes"
    ],
    correctAnswers: [3],
    explication: "Compact est pensé pour la discrétion et la commodité.",
    multipleChoice: false
  },
  // Section C — HC Italia Maestro
  {
    id: 12,
    section: "HC Italia Maestro",
    question: "Quelles sont les caractéristiques de l'appareil HC Italia Maestro ?",
    options: [
      "Made in Italy",
      "Présence mondiale de 20 ans",
      "Dispose de tous les examens urodynamiques et d'une connexion sans fil",
      "Toutes les réponses sont justes"
    ],
    correctAnswers: [3],
    explication: "Le Maestro est un système italien complet, utilisé mondialement et offrant une large palette d'examens et connectivité.",
    multipleChoice: false
  }
];