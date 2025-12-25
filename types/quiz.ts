export type QuizStep = 
  | 'intro'
  | 'gender'
  | 'age'
  | 'height'
  | 'weight'
  | 'goal_weight'
  | 'activity'
  | 'diet_struggle'
  | 'mirror_feeling'
  | 'clothing_feeling'
  | 'physical_feeling'
  | 'social_shame'
  | 'hope_change'
  | 'past_failures'
  | 'analyzing'
  | 'sales';

export interface QuizData {
  name: string;
  gender: 'Homem' | 'Mulher';
  age: string;
  height: number;
  weight: number;
  goal_weight: number;
  activity: 'Sedentário' | 'Leve' | 'Moderada' | 'Intensa';
  diet_struggle: string;
  mirror_feeling: string;
  clothing_feeling: string;
  physical_feeling: string;
  social_shame: string;
  hope_change: string;
  past_failures: string;
}

export type QuizState = {
  step: number;
  totalSteps: number;
  currentPhase: 'intro' | 'technical' | 'habits' | 'pain' | 'hope' | 'analysis' | 'sales';
  data: Partial<QuizData>;
};
