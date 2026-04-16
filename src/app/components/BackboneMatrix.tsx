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

const getRandomStatus = (seed: number): string => {
  const rand = seededRandom(seed);
  if (rand < 0.6) return "healthy";
  if (rand < 0.85) return "warning";
  return "danger";
};

const getLatency = (status: string, seed: number): number => {
  const rand = seededRandom(seed + 1000);
  if (status === "healthy") return Math.floor(rand * 30) + 20;
  if (status === "warning") return Math.floor(rand * 80) + 100;
  return Math.floor(rand * 50) + 150;
};

const getPacketLoss = (status: string, seed: number): number => {
  const rand = seededRandom(seed + 2000);
  if (status === "healthy") return parseFloat((rand * 0.5 + 26).toFixed(1));
  if (status === "warning") return parseFloat((rand * 10 + 120).toFixed(1));
  return parseFloat((rand * 30 + 170).toFixed(1));
};

type MatrixCellProps = {
  fromCode: string;
  toCode: string;
  seed: number;
  fromIndex: number;
  toIndex: number;
};

function MatrixCell({ fromCode, toCode, seed, fromIndex, toIndex }: MatrixCellProps) {
  const { hoveredConnection, setHoveredConnection } = useHoveredConnection();

  const connectionData = useMemo(() => {
    if (fromIndex >= toIndex) return null;
    const [code1, code2] = [fromCode, toCode].sort();
    const pairSeed = seed + code1.charCodeAt(0) * 1000 + code2.charCodeAt(0);
    const status = getRandomStatus(pairSeed);
    const latency = getLatency(status, pairSeed);
    const packetLoss = getPacketLoss(status, pairSeed);
    return { status, latency, packetLoss };
  }, [fromCode, toCode, seed, fromIndex, toIndex]);

  const isHighlighted = hoveredConnection &&
    ((hoveredConnection.from === fromCode && hoveredConnection.to === toCode) ||
     (hoveredConnection.from === toCode && hoveredConnection.to === fromCode));

  if (!connectionData) {
    return (
      <div className="h-[41px] relative shrink-0 w-full" />
    );
  }

  const bgColor = isHighlighted
    ? (connectionData.status === "healthy" ? "rgba(95,165,45,0.7)" :
       connectionData.status === "warning" ? "rgba(255,165,50,0.7)" :
       "rgba(255,90,60,0.7)")
    : (connectionData.status === "healthy" ? "rgba(80,130,35,0.25)" :
       connectionData.status === "warning" ? "rgba(222,128,17,0.25)" :
       "rgba(214,59,37,0.25)");

  return (
    <div
      className={`h-[41px] relative shrink-0 w-full cursor-default ${isHighlighted ? "ring-2 ring-blue-500 ring-inset" : ""}`}
      style={{ backgroundColor: bgColor }}
      onMouseEnter={() => setHoveredConnection({ from: fromCode, to: toCode })}
      onMouseLeave={() => setHoveredConnection(null)}
    >
      <div className="flex items-center justify-center p-3 size-full">
        <div className="leading-[0] not-italic w-full text-[#222] dark:text-[#E4E4E4] text-center">
          <p className="font-medium leading-[normal] mb-0 text-[12px]">{connectionData.latency}.1 m/s</p>
          <p className="text-[11px] leading-[normal]">{connectionData.packetLoss} %</p>
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
      <div className="bg-white dark:bg-[#1a1a1a] relative shrink-0 w-full border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-hidden h-[300px]">
        {/* Scrollable area */}
        <div className="size-full overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-[#1a1a1a] [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded">
          <table className="border-collapse [&_td]:border-0 [&_th]:border-0" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                {/* Sticky top-left corner: Region label */}
                <th
                  className="bg-[#eee] dark:bg-[#252525] text-left p-[10px] w-[145px] min-w-[145px]"
                  style={{ position: "sticky", top: 0, left: 0, zIndex: 30 }}
                >
                  <div className="flex items-center gap-[10px]">
                    <span className="font-normal text-[14px] text-black dark:text-white whitespace-nowrap">Region</span>
                    <div className="relative shrink-0 size-[16px]">
                      <div className="absolute inset-[16.67%]">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                          <path d={svgPaths.p33861080} className="fill-[#665F5B] dark:fill-[#a0a0a0]" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </th>

                {/* Sticky column headers */}
                {airportCodes.map((toCode) => (
                  <th
                    key={toCode}
                    className="bg-[#eee] dark:bg-[#252525] font-normal text-[14px] text-black dark:text-white p-[10px] min-w-[110px] w-[110px] whitespace-nowrap"
                    style={{ position: "sticky", top: 0, zIndex: 20 }}
                  >
                    {toCode}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {airportCodes.map((fromCode, fromIndex) => (
                <tr key={fromCode}>
                  {/* Sticky row label */}
                  <td
                    className="bg-[#eee] dark:bg-[#252525] p-[10px] h-[41px] w-[145px] min-w-[145px]"
                    style={{ position: "sticky", left: 0, zIndex: 10 }}
                  >
                    <span className="font-normal text-[#00688c] dark:text-[#4da6c7] text-[14px] underline whitespace-nowrap">
                      {fromCode}
                    </span>
                  </td>

                  {/* Data cells */}
                  {airportCodes.map((toCode, toIndex) => (
                    <td key={`${fromCode}-${toCode}`} className="p-0 h-[41px] min-w-[110px] w-[110px]">
                      <MatrixCell
                        fromCode={fromCode}
                        toCode={toCode}
                        seed={seed}
                        fromIndex={fromIndex}
                        toIndex={toIndex}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
