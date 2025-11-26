import React, { useState } from 'react';
import { Asset, AssetType } from '../types';
import { Plus, Trash2, Edit2, Search, Calendar, FileText, DollarSign } from 'lucide-react';

interface AssetsProps {
  assets: Asset[];
  onAddAsset: (asset: Asset) => void;
  onDeleteAsset: (id: string) => void;
  onEditAsset: (asset: Asset) => void;
}

export const Assets: React.FC<AssetsProps> = ({ assets, onAddAsset, onDeleteAsset, onEditAsset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Asset Form State
  const initialFormState: Partial<Asset> = {
    name: '',
    type: 'Obrigações do Tesouro (OT)',
    quantity: 0,
    investedAmount: 0,
    currentPrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    maturityDate: '',
    interestRate: 0
  };

  const [formData, setFormData] = useState<Partial<Asset>>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (asset: Asset) => {
    setEditingId(asset.id);
    setFormData({ ...asset });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (formData.name && formData.quantity && formData.investedAmount) {
      const assetPayload: Asset = {
        id: editingId || Date.now().toString(),
        name: formData.name,
        type: formData.type as AssetType,
        quantity: Number(formData.quantity),
        investedAmount: Number(formData.investedAmount),
        currentPrice: Number(formData.currentPrice || (formData.investedAmount / formData.quantity)), // Default to purchase price if empty
        purchaseDate: formData.purchaseDate || new Date().toISOString(),
        maturityDate: formData.maturityDate,
        interestRate: Number(formData.interestRate || 0)
      };

      if (editingId) {
        onEditAsset(assetPayload);
      } else {
        onAddAsset(assetPayload);
      }
      setIsModalOpen(false);
    }
  };

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 pb-24 md:pb-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestão de Ativos</h1>
          <p className="text-neutral-400">Adicione, edite ou remova títulos da sua carteira.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-gold-500 hover:bg-gold-600 text-black font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-gold-500/20"
        >
          <Plus className="w-5 h-5" />
          Adicionar Ativo
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
          <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Pesquisar título (ex: OT 2025)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
              />
          </div>
      </div>

      {/* Assets Table */}
      <div className="bg-dark-800 rounded-2xl border border-dark-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-900 border-b border-dark-700 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                <th className="p-4">Título / Data Compra</th>
                <th className="p-4">Tipo</th>
                <th className="p-4 text-right">Investido (Total)</th>
                <th className="p-4 text-center">Taxa (%)</th>
                <th className="p-4 text-right">Preço Unit. Atual</th>
                <th className="p-4 text-right">Valor Total</th>
                <th className="p-4 text-right">Lucro/Prejuízo</th>
                <th className="p-4 text-center">Vencimento</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredAssets.length === 0 ? (
                  <tr>
                      <td colSpan={9} className="p-8 text-center text-neutral-500">
                          Nenhum ativo encontrado.
                      </td>
                  </tr>
              ) : filteredAssets.map((asset) => {
                const totalCurrentValue = asset.currentPrice * asset.quantity;
                const profit = totalCurrentValue - asset.investedAmount;
                const profitPercent = (profit / asset.investedAmount) * 100;
                
                return (
                  <tr key={asset.id} className="hover:bg-dark-700/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex flex-col">
                          <span className="font-semibold text-white text-sm">{asset.name}</span>
                          <span className="text-xs text-neutral-500">{asset.purchaseDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                        <span className="px-2 py-1 rounded-md bg-dark-900 text-neutral-400 text-xs border border-dark-700 whitespace-nowrap">
                            {asset.type}
                        </span>
                    </td>
                    <td className="p-4 text-right text-neutral-300 text-sm font-mono">
                        {asset.investedAmount.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                    </td>
                    <td className="p-4 text-center">
                        {asset.interestRate ? (
                            <span className="text-gold-500 font-bold text-sm">{asset.interestRate}%</span>
                        ) : <span className="text-neutral-600">-</span>}
                    </td>
                    <td className="p-4 text-right text-neutral-300 text-sm font-mono">
                         {asset.currentPrice.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                    </td>
                    <td className="p-4 text-right text-white font-bold text-sm font-mono">
                         {totalCurrentValue.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                    </td>
                    <td className="p-4 text-right">
                      <div className={`text-sm font-bold ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                         {profitPercent > 0 ? '+' : ''}{profitPercent.toFixed(2)}%
                      </div>
                      <div className="text-xs text-neutral-500">
                          {profit.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm text-neutral-400">
                        {asset.maturityDate ? asset.maturityDate : 'N/A'}
                    </td>
                    <td className="p-4">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => handleOpenEdit(asset)}
                                className="p-1.5 hover:bg-neutral-700 rounded text-neutral-400 hover:text-white"
                                title="Editar"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => onDeleteAsset(asset.id)}
                                className="p-1.5 hover:bg-red-500/20 rounded text-neutral-400 hover:text-red-400"
                                title="Eliminar"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-2xl w-full max-w-lg border border-dark-700 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">
                {editingId ? 'Editar Ativo' : 'Adicionar Novo Ativo'}
            </h2>
            
            <div className="space-y-4">
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Tipologia do Título</label>
                <select 
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as AssetType})}
                >
                    <option value="Obrigações do Tesouro (OT)">Obrigações do Tesouro (OT)</option>
                    <option value="Bilhetes do Tesouro (BT)">Bilhetes do Tesouro (BT)</option>
                    <option value="Ações">Ações</option>
                    <option value="Obrigações Corporativas">Obrigações Corporativas</option>
                    <option value="Fundos de Investimento">Fundos de Investimento</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Nome do Título (Ex: OT-TX 2026)</label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                    <input 
                        type="text" 
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-9 p-3 text-white focus:border-gold-500 outline-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Nome do ativo"
                    />
                </div>
              </div>

              {/* Purchase Date & Maturity */}
              <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Data de Compra</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                        <input 
                            type="date" 
                            className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-9 p-3 text-white focus:border-gold-500 outline-none"
                            value={formData.purchaseDate}
                            onChange={e => setFormData({...formData, purchaseDate: e.target.value})}
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Vencimento (Opcional)</label>
                    <input 
                        type="date" 
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                        value={formData.maturityDate || ''}
                        onChange={e => setFormData({...formData, maturityDate: e.target.value})}
                    />
                  </div>
              </div>

              {/* Values */}
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Valor Total Investido (Kz)</label>
                    <input 
                        type="number" 
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                        value={formData.investedAmount || ''}
                        onChange={e => setFormData({...formData, investedAmount: parseFloat(e.target.value)})}
                        placeholder="0.00"
                    />
                  </div>
                   <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Quantidade</label>
                    <input 
                        type="number" 
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                        value={formData.quantity || ''}
                        onChange={e => setFormData({...formData, quantity: parseFloat(e.target.value)})}
                        placeholder="1"
                    />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">Taxa de Juro Anual (%)</label>
                    <input 
                        type="number" 
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                        value={formData.interestRate || ''}
                        onChange={e => setFormData({...formData, interestRate: parseFloat(e.target.value)})}
                        placeholder="0.0"
                    />
                  </div>
                   <div>
                    <label className="block text-xs font-medium text-gold-500 mb-1">Preço Unitário Atual (Kz)</label>
                    <input 
                        type="number" 
                        className="w-full bg-dark-900 border border-gold-500/50 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                        value={formData.currentPrice || ''}
                        onChange={e => setFormData({...formData, currentPrice: parseFloat(e.target.value)})}
                        placeholder="Atualizar manualmente"
                    />
                  </div>
              </div>

              <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="flex-1 bg-gold-500 hover:bg-gold-600 text-black py-3 rounded-lg font-bold transition-colors"
                  >
                    {editingId ? 'Salvar Alterações' : 'Adicionar Título'}
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};