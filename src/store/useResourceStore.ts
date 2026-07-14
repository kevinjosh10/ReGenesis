import { create } from 'zustand'
import type { Material, PopulatedResourceItem, ResourceItem } from '../types/Resource'
import materialsData from '../data/materials.json'

const MOCK_MATERIALS = materialsData as Material[];
import collegeCampus from '../knowledge/templates/college-campus.json';
import manufacturingPlant from '../knowledge/templates/manufacturing-plant.json';

const templates: Record<string, any> = {
  'college-campus': collegeCampus,
  'manufacturing-plant': manufacturingPlant
};

interface ResourceStore {
  resources: ResourceItem[];
  addResource: (resource: Omit<ResourceItem, 'id' | 'addedAt'>) => void;
  removeResource: (id: string) => void;
  loadDemoData: (templateId?: string) => void;
  
  // Selectors
  getPopulatedResources: () => PopulatedResourceItem[];
  getTotalValue: () => number;
  getCircularScore: () => number;
  getOpportunityScore: () => number;
  getEnvironmentalImpact: () => { treesSaved: number; waterConservedLiters: number; co2PreventedKg: number; };
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  resources: [],
  
  addResource: (resource) => set((state) => ({
    resources: [
      {
        ...resource,
        id: `res_${Math.random().toString(36).substring(2, 9)}`,
        addedAt: new Date().toISOString()
      },
      ...state.resources
    ]
  })),

  removeResource: (id) =>
    set((state) => ({
      resources: state.resources.filter((r) => r.id !== id)
    })),

  loadDemoData: (templateId = 'college-campus') => set({
    resources: templates[templateId] || templates['college-campus']
  }),
    
  getPopulatedResources: () => {
    const { resources } = get();
    return resources.map(res => {
      const material = MOCK_MATERIALS.find(m => m.id === res.materialId);
      // Fallback in case material is deleted
      const safeMaterial = material || { id: 'unknown', name: 'Unknown', category: 'Plastic', baseValuePerKg: 0, recoverability: 0 };
      
      // Calculate quantity in kg
      const qtyInKg = res.unit === 'tons' ? res.quantity * 1000 : (res.unit === 'units' ? res.quantity : res.quantity);
      
      // Condition multiplier
      let conditionMultiplier = 1;
      switch (res.condition) {
        case 'Excellent': conditionMultiplier = 1.0; break;
        case 'Processing': conditionMultiplier = 0.8; break;
        case 'Needs Segregation': conditionMultiplier = 0.5; break;
        case 'Contaminated': conditionMultiplier = 0.2; break;
      }
      
      // Market Scarcity Multiplier - adds dynamic market simulation
      let marketPremium = 1.0;
      switch (safeMaterial.category) {
        case 'Electronic': marketPremium = 2.4; break;
        case 'Metal': marketPremium = 1.8; break;
        case 'Plastic': marketPremium = 1.2; break;
        case 'Paper': marketPremium = 1.1; break;
        default: marketPremium = 1.0; break;
      }
      
      // We calculate raw value based on total kg * baseValuePerKg
      const rawValue = qtyInKg * safeMaterial.baseValuePerKg;
      
      // Finally, adjust for recoverability, condition, and market premium
      const estimatedValue = rawValue * (safeMaterial.recoverability / 100) * conditionMultiplier * marketPremium;
      
      return {
        ...res,
        material: safeMaterial,
        estimatedValue
      };
    });
  },

  getTotalValue: () => {
    return get().getPopulatedResources().reduce((total, res) => total + res.estimatedValue, 0);
  },

  getCircularScore: () => {
    const pop = get().getPopulatedResources();
    if (pop.length === 0) return 0;
    
    // Simple average recoverability for now
    const totalRecov = pop.reduce((sum, res) => sum + res.material.recoverability, 0);
    return Math.round(totalRecov / pop.length);
  },

  getOpportunityScore: () => {
    const score = get().getCircularScore();
    // Some arbitrary mock formula
    return Math.min(100, score + 4);
  },

  getEnvironmentalImpact: () => {
    const pop = get().getPopulatedResources();
    let treesSaved = 0;
    let waterConservedLiters = 0;
    let co2PreventedKg = 0;

    pop.forEach(res => {
      const qtyInKg = res.unit === 'tons' ? res.quantity * 1000 : (res.unit === 'units' ? res.quantity : res.quantity);
      
      // CO2 prevented is generally universal for recycling
      co2PreventedKg += qtyInKg * 2.5;

      if (res.material.category === 'Paper' || res.material.category === 'Wood') {
        treesSaved += qtyInKg / 50; // Roughly 1 tree per 50kg
      }
      if (res.material.category === 'Plastic' || res.material.category === 'Metal') {
        waterConservedLiters += qtyInKg * 45; // Roughly 45L saved per kg compared to virgin production
      }
    });

    return {
      treesSaved: Math.round(treesSaved),
      waterConservedLiters: Math.round(waterConservedLiters),
      co2PreventedKg: Math.round(co2PreventedKg)
    };
  }
}));
