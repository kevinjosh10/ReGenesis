import type { ResourceCategory } from './Resource'

export interface Product {
  id: string;
  name: string;
  category: string; // e.g., 'Construction', 'Furniture'
  compatibleMaterials: ResourceCategory[]; // What waste streams can make this?
  estimatedRevenuePerUnit: number;
  investmentCostLevel: 'Low' | 'Medium' | 'High';
  investmentCostEstimate: number;
  demandLevel: 'Low' | 'Medium' | 'High';
  sustainabilityScore: number; // 0 to 100
  carbonSavedKg: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface OpportunityScoreDetail {
  profitPotential: number; // Max 30
  marketDemand: number; // Max 25
  resourceUtilization: number; // Max 20
  sustainability: number; // Max 15
  investment: number; // Max 10
}

export interface DiscoveredOpportunity {
  product: Product;
  totalScore: number;
  scoreDetails: OpportunityScoreDetail;
  matchedResourceIds: string[]; // which user resources are used for this opportunity
  estimatedProfit: number;
  confidence: number;
  synergyBonus?: number; // Added to indicate how well the product matches multiple mixed categories
}
