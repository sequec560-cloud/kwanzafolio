import React, { useState } from 'react';
import { User } from '../types';
import { UserCircle, Mail, Shield, Download, CreditCard, X, Check, Star } from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const plans = [
    { 
        name: 'Free', 
        price: 'Grátis', 
        period: 'sempre', 
        features: ['Gestão de até 5 ativos', 'Cotações manuais', 'Dashboard Básico'],
        current: user.subscriptionPlan === 'Free'
    },
    { 
        name: 'Pro', 
        price: '3.000 AKZ', 
        period: '/mês', 
        features: ['Ativos ilimitados', 'Exportação Excel/PDF', 'Alertas de vencimento'], 
        recommended: true,
        current: user.subscriptionPlan === 'Pro' // Assuming strict string match, strictly mock logic here
    },
    { 
        name: 'Premium', 
        price: '6.000 AKZ', 
        period: '/mês', 
        features: ['Tudo do Pro', 'IA Financeira Ilimitada', 'Suporte Prioritário', 'Análise de Risco'],
        current: user.subscriptionPlan === 'Premium' || user.subscriptionPlan === 'Gold' // Gold maps to Premium in this context
    },
  ];

  return (
    <div className="p-6 md:p-10 pb-24 md:pb-10 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Perfil de Investidor</h1>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Info Card */}
        <div className="md:col-span-2 space-y-6">
            <div className="bg-dark-800 rounded-3xl p-8 border border-dark-700 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-700 p-1">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                         {/* Placeholder for user avatar */}
                        <span className="text-3xl font-bold text-gold-500">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <p className="text-neutral-400">{user.email}</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-gold-500/20 rounded-full border border-gold-500/30">
                        <Shield className="w-3 h-3 text-gold-500" />
                        <span className="text-xs font-bold text-gold-500 uppercase tracking-wide">Membro {user.subscriptionPlan}</span>
                    </div>
                </div>
            </div>

            <div className="bg-dark-800 rounded-3xl p-8 border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-6">Detalhes da Conta</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Mail className="text-neutral-500 w-5 h-5" />
                            <span className="text-neutral-300">Email</span>
                        </div>
                        <span className="text-white font-medium">{user.email}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl">
                        <div className="flex items-center gap-3">
                            <UserCircle className="text-neutral-500 w-5 h-5" />
                            <span className="text-neutral-300">ID de Cliente</span>
                        </div>
                        <span className="text-white font-medium font-mono">#8291-KWANZA</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
            <div className="bg-dark-800 rounded-3xl p-6 border border-dark-700">
                <h3 className="text-white font-semibold mb-4">Ações</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-dark-700 hover:bg-dark-600 transition-colors text-left group">
                         <span className="text-neutral-300 group-hover:text-white flex items-center gap-2">
                             <Download className="w-4 h-4" /> Exportar Dados (CSV)
                         </span>
                    </button>
                    <button 
                        onClick={() => setIsSubModalOpen(true)}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-dark-700 hover:bg-dark-600 transition-colors text-left group"
                    >
                         <span className="text-neutral-300 group-hover:text-white flex items-center gap-2">
                             <CreditCard className="w-4 h-4" /> Gerir Assinatura
                         </span>
                    </button>
                </div>
            </div>

             <button 
                onClick={onLogout}
                className="w-full p-4 rounded-xl border border-red-900/30 text-red-500 hover:bg-red-900/10 transition-colors font-medium text-sm uppercase tracking-wider"
             >
                 Terminar Sessão
             </button>
        </div>
      </div>

      {/* Subscription Modal */}
      {isSubModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-dark-800 rounded-3xl w-full max-w-4xl border border-dark-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-dark-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Planos de Assinatura</h2>
                        <p className="text-neutral-400 text-sm">Escolha o plano ideal para a sua carteira.</p>
                    </div>
                    <button onClick={() => setIsSubModalOpen(false)} className="text-neutral-500 hover:text-white p-2">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 md:p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <div 
                                key={plan.name} 
                                className={`relative rounded-2xl p-6 border flex flex-col ${
                                    plan.current 
                                        ? 'border-gold-500 bg-gold-500/10' 
                                        : plan.recommended 
                                            ? 'border-neutral-600 bg-dark-700/50' 
                                            : 'border-dark-700 bg-dark-900/50'
                                }`}
                            >
                                {plan.recommended && !plan.current && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                                        Mais Popular
                                    </div>
                                )}
                                
                                <div className="mb-4">
                                    <h3 className={`text-lg font-bold ${plan.current ? 'text-gold-500' : 'text-white'}`}>{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mt-2">
                                        <span className="text-2xl font-bold text-white">{plan.price}</span>
                                        <span className="text-sm text-neutral-500">{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                                            <Check className={`w-4 h-4 shrink-0 ${plan.current ? 'text-gold-500' : 'text-neutral-500'}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                                        plan.current 
                                            ? 'bg-gold-500 text-black cursor-default'
                                            : plan.recommended
                                                ? 'bg-white hover:bg-neutral-200 text-black'
                                                : 'bg-dark-700 hover:bg-dark-600 text-white'
                                    }`}
                                    disabled={plan.current}
                                >
                                    {plan.current ? 'Plano Atual' : 'Selecionar'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};