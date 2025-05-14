"use client";

import { SkipCard } from "./SkipCard";
import { SkipCardSkeleton } from "./SkipCardSkeleton";
import { SelectedSkipOverlay } from "./SelectedSkipOverlay";
import { motion } from "framer-motion";
import { useSkips } from "@/hooks/useSkips";
import { useSkipStore } from "@/store/skipStore";

export const SkipSelector = () => {
  const { skips, isLoading, isError } = useSkips("NR32", "Lowestoft");
  const { selectedSkip, setSelectedSkip } = useSkipStore();

  const handleBack = () => {
    // TODO: Implement back navigation
  };

  const handleContinue = () => {
    // TODO: Implement continue navigation
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"
            >
              Choose Your Skip Size
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-400"
            >
              Select the skip size that best suits your needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkipCardSkeleton />
                </motion.div>
              ))
            ) : isError ? (
              // Show error message
              <div className="col-span-full text-center py-8">
                <div className="text-red-400">
                  Error loading skips. Please try again later.
                </div>
              </div>
            ) : (
              // Show actual skip cards
              skips.map((skip, index) => (
                <motion.div
                  key={skip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkipCard
                    skip={skip}
                    isSelected={selectedSkip?.id === skip.id}
                    onSelect={setSelectedSkip}
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
      <SelectedSkipOverlay
        skip={selectedSkip}
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </>
  );
};
