export interface UserProfile {
  name: string;
  religion: string;
  education: string;
  country: string;
}

export interface Choice {
  id: string;
  text: string;
  scores: Record<string, number>;
}

export interface ThoughtExperiment {
  id: string;
  title: string;
  description: string;
  context: string;
  choices: Choice[];
}

export interface DimensionInfo {
  key: string;
  label: string;
  description: string;
  lowLabel: string;
  highLabel: string;
}

export interface PhilosophyMatch {
  name: string;
  description: string;
  score: number;
}

export interface SimilarFigure {
  name: string;
  description: string;
  match: number;
}

export interface Result {
  dimensions: Record<string, number>;
  maxDimension: string;
  philosophies: PhilosophyMatch[];
  similarFigures: SimilarFigure[];
  summary: string;
}

export interface SavedResult {
  id: string;
  timestamp: number;
  profile: UserProfile;
  result: Result;
  answers: Record<string, string>;
}
