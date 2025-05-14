import React from "react"
import { motion } from "framer-motion"
import { Radio, AlertTriangle } from "lucide-react"
import { SkipCardProps } from "@/interfaces/skip"

const IMAGE_BASE = process.env.NEXT_PUBLIC_SKIP_IMAGE_BASE!

export const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  isSelected,
  onSelect,
}) => {
  const formattedPrice = skip.price_before_vat
    ? new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(skip.price_before_vat * (1 + skip.vat / 100))
    : "Contact for Price"

  const imageUrl = `${IMAGE_BASE}${skip.size}-yarder-skip.jpg`

  return (
    <motion.button
      onClick={() => onSelect(skip)}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
      className={`
        group relative flex flex-col h-full w-full overflow-hidden rounded-2xl
        border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900"
            : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800"
        }
      `}
    >
      {/* Image */}
      <div className="relative w-full h-40 sm:h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${skip.size}-yard skip`}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Size Badge */}
        <span
          className={`
            absolute top-3 left-3 px-3 py-1 text-sm font-semibold rounded-full
            bg-blue-600 text-white
          `}
          aria-label={`${skip.size} yards`}
        >
          {skip.size} Yards
        </span>

        {/* Not Allowed Badge */}
        {!skip.allowed_on_road && (
          <div
            className={`
              absolute bottom-3 left-3 flex items-center space-x-1
              px-3 py-1 rounded-full
              ${isSelected
                ? "bg-amber-300 text-amber-900 dark:bg-amber-600 dark:text-amber-100"
                : "bg-amber-200 text-amber-800 dark:bg-amber-700 dark:text-amber-200"}
            `}
          >
            <AlertTriangle size={16} />
            <span className="text-xs font-medium">Not Allowed On The Road</span>
          </div>
        )}

        {/* Radio Icon */}
        <div
          className={`
            absolute top-3 right-3 transition-opacity duration-100
            ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
          aria-hidden="true"
        >
          <Radio
            size={20}
            className={
              isSelected
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500"
            }
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col items-center justify-between text-center w-full">
        {/* Title & hire period */}
        <div className="w-full">
          <h3
            className={`text-2xl font-semibold mb-2 ${
              isSelected
                ? "text-blue-600 dark:text-white"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {skip.size} Yard Skip
          </h3>
          <p
            className={`mb-4 ${
              isSelected
                ? "text-blue-400 dark:text-gray-400"
                : "text-gray-700 dark:text-gray-400"
            }`}
          >
            {skip.hire_period_days} day hire period
          </p>
        </div>

        {/* Price */}
        <div className="w-full mb-2 flex items-baseline justify-center space-x-1">
          <span
            className="font-mono text-3xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"
            style={{ letterSpacing: "-0.025em" }}
          >
            {formattedPrice}
          </span>
          <span
            className={`text-sm ${
              isSelected
                ? "text-blue-600 dark:text-white/60"
                : "text-gray-700 dark:text-gray-400"
            }`}
          >
            per week
          </span>
        </div>
      </div>
    </motion.button>
  )
}
