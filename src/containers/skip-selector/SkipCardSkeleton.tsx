import React from "react"

export const SkipCardSkeleton: React.FC = () => {
  return (
    <div className="
      relative overflow-hidden rounded-2xl p-6
      bg-white/20 dark:bg-black/20 backdrop-blur-xl
      border border-gray-200 dark:border-gray-700
    ">
      <div className="relative z-10">
        {/* Top badges */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-20 bg-gray-200/50 dark:bg-gray-700/50 rounded-xl animate-pulse" />
          <div className="h-6 w-24 bg-gray-200/50 dark:bg-gray-700/50 rounded-xl animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-8 w-32 bg-gray-200/50 dark:bg-gray-700/50 rounded-lg animate-pulse mb-4" />

        {/* Details */}
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-200/50 dark:bg-gray-700/50 rounded animate-pulse" />
          <div className="flex items-baseline space-x-2">
            <div className="h-8 w-24 bg-gray-200/50 dark:bg-gray-700/50 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200/50 dark:bg-gray-700/50 rounded animate-pulse" />
          </div>
        </div>

        {/* Button placeholder */}
        <div className="w-full h-10 bg-gray-200/50 dark:bg-gray-700/50 rounded-xl animate-pulse mt-6" />
      </div>
    </div>
  )
}
