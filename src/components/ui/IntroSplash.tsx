import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf } from "lucide-react"

export function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // The user requested a 6-second long animation. 
    // We will unmount the splash screen after 6.2 seconds to allow the exit animation to finish.
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "backOut",
                delay: 0.5
              }}
              className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 relative"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Leaf className="w-12 h-12 text-primary" />
              </motion.div>
              
              {/* Outer glowing rings */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.5, 2] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.5
                }}
                className="absolute inset-0 rounded-3xl border-2 border-primary/40"
              />
            </motion.div>

            {/* Text Animation */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "circOut",
                  delay: 1.5
                }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70"
              >
                ReGenesis
              </motion.h1>
            </div>

            {/* Subtitle / Tagline Animation */}
            <div className="overflow-hidden mt-4">
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "circOut",
                  delay: 2.5
                }}
                className="text-lg md:text-xl text-muted-foreground tracking-widest uppercase font-semibold"
              >
                The Circular Economy Engine
              </motion.p>
            </div>
            
            {/* Loading Bar Animation to fill exactly the 6 seconds */}
            <motion.div 
              className="absolute -bottom-24 w-64 h-1 bg-secondary rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 3.5, duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
