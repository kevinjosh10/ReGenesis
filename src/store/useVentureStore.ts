import { create } from 'zustand'
import type { VentureModel, Risk } from '../types/Venture'
import type { Product } from '../types/Opportunity'
import productsData from '../data/products.json'
import { useResourceStore } from './useResourceStore'

const PRODUCTS = productsData as Product[];

interface VentureStore {
  activeVentureId: string | null;
  activeVenture: VentureModel | null;
  loadVenture: (productId: string) => void;
  clearVenture: () => void;
}

function generateDynamicMachines(product: Product): string[] {
  const machines = new Set<string>();
  
  if (product.compatibleMaterials.includes('Plastic')) {
    machines.add('Industrial Shredder');
    machines.add('Extruder');
    machines.add('Cooling Tank');
  }
  if (product.compatibleMaterials.includes('Glass')) {
    machines.add('Glass Crusher');
    machines.add('Melting Furnace');
  }
  if (product.compatibleMaterials.includes('Wood')) {
    machines.add('CNC Router');
    machines.add('Wood Chipper');
    machines.add('Sander/Finisher');
  }
  if (product.compatibleMaterials.includes('Metal')) {
    machines.add('Smelting Furnace');
    machines.add('Metal Press');
    machines.add('CNC Lathe');
  }
  if (product.compatibleMaterials.includes('Electronic')) {
    machines.add('Soldering Station');
    machines.add('Diagnostic Testing Rig');
    machines.add('Ultrasonic Cleaner');
  }
  if (product.compatibleMaterials.includes('Paper') || product.compatibleMaterials.includes('Organic')) {
    machines.add('Industrial Composter');
    machines.add('Pulping Machine');
    machines.add('Drying Press');
  }
  
  if (machines.size === 0) {
    machines.add('Assembly Line');
    machines.add('Packaging Station');
  }
  
  return Array.from(machines).slice(0, 4); // Max 4 machines for UI
}

function generateDynamicCustomers(product: Product): string[] {
  switch (product.category) {
    case 'Construction': return ['Real Estate Developers', 'Municipalities', 'Local Contractors'];
    case 'Agriculture': return ['Farmers', 'Commercial Nurseries', 'Home Gardeners'];
    case 'Transportation': return ['Urban Commuters', 'Bike Rental Fleets', 'Delivery Services'];
    case 'Interior Design': return ['Architectural Firms', 'Hotels', 'Corporate Offices'];
    case 'Technology': return ['Smart City Projects', 'Tech Hobbyists', 'Enterprise IT'];
    case 'Packaging': return ['E-commerce Brands', 'Logistics Companies', 'Retail Chains'];
    case 'Art & Design': return ['Galleries', 'Boutique Hotels', 'Interior Decorators'];
    case 'Furniture': return ['Corporate Offices', 'Co-working Spaces', 'Homeowners'];
    case 'Home Goods': return ['Retail Stores', 'Direct-to-Consumer', 'Boutique Shops'];
    case 'Infrastructure': return ['City Councils', 'Parks Departments', 'Universities'];
    case 'Apparel': return ['Eco-conscious Consumers', 'Boutique Retailers', 'Fashion Brands'];
    default: return ['B2B Wholesalers', 'Direct-to-Consumer', 'Government Contracts'];
  }
}

export const useVentureStore = create<VentureStore>((set) => ({
  activeVentureId: null,
  activeVenture: null,

  loadVenture: (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      set({ activeVentureId: null, activeVenture: null });
      return;
    }

    // 1. Get user's actual inventory
    const inventory = useResourceStore.getState().getPopulatedResources();
    
    // 2. Find relevant inventory volume
    const relevantResources = inventory.filter(r => 
      product.compatibleMaterials.includes(r.material.category as any)
    );
    
    // Total quantity in kg
    const totalQty = relevantResources.reduce((sum, r) => {
      const qtyInKg = r.unit === 'tons' ? r.quantity * 1000 : (r.unit === 'units' ? r.quantity : r.quantity);
      return sum + qtyInKg;
    }, 0);
    
    // If they have 0 inventory for this, default to a baseline of 500kg for demonstration
    const effectiveQty = totalQty > 0 ? totalQty : 500;

    // 3. Calculate dynamic financials
    // Assume 1 unit of product takes 50kg of material.
    const unitsProducedMonthly = Math.floor(effectiveQty / 50) || 1;
    
    const monthlyRevenue = unitsProducedMonthly * product.estimatedRevenuePerUnit;
    
    // Profit margin varies by difficulty
    const margin = product.difficulty === 'Easy' ? 0.45 : product.difficulty === 'Medium' ? 0.35 : 0.25;
    const monthlyProfit = Math.round(monthlyRevenue * margin);
    
    // Investment scales slightly with volume but has a base
    const scaleFactor = Math.max(1, Math.log10(effectiveQty / 100));
    const initialInvestment = Math.round(product.investmentCostEstimate * scaleFactor);
    
    const breakEvenMonths = Math.ceil(initialInvestment / (monthlyProfit || 1));

    // 4. Generate Risks dynamically
    const risks: Risk[] = [
      { name: "Market Competition", level: product.demandLevel === 'High' ? "Low Risk" : "Medium Risk" },
      { name: "Production Complexity", level: product.difficulty === 'Hard' ? "High Risk" : "Medium Risk" },
      { name: "Raw Material Supply", level: totalQty < 200 ? "High Risk" : "Low Risk" }
    ];

    const venture: VentureModel = {
      productId,
      monthlyRevenue,
      monthlyProfit,
      initialInvestment,
      breakEvenMonths,
      machines: generateDynamicMachines(product),
      customers: generateDynamicCustomers(product),
      risks,
      feasibility: breakEvenMonths < 12 ? 'High' : breakEvenMonths < 24 ? 'Medium' : 'Low'
    };

    set({
      activeVentureId: productId,
      activeVenture: venture,
    });
  },

  clearVenture: () => set({ activeVentureId: null, activeVenture: null })
}));
