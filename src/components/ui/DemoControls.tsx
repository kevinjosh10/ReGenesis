import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Play, X, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useResourceStore } from "@/store/useResourceStore"

const DEMO_STEPS = [
  { path: "/", name: "Landing" },
  { path: "/dashboard", name: "Command Center" },
  { path: "/opportunities", name: "Opportunity Engine" },
  { path: "/composer", name: "Resource Composer" },
  { path: "/studio", name: "Venture Studio" },
  { path: "/intelligence", name: "Resource Intelligence" },
  { path: "/report", name: "Executive Report" }
]

export function DemoControls() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { loadDemoData } = useResourceStore()

  const currentIndex = DEMO_STEPS.findIndex(s => location.pathname === s.path || (s.path === '/studio' && location.pathname.startsWith('/studio')))
  
  const handleNext = () => {
    if (currentIndex < DEMO_STEPS.length - 1) {
      navigate(DEMO_STEPS[currentIndex + 1].path)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(DEMO_STEPS[currentIndex - 1].path)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' && currentIndex < DEMO_STEPS.length - 1) {
        navigate(DEMO_STEPS[currentIndex + 1].path);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigate(DEMO_STEPS[currentIndex - 1].path);
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, navigate])

  return (
    <>
      {/* Minimized Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 print:hidden"
          >
            <Button 
              size="lg" 
              className="rounded-full shadow-xl shadow-primary/20 bg-foreground text-background hover:bg-foreground/90 gap-2"
              onClick={() => setIsOpen(true)}
            >
              <Play className="w-4 h-4" /> Start Guided Demo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Controls Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-card border shadow-2xl rounded-2xl p-4 w-80 print:hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Step {currentIndex + 1} of {DEMO_STEPS.length}
              </div>
              <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <h3 className="font-semibold text-lg mb-6 text-primary">
              {DEMO_STEPS[currentIndex]?.name || "Unknown Step"}
            </h3>

            <div className="flex gap-2 w-full mb-4">
              <Button variant="outline" className="flex-1" onClick={handlePrev} disabled={currentIndex <= 0}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>
              <Button className="flex-1" onClick={handleNext} disabled={currentIndex >= DEMO_STEPS.length - 1}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {currentIndex === 1 && (
              <div className="space-y-2 mt-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Demo Data</div>
                <Button 
                  variant="secondary" 
                  className="w-full text-xs h-8 gap-2 bg-secondary hover:bg-secondary/80 border-dashed border border-muted-foreground/30"
                  onClick={() => {
                    loadDemoData('college-campus')
                  }}
                >
                  <Database className="w-3 h-3" /> Load College Campus
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full text-xs h-8 gap-2 bg-secondary hover:bg-secondary/80 border-dashed border border-muted-foreground/30"
                  onClick={() => {
                    loadDemoData('manufacturing-plant')
                  }}
                >
                  <Database className="w-3 h-3" /> Load Mfg Plant
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
