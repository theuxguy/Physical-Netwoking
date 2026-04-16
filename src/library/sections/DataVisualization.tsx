import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------
const INCIDENT_DATA = [
  { time: "00:00", critical: 2, warning: 4, healthy: 28 },
  { time: "04:00", critical: 1, warning: 3, healthy: 30 },
  { time: "08:00", critical: 4, warning: 6, healthy: 24 },
  { time: "12:00", critical: 3, warning: 5, healthy: 26 },
  { time: "16:00", critical: 5, warning: 7, healthy: 22 },
  { time: "20:00", critical: 2, warning: 4, healthy: 28 },
  { time: "24:00", critical: 1, warning: 2, healthy: 31 },
];

const AVAILABILITY_DATA = [
  { region: "IAD", availability: 99.97, performance: 98.2, reliability: 99.1 },
  { region: "LHR", availability: 98.4,  performance: 96.8, reliability: 97.5 },
  { region: "FRA", availability: 99.8,  performance: 99.1, reliability: 99.5 },
  { region: "NRT", availability: 97.2,  performance: 94.3, reliability: 96.1 },
  { region: "SIN", availability: 99.1,  performance: 97.6, reliability: 98.3 },
  { region: "SYD", availability: 96.5,  performance: 93.2, reliability: 95.8 },
];

const TIMELINE_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  latency: 40 + Math.sin(i * 0.5) * 15 + (i % 3) * 3,
  throughput: 850 + Math.cos(i * 0.4) * 120 + (i % 5) * 20,
}));

const TOOLTIP_STYLE = {
  backgroundColor: "var(--color-card, #ffffff)",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "8px",
  fontSize: "12px",
};

// ---------------------------------------------------------------------------
// MiniSvgChart — simplified incident timeline (custom SVG, no Recharts)
// ---------------------------------------------------------------------------
const SVG_DATA = [
  { c: 3, w: 5, h: 8 }, { c: 1, w: 3, h: 12 }, { c: 5, w: 7, h: 6 },
  { c: 2, w: 4, h: 10 }, { c: 4, w: 6, h: 7 }, { c: 0, w: 2, h: 14 },
  { c: 3, w: 5, h: 9 }, { c: 6, w: 4, h: 5 }, { c: 2, w: 3, h: 11 },
  { c: 1, w: 6, h: 10 }, { c: 4, w: 2, h: 8 }, { c: 3, w: 5, h: 9 },
  { c: 5, w: 3, h: 7 }, { c: 0, w: 4, h: 15 }, { c: 2, w: 6, h: 9 },
  { c: 3, w: 2, h: 11 }, { c: 4, w: 5, h: 8 }, { c: 1, w: 3, h: 13 },
];

function MiniSvgChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [winPos, setWinPos] = useState(0.82);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, pos: 0 });

  useEffect(() => {
    const ro = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const mL = 32, mR = 8, mT = 8, mB = 20;
  const chartH = 110;
  const plotW = width - mL - mR;
  const plotH = chartH - mT - mB;
  const yMax = 25;
  const barW = Math.max(4, plotW / SVG_DATA.length - 2);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, pos: winPos };
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStart.current.x;
      setWinPos(Math.max(0.05, Math.min(0.95, dragStart.current.pos + dx / plotW)));
    };
    const onUp = () => { setDragging(false); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [winPos, plotW]);

  return (
    <div ref={containerRef} className="w-full bg-[rgba(34,126,158,0.05)] dark:bg-[rgba(34,126,158,0.1)] border border-[#b6b2ad] dark:border-[#404040] rounded-lg p-4">
      <p className="text-[11px] text-[#161513] dark:text-white mb-1">Incident count</p>
      <svg width="100%" height={chartH} style={{ display: "block" }}>
        {/* Y-axis */}
        <line x1={mL} y1={mT} x2={mL} y2={chartH - mB} stroke="#d5d5d5" strokeWidth={1} />
        {[0, 10, 20].map(tick => {
          const y = chartH - mB - (tick / yMax) * plotH;
          return (
            <g key={tick}>
              <text x={mL - 4} y={y} textAnchor="end" dominantBaseline="middle" fontSize="8" fill="#888">{tick}</text>
              <line x1={mL} y1={y} x2={mL + plotW} y2={y} stroke="#f0f0f0" strokeWidth={1} />
            </g>
          );
        })}
        {/* X-axis */}
        <line x1={mL} y1={chartH - mB} x2={mL + plotW} y2={chartH - mB} stroke="#d5d5d5" strokeWidth={1} />
        {/* Bars */}
        {SVG_DATA.map((d, i) => {
          const x = mL + (i / SVG_DATA.length) * plotW;
          const base = chartH - mB;
          const cH = (d.c / yMax) * plotH;
          const wH = (d.w / yMax) * plotH;
          const hH = (d.h / yMax) * plotH;
          return (
            <g key={i}>
              {d.c > 0 && <motion.rect x={x} width={barW} fill="#d63b25" initial={{ y: base, height: 0 }} animate={{ y: base - cH, height: cH }} transition={{ duration: 0.2, ease: "easeOut" }} />}
              {d.w > 0 && <motion.rect x={x} width={barW} fill="#de8011" initial={{ y: base - cH, height: 0 }} animate={{ y: base - cH - wH, height: wH }} transition={{ duration: 0.2, delay: 0.15, ease: "easeOut" }} />}
              {d.h > 0 && <motion.rect x={x} width={barW} fill="#508223" initial={{ y: base - cH - wH, height: 0 }} animate={{ y: base - cH - wH - hH, height: hH }} transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }} />}
            </g>
          );
        })}
        {/* Draggable time window */}
        <rect
          x={mL + winPos * plotW - 12} y={mT} width={24} height={plotH}
          fill="rgba(34,126,158,0.08)" stroke="#227e9e" strokeWidth="2" rx="4"
          style={{ cursor: dragging ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
        />
      </svg>
      <p className="text-[10px] text-slate-400 mt-1 text-center">Drag the blue window to move the time selection</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MiniAnimatedBars — simplified IssuesChart pattern
// ---------------------------------------------------------------------------
const ISSUES_DATA = [
  { label: "JFP", critical: 18, warning: 12 },
  { label: "FFP", critical: 8,  warning: 20 },
  { label: "TFP", critical: 22, warning: 5  },
  { label: "JFA", critical: 5,  warning: 16 },
  { label: "JFS", critical: 14, warning: 9  },
  { label: "TFA", critical: 0,  warning: 14 },
  { label: "CFR", critical: 19, warning: 7  },
];

function MiniAnimatedBars() {
  const [hovered, setHovered] = useState<{ label: string; type: string; count: number } | null>(null);
  const maxVal = 30;
  const chartH = 100;

  return (
    <div className="w-full space-y-3">
      {/* Insight text */}
      <p className="text-[12px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded p-2">
        {hovered ? (
          <><span className="text-slate-900 dark:text-white font-medium">{hovered.label} Performance</span> has{" "}
            <span className={hovered.type === "critical" ? "text-[#d63b25]" : "text-[#9a5800]"}>
              {hovered.count} {hovered.type}
            </span> issues.</>
        ) : (
          <span className="text-slate-400">Hover a bar for insight</span>
        )}
      </p>
      {/* Chart */}
      <div className="flex gap-4">
        <div className="flex flex-col justify-between items-end text-[10px] text-[#665f5b] dark:text-[#999]" style={{ height: chartH }}>
          {[30, 20, 10, 0].map(v => <span key={v}>{v}</span>)}
        </div>
        <div className="flex-1 relative border-l border-b border-[#b9b9b9] dark:border-[#505050]">
          <div className="flex justify-around items-end" style={{ height: chartH }}>
            {ISSUES_DATA.map((d, i) => (
              <div key={i} className="flex flex-col items-center justify-end">
                <div className="flex flex-col w-8">
                  {d.warning > 0 && (
                    <motion.div
                      className="bg-[#de8011] dark:bg-[#ff981e] w-full rounded-t-[3px] origin-bottom border border-black/10"
                      style={{ height: (d.warning / maxVal) * chartH }}
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ duration: 0.25, delay: 0.25 + i * 0.04 }}
                      onMouseEnter={() => setHovered({ label: d.label, type: "warning", count: d.warning })}
                      onMouseLeave={() => setHovered(null)}
                    />
                  )}
                  {d.critical > 0 && (
                    <motion.div
                      className="bg-[#d63b25] dark:bg-[#e85540] w-full rounded-b-[3px] origin-bottom border border-black/10"
                      style={{ height: (d.critical / maxVal) * chartH }}
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      onMouseEnter={() => setHovered({ label: d.label, type: "critical", count: d.critical })}
                      onMouseLeave={() => setHovered(null)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-around pl-8">
        {ISSUES_DATA.map(d => (
          <span key={d.label} className="text-[10px] text-[#665f5b] dark:text-[#999] w-8 text-center">{d.label}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 justify-center">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500"><span className="w-3 h-3 rounded-sm bg-[#d63b25] inline-block" />Critical</span>
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500"><span className="w-3 h-3 rounded-sm bg-[#de8011] inline-block" />Warning</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MiniMatrix — simplified BackboneMatrix
// ---------------------------------------------------------------------------
const MATRIX_CODES = ["JFK", "LHR", "DXB", "SIN", "NRT"];

function seededRand(s: number) { return (Math.sin(s) * 10000) % 1; }
function matrixStatus(i: number, j: number) {
  const r = Math.abs(seededRand(i * 37 + j * 13));
  return r < 0.6 ? "healthy" : r < 0.85 ? "warning" : "danger";
}

const STATUS_BG: Record<string, string> = {
  healthy: "rgba(80,130,35,0.25)",
  warning: "rgba(222,128,17,0.25)",
  danger:  "rgba(214,59,37,0.25)",
};
const STATUS_LATENCY: Record<string, string> = { healthy: "28ms", warning: "142ms", danger: "178ms" };

function MiniMatrix() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-hidden">
      <div className="overflow-auto">
        <div className="flex min-w-max">
          {/* Label column */}
          <div className="shrink-0 w-[90px]">
            <div className="h-[36px] bg-[#eee] dark:bg-[#252525] flex items-center justify-center border-b border-r border-[#d8d8d8] dark:border-[#404040]">
              <span className="text-[12px] text-slate-600 dark:text-slate-400">Region</span>
            </div>
            {MATRIX_CODES.map(code => (
              <div key={code} className="h-[36px] bg-[#eee] dark:bg-[#252525] flex items-center justify-center border-b border-r border-[#d8d8d8] dark:border-[#404040]">
                <span className="text-[12px] text-[#00688c] dark:text-[#4da6c7] underline">{code}</span>
              </div>
            ))}
          </div>
          {/* Data columns */}
          {MATRIX_CODES.map((toCode, j) => (
            <div key={toCode} className="min-w-[90px]">
              <div className="h-[36px] bg-[#eee] dark:bg-[#252525] flex items-center justify-center border-b border-r border-[#d8d8d8] dark:border-[#404040]">
                <span className="text-[12px] text-slate-800 dark:text-white">{toCode}</span>
              </div>
              {MATRIX_CODES.map((fromCode, i) => {
                if (i >= j) {
                  return (
                    <div key={fromCode} className="h-[36px] bg-white/40 dark:bg-black/20 border-b border-r border-[#d8d8d8] dark:border-[#404040]" />
                  );
                }
                const status = matrixStatus(i, j);
                const key = `${fromCode}-${toCode}`;
                const isHovered = hovered === key;
                return (
                  <div
                    key={fromCode}
                    className="h-[36px] flex items-center justify-center border-b border-r border-[#d8d8d8] dark:border-[#404040] cursor-default transition-all"
                    style={{ backgroundColor: isHovered ? STATUS_BG[status].replace("0.25", "0.55") : STATUS_BG[status] }}
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="text-[11px] font-medium text-[#222] dark:text-[#e0e0e0]">{STATUS_LATENCY[status]}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        {[["healthy","#508223","Healthy"],["warning","#de8011","Warning"],["danger","#d63b25","Critical"]].map(([s,c,l]) => (
          <span key={s} className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: c }} />{l}
          </span>
        ))}
        <span className="text-[11px] text-slate-400 ml-auto">Upper triangle only — A→B = B→A</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Code snippets
// ---------------------------------------------------------------------------
const CODE = {
  stackedBar: `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", critical: 2, warning: 4, healthy: 28 },
  { time: "04:00", critical: 1, warning: 3, healthy: 30 },
  // ...
];

function StackedBarChart() {
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="critical" fill="#d63b25" stackId="a" name="Critical" radius={[0, 0, 0, 0]} />
          <Bar dataKey="warning"  fill="#de8011" stackId="a" name="Warning"  radius={[0, 0, 0, 0]} />
          <Bar dataKey="healthy"  fill="#508223" stackId="a" name="Healthy"  radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}`,

  groupedBar: `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { region: "IAD", availability: 99.97, performance: 98.2, reliability: 99.1 },
  { region: "LHR", availability: 98.4,  performance: 96.8, reliability: 97.5 },
  // ...
];

function GroupedBarChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="region" tick={{ fontSize: 11 }} />
          <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} unit="%" />
          <Tooltip formatter={(v: number) => \`\${v.toFixed(1)}%\`} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="availability" fill="#508223" name="Availability" radius={[2, 2, 0, 0]} />
          <Bar dataKey="performance"  fill="#de8011" name="Performance"  radius={[2, 2, 0, 0]} />
          <Bar dataKey="reliability"  fill="#227e9e" name="Reliability"  radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}`,

  areaChart: `import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Generate 24-hour timeline data
const data = Array.from({ length: 24 }, (_, i) => ({
  hour: \`\${String(i).padStart(2, "0")}:00\`,
  latency: 40 + Math.sin(i * 0.5) * 15,
}));

function LatencyAreaChart() {
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
          <YAxis tick={{ fontSize: 11 }} unit="ms" />
          <Tooltip formatter={(v: number) => \`\${v.toFixed(1)}ms\`} />
          <Area
            type="monotone"
            dataKey="latency"
            stroke="#227e9e"
            strokeWidth={2}
            fill="rgba(34,126,158,0.12)"
            name="Latency"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}`,

  lineChart: `import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function MultiLineChart() {
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line
            type="monotone" dataKey="throughput"
            stroke="#508223" strokeWidth={2} dot={false}
            name="Throughput (Mbps)"
          />
          <Line
            type="monotone" dataKey="latency"
            stroke="#d63b25" strokeWidth={2} dot={false}
            name="Latency (ms)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}`,

  svgChart: `// Custom SVG stacked bar chart with draggable time-window selector.
// No charting library — built directly on SVG primitives + Framer Motion.
// Used in: Realm View > Incident Timeline (IncidentChart.tsx)

import { motion } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

type Bar = { id: string; critical: number; warning: number; healthy: number; date: string };

function IncidentChart({ data }: { data: Bar[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(800);
  const [winPos, setWinPos] = useState(0.9); // 0–1 position of the time window
  const [dragging, setDragging] = useState(false);

  // Measure container to make chart fully responsive
  useEffect(() => {
    const ro = new ResizeObserver(e => setWidth(e[0].contentRect.width));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const mL = 32, mR = 8, mT = 8, mB = 20;
  const chartH = 120, yMax = 30;
  const plotW = width - mL - mR;
  const plotH = chartH - mT - mB;
  const barW = Math.max(4, plotW / data.length - 1.5);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX, startPos = winPos;
    setDragging(true);
    const onMove = (ev: MouseEvent) =>
      setWinPos(Math.max(0.05, Math.min(0.95, startPos + (ev.clientX - startX) / plotW)));
    const onUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [winPos, plotW]);

  return (
    <div ref={containerRef} className="w-full bg-[rgba(34,126,158,0.05)] border border-[#b6b2ad] rounded-lg p-4">
      <svg width="100%" height={chartH}>
        {/* Grid lines */}
        {[0, 10, 20, 30].map(tick => {
          const y = chartH - mB - (tick / yMax) * plotH;
          return (
            <g key={tick}>
              <text x={mL - 4} y={y} textAnchor="end" dominantBaseline="middle" fontSize="8" fill="#888">{tick}</text>
              <line x1={mL} y1={y} x2={mL + plotW} y2={y} stroke="#f0f0f0" strokeWidth={1} />
            </g>
          );
        })}
        <line x1={mL} y1={mT} x2={mL} y2={chartH - mB} stroke="#d5d5d5" strokeWidth={1} />
        <line x1={mL} y1={chartH - mB} x2={mL + plotW} y2={chartH - mB} stroke="#d5d5d5" strokeWidth={1} />

        {/* Stacked bars — three segments animated in sequence */}
        {data.map((d, i) => {
          const x = mL + (i / data.length) * plotW;
          const base = chartH - mB;
          const cH = (d.critical / yMax) * plotH;
          const wH = (d.warning  / yMax) * plotH;
          const hH = (d.healthy  / yMax) * plotH;
          return (
            <g key={d.id}>
              {d.critical > 0 && (
                <motion.rect x={x} width={barW} fill="#d63b25"
                  initial={{ y: base, height: 0 }}
                  animate={{ y: base - cH, height: cH }}
                  transition={{ duration: 0.167, ease: "easeOut" }} />
              )}
              {d.warning > 0 && (
                <motion.rect x={x} width={barW} fill="#de8011"
                  initial={{ y: base - cH, height: 0 }}
                  animate={{ y: base - cH - wH, height: wH }}
                  transition={{ duration: 0.167, delay: 0.167, ease: "easeOut" }} />
              )}
              {d.healthy > 0 && (
                <motion.rect x={x} width={barW} fill="#508223"
                  initial={{ y: base - cH - wH, height: 0 }}
                  animate={{ y: base - cH - wH - hH, height: hH }}
                  transition={{ duration: 0.167, delay: 0.334, ease: "easeOut" }} />
              )}
            </g>
          );
        })}

        {/* Draggable time-window overlay */}
        <rect
          x={mL + winPos * plotW - 12} y={mT}
          width={24} height={plotH}
          fill="rgba(34,126,158,0.08)"
          stroke="#227e9e" strokeWidth="2" rx="4"
          style={{ cursor: dragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
        />
      </svg>
    </div>
  );
}`,

  animatedBars: `// Div-based animated stacked bar chart built with Framer Motion.
// Bars grow from the bottom on mount; hover drives an insight tooltip.
// Used in: Region View > IssuesChart.tsx

import { useState } from "react";
import { motion } from "motion/react";

type BarData = { label: string; critical: number; warning: number };

function IssuesChart({ data }: { data: BarData[] }) {
  const [hovered, setHovered] = useState<{ label: string; type: string; count: number } | null>(null);
  const maxVal = 30;
  const chartH = 124; // px

  const on = (label: string, type: string, count: number) => () => setHovered({ label, type, count });
  const off = () => setHovered(null);

  return (
    <div className="space-y-3">
      {/* Insight text — updates on bar hover */}
      <p className="text-[12px] border border-[#d8d8d8] dark:border-[#404040] rounded p-3">
        {hovered ? (
          <>
            <span className="text-[#222] dark:text-white">{hovered.label} Performance</span>
            {" "}has{" "}
            <span className={hovered.type === "critical" ? "text-[#d63b25]" : "text-[#9a5800]"}>
              {hovered.count} {hovered.type}
            </span>{" "}issues.
          </>
        ) : "Hover a bar to see insights"}
      </p>

      {/* Chart */}
      <div className="flex gap-5">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between items-end text-[11px] text-[#665f5b] dark:text-[#999]"
             style={{ height: chartH }}>
          {[30, 25, 20, 15, 10, 5, 0].map(v => <p key={v}>{v}</p>)}
        </div>

        {/* Bars */}
        <div className="flex-1 relative border-l border-b border-[#b9b9b9] dark:border-[#505050]">
          <div className="flex justify-around items-end" style={{ height: chartH }}>
            {data.map((d, i) => (
              <div key={i} className="flex flex-col items-center justify-end">
                <div className="flex flex-col w-10">
                  {d.warning > 0 && (
                    <motion.div
                      className="bg-[#de8011] dark:bg-[#ff981e] w-full rounded-t-[3px] origin-bottom border border-black/10"
                      style={{ height: (d.warning / maxVal) * chartH }}
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ duration: 0.25, delay: 0.25 + i * 0.03, ease: "easeOut" }}
                      onMouseEnter={on(d.label, "warning",  d.warning)}
                      onMouseLeave={off}
                    />
                  )}
                  {d.critical > 0 && (
                    <motion.div
                      className="bg-[#d63b25] dark:bg-[#e85540] w-full rounded-b-[3px] origin-bottom border border-black/10"
                      style={{ height: (d.critical / maxVal) * chartH }}
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.03, ease: "easeOut" }}
                      onMouseEnter={on(d.label, "critical", d.critical)}
                      onMouseLeave={off}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex gap-5 mt-2">
        <div className="w-[30px]" />
        <div className="flex-1 flex justify-around">
          {data.map(d => (
            <p key={d.label} className="text-[11px] text-[#665f5b] dark:text-[#999] text-center w-10">{d.label}</p>
          ))}
        </div>
      </div>
    </div>
  );
}`,

  matrix: `// Connectivity matrix — shows latency / packet loss for every region pair.
// Only the upper triangle is populated (A→B is the same connection as B→A).
// Hover highlights a cell. Used in: Realm View > BackboneMatrix.tsx

import { useMemo } from "react";

const airports = ["JFK", "LHR", "DXB", "SIN", "NRT", "FRA", "SYD"];

function seededRand(seed: number) { return Math.abs(Math.sin(seed) * 10000) % 1; }

function getStatus(fromIndex: number, toIndex: number): "healthy" | "warning" | "danger" {
  const r = seededRand(fromIndex * 37 + toIndex * 13);
  return r < 0.6 ? "healthy" : r < 0.85 ? "warning" : "danger";
}

const BG: Record<string, string> = {
  healthy: "rgba(80,130,35,0.25)",
  warning: "rgba(222,128,17,0.25)",
  danger:  "rgba(214,59,37,0.25)",
};

type CellProps = { fromIndex: number; toIndex: number };

function MatrixCell({ fromIndex, toIndex }: CellProps) {
  // Only render upper triangle; diagonal + lower are blank
  if (fromIndex >= toIndex) return <div className="h-[41px] bg-white/40 dark:bg-black/20" />;

  const status  = useMemo(() => getStatus(fromIndex, toIndex), [fromIndex, toIndex]);
  const latency = status === "healthy" ? "28ms" : status === "warning" ? "142ms" : "178ms";

  return (
    <div className="h-[41px] flex items-center justify-center" style={{ backgroundColor: BG[status] }}>
      <p className="text-[12px] font-medium text-[#222] dark:text-[#E4E4E4]">{latency}</p>
    </div>
  );
}

function BackboneMatrix() {
  return (
    <div className="border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-hidden h-[300px]">
      <div className="overflow-auto size-full flex">

        {/* Sticky label column */}
        <div className="shrink-0 w-[145px] bg-[#eee] dark:bg-[#252525]">
          <div className="h-[41px] flex items-center justify-center border-b border-r border-[#b9b9b9] dark:border-[#404040]">
            <p className="text-[14px]">Region</p>
          </div>
          {airports.map(code => (
            <div key={code} className="h-[41px] flex items-center justify-center border-b border-r border-[#b9b9b9] dark:border-[#404040]">
              <p className="text-[14px] text-[#00688c] dark:text-[#4da6c7] underline">{code}</p>
            </div>
          ))}
        </div>

        {/* One column per destination */}
        {airports.map((toCode, j) => (
          <div key={toCode} className="min-w-[110px] flex flex-col">
            {/* Column header */}
            <div className="bg-[#eee] dark:bg-[#252525] h-[41px] flex items-center justify-center border-b border-r border-[#b9b9b9] dark:border-[#404040]">
              <p className="text-[14px]">{toCode}</p>
            </div>
            {/* One row per source */}
            {airports.map((_, i) => (
              <MatrixCell key={i} fromIndex={i} toIndex={j} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}`,
};

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export function DataVisualization() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Data Visualization"
        description="Charts fall into two categories: Recharts-based (declarative, composable) and custom SVG / div-based (precise control, animation via Framer Motion). Use status colors for health data and the brand cyan (#227e9e) for neutral metrics. All containers must be given an explicit height."
      />

      <div className="space-y-8">

        {/* ---- Recharts: Stacked Bar ---- */}
        <Group title="Stacked Bar Chart — Recharts">
          <Preview
            label="BarChart with stackId — used in IssuesChart.tsx. Segments stack bottom-up: critical → warning → healthy."
            code={CODE.stackedBar}
          >
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INCIDENT_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="critical" fill="#d63b25" stackId="a" name="Critical" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="warning"  fill="#de8011" stackId="a" name="Warning"  radius={[0, 0, 0, 0]} />
                  <Bar dataKey="healthy"  fill="#508223" stackId="a" name="Healthy"  radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Preview>
        </Group>

        {/* ---- Recharts: Grouped Bar ---- */}
        <Group title="Grouped Bar Chart — Recharts">
          <Preview
            label="Multi-metric comparison across regions — bars side-by-side, no stackId."
            code={CODE.groupedBar}
          >
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AVAILABILITY_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                  <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => `${v.toFixed(1)}%`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="availability" fill="#508223" name="Availability" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="performance"  fill="#de8011" name="Performance"  radius={[2, 2, 0, 0]} />
                  <Bar dataKey="reliability"  fill="#227e9e" name="Reliability"  radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Preview>
        </Group>

        {/* ---- Recharts: Area ---- */}
        <Group title="Area Chart — Recharts">
          <Preview
            label="Filled area over time — used in IncidentChart.tsx for latency and throughput timelines."
            code={CODE.areaChart}
          >
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIMELINE_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
                  <YAxis tick={{ fontSize: 11 }} unit="ms" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => `${v.toFixed(1)}ms`} />
                  <Area type="monotone" dataKey="latency" stroke="#227e9e" strokeWidth={2} fill="rgba(34,126,158,0.12)" name="Latency" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Preview>
        </Group>

        {/* ---- Recharts: Line ---- */}
        <Group title="Multi-series Line Chart — Recharts">
          <Preview
            label="Two metrics over 24 hours — dot={false} keeps dense timelines readable."
            code={CODE.lineChart}
          >
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TIMELINE_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="throughput" stroke="#508223" strokeWidth={2} dot={false} name="Throughput (Mbps)" />
                  <Line type="monotone" dataKey="latency"    stroke="#d63b25" strokeWidth={2} dot={false} name="Latency (ms)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Preview>
        </Group>

        {/* ---- Custom SVG: Incident Timeline ---- */}
        <Group title="Custom SVG Chart — Incident Timeline">
          <Preview
            label="Raw SVG stacked bars with ResizeObserver for fluid width and a draggable time-window selector. Segments animate in sequence using Framer Motion. Used in: IncidentChart.tsx"
            code={CODE.svgChart}
          >
            <MiniSvgChart />
          </Preview>
        </Group>

        {/* ---- Custom Div Bars: IssuesChart ---- */}
        <Group title="Animated Bar Chart — Issues Breakdown">
          <Preview
            label="Div-based bars scaled by inline height with Framer Motion scaleY animation. Staggered delays create a wave-in effect. Hover state drives an insight sentence above the chart. Used in: IssuesChart.tsx"
            code={CODE.animatedBars}
          >
            <MiniAnimatedBars />
          </Preview>
        </Group>

        {/* ---- Backbone Matrix ---- */}
        <Group title="Status Connectivity Matrix">
          <Preview
            label="NxN connectivity grid. Only the upper triangle is rendered — the diagonal and lower half are blank since A→B = B→A. Color encodes health status; cells show latency. Used in: BackboneMatrix.tsx"
            code={CODE.matrix}
          >
            <MiniMatrix />
          </Preview>
        </Group>

        {/* ---- Reference table ---- */}
        <Group title="Implementation Reference">
          <TokenTable>
            <TokenRow name="ResponsiveContainer" value="width='100%' + explicit px height on wrapper" description="Always wrap Recharts; the parent div must have a fixed height" />
            <TokenRow name="CartesianGrid strokeDasharray" value="'3 3'" description="Standard dashed grid — stroke rgba(0,0,0,0.06) in light mode" />
            <TokenRow name="Bar radius" value="[2,2,0,0]" description="Rounds top corners only; [0,0,0,0] for middle segments in a stack" />
            <TokenRow name="margin" value="top:4 right:16 left:-16 bottom:0" description="Negative left compensates for YAxis tick width overhang" />
            <TokenRow name="Custom SVG sizing" value="ResizeObserver on containerRef" description="Gives plotWidth for dynamic bar/axis calculations" />
            <TokenRow name="Motion stagger (bars)" value="delay: index × 0.03s" description="Wave-in stagger for grouped bars; use 0.167s between stacked segments" />
            <TokenRow name="Series: healthy" value="#508223 / dark #6ba32e" description="Green — used for healthy status bars and lines" />
            <TokenRow name="Series: warning" value="#de8011 / dark #ff981e" description="Amber — degraded metrics, warning incidents" />
            <TokenRow name="Series: critical" value="#d63b25 / dark #e85540" description="Red — critical incidents, failed connections" />
            <TokenRow name="Series: brand" value="#227e9e" description="Cyan — neutral metrics like latency and throughput" />
            <TokenRow name="Matrix upper-triangle" value="if (fromIndex >= toIndex) return null" description="Eliminates duplicate A→B / B→A cells; use sorted pair for seed" />
          </TokenTable>
        </Group>

      </div>
    </div>
  );
}
