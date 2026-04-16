import { useRegion } from "../contexts/RegionContext";
import { useTimeRange } from "../contexts/TimeRangeContext";
import { useState, useMemo, useRef } from "react";
import svgPaths from "../../imports/svg-sort-icon";
import { GeneralHealthTooltip } from "./GeneralHealthTooltip";
import { useDarkMode } from "../contexts/DarkModeContext";

// Helper function to get background color based on health status
function getHealthBackgroundColor(healthStatus: "Healthy" | "Warning" | "Critical"): string {
  switch (healthStatus) {
    case "Healthy":
      return "rgba(80,130,35,0.1)"; // Light green
    case "Warning":
      return "rgba(222,128,17,0.15)"; // Light amber
    case "Critical":
      return "rgba(214,59,37,0.2)"; // Light red
    default:
      return "rgba(214,59,37,0.2)";
  }
}

// Seeded random number generator for consistent randomization
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

type HoverInfo = {
  component: string;
  healthStatus: string;
  reasons: string[];
  position: { x: number; y: number };
  regionCode: string;
} | null;

type StatusBadgeProps = {
  status: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: () => void;
};

function StatusBadge({ status, onMouseEnter, onMouseLeave }: StatusBadgeProps) {
  if (status === "Healthy") {
    return (
      <div 
        className="content-stretch flex items-center justify-center p-[10px] relative w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="bg-[rgba(80,130,35,0.1)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
          <div aria-hidden="true" className="absolute border border-[#508223] border-solid inset-0 pointer-events-none rounded-[3px]" />
          <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#E4E4E4] text-[11px] whitespace-nowrap">{status}</p>
        </div>
      </div>
    );
  }
  
  if (status === "Warning") {
    return (
      <div 
        className="content-stretch flex items-center justify-center p-[10px] relative w-full cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="bg-[rgba(222,128,17,0.15)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
          <div aria-hidden="true" className="absolute border border-[#ac630c] border-solid inset-0 pointer-events-none rounded-[3px]" />
          <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#E4E4E4] text-[11px] whitespace-nowrap">{status}</p>
        </div>
      </div>
    );
  }
  
  // Critical
  return (
    <div 
      className="content-stretch flex items-center justify-center p-[10px] relative w-full cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-[rgba(214,59,37,0.2)] content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[#d63b25] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#E4E4E4] text-[11px] whitespace-nowrap">{status}</p>
      </div>
    </div>
  );
}

export function MetricsSection() {
  const { expandedRegions, removeRegion } = useRegion();
  const { endDate } = useTimeRange();
  const remainingSlots = 3 - expandedRegions.length;
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isDarkMode } = useDarkMode();

  // Generate mock reasons for warning/critical statuses based on time
  const getReasons = useMemo(() => {
    const seed = endDate.getTime();
    return (status: string, baseIndex: number) => {
      if (status === "Healthy") return [];
      
      const numReasons = Math.floor(seededRandom(seed + baseIndex) * 2) + 1; // 1-2 reasons
      const reasons: string[] = [];
      
      for (let i = 0; i < numReasons; i++) {
        const bdlgNum = String(Math.floor(seededRandom(seed + baseIndex + i * 100) * 12) + 1).padStart(2, '0');
        reasons.push(`BDLG-${bdlgNum}`);
      }
      
      return reasons;
    };
  }, [endDate]);

  const handleCellHover = (
    e: React.MouseEvent,
    component: string,
    status: string,
    baseIndex: number,
    regionCode: string
  ) => {
    if (status === "Healthy") return;
    
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverInfo({
      component,
      healthStatus: status,
      reasons: getReasons(status, baseIndex),
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      },
      regionCode
    });
  };

  const handleCellLeave = () => {
    // Add a delay before clearing to allow moving to tooltip
    hideTimeoutRef.current = setTimeout(() => {
      setHoverInfo(null);
    }, 1000);
  };

  const handleTooltipEnter = () => {
    // Keep the tooltip visible when hovering over it
    // This prevents it from disappearing
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleTooltipLeave = () => {
    setHoverInfo(null);
  };

  return (
    <div className="px-6 pb-6">
      <div className="bg-white dark:bg-[#1a1a1a] flex items-stretch w-full min-w-[400px] border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-x-auto">
            {/* Metrics Column */}
            <div className="content-stretch flex items-start relative shrink-0 w-[110px] self-stretch">
              <div aria-hidden="true" className="absolute border border-[#d8d8d8] dark:border-[#404040] border-solid inset-[-1px] pointer-events-none" />
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative h-full">
                {/* Empty header cell */}
                <div className="bg-[#f8f8f8] dark:bg-[#252525] h-[37px] relative shrink-0 w-full">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="size-full" />
                  </div>
                </div>
                {/* Metrics label */}
                <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative w-full">
                      <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Metrics</p>
                      <div className="relative shrink-0 size-[16px]">
                        <div className="absolute inset-[16.67%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                            <path d={svgPaths.p33861080} className="fill-[#665F5B] dark:fill-[#a0a0a0]" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Metric rows */}
                <div className="bg-[#f8f8f8] dark:bg-[#252525] relative flex-1 w-full">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                      <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] dark:text-[#e0e0e0] text-[14px] whitespace-nowrap">Availability</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f8f8f8] dark:bg-[#252525] relative flex-1 w-full">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                      <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] dark:text-[#e0e0e0] text-[14px] whitespace-nowrap">Performance</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f8f8f8] dark:bg-[#252525] relative flex-1 w-full">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                      <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] dark:text-[#e0e0e0] text-[14px] whitespace-nowrap">Reliability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Region columns */}
            {expandedRegions.map((region, regionIndex) => (
              <div key={region.code} className={`flex flex-1 items-stretch relative min-w-[420px] overflow-hidden border-r border-[#e0e0e0] dark:border-[#404040] ${regionIndex > 0 ? 'border-l' : ''}`}>
                {/* AD-1 */}
                <div className="content-stretch flex flex-col items-start relative flex-1 min-w-[80px]">
                  <div aria-hidden="true" className="absolute border-[#d8d8d8] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="h-[37px] relative shrink-0 w-full" style={{ backgroundColor: getHealthBackgroundColor(region.healthStatus) }}>
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                        <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">AD-1</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad1.availability}
                        onMouseEnter={(e) => handleCellHover(e, "AD-1 availability", region.ad1.availability, regionIndex * 100 + 1, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad1.performance}
                        onMouseEnter={(e) => handleCellHover(e, "AD-1 performance", region.ad1.performance, regionIndex * 100 + 2, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad1.reliability}
                        onMouseEnter={(e) => handleCellHover(e, "AD-1 reliability", region.ad1.reliability, regionIndex * 100 + 3, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                </div>

                {/* AD-2 */}
                <div className="content-stretch flex flex-col items-start relative flex-1 min-w-[80px]">
                  <div aria-hidden="true" className="absolute border-[#d8d8d8] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="h-[37px] relative shrink-0 w-full" style={{ backgroundColor: getHealthBackgroundColor(region.healthStatus) }}>
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                        <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">AD-2</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad2.availability}
                        onMouseEnter={(e) => handleCellHover(e, "AD-2 availability", region.ad2.availability, regionIndex * 100 + 4, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad2.performance}
                        onMouseEnter={(e) => handleCellHover(e, "AD-2 performance", region.ad2.performance, regionIndex * 100 + 5, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad2.reliability}
                        onMouseEnter={(e) => handleCellHover(e, "AD-2 reliability", region.ad2.reliability, regionIndex * 100 + 6, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                </div>

                {/* AD-3 */}
                <div className="content-stretch flex flex-col items-start relative flex-1 min-w-[80px]">
                  <div aria-hidden="true" className="absolute border-[#d8d8d8] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="h-[37px] relative shrink-0 w-full" style={{ backgroundColor: getHealthBackgroundColor(region.healthStatus) }}>
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                        <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">AD-3</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad3.availability}
                        onMouseEnter={(e) => handleCellHover(e, "AD-3 availability", region.ad3.availability, regionIndex * 100 + 7, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad3.performance}
                        onMouseEnter={(e) => handleCellHover(e, "AD-3 performance", region.ad3.performance, regionIndex * 100 + 8, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.ad3.reliability}
                        onMouseEnter={(e) => handleCellHover(e, "AD-3 reliability", region.ad3.reliability, regionIndex * 100 + 9, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                </div>

                {/* Region Name & FastConnect */}
                <div className="content-stretch flex flex-col items-start relative flex-1 min-w-[90px]">
                  <div aria-hidden="true" className="absolute border-[#d8d8d8] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="relative shrink-0 w-full" style={{ backgroundColor: getHealthBackgroundColor(region.healthStatus) }}>
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                        <p className="font-normal leading-[normal] not-italic relative text-[14px] text-black dark:text-white truncate min-w-0">{region.code} ({region.name})</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                        <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">FastConnect</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.fastConnect.availability}
                        onMouseEnter={(e) => handleCellHover(e, "FastConnect availability", region.fastConnect.availability, regionIndex * 100 + 10, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.fastConnect.performance}
                        onMouseEnter={(e) => handleCellHover(e, "FastConnect performance", region.fastConnect.performance, regionIndex * 100 + 11, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.fastConnect.reliability}
                        onMouseEnter={(e) => handleCellHover(e, "FastConnect reliability", region.fastConnect.reliability, regionIndex * 100 + 12, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                </div>

                {/* Internet */}
                <div className="content-stretch flex flex-col items-start relative flex-1 min-w-[80px]">
                  <div aria-hidden="true" className="absolute border-[#d8d8d8] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="h-[37px] relative shrink-0 w-full" style={{ backgroundColor: getHealthBackgroundColor(region.healthStatus) }}>
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                        <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Internet</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.internet.availability}
                        onMouseEnter={(e) => handleCellHover(e, "Internet availability", region.internet.availability, regionIndex * 100 + 13, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.internet.performance}
                        onMouseEnter={(e) => handleCellHover(e, "Internet performance", region.internet.performance, regionIndex * 100 + 14, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.internet.reliability}
                        onMouseEnter={(e) => handleCellHover(e, "Internet reliability", region.internet.reliability, regionIndex * 100 + 15, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                </div>

                {/* VPN */}
                <div className="content-stretch flex flex-col items-start relative flex-1 min-w-[80px]">
                  <div aria-hidden="true" className="absolute border-[#d8d8d8] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="h-[37px] relative shrink-0 w-full" style={{ backgroundColor: getHealthBackgroundColor(region.healthStatus) }}>
                    <div className="flex flex-row items-center justify-end size-full">
                      <div className="size-full" />
                    </div>
                  </div>
                  <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                        <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">VPN</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.vpn.availability}
                        onMouseEnter={(e) => handleCellHover(e, "VPN availability", region.vpn.availability, regionIndex * 100 + 16, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.vpn.performance}
                        onMouseEnter={(e) => handleCellHover(e, "VPN performance", region.vpn.performance, regionIndex * 100 + 17, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.vpn.reliability}
                        onMouseEnter={(e) => handleCellHover(e, "VPN reliability", region.vpn.reliability, regionIndex * 100 + 18, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                </div>

                {/* Backbone */}
                <div className="content-stretch flex flex-col items-start relative flex-1 min-w-[90px]">
                  <div aria-hidden="true" className="absolute border-[#d8d8d8] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="h-[37px] relative shrink-0 w-full" style={{ backgroundColor: getHealthBackgroundColor(region.healthStatus) }}>
                    <div className="flex flex-row items-center justify-end size-full">
                      <div className="content-stretch flex gap-[10px] items-center justify-end pr-[10px] py-[10px] relative size-full">
                        <div
                          className="overflow-clip relative shrink-0 size-[16px] cursor-pointer"
                          onClick={() => removeRegion(region.code)}
                        >
                          <div className="absolute inset-[20.83%]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                              <path d={svgPaths.p31782000} fill={isDarkMode ? "#ffffff" : "#222222"} />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                        <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Backbone</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.backbone.availability}
                        onMouseEnter={(e) => handleCellHover(e, "Backbone availability", region.backbone.availability, regionIndex * 100 + 19, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.backbone.performance}
                        onMouseEnter={(e) => handleCellHover(e, "Backbone performance", region.backbone.performance, regionIndex * 100 + 20, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full">
                    <div className="flex flex-row items-center justify-center size-full">
                      <StatusBadge 
                        status={region.backbone.reliability}
                        onMouseEnter={(e) => handleCellHover(e, "Backbone reliability", region.backbone.reliability, regionIndex * 100 + 21, region.code)}
                        onMouseLeave={handleCellLeave}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder column */}
            {remainingSlots > 0 && (
              <div className="bg-white dark:bg-[#1a1a1a] flex-[1_0_0] h-full min-h-px min-w-px relative">
                <div aria-hidden="true" className="absolute border border-[#dcdcdc] dark:border-[#505050] border-dashed inset-0 pointer-events-none" />
                <div className="flex flex-row items-center justify-center h-full">
                  <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
                    <p className="font-normal leading-[normal] not-italic relative text-[14px] text-black dark:text-white text-center max-w-full break-words px-4">
                      Add up to {remainingSlots} more region{remainingSlots > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            )}
      </div>

      {/* Tooltip */}
      {hoverInfo && (
        <GeneralHealthTooltip
          component={hoverInfo.component}
          healthStatus={hoverInfo.healthStatus}
          reasons={hoverInfo.reasons}
          position={hoverInfo.position}
          regionCode={hoverInfo.regionCode}
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
        />
      )}
    </div>
  );
}