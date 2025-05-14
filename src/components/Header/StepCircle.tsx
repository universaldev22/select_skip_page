import React from "react"
import { motion } from "framer-motion"

export interface StepCircleProps {
  step: {
    active: boolean
    icon: React.ComponentType<{ size: number; className?: string }>
  }
  index: number
  size?: "md" | "lg"
}

const StepCircle: React.FC<StepCircleProps> = ({
  step,
  index,
  size = "md",
}) => {
  const dimensionClasses = size === "md" ? "w-6 h-6" : "w-8 h-8"
  const iconSize = size === "md" ? 14 : 18
  const Icon = step.icon

  // Light & dark mode variants
  const activeClasses = `
    bg-blue-500/10 dark:bg-blue-500/20
    border-blue-400/30 dark:border-blue-400/50
    text-blue-600 dark:text-blue-200
  `
  const inactiveClasses = `
    bg-gray-200 dark:bg-gray-700
    border-gray-300 dark:border-gray-600
    text-gray-500 dark:text-gray-400
  `

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`
        relative z-10 ${dimensionClasses} rounded-lg flex items-center justify-center
        border transition-all duration-500
        ${step.active ? activeClasses : inactiveClasses}
      `}
    >
      <Icon size={iconSize} className="relative z-10" />
      {step.active && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-blue-400/20 dark:bg-blue-400/30 blur-sm"
          initial={false}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  )
}

export default StepCircle
