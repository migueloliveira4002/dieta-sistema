'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { QUESTIONS } from './data';
import { QuizData } from '@/types/quiz';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import SedentaryModal from './SedentaryModal';
import AnalysisStep from './AnalysisStep';
import SalesStep from './SalesStep';
import { submitQuiz } from '@/app/actions';

export default function QuizFlow() {
  const [step, setStep] = useState(-1); // -1: Name Input, 0..N: Questions
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<Partial<QuizData>>({});
  const [showSedentaryModal, setShowSedentaryModal] = useState(false);

  // Helper to update data
  const updateData = (key: keyof QuizData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  // Navigation Logic
  const handleNext = async () => {
    setDirection(1);

    // Name Step Validation
    if (step === -1) {
      if (!data.name || data.name.trim().length < 2) return;
      setStep(0);
      return;
    }

    const currentQuestion = QUESTIONS[step];

    // Check Sedentary Logic
    if (currentQuestion?.id === 'activity' && data.activity === 'Sedentário' && !showSedentaryModal) {
      setShowSedentaryModal(true);
      return; // Stop here, modal handles the continue
    }

    // Submit Quiz Data before Analysis
    if (step === QUESTIONS.length - 1) {
      await submitQuiz(data);
      setStep(step + 1); // Move to Analysis
      return;
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const autoFillAndSkip = async () => {
    const filled: Partial<QuizData> = {
      name: 'Teste',
      gender: 'Mulher',
      age: '30-39',
      height: 165,
      weight: 75,
      goal_weight: 62,
      activity: 'Leve',
      diet_struggle: 'Doces',
      mirror_feeling: 'Frustração',
      clothing_feeling: 'Apertadas',
      physical_feeling: 'Esgotada',
      social_shame: 'Sim, algumas vezes',
      hope_change: 'Saúde/Família',
      past_failures: 'Sim + Efeito Sanfona',
    };
    setData(filled);
    setShowSedentaryModal(false);
    setStep(QUESTIONS.length);
  };

  // Render Logic
  const renderContent = () => {
    // 1. Name Input
    if (step === -1) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Sua jornada começa agora.
            </h1>
            <p className="text-gray-500">
              Para personalizarmos seu plano, como devemos te chamar?
            </p>
          </div>
          <Input 
            placeholder="Seu primeiro nome" 
            value={data.name || ''}
            onChange={(e) => updateData('name', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            autoFocus
          />
          <Button onClick={handleNext} disabled={!data.name}>
            Começar minha transformação
            <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </Button>
        </div>
      );
    }

    // 2. Analysis Step
    if (step === QUESTIONS.length) {
      return <AnalysisStep onComplete={() => setStep(step + 1)} />;
    }

    // 3. Sales Page
    if (step === QUESTIONS.length + 1) {
      const handleCheckout = async () => {
        try {
          const res = await fetch('/api/mp/create-preference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: data.name }),
          });
          const json = await res.json();
          if (!res.ok) {
            alert(json?.error || 'Erro criando preferência de pagamento.');
            return;
          }
          const url = json.init_point || json.sandbox_init_point;
          if (url) {
            window.location.href = url;
          } else {
            alert('Não foi possível iniciar o pagamento. Verifique as credenciais de teste do Mercado Pago.');
          }
        } catch (e) {
          console.error('Falha ao iniciar pagamento Mercado Pago', e);
          alert('Falha ao iniciar pagamento. Tente novamente em instantes.');
        }
      };
      return <SalesStep data={data} onCheckout={handleCheckout} />;
    }

    // 4. Questions
    const question = QUESTIONS[step];
    if (!question) return null;

    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-sm font-bold text-brand-600 uppercase tracking-wider">
            Passo {step + 1} de {QUESTIONS.length}
          </span>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {question.question.replace('{name}', data.name || '')}
          </h2>
        </div>

        {/* Input Types */}
        <div className="space-y-4">
          {question.type === 'select' && (
            <div className="grid grid-cols-1 gap-3">
              {question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    updateData(question.id as keyof QuizData, option);
                    // Small delay for visual feedback before auto-next
                    setTimeout(() => handleNext(), 250);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                    data[question.id as keyof QuizData] === option
                      ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                      : 'border-gray-200 hover:border-brand-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'slider' && (
            <div className="space-y-6 py-4">
              <div className="text-center text-4xl font-bold text-brand-600">
                {data[question.id as keyof QuizData] || question.min} 
                <span className="text-lg text-gray-400 ml-1 font-normal">{question.unit}</span>
              </div>
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={(data[question.id as keyof QuizData] as number) || question.min}
                onChange={(e) => updateData(question.id as keyof QuizData, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <Button onClick={handleNext}>Continuar</Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Progress Bar
  const progress = step >= 0 && step < QUESTIONS.length 
    ? ((step + 1) / QUESTIONS.length) * 100 
    : 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6 md:py-10 max-w-3xl lg:max-w-4xl mx-auto w-full">
      <div className="w-full mb-4">
        <Button variant="outline" onClick={autoFillAndSkip} className="w-full sm:w-auto">
          Ir direto para quase o final (teste)
        </Button>
      </div>
      <SedentaryModal 
        isOpen={showSedentaryModal} 
        onConfirm={() => {
          setShowSedentaryModal(false);
          // Manually trigger next since we blocked it
          setStep(step + 1);
        }} 
      />

      {/* Header / Nav */}
      {step >= 0 && step < QUESTIONS.length && (
        <div className="w-full mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-xs font-bold text-gray-400">
              SEGURO E CONFIDENCIAL
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-3xl md:shadow-xl md:border border-gray-100 min-h-[380px] md:min-h-[460px] flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
