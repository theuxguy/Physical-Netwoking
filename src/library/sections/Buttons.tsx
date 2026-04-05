import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import { Button } from "../../app/components/ui/button";
import { RefreshCw, Download, Filter, ChevronRight, Plus } from "lucide-react";

export function Buttons() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Buttons"
        description="Built with shadcn/ui Button using class-variance-authority. All variants support dark mode and disabled states. Import from src/app/components/ui/button.tsx."
      />

      <div className="space-y-8">
        <Group title="Variants">
          <Preview label="All variants at default size" code={`<Button variant="default">Label</Button>`}>
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
          <Preview label="All sizes using variant=outline for visibility" code={`<Button size="sm" | "default" | "lg" | "icon">`}>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="default">Default</Button>
              <Button variant="outline" size="lg">Large</Button>
              <Button variant="outline" size="icon"><Plus className="w-4 h-4" /></Button>
            </div>
          </Preview>
        </Group>

        <Group title="With Icons">
          <Preview label="Leading and trailing icon patterns used in the app" code={`<Button><RefreshCw className="w-3.5 h-3.5" /> Refresh</Button>`}>
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

        <Group title="States">
          <Preview label="Disabled state across variants">
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
          <Preview label="Inline bordered button style — used in map overlay and bottom controls">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 dark:border-[#404040] rounded text-sm bg-white dark:bg-[#1a1a1a] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
              <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-1.5 text-xs font-bold dark:text-white">
                Showing live data for Apr 5, 2026 09:41 UTC
              </div>
            </div>
          </Preview>

          <Preview label="Tab-style toggle buttons — used in BottomControls view mode switcher">
            <div className="flex rounded-md border border-gray-200 dark:border-[#333333] overflow-hidden w-fit">
              {["General health", "Backbone health"].map((label, i) => (
                <button
                  key={label}
                  className={`px-4 py-2 text-sm transition-colors ${
                    i === 0
                      ? "bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white font-medium"
                      : "bg-gray-50 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-[#2a2a2a]"
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
            <TokenRow name="variant" value="default | secondary | outline | ghost | link | destructive" description="Visual style of the button" />
            <TokenRow name="size" value="default | sm | lg | icon" description="Height and padding preset" />
            <TokenRow name="disabled" value="boolean" description="Disables interaction, sets opacity-50 cursor-not-allowed" />
            <TokenRow name="asChild" value="boolean" description="Renders as the child element (e.g. for anchor wrapping)" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
