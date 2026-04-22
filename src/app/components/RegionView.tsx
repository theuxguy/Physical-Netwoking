import { useParams } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { ContentHeader } from "./ContentHeader";
import { IncidentChart } from "./IncidentChart";
import { BottomControls } from "./BottomControls";
import { NetworkDiagram } from "./NetworkDiagram";
import { RegionHealthTable } from "./RegionHealthTable";
import { useTimeRange } from "../contexts/TimeRangeContext";

const getBlockLabel = (block: string) => {
  if (block.startsWith('bld')) {
    const num = block.replace('bld', '');
    return `BLD ${num}`;
  } else if (block.startsWith('ad')) {
    return block.toUpperCase().replace('AD', 'AD-');
  }
  return block.toUpperCase();
};

const formatMapDate = (date: Date) => {
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month} ${day}, ${year} ${hours}:${minutes} UTC`;
};

export function RegionView() {
  const { regionCode } = useParams<{ regionCode: string }>();
  // AD-1 is pre-selected as the most critical component (critical/red status)
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>(['ad1']);
  const {
    showComparison, setShowComparison,
    comparisonWindowDate,
    hasMovedWindow,
  } = useTimeRange();

  const handleBlockClick = (blockName: string) => {
    // Add block if not already expanded, max 5 blocks
    if (!expandedBlocks.includes(blockName) && expandedBlocks.length < 5) {
      setExpandedBlocks([...expandedBlocks, blockName]);
      toast.success(`${getBlockLabel(blockName)} added to table`);
    }
  };

  const handleCloseBlock = (blockName: string) => {
    setExpandedBlocks(expandedBlocks.filter(b => b !== blockName));
    toast(`${getBlockLabel(blockName)} removed from table`);
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0f0f0f] overflow-auto">
      {/* Breadcrumb and header */}
      <ContentHeader isRegionView regionCode={regionCode} />

      {/* Chart section */}
      <IncidentChart />

      {/* Network diagram section with comparison support */}
      <div className="px-6 pb-6">
        <div className="flex gap-2 items-stretch">

          {/* Left comparison panel — read-only topology at comparison timestamp */}
          <AnimatePresence>
            {showComparison && (
              <motion.div
                className="relative flex-1 overflow-hidden"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Orange timestamp */}
                <div className="absolute top-4 right-4 z-50 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-xs dark:text-white pointer-events-auto">
                  <div className="text-[#de8011] font-bold">Showing data for {formatMapDate(comparisonWindowDate)}</div>
                </div>

                {/* Close comparison button */}
                <button
                  onClick={() => setShowComparison(false)}
                  className="absolute top-4 left-4 z-50 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-2 text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors pointer-events-auto"
                >
                  ✕ Close comparison
                </button>

                <NetworkDiagram
                  onADClick={() => {}}
                  expandedAD={null}
                  expandedBlocks={[]}
                  readOnly
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right (main) panel — interactive topology */}
          <div className="flex-1">
            <NetworkDiagram
              onADClick={handleBlockClick}
              expandedAD={null}
              expandedBlocks={expandedBlocks}
              onCompareClick={!showComparison ? () => setShowComparison(true) : undefined}
            />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <BottomControls />

      {/* Table section */}
      <div className="px-6 pb-6">
        <RegionHealthTable expandedBlocks={expandedBlocks} onCloseBlock={handleCloseBlock} />
      </div>
    </div>
  );
}
