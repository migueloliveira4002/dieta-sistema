import { QuizStep } from '@/types/quiz';

export interface Question {
  id: QuizStep;
  type: 'select' | 'slider' | 'input';
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  phase: 'technical' | 'habits' | 'pain' | 'hope';
}

export const QUESTIONS: Question[] = [
  // Phase 1: Technical
  {
    id: 'gender',
    type: 'select',
    question: 'Qual é o seu gênero?',
    options: ['Homem', 'Mulher'],
    phase: 'technical'
  },
  {
    id: 'age',
    type: 'select',
    question: 'Qual é a sua idade atual?',
    options: ['18-29', '30-39', '40-49', '50+'],
    phase: 'technical'
  },
  {
    id: 'height',
    type: 'slider',
    question: 'Qual é a sua altura?',
    min: 140,
    max: 220,
    unit: 'cm',
    phase: 'technical'
  },
  {
    id: 'weight',
    type: 'slider',
    question: 'Quanto você pesa hoje?',
    min: 40,
    max: 180,
    unit: 'kg',
    phase: 'technical'
  },
  {
    id: 'goal_weight',
    type: 'slider',
    question: 'Qual é o seu peso ideal?',
    min: 40,
    max: 180,
    unit: 'kg',
    phase: 'technical'
  },
  // Phase 2: Habits
  {
    id: 'activity',
    type: 'select',
    question: 'Como é a sua rotina de atividades físicas hoje?',
    options: ['Sedentário', 'Leve', 'Moderada', 'Intensa'],
    phase: 'habits'
  },
  {
    id: 'diet_struggle',
    type: 'select',
    question: 'Qual é a sua maior dificuldade na alimentação hoje?',
    options: ['Doces', 'Massas', 'Comer à noite', 'Ansiedade/Beliscar', 'Falta de tempo'],
    phase: 'habits'
  },
  // Phase 3: Pain
  {
    id: 'mirror_feeling',
    type: 'select',
    question: 'Quando você se olha no espelho hoje, qual é o seu sentimento predominante?',
    options: ['Orgulho', 'Indiferença', 'Frustração', 'Vergonha'],
    phase: 'pain'
  },
  {
    id: 'clothing_feeling',
    type: 'select',
    question: 'Como você se sente em relação às suas roupas atuais?',
    options: ['Servem bem', 'Apertadas', 'Vergonha de roupas justas', 'Uso roupas largas para esconder'],
    phase: 'pain'
  },
  {
    id: 'physical_feeling',
    type: 'select',
    question: 'Fisicamente, como você se sente ao final do dia?',
    options: ['Energia', 'Cansada', 'Inchaço/Falta de ar', 'Esgotada'],
    phase: 'pain'
  },
  {
    id: 'social_shame',
    type: 'select',
    question: 'Você já deixou de ir a algum evento social por vergonha do seu corpo?',
    options: ['Não', 'Sim, algumas vezes', 'Sim, frequentemente'],
    phase: 'pain'
  },
  // Phase 4: Hope
  {
    id: 'hope_change',
    type: 'select',
    question: 'Se você pudesse eliminar o peso extra, o que mudaria?',
    options: ['Autoestima', 'Roupas', 'Saúde/Família', 'Me sentir atraente'],
    phase: 'hope'
  },
  {
    id: 'past_failures',
    type: 'select',
    question: 'Você já tentou outras dietas e falhou?',
    options: ['Não', 'Sim + Efeito Sanfona'],
    phase: 'hope'
  }
];
