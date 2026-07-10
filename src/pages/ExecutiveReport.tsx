import { Link } from "react-router-dom"
import { Leaf, Printer, Check, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useResourceStore } from "@/store/useResourceStore"
import { useOpportunityStore } from "@/store/useOpportunityStore"
import { useVentureStore } from "@/store/useVentureStore"
import productsData from "@/data/products.json"
import type { Product } from "@/types/Opportunity"

const MOCK_PRODUCTS = productsData as Product[];

export function ExecutiveReport() {
  const { resources } = useResourceStore()
  const { discoveredOpportunities } = useOpportunityStore()
  const { activeVenture } = useVentureStore()

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Pick the top opportunity for the report
  const topOpp = discoveredOpportunities[0]
  const product = topOpp ? MOCK_PRODUCTS.find(p => p.id === topOpp.product.id) : null

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 pb-20">
      
      {/* Top Navigation - hidden when printing */}
      <nav className="border-b bg-background/95 backdrop-blur z-10 sticky top-0 print:hidden">
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
              <Link to="/intelligence" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Insights</Link>
              <div className="px-3 py-1 text-sm font-medium bg-background rounded shadow-sm">Report</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
              <Printer className="w-4 h-4" /> Print PDF
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[800px] w-full mx-auto p-8 md:p-16 bg-white dark:bg-background print:p-0 print:shadow-none shadow-sm mt-8 border rounded-lg">
        
        {/* Cover Page */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-12 pb-20 border-b print:min-h-screen">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Executive Opportunity Report</h1>
            <p className="text-2xl text-muted-foreground font-light tracking-wide">Strategic Resource Conversion Analysis</p>
          </div>
          <div className="pt-24 space-y-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Prepared For</div>
              <div className="text-xl font-medium mt-1">ABC Manufacturing</div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Generated On</div>
              <div className="text-xl font-medium mt-1">{today}</div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="py-16 border-b print:break-before-page">
          <h2 className="text-3xl font-bold mb-10">Executive Summary</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Resources Analysed</div>
              <div className="text-4xl font-bold mt-2">{resources.length} Streams</div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Products Identified</div>
              <div className="text-4xl font-bold mt-2">23 Products</div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Business Opportunities</div>
              <div className="text-4xl font-bold mt-2">12 Ventures</div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Waste-to-Wealth Index</div>
              <div className="text-4xl font-bold mt-2 text-primary">91 / 100</div>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/20">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Executive Recommendation</div>
            <div className="text-3xl font-bold">{product?.name || 'Plastic Lumber'} Manufacturing</div>
          </div>
        </section>

        {/* Opportunity Analysis */}
        <section className="py-16 border-b print:break-before-page">
          <h2 className="text-3xl font-bold mb-10">Primary Opportunity Analysis</h2>
          
          <div className="space-y-6">
            <Card className="shadow-none border-2">
              <CardContent className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">{product?.name || 'Plastic Lumber'}</h3>
                    <p className="text-muted-foreground mt-1">Highest ranking manufacturing opportunity</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Opportunity Score</div>
                    <div className="text-3xl font-bold text-primary">{topOpp?.totalScore || 96}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mt-10 pt-8 border-t">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Expected Revenue</div>
                    <div className="text-2xl font-bold">₹{activeVenture?.monthlyRevenue.toLocaleString() || '1,20,000'} / mo</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Monthly Profit</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹{activeVenture?.monthlyProfit.toLocaleString() || '42,000'} / mo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why We Recommend It & Impact */}
        <section className="py-16 border-b print:break-before-page">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Why This Opportunity?</h2>
              <ul className="space-y-4">
                <li className="flex gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span className="font-medium">Highest ROI among all identified ventures</span></li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span className="font-medium">Uses 94% of available resource streams</span></li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span className="font-medium">Lowest landfill impact and carbon footprint</span></li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span className="font-medium">Strong, growing market demand</span></li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span className="font-medium">Moderate initial investment</span></li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Environmental Impact</h2>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Landfill Reduction</div>
                  <div className="text-2xl font-bold">96%</div>
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Carbon Saved</div>
                  <div className="text-2xl font-bold">1.8 Tons CO₂</div>
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Material Recovery</div>
                  <div className="text-2xl font-bold">94%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Verdict */}
        <section className="py-24 print:break-before-page flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
            <TrendingUp className="w-10 h-10 text-primary" />
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Final Verdict</div>
          <h2 className="text-4xl font-bold mb-6">Recommended Action: Proceed</h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Your organization has excellent potential to convert available resources into profitable manufacturing opportunities while significantly reducing landfill dependency.
          </p>
        </section>

      </main>
    </div>
  )
}
