// Header.tsx
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { motion } from "framer-motion";
import StepCircle from "./StepCircle";
import {
  MapPin,
  Trash2,
  Truck,
  ShieldCheck,
  CalendarDays,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Step {
  id: number;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  active: boolean;
}

const steps: Step[] = [
  { id: 1, label: "Postcode",     icon: MapPin,       active: true  },
  { id: 2, label: "Waste Type",   icon: Trash2,      active: true  },
  { id: 3, label: "Select Skip",  icon: Truck,       active: true  },
  { id: 4, label: "Permit Check", icon: ShieldCheck, active: false },
  { id: 5, label: "Choose Date",  icon: CalendarDays,active: false },
  { id: 6, label: "Payment",      icon: CreditCard,  active: false },
];

export const Header: React.FC = () => {
  const activeStep   = steps.filter((s) => s.active).length;
  const totalSteps   = steps.length;
  const currentLabel = steps[activeStep - 1]?.label ?? "";

  const scrollRef     = useRef<HTMLDivElement>(null);
  const [canScrollL, setCanScrollL] = useState(false);
  const [canScrollR, setCanScrollR] = useState(false);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollL(el.scrollLeft > 0);
    setCanScrollR(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  const scrollBy = (distance: number) => {
    scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <header className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">

        {/* Mobile Progress Counter */}
        <div className="md:hidden flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-medium text-blue-200"
              aria-label={`Step ${activeStep} of ${totalSteps}`}
            >
              Step {activeStep} of {totalSteps}
            </span>
          </div>
          <span className="text-xs font-medium bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            {currentLabel}
          </span>
        </div>

        {/* Mobile Steps */}
        <div className="md:hidden relative flex items-center py-2">
          {/* Left Arrow */}
          {canScrollL && (
            <button
              onClick={() => scrollBy(-80)}
              className="absolute left-2 z-20 p-1 bg-blue-500 rounded-full"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={12} className="text-white" />
            </button>
          )}

          {/* Scroll Area */}
          <div
            ref={scrollRef}
            className="overflow-x-auto flex items-center space-x-2 pl-14 pr-14 py-1 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step, idx) => (
              <Fragment key={step.id}>
                {/* Step Icon & Underline */}
                <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                  <StepCircle step={step} index={idx} size="md" />
                  {step.active && (
                    <motion.div
                      className="w-6 h-1 bg-blue-500 rounded"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                      style={{ originX: 0 }}
                    />
                  )}
                </div>

                {/* Connector */}
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-shrink-0 h-[2px] w-6 transition-colors duration-300 ${
                      idx < activeStep - 1
                        ? "bg-blue-500/50"
                        : "bg-gray-700/50"
                    }`}
                  />
                )}
              </Fragment>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollR && (
            <button
              onClick={() => scrollBy(80)}
              className="absolute right-2 z-20 p-1 bg-blue-500 rounded-full"
              aria-label="Scroll Right"
            >
              <ChevronRight size={12} className="text-white" />
            </button>
          )}
        </div>

        {/* Desktop Steps */}
        <div className="hidden md:flex items-center justify-between max-w-6xl mx-auto py-4 px-4">
          {steps.map((step, idx) => (
            <Fragment key={step.id}>
              <div className="flex-shrink-0 flex flex-col items-center">
                <StepCircle step={step} index={idx} size="lg" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
                  className={`mt-1.5 text-[10px] font-medium transition-colors duration-300 ${
                    step.active ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </motion.div>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] transition-colors duration-300 ${
                    idx < activeStep - 1
                      ? "bg-blue-500/50"
                      : "bg-gray-700/50"
                  }`}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};
