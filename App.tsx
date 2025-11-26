import React, { useState } from 'react';
import { Page, Asset, User } from './types';
import { Sidebar, MobileNav } from './components/Sidebar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Assets } from './pages/Assets';
import { Simulator } from './pages/Simulator';
import { Profile } from './pages/Profile';

// Mock Data
const MOCK_USER: User = {
  name: "Ricardo Silva",
  email: "ricardo.silva@kwanzafolio.com",
  subscriptionPlan: "Gold",
  memberSince: "2023-01-15"
};

const INITIAL_ASSETS: Asset[] = [
  { 
    id: '1', 
    name: 'OT-TX 2028', 
    type: 'Obrigações do Tesouro (OT)', 
    quantity: 10, 
    investedAmount: 1000000, // 1M Kz investido
    currentPrice: 105000, // Preço unitário subiu para 105k
    purchaseDate: '2023-05-10',
    maturityDate: '2028-05-10',
    interestRate: 16.5 // 16.5% ao ano
  },
  { 
    id: '2', 
    name: 'Banco Caixa (BCGA)', 
    type: 'Ações', 
    quantity: 500, 
    investedAmount: 2500000, 
    currentPrice: 5800, 
    purchaseDate: '2023-09-12',
    interestRate: 0 // Dividendos variáveis
  },
  { 
    id: '3', 
    name: 'Sonangol 2027', 
    type: 'Obrigações Corporativas', 
    quantity: 20, 
    investedAmount: 2000000, 
    currentPrice: 102000, 
    purchaseDate: '2023-08-01',
    maturityDate: '2027-08-01',
    interestRate: 14.0 
  },
  { 
    id: '4', 
    name: 'Fundo BFA Oportunidades', 
    type: 'Fundos de Investimento', 
    quantity: 1500, 
    investedAmount: 1500000, 
    currentPrice: 1100, 
    purchaseDate: '2024-01-15',
    interestRate: 12.0 // Rentabilidade média esperada
  },
  { 
    id: '5', 
    name: 'BT-91 Dias', 
    type: 'Bilhetes do Tesouro (BT)', 
    quantity: 50, 
    investedAmount: 450000, 
    currentPrice: 9800, // BT vende-se com desconto
    purchaseDate: '2024-03-01',
    maturityDate: '2024-06-01',
    interestRate: 18.0 
  },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    setUser(MOCK_USER);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage(Page.LOGIN);
  };

  const handleAddAsset = (asset: Asset) => {
    setAssets([...assets, asset]);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  const handleEditAsset = (updatedAsset: Asset) => {
    setAssets(assets.map(a => a.id === updatedAsset.id ? updatedAsset : a));
  };

  if (currentPage === Page.LOGIN) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-black min-h-screen text-neutral-100 font-sans selection:bg-gold-500/30">
      
      {/* Navigation */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout} 
      />
      <MobileNav 
         currentPage={currentPage}
         onNavigate={setCurrentPage}
         onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 bg-dark-950 min-h-screen transition-all">
         
         {currentPage === Page.DASHBOARD && (
             <Dashboard assets={assets} />
         )}

         {currentPage === Page.ASSETS && (
             <Assets 
                assets={assets} 
                onAddAsset={handleAddAsset} 
                onDeleteAsset={handleDeleteAsset} 
                onEditAsset={handleEditAsset}
             />
         )}

         {currentPage === Page.SIMULATOR && (
             <Simulator assets={assets} />
         )}

         {currentPage === Page.PROFILE && user && (
             <Profile user={user} onLogout={handleLogout} />
         )}

      </main>
    </div>
  );
};

export default App;