"use client";

import React from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"

export const ThemeToggle: React.FC = () => {
  const { dark, toggle } = useTheme()

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed right-4 top-1/2 z-50 p-2 bg-gray-700 rounded-full cursor-pointer"
      aria-label="Toggle theme"
    >
      {dark
        ? <Moon size={20} className="text-yellow-300" />
        : <Sun  size={20} className="text-gray-200" />
      }
    </motion.button>
  )
}
