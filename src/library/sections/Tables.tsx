import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from "../../app/components/ui/table";
import { Badge } from "../../app/components/ui/badge";

// Hex tokens — no rgba. Canonical values matching StatusIndicators.
const STATUS_COLORS = {
  Healthy:  { bg: "#dce6d3", border: "#508223", text: "#3a5e18" },
  Warning:  { bg: "#f8e6cf", border: "#ac630c", text: "#7a4400" },
  Critical: { bg: "#f7d8d3", border: "#d63b25", text: "#8b1a0a" },
};

type Status = keyof typeof STATUS_COLORS;

const REGIONS = [
  { code: "IAD", name: "US Ashburn",   ad1: "Healthy",  ad2: "Healthy",  ad3: "Warning",  fastConnect: "Healthy",  backbone: "Healthy"  },
  { code: "PHX", name: "US Phoenix",   ad1: "Warning",  ad2: "Healthy",  ad3: "Healthy",  fastConnect: "Critical", backbone: "Warning"  },
  { code: "LHR", name: "UK London",    ad1: "Critical", ad2: "Warning",  ad3: "Healthy",  fastConnect: "Healthy",  backbone: "Healthy"  },
  { code: "FRA", name: "DE Frankfurt", ad1: "Healthy",  ad2: "Healthy",  ad3: "Healthy",  fastConnect: "Healthy",  backbone: "Healthy"  },
];

function StatusCell({ status }: { status: Status }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: c.border }} />
      {status}
    </span>
  );
}

export function Tables() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Tables"
        description="Data tables built with shadcn/ui Table primitives. The RegionHealthTable component extends this pattern with expandable columns, close buttons, and inline status cells."
      />

      <div className="space-y-8">
        <Group title="Basic Table">
          <Preview
            label="Standard table with header, rows, and inline status cells."
            code={`import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";

// Hex status tokens — no rgba
const STATUS_COLORS = {
  Healthy:  { bg: "#dce6d3", border: "#508223", text: "#3a5e18" },
  Warning:  { bg: "#f8e6cf", border: "#ac630c", text: "#7a4400" },
  Critical: { bg: "#f7d8d3", border: "#d63b25", text: "#8b1a0a" },
};

function StatusCell({ status }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: c.bg, color: c.text, border: \`1px solid \${c.border}\` }}
    >
      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: c.border }} />
      {status}
    </span>
  );
}

<Table>
  <TableCaption>Network region health overview</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Code</TableHead>
      <TableHead>Region</TableHead>
      <TableHead>AD-1</TableHead>
      <TableHead>AD-2</TableHead>
      <TableHead>AD-3</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {regions.map(r => (
      <TableRow key={r.code}>
        <TableCell className="font-mono font-medium">{r.code}</TableCell>
        <TableCell>{r.name}</TableCell>
        <TableCell><StatusCell status={r.ad1} /></TableCell>
        <TableCell><StatusCell status={r.ad2} /></TableCell>
        <TableCell><StatusCell status={r.ad3} /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
          >
            <Table>
              <TableCaption>Network region health overview</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Code</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>AD-1</TableHead>
                  <TableHead>AD-2</TableHead>
                  <TableHead>AD-3</TableHead>
                  <TableHead>FastConnect</TableHead>
                  <TableHead>Backbone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {REGIONS.map((r) => (
                  <TableRow key={r.code}>
                    <TableCell className="font-mono font-medium text-slate-700 dark:text-slate-300">{r.code}</TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400">{r.name}</TableCell>
                    <TableCell><StatusCell status={r.ad1 as Status} /></TableCell>
                    <TableCell><StatusCell status={r.ad2 as Status} /></TableCell>
                    <TableCell><StatusCell status={r.ad3 as Status} /></TableCell>
                    <TableCell><StatusCell status={r.fastConnect as Status} /></TableCell>
                    <TableCell><StatusCell status={r.backbone as Status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Preview>
        </Group>

        <Group title="Expandable Column Pattern">
          <Preview
            label="RegionHealthTable pattern — fixed metric rows, dynamic region columns each with a close button."
            code={`// Fixed metric rows + dynamic region columns
// Each column is added when a region is clicked on the map.
// The × button calls onCloseBlock(regionCode) to remove the column.

function RegionHealthTable({ expandedRegions, onCloseRegion }) {
  const metrics = ["Availability", "Performance", "Reliability"];
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-slate-200 dark:border-[#404040]">
          <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 w-32">Metric</th>
          {expandedRegions.map(code => (
            <th key={code} className="py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between gap-4">
                <span>{code}</span>
                <button onClick={() => onCloseRegion(code)}
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {metrics.map(metric => (
          <tr key={metric} className="border-b border-slate-100 dark:border-[#2a2a2a]">
            <td className="py-3 px-3 text-xs text-slate-500 font-medium">{metric}</td>
            {expandedRegions.map(code => (
              <td key={code} className="py-3 px-3">
                <StatusCell status={getStatus(code, metric)} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 w-32">Metric</th>
                    {["IAD", "LHR"].map((code) => (
                      <th key={code} className="py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center justify-between gap-4">
                          <span>{code}</span>
                          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg leading-none">×</button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["Availability", "Performance", "Reliability"].map((metric) => (
                    <tr key={metric} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-3 text-xs text-slate-500 dark:text-slate-400 font-medium">{metric}</td>
                      <td className="py-3 px-3"><StatusCell status="Healthy" /></td>
                      <td className="py-3 px-3"><StatusCell status="Warning" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Preview>
        </Group>

        <Group title="Sortable Header Pattern">
          <Preview
            label="Column header with sort direction indicators — used in IssuesChart.tsx issue list."
            code={`// Sortable column header button
function SortableHead({ label, direction }: { label: string; direction: "asc" | "desc" | null }) {
  return (
    <TableHead>
      <button className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
        {label}
        {direction === "asc"  && <span className="text-[10px]">↑</span>}
        {direction === "desc" && <span className="text-[10px]">↓</span>}
        {!direction           && <span className="text-[10px] text-slate-300 dark:text-slate-600">↕</span>}
      </button>
    </TableHead>
  );
}`}
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {[
                      { label: "Region",    sorted: "asc" as const },
                      { label: "Status",    sorted: null },
                      { label: "Uptime",    sorted: "desc" as const },
                      { label: "Incidents", sorted: null },
                    ].map(({ label, sorted }) => (
                      <TableHead key={label}>
                        <button className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                          {label}
                          {sorted === "asc"  && <span className="text-[10px]">↑</span>}
                          {sorted === "desc" && <span className="text-[10px]">↓</span>}
                          {!sorted           && <span className="text-[10px] text-slate-300 dark:text-slate-600">↕</span>}
                        </button>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { region: "US Ashburn", status: "Healthy" as Status,  uptime: "99.97%", incidents: 0 },
                    { region: "UK London",  status: "Critical" as Status, uptime: "94.2%",  incidents: 3 },
                  ].map((row) => (
                    <TableRow key={row.region}>
                      <TableCell className="font-medium">{row.region}</TableCell>
                      <TableCell><StatusCell status={row.status} /></TableCell>
                      <TableCell className="tabular-nums">{row.uptime}</TableCell>
                      <TableCell>
                        {row.incidents > 0
                          ? <Badge variant="destructive">{row.incidents}</Badge>
                          : <span className="text-slate-400 text-xs">—</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Preview>
        </Group>

        <Group title="Props Reference">
          <TokenTable>
            <TokenRow name="Table"         value="div > table"  description="Responsive wrapper + full-width table" />
            <TokenRow name="TableHeader"   value="thead"        description="Sticky-compatible header group" />
            <TokenRow name="TableHead"     value="th"           description="h-10 px-2 text-left text-muted-foreground" />
            <TokenRow name="TableBody"     value="tbody"        description="tr last:border-0 pattern" />
            <TokenRow name="TableRow"      value="tr"           description="border-b transition-colors hover:bg-muted/50" />
            <TokenRow name="TableCell"     value="td"           description="p-2 align-middle" />
            <TokenRow name="TableCaption"  value="caption"      description="mt-4 text-sm text-muted-foreground" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
