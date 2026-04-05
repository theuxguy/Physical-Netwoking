import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";

const STATUSES = [
  {
    key: "healthy",
    label: "Healthy",
    borderColor: "#508223",
    textColor: "#508223",
    bgColor: "rgba(80,130,35,0.10)",
    dotColor: "#508223",
    percentage: 99,
  },
  {
    key: "warning",
    label: "Warning",
    borderColor: "#de8011",
    textColor: "#de8011",
    bgColor: "rgba(222,128,17,0.12)",
    dotColor: "#de8011",
    percentage: 76,
  },
  {
    key: "critical",
    label: "Critical",
    borderColor: "#d63b25",
    textColor: "#d63b25",
    bgColor: "rgba(214,59,37,0.12)",
    dotColor: "#d63b25",
    percentage: 42,
  },
];

function HealthPill({ label, borderColor, textColor, bgColor, dotColor }: typeof STATUSES[0]) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: bgColor, color: textColor, border: `1px solid ${borderColor}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
      {label}
    </span>
  );
}

function HealthDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

function HealthBar({ percentage, color }: { percentage: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400 w-10 text-right">
        {percentage}%
      </span>
    </div>
  );
}

export function StatusIndicators() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Status Indicators"
        description="Reusable health status patterns used throughout the dashboard. All three states — Healthy, Warning, Critical — have consistent color tokens. Never use custom colors for health status."
      />

      <div className="space-y-8">
        <Group title="Status Pills">
          <Preview label="Pill badges with dot and text — use in tables, cards, overlays" code={`<span style={{ backgroundColor: bgColor, color: textColor, border: \`1px solid \${borderColor}\` }}>● Healthy</span>`}>
            <div className="flex flex-wrap gap-3">
              {STATUSES.map((s) => <HealthPill key={s.key} {...s} />)}
            </div>
          </Preview>
        </Group>

        <Group title="Dot Indicators">
          <Preview label="Minimal dot — use inline beside text when space is constrained">
            <div className="flex flex-col gap-3">
              {STATUSES.map((s) => (
                <div key={s.key} className="flex items-center gap-2">
                  <HealthDot color={s.dotColor} />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{s.label}</span>
                  <span className="text-xs text-slate-400">{s.key === "healthy" ? "All systems nominal" : s.key === "warning" ? "Degraded — monitoring" : "Incident active"}</span>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Health Percentage Bars">
          <Preview label="Progress bar with percentage — used inside metric cards and AD blocks">
            <div className="space-y-3 max-w-xs w-full">
              {STATUSES.map((s) => (
                <div key={s.key} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{s.label}</span>
                  </div>
                  <HealthBar percentage={s.percentage} color={s.borderColor} />
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Status Card (AD Block pattern)">
          <Preview label="Card with status-colored border and tinted background — used in NetworkDiagram AD blocks">
            <div className="flex gap-4 flex-wrap">
              {STATUSES.map((s) => (
                <div
                  key={s.key}
                  className="rounded-lg p-4 w-36"
                  style={{
                    border: `1px solid ${s.borderColor}`,
                    backgroundColor: s.bgColor,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <HealthDot color={s.dotColor} />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{s.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{s.percentage}%</p>
                  <p className="text-xs mt-1" style={{ color: s.textColor }}>Availability</p>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Map Marker Labels">
          <Preview label="Compact 8px-height pill used directly on the world map — normal and selected (inverted) states">
            <div className="flex items-center gap-4 flex-wrap">
              {STATUSES.map((s) => (
                <div key={s.key} className="flex flex-col items-center gap-2">
                  {/* Normal */}
                  <div
                    className="rounded-[2px] px-2 py-0.5 flex items-center gap-1"
                    style={{ backgroundColor: s.borderColor }}
                  >
                    <span className="text-white text-xs font-normal leading-none">IAD</span>
                  </div>
                  {/* Selected / inverted */}
                  <div
                    className="rounded-[2px] px-2 py-0.5 flex items-center gap-1 bg-white"
                    style={{ border: `1px solid ${s.borderColor}` }}
                  >
                    <span className="text-xs font-normal leading-none" style={{ color: s.borderColor }}>IAD</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Color Token Reference">
          <TokenTable>
            <TokenRow name="Healthy border" value="#508223" description="AD block border, pill border, dot, bar fill" />
            <TokenRow name="Healthy bg" value="rgba(80,130,35,0.10)" description="AD block selected fill, pill background" />
            <TokenRow name="Warning border" value="#de8011" description="Warning state border across all components" />
            <TokenRow name="Warning bg" value="rgba(222,128,17,0.12)" description="Warning tinted fill" />
            <TokenRow name="Critical border" value="#d63b25" description="Critical/danger state border" />
            <TokenRow name="Critical bg" value="rgba(214,59,37,0.12)" description="Critical tinted fill" />
            <TokenRow name="Map healthy" value="#5f7d4f" description="Map marker background (healthy, slightly muted)" />
            <TokenRow name="Map warning" value="#ac630c" description="Map marker background (warning)" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
