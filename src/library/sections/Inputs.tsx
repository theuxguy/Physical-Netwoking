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
        description="Form controls built on shadcn/ui. All inputs use --input-background (#f3f3f5) as fill and support disabled, error (aria-invalid), and focus states. Pair with Label for accessibility."
      />

      <div className="space-y-8">
        <Group title="Text Input">
          <Preview label="Default input with label" code={`<Label>Region Code</Label>\n<Input placeholder="e.g. IAD" />`}>
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="demo-input">Region Code</Label>
              <Input id="demo-input" placeholder="e.g. IAD, LHR, NRT" />
            </div>
          </Preview>

          <Preview label="States — default · focused (click) · disabled · error">
            <div className="grid gap-3 max-w-sm w-full">
              <Input placeholder="Default state" />
              <Input placeholder="Disabled" disabled />
              <Input placeholder="Error state" aria-invalid="true" value="bad-value" readOnly />
            </div>
          </Preview>
        </Group>

        <Group title="Search">
          <Preview label="Search input — used in MapSection map overlay" code={`<Input type="text" placeholder="Find resource on map" />`}>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input className="pl-9" type="text" placeholder="Find resource on map" />
            </div>
          </Preview>

          <Preview label="App-style map search — exact class pattern from MapSection.tsx">
            <input
              type="text"
              placeholder="Find resource on map"
              className="px-3 py-2 border border-gray-300 dark:border-[#404040] rounded bg-white dark:bg-[#1a1a1a] dark:text-white dark:placeholder-gray-400 text-sm w-64"
            />
          </Preview>
        </Group>

        <Group title="Textarea">
          <Preview label="Multi-line input for notes or descriptions" code={`<Textarea placeholder="Add notes..." />`}>
            <div className="grid gap-2 max-w-sm w-full">
              <Label htmlFor="demo-textarea">Notes</Label>
              <Textarea id="demo-textarea" placeholder="Describe the incident or observation..." rows={3} />
            </div>
          </Preview>
        </Group>

        <Group title="Select">
          <Preview label="Dropdown selector — used for time range in ContentHeader" code={`<Select>\n  <SelectTrigger />\n  <SelectContent>\n    <SelectItem value="1h">Last 1 hour</SelectItem>\n  </SelectContent>\n</Select>`}>
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

        <Group title="With Form Layout">
          <Preview label="Two-column form grid — standard layout for filter panels">
            <div className="grid grid-cols-2 gap-4 max-w-md w-full">
              <div className="grid gap-1.5">
                <Label htmlFor="f-region">Region</Label>
                <Input id="f-region" placeholder="e.g. us-ashburn-1" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="f-status">Status</Label>
                <Select>
                  <SelectTrigger id="f-status">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
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
            <TokenRow name="Input.type" value="text | email | password | search | number | file" description="HTML input type" />
            <TokenRow name="Input.disabled" value="boolean" description="Disables the field, applies opacity-50" />
            <TokenRow name="Input.aria-invalid" value="true | false" description="Triggers error ring styling" />
            <TokenRow name="Select.defaultValue" value="string" description="Uncontrolled default selection" />
            <TokenRow name="Select.value + onValueChange" value="string + fn" description="Controlled selection" />
            <TokenRow name="Textarea.rows" value="number" description="Initial visible row count" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
