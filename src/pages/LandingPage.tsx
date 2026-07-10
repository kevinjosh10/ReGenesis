import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Leaf, TrendingUp, Layers, Factory } from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
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
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Factory className="w-6 h-6 text-blue-500" />
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
      </main>
    </div>
  )
}
