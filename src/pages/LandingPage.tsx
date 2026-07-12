import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Leaf, TrendingUp, Layers, Factory } from "lucide-react"
import { AnimatedGradient } from "@/components/ui/AnimatedGradient"
import { FallingLeaves } from "@/components/ui/FallingLeaves"
import { useTheme } from "@/components/ThemeProvider"
import { Sun, Moon } from "lucide-react"

export function LandingPage() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative">
      <AnimatedGradient />
      <FallingLeaves />
      {/* Navbar */}
      <nav className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl tracking-tight">ReGenesis</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#vision" className="hover:text-foreground transition-colors">Vision</a>
            <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
            <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
            </button>
            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 container mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground">
            Introducing the Circular Economy Engine
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
            Don't Manage Waste. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              Discover Wealth.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground md:text-2xl text-balance max-w-2xl mx-auto">
            Transform discarded materials into resources, products, and profitable business opportunities with intelligent decision support.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto gap-2 group" asChild>
              <Link to="/dashboard">
                Start Discovering <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Platform Demo
            </Button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-muted/50 hover:border-primary/30 transition-colors h-full">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Resource Inventory</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Treat waste as a portfolio of reusable assets. Map, track, and value your materials with unprecedented clarity.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-muted/50 hover:border-primary/30 transition-colors h-full">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Factory className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold">Manufacturing Discovery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Identify which new products can be manufactured from your specific waste streams using our intelligence engine.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-muted/50 hover:border-primary/30 transition-colors h-full">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Opportunity Ranking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Evaluate opportunities based on market demand, processing costs, and profitability to find the highest ROI.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Vision Section */}
        <section id="vision" className="mt-32 pt-20 border-t border-muted/30 text-left max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                Our Vision
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Stop Managing Waste. Start Building Wealth.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For decades, organizations have viewed waste as a liability—something to be hidden, managed, and disposed of at a cost. ReGenesis flips this paradigm. We believe that every discarded material is a dormant asset waiting for the right manufacturing process.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By bridging the gap between waste generation and product manufacturing, we empower businesses to transition to a circular economy where sustainability is not a compromise, but a competitive advantage.
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center border border-muted/50 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
              <Leaf className="w-32 h-32 text-primary opacity-80" />
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section id="platform" className="mt-32 pt-20 border-t border-muted/30 text-left max-w-5xl mx-auto">
          <div className="space-y-6 text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              The Platform
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">An End-to-End Circular Engine</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to turn scrap materials into high-margin products.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-muted/50">
              <CardContent className="p-8 space-y-4">
                <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center mb-6">
                  <Layers className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold">1. Command Center</h3>
                <p className="text-muted-foreground">Log your waste streams into a digital inventory. The platform automatically standardizes materials and calculates their baseline scrap value.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-muted/50">
              <CardContent className="p-8 space-y-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-6">
                  <Factory className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">2. Opportunity Engine</h3>
                <p className="text-muted-foreground">Our deterministic algorithm matches your available materials against a vast knowledge base of manufacturing blueprints to discover valid products.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-muted/50">
              <CardContent className="p-8 space-y-4">
                <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold">3. Venture Studio</h3>
                <p className="text-muted-foreground">Transform a product idea into a business plan. View required machinery, capital investment, estimated revenue, and break-even timelines.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-muted/50">
              <CardContent className="p-8 space-y-4">
                <div className="w-10 h-10 rounded bg-green-500/10 flex items-center justify-center mb-6">
                  <Leaf className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">4. Executive Insights</h3>
                <p className="text-muted-foreground">Generate McKinsey-style reports with dynamic recommendations and our signature Waste-to-Wealth Index (WWI) scoring.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="mt-32 pt-20 border-t border-muted/30 text-left max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              <div className="bg-card border rounded-2xl p-6 text-center space-y-2 shadow-sm">
                <div className="text-4xl font-bold text-primary">91</div>
                <div className="text-sm font-medium text-muted-foreground">Avg. WWI Score</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 text-center space-y-2 shadow-sm">
                <div className="text-4xl font-bold text-emerald-500">60%</div>
                <div className="text-sm font-medium text-muted-foreground">Higher Margins</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 text-center space-y-2 shadow-sm">
                <div className="text-4xl font-bold text-green-500">95%</div>
                <div className="text-sm font-medium text-muted-foreground">Landfill Diversion</div>
              </div>
              <div className="bg-card border rounded-2xl p-6 text-center space-y-2 shadow-sm">
                <div className="text-4xl font-bold text-foreground">3x</div>
                <div className="text-sm font-medium text-muted-foreground">Faster ROI</div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-500 border-green-500/20">
                The Impact
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Measurable Sustainability</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By evaluating opportunities not just on profitability, but also on resource utilization and carbon reduction, ReGenesis ensures that your business decisions align with global sustainability goals.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><ArrowRight className="w-3 h-3 text-primary" /></div>
                  <span className="font-medium text-muted-foreground">Unlock hidden financial wealth from scrap.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><ArrowRight className="w-3 h-3 text-primary" /></div>
                  <span className="font-medium text-muted-foreground">Dramatically reduce scope 3 emissions.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><ArrowRight className="w-3 h-3 text-primary" /></div>
                  <span className="font-medium text-muted-foreground">Create localized manufacturing jobs.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
