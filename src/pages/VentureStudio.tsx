import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Leaf, Download, Share2, DollarSign, Activity, Factory, Users, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useVentureStore } from "@/store/useVentureStore"
import productsData from "@/data/products.json"
import type { Product } from "@/types/Opportunity"

const MOCK_PRODUCTS = productsData as Product[];

export function VentureStudio() {
  const { id } = useParams<{ id: string }>()
  const { activeVenture, loadVenture } = useVentureStore()
  
  // Storytelling state: Has the user decided to explore the analysis?
  const [hasDecided, setHasDecided] = useState(false)

  useEffect(() => {
    // If we have an ID from the URL, load it. Otherwise, default to prod_1 for demo purposes if nothing is active.
    if (id) {
      loadVenture(id)
    } else {
      loadVenture('prod_1')
    }
  }, [id, loadVenture])

  if (!activeVenture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Factory className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-xl font-semibold">Venture Not Found</h2>
          <p className="text-muted-foreground mt-2">Return to the Opportunity Engine to select a product.</p>
          <Button asChild className="mt-4"><Link to="/opportunities">Go to Engine</Link></Button>
        </div>
      </div>
    )
  }

  const product = MOCK_PRODUCTS.find(p => p.id === activeVenture.productId);
  if (!product) return null;

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
              <div className="px-3 py-1 text-sm font-medium bg-background rounded shadow-sm">Studio</div>
              <Link to="/intelligence" className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Insights</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">JD</div>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 pt-12 space-y-8 max-w-4xl">
        
        {/* Storytelling Hook */}
        {!hasDecided ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8"
          >
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium uppercase tracking-widest text-primary bg-primary/10">Venture Proposal</Badge>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{product.name} Manufacturing</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Based on your current resource inventory, we project a monthly profit of <span className="font-bold text-foreground">₹{activeVenture.monthlyProfit.toLocaleString('en-IN')}</span> within {activeVenture.breakEvenMonths} months.
              </p>
            </div>
            
            <div className="p-8 border rounded-2xl bg-card shadow-sm w-full max-w-xl mx-auto mt-8">
              <h2 className="text-2xl font-semibold mb-6">Would you invest in this opportunity?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="w-full sm:w-auto px-10 text-lg" onClick={() => setHasDecided(true)}>YES, Show Me How</Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 text-lg" onClick={() => setHasDecided(true)}>NOT SURE, Let's Analyze</Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b">
              <div>
                <Badge variant="secondary" className="mb-3">{product.category} Venture</Badge>
                <h1 className="text-3xl font-bold tracking-tight">{product.name} Manufacturing</h1>
                <p className="text-muted-foreground mt-1">Comprehensive Business Feasibility Report</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                <Button className="gap-2" onClick={() => window.print()}><Download className="w-4 h-4" /> Export PDF</Button>
              </div>
            </div>

            {/* Financial Snapshot */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Financial Snapshot</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-none bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">₹{activeVenture.monthlyRevenue.toLocaleString('en-IN')}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Initial Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₹{activeVenture.initialInvestment.toLocaleString('en-IN')}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Profit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">₹{activeVenture.monthlyProfit.toLocaleString('en-IN')}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Break-even</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{activeVenture.breakEvenMonths} Months</div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Operations & Markets */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Required Machinery */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><Factory className="w-5 h-5 text-emerald-500" /> Required Machinery</h3>
                <Card className="shadow-none">
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {activeVenture.machines.map(machine => (
                        <li key={machine} className="flex items-center gap-3 pb-4 border-b last:border-0 last:pb-0">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                            <Activity className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="font-medium">{machine}</div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Target Market */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2"><Users className="w-5 h-5 text-indigo-500" /> Target Customers</h3>
                <Card className="shadow-none">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {activeVenture.customers.map(customer => (
                        <Badge key={customer} variant="secondary" className="text-sm py-1.5 px-3">{customer}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Risk Assessment */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Risk Assessment</h3>
              <Card className="shadow-none overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3 font-medium">Risk Factor</th>
                      <th className="px-6 py-3 font-medium">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {activeVenture.risks.map(risk => (
                      <tr key={risk.name} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-medium">{risk.name}</td>
                        <td className="px-6 py-4">
                          <Badge variant={risk.level === 'Low Risk' ? 'success' : risk.level === 'High Risk' ? 'destructive' : 'warning'}>
                            {risk.level}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>

            {/* Executive Verdict */}
            <section className="pt-8 pb-12">
              <Card className="bg-card shadow-lg border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-2">Executive Recommendation</div>
                    <h2 className="text-3xl font-bold">We agree. Proceed.</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto mt-4 text-lg">
                      This venture offers excellent profitability, manageable risks, and strong sustainability impact. It successfully leverages your existing resource inventory.
                    </p>
                  </div>
                  <Button size="lg" className="px-8 mt-4" onClick={() => window.print()}><Download className="w-4 h-4 mr-2" /> Download Full Business Plan</Button>
                </CardContent>
              </Card>
            </section>

          </motion.div>
        )}
      </main>
    </div>
  )
}
