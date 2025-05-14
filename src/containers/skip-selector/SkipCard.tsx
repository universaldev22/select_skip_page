import React from "react";
import { motion } from "framer-motion";
import { SkipCardProps } from "@/interfaces/skip";

export const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  const formattedPrice = skip.price_before_vat
    ? new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(skip.price_before_vat * (1 + skip.vat / 100))
    : "Contact for Price";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      transition={{
        scale: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
      }}
      onClick={() => onSelect(skip)}
      className={`
        relative overflow-hidden rounded-2xl p-6 w-full text-left
        ${isSelected
          ? "bg-blue-500/10 backdrop-blur-2xl border-2 border-blue-400/30"
          : "bg-black/20 backdrop-blur-xl border-2 border-transparent"}
        transition-all duration-300 cursor-pointer group
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
    >
      {/* shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={isSelected ? { opacity: 0.1 } : { opacity: 0 }}
      />

      {/* RADIO INPUT */}
      <div
        className={`
          absolute top-4 right-4
          transition-opacity duration-100
          ${isSelected
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"}
        `}
        aria-hidden="true"
      >
        <input
          type="radio"
          checked={isSelected}
          readOnly
          className="
            w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
            focus:ring-blue-500 focus:ring-2
            dark:focus:ring-blue-600 dark:ring-offset-gray-700
            dark:focus:ring-offset-gray-700
          "
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Badges */}
        <div className="flex items-center justify-between mb-6">
          <motion.span
            layout
            className="px-4 py-1 text-sm font-medium bg-blue-500/10 border border-blue-400/20 text-blue-200 rounded-xl"
            aria-label={`${skip.size} yards capacity`}
          >
            {skip.size} Yards
          </motion.span>
          {!skip.allowed_on_road && (
            <motion.span
              layout
              className="px-4 py-1 text-sm font-medium bg-amber-500/10 border border-amber-400/20 text-amber-200 rounded-xl"
              aria-label="Private property only"
            >
              Private Property Only
            </motion.span>
          )}
        </div>

        {/* Title */}
        <motion.h3
          layout
          className="text-2xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4"
        >
          {skip.size} Yard Skip
        </motion.h3>

        {/* Details */}
        <div className="space-y-4 flex-1">
          <motion.p
            layout
            className="text-gray-400"
            aria-label={`${skip.hire_period_days} day hire period`}
          >
            {skip.hire_period_days} day hire period
          </motion.p>
          <motion.p layout className="flex items-baseline space-x-2">
            <span className="font-mono text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              {formattedPrice}
            </span>
            <span className="text-sm text-gray-400">per week</span>
          </motion.p>
        </div>
      </div>
    </motion.button>
  );
};
