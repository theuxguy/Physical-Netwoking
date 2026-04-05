import WorldMapDashboard from "../../imports/WorldMapDashboard";
import { useTimeRange } from "../contexts/TimeRangeContext";
import { ChevronDown, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function MapSection() {
  const { startDate, endDate, isLoading, hasMovedWindow, setHasMovedWindow, setTimeRange, showComparison, setShowComparison, currentWindowDate, setCurrentWindowDate, initialEndDate } = useTimeRange();

  // Format date for display
  const formatMapDate = (date: Date) => {
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month} ${day}, ${year} ${hours}:${minutes} UTC`;
  };

  // Format date range for display
  const formatDateRange = () => {
    return formatMapDate(currentWindowDate);
  };

  const handleCompareWithCurrent = () => {
    setShowComparison(true);
  };

  const handleRefresh = () => {
    setCurrentWindowDate(initialEndDate);
    setHasMovedWindow(false);
    setShowComparison(false);
  };
  
  return (
    <div className="px-6 py-4 flex flex-col h-[600px]">
      {/* Map container */}
      <div className="relative bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded-lg flex-1 flex gap-2 overflow-hidden">
        
        {/* Current map (left side) - slides in when comparison is active */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative bg-gray-100 dark:bg-[#1a1a1a] border-r border-gray-300 dark:border-[#404040] flex-1"
            >
              {/* Timestamp display - Current */}
              <div className="absolute top-4 right-4 z-10 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-xs dark:text-white">
                <div className="text-[#de8011] font-bold">Showing live data for: Current</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Read-only</div>
              </div>
              
              {/* Close comparison button */}
              <button
                onClick={() => setShowComparison(false)}
                className="absolute top-4 left-4 z-10 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                ✕ Close comparison
              </button>
              
              {/* Current map */}
              <div className="w-full h-full absolute inset-0">
                <WorldMapDashboard overrideEndDate={initialEndDate} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Historical/Main map (right side or full width) */}
        <div className={`relative bg-gray-100 dark:bg-[#1a1a1a] ${showComparison ? 'flex-1' : 'flex-1'}`}>
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#227e9e] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-sm text-[#161513] dark:text-white font-medium">Showing historical data...</div>
              </div>
            </div>
          )}
          
          {/* Search bar */}
          {!showComparison && (
            <div className="absolute top-4 left-4 z-10">
              <input 
                type="text"
                placeholder="Find resource on map"
                className="px-3 py-2 border border-gray-300 dark:border-[#404040] rounded bg-white dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-400 text-sm w-64"
              />
            </div>
          )}
          
          {/* Compare with historical button */}
          {!showComparison && (
            <div className="absolute top-4 left-[280px] z-10">
              <button 
                onClick={handleCompareWithCurrent}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                {hasMovedWindow ? 'Compare with current' : 'Compare with historical'}
              </button>
            </div>
          )}
          
          {/* Refresh button + timestamp display */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            {!showComparison && (
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-xs dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            )}
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-xs dark:text-white">
              <span className={showComparison ? "text-[#5ba8d0] font-bold" : "font-bold"}>
                Showing live data for {formatDateRange()}
              </span>
            </div>
          </div>
          
          {/* Map placeholder */}
          <div className="w-full h-full absolute inset-0">
            <WorldMapDashboard />
          </div>
          
          {/* Map controls */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
            
            
          </div>
          
          {/* Legend button */}
          {!showComparison && (
            <div className="absolute bottom-4 right-20 z-10">
              <button className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-sm dark:text-white flex items-center gap-2">
                <span>☰</span>
                <span>Legend</span>
                <ChevronDown />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}