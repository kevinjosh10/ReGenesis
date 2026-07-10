import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Leaf, TrendingUp, Award, Zap, Trees, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useResourceStore } from "@/store/useResourceStore"
import { useOpportunityStore } from "@/store/useOpportunityStore"

export function ResourceIntelligence() {
  const { getPopulatedResources, resources } = useResourceStore()
  const { discoveredOpportunities } = useOpportunityStore()

  // Calculate top resource
  const { topResource, topResourcePercentage } = useMemo(() => {
    const popRes = getPopulatedResources()
    if (popRes.length === 0) return { topResource: null, topResourcePercentage: 0 }
    const totalQty = popRes.reduce((sum, r) => sum + r.quantity, 0)
    
    // Group by material
    const materialCounts: Record<string, typeof popRes[0]> = {}
    const materialQuantities: Record<string, number> = {}
    
    popRes.forEach(r => {
      materialCounts[r.materialId] = r
      materialQuantities[r.materialId] = (materialQuantities[r.materialId] || 0) + r.quantity
    })
    
    let topId = ''
    let maxQ = 0
    for (const [id, q] of Object.entries(materialQuantities)) {
      if (q > maxQ) {
        maxQ = q
        topId = id
      }
    }
    
    return {
      topResource: materialCounts[topId],
      topResourcePercentage: (maxQ / totalQty) * 100
    }
  }, [getPopulatedResources])

  const topOpp = discoveredOpportunities[0]
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 pb-20">
      {/* Top Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">ReGenesis</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 border rounded-md p-1 bg-muted/50">
              <Link to="/dashboard" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Inventory</Link>
              <Link to="/opportunities" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Engine</Link>
              <Link to="/composer" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Composer</Link>
              <Link to="/studio" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Studio</Link>
              <div className="px-3 py-1 text-sm font-medium bg-background rounded shadow-sm">Insights</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">JD</div>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 pt-8 space-y-8 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resource Intelligence</h1>
            <p className="text-muted-foreground mt-1">Executive analytics and business insights derived from your inventory.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="gap-2" asChild><Link to="/report"><Download className="w-4 h-4" /> Export Executive Summary</Link></Button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >

          {/* Waste-to-Wealth Index (WWI) - The Signature KPI */}
          <section>
            <Card className="bg-card overflow-hidden relative border-primary/20 shadow-lg">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="45" className="stroke-muted fill-none" strokeWidth="8" />
                    <motion.circle 
                      cx="50" cy="50" r="45" 
                      className="stroke-primary fill-none drop-shadow-md" 
                      strokeWidth="8" 
                      strokeLinecap="round"
                      strokeDasharray="282.7" 
                      initial={{ strokeDashoffset: 282.7 }}
                      animate={{ strokeDashoffset: 282.7 - (282.7 * 0.91) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-bold">91</span>
                    <span className="text-sm font-medium text-muted-foreground">/ 100</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-primary font-semibold uppercase tracking-widest mb-2">Signature KPI</div>
                  <h2 className="text-3xl font-bold">Waste-to-Wealth Index (WWI)</h2>
                  <div className="inline-flex items-center gap-2 mt-3 mb-4">
                    <Badge variant="success" className="px-3 py-1 text-sm bg-green-500/15 text-green-700 dark:text-green-400">Excellent</Badge>
                  </div>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Your resource inventory has outstanding economic potential. You are highly positioned to convert available waste streams into high-margin products with minimal landfill dependency.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Executive Insights Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Highest Value Resource</CardTitle>
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Plastic</div>
                <div className="text-sm text-muted-foreground mt-1">₹1,42,000 Potential</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Best Opportunity</CardTitle>
                <Award className="w-4 h-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Plastic Lumber</div>
                <div className="text-sm text-muted-foreground mt-1">96% Opportunity Score</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fastest ROI</CardTitle>
                <Zap className="w-4 h-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Eco Bricks</div>
                <div className="text-sm text-muted-foreground mt-1">4 Months Break-even</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Highest Carbon Savings</CardTitle>
                <Trees className="w-4 h-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Construction Panels</div>
                <div className="text-sm text-muted-foreground mt-1">1.8 Tons CO₂ Saved</div>
              </CardContent>
            </Card>
          </section>

          {/* Hidden Wealth Analysis & Resource Story */}
          <div className="grid lg:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Hidden Wealth Analysis</h3>
              <Card className="shadow-none border-primary/20 bg-primary/5">
                <CardContent className="p-8">
                  <div className="flex flex-col space-y-6">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Current Scrap Value</div>
                      <div className="text-3xl font-bold mt-1">₹38,000</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-border"></div>
                      <div className="w-8 h-8 rounded-full bg-background border flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 h-px bg-border"></div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Potential Product Value</div>
                      <div className="text-4xl font-bold mt-1 text-primary">₹1,52,000</div>
                    </div>
                    
                    <div className="pt-4 border-t border-primary/20">
                      <div className="text-sm font-medium uppercase tracking-widest text-primary">Hidden Wealth Discovered</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">+ ₹1,14,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Decision Insights</h3>
              <Card className="shadow-none h-full">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">The Resource Story</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {resources.length === 0 ? (
                        "Your inventory is currently empty. Add resources to discover insights."
                      ) : (
                        <>
                          {topResource && topResourcePercentage > 40 ? (
                            <span>Your inventory is dominated by <strong className="text-foreground">{topResource.material.name}</strong>, which represents {Math.round(topResourcePercentage)}% of total resources. </span>
                          ) : (
                            <span>Your inventory has a diverse mix of resources. </span>
                          )}
                          {topOpp && (
                            <span>By prioritizing <strong className="text-foreground">{topOpp.product.name} manufacturing</strong>, your organization can maximize both revenue and sustainability. </span>
                          )}
                          {topOpp && topOpp.totalScore > 90 && (
                            <span className="text-green-600 dark:text-green-400 font-medium">This is a high-priority venture with excellent viability. </span>
                          )}
                          {topOpp && topOpp.totalScore <= 90 && (
                            <span>Consider expanding your inventory to unlock even higher-scoring opportunities. </span>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t">
                    {topResource && topResourcePercentage > 40 && (
                      <div className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-muted-foreground">1</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{topResource.material.name} contributes heavily to your resource value.</p>
                      </div>
                    )}
                    {topOpp && topOpp.totalScore > 90 && (
                      <div className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-muted-foreground">2</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{topOpp.product.name} has a proven ROI and high market demand.</p>
                      </div>
                    )}
                    {topOpp && (
                      <div className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-muted-foreground">3</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Focusing on {topOpp.product.category} unlocks the highest-value products.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Opportunity Heatmap */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Opportunity Heatmap</h3>
            <Card className="shadow-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4 font-medium">Resource</th>
                      <th className="px-6 py-4 font-medium text-center">Construction</th>
                      <th className="px-6 py-4 font-medium text-center">Furniture</th>
                      <th className="px-6 py-4 font-medium text-center">Packaging</th>
                      <th className="px-6 py-4 font-medium text-center">Consumer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">Plastic</td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-yellow-400 mx-auto"></div></td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">Wood</td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-yellow-400 mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto"></div></td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">Metal</td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-secondary mx-auto"></div></td>
                      <td className="px-6 py-4 text-center"><div className="w-3 h-3 rounded-full bg-yellow-400 mx-auto"></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

        </motion.div>
      </main>
    </div>
  )
}
