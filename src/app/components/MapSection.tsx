import WorldMapDashboard from "../../imports/WorldMapDashboard";
import { useTimeRange } from "../contexts/TimeRangeContext";
import { useViewMode } from "../contexts/ViewModeContext";
import { useSimulate } from "../contexts/SimulateContext";
import { RefreshCw, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

type VisibleStatuses = { critical: boolean; warning: boolean; healthy: boolean };

export function MapSection() {
  const { isLoading, hasMovedWindow, showComparison, setShowComparison, currentWindowDate, setCurrentWindowDate, comparisonWindowDate, initialEndDate, setHasMovedWindow } = useTimeRange();
  const { viewMode } = useViewMode();
  const { activeScenario } = useSimulate();

  const formatMapDate = (date: Date) => {
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month} ${day}, ${year} ${hours}:${minutes} UTC`;
  };

  const formatDateRange = () => formatMapDate(hasMovedWindow ? currentWindowDate : new Date());

  const liveMapPositionRef = useRef<{ coordinates: [number, number]; zoom: number }>({ coordinates: [0, 20], zoom: 3 });
  const [comparisonInitialPosition, setComparisonInitialPosition] = useState<{ coordinates: [number, number]; zoom: number } | undefined>(undefined);

  const [visibleStatuses, setVisibleStatuses] = useState<VisibleStatuses>({ critical: true, warning: true, healthy: true });
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  const handleCompareWithCurrent = () => {
    setComparisonInitialPosition({ ...liveMapPositionRef.current });
    setShowComparison(true);
  };

  const handleRefresh = () => {
    setCurrentWindowDate(initialEndDate);
    setHasMovedWindow(false);
    setShowComparison(false);
  };

  const toggleStatus = (key: keyof VisibleStatuses) =>
    setVisibleStatuses(prev => ({ ...prev, [key]: !prev[key] }));

  const activeFilterCount = Object.values(visibleStatuses).filter(v => !v).length;

  return (
    <div className="px-6 py-4 flex flex-col flex-1">
      {/* Map container */}
      <div className="relative bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded-lg flex-1 flex gap-2 overflow-hidden">

        {/* Comparison map (left) — slides in */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative bg-gray-100 dark:bg-[#1a1a1a] border-r border-gray-300 dark:border-[#404040] flex-1"
            >
              <div className="absolute top-4 right-4 z-10 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-xs dark:text-white">
                <div className="text-[#de8011] font-bold">Showing data for {formatMapDate(comparisonWindowDate)}</div>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="absolute top-4 left-4 z-10 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                ✕ Close comparison
              </button>
              <div className="w-full h-full absolute inset-0">
                <WorldMapDashboard overrideEndDate={comparisonWindowDate} initialPosition={comparisonInitialPosition} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live / historical map (right or full) */}
        <div className="relative bg-gray-100 dark:bg-[#1a1a1a] flex-1">
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#227e9e] border-t-transparent rounded-full animate-spin" />
                <div className="text-sm text-[#161513] dark:text-white font-medium">Showing historical data...</div>
              </div>
            </div>
          )}

          {/* Top-left controls row */}
          {!showComparison && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              {/* Search */}
              <input
                type="text"
                placeholder="Search regions, data centers, or airports"
                aria-label="Search regions, data centers, or airports"
                className="px-3 py-2 border border-gray-300 dark:border-[#404040] rounded bg-white dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-400 text-sm w-64"
              />

              {/* Compare */}
              <button
                onClick={handleCompareWithCurrent}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors whitespace-nowrap"
              >
                {hasMovedWindow ? 'Compare with current' : 'Compare with historical'}
              </button>

              {/* Link filter — backbone view only */}
              {viewMode === 'backbone' && (
                <div ref={filterRef} className="relative">
                  <button
                    onClick={() => setFilterOpen(prev => !prev)}
                    className="flex items-center gap-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors whitespace-nowrap"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Filter links</span>
                    {activeFilterCount > 0 && (
                      <span className="ml-0.5 bg-[#227e9e] text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center leading-none">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {filterOpen && (
                    <div className="absolute top-full mt-1 left-0 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded shadow-lg p-3 flex flex-col gap-2.5 z-30 min-w-[148px]">
                      {(
                        [
                          { key: 'critical', label: 'Critical', color: '#d63b25' },
                          { key: 'warning',  label: 'Warning',  color: '#de8011' },
                          { key: 'healthy',  label: 'Healthy',  color: '#508223' },
                        ] as const
                      ).map(({ key, label, color }) => (
                        <label
                          key={key}
                          className="flex items-center gap-2 cursor-pointer select-none text-sm text-[#161513] dark:text-white"
                        >
                          <input
                            type="checkbox"
                            checked={visibleStatuses[key]}
                            onChange={() => toggleStatus(key)}
                            className="w-3.5 h-3.5 rounded cursor-pointer"
                          />
                          <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                          {label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Top-right: refresh + timestamp */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            {!showComparison && (
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-xs dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{hasMovedWindow ? 'Reset to live' : 'Refresh'}</span>
              </button>
            )}
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-xs dark:text-white">
              <span className={showComparison ? "text-[#5ba8d0] font-bold" : activeScenario === "no-live-data" ? "text-[#de8011] font-bold" : "font-bold"}>
                {activeScenario === "no-live-data" && !hasMovedWindow
                  ? "Showing historical view"
                  : hasMovedWindow
                  ? `Historical · ${formatDateRange()}`
                  : `Live · ${formatDateRange()}`}
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-full absolute inset-0">
            <WorldMapDashboard
              onPositionChange={(pos) => { liveMapPositionRef.current = pos; }}
              visibleStatuses={visibleStatuses}
            />
          </div>

          {/* Legend */}
          {!showComparison && (
            <div className="absolute bottom-4 right-4 z-10 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded-sm bg-[#508223] inline-block shrink-0" />Healthy</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded-sm bg-[#de8011] inline-block shrink-0" />Warning</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded-sm bg-[#d63b25] inline-block shrink-0" />Critical</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
