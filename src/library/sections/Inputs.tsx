import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import { Input } from "../../app/components/ui/input";
import { Label } from "../../app/components/ui/label";
import { Textarea } from "../../app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../app/components/ui/select";
import { Search } from "lucide-react";

export function Inputs() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Inputs & Search"
        description="Form controls built on shadcn/ui. Inputs use --input-background (#f3f3f5) as fill and support disabled, error (aria-invalid), and focus states. Always pair with Label for accessibility."
      />

      <div className="space-y-8">
        <Group title="Text Input">
          <Preview
            label="Default input with label."
            code={`import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="grid gap-2 max-w-sm">
  <Label htmlFor="region">Region Code</Label>
  <Input id="region" placeholder="e.g. IAD, LHR, NRT" />
</div>`}
          >
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="demo-input">Region Code</Label>
              <Input id="demo-input" placeholder="e.g. IAD, LHR, NRT" />
            </div>
          </Preview>

          <Preview
            label="States — default · disabled · error (aria-invalid)."
            code={`<Input placeholder="Default" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Error" aria-invalid="true" value="bad-value" readOnly />`}
          >
            <div className="grid gap-3 max-w-sm w-full">
              <Input placeholder="Default state" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Error state" aria-invalid="true" value="bad-value" readOnly />
            </div>
          </Preview>
        </Group>

        <Group title="Search">
          <Preview
            label="Search with leading icon — shadcn Input with pl-9 offset."
            code={`import { Search } from "lucide-react";

<div className="relative max-w-sm">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
  <Input className="pl-9" type="text" placeholder="Find resource on map" />
</div>`}
          >
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input className="pl-9" type="text" placeholder="Find resource on map" />
            </div>
          </Preview>

          <Preview
            label="App-style map search — exact class pattern from MapSection.tsx (plain input, not shadcn)."
            code={`// Plain <input> — used in map overlays where shadcn styles clash with map surface
// bg-white dark:bg-[#1a1a1a], border #d1d5db dark:#404040
<input
  type="text"
  placeholder="Find resource on map"
  className="px-3 py-2 border border-[#d1d5db] dark:border-[#404040] rounded
             bg-white dark:bg-[#1a1a1a] dark:text-white dark:placeholder-[#9ca3af]
             text-sm w-64 outline-none focus:ring-2 focus:ring-[#227e9e]/30"
/>`}
          >
            <input
              type="text"
              placeholder="Find resource on map"
              className="px-3 py-2 border border-[#d1d5db] dark:border-[#404040] rounded bg-white dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-400 text-sm w-64"
            />
          </Preview>
        </Group>

        <Group title="Textarea">
          <Preview
            label="Multi-line input for notes or descriptions."
            code={`import { Textarea } from "@/components/ui/textarea";

<div className="grid gap-2 max-w-sm">
  <Label htmlFor="notes">Notes</Label>
  <Textarea id="notes" placeholder="Describe the incident..." rows={3} />
</div>`}
          >
            <div className="grid gap-2 max-w-sm w-full">
              <Label htmlFor="demo-textarea">Notes</Label>
              <Textarea id="demo-textarea" placeholder="Describe the incident or observation..." rows={3} />
            </div>
          </Preview>
        </Group>

        <Group title="Select">
          <Preview
            label="Dropdown — used for time range picker in ContentHeader.tsx."
            code={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

<Select defaultValue="1h">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="15m">Last 15 minutes</SelectItem>
    <SelectItem value="1h">Last 1 hour</SelectItem>
    <SelectItem value="6h">Last 6 hours</SelectItem>
    <SelectItem value="24h">Last 24 hours</SelectItem>
    <SelectItem value="7d">Last 7 days</SelectItem>
  </SelectContent>
</Select>`}
          >
            <div className="grid gap-2 max-w-xs w-full">
              <Label>Time Range</Label>
              <Select defaultValue="1h">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">Last 15 minutes</SelectItem>
                  <SelectItem value="1h">Last 1 hour</SelectItem>
                  <SelectItem value="6h">Last 6 hours</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Preview>
        </Group>

        <Group title="Form Layout">
          <Preview
            label="Two-column grid — standard layout for filter panels and settings forms."
            code={`<div className="grid grid-cols-2 gap-4">
  <div className="grid gap-1.5">
    <Label htmlFor="region">Region</Label>
    <Input id="region" placeholder="e.g. us-ashburn-1" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="status">Status</Label>
    <Select>
      <SelectTrigger id="status"><SelectValue placeholder="All statuses" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="healthy">Healthy</SelectItem>
        <SelectItem value="warning">Warning</SelectItem>
        <SelectItem value="critical">Critical</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <div className="col-span-2 grid gap-1.5">
    <Label htmlFor="notes">Notes</Label>
    <Textarea id="notes" placeholder="Additional filter notes..." rows={2} />
  </div>
</div>`}
          >
            <div className="grid grid-cols-2 gap-4 max-w-md w-full">
              <div className="grid gap-1.5">
                <Label htmlFor="f-region">Region</Label>
                <Input id="f-region" placeholder="e.g. us-ashburn-1" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="f-status">Status</Label>
                <Select>
                  <SelectTrigger id="f-status"><SelectValue placeholder="All statuses" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 grid gap-1.5">
                <Label htmlFor="f-notes">Notes</Label>
                <Textarea id="f-notes" placeholder="Additional filter notes..." rows={2} />
              </div>
            </div>
          </Preview>
        </Group>

        <Group title="Props Reference">
          <TokenTable>
            <TokenRow name="Input.type"          value="text | email | password | search | number | file" description="HTML input type" />
            <TokenRow name="Input.disabled"      value="boolean" description="Disables the field, applies opacity-50" />
            <TokenRow name="Input.aria-invalid"  value="true | false" description="Triggers error ring styling" />
            <TokenRow name="Select.defaultValue" value="string" description="Uncontrolled default selection" />
            <TokenRow name="Select.value + onValueChange" value="string + fn" description="Controlled selection" />
            <TokenRow name="Textarea.rows"       value="number" description="Initial visible row count" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
