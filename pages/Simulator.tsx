import React, { useState } from 'react';
import { Asset } from '../types';
import { getSimulationInsight } from '../services/geminiService';
import { Sparkles, ArrowRight, Repeat, CalendarCheck } from 'lucide-react';

interface SimulatorProps {
    assets?: Asset[];
}

export const Simulator: React.FC<SimulatorProps> = ({ assets }) => {
    // Inputs
    const [amount, setAmount] = useState(1000000);
    const [rate, setRate] = useState(16.5);
    const [years, setYears] = useState(5);
    const [titleName, setTitleName] = useState('');
    
    // Outputs
    const [calculated, setCalculated] = useState(false);
    const [insight, setInsight] = useState<string>('');
    const [loadingAI, setLoadingAI] = useState(false);
    
    // Results
    const [maturityValue, setMaturityValue] = useState(0); // Valor no vencimento (sem reinvestir cupões)
    const [reinvestValue, setReinvestValue] = useState(0); // Valor reinvestindo cupões (Juros Compostos)

    const handleSimulate = async () => {
        setCalculated(true);
        setLoadingAI(true);
        setInsight('');

        // 1. Simple Interest (Hold to Maturity, spending coupons)
        // Principal + (Principal * Rate * Years)
        const simpleTotal = amount + (amount * (rate / 100) * years);
        setMaturityValue(simpleTotal);

        // 2. Compound Interest (Reinvesting coupons)
        // Principal * (1 + Rate)^Years
        const compoundTotal = amount * Math.pow((1 + rate / 100), years);
        setReinvestValue(compoundTotal);

        // AI Call
        const aiResponse = await getSimulationInsight(amount, years, rate, titleName || 'Título Geral');
        setInsight(aiResponse);
        setLoadingAI(false);
    };

    return (
        <div className="p-6 md:p-10 pb-24 md:pb-10 max-w-6xl mx-auto min-h-screen">
             <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">Simulador de Rentabilidade</h1>
                <p className="text-neutral-400">Compare o ganho simples vs. reinvestimento de juros.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Form Section */}
                <div className="bg-dark-800 p-8 rounded-3xl border border-dark-700 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-6">Parâmetros do Título</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Nome do Ativo (Opcional)</label>
                            <input 
                                type="text" 
                                value={titleName}
                                onChange={(e) => setTitleName(e.target.value)}
                                className="w-full bg-dark-900 border border-dark-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none"
                                placeholder="Ex: OT 2028"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Valor a Investir (Kz)</label>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full bg-dark-900 border border-dark-700 text-white p-4 rounded-xl text-lg focus:border-gold-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Taxa de Juro Anual / Cupão (%)</label>
                            <input 
                                type="number" 
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full bg-dark-900 border border-dark-700 text-white p-4 rounded-xl text-lg focus:border-gold-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Tempo até Vencimento (Anos)</label>
                            <input 
                                type="range" 
                                min="1" 
                                max="20" 
                                value={years} 
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full h-2 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-gold-500"
                            />
                            <div className="text-right text-gold-500 font-bold mt-2">{years} Anos</div>
                        </div>

                        <button 
                            onClick={handleSimulate}
                            className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
                        >
                            Simular Cenários
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex flex-col gap-6">
                    {!calculated ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-dark-700 rounded-3xl text-neutral-500">
                             <Repeat className="w-16 h-16 mb-4 opacity-20" />
                             <p>Preencha os dados e simule para ver a diferença entre juros simples e compostos.</p>
                        </div>
                    ) : (
                        <>
                             {/* AI Insight */}
                            <div className="bg-gradient-to-b from-dark-800 to-dark-900 p-6 rounded-2xl border border-gold-500/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-5 h-5 text-gold-400" />
                                    <h3 className="text-gold-400 font-semibold text-sm">Análise Inteligente</h3>
                                </div>
                                {loadingAI ? (
                                    <p className="text-neutral-500 text-sm animate-pulse">A gerar estratégia...</p>
                                ) : (
                                    <p className="text-neutral-300 text-sm leading-relaxed">{insight}</p>
                                )}
                            </div>

                            {/* Comparison Cards */}
                            <div className="grid gap-4">
                                {/* Scenario 1: Hold to Maturity (Simple Interest) */}
                                <div className="p-6 rounded-2xl border border-dark-700 bg-dark-800">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-dark-700 p-2 rounded-lg text-neutral-400">
                                            <CalendarCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-neutral-300 uppercase">Apenas Vencimento</h3>
                                            <p className="text-xs text-neutral-500">Sacando os juros sem reinvestir</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-2xl font-bold text-white">{maturityValue.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</p>
                                            <p className="text-sm text-emerald-400 mt-1">
                                                Lucro: {(maturityValue - amount).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Scenario 2: Reinvesting (Compound Interest) */}
                                <div className="p-6 rounded-2xl border border-gold-500/40 bg-gold-900/10 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 w-20 h-20 bg-gold-500/20 blur-2xl rounded-full"></div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-gold-500/20 p-2 rounded-lg text-gold-500">
                                            <Repeat className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-gold-400 uppercase">Reinvestimento (Juros Compostos)</h3>
                                            <p className="text-xs text-gold-500/70">Reinvestindo todos os cupões</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-3xl font-bold text-white">{reinvestValue.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</p>
                                            <p className="text-sm text-emerald-400 mt-1">
                                                Lucro: {(reinvestValue - amount).toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs bg-gold-500 text-black px-2 py-1 rounded font-bold">
                                                + {((reinvestValue - maturityValue) / maturityValue * 100).toFixed(1)}% Extra
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};