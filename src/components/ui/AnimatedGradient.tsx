import { motion } from "framer-motion"

export function AnimatedGradient() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] bg-background">
      {/* Base overlay for blending */}
      <div className="absolute inset-0 bg-background/80 z-10 backdrop-blur-[100px]" />
      
      {/* Orb 1: Forest Green */}
      <motion.div
        animate={{
          x: ["0vw", "30vw", "-20vw", "0vw"],
          y: ["0vh", "20vh", "-30vh", "0vh"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-primary/40 mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70"
      />
      
      {/* Orb 2: Emerald / Teal */}
      <motion.div
        animate={{
          x: ["0vw", "-30vw", "20vw", "0vw"],
          y: ["0vh", "-40vh", "10vh", "0vh"],
          scale: [0.8, 1.1, 1.3, 0.8],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 right-1/4 w-[40vw] h-[40vw] rounded-full bg-emerald-500/30 mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70"
      />

      {/* Orb 3: Deep Blue/Green */}
      <motion.div
        animate={{
          x: ["-20vw", "10vw", "30vw", "-20vw"],
          y: ["20vh", "-20vh", "30vh", "20vh"],
          scale: [1.2, 0.9, 1.1, 1.2],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 left-1/3 w-[60vw] h-[60vw] rounded-full bg-teal-600/20 mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60"
      />
    </div>
  )
}
