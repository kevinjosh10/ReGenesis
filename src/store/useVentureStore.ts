import { create } from 'zustand'
import type { VentureModel } from '../types/Venture'
import venturesData from '../data/ventures.json'

const MOCK_VENTURES = venturesData as VentureModel[];

interface VentureStore {
  activeVentureId: string | null;
  activeVenture: VentureModel | null;
  loadVenture: (productId: string) => void;
  clearVenture: () => void;
}

export const useVentureStore = create<VentureStore>((set) => ({
  activeVentureId: null,
  activeVenture: null,

  loadVenture: (productId) => {
    const venture = MOCK_VENTURES.find(v => v.productId === productId) || null;
    set({
      activeVentureId: productId,
      activeVenture: venture,
    });
  },

  clearVenture: () => set({ activeVentureId: null, activeVenture: null })
}));
