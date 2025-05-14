import { motion, AnimatePresence } from "framer-motion";
import { Skip } from "@/interfaces/skip";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SelectedSkipOverlayProps {
  skip: Skip | null;
  onBack: () => void;
  onContinue: () => void;
}

export const SelectedSkipOverlay = ({
  skip,
  onBack,
  onContinue,
}: SelectedSkipOverlayProps) => {
  const renderPrice = () => {
    if (!skip?.price_before_vat) {
      return (
        <span className="font-medium text-blue-200/90">Contact for Price</span>
      );
    }

    const formattedPrice = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(skip.price_before_vat * (1 + skip.vat / 100));

    return (
      <>
        <motion.p
          layout
          className="flex items-baseline space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="font-mono text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            {formattedPrice}
          </span>
          <span className="text-sm text-gray-400">per week</span>
        </motion.p>
      </>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <AnimatePresence mode="wait">
          {skip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-3
                        shadow-2xl shadow-blue-500/10 pointer-events-auto relative"
            >
              {/* Desktop View */}
              <div className="hidden md:flex flex-col space-y-4">
                {/* Price and Details - Top Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="text-sm text-gray-400 font-medium">
                        Selected Skip
                      </span>
                    </div>
                    <div className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {skip.size} Yard Skip
                    </div>
                    <div className="px-4 py-1 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-200 text-sm font-medium">
                      {skip.hire_period_days} Days
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    {renderPrice()}
                  </div>
                </div>

                {/* Desktop Navigation Buttons */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center space-x-16">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="flex flex-col items-center group relative cursor-pointer"
                  >
                    <div
                      className="w-8 h-8 rounded-xl bg-gray-900/80 border-2 border-white/20 backdrop-blur-xl
                                 flex items-center justify-center text-white shadow-lg shadow-black/20
                                 group-hover:border-white/40 group-hover:bg-gray-800/80 transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-medium text-white/70 mt-1.5 group-hover:text-white transition-colors">
                      back
                    </span>
                    <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onContinue}
                    className="flex flex-col items-center group relative cursor-pointer"
                  >
                    <div
                      className="w-8 h-8 rounded-xl bg-blue-500/30 border-2 border-blue-400/30 backdrop-blur-xl
                                 flex items-center justify-center text-blue-200 shadow-lg shadow-black/20
                                 group-hover:border-blue-400/50 group-hover:bg-blue-500/40 transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-medium text-blue-200/70 mt-1.5 group-hover:text-blue-200 transition-colors">
                      continue
                    </span>
                    <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.button>
                </div>
              </div>

              {/* Mobile View - Simplified */}
              <div className="md:hidden flex flex-col">
                {/* Mobile Price */}
                <div className="flex items-center justify-center mb-2">
                  {renderPrice()}
                </div>

                {/* Mobile iOS-style Navigation Buttons */}
                <div className="flex border border-white/10 rounded-lg overflow-hidden">
                  <motion.button
                    whileTap={{ y: 1 }}
                    onClick={onBack}
                    className="flex-1 py-2.5 text-sm font-medium text-gray-300 bg-black/40
                             backdrop-blur-xl border-r border-white/10 active:bg-black/60 transition-colors cursor-pointer"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileTap={{ y: 1 }}
                    onClick={onContinue}
                    className="flex-1 py-2.5 text-sm font-medium text-blue-200 bg-blue-500/20
                             backdrop-blur-xl active:bg-blue-500/30 transition-colors cursor-pointer"
                  >
                    Continue
                  </motion.button>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] h-[1px] overflow-hidden rounded-b-2xl"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 animate-gradient-x" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-blue-400/50 to-blue-500/50 blur-sm" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
