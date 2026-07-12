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
  const [leaves] = useState(() => Array.from({ length: 30 }).map((_, i) => {
    const startX = Math.random() * 100 // 0 to 100vw
    const duration = Math.random() * 10 + 10 // 10 to 20 seconds
    const delay = Math.random() * -20 // random start time so they don't all fall at once
    const size = Math.random() * 2 + 1.5 // scale between 1.5 and 3.5
    const sway = Math.random() * 30 + 10 // x drift between 10 and 40vw
    const endX = startX + (Math.random() > 0.5 ? sway : -sway)
    
    return {
      id: i,
      startX,
      endX,
      duration,
      delay,
      size,
    }
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1] opacity-70 dark:opacity-60">
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
            x: `${leaf.endX}vw`,
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
            className="text-primary/60 drop-shadow-md" 
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
