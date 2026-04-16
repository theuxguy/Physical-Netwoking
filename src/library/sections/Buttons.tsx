import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import { Button } from "../../app/components/ui/button";
import { RefreshCw, Download, Filter, ChevronRight, Plus } from "lucide-react";

export function Buttons() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Buttons"
        description="Built with shadcn/ui Button using class-variance-authority (CVA). All variants support dark mode and disabled states. Import from src/app/components/ui/button.tsx."
      />

      <div className="space-y-8">
        <Group title="Variants">
          <Preview
            label="All variants at default size."
            code={`import { Button } from "@/components/ui/button";

<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`}
          >
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </Preview>
        </Group>

        <Group title="Sizes">
          <Preview
            label="All sizes — sm · default · lg · icon."
            code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus className="w-4 h-4" /></Button>`}
          >
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="default">Default</Button>
              <Button variant="outline" size="lg">Large</Button>
              <Button variant="outline" size="icon"><Plus className="w-4 h-4" /></Button>
            </div>
          </Preview>
        </Group>

        <Group title="With Icons">
          <Preview
            label="Leading and trailing icon patterns. Gap between icon and label is handled automatically by the button's gap-2 base class."
            code={`// Leading icon
<Button variant="outline" size="sm">
  <RefreshCw className="w-3.5 h-3.5" />
  Refresh
</Button>

// Trailing icon
<Button variant="default">
  Continue
  <ChevronRight className="w-4 h-4" />
</Button>

// Icon-only (square)
<Button variant="outline" size="icon">
  <RefreshCw className="w-4 h-4" />
</Button>`}
          >
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </Button>
              <Button variant="default">
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </Preview>
        </Group>

        <Group title="Disabled State">
          <Preview
            label="Disabled applies opacity-50 and pointer-events-none across all variants."
            code={`<Button variant="default"     disabled>Default</Button>
<Button variant="secondary"   disabled>Secondary</Button>
<Button variant="outline"     disabled>Outline</Button>
<Button variant="ghost"       disabled>Ghost</Button>
<Button variant="destructive" disabled>Destructive</Button>`}
          >
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="default" disabled>Default</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="outline" disabled>Outline</Button>
              <Button variant="ghost" disabled>Ghost</Button>
              <Button variant="destructive" disabled>Destructive</Button>
            </div>
          </Preview>
        </Group>

        <Group title="App-Specific Patterns">
          <Preview
            label="Inline bordered button — used in map overlay controls (MapSection.tsx, NetworkDiagram.tsx)."
            code={`// Inline bordered button — plain <button>, not shadcn Button
// Colors: border #d1d5db (gray-300), bg white, dark surface #1a1a1a
<button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#d1d5db] dark:border-[#404040] rounded text-sm bg-white dark:bg-[#1a1a1a] dark:text-white hover:bg-[#f9fafb] dark:hover:bg-[#2a2a2a] transition-colors">
  <RefreshCw className="w-3.5 h-3.5" />
  <span>Refresh</span>
</button>

// Adjacent pill label — same border style, bold text, no hover
<div className="bg-white dark:bg-[#1a1a1a] border border-[#d1d5db] dark:border-[#404040] rounded px-3 py-1.5 text-xs font-bold dark:text-white">
  Showing live data for Apr 5, 2026
</div>`}
          >
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#d1d5db] dark:border-[#404040] rounded text-sm bg-white dark:bg-[#1a1a1a] dark:text-white hover:bg-[#f9fafb] dark:hover:bg-[#2a2a2a] transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
              <div className="bg-white dark:bg-[#1a1a1a] border border-[#d1d5db] dark:border-[#404040] rounded px-3 py-1.5 text-xs font-bold dark:text-white">
                Showing live data for Apr 5, 2026
              </div>
            </div>
          </Preview>

          <Preview
            label="Tab-style toggle — used in BottomControls view-mode switcher. Active tab gets white bg; inactive is gray-50."
            code={`// Tab toggle — plain <button> elements, not ToggleGroup
// Active: bg-white dark:bg-[#2a2a2a], text-gray-900
// Inactive: bg-[#f9fafb] dark:bg-[#1a1a1a], text-gray-500
const [active, setActive] = useState("general");

<div className="flex rounded-md border border-[#e5e7eb] dark:border-[#333333] overflow-hidden w-fit">
  {["General health", "Backbone health"].map((label, i) => (
    <button
      key={label}
      onClick={() => setActive(label)}
      className={\`px-4 py-2 text-sm transition-colors \${
        active === label
          ? "bg-white dark:bg-[#2a2a2a] text-[#111827] dark:text-white font-medium"
          : "bg-[#f9fafb] dark:bg-[#1a1a1a] text-[#6b7280] dark:text-[#9ca3af] hover:bg-white dark:hover:bg-[#2a2a2a]"
      }\`}
    >
      {label}
    </button>
  ))}
</div>`}
          >
            <div className="flex rounded-md border border-[#e5e7eb] dark:border-[#333333] overflow-hidden w-fit">
              {["General health", "Backbone health"].map((label, i) => (
                <button
                  key={label}
                  className={`px-4 py-2 text-sm transition-colors ${
                    i === 0
                      ? "bg-white dark:bg-[#2a2a2a] text-[#111827] dark:text-white font-medium"
                      : "bg-[#f9fafb] dark:bg-[#1a1a1a] text-[#6b7280] dark:text-[#9ca3af] hover:bg-white dark:hover:bg-[#2a2a2a]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Preview>
        </Group>

        <Group title="Props Reference">
          <TokenTable>
            <TokenRow name="variant"  value="default | secondary | outline | ghost | link | destructive" description="Visual style of the button" />
            <TokenRow name="size"     value="default | sm | lg | icon" description="Height and padding preset" />
            <TokenRow name="disabled" value="boolean"  description="Disables interaction — sets opacity-50 cursor-not-allowed" />
            <TokenRow name="asChild"  value="boolean"  description="Renders as the child element (e.g. for anchor wrapping)" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
