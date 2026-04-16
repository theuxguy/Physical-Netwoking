import svgPaths from "../../imports/svg-health-table-icons";
import closeIcon from "../../imports/svg-close-icon";
import React, { useState, useMemo } from "react";
import { SideDrawer } from "./SideDrawer";

interface RegionHealthTableProps {
  expandedBlocks: string[];
  onCloseBlock: (blockName: string) => void;
}

type StatusBadgeProps = {
  status: 'healthy' | 'critical' | 'warning';
  onClick?: () => void;
};

function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const styles = {
    healthy: {
      bg: 'bg-[rgba(80,130,35,0.2)] dark:bg-[rgba(80,130,35,0.15)]',
      border: 'border-[#508223] dark:border-[#6ba32e]',
      text: 'text-[#3a5c1a] dark:text-[#E4E4E4]',
      label: 'Healthy'
    },
    critical: {
      bg: 'bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)]',
      border: 'border-[#d63b25] dark:border-[#e85540]',
      text: 'text-[#a02a18] dark:text-[#E4E4E4]',
      label: 'Critical'
    },
    warning: {
      bg: 'bg-[rgba(222,128,17,0.2)] dark:bg-[rgba(222,128,17,0.15)]',
      border: 'border-[rgba(222,128,17,0.6)] dark:border-[rgba(255,152,30,0.7)]',
      text: 'text-[#7a4a00] dark:text-[#E4E4E4]',
      label: 'Warning'
    }
  };

  const style = styles[status];

  return (
    <div
      className={`${style.bg} content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0 ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      onClick={onClick}
    >
      <div aria-hidden="true" className={`absolute border ${style.border} border-solid inset-0 pointer-events-none rounded-[3px]`} />
      <p className={`font-normal leading-[normal] not-italic relative shrink-0 ${style.text} text-[11px] whitespace-nowrap`}>{style.label}</p>
    </div>
  );
}

function CellWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center px-[10px] py-[7px] relative size-full">
        {children}
      </div>
    </div>
  );
}

export function RegionHealthTable({ expandedBlocks, onCloseBlock }: RegionHealthTableProps) {
  const [drawerState, setDrawerState] = useState<{
    isOpen: boolean;
    component: string;
    metric: string;
    category: string;
  }>({
    isOpen: false,
    component: '',
    metric: '',
    category: '',
  });

  const handleBadgeClick = (component: string, category: string, metric: string) => {
    setDrawerState({
      isOpen: true,
      component,
      metric,
      category,
    });
  };

  const handleCloseDrawer = () => {
    setDrawerState({
      isOpen: false,
      component: '',
      metric: '',
      category: '',
    });
  };

  const getCategoryLabel = (category: string) => {
    const upperCategories = ['cfab', 'jfab', 'ffab', 'tor'];
    if (upperCategories.includes(category.toLowerCase())) {
      return category.toUpperCase();
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getBlockLabel = (block: string) => {
    if (block.startsWith('bld')) {
      // Extract BLD number (e.g., 'bld01' -> 'BLD 01')
      const num = block.replace('bld', '');
      return `BLD ${num}`;
    } else if (block.startsWith('ad')) {
      // Format AD blocks (e.g., 'ad1' -> 'AD-1')
      return block.toUpperCase().replace('AD', 'AD-');
    }
    return block.toUpperCase();
  };

  const getBlockData = (block: string) => {
    // Seeded random function for consistent results
    const seededRandom = (seed: string) => {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      const x = Math.sin(Math.abs(hash)) * 10000;
      return x - Math.floor(x);
    };

    // Generate consistent status based on seed
    const getSeededStatus = (seed: string): 'healthy' | 'critical' | 'warning' => {
      const statuses: Array<'healthy' | 'critical' | 'warning'> = ['healthy', 'critical', 'warning'];
      const index = Math.floor(seededRandom(seed) * statuses.length);
      return statuses[index];
    };

    // Mock data - replace with real data
    // BLD blocks get different data than AD blocks
    if (block.startsWith('bld')) {
      return {
        type: 'bld' as const,
        fabric: {
          availability: getSeededStatus(`${block}-fabric-availability`),
          performance: getSeededStatus(`${block}-fabric-performance`),
          reliability: getSeededStatus(`${block}-fabric-reliability`)
        },
        cfab: {
          availability: getSeededStatus(`${block}-cfab-availability`),
          performance: getSeededStatus(`${block}-cfab-performance`),
          reliability: getSeededStatus(`${block}-cfab-reliability`)
        },
        jfab: {
          availability: getSeededStatus(`${block}-jfab-availability`),
          performance: getSeededStatus(`${block}-jfab-performance`),
          reliability: getSeededStatus(`${block}-jfab-reliability`)
        },
        ffab: {
          availability: getSeededStatus(`${block}-ffab-availability`),
          performance: getSeededStatus(`${block}-ffab-performance`),
          reliability: getSeededStatus(`${block}-ffab-reliability`)
        },
        tor: {
          availability: getSeededStatus(`${block}-tor-availability`),
          performance: getSeededStatus(`${block}-tor-performance`),
          reliability: getSeededStatus(`${block}-tor-reliability`)
        }
      };
    }
    
    // AD block data
    return {
      type: 'ad' as const,
      fabric: { 
        availability: block === 'ad3' ? 'healthy' as const : 'healthy' as const, 
        performance: block === 'ad3' ? 'warning' as const : 'critical' as const, 
        reliability: 'healthy' as const 
      },
      tor: { 
        availability: block === 'ad3' ? 'healthy' as const : 'healthy' as const, 
        performance: block === 'ad3' ? 'warning' as const : 'critical' as const, 
        reliability: 'healthy' as const 
      }
    };
  };

  const blockData = useMemo(() => expandedBlocks.map(getBlockData), [expandedBlocks]);

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-x-auto overflow-y-hidden">
      <div className="flex items-stretch w-full" style={{ minWidth: 'max(100%, 500px)' }}>
          {/* Metrics Column */}
          <div className="content-stretch flex items-start relative shrink-0 w-[110px] border-r border-[#d8d8d8] dark:border-[#404040]">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full">
              {/* Empty header cell */}
              <div className="bg-[#f8f8f8] dark:bg-[#252525] h-[37px] relative shrink-0 w-full">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="size-full" />
                </div>
              </div>
              {/* Metrics label */}
              <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[46px]">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative w-full">
                    <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Metrics</p>
                    <div className="relative shrink-0 size-[16px]" data-name="SORT">
                      <div className="absolute inset-[16.67%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                          <path d={svgPaths.p33861080} className="fill-[#665F5B] dark:fill-[#a0a0a0]" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Metrics rows */}
              <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[34px]">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                    <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] dark:text-[#e0e0e0] text-[14px] whitespace-nowrap">Availability</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[34px]">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                    <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] dark:text-[#e0e0e0] text-[14px] whitespace-nowrap">Performance</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[34px]">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                    <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] dark:text-[#e0e0e0] text-[14px] whitespace-nowrap">Reliability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metro Column */}
          <div className="content-stretch flex items-start relative shrink-0 w-[110px] border-r border-[#d8d8d8] dark:border-[#404040]">
            <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-r border-solid border-t inset-[-1px_-1px_-1px_0] pointer-events-none" />
            <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
              {/* Empty header cell */}
              <div className="bg-[#f8f8f8] dark:bg-[#252525] h-[37px] relative shrink-0 w-full">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="size-full" />
                </div>
              </div>
              {/* Metro label */}
              <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[46px]">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                    <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Metro</p>
                  </div>
                </div>
              </div>
              {/* Metro cells */}
              <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full h-[34px]">
                <CellWrapper><StatusBadge status="healthy" /></CellWrapper>
              </div>
              <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full h-[34px]">
                <CellWrapper><StatusBadge status="healthy" /></CellWrapper>
              </div>
              <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full h-[34px]">
                <CellWrapper><StatusBadge status="healthy" /></CellWrapper>
              </div>
            </div>
          </div>

          {/* Fabric and TOR Columns (when AD is expanded) */}
          {expandedBlocks.map((block, index) => {
            const data = blockData[index];
            
            // BLD blocks have different layout
            if (data.type === 'bld') {
              return (
                <div key={block} className="flex flex-1 min-w-[400px] overflow-hidden border-r border-[#d8d8d8] dark:border-[#404040]">
                  {/* BLD Header Column */}
                  <div className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                    <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                      {/* Block label */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[37px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">{getBlockLabel(block)}</p>
                          </div>
                        </div>
                      </div>
                      {/* Fabric label */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[46px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Fabric</p>
                          </div>
                        </div>
                      </div>
                      {/* Fabric metric cells */}
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.fabric.availability} onClick={() => handleBadgeClick(block, 'fabric', 'availability')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.fabric.performance} onClick={() => handleBadgeClick(block, 'fabric', 'performance')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.fabric.reliability} onClick={() => handleBadgeClick(block, 'fabric', 'reliability')} /></CellWrapper>
                      </div>
                    </div>
                  </div>

                  {/* CFAB Column */}
                  <div className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                    <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                      {/* Empty header */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[37px] relative shrink-0 w-full" />
                      {/* CFAB label */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[46px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">CFAB</p>
                          </div>
                        </div>
                      </div>
                      {/* CFAB metric cells */}
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.cfab.availability} onClick={() => handleBadgeClick(block, 'cfab', 'availability')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.cfab.performance} onClick={() => handleBadgeClick(block, 'cfab', 'performance')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.cfab.reliability} onClick={() => handleBadgeClick(block, 'cfab', 'reliability')} /></CellWrapper>
                      </div>
                    </div>
                  </div>

                  {/* JFAB Column */}
                  <div className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                    <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                      {/* Empty header */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[37px] relative shrink-0 w-full" />
                      {/* JFAB label */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[46px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">JFAB</p>
                          </div>
                        </div>
                      </div>
                      {/* JFAB metric cells */}
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.jfab.availability} onClick={() => handleBadgeClick(block, 'jfab', 'availability')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.jfab.performance} onClick={() => handleBadgeClick(block, 'jfab', 'performance')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.jfab.reliability} onClick={() => handleBadgeClick(block, 'jfab', 'reliability')} /></CellWrapper>
                      </div>
                    </div>
                  </div>

                  {/* FFAB Column */}
                  <div className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                    <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                      {/* Empty header */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[37px] relative shrink-0 w-full" />
                      {/* FFAB label */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[46px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">FFAB</p>
                          </div>
                        </div>
                      </div>
                      {/* FFAB metric cells */}
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.ffab.availability} onClick={() => handleBadgeClick(block, 'ffab', 'availability')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.ffab.performance} onClick={() => handleBadgeClick(block, 'ffab', 'performance')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.ffab.reliability} onClick={() => handleBadgeClick(block, 'ffab', 'reliability')} /></CellWrapper>
                      </div>
                    </div>
                  </div>

                  {/* TOR Column */}
                  <div className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                    <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                      {/* Close button */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[37px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-end size-full">
                          <div className="content-stretch flex items-center justify-end p-[10px] relative w-full">
                            <button onClick={() => onCloseBlock(block)} className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70">
                              <div className="absolute inset-[20.83%]">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                                  <path d={closeIcon.p31782000} fill="var(--fill-0, #222222)" className="dark:fill-[#e0e0e0]" />
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* TOR label */}
                      <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[46px] relative shrink-0 w-full">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">TOR</p>
                          </div>
                        </div>
                      </div>
                      {/* TOR metric cells */}
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.tor.availability} onClick={() => handleBadgeClick(block, 'tor', 'availability')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.tor.performance} onClick={() => handleBadgeClick(block, 'tor', 'performance')} /></CellWrapper>
                      </div>
                      <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                        <CellWrapper><StatusBadge status={data.tor.reliability} onClick={() => handleBadgeClick(block, 'tor', 'reliability')} /></CellWrapper>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // AD blocks use the existing 2-column layout
            return (
              <div key={block} className="flex flex-1 min-w-[160px] overflow-hidden border-r border-[#d8d8d8] dark:border-[#404040]">
                {/* Fabric Column */}
                <div className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                    {/* Block label */}
                    <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[37px] relative shrink-0 w-full">
                      <div className="flex flex-row items-center justify-end size-full">
                        <div className="content-stretch flex items-center justify-end p-[10px] relative w-full">
                          <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">{getBlockLabel(block)}</p>
                        </div>
                      </div>
                    </div>
                    {/* Fabric label */}
                    <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[46px] relative shrink-0 w-full">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                          <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Fabric</p>
                        </div>
                      </div>
                    </div>
                    {/* Fabric metric cells */}
                    <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                      <CellWrapper><StatusBadge status={data.fabric.availability} onClick={() => handleBadgeClick(block, 'fabric', 'availability')} /></CellWrapper>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                      <CellWrapper><StatusBadge status={data.fabric.performance} onClick={() => handleBadgeClick(block, 'fabric', 'performance')} /></CellWrapper>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                      <CellWrapper><StatusBadge status={data.fabric.reliability} onClick={() => handleBadgeClick(block, 'fabric', 'reliability')} /></CellWrapper>
                    </div>
                  </div>
                </div>

                {/* TOR Column */}
                <div className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                  <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                  <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                    {/* Close button */}
                    <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[37px] relative shrink-0 w-full">
                      <div className="flex flex-row items-center justify-end size-full">
                        <div className="content-stretch flex items-center justify-end p-[10px] relative w-full">
                          <button onClick={() => onCloseBlock(block)} className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70" data-name="PSFT/Icons/24/RW CrossRed">
                            <div className="absolute inset-[20.83%]" data-name="Vector">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                                <path d={closeIcon.p31782000} fill="var(--fill-0, #222222)" className="dark:fill-[#e0e0e0]" id="Vector" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* TOR label */}
                    <div className="bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)] h-[46px] relative shrink-0 w-full">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                          <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">TOR</p>
                        </div>
                      </div>
                    </div>
                    {/* TOR metric cells */}
                    <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                      <CellWrapper><StatusBadge status={data.tor.availability} onClick={() => handleBadgeClick(block, 'tor', 'availability')} /></CellWrapper>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                      <CellWrapper><StatusBadge status={data.tor.performance} onClick={() => handleBadgeClick(block, 'tor', 'performance')} /></CellWrapper>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                      <CellWrapper><StatusBadge status={data.tor.reliability} onClick={() => handleBadgeClick(block, 'tor', 'reliability')} /></CellWrapper>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty placeholder — only shown when no blocks added yet */}
          {expandedBlocks.length === 0 && (
            <div className="bg-white dark:bg-[#1a1a1a] flex-1 min-h-px min-w-px relative">
              <div aria-hidden="true" className="absolute border border-[#dcdcdc] dark:border-[#505050] border-dashed inset-0 pointer-events-none" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
                  <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">
                    Add up to 5 components
                  </p>
                </div>
              </div>
            </div>
          )}
      </div>
      <SideDrawer 
        isOpen={drawerState.isOpen} 
        onClose={handleCloseDrawer}
        component={getBlockLabel(drawerState.component)}
        metric={drawerState.metric.charAt(0).toUpperCase() + drawerState.metric.slice(1)}
        category={getCategoryLabel(drawerState.category)}
      />
    </div>
  );
}