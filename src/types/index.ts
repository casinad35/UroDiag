export interface Participant {
  id?: string;
  nom: string;
  prenom: string;
  specialite: string;
  structure: string;
  telephone: string;
  email?: string;
  consentement: boolean;
  createdAt?: string;
  score?: number;
  duree?: number;
  reponses?: QuizResponse[];
}

export interface Question {
  id: number;
  section: string;
  question: string;
  options: string[];
  correctAnswers: number[];
  explication: string;
  multipleChoice: boolean;
}

export interface QuizResponse {
  questionId: number;
  selectedAnswers: number[];
  correct: boolean;
  timeSpent: number;
  timeExpired: boolean;
}

export interface QuizResult {
  participant: Participant;
  score: number;
  totalQuestions: number;
  totalTime: number;
  responses: QuizResponse[];
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
}