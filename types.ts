import React from 'react';

export type AssetType = 'Obrigações do Tesouro (OT)' | 'Bilhetes do Tesouro (BT)' | 'Ações' | 'Obrigações Corporativas' | 'Fundos de Investimento';

export interface Asset {
  id: string;
  name: string; // Ex: OT-TX 2025, BCGA
  type: AssetType;
  quantity: number;
  investedAmount: number; // Valor total investido na compra
  currentPrice: number; // Preço unitário atual (inserido manualmente)
  purchaseDate: string;
  maturityDate?: string; // Opcional (para Ações não tem)
  interestRate?: number; // Taxa de juro anual (Coupão) %
}

export interface User {
  name: string;
  email: string;
  subscriptionPlan: 'Free' | 'Pro' | 'Premium' | 'Gold';
  memberSince: string;
}

export interface SimulationResult {
  total: number;
  totalInvested: number;
  profit: number;
  profitPercentage: number;
}

export interface Scenarios {
  holdToMaturity: SimulationResult;
  reinvesting: SimulationResult;
}

export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  ASSETS = 'ASSETS',
  SIMULATOR = 'SIMULATOR',
  PROFILE = 'PROFILE',
}

export interface NavItem {
  page: Page;
  label: string;
  icon: React.ComponentType<any>;
}