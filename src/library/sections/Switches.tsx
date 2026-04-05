import { useState } from "react";
import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import { Switch } from "../../app/components/ui/switch";
import { Label } from "../../app/components/ui/label";
import { Toggle } from "../../app/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../../app/components/ui/toggle-group";
import { Moon, Sun, LayoutGrid, List, Map, Network } from "lucide-react";

export function Switches() {
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(true);
  const [viewMode, setViewMode] = useState("general");

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Switches & Toggles"
        description="Binary controls (Switch) and multi-state selection controls (Toggle, ToggleGroup). The dark mode toggle in the app Header uses a custom button pattern; the shadcn Switch is available for settings and filters."
      />

      <div className="space-y-8">
        <Group title="Switch">
          <Preview label="Default switch with label" code={`<Switch checked={value} onCheckedChange={setValue} />`}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Switch id="sw-a" checked={switchA} onCheckedChange={setSwitchA} />
                <Label htmlFor="sw-a">Alert notifications {switchA ? "on" : "off"}</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="sw-b" checked={switchB} onCheckedChange={setSwitchB} />
                <Label htmlFor="sw-b">Live data feed {switchB ? "on" : "off"}</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="sw-c" disabled />
                <Label htmlFor="sw-c" className="text-slate-400">Disabled</Label>
              </div>
            </div>
          </Preview>
        </Group>

        <Group title="Toggle Button">
          <Preview label="Single toggle — pressed / unpressed" code={`<Toggle variant="outline"><Icon /></Toggle>`}>
            <div className="flex gap-3">
              <Toggle variant="outline" aria-label="Grid view">
                <LayoutGrid className="w-4 h-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="List view">
                <List className="w-4 h-4" />
              </Toggle>
              <Toggle variant="outline">
                <Map className="w-4 h-4" />
                Map
              </Toggle>
              <Toggle variant="outline">
                <Network className="w-4 h-4" />
                Diagram
              </Toggle>
            </div>
          </Preview>
        </Group>

        <Group title="Toggle Group">
          <Preview label="Single-select toggle group — view mode selection pattern" code={`<ToggleGroup type="single" value={mode} onValueChange={setMode}>\n  <ToggleGroupItem value="general">General health</ToggleGroupItem>\n  <ToggleGroupItem value="backbone">Backbone health</ToggleGroupItem>\n</ToggleGroup>`}>
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(v) => v && setViewMode(v)}
              className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden"
            >
              <ToggleGroupItem value="general" className="rounded-none border-0 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-800">
                General health
              </ToggleGroupItem>
              <ToggleGroupItem value="backbone" className="rounded-none border-0 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-800">
                Backbone health
              </ToggleGroupItem>
            </ToggleGroup>
          </Preview>

          <Preview label="Icon toggle group — layout switcher example">
            <ToggleGroup type="single" defaultValue="grid">
              <ToggleGroupItem value="grid" variant="outline">
                <LayoutGrid className="w-4 h-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" variant="outline">
                <List className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </Preview>
        </Group>

        <Group title="App Dark Mode Toggle Pattern">
          <Preview label="Custom button used in Header.tsx — not a Switch, just a button">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
                <Moon className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
                <Sun className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400">Toggles <code className="font-mono text-violet-600 dark:text-violet-400">.dark</code> class on <code className="font-mono text-violet-600 dark:text-violet-400">document.documentElement</code> via DarkModeContext</p>
            </div>
          </Preview>
        </Group>

        <Group title="Props Reference">
          <TokenTable>
            <TokenRow name="Switch.checked" value="boolean" description="Controlled checked state" />
            <TokenRow name="Switch.onCheckedChange" value="(checked: boolean) => void" description="State change callback" />
            <TokenRow name="Switch.disabled" value="boolean" description="Prevents interaction" />
            <TokenRow name="Toggle.variant" value="default | outline" description="Visual style" />
            <TokenRow name="Toggle.size" value="default | sm | lg" description="Size preset" />
            <TokenRow name="ToggleGroup.type" value="single | multiple" description="Selection mode" />
            <TokenRow name="ToggleGroup.value" value="string | string[]" description="Controlled selection" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
