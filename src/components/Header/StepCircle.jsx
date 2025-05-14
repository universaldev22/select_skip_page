import React from "react";
import { motion } from "framer-motion";

const StepCircle = ({ step, index, size = "md" }) => {
  const dimensionClasses = size === "md" ? "w-6 h-6" : "w-8 h-8";
  const iconSize        = size === "md" ? 14 : 18;
  const borderAndBg     = step.active
    ? "bg-blue-500/10 border-blue-400/30 text-blue-100"
    : "bg-black/40  border-white/5   text-gray-500";
  const Icon            = step.icon;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1,   opacity: 1 }}
      transition={{
        delay:    index * 0.1,
        duration: 0.5,
        ease:     [0.23, 1, 0.32, 1],
      }}
      className={`
        relative z-10 ${dimensionClasses} rounded-lg flex items-center justify-center
        border transition-all duration-500 ${borderAndBg}
      `}
    >
      <Icon size={iconSize} className="relative z-10" />
      {step.active && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-blue-400/20 blur-sm"
          initial={false}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
};

export default StepCircle;
