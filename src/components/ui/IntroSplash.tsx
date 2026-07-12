import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf } from "lucide-react"

export function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // 6 second animation exactly as requested
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
          exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }} // Fly-through exit effect
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Cinematic Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />

          {/* Main Container - Dollies in slowly with scale for maximum smoothness */}
          <motion.div 
            className="relative flex flex-col items-center justify-center z-20"
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1.1, y: 0 }}
            transition={{ duration: 6, ease: "easeOut" }}
          >
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotateZ: -180, opacity: 0 }}
              animate={{ scale: 1, rotateZ: 0, opacity: 1 }}
              transition={{
                duration: 2,
                ease: [0.175, 0.885, 0.32, 1.275], // Custom spring/back out
                delay: 0.5
              }}
              className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 relative"
            >
              {/* Spinning leaf */}
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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

            {/* Cinematic Text Reveal (Character by Character) */}
              <div 
                className="flex text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text animate-shine bg-[length:250%_100%]"
                style={{
                  backgroundImage: "linear-gradient(110deg, #34d399 0%, #10b981 40%, #ffffff 50%, #10b981 60%, #047857 100%)"
                }}
              >
                {"ReGenesis".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 1,
                      delay: 1 + index * 0.08, // Staggered delay
                      ease: [0.2, 0.65, 0.3, 0.9] // Smooth custom ease out
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

            {/* Subtitle / Tagline Animation */}
            <div className="overflow-hidden mt-6">
              <motion.p
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 2.5
                }}
                className="text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase font-light"
              >
                The Circular Economy Engine
              </motion.p>
            </div>
            
            {/* Cinematic Loading Bar */}
            <motion.div 
              className="absolute -bottom-24 w-64 h-[2px] bg-secondary/50 rounded-full overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 256 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <motion.div 
                className="h-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 3.5, duration: 2.5, ease: "easeInOut" }} // Fits the 6s window exactly
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
