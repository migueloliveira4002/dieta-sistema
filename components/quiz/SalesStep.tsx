'use client';

import { QuizData } from '@/types/quiz';
import { Button } from '../ui/button';
import { Check, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SalesStep({ data, onCheckout }: { data: Partial<QuizData>, onCheckout: () => void }) {
  // Dynamic Copy Logic
  const painPoint = data.physical_feeling?.toLowerCase().includes('inchaço') ? 'inchaço abdominal constante' : 
                   data.physical_feeling?.toLowerCase().includes('esgotada') ? 'falta de energia crônica' : 'metabolismo lento';
  
  return (
    <div className="space-y-8 pb-12">
      {/* Headline Section */}
      <section className="text-center space-y-4">
        <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
          ⚠️ Oportunidade Única
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
          Sua dieta está pronta, <span className="text-brand-600">{data.name}</span>!
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl lg:max-w-3xl mx-auto">
          Baseado nas suas respostas, descobrimos o motivo exato pelo qual você sente <span className="font-bold text-red-500">{painPoint}</span> e como resolver isso definitivamente.
        </p>
      </section>

      {/* VSL / Image Placeholder */}
      <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <p className="z-20 font-bold text-xl">Vídeo de Apresentação do Protocolo</p>
        {/* <Image src="/path/to/vsl-thumb.jpg" layout="fill" objectFit="cover" /> */}
      </div>

      {/* Sub-headline / Hook */}
      <div className="bg-brand-50 border-l-4 border-brand-500 p-6 rounded-r-xl">
        <h3 className="text-xl font-bold text-brand-900 mb-2">
          Comece 2026 como outra pessoa.
        </h3>
        <p className="text-brand-800">
          Torne-se irreconhecível em poucos dias com o nosso <strong>Protocolo de Efeito Bariátrica Natural</strong>. Sem remédios, sem cirurgias.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          "Não pare de comer o que gosta",
          "Sem passar fome ou ansiedade",
          "Queime gordura enquanto dorme",
          "Receitas de sucos detox inclusas"
        ].map((benefit, i) => (
          <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-green-100 p-2 rounded-full">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-medium text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>

      {/* The Offer */}
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-brand-500 overflow-hidden transform hover:scale-[1.02] transition-transform">
        <div className="bg-brand-500 p-4 text-center text-white font-bold text-lg">
          PLANO PERSONALIZADO + BÔNUS
        </div>
        <div className="p-5 sm:p-6 space-y-6">
          <div className="text-center">
            <span className="text-gray-400 line-through text-lg">R$ 197,00</span>
            <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              R$ 29,90
            </div>
            <span className="text-green-600 font-bold text-sm">ou 3x de R$ 10,50</span>
          </div>

          <Button 
            onClick={onCheckout}
            className="w-full text-lg md:text-xl py-5 md:py-6 animate-bounce shadow-brand-500/50"
          >
            QUERO MEU CORPO DOS SONHOS
            <ArrowRight className="inline-block ml-2 w-6 h-6" />
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="w-4 h-4" />
            <span>Garantia de 7 dias ou seu dinheiro de volta</span>
          </div>
        </div>
      </div>

      {/* Social Proof (Fake/Generic) */}
      <div className="space-y-4 pt-8">
        <h4 className="text-center font-bold text-gray-900">Quem já experimentou:</h4>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex gap-1 text-yellow-400 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
          </div>
          <p className="text-gray-600 italic">&quot;Eu achava que nunca ia conseguir perder a barriga pós-parto. Em 3 semanas minhas calças já não serviam mais de tão largas!&quot;</p>
          <p className="text-sm font-bold text-gray-900 mt-2">- Mariana S., 32 anos</p>
        </div>
      </div>
    </div>
  );
}
