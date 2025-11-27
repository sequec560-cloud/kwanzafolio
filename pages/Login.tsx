import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Mail, Key, Lock, ArrowLeft, BarChart3, PieChart, BellRing, Calculator } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'LOGIN' | 'REGISTER' | 'RECOVER'>('LOGIN');

  const handleCTA = () => {
    setView('REGISTER');
    // Scroll to form on mobile if needed
    document.getElementById('auth-card')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[128px]"></div>
      
      <div className="container mx-auto px-6 py-12 lg:h-screen lg:flex lg:items-center lg:justify-between relative z-10 gap-16">
        
        {/* Left Column: Marketing Copy */}
        <div className="lg:w-1/2 space-y-10 mb-12 lg:mb-0">
            <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold uppercase tracking-wider mb-6">
                    🚀 Acesso Antecipado
                 </div>
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                    KwanzaFólio <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">
                        O Teu Portfólio BODIVA,
                    </span>
                    <br />
                    <span className="text-3xl md:text-4xl lg:text-5xl text-neutral-200">
                        mais claro do que nunca.
                    </span>
                 </h1>
            </div>

            <div className="space-y-6">
                <FeatureItem 
                    icon={BarChart3}
                    title="Acompanha a tua carteira"
                    desc="Vê o total investido, rentabilidade, gráficos e a evolução real dos teus títulos."
                />
                <FeatureItem 
                    icon={Calculator}
                    title="Simulador de rendimentos"
                    desc="Sabe quanto vais ganhar até ao vencimento — com cenários automáticos."
                />
                <FeatureItem 
                    icon={PieChart}
                    title="Dashboard simples e direto"
                    desc="Nada de complicações. Toda a informação importante num único ecrã."
                />
                 <FeatureItem 
                    icon={BellRing}
                    title="Alertas inteligentes (em breve)"
                    desc="Recebe avisos quando um ativo se aproximar do vencimento ou estiver a gerar lucro acima do esperado."
                />
            </div>

            <div className="pt-4">
                 <p className="text-sm text-neutral-500 mb-3 uppercase tracking-widest font-bold">Torna-te um dos primeiros</p>
                 <button 
                    onClick={handleCTA}
                    className="group bg-white hover:bg-neutral-200 text-black text-lg font-bold py-4 px-8 rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-white/5"
                 >
                    Quero experimentar o KwanzaFólio
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
            </div>
        </div>

        {/* Right Column: Auth Card */}
        <div className="lg:w-[480px] w-full" id="auth-card">
            <div className="bg-dark-800/80 backdrop-blur-xl border border-dark-700 rounded-3xl p-8 shadow-2xl">
                
                {/* Logo Area (Mobile only mainly, or small header) */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/20">
                        <TrendingUp className="text-white w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">KwanzaFólio</h2>
                </div>

                {/* Navigation Tabs (Only for Login/Register) */}
                {view !== 'RECOVER' && (
                    <div className="flex gap-4 mb-8 p-1 bg-dark-900 rounded-xl">
                        <button 
                        onClick={() => setView('LOGIN')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${view === 'LOGIN' ? 'bg-dark-700 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
                        >
                            Entrar
                        </button>
                        <button 
                        onClick={() => setView('REGISTER')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${view === 'REGISTER' ? 'bg-dark-700 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
                        >
                            Registar
                        </button>
                    </div>
                )}

                {/* RECOVERY VIEW */}
                {view === 'RECOVER' && (
                    <div className="mb-6">
                        <button 
                        onClick={() => setView('LOGIN')}
                        className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6 text-sm transition-colors"
                        >
                        <ArrowLeft className="w-4 h-4" /> Voltar
                        </button>
                        <h2 className="text-xl font-bold text-white mb-2">Recuperar Conta</h2>
                        <p className="text-sm text-neutral-400 mb-6">Insira o seu email para receber um link de redefinição.</p>
                        <form onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs text-neutral-400 font-medium ml-1">Email Registado</label>
                                <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                                <input type="email" className="w-full bg-dark-900/80 border border-dark-700 rounded-xl pl-9 p-3 text-white focus:border-gold-500 outline-none" placeholder="email@exemplo.com" />
                                </div>
                            </div>
                            <button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3.5 rounded-xl transition-all">
                                Enviar Link de Recuperação
                            </button>
                        </div>
                        </form>
                    </div>
                )}

                {/* LOGIN / REGISTER FORMS */}
                {view !== 'RECOVER' && (
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                        {view === 'REGISTER' && (
                            <div className="space-y-1">
                                <label className="text-xs text-neutral-400 font-medium ml-1">Nome Completo</label>
                                <input type="text" className="w-full bg-dark-900/80 border border-dark-700 rounded-xl px-4 py-3 text-white focus:border-gold-500 outline-none" placeholder="Ricardo Silva" />
                            </div>
                        )}
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-400 font-medium ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                                <input type="email" className="w-full bg-dark-900/80 border border-dark-700 rounded-xl pl-9 p-3 text-white focus:border-gold-500 outline-none" placeholder="email@exemplo.com" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-neutral-400 font-medium ml-1">Palavra-passe</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                                <input type="password" className="w-full bg-dark-900/80 border border-dark-700 rounded-xl pl-9 p-3 text-white focus:border-gold-500 outline-none" placeholder="••••••••" />
                            </div>
                        </div>

                        <button 
                        type="submit"
                        className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
                        >
                            {view === 'LOGIN' ? 'Entrar na Plataforma' : 'Criar Conta Gratuita'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                )}
                
                {view === 'LOGIN' && (
                    <div className="mt-6 flex flex-col items-center gap-4">
                    <button 
                        onClick={() => setView('RECOVER')}
                        className="text-center text-xs text-neutral-500 hover:text-gold-500 transition-colors"
                    >
                        Esqueceste-te da palavra-passe?
                    </button>
                    
                    <div className="w-full border-t border-dark-700 pt-4 mt-2">
                        <button className="w-full py-3 rounded-xl border border-dark-600 bg-dark-900/50 hover:bg-dark-800 text-neutral-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors opacity-50 cursor-not-allowed" title="Em breve (Fase 2)">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Entrar com Google
                        </button>
                    </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

// Feature Helper Component
const FeatureItem = ({ icon: Icon, title, desc }: any) => (
    <div className="flex gap-4 items-start group">
        <div className="w-12 h-12 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 transition-colors">
            <Icon className="w-6 h-6 text-gold-500" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">{title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);