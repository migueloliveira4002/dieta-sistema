'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface SedentaryModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export default function SedentaryModal({ isOpen, onConfirm }: SedentaryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-l-8 border-red-500 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900">
                Atenção: Risco Elevado
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                O sedentarismo aumenta drasticamente o risco de problemas cardíacos silenciosos e diabetes tipo 2. 
                <span className="block font-semibold text-red-600 mt-2">
                  Precisamos mudar isso agora, antes que seja tarde.
                </span>
              </p>

              <button
                onClick={onConfirm}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors mt-4 flex items-center justify-center gap-2"
              >
                Entendi o risco
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
