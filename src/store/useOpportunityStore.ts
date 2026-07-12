import { create } from 'zustand'
import type { DiscoveredOpportunity, OpportunityScoreDetail, Product } from '../types/Opportunity'
import type { PopulatedResourceItem } from '../types/Resource'
import productsData from '../data/products.json'

const MOCK_PRODUCTS = productsData as Product[];

interface OpportunityStore {
  discoveredOpportunities: DiscoveredOpportunity[];
  analyzeInventory: (resources: PopulatedResourceItem[]) => void;
  
  // Composer state
  selectedMixerCategories: string[]; // Categories currently in the mixing tray
  mixedOpportunities: DiscoveredOpportunity[];
  toggleMixerCategory: (category: string) => void;
  generateFromMix: (resources: PopulatedResourceItem[]) => void;
}

function calculateScoreDetail(product: Product, availableCategories: Set<string>): OpportunityScoreDetail {
  // Dynamic logic to evaluate the score components
  // Profit Potential (Max 30)
  const profitPotential = Math.max(0, Math.min(30, (product.estimatedRevenuePerUnit - product.investmentCostEstimate) / 5000));
  
  // Market Demand (Max 25)
  const marketDemand = product.demandLevel === 'High' ? 25 : product.demandLevel === 'Medium' ? 15 : 5;
  
  // Resource Utilization (Max 20)
  // How many of the product's compatible materials do we actually have?
  const matchedCount = product.compatibleMaterials.filter(cat => availableCategories.has(cat as any)).length;
  const utilizationRatio = matchedCount / product.compatibleMaterials.length;
  const resourceUtilization = Math.round(utilizationRatio * 20);

  // Sustainability (Max 15)
  const sustainability = Math.round((product.sustainabilityScore / 100) * 15);
  
  // Investment Feasibility (Max 10)
  const investment = product.investmentCostLevel === 'Low' ? 10 : product.investmentCostLevel === 'Medium' ? 7 : 3;

  return {
    profitPotential,
    marketDemand,
    resourceUtilization,
    sustainability,
    investment
  }
}

export const useOpportunityStore = create<OpportunityStore>((set) => ({
  discoveredOpportunities: [],
  
  analyzeInventory: (resources) => {
    // 1. Find all products that can be made with the available resource categories
    const availableCategories = new Set(resources.map(r => r.material.category));
    
    const possibleProducts = MOCK_PRODUCTS.filter(product => {
      // check if we have at least ONE of the required categories (in a real app, logic would be stricter)
      return product.compatibleMaterials.some(reqCat => availableCategories.has(reqCat as any));
    });

    // 2. Map them to DiscoveredOpportunity and calculate scores
    const opportunities: DiscoveredOpportunity[] = possibleProducts.map(product => {
      const scoreDetails = calculateScoreDetail(product, availableCategories);
      const totalScore = Math.round(
        scoreDetails.profitPotential + 
        scoreDetails.marketDemand + 
        scoreDetails.resourceUtilization + 
        scoreDetails.sustainability + 
        scoreDetails.investment
      );

      // Find the resources that match this product
      const matchedResources = resources.filter(r => product.compatibleMaterials.includes(r.material.category as any));

      return {
        product,
        scoreDetails,
        totalScore,
        matchedResourceIds: matchedResources.map(r => r.id),
        estimatedProfit: product.estimatedRevenuePerUnit - product.investmentCostEstimate,
        confidence: Math.round(Math.min(99, 75 + (totalScore / 5))) // Cap at 99%
      };
    });

      // 3. Sort by totalScore descending
      opportunities.sort((a, b) => b.totalScore - a.totalScore);
  
      set({ discoveredOpportunities: opportunities });
    },
  
    // Composer implementations
    selectedMixerCategories: [],
    mixedOpportunities: [],
    
    toggleMixerCategory: (category) => {
      set((state) => {
        const isSelected = state.selectedMixerCategories.includes(category);
        return {
          selectedMixerCategories: isSelected
            ? state.selectedMixerCategories.filter(c => c !== category)
            : [...state.selectedMixerCategories, category]
        };
      });
    },
  
    generateFromMix: (resources) => {
      set((state) => {
        const { selectedMixerCategories } = state;
        if (selectedMixerCategories.length === 0) {
          return { mixedOpportunities: [] };
        }
  
        const possibleProducts = MOCK_PRODUCTS.filter(product => {
          // A product is viable if its compatible materials overlap with the mixer categories
          return product.compatibleMaterials.some(reqCat => selectedMixerCategories.includes(reqCat));
        });
  
        const availableMixSet = new Set(selectedMixerCategories);
        const opportunities: DiscoveredOpportunity[] = possibleProducts.map(product => {
          const scoreDetails = calculateScoreDetail(product, availableMixSet);
          
          let totalScore = Math.round(
            scoreDetails.profitPotential + 
            scoreDetails.marketDemand + 
            scoreDetails.resourceUtilization + 
            scoreDetails.sustainability + 
            scoreDetails.investment
          );

          // Calculate Synergy Bonus
          const matchedCategories = product.compatibleMaterials.filter(reqCat => 
            selectedMixerCategories.includes(reqCat)
          );
          
          const productMatchRatio = matchedCategories.length / product.compatibleMaterials.length;
          const userUtilizationRatio = matchedCategories.length / selectedMixerCategories.length;
          
          let synergyBonus = 0;
          
          // Bonus 1: Complex products that use multiple matched materials get a massive boost
          if (matchedCategories.length > 1) {
            synergyBonus += matchedCategories.length * 25; 
          }
          
          // Bonus 2: Perfect utilization of the user's mixing tray
          if (userUtilizationRatio === 1 && matchedCategories.length > 1) {
            synergyBonus += 20;
          }

          // Penalty: The product requires materials the user DIDN'T put in the tray
          if (productMatchRatio < 1) {
            totalScore -= 15;
          }

          totalScore += synergyBonus;
  
          // Only map resources that are in the user's inventory AND in the current selected mix
          const matchedResources = resources.filter(r => 
            product.compatibleMaterials.includes(r.material.category as any) &&
            selectedMixerCategories.includes(r.material.category)
          );
  
          return {
            product,
            scoreDetails,
            totalScore,
            synergyBonus: synergyBonus > 0 ? synergyBonus : undefined,
            matchedResourceIds: matchedResources.map(r => r.id),
            estimatedProfit: product.estimatedRevenuePerUnit - product.investmentCostEstimate,
            confidence: Math.round(Math.min(99, 70 + (totalScore / 5))) 
          };
        });
  
        opportunities.sort((a, b) => b.totalScore - a.totalScore);
        
        return { mixedOpportunities: opportunities };
      });
    }
  }));
