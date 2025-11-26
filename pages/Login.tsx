import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Mail, Key, Lock, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'LOGIN' | 'REGISTER' | 'RECOVER'>('LOGIN');

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gold-500/20 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neutral-800/30 rounded-full blur-[128px]"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        {/* Logo Area */}
        <div className="flex flex-col items-center mb-10">
           <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold-500/20 mb-6 rotate-3">
              <TrendingUp className="text-white w-7 h-7" />
           </div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">KwanzaFólio</h1>
           <p className="text-neutral-400 text-center text-sm">
             A sua gestão de investimentos simplificada.
           </p>
        </div>

        {/* Card */}
        <div className="bg-dark-800/50 backdrop-blur-xl border border-dark-700 rounded-3xl p-8 shadow-2xl">
           
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
  );
};