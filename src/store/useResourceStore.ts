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
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  resources: [
    {
      id: 'res_1',
      materialId: 'mat_1',
      quantity: 250,
      unit: 'kg',
      condition: 'Excellent',
      addedAt: new Date().toISOString()
    },
    {
      id: 'res_2',
      materialId: 'mat_2',
      quantity: 45,
      unit: 'kg',
      condition: 'Needs Segregation',
      addedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  
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
      
      // We calculate raw value based on total kg * baseValuePerKg
      const rawValue = qtyInKg * safeMaterial.baseValuePerKg;
      
      // Finally, adjust for recoverability and condition
      const estimatedValue = rawValue * (safeMaterial.recoverability / 100) * conditionMultiplier;
      
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
  }
}));
