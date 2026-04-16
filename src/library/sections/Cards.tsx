import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter, CardAction,
} from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { Badge } from "../../app/components/ui/badge";
import { TrendingUp, AlertTriangle, Activity } from "lucide-react";

// Hex tokens — no rgba. Canonical values matching StatusIndicators.
const STATUS_COLORS = {
  healthy:  { bg: "#dce6d3", border: "#508223", text: "#3a5e18" },
  warning:  { bg: "#f8e6cf", border: "#ac630c", text: "#7a4400" },
  critical: { bg: "#f7d8d3", border: "#d63b25", text: "#8b1a0a" },
};

export function Cards() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Cards"
        description="Structural container for grouped content. Built with shadcn/ui Card primitives. Cards use --card background and border-border. Import from src/app/components/ui/card.tsx."
      />

      <div className="space-y-8">
        <Group title="Anatomy">
          <Preview
            label="Full card with all sub-components — CardHeader · CardTitle · CardDescription · CardAction · CardContent · CardFooter."
            code={`import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Network Region — IAD</CardTitle>
    <CardDescription>us-ashburn-1 · North America</CardDescription>
    <CardAction>
      <Badge variant="outline">Healthy</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-slate-600 dark:text-slate-400">
      All availability domains are operating within expected thresholds.
    </p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button size="sm" variant="outline">View region</Button>
    <Button size="sm" variant="ghost">Dismiss</Button>
  </CardFooter>
</Card>`}
          >
            <div className="max-w-sm w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Network Region — IAD</CardTitle>
                  <CardDescription>us-ashburn-1 · North America</CardDescription>
                  <CardAction><Badge variant="outline">Healthy</Badge></CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    All availability domains are operating within expected thresholds. No active incidents.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="outline">View region</Button>
                  <Button size="sm" variant="ghost">Dismiss</Button>
                </CardFooter>
              </Card>
            </div>
          </Preview>
        </Group>

        <Group title="Metric Card">
          <Preview
            label="Health metric cards — pattern used in MetricsSection.tsx. Status tint uses hex bg + border, no rgba."
            code={`// Hex tokens — no rgba
const STATUS_COLORS = {
  healthy:  { bg: "#dce6d3", border: "#508223", text: "#3a5e18" },
  warning:  { bg: "#f8e6cf", border: "#ac630c", text: "#7a4400" },
  critical: { bg: "#f7d8d3", border: "#d63b25", text: "#8b1a0a" },
};

function MetricCard({ label, value, trend, status, Icon }) {
  const c = STATUS_COLORS[status];
  return (
    <div
      className="rounded-lg p-4 flex flex-col gap-2"
      style={{ backgroundColor: c.bg, border: \`1px solid \${c.border}\` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
        <Icon className="w-3.5 h-3.5" style={{ color: c.text }} />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="text-xs font-medium" style={{ color: c.text }}>{trend} vs last period</p>
    </div>
  );
}`}
          >
            <div className="grid grid-cols-3 gap-4 w-full">
              {([
                { label: "Availability", value: "99.97%", trend: "+0.02%", status: "healthy" as const, icon: Activity },
                { label: "Performance",  value: "94.2%",  trend: "-1.3%",  status: "warning" as const, icon: TrendingUp },
                { label: "Reliability",  value: "87.4%",  trend: "-5.1%",  status: "critical" as const, icon: AlertTriangle },
              ]).map(({ label, value, trend, status, icon: Icon }) => {
                const c = STATUS_COLORS[status];
                return (
                  <div key={label} className="rounded-lg p-4 flex flex-col gap-2"
                    style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
                      <Icon className="w-3.5 h-3.5" style={{ color: c.text }} />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
                    <p className="text-xs font-medium" style={{ color: c.text }}>{trend} vs last period</p>
                  </div>
                );
              })}
            </div>
          </Preview>
        </Group>

        <Group title="Simple Content Card">
          <Preview
            label="Card with content only — no header or footer needed."
            code={`<Card>
  <CardContent className="pt-6">
    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Active Regions</p>
    <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-slate-50">34</p>
    <p className="text-xs text-slate-500 mt-1">across 12 geographies</p>
  </CardContent>
</Card>`}
          >
            <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Active Regions</p>
                  <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-slate-50">34</p>
                  <p className="text-xs text-slate-500 mt-1">across 12 geographies</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Open Incidents</p>
                  <p className="text-3xl font-bold mt-1 text-[#8b1a0a]">7</p>
                  <p className="text-xs text-slate-500 mt-1">3 critical · 4 warning</p>
                </CardContent>
              </Card>
            </div>
          </Preview>
        </Group>

        <Group title="Props Reference">
          <TokenTable>
            <TokenRow name="Card"            value="div wrapper"    description="Root container — bg-card, border, rounded-xl shadow-sm" />
            <TokenRow name="CardHeader"      value="div"            description="Padding + flex layout for title / description / action" />
            <TokenRow name="CardTitle"       value="div"            description="font-semibold leading-none tracking-tight" />
            <TokenRow name="CardDescription" value="div"            description="text-muted-foreground text-sm" />
            <TokenRow name="CardAction"      value="div"            description="Absolutely positioned top-right slot for badges / buttons" />
            <TokenRow name="CardContent"     value="div"            description="px-6 pb-6 — main content area" />
            <TokenRow name="CardFooter"      value="div"            description="px-6 pb-6 flex items-center — action row" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
