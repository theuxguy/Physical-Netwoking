import { useState, useEffect, useMemo, useRef } from "react";
import { useTimeRange } from "../contexts/TimeRangeContext";
import { motion } from "motion/react";

const MARGIN_LEFT = 35;
const MARGIN_RIGHT = 5;
const BAR_WIDTH = 6;
const WINDOW_WIDTH = 20;

function computeLastBarPosition(numBars: number, totalWidth: number): number {
  const plotWidth = totalWidth - MARGIN_LEFT - MARGIN_RIGHT;
  // Align window right edge with last bar right edge:
  // marginLeft + pos*plotWidth + windowWidth/2 = marginLeft + ((n-1)/n)*plotWidth + barWidth
  return ((numBars - 1) / numBars) + (BAR_WIDTH - WINDOW_WIDTH / 2) / plotWidth;
}

const BLUE_ORANGE_GAP_PX = 100;

function computeBlueDefaultPosition(numBars: number, totalWidth: number): number {
  const plotWidth = totalWidth - MARGIN_LEFT - MARGIN_RIGHT;
  return computeLastBarPosition(numBars, totalWidth) - BLUE_ORANGE_GAP_PX / plotWidth;
}

type IncidentData = {
  date: string;
  healthy: number;
  warning: number;
  critical: number;
  timestamp: number;
  id: string;
};

// Global counter to ensure unique IDs
let globalIdCounter = 0;

// Generate random incident counts
function generateRandomIncident(date: Date): IncidentData {
  const healthy = Math.floor(Math.random() * 12) + 3;
  const warning = Math.floor(Math.random() * 10) + 2;
  const critical = Math.floor(Math.random() * 8) + 2;
  
  return {
    date: formatDate(date),
    healthy,
    warning,
    critical,
    timestamp: date.getTime(),
    id: `bar-${globalIdCounter++}`,
  };
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}

// Generate initial data based on time range
function generateInitialData(startDate: Date, endDate: Date): IncidentData[] {
  const data: IncidentData[] = [];
  const hoursDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
  
  // Calculate max bars that fit with 6px width + 1px gap = 7px per bar
  // Assuming typical container width around 1200px with 40px margins
  const maxBarsToFit = Math.floor((1200 - 40) / 7); // ~165 bars
  const totalBars = Math.min(hoursDiff + 1, maxBarsToFit);
  
  const current = new Date(startDate);
  const hourIncrement = Math.max(1, Math.floor(hoursDiff / totalBars));
  
  for (let i = 0; i < totalBars; i++) {
    data.push(generateRandomIncident(new Date(current)));
    current.setHours(current.getHours() + hourIncrement);
  }
  
  return data;
}

function formatTooltipTimestamp(date: Date): string {
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month} ${day}, ${year}  ${hours}:${minutes} UTC`;
}

export function IncidentChart() {
  const { startDate, endDate, setTimeRange, isLoading, setIsLoading, setHasMovedWindow, showComparison, setCurrentWindowDate, setComparisonWindowDate } = useTimeRange();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [windowPosition, setWindowPosition] = useState(() => computeLastBarPosition(165, 1200));
  const initialPositionSet = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [orangePosition, setOrangePosition] = useState(() => computeBlueDefaultPosition(165, 1200));
  const [isOrangeDragging, setIsOrangeDragging] = useState(false);
  const [isPollingActive, setIsPollingActive] = useState(true);
  const windowWidth = WINDOW_WIDTH;
  
  const [data, setData] = useState<IncidentData[]>(() => 
    generateInitialData(startDate, endDate)
  );

  // Measure container width and set initial window position once
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setContainerWidth(w);
        if (!initialPositionSet.current) {
          initialPositionSet.current = true;
          const bluePos = computeLastBarPosition(data.length, w);
          const orangePos = computeBlueDefaultPosition(data.length, w);
          setWindowPosition(bluePos);
          setOrangePosition(orangePos);
        }
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Recalculate data when time range changes
  useEffect(() => {
    setData(generateInitialData(startDate, endDate));
  }, [startDate, endDate]);

  // Update data every 5 seconds
  useEffect(() => {
    if (!isPollingActive) return;

    const interval = setInterval(() => {
      setData(prevData => {
        if (prevData.length === 0) return prevData;
        
        const lastTimestamp = prevData[prevData.length - 1].timestamp;
        const nextDate = new Date(lastTimestamp + 24 * 60 * 60 * 1000);
        const newIncident = generateRandomIncident(nextDate);
        
        return [...prevData.slice(1), newIncident];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPollingActive]);

  // Handle window dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const plotWidth = rect.width - MARGIN_LEFT - MARGIN_RIGHT;
        
        // Calculate position relative to plot area
        const x = e.clientX - rect.left - MARGIN_LEFT;
        const position = Math.max(0, Math.min(1, x / plotWidth));
        
        setWindowPosition(position);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Stop polling when user interacts with the window
      setIsPollingActive(false);
      
      // Show loading spinner
      setIsLoading(true);
      
      // Calculate new time range based on window position
      const totalDuration = endDate.getTime() - startDate.getTime();
      const windowDuration = 7 * 24 * 60 * 60 * 1000; // 7 days window
      
      // Calculate center of window
      const windowCenter = startDate.getTime() + (windowPosition * totalDuration);
      
      // Create new range centered on window position
      const newStartDate = new Date(windowCenter - (windowDuration / 2));
      const newEndDate = new Date(windowCenter + (windowDuration / 2));
      
      // Wait 0.5 seconds before updating data
      setTimeout(() => {
        // Update the time range context
        setTimeRange(newStartDate, newEndDate);
        setIsLoading(false);
        setHasMovedWindow(true);
        setCurrentWindowDate(new Date(windowCenter));
      }, 500);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, windowPosition, startDate, endDate, setTimeRange, setIsLoading, setHasMovedWindow, setCurrentWindowDate]);

  // Handle orange window dragging
  const handleOrangeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOrangeDragging(true);
  };

  useEffect(() => {
    if (!isOrangeDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const plotWidth = rect.width - MARGIN_LEFT - MARGIN_RIGHT;
        const x = e.clientX - rect.left - MARGIN_LEFT;
        const position = Math.max(0, Math.min(1, x / plotWidth));
        setOrangePosition(position);
      }
    };

    const handleMouseUp = () => {
      setIsOrangeDragging(false);

      const totalDuration = endDate.getTime() - startDate.getTime();
      const windowCenter = startDate.getTime() + (orangePosition * totalDuration);
      setComparisonWindowDate(new Date(windowCenter));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOrangeDragging, orangePosition, startDate, endDate, setComparisonWindowDate]);

  // Custom SVG chart rendering
  const renderChart = useMemo(() => {
    const chartWidth = containerWidth;
    const chartHeight = 120;
    const marginLeft = MARGIN_LEFT;
    const marginRight = MARGIN_RIGHT;
    const marginTop = 5;
    const marginBottom = 15;

    const plotWidth = chartWidth - marginLeft - marginRight;
    const plotHeight = chartHeight - marginTop - marginBottom;

    const barWidth = BAR_WIDTH;
    const barGap = 1;
    
    const yMax = 40;
    const yTicks = [0, 10, 20, 30, 40];
    
    const numBars = data.length;
    
    return (
      <svg width={chartWidth} height={chartHeight} className="w-full h-full" style={{ display: 'block' }}>
        {/* Y-axis */}
        <line
          x1={marginLeft}
          y1={marginTop}
          x2={marginLeft}
          y2={chartHeight - marginBottom}
          className="stroke-[#d5d5d5] dark:stroke-[#404040]"
          strokeWidth="1"
        />
        
        {/* Y-axis ticks and labels */}
        {yTicks.map((tick) => {
          const y = chartHeight - marginBottom - (tick / yMax) * plotHeight;
          return (
            <g key={`ytick-${tick}`}>
              <text
                x={marginLeft - 5}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="8"
                className="fill-[#161513] dark:fill-white"
              >
                {tick}
              </text>
              <line
                x1={marginLeft}
                y1={y}
                x2={marginLeft + plotWidth}
                y2={y}
                className="stroke-[#f0f0f0] dark:stroke-[#2a2a2a]"
                strokeWidth="1"
              />
            </g>
          );
        })}
        
        {/* X-axis */}
        <line
          x1={marginLeft}
          y1={chartHeight - marginBottom}
          x2={chartWidth - marginRight}
          y2={chartHeight - marginBottom}
          className="stroke-[#d5d5d5] dark:stroke-[#404040]"
          strokeWidth="1"
        />
        
        {/* Bars */}
        {data.map((d, index) => {
          const x = marginLeft + (index / numBars) * plotWidth;
          
          // Calculate heights (proportional to yMax)
          const criticalHeight = (d.critical / yMax) * plotHeight;
          const warningHeight = (d.warning / yMax) * plotHeight;
          const healthyHeight = (d.healthy / yMax) * plotHeight;
          
          // Y positions (from bottom up)
          const baseY = chartHeight - marginBottom;
          const criticalY = baseY - criticalHeight;
          const warningY = criticalY - warningHeight;
          const healthyY = warningY - healthyHeight;
          
          return (
            <g key={d.id}>
              {/* Critical (red) - bottom segment - rises first */}
              {d.critical > 0 && (
                <motion.rect
                  x={x}
                  width={barWidth}
                  fill="#d63b25"
                  initial={{ y: baseY, height: 0 }}
                  animate={{ y: criticalY, height: criticalHeight }}
                  transition={{
                    duration: 0.167,
                    delay: 0,
                    ease: "easeOut"
                  }}
                />
              )}
              
              {/* Warning (amber) - middle segment - rises second */}
              {d.warning > 0 && (
                <motion.rect
                  x={x}
                  width={barWidth}
                  fill="#de8011"
                  initial={{ y: criticalY, height: 0 }}
                  animate={{ y: warningY, height: warningHeight }}
                  transition={{
                    duration: 0.167,
                    delay: 0.167,
                    ease: "easeOut"
                  }}
                />
              )}
              
              {/* Healthy (green) - top segment - rises third */}
              {d.healthy > 0 && (
                <motion.rect
                  x={x}
                  width={barWidth}
                  fill="#508223"
                  initial={{ y: warningY, height: 0 }}
                  animate={{ y: healthyY, height: healthyHeight }}
                  transition={{
                    duration: 0.167,
                    delay: 0.334,
                    ease: "easeOut"
                  }}
                />
              )}
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {data.map((d, index) => {
          const showLabel = index % Math.floor(data.length / 12) === 0;
          if (!showLabel) return null;
          
          const x = marginLeft + (index / numBars) * plotWidth;
          return (
            <text
              key={`xlabel-${d.id}`}
              x={x}
              y={chartHeight - marginBottom + 10}
              textAnchor="middle"
              fontSize="8"
              className="fill-[#161513] dark:fill-white"
            >
              {d.date}
            </text>
          );
        })}
        
        {/* Window */}
        <rect
          x={marginLeft + (windowPosition * plotWidth) - (windowWidth / 2)}
          y={marginTop}
          width={windowWidth}
          height={plotHeight}
          fill="transparent"
          stroke="#227e9e"
          strokeWidth="2"
          rx="5"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
        />
        
        {/* Orange window - draggable when comparison is active */}
        {showComparison && (
          <rect
            x={marginLeft + (orangePosition * plotWidth) - (windowWidth / 2)}
            y={marginTop}
            width={windowWidth}
            height={plotHeight}
            fill="transparent"
            stroke="#de8011"
            strokeWidth="2"
            rx="5"
            style={{ cursor: isOrangeDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleOrangeMouseDown}
          />
        )}
      </svg>
    );
  }, [data, containerWidth, windowPosition, isDragging, orangePosition, isOrangeDragging, showComparison, handleOrangeMouseDown]);

  // Live timestamps from current window positions (update during drag)
  const totalDuration = endDate.getTime() - startDate.getTime();
  const plotWidth = containerWidth - MARGIN_LEFT - MARGIN_RIGHT;
  const blueTimestamp = formatTooltipTimestamp(new Date(startDate.getTime() + windowPosition * totalDuration));
  const orangeTimestamp = formatTooltipTimestamp(new Date(startDate.getTime() + orangePosition * totalDuration));

  // Pixel x-centre of each window within the chart container (accounting for left margin)
  const blueXPct   = ((MARGIN_LEFT + windowPosition * plotWidth) / containerWidth) * 100;
  const orangeXPct = ((MARGIN_LEFT + orangePosition * plotWidth) / containerWidth) * 100;

  return (
    <div className="px-6 pt-4">
      <div className="relative bg-[rgba(34,126,158,0.05)] dark:bg-[rgba(34,126,158,0.1)] border border-[#b6b2ad] dark:border-[#404040] rounded-lg h-[140px] p-[16px] mx-[0px] mt-[0px] mb-[32px]">
        {/* Y-axis label */}
        <div className="absolute left-2 top-2 text-[11px] text-[#161513] dark:text-white">
          Incident count (in thousands)
        </div>

        {/* Blue window timestamp tooltip */}
        {isDragging && (
          <div
            className="absolute z-20 -translate-x-1/2 pointer-events-none"
            style={{ left: `${blueXPct}%`, top: 2 }}
          >
            <div className="bg-[#227e9e] text-white text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap shadow">
              {blueTimestamp}
            </div>
          </div>
        )}

        {/* Orange window timestamp tooltip */}
        {isOrangeDragging && (
          <div
            className="absolute z-20 -translate-x-1/2 pointer-events-none"
            style={{ left: `${orangeXPct}%`, top: 2 }}
          >
            <div className="bg-[#de8011] text-white text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap shadow">
              {orangeTimestamp}
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="h-full w-full flex items-end">
          <div ref={containerRef} className="w-full h-[120px]">
            {renderChart}
          </div>
        </div>
      </div>
    </div>
  );
}