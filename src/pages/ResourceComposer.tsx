import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Plus, Sparkles, Check, Package, Factory, Droplet, TreePine, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useResourceStore } from "@/store/useResourceStore"
import { useOpportunityStore } from "@/store/useOpportunityStore"
import { OpportunityCard } from "@/components/ui/OpportunityCard"
import { Link } from "react-router-dom"
import type { ResourceCategory } from "@/types/Resource"
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

export function ResourceComposer() {
  const { getPopulatedResources } = useResourceStore()
  const { 
    selectedMixerCategories, 
    toggleMixerCategory, 
    generateFromMix, 
    mixedOpportunities 
  } = useOpportunityStore()
  
  const [hasGenerated, setHasGenerated] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const resources = getPopulatedResources()

  // Get unique categories from all available materials so users can sandbox freely
  const availableCategories = Array.from(new Set(materialsData.map((m: any) => m.category)))

  const handleGenerate = () => {
    setIsScanning(true)
    setHasGenerated(false)
    setTimeout(() => {
      generateFromMix(resources)
      setHasGenerated(true)
      setIsScanning(false)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight">Resource Composer</h2>
          <p className="text-muted-foreground mt-2">
            Select materials from your inventory to discover specific manufacturing possibilities. Mix and match to find hidden value.
          </p>
        </div>

        {/* The Laboratory Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Panel: Available Resources */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-medium">Available Resources</h3>
            <div className="space-y-2">
              {availableCategories.map(category => {
                const Icon = CategoryIcons[category as ResourceCategory] || Package;
                const isSelected = selectedMixerCategories.includes(category);
                
                return (
                  <motion.div 
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      toggleMixerCategory(category)
                      setHasGenerated(false)
                    }}
                  >
                    <Card className={`cursor-pointer transition-all shadow-none ${isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{category}</span>
                        </div>
                        {isSelected ? (
                          <Check className="w-4 h-4 text-primary" />
                        ) : (
                          <Plus className="w-4 h-4 text-muted-foreground" />
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              {availableCategories.length === 0 && (
                <div className="p-6 text-center border rounded-xl border-dashed">
                  <Package className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                  <div className="text-sm font-medium">No resources found</div>
                  <Link to="/dashboard" className="text-xs text-primary hover:underline mt-1 block">Go to Inventory to add some.</Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Mixing Tray & Results */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Mixing Tray */}
            <div className="p-6 rounded-2xl border bg-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-emerald-500 to-teal-500 opacity-50" />
              {isScanning && (
                <motion.div 
                  className="absolute inset-0 bg-primary/5 z-0 pointer-events-none"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  style={{ borderBottom: '2px solid hsl(var(--primary))' }}
                />
              )}
              <h3 className="text-lg font-medium mb-4 relative z-10">Mixing Tray</h3>
              
              <div className="min-h-[120px] p-6 rounded-xl bg-secondary/30 border border-dashed border-muted-foreground/30 flex flex-wrap gap-3 items-center justify-center relative z-10">
                <AnimatePresence>
                  {selectedMixerCategories.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="text-muted-foreground text-sm text-center"
                    >
                      Click resources on the left to add them to the tray.
                    </motion.div>
                  )}
                  
                  {selectedMixerCategories.map((category, idx) => {
                    const Icon = CategoryIcons[category as ResourceCategory] || Package;
                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        className="flex items-center gap-2 px-4 py-2 bg-background border rounded-full shadow-sm font-medium text-sm"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        {category}
                        {idx < selectedMixerCategories.length - 1 && (
                          <span className="ml-2 text-muted-foreground/50">+</span>
                        )}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              <div className="mt-6 flex justify-center relative z-10">
                <Button 
                  size="lg" 
                  className={`px-8 rounded-full shadow-md gap-2 group relative overflow-hidden transition-all ${isScanning ? 'bg-primary/80 scale-95' : ''}`}
                  onClick={handleGenerate}
                  disabled={selectedMixerCategories.length === 0 || isScanning}
                >
                  {!isScanning && <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  {isScanning ? <Cpu className="w-4 h-4 animate-pulse relative z-10" /> : <Sparkles className="w-4 h-4 relative z-10" />}
                  <span className="relative z-10">{isScanning ? 'Analyzing Combinations...' : 'Generate Opportunities'}</span>
                </Button>
              </div>
            </div>

            {/* Results Section */}
            {hasGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-4 border-t"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Discovered Products</h3>
                  <span className="text-sm text-muted-foreground">Found {mixedOpportunities.length} matches</span>
                </div>

                {mixedOpportunities.length === 0 ? (
                  <Card className="shadow-none border-dashed bg-secondary/20">
                    <CardContent className="p-10 text-center">
                      <Factory className="w-10 h-10 mx-auto text-muted-foreground mb-4 opacity-50" />
                      <h4 className="font-medium text-lg">No strong manufacturing opportunities found.</h4>
                      <p className="text-muted-foreground mt-2 text-sm">Try adding or removing a compatible material in the mixing tray.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {mixedOpportunities.map((opp, idx) => (
                      <OpportunityCard key={opp.product.id} opportunity={opp} isBest={idx === 0} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}
