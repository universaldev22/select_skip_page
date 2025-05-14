"use client"

import React from "react"
import { motion } from "framer-motion"
import { Skip } from "@/interfaces/skip"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SelectedSkipOverlayProps {
  skip: Skip | null
  onBack: () => void
  onContinue: () => void
}

interface IconDesktopNavProps {
  onClick: () => void
  label: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  enabled: boolean
}

const IconDesktopNavButton: React.FC<IconDesktopNavProps> = ({
  onClick,
  label,
  Icon,
  enabled,
}) => (
  <motion.button
    aria-label={label}
    onClick={() => enabled && onClick()}
    whileHover={enabled ? { scale: 1.05 } : {}}
    whileTap={enabled ? { scale: 0.95 } : {}}
    disabled={!enabled}
    className={`
      relative flex items-center justify-center
      ${enabled ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
    `}
  >
    <div className="
      w-10 h-10
      rounded-xl
      bg-white/80 dark:bg-gray-900/80
      border-2 border-gray-200 dark:border-white/20
      backdrop-blur-xl
      flex items-center justify-center
      text-gray-900 dark:text-white
      shadow-lg shadow-black/20
      transition-all duration-300
      group-hover:border-gray-300 dark:group-hover:border-white/40
      group-hover:bg-white/90 dark:group-hover:bg-gray-800/80
    ">
      <Icon className="w-6 h-6" />
    </div>
  </motion.button>
)

export const SelectedSkipOverlay: React.FC<SelectedSkipOverlayProps> = ({
  skip,
  onBack,
  onContinue,
}) => {
  const renderPrice = () => {
    if (!skip?.price_before_vat) {
      return (
        <span className="font-medium text-blue-600 dark:text-blue-200">
          Contact for Price
        </span>
      )
    }

    const formattedPrice = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(skip.price_before_vat * (1 + skip.vat / 100))

    return (
      <motion.p
        layout
        className="flex items-baseline space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <span
          className="font-mono text-3xl font-bold tracking-tighter"
          style={{ letterSpacing: "-0.025em" }}
        >
          {formattedPrice}
        </span>
        <span className="text-sm text-gray-700 dark:text-gray-400">
          per week
        </span>
      </motion.p>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 pb-4 pointer-events-auto">
        <div className="
          bg-gray-100 dark:bg-gray-700
          backdrop-blur-2xl
          border border-gray-200 dark:border-white/10
          rounded-2xl p-3
          shadow-2xl shadow-blue-500/10
          relative
          min-h-[4rem]
        ">
          {/* Desktop View */}
          <div className="hidden md:flex flex-col space-y-4">
            {skip && (
              <div className="flex items-center justify-between">
                {/* Top Section */}
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-blue-600"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Selected Skip
                    </span>
                  </div>
                  <div className="
                    text-xl font-semibold
                    bg-gradient-to-r
                      from-gray-900 to-gray-700
                      dark:from-white dark:to-white/80
                    bg-clip-text text-transparent
                  ">
                    {skip.size} Yard Skip
                  </div>
                  <div className="
                    px-4 py-1 rounded-xl
                    bg-blue-600/10 dark:bg-blue-500/10
                    border border-blue-600/20 dark:border-blue-400/20
                    text-blue-600 dark:text-blue-200
                    text-sm font-medium
                  ">
                    {skip.hire_period_days} Days
                  </div>
                </div>
                {/* Price */}
                <div className="flex items-baseline space-x-2">
                  {renderPrice()}
                </div>
              </div>
            )}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-8">
              <IconDesktopNavButton
                onClick={onBack}
                label="Previous"
                Icon={ChevronLeft}
                enabled={true}
              />
              <IconDesktopNavButton
                onClick={onContinue}
                label="Next"
                Icon={ChevronRight}
                enabled={!!skip}
              />
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col space-y-4">
            {skip && (
              <div className="flex items-center justify-center">
                {renderPrice()}
              </div>
            )}

            {/* Mobile Navigation */}
            <div className="flex border border-gray-300 dark:border-white/10 rounded-lg overflow-hidden">
              <motion.button
                whileTap={{ y: 1 }}
                onClick={onBack}
                aria-label="Previous"
                className="
                  flex-1 py-3
                  bg-gray-200/50 dark:bg-black/40
                  text-gray-700 dark:text-gray-300
                  border-r border-gray-300 dark:border-white/10
                  backdrop-blur-xl
                  transition-colors cursor-pointer
                "
              >
                <ChevronLeft className="w-8 h-8 mx-auto" />
              </motion.button>

              <motion.button
                whileTap={{ y: 1 }}
                onClick={onContinue}
                aria-label="Next"
                disabled={!skip}
                className={`
                  flex-1 py-3
                  ${skip
                    ? "bg-blue-600/10 dark:bg-blue-500/20 active:bg-blue-600/20 dark:active:bg-blue-500/30 cursor-pointer"
                    : "bg-gray-200/50 dark:bg-black/40 cursor-not-allowed opacity-50"
                  }
                  text-blue-600 dark:text-blue-200
                  backdrop-blur-xl
                  transition-colors
                `}
              >
                <ChevronRight className="w-8 h-8 mx-auto" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
