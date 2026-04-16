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
        description="Binary controls (Switch) and multi-state selection (Toggle, ToggleGroup). The dark mode toggle in Header uses a custom button pattern; shadcn Switch is available for settings and filters."
      />

      <div className="space-y-8">
        <Group title="Switch">
          <Preview
            label="Default switch with label — controlled via checked + onCheckedChange."
            code={`import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const [enabled, setEnabled] = useState(false);

<div className="flex items-center gap-3">
  <Switch id="alerts" checked={enabled} onCheckedChange={setEnabled} />
  <Label htmlFor="alerts">Alert notifications {enabled ? "on" : "off"}</Label>
</div>

// Disabled
<Switch disabled />`}
          >
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
          <Preview
            label="Single toggle — pressed / unpressed states with outline variant."
            code={`import { Toggle } from "@/components/ui/toggle";

// Text + icon
<Toggle variant="outline">
  <Map className="w-4 h-4" />
  Map
</Toggle>

// Icon-only
<Toggle variant="outline" aria-label="Grid view">
  <LayoutGrid className="w-4 h-4" />
</Toggle>`}
          >
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
          <Preview
            label="Single-select toggle group — view mode selection pattern used in BottomControls."
            code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const [mode, setMode] = useState("general");

<ToggleGroup
  type="single"
  value={mode}
  onValueChange={(v) => v && setMode(v)}
  className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden"
>
  <ToggleGroupItem
    value="general"
    className="rounded-none border-0 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-800"
  >
    General health
  </ToggleGroupItem>
  <ToggleGroupItem
    value="backbone"
    className="rounded-none border-0 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-800"
  >
    Backbone health
  </ToggleGroupItem>
</ToggleGroup>`}
          >
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

          <Preview
            label="Icon toggle group — layout switcher."
            code={`<ToggleGroup type="single" defaultValue="grid">
  <ToggleGroupItem value="grid" variant="outline">
    <LayoutGrid className="w-4 h-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="list" variant="outline">
    <List className="w-4 h-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
          >
            <ToggleGroup type="single" defaultValue="grid">
              <ToggleGroupItem value="grid" variant="outline"><LayoutGrid className="w-4 h-4" /></ToggleGroupItem>
              <ToggleGroupItem value="list" variant="outline"><List className="w-4 h-4" /></ToggleGroupItem>
            </ToggleGroup>
          </Preview>
        </Group>

        <Group title="App Dark Mode Toggle">
          <Preview
            label="Custom button used in Header.tsx — toggles .dark on document.documentElement via DarkModeContext. Not a Switch."
            code={`// From Header.tsx — useDarkMode() returns { isDarkMode, toggleDarkMode }
import { useDarkMode } from "@/contexts/DarkModeContext";
import { Moon, Sun } from "lucide-react";

function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800
                 transition-colors border border-slate-200 dark:border-slate-700"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}`}
          >
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
                <Moon className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
                <Sun className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toggles <code className="font-mono text-violet-600 dark:text-violet-400">.dark</code> on{" "}
                <code className="font-mono text-violet-600 dark:text-violet-400">document.documentElement</code>
              </p>
            </div>
          </Preview>
        </Group>

        <Group title="Props Reference">
          <TokenTable>
            <TokenRow name="Switch.checked"        value="boolean"            description="Controlled checked state" />
            <TokenRow name="Switch.onCheckedChange" value="(v: boolean) => void" description="State change callback" />
            <TokenRow name="Switch.disabled"       value="boolean"            description="Prevents interaction" />
            <TokenRow name="Toggle.variant"        value="default | outline"  description="Visual style" />
            <TokenRow name="Toggle.size"           value="default | sm | lg"  description="Size preset" />
            <TokenRow name="ToggleGroup.type"      value="single | multiple"  description="Selection mode" />
            <TokenRow name="ToggleGroup.value"     value="string | string[]"  description="Controlled selection" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
