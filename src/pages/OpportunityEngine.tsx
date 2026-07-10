import { useEffect } from "react"
import { Leaf, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { OpportunityCard } from "@/components/ui/OpportunityCard"
import { useResourceStore } from "@/store/useResourceStore"
import { useOpportunityStore } from "@/store/useOpportunityStore"
import { Link } from "react-router-dom"

export function OpportunityEngine() {
  const { getPopulatedResources } = useResourceStore()
  const { analyzeInventory, discoveredOpportunities } = useOpportunityStore()
  
  useEffect(() => {
    // Run the engine logic against the current inventory when the page loads
    analyzeInventory(getPopulatedResources())
  }, [getPopulatedResources, analyzeInventory])

  const bestOpportunity = discoveredOpportunities[0]
  const highPotential = discoveredOpportunities.slice(1, 3)
  const emergingIdeas = discoveredOpportunities.slice(3)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
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
              <div className="px-3 py-1 text-sm font-medium bg-background rounded shadow-sm">Engine</div>
              <Link to="/composer" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Composer</Link>
              <Link to="/studio" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Studio</Link>
              <Link to="/intelligence" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Insights</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">JD</div>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-8 space-y-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Opportunity Engine</h2>
            <p className="text-muted-foreground text-sm mt-1">Discover what your resources can become.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search opportunities..." className="pl-8 bg-card" />
            </div>
            <Button variant="outline" size="icon"><SlidersHorizontal className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><ArrowUpDown className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Engine Output */}
        {discoveredOpportunities.length === 0 ? (
          <Card className="border-dashed shadow-none">
            <CardContent className="p-12 text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Opportunities Found</h3>
              <p className="text-muted-foreground mb-4">Add more resources to your inventory to discover manufacturing opportunities.</p>
              <Button asChild>
                <Link to="/dashboard">Go to Inventory</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            
            {/* 🥇 Best Opportunity */}
            {bestOpportunity && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🥇</span>
                  <h3 className="text-lg font-bold">Best Opportunity</h3>
                </div>
                <OpportunityCard opportunity={bestOpportunity} isBest={true} />
              </section>
            )}

            {/* 🥈 High Potential */}
            {highPotential.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🥈</span>
                  <h3 className="text-lg font-medium text-muted-foreground">High Potential</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {highPotential.map(opp => (
                    <OpportunityCard key={opp.product.id} opportunity={opp} />
                  ))}
                </div>
              </section>
            )}

            {/* 🥉 Emerging Ideas */}
            {emergingIdeas.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🥉</span>
                  <h3 className="text-lg font-medium text-muted-foreground">Emerging Ideas</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 opacity-80 hover:opacity-100 transition-opacity">
                  {emergingIdeas.map(opp => (
                    <OpportunityCard key={opp.product.id} opportunity={opp} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Comparison Table */}
            <section className="pt-4">
              <h3 className="text-lg font-medium mb-4">Opportunity Comparison</h3>
              <Card className="shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/50 text-muted-foreground">
                      <tr>
                        <th className="px-6 py-3 font-medium">Opportunity</th>
                        <th className="px-6 py-3 font-medium">Score</th>
                        <th className="px-6 py-3 font-medium">Est. Revenue</th>
                        <th className="px-6 py-3 font-medium">Investment</th>
                        <th className="px-6 py-3 font-medium">Demand</th>
                        <th className="px-6 py-3 font-medium">Difficulty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {discoveredOpportunities.map(opp => (
                        <tr key={opp.product.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 font-medium">{opp.product.name}</td>
                          <td className="px-6 py-4 text-primary font-semibold">{opp.totalScore}%</td>
                          <td className="px-6 py-4">₹{opp.product.estimatedRevenuePerUnit.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4">₹{opp.product.investmentCostEstimate.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4">{opp.product.demandLevel}</td>
                          <td className="px-6 py-4">{opp.product.difficulty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
