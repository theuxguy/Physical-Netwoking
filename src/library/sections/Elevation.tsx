import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";

const LEVELS = [
  {
    name: "Flat",
    tailwind: "shadow-none",
    css: "none",
    usage: "Inline elements, dividers, flush surfaces",
    shadow: "none",
  },
  {
    name: "Subtle",
    tailwind: "shadow-sm",
    css: "0 1px 2px rgba(0,0,0,0.05)",
    usage: "Input fields, tags, small cards",
    shadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  {
    name: "Default",
    tailwind: "shadow",
    css: "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",
    usage: "Cards, panels, dropdowns",
    shadow: "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",
  },
  {
    name: "Raised",
    tailwind: "shadow-md",
    css: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
    usage: "Floating menus, popovers, hover cards",
    shadow: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
  },
  {
    name: "Elevated",
    tailwind: "shadow-lg",
    css: "0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)",
    usage: "Modals, dialogs, side drawers",
    shadow: "0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)",
  },
  {
    name: "Toast",
    tailwind: "shadow (sonner)",
    css: "0px 4px 12px rgba(0,0,0,0.10)",
    usage: "Toast notifications",
    shadow: "0px 4px 12px rgba(0,0,0,0.10)",
  },
];

export function Elevation() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Elevation"
        description="Elevation communicates hierarchy and layering. Use shadows sparingly — prefer borders for structure on flat surfaces, shadows for floating or interactive elements."
      />

      <div className="space-y-8">
        <Group title="Shadow Scale">
          <Preview className="bg-slate-100 dark:bg-slate-900">
            <div className="flex flex-wrap gap-8 justify-center w-full">
              {LEVELS.map((level) => (
                <div key={level.name} className="flex flex-col items-center gap-3">
                  <div
                    className="w-24 h-20 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center"
                    style={{ boxShadow: level.shadow }}
                  >
                    <span className="text-xs text-slate-400 dark:text-slate-500">{level.name}</span>
                  </div>
                  <div className="text-center space-y-0.5">
                    <code className="text-xs font-mono text-violet-600 dark:text-violet-400 block">{level.tailwind}</code>
                    <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[100px] text-center">{level.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Layering Z-Index">
          <Preview label="Z-index stack (lowest → highest)">
            <div className="relative w-full h-48">
              {[
                { label: "Base content", z: "z-0", offset: "0px", color: "bg-slate-100 dark:bg-slate-800" },
                { label: "Sticky header / controls (z-10–30)", z: "z-10", offset: "20px", color: "bg-slate-200 dark:bg-slate-700" },
                { label: "Dropdowns / popovers (z-50)", z: "z-50", offset: "40px", color: "bg-slate-300 dark:bg-slate-600" },
                { label: "Modals / overlays (z-50+)", z: "z-50", offset: "60px", color: "bg-slate-400 dark:bg-slate-500" },
                { label: "Toast notifications (z-[999...])", z: "z-[9999]", offset: "80px", color: "bg-violet-400 dark:bg-violet-600" },
              ].map((layer, i) => (
                <div
                  key={layer.label}
                  className={`absolute left-0 right-0 h-10 ${layer.color} rounded-lg border border-white/30 flex items-center px-4 gap-2`}
                  style={{ top: layer.offset, zIndex: i }}
                >
                  <code className="text-xs font-mono text-slate-600 dark:text-slate-200 w-20 shrink-0">{layer.z}</code>
                  <span className="text-xs text-slate-700 dark:text-slate-200">{layer.label}</span>
                </div>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Reference">
          <TokenTable>
            <TokenRow name="shadow-sm" value="0 1px 2px rgba(0,0,0,0.05)" description="Inputs, small interactive elements" />
            <TokenRow name="shadow" value="0 1px 3px + 0 1px 2px" description="Cards, panels, default dropdowns" />
            <TokenRow name="shadow-md" value="0 4px 6px + 0 2px 4px" description="Floating elements, hover cards" />
            <TokenRow name="shadow-lg" value="0 10px 15px + 0 4px 6px" description="Modals, drawers, dialogs" />
            <TokenRow name="z-10" value="10" description="Sticky controls, map overlays (absolute top-4)" />
            <TokenRow name="z-20–30" value="20–30" description="Network diagram layers, canvas items" />
            <TokenRow name="z-50" value="50" description="Dropdowns, popovers, tooltips" />
            <TokenRow name="z-[9999…]" value="999999999" description="Sonner toast container" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
