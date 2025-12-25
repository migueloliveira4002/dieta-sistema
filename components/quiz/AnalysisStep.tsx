'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, CheckCircle2, Search } from 'lucide-react';

const MESSAGES = [
  { text: "Analisando perfil metabólico...", icon: Activity },
  { text: "Calculando IMC...", icon: Search },
  { text: "Identificando gatilhos emocionais...", icon: Brain },
  { text: "Plano Personalizado encontrado!", icon: CheckCircle2 },
];

export default function AnalysisStep({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === MESSAGES.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1100); // Final pause to total ~8s
          return prev;
        }
        return prev + 1;
      });
    }, 2300); // ~8 seconds total (3*2300 + 1100)

    return () => clearInterval(interval);
  }, [onComplete]);

  const CurrentIcon = MESSAGES[index].icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 p-6 text-center">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-gray-200 border-t-brand-500 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <CurrentIcon className="w-10 h-10 text-brand-600" />
        </div>
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-2"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          {MESSAGES[index].text}
        </h2>
        <p className="text-gray-500 text-sm">
          Por favor, aguarde enquanto processamos suas respostas...
        </p>
      </motion.div>

      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((index + 1) / MESSAGES.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
