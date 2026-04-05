import { useMemo } from "react";
import { useTimeRange } from "../contexts/TimeRangeContext";
import { useHoveredConnection } from "../contexts/HoveredConnectionContext";
import svgPaths from "../../imports/svg-sort-icon";

// Major airport codes for the matrix - must match airports in WorldMap
const airportCodes = [
  "JFK", "LAX", "ORD", "DFW", "DEN", "SFO", "SEA", "MIA",
  "LHR", "CDG", "FRA", "AMS", "MAD", "FCO", "IST",
  "DXB", "DOH",
  "SIN", "HKG", "NRT", "ICN", "PEK", "PVG", "BKK",
  "SYD", "MEL",
  "GRU", "GIG", "MEX",
  "YYZ", "YVR",
  "JNB", "CAI",
  "DEL", "BOM"
];

// Seeded random number generator for consistent randomization
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate random status based on seed
const getRandomStatus = (seed: number): string => {
  const rand = seededRandom(seed);
  if (rand < 0.6) return "healthy";  // 60% healthy
  if (rand < 0.85) return "warning"; // 25% warning
  return "danger";                    // 15% danger
};

// Generate latency based on status
const getLatency = (status: string, seed: number): number => {
  const rand = seededRandom(seed + 1000);
  if (status === "healthy") return Math.floor(rand * 30) + 20; // 20-49ms
  if (status === "warning") return Math.floor(rand * 80) + 100; // 100-179ms
  return Math.floor(rand * 50) + 150; // 150-199ms for danger
};

// Generate packet loss based on status
const getPacketLoss = (status: string, seed: number): number => {
  const rand = seededRandom(seed + 2000);
  if (status === "healthy") return parseFloat((rand * 0.5 + 26).toFixed(1)); // 26.0-26.5%
  if (status === "warning") return parseFloat((rand * 10 + 120).toFixed(1)); // 120-130%
  return parseFloat((rand * 30 + 170).toFixed(1)); // 170-200%
};

type MatrixCellProps = {
  fromCode: string;
  toCode: string;
  seed: number;
  fromIndex: number;
  toIndex: number;
};

function MatrixCell({ fromCode, toCode, seed, fromIndex, toIndex }: MatrixCellProps) {
  const { hoveredConnection } = useHoveredConnection();
  
  // Generate connection data
  const connectionData = useMemo(() => {
    // Only show upper triangle (where column index > row index)
    // This removes redundancy since connection A->B is same as B->A
    if (fromIndex >= toIndex) {
      return null;
    }
    
    // Create a symmetric seed for this connection pair
    // Sort the codes alphabetically so A->B and B->A get the same seed
    const [code1, code2] = [fromCode, toCode].sort();
    const pairSeed = seed + code1.charCodeAt(0) * 1000 + code2.charCodeAt(0);
    const status = getRandomStatus(pairSeed);
    const latency = getLatency(status, pairSeed);
    const packetLoss = getPacketLoss(status, pairSeed);
    
    return { status, latency, packetLoss };
  }, [fromCode, toCode, seed, fromIndex, toIndex]);
  
  // Check if this cell is highlighted
  const isHighlighted = hoveredConnection && 
    ((hoveredConnection.from === fromCode && hoveredConnection.to === toCode) ||
     (hoveredConnection.from === toCode && hoveredConnection.to === fromCode));

  if (!connectionData) {
    // Empty cell for diagonal and lower triangle
    return (
      <div className="h-[41px] relative shrink-0 w-full bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(0,0,0,0.2)]">
        <div className="flex flex-row items-center justify-end size-full">
          <div className="size-full" />
        </div>
      </div>
    );
  }

  const bgColor = isHighlighted ? 
    (connectionData.status === "healthy" ? "rgba(95,165,45,0.7)" :
     connectionData.status === "warning" ? "rgba(255,165,50,0.7)" :
     "rgba(255,90,60,0.7)") :
    (connectionData.status === "healthy" ? "rgba(80,130,35,0.25)" :
     connectionData.status === "warning" ? "rgba(222,128,17,0.25)" :
     "rgba(214,59,37,0.25)");

  return (
    <div className={`h-[41px] relative shrink-0 w-full ${isHighlighted ? 'ring-2 ring-blue-500 ring-inset' : ''}`} style={{ backgroundColor: bgColor }}>
      <div className="flex flex-row items-center justify-end size-full">
        <div className="flex items-center justify-center p-3 relative size-full bg-[#f4f0f000]">
          <div className="font-['Helvetica_Neue:Regular',sans-serif] leading-[0] not-italic relative w-full text-[#222] dark:text-[#E4E4E4] text-[0px] text-center">
            <p className="font-['Helvetica_Neue:Medium',sans-serif] leading-[normal] mb-0 text-[12px]">
              {connectionData.latency}.1 m/s
            </p>
            <p className="text-[11px] leading-[normal]">
              {connectionData.packetLoss} %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BackboneMatrix() {
  const { endDate } = useTimeRange();
  const seed = useMemo(() => endDate.getTime(), [endDate]);

  return (
    <div className="px-6 pb-6">
      <div className="bg-white dark:bg-[#1a1a1a] content-stretch flex items-start relative shrink-0 w-full border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-hidden h-[300px]">
        <div className="content-stretch flex items-start relative size-full overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-[#1a1a1a] [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded">
          {/* Region label column */}
          <div className="content-stretch flex items-start relative shrink-0 w-[145px]">
            <div aria-hidden="true" className="absolute border-[#b9b9b9] dark:border-[#404040] border-b border-l border-solid border-t inset-[-1px_0_-1px_-1px] pointer-events-none" />
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
              {/* Header */}
              <div className="bg-[#eee] dark:bg-[#252525] relative shrink-0 w-full">
                <div className="flex flex-row items-center justify-center size-full">
                  <div className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative w-full">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">Region</p>
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
              
              {/* Region rows */}
              {airportCodes.map((code) => (
                <div key={code} className="bg-[#eee] dark:bg-[#252525] relative shrink-0 w-full h-[41px]">
                  <div className="flex flex-row items-center justify-center size-full">
                    <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
                      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#00688c] dark:text-[#4da6c7] text-[14px] underline whitespace-nowrap">
                        {code}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data columns - one for each destination airport */}
          {airportCodes.map((toCode, toIndex) => (
            <div key={toCode} className="content-stretch flex flex-col items-start min-w-[110px] relative">
              <div aria-hidden="true" className="absolute border-[#b9b9b9] dark:border-[#404040] border-b border-solid border-t inset-[-1px_0] pointer-events-none" />
              
              {/* Column header */}
              <div className="bg-[#eee] dark:bg-[#252525] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 w-full">
                <div className="relative shrink-0 size-[16px]">
                  <div className="absolute inset-[8.33%_3.99%_9.92%_3.97%]" data-name="vector">
                    
                  </div>
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-black dark:text-white whitespace-nowrap">{toCode}</p>
              </div>
              
              {/* Data cells for each source airport */}
              {airportCodes.map((fromCode, fromIndex) => (
                <MatrixCell key={`${fromCode}-${toCode}`} fromCode={fromCode} toCode={toCode} seed={seed} fromIndex={fromIndex} toIndex={toIndex} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}