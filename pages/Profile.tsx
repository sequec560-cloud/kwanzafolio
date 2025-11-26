import React from 'react';
import { User } from '../types';
import { UserCircle, Mail, Shield, Download, CreditCard } from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
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
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-dark-700 hover:bg-dark-600 transition-colors text-left group">
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
    </div>
  );
};