import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import { Badge } from "../../app/components/ui/badge";

// Hex tokens — no rgba. Canonical values matching StatusIndicators.
const STATUS_HEX = {
  healthy:  { bg: "#dce6d3", border: "#508223", text: "#3a5e18", dot: "#508223" },
  warning:  { bg: "#f8e6cf", border: "#ac630c", text: "#7a4400", dot: "#de8011" },
  critical: { bg: "#f7d8d3", border: "#d63b25", text: "#8b1a0a", dot: "#d63b25" },
};

const MAP_COLORS = { healthy: "#5f7d4f", warning: "#ac630c", critical: "#d63b25" };

export function Badges() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Badges"
        description="Compact labels for status, categories, and counts. Import from src/app/components/ui/badge.tsx. For network health statuses use the custom status pill pattern — do not use shadcn Badge variant colors for health states."
      />

      <div className="space-y-8">
        <Group title="shadcn/ui Badge Variants">
          <Preview
            label="Four built-in variants — use for categories, tags, and generic labels."
            code={`import { Badge } from "@/components/ui/badge";

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`}
          >
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </Preview>
        </Group>

        <Group title="App Status Pills">
          <Preview
            label="Health status pills — RegionHealthTable.tsx and MetricsSection.tsx. Hex only; text colors are AA-safe (min 4.5:1)."
            code={`// Hex tokens — no rgba
const STATUS = {
  healthy:  { bg: "#dce6d3", border: "#508223", text: "#3a5e18", dot: "#508223" },
  warning:  { bg: "#f8e6cf", border: "#ac630c", text: "#7a4400", dot: "#de8011" },
  critical: { bg: "#f7d8d3", border: "#d63b25", text: "#8b1a0a", dot: "#d63b25" },
};

function StatusPill({ status }: { status: keyof typeof STATUS }) {
  const s = STATUS[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: s.bg, color: s.text, border: \`1px solid \${s.border}\` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}`}
          >
            <div className="flex flex-wrap gap-3 items-center">
              {(["healthy", "warning", "critical"] as const).map((key) => {
                const s = STATUS_HEX[key];
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                );
              })}
            </div>
          </Preview>

          <Preview
            label="Map label style — compact pill on WorldMapDashboard.tsx markers. Normal and selected (inverted) states."
            code={`const MAP_COLORS = {
  healthy:  "#5f7d4f",   // muted green
  warning:  "#ac630c",   // amber
  critical: "#d63b25",   // red
};

// Normal state
<div style={{ backgroundColor: MAP_COLORS[status] }} className="rounded-[2px] px-1.5 py-0.5">
  <span className="text-white text-xs">{code}</span>
</div>

// Selected state — visual complement (inverted)
<div style={{ border: \`1px solid \${MAP_COLORS[status]}\` }} className="rounded-[2px] px-1.5 py-0.5 bg-white">
  <span style={{ color: MAP_COLORS[status] }} className="text-xs">{code}</span>
</div>`}
          >
            <div className="flex flex-wrap gap-4 items-end">
              {(["healthy", "warning", "critical"] as const).map((key) => (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <div className="rounded-[2px] px-1.5 py-0.5" style={{ backgroundColor: MAP_COLORS[key] }}>
                    <span className="text-white text-xs font-normal">
                      {key === "healthy" ? "IAD" : key === "warning" ? "LHR" : "NRT"}
                    </span>
                  </div>
                  <div className="rounded-[2px] px-1.5 py-0.5 bg-white" style={{ border: `1px solid ${MAP_COLORS[key]}` }}>
                    <span className="text-xs font-normal" style={{ color: MAP_COLORS[key] }}>
                      {key === "healthy" ? "IAD" : key === "warning" ? "LHR" : "NRT"}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </div>
              ))}
            </div>
          </Preview>

          <Preview label="Selected-state behaviour" className="bg-slate-50 dark:bg-slate-900/50 py-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg">
              Map labels invert when the region is added to the comparison table: background becomes
              white and text/border take the status color. This is the visual complement pattern —
              triggered in <code className="font-mono text-violet-600 dark:text-violet-400">WorldMapDashboard.tsx</code> via the <code className="font-mono text-violet-600 dark:text-violet-400">expandedRegions</code> context.
            </p>
          </Preview>
        </Group>

        <Group title="Count Badges">
          <Preview
            label="Numeric count / notification badge — two patterns: absolute-positioned dot and inline Badge."
            code={`// Absolute-positioned dot counter
<div className="relative inline-flex">
  <span>Alerts</span>
  <span className="absolute -top-2 -right-4 bg-[#d63b25] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
    3
  </span>
</div>

// Inline using shadcn Badge
<Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded-full">12</Badge>
<Badge variant="secondary"   className="text-[10px] px-1.5 py-0 h-4 rounded-full">34</Badge>`}
          >
            <div className="flex flex-wrap gap-6 items-center">
              <div className="relative inline-flex">
                <span className="text-sm text-slate-700 dark:text-slate-300">Alerts</span>
                <span className="absolute -top-2 -right-4 bg-[#d63b25] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-slate-700 dark:text-slate-300">Incidents</span>
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded-full">12</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-slate-700 dark:text-slate-300">Regions</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 rounded-full">34</Badge>
              </div>
            </div>
          </Preview>
        </Group>

        <Group title="Props Reference">
          <TokenTable>
            <TokenRow name="variant" value="default | secondary | outline | destructive" description="Visual style — maps to color scheme" />
            <TokenRow name="className" value="string" description="Extend or override classes via tailwind-merge" />
            <TokenRow name="asChild" value="boolean" description="Render as a child element (e.g. wrapping a link)" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
