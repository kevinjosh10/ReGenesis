import React, { useState } from "react"
import { Leaf, Plus, Package, Factory, TrendingUp, AlertTriangle, Cpu, Droplet, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useResourceStore } from "@/store/useResourceStore"
import { toast } from "sonner"
import type { ResourceCategory, ResourceStatus } from "@/types/Resource"
import materialsData from "@/data/materials.json"
import { Navbar } from "@/components/ui/Navbar"

const CategoryIcons: Record<ResourceCategory, React.ElementType> = {
  Plastic: Package,
  Metal: Factory,
  Paper: Leaf,
  Electronic: Cpu,
  Organic: Leaf,
  Glass: Droplet,
  Wood: TreePine,
  Textiles: Package,
  Construction: Factory,
}

export function CommandCenter() {
  const { getPopulatedResources, getTotalValue, getCircularScore, getOpportunityScore, addResource } = useResourceStore()
  
  const resources = getPopulatedResources()
  const totalValue = getTotalValue()
  const circularScore = getCircularScore()
  const opportunityScore = getOpportunityScore()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    materialId: materialsData[0].id,
    quantity: 100,
    unit: 'kg' as 'kg' | 'tons' | 'units',
    condition: 'Excellent' as ResourceStatus,
  })

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addResource({
      materialId: formData.materialId,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      condition: formData.condition
    })
    setIsAddModalOpen(false)
    toast.success(`✨ ${formData.quantity}${formData.unit} of resource added successfully!`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      {/* Top Navigation */}
      <Navbar actions={
        <Button variant="outline" size="sm" onClick={() => {
          const csvContent = "data:text/csv;charset=utf-8," 
            + "ID,Material,Category,Quantity,Unit,Condition,Location,Scrap Value\n"
            + resources.map(r => `${r.id},${r.material.name},${r.material.category},${r.quantity},${r.unit},${r.condition},N/A,${r.estimatedValue}`).join("\n");
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "regenesis_inventory.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("📄 Report exported successfully")
        }}>Export CSV</Button>
      } />

      <main className="flex-1 container mx-auto px-6 py-8 space-y-8">
        
        {/* Executive Summary */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Command Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resource Inventory Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalValue.toLocaleString('en-IN')}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated recoverable value <span className="text-green-500 font-medium">↑12%</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Circular Economy Score</CardTitle>
                <Leaf className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{circularScore}%</div>
                <div className="h-2 w-full bg-secondary rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${circularScore}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Manufacturing Potential</CardTitle>
                <Factory className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">High</div>
                <p className="text-xs text-muted-foreground mt-1">
                  12 products can be manufactured.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Opportunity Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{opportunityScore}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Excellent resource utilization.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Resource Inventory List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Resource Inventory</h3>
              <Button size="sm" className="gap-2" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4" /> Add Resource
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 pb-2 styled-scrollbar">
              {resources.map(res => {
                const Icon = CategoryIcons[res.material.category] || Package;
                return (
                  <Card key={res.id} className="group hover:border-primary/50 transition-colors shadow-none cursor-pointer">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <div className="font-semibold">{res.material.name}</div>
                            <div className="text-sm text-muted-foreground">{res.material.category}</div>
                          </div>
                        </div>
                        <Badge variant={res.condition === 'Excellent' ? 'success' : res.condition === 'Needs Segregation' ? 'warning' : 'secondary'}>
                          {res.condition}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                        <div>
                          <div className="text-xs text-muted-foreground">Quantity</div>
                          <div className="font-medium text-sm">{res.quantity} {res.unit}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Est. Value</div>
                          <div className="font-medium text-sm">₹{res.estimatedValue.toLocaleString('en-IN')}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Recoverability</div>
                          <div className="font-medium text-sm">{res.material.recoverability}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
              {resources.length === 0 && (
                <div className="col-span-2 p-8 text-center border rounded-xl border-dashed">
                  <Package className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                  <div className="font-medium">No resources found</div>
                  <div className="text-sm text-muted-foreground mt-1">Add your first resource to see its hidden value.</div>
                </div>
              )}
            </div>
          </div>

          {/* Intelligence Panel */}
          <div className="space-y-4 sticky top-20">
            <h3 className="text-lg font-medium">Resource Intelligence</h3>
            <Card className="shadow-none">
              <CardContent className="p-4 space-y-5">
                
                {/* Key Observation */}
                <div className="bg-secondary/40 p-3 rounded-lg border border-secondary">
                  <div className="text-sm font-medium flex items-center gap-2 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-primary" /> Key Observation
                  </div>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">Plastic</span> contributes <span className="font-medium text-foreground">46%</span> of total value. Segregating e-waste could add 15%.
                  </div>
                </div>

                {/* Category Breakdown */}
                <div>
                  <div className="text-sm font-medium mb-3">Category Breakdown</div>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Plastic</span>
                        <span className="font-medium">46%</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '46%' }} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Metal</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '32%' }} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Other</span>
                        <span className="font-medium">22%</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-muted-foreground/30" style={{ width: '22%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact Widget */}
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-3 flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-green-500" /> Environmental Impact
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                        <TreePine className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Trees Saved</div>
                        <div className="text-sm font-semibold">{useResourceStore().getEnvironmentalImpact().treesSaved.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Droplet className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Water Conserved (Liters)</div>
                        <div className="text-sm font-semibold">{useResourceStore().getEnvironmentalImpact().waterConservedLiters.toLocaleString('en-IN')}L</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">CO₂ Prevented</div>
                        <div className="text-sm font-semibold">{useResourceStore().getEnvironmentalImpact().co2PreventedKg.toLocaleString('en-IN')} kg</div>
                      </div>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
          
        </div>
      </main>

      {/* Add Resource Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Resource"
        description="Register a new material stream into your inventory to evaluate its value."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="materialId">Material Type</Label>
            <Select 
              id="materialId" 
              value={formData.materialId} 
              onChange={e => setFormData({...formData, materialId: e.target.value})}
            >
              {materialsData.map(mat => (
                <option key={mat.id} value={mat.id}>{mat.name} ({mat.category})</option>
              ))}
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                min="1" 
                value={formData.quantity} 
                onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select 
                id="unit" 
                value={formData.unit} 
                onChange={e => setFormData({...formData, unit: e.target.value as any})}
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="tons">Tons</option>
                <option value="units">Units</option>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select 
              id="condition" 
              value={formData.condition} 
              onChange={e => setFormData({...formData, condition: e.target.value as any})}
            >
              <option value="Excellent">Excellent</option>
              <option value="Needs Segregation">Needs Segregation</option>
              <option value="Contaminated">Contaminated</option>
              <option value="Processing">Processing</option>
            </Select>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Resource</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
