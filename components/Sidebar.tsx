import React from 'react';
import { LayoutDashboard, Wallet, Calculator, User, LogOut, TrendingUp } from 'lucide-react';
import { Page, NavItem } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const navItems: NavItem[] = [
  { page: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { page: Page.ASSETS, label: 'Meus Ativos', icon: Wallet },
  { page: Page.SIMULATOR, label: 'Simulador', icon: Calculator },
  { page: Page.PROFILE, label: 'Perfil', icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <aside className="w-64 bg-dark-800 border-r border-dark-700 h-screen fixed left-0 top-0 flex flex-col z-50 transition-all duration-300 hidden md:flex">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/20">
            <TrendingUp className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          KwanzaFólio
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-gold-500' : 'text-neutral-500 group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-dark-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Terminar Sessão</span>
        </button>
      </div>
    </aside>
  );
};

// Mobile Navigation
export const MobileNav: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 flex justify-around p-3 z-50">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;
                return (
                    <button
                        key={item.page}
                        onClick={() => onNavigate(item.page)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg ${isActive ? 'text-gold-500' : 'text-neutral-500'}`}
                    >
                        <Icon className="w-6 h-6" />
                        <span className="text-[10px]">{item.label}</span>
                    </button>
                )
            })}
        </div>
    )
}