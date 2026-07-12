import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, TrendingUp, ShieldCheck, Leaf, Factory } from 'lucide-react'
import { Card, CardContent } from './card'
import { Badge } from './badge'
import { Button } from './button'
import type { DiscoveredOpportunity } from '@/types/Opportunity'

interface OpportunityCardProps {
  opportunity: DiscoveredOpportunity;
  isBest?: boolean;
}

export function OpportunityCard({ opportunity, isBest = false }: OpportunityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { product, totalScore, scoreDetails, estimatedProfit, confidence } = opportunity

  return (
    <motion.div layout transition={{ duration: 0.3, ease: 'easeInOut' }}>
      <Card 
        className={`overflow-hidden cursor-pointer transition-colors shadow-none ${isBest ? 'border-primary shadow-sm bg-primary/5 hover:border-primary' : 'hover:border-primary/50'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                {isBest && (
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Best Opportunity
                  </div>
                )}
                <h3 className="text-xl font-bold">{product.name}</h3>
                <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                  <Badge variant="secondary" className="font-normal">{product.category}</Badge>
                  <span>Confidence: {confidence}%</span>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Opportunity Score</div>
                <div className={`text-3xl font-bold ${isBest ? 'text-primary' : 'text-foreground'}`}>{totalScore}%</div>
                {opportunity.synergyBonus && (
                  <Badge variant="outline" className="mt-2 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 gap-1 text-[10px] px-1.5 py-0">
                    ✨ +{opportunity.synergyBonus} Synergy
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Est. Revenue</div>
                <div className="font-semibold text-lg">₹{product.estimatedRevenuePerUnit.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Investment</div>
                <div className="font-semibold text-lg">₹{product.investmentCostEstimate.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Potential Profit</div>
                <div className="font-semibold text-lg text-green-600 dark:text-green-400">₹{estimatedProfit.toLocaleString('en-IN')}</div>
              </div>
              <div className="flex items-center justify-end">
                <div className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  {isExpanded ? 'Show Less' : 'Explore Why'} <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t bg-secondary/20"
              >
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" /> Why this Opportunity?
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-primary" /> Extremely high profit margin based on current market demand ({scoreDetails.marketDemand}/25).</li>
                      <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-primary" /> Requires {product.investmentCostLevel.toLowerCase()} investment setup (Score: {scoreDetails.investment}/10).</li>
                      <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-primary" /> Excellent resource utilization from your inventory ({scoreDetails.resourceUtilization}/20).</li>
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="bg-card shadow-none">
                      <CardContent className="p-4 flex items-start gap-3">
                        <Leaf className="w-8 h-8 text-green-500 mt-1" />
                        <div>
                          <div className="font-semibold text-sm">Sustainability Impact</div>
                          <div className="text-xs text-muted-foreground mt-1">Saves {product.carbonSavedKg}kg of CO2 equivalent per manufacturing cycle. Rated {product.sustainabilityScore}% eco-friendly.</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card shadow-none">
                      <CardContent className="p-4 flex items-start gap-3">
                        <Factory className="w-8 h-8 text-emerald-500 mt-1" />
                        <div>
                          <div className="font-semibold text-sm">Action Plan</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Difficulty: <span className="font-medium text-foreground">{product.difficulty}</span>. Move to Venture Studio to see machinery required.
                          </div>
                          <Button size="sm" className="w-full mt-3 h-8 text-xs" asChild>
                            <Link to={`/studio/${product.id}`}>Send to Venture Studio</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
