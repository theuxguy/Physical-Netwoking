import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { Badge } from "../../app/components/ui/badge";
import { TrendingUp, AlertTriangle, Activity } from "lucide-react";

export function Cards() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Cards"
        description="Structural container for grouped content. Built with shadcn/ui Card primitives. Cards use --card background and border-border. Import from src/app/components/ui/card.tsx."
      />

      <div className="space-y-8">
        <Group title="Anatomy">
          <Preview label="Full card with all sub-components" code={`<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n    <CardDescription>Description</CardDescription>\n    <CardAction>...</CardAction>\n  </CardHeader>\n  <CardContent>...</CardContent>\n  <CardFooter>...</CardFooter>\n</Card>`}>
            <div className="max-w-sm w-full">
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
          <Preview label="Health metric cards — pattern used in MetricsSection.tsx">
            <div className="grid grid-cols-3 gap-4 w-full">
              {[
                { label: "Availability", value: "99.97%", trend: "+0.02%", status: "healthy", icon: Activity },
                { label: "Performance", value: "94.2%", trend: "-1.3%", status: "warning", icon: TrendingUp },
                { label: "Reliability", value: "87.4%", trend: "-5.1%", status: "critical", icon: AlertTriangle },
              ].map(({ label, value, trend, status, icon: Icon }) => {
                const colors = {
                  healthy: { bg: "rgba(80,130,35,0.08)", border: "#508223", text: "#508223" },
                  warning: { bg: "rgba(222,128,17,0.08)", border: "#de8011", text: "#de8011" },
                  critical: { bg: "rgba(214,59,37,0.08)", border: "#d63b25", text: "#d63b25" },
                }[status]!;
                return (
                  <div
                    key={label}
                    className="rounded-lg p-4 flex flex-col gap-2"
                    style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</span>
                      <Icon className="w-3.5 h-3.5" style={{ color: colors.text }} />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
                    <p className="text-xs font-medium" style={{ color: colors.text }}>{trend} vs last period</p>
                  </div>
                );
              })}
            </div>
          </Preview>
        </Group>

        <Group title="Simple Content Card">
          <Preview label="Card with just content — no header or footer">
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
                  <p className="text-3xl font-bold mt-1 text-[#d63b25]">7</p>
                  <p className="text-xs text-slate-500 mt-1">3 critical · 4 warning</p>
                </CardContent>
              </Card>
            </div>
          </Preview>
        </Group>

        <Group title="Props Reference">
          <TokenTable>
            <TokenRow name="Card" value="div wrapper" description="Root container — bg-card, border, rounded-xl shadow-sm" />
            <TokenRow name="CardHeader" value="div" description="Padding + flex layout for title/description/action" />
            <TokenRow name="CardTitle" value="div" description="font-semibold leading-none tracking-tight" />
            <TokenRow name="CardDescription" value="div" description="text-muted-foreground text-sm" />
            <TokenRow name="CardAction" value="div" description="Absolutely positioned top-right slot for badges/buttons" />
            <TokenRow name="CardContent" value="div" description="px-6 pb-6 — main content area" />
            <TokenRow name="CardFooter" value="div" description="px-6 pb-6 flex items-center — action row" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
