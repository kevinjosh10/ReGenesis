export type RiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk';

export interface Risk {
  name: string;
  level: RiskLevel;
}

export interface VentureModel {
  productId: string;
  monthlyRevenue: number;
  monthlyProfit: number;
  initialInvestment: number;
  breakEvenMonths: number;
  machines: string[];
  customers: string[];
  risks: Risk[];
  feasibility: 'Low' | 'Medium' | 'High';
}
