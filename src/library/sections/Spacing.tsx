import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";

const SCALE = [
  { token: "1", px: "4px", rem: "0.25rem", usage: "Icon gap, tight inline spacing" },
  { token: "1.5", px: "6px", rem: "0.375rem", usage: "Button icon gap, small gaps" },
  { token: "2", px: "8px", rem: "0.5rem", usage: "Form row gap, list item gap" },
  { token: "2.5", px: "10px", rem: "0.625rem", usage: "Badge padding" },
  { token: "3", px: "12px", rem: "0.75rem", usage: "Input padding-x, button padding" },
  { token: "4", px: "16px", rem: "1rem", usage: "Card/section padding, vertical rhythm" },
  { token: "5", px: "20px", rem: "1.25rem", usage: "Internal component padding" },
  { token: "6", px: "24px", rem: "1.5rem", usage: "Page horizontal padding (px-6), between groups" },
  { token: "8", px: "32px", rem: "2rem", usage: "Between major sections" },
  { token: "10", px: "40px", rem: "2.5rem", usage: "Component height (h-10 table header)" },
  { token: "12", px: "48px", rem: "3rem", usage: "Large gaps, hero spacing" },
  { token: "16", px: "64px", rem: "4rem", usage: "Map section padding, full-width inset" },
];

const RADIUS = [
  { name: "rounded-sm", value: "calc(0.625rem - 4px) = 6px", usage: "Small tags, tight elements" },
  { name: "rounded-md", value: "calc(0.625rem - 2px) = 8px", usage: "Buttons, inputs, dropdowns" },
  { name: "rounded-lg", value: "0.625rem = 10px", usage: "Cards, panels, popovers" },
  { name: "rounded-xl", value: "calc(0.625rem + 4px) = 14px", usage: "Large modals, map containers" },
  { name: "rounded-full", value: "9999px", usage: "Avatar, pill badges, circular icons" },
];

export function Spacing() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Spacing & Sizing"
        description="Spacing follows the Tailwind 4px base scale. The --radius CSS variable (0.625rem / 10px) is the canonical border-radius, from which sm/md/lg/xl variants are derived."
      />

      <div className="space-y-8">
        <Group title="Spacing Scale">
          <Preview>
            <div className="space-y-2.5 w-full">
              {SCALE.map((step) => (
                <div key={step.token} className="flex items-center gap-4">
                  <code className="text-xs font-mono text-violet-600 dark:text-violet-400 w-8 shrink-0 text-right">{step.token}</code>
                  <div
                    className="bg-violet-400 dark:bg-violet-600 rounded-sm h-5 shrink-0"
                    style={{ width: step.px }}
                  />
                  <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono w-10">{step.px}</span>
                    <span className="font-mono text-slate-400 dark:text-slate-500 w-16">{step.rem}</span>
                    <span className="hidden sm:block">{step.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Common Layout Patterns">
          <Preview label="Horizontal page padding · px-6 (24px)">
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-lg relative h-16 flex items-center overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-violet-200 dark:bg-violet-900 opacity-60" />
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-violet-200 dark:bg-violet-900 opacity-60" />
              <div className="absolute left-6 right-6 top-3 bottom-3 bg-white dark:bg-slate-700 rounded flex items-center justify-center">
                <span className="text-xs text-slate-500 dark:text-slate-400">Content area</span>
              </div>
            </div>
          </Preview>

          <Preview label="Section gap · gap-6 (24px) between header → chart → map → metrics">
            <div className="w-full space-y-6">
              {["Header", "Chart", "Map", "Metrics"].map((label) => (
                <div key={label} className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center px-4">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Border Radius Scale">
          <Preview>
            <div className="flex flex-wrap gap-6">
              {RADIUS.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 bg-slate-200 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-500"
                    style={{ borderRadius: r.value.split(" = ")[1] || r.value }}
                  />
                  <div className="text-center">
                    <code className="text-xs font-mono text-violet-600 dark:text-violet-400 block">{r.name}</code>
                    <span className="text-xs text-slate-400">{r.value.split(" = ")[1] || r.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Component Heights">
          <TokenTable>
            <TokenRow name="h-8" value="32px" description="Small button, compact input" />
            <TokenRow name="h-9" value="36px" description="Default button, standard input (shadcn default)" />
            <TokenRow name="h-10" value="40px" description="Table header row, larger controls" />
            <TokenRow name="h-12" value="48px" description="Navigation header (Header.tsx = 44px)" />
            <TokenRow name="h-[500px]" value="500px" description="Network diagram canvas height" />
            <TokenRow name="h-[600px]" value="600px" description="Map section height" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
