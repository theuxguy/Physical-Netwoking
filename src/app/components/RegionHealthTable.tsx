import svgPaths from "../../imports/svg-health-table-icons";
import closeIcon from "../../imports/svg-close-icon";
import React, { useState, useMemo } from "react";
import { SideDrawer } from "./SideDrawer";

interface RegionHealthTableProps {
  expandedBlocks: string[];
  onCloseBlock: (blockName: string) => void;
}

type Status = 'healthy' | 'critical' | 'warning';

type StatusBadgeProps = {
  status: Status;
  onClick?: () => void;
  ariaLabel?: string;
};

function StatusBadge({ status, onClick, ariaLabel }: StatusBadgeProps) {
  const styles: Record<Status, { bg: string; border: string; text: string; label: string }> = {
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

  if (onClick) {
    return (
      <button
        role="button"
        onClick={onClick}
        aria-label={ariaLabel ?? `${style.label} — click for details`}
        className={`${style.bg} content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0 cursor-pointer hover:opacity-80`}
      >
        <div aria-hidden="true" className={`absolute border ${style.border} border-solid inset-0 pointer-events-none rounded-[3px]`} />
        <p className={`font-normal leading-[normal] not-italic relative shrink-0 ${style.text} text-[11px] whitespace-nowrap`}>{style.label}</p>
      </button>
    );
  }

  return (
    <div
      aria-label={`${style.label} status`}
      className={`${style.bg} content-stretch flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0`}
    >
      <div aria-hidden="true" className={`absolute border ${style.border} border-solid inset-0 pointer-events-none rounded-[3px]`} />
      <p className={`font-normal leading-[normal] not-italic relative shrink-0 ${style.text} text-[11px] whitespace-nowrap`}>{style.label}</p>
    </div>
  );
}

function CellWrapper({ children }: React.PropsWithChildren<object>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center px-[10px] py-[7px] relative size-full">
        {children}
      </div>
    </div>
  );
}

// Returns header background class based on worst status in the block
function getHeaderBg(worstStatus: Status): string {
  if (worstStatus === 'critical') return 'bg-[rgba(214,59,37,0.2)] dark:bg-[rgba(214,59,37,0.15)]';
  if (worstStatus === 'warning')  return 'bg-[rgba(222,128,17,0.2)] dark:bg-[rgba(222,128,17,0.15)]';
  return 'bg-[rgba(80,130,35,0.15)] dark:bg-[rgba(80,130,35,0.1)]';
}

// Returns the worst status across all metrics in a block
function getWorstStatus(data: ReturnType<typeof getBlockData>): Status {
  const all = data.type === 'bld'
    ? [
        ...Object.values(data.fabric),
        ...Object.values(data.cfab),
        ...Object.values(data.jfab),
        ...Object.values(data.ffab),
        ...Object.values(data.tor),
      ]
    : [...Object.values(data.fabric), ...Object.values(data.tor)];

  if (all.includes('critical')) return 'critical';
  if (all.includes('warning'))  return 'warning';
  return 'healthy';
}

function getBlockLabel(block: string): string {
  if (block.startsWith('bld')) {
    const num = block.replace('bld', '');
    return `BLD ${num}`;
  } else if (block.startsWith('ad')) {
    return block.toUpperCase().replace('AD', 'AD-');
  }
  return block.toUpperCase();
}

function getBlockData(block: string) {
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

  const getSeededStatus = (seed: string): Status => {
    const statuses: Status[] = ['healthy', 'critical', 'warning'];
    const index = Math.floor(seededRandom(seed) * statuses.length);
    return statuses[index];
  };

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
}

export function RegionHealthTable({ expandedBlocks, onCloseBlock }: RegionHealthTableProps) {
  const [drawerState, setDrawerState] = useState<{
    isOpen: boolean;
    component: string;
    metric: string;
    category: string;
  }>({ isOpen: false, component: '', metric: '', category: '' });

  const handleBadgeClick = (component: string, category: string, metric: string) => {
    setDrawerState({ isOpen: true, component, metric, category });
  };

  const handleCloseDrawer = () => {
    setDrawerState({ isOpen: false, component: '', metric: '', category: '' });
  };

  const getCategoryLabel = (category: string) => {
    const upperCategories = ['cfab', 'jfab', 'ffab', 'tor'];
    if (upperCategories.includes(category.toLowerCase())) return category.toUpperCase();
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const blockData = useMemo(() => expandedBlocks.map(getBlockData), [expandedBlocks]);

  const MAX_SLOTS = 5;
  const slotsUsed = expandedBlocks.length;

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-x-auto overflow-y-hidden">
      <div className="flex items-stretch w-full" style={{ minWidth: 'max(100%, 500px)' }}>
        {/* Metrics Column */}
        <div className="content-stretch flex items-start relative shrink-0 w-[110px] border-r border-[#d8d8d8] dark:border-[#404040]">
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full">
            {/* Slot counter */}
            <div className="bg-[#f8f8f8] dark:bg-[#252525] h-[37px] relative shrink-0 w-full flex items-center px-3">
              <span className="text-[11px] text-[#888] dark:text-[#666] whitespace-nowrap">
                {slotsUsed} / {MAX_SLOTS}
              </span>
            </div>
            {/* Metrics label */}
            <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[46px]">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative w-full">
                  <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Metrics</p>
                  <div className="relative shrink-0 size-[16px]" aria-hidden="true">
                    <div className="absolute inset-[16.67%]">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                        <path d={svgPaths.p33861080} className="fill-[#665F5B] dark:fill-[#a0a0a0]" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Metric row labels */}
            {['Availability', 'Performance', 'Reliability'].map((label) => (
              <div key={label} className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[34px]">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                    <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#222] dark:text-[#e0e0e0] text-[14px] whitespace-nowrap">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metro Column */}
        <div className="content-stretch flex items-start relative shrink-0 w-[110px] border-r border-[#d8d8d8] dark:border-[#404040]">
          <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-r border-solid border-t inset-[-1px_-1px_-1px_0] pointer-events-none" />
          <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
            <div className="bg-[#f8f8f8] dark:bg-[#252525] h-[37px] relative shrink-0 w-full" />
            <div className="bg-[#f8f8f8] dark:bg-[#252525] relative shrink-0 w-full h-[46px]">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                  <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Metro</p>
                </div>
              </div>
            </div>
            {(['healthy', 'healthy', 'healthy'] as Status[]).map((s, i) => (
              <div key={i} className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full h-[34px]">
                <CellWrapper><StatusBadge status={s} /></CellWrapper>
              </div>
            ))}
          </div>
        </div>

        {/* Block columns */}
        {expandedBlocks.map((block, index) => {
          const data = blockData[index];
          const worst = getWorstStatus(data);
          const headerBg = getHeaderBg(worst);
          const blockLabel = getBlockLabel(block);

          if (data.type === 'bld') {
            const subCols = [
              { key: 'fabric', label: 'Fabric',  d: data.fabric },
              { key: 'cfab',   label: 'CFAB',    d: data.cfab   },
              { key: 'jfab',   label: 'JFAB',    d: data.jfab   },
              { key: 'ffab',   label: 'FFAB',    d: data.ffab   },
              { key: 'tor',    label: 'TOR',     d: data.tor    },
            ] as const;

            return (
              <div key={block} className="flex flex-1 min-w-[400px] overflow-hidden border-r border-[#d8d8d8] dark:border-[#404040]">
                {subCols.map((col, colIdx) => {
                  const isLast = colIdx === subCols.length - 1;
                  return (
                    <div key={col.key} className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                      <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                        {/* Header row: block label on first col, close btn on last */}
                        <div className={`${headerBg} h-[37px] relative shrink-0 w-full`}>
                          <div className="flex flex-row items-center justify-end size-full">
                            <div className="content-stretch flex items-center justify-end p-[10px] relative w-full">
                              {colIdx === 0 && (
                                <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">{blockLabel}</p>
                              )}
                              {isLast && (
                                <button
                                  onClick={() => onCloseBlock(block)}
                                  aria-label={`Remove ${blockLabel} from table`}
                                  className="relative shrink-0 size-6 cursor-pointer hover:opacity-70 flex items-center justify-center rounded hover:bg-black/10"
                                >
                                  <svg className="block size-[10px]" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333" aria-hidden="true">
                                    <path d={closeIcon.p31782000} fill="var(--fill-0, #222222)" className="dark:fill-[#e0e0e0]" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Sub-category label */}
                        <div className={`${headerBg} h-[46px] relative shrink-0 w-full`}>
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">{col.label}</p>
                            </div>
                          </div>
                        </div>
                        {/* Metric cells */}
                        {(['availability', 'performance', 'reliability'] as const).map((metric) => (
                          <div key={metric} className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                            <CellWrapper>
                              <StatusBadge
                                status={col.d[metric]}
                                onClick={() => handleBadgeClick(block, col.key, metric)}
                                ariaLabel={`${blockLabel} ${col.label} ${metric} — ${col.d[metric]}. Click for details.`}
                              />
                            </CellWrapper>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }

          // AD blocks — 2 sub-columns: Fabric and TOR
          const adCols = [
            { key: 'fabric', label: 'Fabric', d: data.fabric },
            { key: 'tor',    label: 'TOR',    d: data.tor   },
          ] as const;

          return (
            <div key={block} className="flex flex-1 min-w-[160px] overflow-hidden border-r border-[#d8d8d8] dark:border-[#404040]">
              {adCols.map((col, colIdx) => {
                const isLast = colIdx === adCols.length - 1;
                return (
                  <div key={col.key} className="content-stretch flex items-start relative flex-1 min-w-[80px]">
                    <div aria-hidden="true" className="absolute border-[#d5d5d5] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
                    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative">
                      {/* Header row */}
                      <div className={`${headerBg} h-[37px] relative shrink-0 w-full`}>
                        <div className="flex flex-row items-center justify-end size-full">
                          <div className="content-stretch flex items-center justify-end p-[10px] relative w-full">
                            {colIdx === 0 && (
                              <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">{blockLabel}</p>
                            )}
                            {isLast && (
                              <button
                                onClick={() => onCloseBlock(block)}
                                aria-label={`Remove ${blockLabel} from table`}
                                className="relative shrink-0 size-6 cursor-pointer hover:opacity-70 flex items-center justify-center rounded hover:bg-black/10"
                              >
                                <svg className="block size-[10px]" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333" aria-hidden="true">
                                  <path d={closeIcon.p31782000} fill="var(--fill-0, #222222)" className="dark:fill-[#e0e0e0]" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Sub-category label */}
                      <div className={`${headerBg} h-[46px] relative shrink-0 w-full`}>
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                            <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">{col.label}</p>
                          </div>
                        </div>
                      </div>
                      {/* Metric cells */}
                      {(['availability', 'performance', 'reliability'] as const).map((metric) => (
                        <div key={metric} className="bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full h-[34px]">
                          <CellWrapper>
                            <StatusBadge
                              status={col.d[metric]}
                              onClick={() => handleBadgeClick(block, col.key, metric)}
                              ariaLabel={`${blockLabel} ${col.label} ${metric} — ${col.d[metric]}. Click for details.`}
                            />
                          </CellWrapper>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Empty placeholder */}
        {expandedBlocks.length === 0 && (
          <div className="bg-white dark:bg-[#1a1a1a] flex-1 min-h-px min-w-px relative">
            <div aria-hidden="true" className="absolute border border-[#dcdcdc] dark:border-[#505050] border-dashed inset-0 pointer-events-none" />
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
                <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[#888] dark:text-[#666] text-center">
                  Click an AD or BLD block in the diagram above to view its health metrics here
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
