import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import { Badge } from "../../app/components/ui/badge";

export function Badges() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Badges"
        description="Compact labels for status, categories, and counts. Import from src/app/components/ui/badge.tsx. For network health statuses, use the custom status pill pattern below."
      />

      <div className="space-y-8">
        <Group title="Variants">
          <Preview label="shadcn/ui badge variants" code={`<Badge variant="default">Label</Badge>`}>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </Preview>
        </Group>

        <Group title="App Status Badges">
          <Preview label="Health status pills — used in RegionHealthTable and MetricsSection">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Healthy */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(80,130,35,0.12)] text-[#508223] border border-[#508223]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#508223]" />
                Healthy
              </span>
              {/* Warning */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(222,128,17,0.12)] text-[#de8011] border border-[#de8011]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#de8011]" />
                Warning
              </span>
              {/* Critical */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(214,59,37,0.12)] text-[#d63b25] border border-[#d63b25]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d63b25]" />
                Critical
              </span>
            </div>
          </Preview>

          <Preview label="Map label style — compact pill as rendered on WorldMapDashboard markers">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="bg-[#5f7d4f] rounded-[2px] px-1.5 py-0.5 flex items-center gap-1">
                <span className="text-white text-xs font-normal">IAD</span>
              </div>
              <div className="bg-[#ac630c] rounded-[2px] px-1.5 py-0.5 flex items-center gap-1">
                <span className="text-white text-xs font-normal">LHR</span>
              </div>
              <div className="bg-[#d63b25] rounded-[2px] px-1.5 py-0.5 flex items-center gap-1">
                <span className="text-white text-xs font-normal">NRT</span>
              </div>
              {/* Selected (added to table) — inverted */}
              <div className="bg-white rounded-[2px] px-1.5 py-0.5 flex items-center gap-1 border border-[#5f7d4f]">
                <span className="text-[#5f7d4f] text-xs font-normal">SIN</span>
              </div>
              <div className="bg-white rounded-[2px] px-1.5 py-0.5 flex items-center gap-1 border border-[#d63b25]">
                <span className="text-[#d63b25] text-xs font-normal">DXB</span>
              </div>
            </div>
          </Preview>

          <Preview label="Selected state note" className="bg-slate-50 dark:bg-slate-900/50 py-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg">
              Map marker labels invert when the region is added to the table: background becomes white,
              text and border take on the status color. This is the visual complement pattern requested
              for selection feedback.
            </p>
          </Preview>
        </Group>

        <Group title="Count Badges">
          <Preview label="Numeric count / notification badge">
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
