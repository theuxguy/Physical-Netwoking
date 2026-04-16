import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";

const SCALE = [
  { px: "9px",  tailwind: "text-[9px]",  weight: "400",         leading: "normal",  usage: "Canvas node labels (AD blocks, POP blocks) — Figma-exported components only" },
  { px: "11px", tailwind: "text-[11px]", weight: "400",         leading: "16–18px", usage: "Badge text, chart axis labels, insight tags, action button labels" },
  { px: "12px", tailwind: "text-xs",     weight: "400",         leading: "20px",    usage: "Captions, chart annotations, sidebar labels, matrix cell values" },
  { px: "14px", tailwind: "text-sm",     weight: "400/500/600", leading: "20px",    usage: "Primary UI text — table cells, body copy, controls, drawer content" },
  { px: "24px", tailwind: "text-2xl",    weight: "600",         leading: "normal",  usage: "Page heading (ContentHeader h1), side drawer title" },
];

const WEIGHTS = [
  { weight: "400", label: "Regular",  tailwind: "font-normal",   usage: "All body text, table rows, badge labels, chart labels" },
  { weight: "500", label: "Medium",   tailwind: "font-medium",   usage: "Table column headers (IssuesChart), map overlay controls" },
  { weight: "600", label: "Semibold", tailwind: "font-semibold", usage: "Header logo, drawer heading, tooltip status emphasis" },
  { weight: "700", label: "Bold",     tailwind: "font-bold",     usage: "Live-data timestamp label, network diagram info callout" },
];

const LEADING = [
  { value: "leading-[16px]", context: "11px badge text — tight single-line pill labels" },
  { value: "leading-[18px]", context: "11px tooltip body — multi-line readable prose" },
  { value: "leading-[20px]", context: "12–14px general body copy and insight text" },
  { value: "leading-normal", context: "Default for all other text" },
];

export function Typography() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Typography"
        description="Inter is the sole type family across all UI and canvas contexts. Font weights are expressed with Tailwind utilities throughout. Sizes 9px and 11px are confined to Figma-exported canvas components."
      />

      <div className="space-y-8">

        <Group title="Type Scale">
          <Preview label="All sizes in active use across the prototype">
            <div className="space-y-5 w-full">
              {SCALE.map((step) => (
                <div key={step.px} className="flex items-baseline gap-6 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="w-28 shrink-0 space-y-1">
                    <code className="text-xs font-mono text-violet-600 dark:text-violet-400 block">{step.tailwind}</code>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">{step.px}</span>
                  </div>
                  <p
                    className="text-slate-900 dark:text-slate-100 flex-1"
                    style={{ fontSize: step.px, fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 shrink-0 hidden sm:block w-56 text-right">{step.usage}</p>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Font Family">
          <Preview label="Inter — sole type family across all contexts">
            <div className="w-full">
              <div className="flex items-center gap-6">
                <div className="w-28 shrink-0">
                  <code className="text-xs font-mono text-violet-600 dark:text-violet-400">Inter</code>
                  <p className="text-xs text-slate-400 mt-1">All contexts</p>
                </div>
                <p className="text-sm text-slate-900 dark:text-slate-100 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 shrink-0 hidden sm:block w-56 text-right">All UI text — badges, tables, headings, labels, controls, canvas nodes</p>
              </div>
            </div>
          </Preview>
        </Group>

        <Group title="Font Weights">
          <Preview>
            <div className="space-y-4 w-full">
              {WEIGHTS.map((w) => (
                <div key={w.weight} className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="w-28 shrink-0 space-y-1">
                    <code className="text-xs font-mono text-violet-600 dark:text-violet-400 block">{w.tailwind}</code>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">{w.weight}</span>
                  </div>
                  <p
                    className="text-sm text-slate-900 dark:text-slate-100 flex-1"
                    style={{ fontWeight: Number(w.weight) }}
                  >
                    {w.label} — The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 shrink-0 hidden sm:block w-56 text-right">{w.usage}</p>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Line Height">
          <Preview label="Used values — all others default to leading-normal">
            <div className="space-y-4 w-full">
              {LEADING.map((l) => (
                <div key={l.value} className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <code className="text-xs font-mono text-violet-600 dark:text-violet-400 w-36 shrink-0">{l.value}</code>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{l.context}</p>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Remaining Inconsistencies">
          <Preview label="Known duality in the codebase — not yet normalized">
            <div className="space-y-3 w-full text-xs text-slate-600 dark:text-slate-400">
              <div className="flex gap-3 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <span className="font-semibold text-amber-700 dark:text-amber-400 shrink-0">14px</span>
                <p>Both <code className="font-mono text-violet-600 dark:text-violet-400">text-sm</code> and <code className="font-mono text-violet-600 dark:text-violet-400">text-[14px]</code> appear for the same size. Manually authored components use <code className="font-mono">text-sm</code>; Figma-exported components use <code className="font-mono">text-[14px]</code>.</p>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <span className="font-semibold text-amber-700 dark:text-amber-400 shrink-0">12px</span>
                <p>Both <code className="font-mono text-violet-600 dark:text-violet-400">text-xs</code> and <code className="font-mono text-violet-600 dark:text-violet-400">text-[12px]</code> used for the same size across the codebase.</p>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <span className="font-semibold text-amber-700 dark:text-amber-400 shrink-0">24px</span>
                <p><code className="font-mono text-violet-600 dark:text-violet-400">text-[24px]</code> in SideDrawer and <code className="font-mono text-violet-600 dark:text-violet-400">text-2xl</code> in ContentHeader resolve to the same size.</p>
              </div>
            </div>
          </Preview>
        </Group>

        <Group title="Reference">
          <TokenTable>
            <TokenRow name="--font-weight-normal" value="400" description="CSS var — applied to body, input elements via theme.css" />
            <TokenRow name="--font-weight-medium" value="500" description="CSS var — applied to h1–h4, label, button via theme.css" />
            <TokenRow name="--font-size (root)" value="16px" description="Base font size on html element — rem anchor" />
          </TokenTable>
        </Group>

      </div>
    </div>
  );
}
