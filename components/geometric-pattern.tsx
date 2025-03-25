'use client'

import { motion } from "framer-motion"

interface GeometricPatternProps {
  className?: string
  type?: "torus" | "spiral" | "grid"
  color?: string
  opacity?: number
}

export default function GeometricPattern({
  className = "",
  type = "grid",
  color = "#8fb3c9",
  opacity = 0.15,
}: GeometricPatternProps) {
  if (type === "torus") {
    return (
      <div className={`absolute pointer-events-none ${className}`}>
        <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" opacity={opacity}>
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {/* Torus wireframe */}
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse
                key={i}
                cx="100"
                cy="100"
                rx={60}
                ry={20}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                transform={`rotate(${i * 15}, 100, 100)`}
              />
            ))}
            {/* Replace dynamic coordinate calculation with fixed values */}
            {[
              { x1: 160, y1: 100, x2: 40, y2: 100 },
              { x1: 155.88, y1: 126, x2: 44.12, y2: 74 },
              { x1: 144.12, y1: 148.28, x2: 55.88, y2: 51.72 },
              { x1: 126, y1: 165.88, x2: 74, y2: 34.12 },
              { x1: 100, y1: 180, x2: 100, y2: 20 },
              { x1: 74, y1: 165.88, x2: 126, y2: 34.12 },
              { x1: 55.88, y1: 148.28, x2: 144.12, y2: 51.72 },
              { x1: 44.12, y1: 126, x2: 155.88, y2: 74 },
              { x1: 40, y1: 100, x2: 160, y2: 100 },
              { x1: 44.12, y1: 74, x2: 155.88, y2: 126 },
              { x1: 55.88, y1: 51.72, x2: 144.12, y2: 148.28 },
              { x1: 74, y1: 34.12, x2: 126, y2: 165.88 },
              { x1: 100, y1: 20, x2: 100, y2: 180 },
              { x1: 126, y1: 34.12, x2: 74, y2: 165.88 },
              { x1: 144.12, y1: 51.72, x2: 55.88, y2: 148.28 },
              { x1: 155.88, y1: 74, x2: 44.12, y2: 126 },
              { x1: 160, y1: 100, x2: 40, y2: 100 },
              { x1: 155.88, y1: 126, x2: 44.12, y2: 74 },
              { x1: 144.12, y1: 148.28, x2: 55.88, y2: 51.72 },
              { x1: 126, y1: 165.88, x2: 74, y2: 34.12 },
              { x1: 100, y1: 180, x2: 100, y2: 20 },
              { x1: 74, y1: 165.88, x2: 126, y2: 34.12 },
              { x1: 55.88, y1: 148.28, x2: 144.12, y2: 51.72 },
              { x1: 44.12, y1: 126, x2: 155.88, y2: 74 }
            ].map((coords, i) => (
              <path
                key={`path-${i}`}
                d={`M ${coords.x1} ${coords.y1} A 60 20 0 1 0 ${coords.x2} ${coords.y2}`}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
              />
            ))}
          </motion.g>
        </svg>
      </div>
    )
  }

  if (type === "spiral") {
    // Fixed coordinates for spiral pattern
    const spiralLines = [
      { x2: 100, y2: 280 },
      { x2: 255.88, y2: 155.88 },
      { x2: 280, y2: 100 },
      { x2: 255.88, y2: 44.12 },
      { x2: 200, y2: 10 },
      { x2: 144.12, y2: 44.12 },
      { x2: 10, y2: 100 },
      { x2: 44.12, y2: 155.88 },
      { x2: 100, y2: -80 },
      { x2: 155.88, y2: 44.12 },
      { x2: -80, y2: 100 },
      { x2: 55, y2: 22.06 }
    ];

    return (
      <div className={`absolute pointer-events-none ${className}`}>
        <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" opacity={opacity}>
          <motion.g
            initial={{ scale: 0.95 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          >
            {/* Spiral pattern */}
            {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180].map((radius) => (
              <circle key={radius} cx="100" cy="100" r={radius} fill="none" stroke={color} strokeWidth="0.5" />
            ))}
            {spiralLines.map((coords, i) => (
              <line
                key={`line-${i}`}
                x1="100"
                y1="100"
                x2={coords.x2}
                y2={coords.y2}
                stroke={color}
                strokeWidth="0.5"
              />
            ))}
          </motion.g>
        </svg>
      </div>
    )
  }

  // Default grid pattern
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        opacity: opacity,
      }}
    />
  )
}
