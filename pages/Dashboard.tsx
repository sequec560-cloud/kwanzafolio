import React, { useMemo } from 'react';
import { Asset } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, DollarSign, Calendar, PieChart as PieChartIcon, Activity } from 'lucide-react';

interface DashboardProps {
  assets: Asset[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-800 border border-dark-700 p-3 rounded-lg shadow-xl z-50">
        <p className="text-neutral-300 text-sm mb-1">{label}</p>
        <p className="text-gold-400 font-bold">
          {payload[0].value.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
        </p>
      </div>
    );
  }
  return null;
};

// Colors for the "Bodiva" style distribution
const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

export const Dashboard: React.FC<DashboardProps> = ({ assets }) => {
  // --- CALCULATIONS ---
  
  // 1. Total Invested (Sum of investedAmount)
  const totalInvested = useMemo(() => 
    assets.reduce((acc, curr) => acc + curr.investedAmount, 0), 
  [assets]);

  // 2. Current Portfolio Value (Sum of currentPrice * quantity)
  const currentTotalValue = useMemo(() => 
    assets.reduce((acc, curr) => acc + (curr.currentPrice * curr.quantity), 0), 
  [assets]);

  // 3. Total Profit (AKZ and %)
  const totalProfit = currentTotalValue - totalInvested;
  const profitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  // 4. Monthly Profit (Estimated based on annual interest rate / 12)
  // Logic: Sum of (Invested * (Rate/100) / 12)
  const monthlyProfitEst = useMemo(() => 
    assets.reduce((acc, curr) => {
        if (curr.interestRate) {
            return acc + (curr.investedAmount * (curr.interestRate / 100) / 12);
        }
        return acc;
    }, 0), 
  [assets]);

  // 5. Distribution Data
  const distributionData = useMemo(() => {
    const groups: {[key: string]: number} = {};
    assets.forEach(asset => {
        const val = asset.currentPrice * asset.quantity;
        groups[asset.type] = (groups[asset.type] || 0) + val;
    });
    return Object.keys(groups).map(type => ({
        name: type,
        value: groups[type]
    }));
  }, [assets]);

  // Mock History Data (for the chart)
  const chartData = [
    { name: 'Jan', value: totalInvested * 0.98 },
    { name: 'Fev', value: totalInvested * 1.01 },
    { name: 'Mar', value: totalInvested * 1.02 },
    { name: 'Abr', value: totalInvested * 1.035 },
    { name: 'Mai', value: totalInvested * 1.05 },
    { name: 'Jun', value: currentTotalValue },
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 pb-24 md:pb-10">
      
      {/* Top Header */}
      <div className="mb-6 border-b border-dark-700 pb-6">
            <h1 className="text-3xl font-bold text-white">Visão Geral</h1>
            <p className="text-neutral-400 mt-1">Acompanhe a rentabilidade da sua carteira em tempo real.</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Total Invested */}
        <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Total Investido</span>
                <span className="bg-dark-700 p-1.5 rounded-lg text-neutral-400"><DollarSign className="w-4 h-4"/></span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
                {totalInvested.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
            </div>
        </div>

        {/* Current Total & Profit */}
        <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Valor Atual & Lucro</span>
                <span className="bg-dark-700 p-1.5 rounded-lg text-gold-500"><TrendingUp className="w-4 h-4"/></span>
            </div>
             <div className="text-2xl font-bold text-white mb-1">
                {currentTotalValue.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className={`font-medium ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${totalProfit >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {profitPercentage.toFixed(2)}%
                </span>
            </div>
        </div>

        {/* Monthly Return (Estimated) */}
        <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Rentabilidade Mensal</span>
                <span className="bg-dark-700 p-1.5 rounded-lg text-emerald-500"><Activity className="w-4 h-4"/></span>
            </div>
             <div className="text-2xl font-bold text-white mb-1">
                {monthlyProfitEst.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
            </div>
            <div className="text-sm text-neutral-500">
                Estimativa baseada em taxas de juro
            </div>
        </div>

         {/* Calendar/Next Maturity */}
         <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Próximo Vencimento</span>
                <span className="bg-dark-700 p-1.5 rounded-lg text-blue-500"><Calendar className="w-4 h-4"/></span>
            </div>
             <div className="text-lg font-bold text-white mb-1 line-clamp-1">
                OT-TX 2024
            </div>
            <div className="text-sm text-gold-500 font-medium">
                15 de Junho (em 24 dias)
            </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Evolution Chart */}
        <div className="lg:col-span-2 bg-dark-800 p-6 rounded-2xl border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-6">Evolução da Carteira</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                        <XAxis dataKey="name" stroke="#525252" tickLine={false} axisLine={false} />
                        <YAxis stroke="#525252" tickLine={false} axisLine={false} tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Asset Distribution Chart */}
        <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-neutral-400" />
                Distribuição por Ativo
            </h3>
            <div className="flex-1 min-h-[250px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={distributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {distributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#262626', borderColor: '#404040', borderRadius: '8px' }}
                            itemStyle={{ color: '#e5e5e5' }}
                            formatter={(value: number) => value.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                        />
                    </PieChart>
                 </ResponsiveContainer>
                 {/* Center Text */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="text-xs text-neutral-500 font-medium uppercase">Alocação</span>
                 </div>
            </div>
            
            {/* Custom Legend */}
            <div className="mt-4 space-y-2">
                {distributionData.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span className="text-neutral-300">{entry.name}</span>
                        </div>
                        <span className="text-white font-medium">
                            {((entry.value / currentTotalValue) * 100).toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};