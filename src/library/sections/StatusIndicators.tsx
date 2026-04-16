import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";

// ---------------------------------------------------------------------------
// Canonical status color tokens — matches actual component implementations.
// All values are hex (no rgba). Light + dark variants listed separately.
// ---------------------------------------------------------------------------
const STATUS = {
  healthy: {
    bg:         "#dce6d3",  // rgba(80,130,35,0.20) on #ffffff
    darkBg:     "#252f1c",  // rgba(80,130,35,0.20) on #1a1a1a
    border:     "#508223",
    darkBorder: "#6ba32e",
    text:       "#3a5e18",  // AA-safe on bg: 6.67:1
    darkText:   "#e4e4e4",
    dot:        "#508223",
  },
  warning: {
    bg:         "#f8e6cf",  // rgba(222,128,17,0.20) on #ffffff
    darkBg:     "#412e18",  // rgba(222,128,17,0.20) on #1a1a1a
    border:     "#ac630c",  // AA-safe on white: 4.62:1
    darkBorder: "#de8011",
    text:       "#7a4400",  // AA-safe on bg: 6.81:1
    darkText:   "#e4e4e4",
    dot:        "#de8011",  // dot/icon only — lighter amber acceptable for non-text
  },
  critical: {
    bg:         "#f7d8d3",  // rgba(214,59,37,0.20) on #ffffff
    darkBg:     "#40211c",  // rgba(214,59,37,0.20) on #1a1a1a
    border:     "#d63b25",
    darkBorder: "#e85540",
    text:       "#8b1a0a",  // AA-safe on bg: 6.99:1
    darkText:   "#e4e4e4",
    dot:        "#d63b25",
  },
};

type StatusKey = keyof typeof STATUS;
const STATUSES: Array<{ key: StatusKey; label: string; percentage: number }> = [
  { key: "healthy",  label: "Healthy",  percentage: 99 },
  { key: "warning",  label: "Warning",  percentage: 76 },
  { key: "critical", label: "Critical", percentage: 42 },
];

// ---------------------------------------------------------------------------
// Preview sub-components
// ---------------------------------------------------------------------------
function HealthPill({ statusKey }: { statusKey: StatusKey }) {
  const s = STATUS[statusKey];
  const labels: Record<StatusKey, string> = { healthy: "Healthy", warning: "Warning", critical: "Critical" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.dot }} />
      {labels[statusKey]}
    </span>
  );
}

function HealthDot({ color }: { color: string }) {
  return <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />;
}

function HealthBar({ percentage, color }: { percentage: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400 w-10 text-right">{percentage}%</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Code snippets
// ---------------------------------------------------------------------------
const CODE = {
  pill: `// Status pill — hex tokens only, no rgba
const STATUS_TOKENS = {
  healthy:  { bg: "#dce6d3", border: "#508223", text: "#3a5e18", dot: "#508223" },
  warning:  { bg: "#f8e6cf", border: "#ac630c", text: "#7a4400", dot: "#de8011" },
  critical: { bg: "#f7d8d3", border: "#d63b25", text: "#8b1a0a", dot: "#d63b25" },
};

function StatusPill({ status }: { status: keyof typeof STATUS_TOKENS }) {
  const s = STATUS_TOKENS[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: s.bg, color: s.text, border: \`1px solid \${s.border}\` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}`,

  badge: `// Compact badge — exact pattern from RegionHealthTable.tsx and MetricsSection.tsx
const BADGE_STYLES = {
  healthy: {
    bg:     "bg-[#dce6d3] dark:bg-[#252f1c]",
    border: "border-[#508223] dark:border-[#6ba32e]",
    text:   "text-[#3a5e18] dark:text-[#e4e4e4]",
  },
  warning: {
    bg:     "bg-[#f8e6cf] dark:bg-[#412e18]",
    border: "border-[#ac630c] dark:border-[#de8011]",
    text:   "text-[#7a4400] dark:text-[#e4e4e4]",
  },
  critical: {
    bg:     "bg-[#f7d8d3] dark:bg-[#40211c]",
    border: "border-[#d63b25] dark:border-[#e85540]",
    text:   "text-[#8b1a0a] dark:text-[#e4e4e4]",
  },
};

function StatusBadge({ status }: { status: keyof typeof BADGE_STYLES }) {
  const s = BADGE_STYLES[status];
  return (
    <div className={\`\${s.bg} flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0\`}>
      <div aria-hidden="true"
        className={\`absolute border \${s.border} border-solid inset-0 pointer-events-none rounded-[3px]\`} />
      <p className={\`\${s.text} text-[11px] font-normal whitespace-nowrap relative\`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>
    </div>
  );
}`,

  dot: `// Dot indicator — minimal, paired with a text label
const DOT_COLORS = {
  healthy:  "#508223",
  warning:  "#de8011",   // lighter amber OK for non-text decorative elements
  critical: "#d63b25",
};

<span
  className="inline-block w-2.5 h-2.5 rounded-full"
  style={{ backgroundColor: DOT_COLORS[status] }}
/>`,

  bar: `// Health percentage bar — MetricsSection.tsx metric rows
const BAR_COLORS = {
  healthy:  "#508223",
  warning:  "#ac630c",
  critical: "#d63b25",
};

function HealthBar({ percentage, status }: { percentage: number; status: "healthy" | "warning" | "critical" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: \`\${percentage}%\`, backgroundColor: BAR_COLORS[status] }}
        />
      </div>
      <span className="text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400 w-10 text-right">
        {percentage}%
      </span>
    </div>
  );
}`,

  card: `// Status card — NetworkDiagram.tsx AD block pattern
const CARD_STYLES = {
  healthy:  { bg: "#dce6d3", darkBg: "#252f1c", border: "#508223", darkBorder: "#6ba32e", dot: "#508223" },
  warning:  { bg: "#f8e6cf", darkBg: "#412e18", border: "#ac630c", darkBorder: "#de8011", dot: "#de8011" },
  critical: { bg: "#f7d8d3", darkBg: "#40211c", border: "#d63b25", darkBorder: "#e85540", dot: "#d63b25" },
};

function StatusCard({ status, label, value }: { status: keyof typeof CARD_STYLES; label: string; value: string }) {
  const s = CARD_STYLES[status];
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className="rounded-lg p-4 w-36"
      style={{
        backgroundColor: isDarkMode ? s.darkBg  : s.bg,
        border: \`1px solid \${isDarkMode ? s.darkBorder : s.border}\`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.dot }} />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  );
}`,

  mapMarker: `// Map marker label — WorldMapDashboard.tsx
// isSelected = region has been added to the comparison table
const MAP_COLORS = {
  healthy:  "#5f7d4f",   // slightly muted green
  warning:  "#ac630c",   // amber
  critical: "#d63b25",   // red
};

const color = MAP_COLORS[airport.status];

// Normal state: status bg, white text
<div style={{ backgroundColor: color }} className="rounded-[2px] px-1.5 py-0.5">
  <span className="text-white text-xs">{airport.code}</span>
</div>

// Selected (inverted visual complement)
<div style={{ border: \`1px solid \${color}\` }} className="rounded-[2px] px-1.5 py-0.5 bg-white">
  <span style={{ color }} className="text-xs">{airport.code}</span>
</div>`,
};

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------
export function StatusIndicators() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Status Indicators"
        description="Health status patterns used throughout the dashboard. Three states — Healthy, Warning, Critical — share a single color system. All values are hex. Text colors are AA-contrast-safe (min 4.5:1). Never use custom colors for health status."
      />

      <div className="space-y-8">

        <Group title="Status Pill">
          <Preview
            label="Pill with dot and text — tables, cards, overlays. Text is AA-safe on the tinted background."
            code={CODE.pill}
          >
            <div className="flex flex-wrap gap-3">
              {STATUSES.map((s) => <HealthPill key={s.key} statusKey={s.key} />)}
            </div>
          </Preview>
        </Group>

        <Group title="Compact Badge">
          <Preview
            label="Inset-border badge — exact pattern used in RegionHealthTable.tsx and MetricsSection.tsx."
            code={CODE.badge}
          >
            <div className="flex flex-wrap gap-3 items-center">
              {STATUSES.map(({ key, label }) => {
                const s = STATUS[key];
                return (
                  <div key={key} className="flex items-center justify-center p-[4px] relative rounded-[3px] shrink-0"
                    style={{ backgroundColor: s.bg }}>
                    <div aria-hidden="true" className="absolute inset-0 rounded-[3px] pointer-events-none"
                      style={{ border: `1px solid ${s.border}` }} />
                    <p className="text-[11px] font-normal whitespace-nowrap relative" style={{ color: s.text }}>{label}</p>
                  </div>
                );
              })}
            </div>
          </Preview>
        </Group>

        <Group title="Dot Indicator">
          <Preview
            label="Minimal dot paired with text — used when space is constrained. Dot uses lighter shade; only text requires AA contrast."
            code={CODE.dot}
          >
            <div className="flex flex-col gap-3">
              {STATUSES.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <HealthDot color={STATUS[key].dot} />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                  <span className="text-xs text-slate-400">
                    {key === "healthy" ? "All systems nominal" : key === "warning" ? "Degraded — monitoring" : "Incident active"}
                  </span>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Health Percentage Bar">
          <Preview
            label="Progress bar with percentage — used inside metric rows and AD blocks."
            code={CODE.bar}
          >
            <div className="space-y-3 max-w-xs w-full">
              {STATUSES.map(({ key, label, percentage }) => (
                <div key={key} className="space-y-1">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
                  <HealthBar percentage={percentage} color={STATUS[key].border} />
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Status Card (AD Block Pattern)">
          <Preview
            label="Card with status-colored border and tinted fill — used for AD blocks in NetworkDiagram.tsx."
            code={CODE.card}
          >
            <div className="flex gap-4 flex-wrap">
              {STATUSES.map(({ key, label, percentage }) => {
                const s = STATUS[key];
                return (
                  <div key={key} className="rounded-lg p-4 w-36"
                    style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <HealthDot color={s.dot} />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{percentage}%</p>
                    <p className="text-xs mt-1" style={{ color: s.text }}>Availability</p>
                  </div>
                );
              })}
            </div>
          </Preview>
        </Group>

        <Group title="Map Marker Labels">
          <Preview
            label="Compact label on world map. Normal: status bg + white text. Selected: white bg + status color text and border."
            code={CODE.mapMarker}
          >
            <div className="flex items-center gap-6 flex-wrap">
              {[
                { code: "IAD", color: "#5f7d4f", label: "Healthy" },
                { code: "LHR", color: "#ac630c", label: "Warning" },
                { code: "NRT", color: "#d63b25", label: "Critical" },
              ].map(({ code, color, label }) => (
                <div key={code} className="flex flex-col items-center gap-2">
                  <div className="rounded-[2px] px-1.5 py-0.5" style={{ backgroundColor: color }}>
                    <span className="text-white text-xs font-normal">{code}</span>
                  </div>
                  <div className="rounded-[2px] px-1.5 py-0.5 bg-white" style={{ border: `1px solid ${color}` }}>
                    <span className="text-xs font-normal" style={{ color }}>{code}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Color Token Reference">
          <TokenTable>
            <TokenRow name="Healthy bg (light)"    value="#dce6d3" description="rgba(80,130,35,0.20) on #ffffff — badge and card fill" />
            <TokenRow name="Healthy bg (dark)"     value="#252f1c" description="rgba(80,130,35,0.20) on #1a1a1a" />
            <TokenRow name="Healthy border"        value="#508223" description="Badge border, bar fill, dot, icon" />
            <TokenRow name="Healthy border (dark)" value="#6ba32e" description="Elevated on dark surface" />
            <TokenRow name="Healthy text (light)"  value="#3a5e18" description="AA-safe on #dce6d3 — 6.67:1" />
            <TokenRow name="Healthy text (dark)"   value="#e4e4e4" description="AA-safe on #252f1c — 11:1+" />
            <TokenRow name="Warning bg (light)"    value="#f8e6cf" description="rgba(222,128,17,0.20) on #ffffff" />
            <TokenRow name="Warning bg (dark)"     value="#412e18" description="rgba(222,128,17,0.20) on #1a1a1a" />
            <TokenRow name="Warning border"        value="#ac630c" description="Badge border — AA-safe on white: 4.62:1" />
            <TokenRow name="Warning border (dark)" value="#de8011" description="Elevated on dark surface" />
            <TokenRow name="Warning text (light)"  value="#7a4400" description="AA-safe on #f8e6cf — 6.81:1" />
            <TokenRow name="Warning text (dark)"   value="#e4e4e4" description="AA-safe on #412e18" />
            <TokenRow name="Warning dot / icon"    value="#de8011" description="Non-text decorative elements only — lighter amber permitted" />
            <TokenRow name="Critical bg (light)"   value="#f7d8d3" description="rgba(214,59,37,0.20) on #ffffff" />
            <TokenRow name="Critical bg (dark)"    value="#40211c" description="rgba(214,59,37,0.20) on #1a1a1a" />
            <TokenRow name="Critical border"       value="#d63b25" description="Badge border, bar fill, dot, icon" />
            <TokenRow name="Critical border (dark)"value="#e85540" description="Elevated on dark surface" />
            <TokenRow name="Critical text (light)" value="#8b1a0a" description="AA-safe on #f7d8d3 — 6.99:1" />
            <TokenRow name="Critical text (dark)"  value="#e4e4e4" description="AA-safe on #40211c" />
            <TokenRow name="Map: healthy"          value="#5f7d4f" description="Map marker — muted green, distinct from badge border" />
            <TokenRow name="Map: warning"          value="#ac630c" description="Map marker — matches badge border" />
            <TokenRow name="Map: critical"         value="#d63b25" description="Map marker — matches badge border" />
          </TokenTable>
        </Group>

      </div>
    </div>
  );
}
