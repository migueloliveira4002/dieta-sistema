import RegistrationForm from '@/components/onboarding/RegistrationForm';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function ObrigadoPage({ searchParams }: { searchParams?: { [key: string]: string } }) {
  const status = (searchParams?.status || '').toLowerCase();
  const approved = status === 'approved' || status === 'success';
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        {approved ? (
          <div className="bg-brand-500 p-8 text-center text-white">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Pagamento Confirmado!</h1>
            <p className="text-brand-100 mt-2">
              Você deu o primeiro passo para sua nova vida.
            </p>
          </div>
        ) : (
          <div className="bg-gray-800 p-8 text-center text-white">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Aguardando Confirmação</h1>
            <p className="text-brand-100 mt-2">
              Caso o pagamento tenha sido concluído, esta página será atualizada.
            </p>
          </div>
        )}

        <div className="p-8 space-y-8">
          {/* Important Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-4">
            <Clock className="w-10 h-10 text-yellow-600 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-bold mb-1">Importante: Prazo de Entrega</p>
              <p>
                Sua dieta e a lista de sucos detox estão sendo montados agora por nossa equipe.
                <br />
                <strong>Disponível em até 24h úteis.</strong>
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Finalize seu cadastro para acessar a área de membros:
            </h2>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
