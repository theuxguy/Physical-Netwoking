import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../app/components/ui/table";
import { Badge } from "../../app/components/ui/badge";

const STATUS_COLORS = {
  Healthy: { bg: "rgba(80,130,35,0.08)", border: "#508223", text: "#508223" },
  Warning: { bg: "rgba(222,128,17,0.08)", border: "#de8011", text: "#de8011" },
  Critical: { bg: "rgba(214,59,37,0.08)", border: "#d63b25", text: "#d63b25" },
};

type Status = keyof typeof STATUS_COLORS;

const REGIONS = [
  { code: "IAD", name: "US Ashburn", ad1: "Healthy", ad2: "Healthy", ad3: "Warning", fastConnect: "Healthy", backbone: "Healthy" },
  { code: "PHX", name: "US Phoenix", ad1: "Warning", ad2: "Healthy", ad3: "Healthy", fastConnect: "Critical", backbone: "Warning" },
  { code: "LHR", name: "UK London", ad1: "Critical", ad2: "Warning", ad3: "Healthy", fastConnect: "Healthy", backbone: "Healthy" },
  { code: "FRA", name: "DE Frankfurt", ad1: "Healthy", ad2: "Healthy", ad3: "Healthy", fastConnect: "Healthy", backbone: "Healthy" },
];

function StatusCell({ status }: { status: Status }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: c.text }} />
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
          <Preview label="Standard table with header and status cells" code={`<Table>\n  <TableHeader><TableRow><TableHead>...</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>...</TableCell></TableRow></TableBody>\n</Table>`}>
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
          <Preview label="RegionHealthTable pattern — fixed metric rows, dynamic region columns with close button">
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
                      <td className="py-2.5 px-3 text-xs text-slate-500 dark:text-slate-400 font-medium">{metric}</td>
                      <td className="py-2.5 px-3"><StatusCell status="Healthy" /></td>
                      <td className="py-2.5 px-3"><StatusCell status="Warning" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Preview>
        </Group>

        <Group title="Sortable Header Pattern">
          <Preview label="Column header with sort indicators">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {[
                      { label: "Region", sorted: "asc" },
                      { label: "Status", sorted: null },
                      { label: "Uptime", sorted: "desc" },
                      { label: "Incidents", sorted: null },
                    ].map(({ label, sorted }) => (
                      <TableHead key={label}>
                        <button className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                          {label}
                          {sorted === "asc" && <span className="text-[10px]">↑</span>}
                          {sorted === "desc" && <span className="text-[10px]">↓</span>}
                          {!sorted && <span className="text-[10px] text-slate-300 dark:text-slate-600">↕</span>}
                        </button>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { region: "US Ashburn", status: "Healthy", uptime: "99.97%", incidents: 0 },
                    { region: "UK London", status: "Critical", uptime: "94.2%", incidents: 3 },
                  ].map((row) => (
                    <TableRow key={row.region}>
                      <TableCell className="font-medium">{row.region}</TableCell>
                      <TableCell><StatusCell status={row.status as Status} /></TableCell>
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
            <TokenRow name="Table" value="div > table" description="Responsive wrapper + full-width table" />
            <TokenRow name="TableHeader" value="thead" description="Sticky-compatible header group" />
            <TokenRow name="TableHead" value="th" description="h-10 px-2 text-left text-muted-foreground" />
            <TokenRow name="TableBody" value="tbody" description="tr last:border-0 pattern" />
            <TokenRow name="TableRow" value="tr" description="border-b transition-colors hover:bg-muted/50" />
            <TokenRow name="TableCell" value="td" description="p-2 align-middle" />
            <TokenRow name="TableCaption" value="caption" description="mt-4 text-sm text-muted-foreground" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
