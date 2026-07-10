export type ResourceCategory = 'Plastic' | 'Metal' | 'Glass' | 'Paper' | 'Wood' | 'Organic' | 'Textiles' | 'Electronic' | 'Construction';

export type ResourceStatus = 'Excellent' | 'Needs Segregation' | 'Contaminated' | 'Processing';

export interface Material {
  id: string;
  name: string;
  category: ResourceCategory;
  baseValuePerKg: number;
  recoverability: number; // 0 to 100 percentage
}

export interface ResourceItem {
  id: string;
  materialId: string;
  quantity: number;
  unit: 'kg' | 'tons' | 'units';
  condition: ResourceStatus;
  notes?: string;
  addedAt: string;
}

export interface PopulatedResourceItem extends ResourceItem {
  material: Material;
  estimatedValue: number;
}
