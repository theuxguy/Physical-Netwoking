import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";

const SCALE = [
  { name: "text-xs", size: "12px", tailwind: "text-xs", usage: "Status badges, captions, table footnotes" },
  { name: "text-sm", size: "14px", tailwind: "text-sm", usage: "Body copy, button labels, table cells" },
  { name: "text-base", size: "16px", tailwind: "text-base", usage: "Default body text, form inputs" },
  { name: "text-lg", size: "18px", tailwind: "text-lg", usage: "Section subheadings (h3)" },
  { name: "text-xl", size: "20px", tailwind: "text-xl", usage: "Page subheadings (h2)" },
  { name: "text-2xl", size: "24px", tailwind: "text-2xl", usage: "Page headings, region name (h1)" },
];

const WEIGHTS = [
  { weight: "400", label: "Normal", tailwind: "font-normal", usage: "Body copy, inputs, descriptions" },
  { weight: "500", label: "Medium", tailwind: "font-medium", usage: "Button labels, h1–h4, form labels" },
  { weight: "600", label: "Semibold", tailwind: "font-semibold", usage: "Emphasis, table headings" },
  { weight: "700", label: "Bold", tailwind: "font-bold", usage: "Metric values, critical numbers" },
];

export function Typography() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Typography"
        description="The type system uses the system font stack (Inter where available) with two semantic weights defined in theme.css. All size steps map to Tailwind utilities."
      />

      <div className="space-y-8">
        <Group title="Type Scale">
          <Preview>
            <div className="space-y-5 w-full">
              {SCALE.map((step) => (
                <div key={step.name} className="flex items-baseline gap-6 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="w-24 shrink-0">
                    <code className="text-xs font-mono text-violet-600 dark:text-violet-400">{step.tailwind}</code>
                    <p className="text-xs text-slate-400 mt-0.5">{step.size}</p>
                  </div>
                  <p
                    className="text-slate-900 dark:text-slate-100 font-normal flex-1"
                    style={{ fontSize: step.size }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 shrink-0 hidden sm:block w-48 text-right">{step.usage}</p>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Font Weights">
          <Preview>
            <div className="space-y-4 w-full">
              {WEIGHTS.map((w) => (
                <div key={w.weight} className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="w-24 shrink-0">
                    <code className="text-xs font-mono text-violet-600 dark:text-violet-400">{w.tailwind}</code>
                    <p className="text-xs text-slate-400 mt-0.5">{w.weight}</p>
                  </div>
                  <p
                    className="text-base text-slate-900 dark:text-slate-100 flex-1"
                    style={{ fontWeight: w.weight }}
                  >
                    {w.label} — The quick brown fox
                  </p>
                  <p className="text-xs text-slate-400 shrink-0 hidden sm:block w-48 text-right">{w.usage}</p>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Heading Hierarchy">
          <Preview label="h1 → h4 with default semantic weights from theme.css">
            <div className="space-y-3 w-full">
              <h1 className="text-slate-900 dark:text-slate-50">Heading 1 — Region Overview</h1>
              <h2 className="text-slate-900 dark:text-slate-50">Heading 2 — Availability Domains</h2>
              <h3 className="text-slate-900 dark:text-slate-50">Heading 3 — Network Metrics</h3>
              <h4 className="text-slate-900 dark:text-slate-50">Heading 4 — Backbone Status</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Body text — The network segment is operating within normal parameters. All availability domains are responding within expected latency thresholds.</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs">Caption / muted — Last updated 14 minutes ago · UTC</p>
            </div>
          </Preview>
        </Group>

        <Group title="Monospace">
          <Preview label="Used for tokens, code snippets, coordinate values">
            <div className="space-y-2">
              <code className="block text-sm font-mono text-slate-700 dark:text-slate-300">
                --chart-1: oklch(0.646 0.222 41.116);
              </code>
              <code className="block text-sm font-mono text-slate-700 dark:text-slate-300">
                borderColor: rgba(214, 59, 37, 0.15)
              </code>
              <code className="block text-xs font-mono text-slate-500 dark:text-slate-400">
                regionCode: IAD · coordinates: [38.9519, -77.4480]
              </code>
            </div>
          </Preview>
        </Group>

        <Group title="CSS Variable Reference">
          <TokenTable>
            <TokenRow name="--font-weight-normal" value="400" description="Body text, inputs, descriptions" />
            <TokenRow name="--font-weight-medium" value="500" description="Headings h1–h4, button labels, form labels" />
            <TokenRow name="--font-size (root)" value="16px" description="Base font size set on html element" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
