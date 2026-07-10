import { create } from 'zustand'
import type { Material, PopulatedResourceItem, ResourceItem } from '../types/Resource'
import materialsData from '../data/materials.json'

const MOCK_MATERIALS = materialsData as Material[];

interface ResourceStore {
  resources: ResourceItem[];
  addResource: (resource: Omit<ResourceItem, 'id' | 'addedAt'>) => void;
  removeResource: (id: string) => void;
  loadDemoData: () => void;
  
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

  loadDemoData: () => set({
    resources: [
      { id: '1', materialId: 'mat_1', quantity: 250, unit: 'kg', condition: 'Excellent', addedAt: new Date().toISOString() },
      { id: '2', materialId: 'mat_4', quantity: 80, unit: 'kg', condition: 'Excellent', addedAt: new Date().toISOString() },
      { id: '3', materialId: 'mat_2', quantity: 120, unit: 'kg', condition: 'Needs Segregation', addedAt: new Date().toISOString() },
      { id: '4', materialId: 'mat_3', quantity: 40, unit: 'kg', condition: 'Excellent', addedAt: new Date().toISOString() }
    ]
  }),
    
  getPopulatedResources: () => {
    const { resources } = get();
    return resources.map(res => {
      const material = MOCK_MATERIALS.find(m => m.id === res.materialId);
      // Fallback in case material is deleted
      const safeMaterial = material || { id: 'unknown', name: 'Unknown', category: 'Plastic', baseValuePerKg: 0, recoverability: 0 };
      
      const estimatedValue = res.quantity * safeMaterial.baseValuePerKg * (safeMaterial.recoverability / 100);
      
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
