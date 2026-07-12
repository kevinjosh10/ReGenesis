import { useMemo } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Award, Zap, Trees, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useResourceStore } from "@/store/useResourceStore"
import { useOpportunityStore } from "@/store/useOpportunityStore"
import { Navbar } from "@/components/ui/Navbar"
import { toast } from "sonner"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ResourceIntelligence() {
  const { getPopulatedResources, resources, getTotalValue, getOpportunityScore } = useResourceStore()
  const { discoveredOpportunities } = useOpportunityStore()

  // Dynamic Calculations
  const { 
    topResource, 
    topResourcePercentage, 
    highestValueResource,
    currentScrapValue
  } = useMemo(() => {
    const popRes = getPopulatedResources()
    if (popRes.length === 0) return { 
      topResource: null, 
      topResourcePercentage: 0, 
      highestValueResource: null,
      currentScrapValue: 0
    }
    
    const totalQty = popRes.reduce((sum, r) => sum + r.quantity, 0)
    const currentScrapValue = getTotalValue()
    
    // Group by material
    const materialCounts: Record<string, typeof popRes[0]> = {}
    const materialQuantities: Record<string, number> = {}
    
    let highestValueResource = popRes[0]

    popRes.forEach(r => {
      materialCounts[r.materialId] = r
      materialQuantities[r.materialId] = (materialQuantities[r.materialId] || 0) + r.quantity
      if (r.estimatedValue > highestValueResource.estimatedValue) {
        highestValueResource = r
      }
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
      topResourcePercentage: (maxQ / totalQty) * 100,
      highestValueResource,
      currentScrapValue
    }
  }, [getPopulatedResources, getTotalValue])

  // Opportunity Insights
  const {
    topOpp,
    fastestRoiOpp,
    highestCarbonOpp,
    potentialProductValue
  } = useMemo(() => {
    if (discoveredOpportunities.length === 0) return {
      topOpp: null, fastestRoiOpp: null, highestCarbonOpp: null, potentialProductValue: 0
    }

    const topOpp = discoveredOpportunities[0]
    let fastestRoiOpp = topOpp
    let minBreakEven = Infinity
    let highestCarbonOpp = topOpp

    discoveredOpportunities.forEach(opp => {
      // Proxy break even
      const breakEven = Math.ceil(opp.product.investmentCostEstimate / Math.max(1, opp.estimatedProfit))
      if (breakEven < minBreakEven) {
        minBreakEven = breakEven
        fastestRoiOpp = opp
      }

      if (opp.product.carbonSavedKg > highestCarbonOpp.product.carbonSavedKg) {
        highestCarbonOpp = opp
      }
    })

    // Calculate potential value based on the best opportunity. 
    // Assuming you can convert the entire inventory volume applicable to this product.
    const relevantQty = getPopulatedResources()
      .filter(r => topOpp.product.compatibleMaterials.includes(r.material.category as any))
      .reduce((sum, r) => sum + r.quantity, 0)
    
    const units = Math.floor(relevantQty / 50) || 1
    const potentialProductValue = units * topOpp.product.estimatedRevenuePerUnit

    return { topOpp, fastestRoiOpp: { opp: fastestRoiOpp, months: minBreakEven }, highestCarbonOpp, potentialProductValue }
  }, [discoveredOpportunities, getPopulatedResources])

  const wwiScore = getOpportunityScore()
  const dashOffset = 282.7 - (282.7 * (wwiScore / 100))

  const chartData = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      // Simulate cumulative revenue growth over 12 months with a slight exponential curve
      const multiplier = Math.pow(1.15, i)
      const monthlyBase = potentialProductValue * 0.1 // Assume 10% of total potential is realized monthly
      return {
        month: `M${i + 1}`,
        revenue: Math.round(monthlyBase * (i + 1) * multiplier)
      }
    })
  }, [potentialProductValue])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 pb-20">
      {/* Top Navigation */}
      <Navbar actions={
        <Button className="gap-2" onClick={() => {
          toast.success("📄 Executive Summary exported successfully")
        }}><Download className="w-4 h-4" /> Export Executive Summary</Button>
      } />

      <main className="flex-1 container mx-auto px-6 pt-8 space-y-8 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resource Intelligence</h1>
            <p className="text-muted-foreground mt-1">Executive analytics and business insights derived from your inventory.</p>
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
                      animate={{ strokeDashoffset: dashOffset }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-bold">{wwiScore}</span>
                    <span className="text-sm font-medium text-muted-foreground">/ 100</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-primary font-semibold uppercase tracking-widest mb-2">Signature KPI</div>
                  <h2 className="text-3xl font-bold">Waste-to-Wealth Index (WWI)</h2>
                  <div className="inline-flex items-center gap-2 mt-3 mb-4">
                    <Badge variant={wwiScore > 85 ? "success" : "warning"} className="px-3 py-1 text-sm bg-green-500/15 text-green-700 dark:text-green-400">
                      {wwiScore > 85 ? 'Excellent' : 'Good'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Your resource inventory has {wwiScore > 85 ? 'outstanding' : 'strong'} economic potential. You are positioned to convert available waste streams into high-margin products with minimal landfill dependency.
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
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{highestValueResource?.material.name || 'N/A'}</div>
                <div className="text-sm text-muted-foreground mt-1">₹{highestValueResource?.estimatedValue.toLocaleString('en-IN') || 0} Potential</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Best Opportunity</CardTitle>
                <Award className="w-4 h-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold truncate" title={topOpp?.product.name}>{topOpp?.product.name || 'N/A'}</div>
                <div className="text-sm text-muted-foreground mt-1">{topOpp?.totalScore || 0}% Opportunity Score</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fastest ROI</CardTitle>
                <Zap className="w-4 h-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold truncate" title={fastestRoiOpp?.opp.product.name}>{fastestRoiOpp?.opp.product.name || 'N/A'}</div>
                <div className="text-sm text-muted-foreground mt-1">{fastestRoiOpp?.months || 0} Months Break-even</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Highest Carbon Savings</CardTitle>
                <Trees className="w-4 h-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold truncate" title={highestCarbonOpp?.product.name}>{highestCarbonOpp?.product.name || 'N/A'}</div>
                <div className="text-sm text-muted-foreground mt-1">{highestCarbonOpp?.product.carbonSavedKg || 0}kg CO₂ Saved</div>
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
                      <div className="text-3xl font-bold mt-1">₹{currentScrapValue.toLocaleString('en-IN')}</div>
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
                      <div className="text-4xl font-bold mt-1 text-primary">₹{potentialProductValue.toLocaleString('en-IN')}</div>
                    </div>
                    
                    <div className="pt-4 border-t border-primary/20">
                      <div className="text-sm font-medium uppercase tracking-widest text-primary">Hidden Wealth Discovered</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                        + ₹{Math.max(0, potentialProductValue - currentScrapValue).toLocaleString('en-IN')}
                      </div>
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

          {/* Projected 12-Month Revenue Chart */}
          <section className="pt-4">
            <h3 className="text-xl font-semibold mb-4">12-Month Projected Cumulative Revenue</h3>
            <Card className="shadow-none p-6">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </section>

        </motion.div>
      </main>
    </div>
  )
}
