import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {
  DashboardItem, Status, COUNTRIES, CENTERS, COUNTRY_CODES,
  centerCode, getStatus, worstStatus, MONITORING_METRICS, REGIONS,
  COUNTRY_COORDS, CENTER_COORDS, REGION_VIEWPORTS, COUNTRY_VIEWPORTS,
} from "./dashboardData";
import { useDarkMode } from "../contexts/DarkModeContext";
import svgPaths from "../../imports/svg-health-success-icon";
import dangerPaths from "../../imports/svg-danger-indicator-icon";
import warningPaths from "../../imports/svg-warning-indicator-icon";

// Topology block components
import InternetBlock from "../../imports/InternetBlock";
import BackboneBlock from "../../imports/BackboneBlock";
import CustomerNetworkBlock from "../../imports/CustomerNetworkBlock";
import Pop2Block from "../../imports/Pop2Block";
import Pop3Block from "../components/Pop3Block";
import AD1Block from "../components/AD1Block";
import AD2Block from "../components/AD2Block";
import AD3Block from "../components/AD3Block";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ── shared helpers ──────────────────────────────────────────────────────────

const STATUS_BG: Record<Status, string> = {
  healthy:  "#5f7d4f",
  warning:  "#ac630c",
  critical: "#d63b25",
};

const STATUS_BORDER: Record<Status, string> = {
  healthy:  "rgba(80,130,35,0.4)",
  warning:  "rgba(222,128,17,0.4)",
  critical: "rgba(214,59,37,0.4)",
};

// ── Map health label — foreignObject matching realm-view sizing exactly ──────

function MapLabel({ status, code }: { status: Status; code: string }) {
  const bg = STATUS_BG[status];
  const w = 25 + code.length * 6.2;
  const h = 16;

  return (
    <foreignObject x={-w / 2} y={-h / 2} width={w} height={h} style={{ overflow: "visible" }}>
      <div
        className="relative rounded-[3px] flex items-center justify-center"
        style={{ backgroundColor: bg, width: w, height: h }}
      >
        <div className="absolute inset-0 rounded-[3px] pointer-events-none" style={{ border: `1px solid ${bg}` }} />
        <div className="flex items-center justify-center px-[5px] size-full">
          <div className="flex gap-[5px] items-center justify-center shrink-0">
            <div className="relative shrink-0 size-[10px]">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox={status === "healthy" ? "0 0 9 9" : "0 0 10 10"}
              >
                {status === "healthy"  && <path d={svgPaths.p24a580} fill="white" />}
                {status === "critical" && <path d={dangerPaths.p1a4c9d80} fill="white" fillRule="evenodd" clipRule="evenodd" />}
                {status === "warning"  && <path d={warningPaths.pcef2880} fill="white" />}
              </svg>
            </div>
            <p className="font-normal leading-[16px] not-italic text-[10px] text-center text-white whitespace-nowrap">
              {code}
            </p>
          </div>
        </div>
      </div>
    </foreignObject>
  );
}

// ── region map view ─────────────────────────────────────────────────────────

function RegionMapView({ item }: { item: DashboardItem }) {
  const { isDarkMode } = useDarkMode();
  const vp = REGION_VIEWPORTS[item.region];

  return (
    <div className="w-full h-[380px] overflow-hidden bg-[#dde8f0] dark:bg-[#141c24]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: vp.scale * 1.6, center: vp.center }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo}
                fill={isDarkMode ? "#2c3440" : "#c8d8e4"}
                stroke={isDarkMode ? "#3a4a5a" : "#ffffff"} strokeWidth={0.5}
                style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
              />
            ))
          }
        </Geographies>
        {COUNTRIES[item.region].map((country) => {
          const coords = COUNTRY_COORDS[country];
          if (!coords) return null;
          const code = COUNTRY_CODES[country] ?? country.slice(0, 3).toUpperCase();
          const status = getStatus(`${item.region}-${country}-overall`);
          return (
            <Marker key={country} coordinates={coords}>
              <MapLabel status={status} code={code} />
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}

// ── country map view ────────────────────────────────────────────────────────

function CountryMapView({ item }: { item: DashboardItem }) {
  const { isDarkMode } = useDarkMode();
  const country = item.country!;
  const centers = CENTERS[country] ?? [];
  const vp = COUNTRY_VIEWPORTS[country] ?? { center: COUNTRY_COORDS[country] ?? [0, 0], scale: 1000 };

  const cityGroups = new Map<string, { coords: [number, number]; centerNames: string[] }>();
  centers.forEach((name) => {
    const coords = CENTER_COORDS[name];
    if (!coords) return;
    const key = `${coords[0].toFixed(2)},${coords[1].toFixed(2)}`;
    if (!cityGroups.has(key)) cityGroups.set(key, { coords, centerNames: [] });
    cityGroups.get(key)!.centerNames.push(name);
  });

  return (
    <div className="w-full h-[380px] overflow-hidden bg-[#dde8f0] dark:bg-[#141c24]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: vp.scale * 1.6, center: vp.center }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo}
                fill={isDarkMode ? "#2c3440" : "#c8d8e4"}
                stroke={isDarkMode ? "#3a4a5a" : "#ffffff"} strokeWidth={0.5}
                style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
              />
            ))
          }
        </Geographies>
        {Array.from(cityGroups.values()).map(({ coords, centerNames }) =>
          centerNames.map((name, i) => {
            const code = centerCode(name);
            const status = getStatus(`${item.region}-${country}-${name}-overall`);
            const yOffset = (i - (centerNames.length - 1) / 2) * 18;
            return (
              <Marker key={name} coordinates={coords}>
                <g transform={`translate(0, ${yOffset})`}>
                  <MapLabel status={status} code={code} />
                </g>
              </Marker>
            );
          })
        )}
      </ComposableMap>
    </div>
  );
}

// ── topology snapshot for center cards ──────────────────────────────────────
// Renders the actual block components at natural size then CSS-scales to fill
// the card. Same layout algorithm as NetworkDiagram.calculateInitialPositions.

const BLOCK_SIZES = {
  internet:        { w: 166, h: 45 },
  backbone:        { w: 138, h: 45 },
  customerNetwork: { w: 219, h: 44 },
  pop2:            { w: 167, h: 78 },
  pop3:            { w: 167, h: 78 },
  ad1:             { w: 536, h: 245 },
  ad2:             { w: 536, h: 245 },
  ad3:             { w: 536, h: 245 },
};

// Canvas natural dimensions — wide enough to centre both top row and AD row
const CANVAS_W = 1660;
const CANVAS_H = 480;
const cx = CANVAS_W / 2; // 830

// Top row (internet / backbone / customerNetwork) — centred
const TOP_Y = 20;
const topRowW = BLOCK_SIZES.internet.w + 16 + BLOCK_SIZES.backbone.w + 16 + BLOCK_SIZES.customerNetwork.w;
const TOP_X = cx - topRowW / 2;

// Mid row (pop2 / pop3) — centred
const MID_Y = TOP_Y + BLOCK_SIZES.internet.h + 70;
const midRowW = BLOCK_SIZES.pop2.w + 16 + BLOCK_SIZES.pop3.w;
const MID_X = cx - midRowW / 2;

// Bottom row (ad1 / ad2 / ad3) — centred
const BOT_Y = MID_Y + BLOCK_SIZES.pop2.h + 70;
const botRowW = BLOCK_SIZES.ad1.w + 16 + BLOCK_SIZES.ad2.w + 16 + BLOCK_SIZES.ad3.w;
const BOT_X = cx - botRowW / 2;

const POSITIONS = {
  internet:        { x: TOP_X,                                            y: TOP_Y },
  backbone:        { x: TOP_X + BLOCK_SIZES.internet.w + 16,             y: TOP_Y },
  customerNetwork: { x: TOP_X + BLOCK_SIZES.internet.w + 16 + BLOCK_SIZES.backbone.w + 16, y: TOP_Y },
  pop2:            { x: MID_X,                                            y: MID_Y },
  pop3:            { x: MID_X + BLOCK_SIZES.pop2.w + 16,                 y: MID_Y },
  ad1:             { x: BOT_X,                                            y: BOT_Y },
  ad2:             { x: BOT_X + BLOCK_SIZES.ad1.w + 16,                  y: BOT_Y },
  ad3:             { x: BOT_X + BLOCK_SIZES.ad1.w + 16 + BLOCK_SIZES.ad2.w + 16, y: BOT_Y },
};

// Centre point of each block for connection lines
function centre(id: keyof typeof POSITIONS) {
  const p = POSITIONS[id];
  const s = BLOCK_SIZES[id];
  return { x: p.x + s.w / 2, y: p.y + s.h / 2 };
}

// NetworkDiagram connects every block to every other — replicate that
const BLOCK_IDS = ["internet","backbone","customerNetwork","pop2","pop3","ad1","ad2","ad3"] as const;
const CONNECTIONS: [string, string][] = [];
for (let i = 0; i < BLOCK_IDS.length; i++)
  for (let j = i + 1; j < BLOCK_IDS.length; j++)
    CONNECTIONS.push([BLOCK_IDS[i], BLOCK_IDS[j]]);

function TopologySnapshot() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / CANVAS_W);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scaledH = CANVAS_H * scale;

  return (
    <div
      ref={outerRef}
      className="w-full overflow-hidden bg-white dark:bg-[#0f0f0f]"
      style={{ height: scaledH }}
    >
      {/* Natural-size inner canvas, scaled down */}
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          position: "relative",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {/* Connection lines */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: CANVAS_W, height: CANVAS_H, zIndex: 0 }}
        >
          {CONNECTIONS.map(([a, b], i) => {
            const ca = centre(a as keyof typeof POSITIONS);
            const cb = centre(b as keyof typeof POSITIONS);
            return (
              <line key={i}
                x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y}
                className="stroke-[#508223] dark:stroke-[#7fb83e]"
                strokeWidth="1" strokeOpacity="0.5"
              />
            );
          })}
        </svg>

        {/* Blocks */}
        {(Object.entries(POSITIONS) as [keyof typeof POSITIONS, { x: number; y: number }][]).map(([id, pos]) => {
          const s = BLOCK_SIZES[id];
          return (
            <div
              key={id}
              className="absolute overflow-hidden"
              style={{ left: pos.x, top: pos.y, width: s.w, height: s.h, zIndex: 1 }}
            >
              {id === "internet"        && <InternetBlock />}
              {id === "backbone"        && <BackboneBlock />}
              {id === "customerNetwork" && <CustomerNetworkBlock />}
              {id === "pop2"            && <Pop2Block />}
              {id === "pop3"            && <Pop3Block />}
              {id === "ad1"             && <AD1Block isClickable={false} isHovered={false} expandedBlocks={[]} />}
              {id === "ad2"             && <AD2Block isClickable={false} isHovered={false} />}
              {id === "ad3"             && <AD3Block isClickable={false} isHovered={false} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── card header helpers ─────────────────────────────────────────────────────

function getCardLabel(item: DashboardItem): string {
  if (item.type === "region")  return REGIONS.find((r) => r.value === item.region)?.label ?? item.region;
  if (item.type === "country") return `${item.country} · ${item.regionLabel}`;
  return `${item.center} · ${item.country}`;
}

function getOverallStatus(item: DashboardItem): Status {
  if (item.type === "region") {
    return worstStatus(COUNTRIES[item.region].map((c) => getStatus(`${item.region}-${c}-overall`)));
  }
  if (item.type === "country") {
    return worstStatus((CENTERS[item.country!] ?? []).map((c) =>
      getStatus(`${item.region}-${item.country}-${c}-overall`)
    ));
  }
  const seed = `${item.region}-${item.country}-${item.center}`;
  return worstStatus(MONITORING_METRICS.map((m) => getStatus(`${seed}-${m}`)));
}

function OverallBadge({ status }: { status: Status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium shrink-0"
      style={{
        backgroundColor: STATUS_BG[status] + "22",
        border: `1px solid ${STATUS_BORDER[status]}`,
        color: STATUS_BG[status],
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: STATUS_BG[status] }} />
      {label}
    </div>
  );
}

// ── card ────────────────────────────────────────────────────────────────────

type MonitoringCardProps = {
  item: DashboardItem;
  onRemove: () => void;
};

export function MonitoringCard({ item, onRemove }: MonitoringCardProps) {
  const overall = getOverallStatus(item);
  const viewUrl = item.type === "center" ? `/region/${item.region}` : "/";

  return (
    <div className="border border-[#d8d8d8] dark:border-[#333] rounded-lg overflow-hidden bg-white dark:bg-[#141414] w-full">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#ebebeb] dark:border-[#2a2a2a] bg-[#f8f8f8] dark:bg-[#1c1c1c]">
        <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
          <span className="text-[13px] font-semibold text-[#222] dark:text-white truncate">
            {getCardLabel(item)}
          </span>
          <OverallBadge status={overall} />
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <Link to={viewUrl} className="text-[12px] text-[#227e9e] dark:text-[#5ba8d0] hover:underline">
            View
          </Link>
          <button
            onClick={onRemove}
            className="text-[12px] text-[#888] dark:text-[#666] hover:text-[#444] dark:hover:text-[#aaa] transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Card body */}
      {item.type === "region"  && <RegionMapView  item={item} />}
      {item.type === "country" && <CountryMapView item={item} />}
      {item.type === "center"  && <TopologySnapshot />}
    </div>
  );
}
