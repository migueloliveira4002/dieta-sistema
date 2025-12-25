'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { registerUser } from '@/app/actions';
import { Lock, MessageSquare } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Criando acesso...' : 'Confirmar Cadastro e Acessar'}
    </Button>
  );
}

export default function RegistrationForm() {
  const [error, setError] = useState('');

  async function onSubmit(formData: FormData) {
    setError('');
    const result = await registerUser(formData);
    if (!result.success) {
      setError(result.error || 'Erro ao criar conta. Tente novamente.');
    }
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <Input name="name" placeholder="Seu nome completo" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input name="email" type="email" placeholder="seu@email.com" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Criar Senha</label>
          <Input name="password" type="password" placeholder="******" minLength={6} required />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <MessageSquare className="w-4 h-4 text-green-600" />
            Receber no WhatsApp? (Opcional)
          </label>
          <Input name="whatsapp" placeholder="(11) 99999-9999" />
          <p className="text-xs text-gray-500 mt-1">
            Enviaremos o link de acesso e os bônus por lá também.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <SubmitButton />

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <Lock className="w-3 h-3" />
        Seus dados estão 100% seguros
      </div>
    </form>
  );
}
