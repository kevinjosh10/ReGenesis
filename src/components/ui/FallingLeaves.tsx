import { motion } from "framer-motion"
import { Leaf } from "lucide-react"
import { useEffect, useState } from "react"

export function FallingLeaves() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  // Generate an array of leaves with random starting positions and animation durations
  const leaves = Array.from({ length: 15 }).map((_, i) => {
    const startX = Math.random() * 100 // 0 to 100vw
    const duration = Math.random() * 10 + 10 // 10 to 20 seconds
    const delay = Math.random() * -20 // random start time so they don't all fall at once
    const size = Math.random() * 1.5 + 1 // scale between 1 and 2.5
    const sway = Math.random() * 20 + 10 // x drift between 10 and 30vw
    
    return {
      id: i,
      startX,
      duration,
      delay,
      size,
      sway,
    }
  })

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[0] opacity-30 dark:opacity-20">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{
            y: "-10vh",
            x: `${leaf.startX}vw`,
            rotate: 0,
          }}
          animate={{
            y: "110vh",
            x: `${leaf.startX + (Math.random() > 0.5 ? leaf.sway : -leaf.sway)}vw`,
            rotate: 360,
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ position: "absolute" }}
        >
          <Leaf 
            className="text-primary/40" 
            style={{ 
              width: `${leaf.size}rem`, 
              height: `${leaf.size}rem` 
            }} 
          />
        </motion.div>
      ))}
    </div>
  )
}
