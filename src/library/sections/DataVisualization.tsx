import { SectionHeader, Group, Preview, TokenTable, TokenRow } from "../ui";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const INCIDENT_DATA = [
  { time: "00:00", critical: 2, warning: 4, healthy: 28 },
  { time: "04:00", critical: 1, warning: 3, healthy: 30 },
  { time: "08:00", critical: 4, warning: 6, healthy: 24 },
  { time: "12:00", critical: 3, warning: 5, healthy: 26 },
  { time: "16:00", critical: 5, warning: 7, healthy: 22 },
  { time: "20:00", critical: 2, warning: 4, healthy: 28 },
  { time: "24:00", critical: 1, warning: 2, healthy: 31 },
];

const AVAILABILITY_DATA = [
  { region: "IAD", availability: 99.97, performance: 98.2, reliability: 99.1 },
  { region: "LHR", availability: 98.4, performance: 96.8, reliability: 97.5 },
  { region: "FRA", availability: 99.8, performance: 99.1, reliability: 99.5 },
  { region: "NRT", availability: 97.2, performance: 94.3, reliability: 96.1 },
  { region: "SIN", availability: 99.1, performance: 97.6, reliability: 98.3 },
  { region: "SYD", availability: 96.5, performance: 93.2, reliability: 95.8 },
];

const TIMELINE_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  latency: 40 + Math.sin(i * 0.5) * 15 + Math.random() * 10,
  throughput: 850 + Math.cos(i * 0.4) * 120 + Math.random() * 80,
}));

const TOOLTIP_STYLE = {
  backgroundColor: "var(--color-card, #ffffff)",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "8px",
  fontSize: "12px",
};

export function DataVisualization() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Data Visualization"
        description="Charts are built with Recharts v2 using ResponsiveContainer for fluid width. Use the status color palette (green/amber/red) for health data, and the chart-1…5 CSS palette for multi-series data. Always set a fixed height on the chart wrapper."
      />

      <div className="space-y-8">
        <Group title="Stacked Bar Chart — Incident Breakdown">
          <Preview label="Used in IssuesChart.tsx — stacked bars show critical / warning / healthy distribution over time" code={`<BarChart data={data}>\n  <Bar dataKey="critical" fill="#d63b25" stackId="a" />\n  <Bar dataKey="warning" fill="#de8011" stackId="a" />\n  <Bar dataKey="healthy" fill="#508223" stackId="a" />\n</BarChart>`}>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INCIDENT_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="critical" fill="#d63b25" stackId="a" name="Critical" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="warning" fill="#de8011" stackId="a" name="Warning" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="healthy" fill="#508223" stackId="a" name="Healthy" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Preview>
        </Group>

        <Group title="Grouped Bar Chart — Region Metrics">
          <Preview label="Multi-metric comparison across regions — used in BackboneMatrix-style views" code={`<BarChart data={data}>\n  <Bar dataKey="availability" fill="var(--color-chart-1)" />\n  <Bar dataKey="performance" fill="var(--color-chart-2)" />\n</BarChart>`}>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AVAILABILITY_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                  <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => `${v.toFixed(1)}%`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="availability" fill="#508223" name="Availability" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="performance" fill="#de8011" name="Performance" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="reliability" fill="#227e9e" name="Reliability" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Preview>
        </Group>

        <Group title="Area Chart — Latency Timeline">
          <Preview label="Used in IncidentChart.tsx — filled area shows metric over time" code={`<AreaChart data={data}>\n  <Area type="monotone" dataKey="latency" stroke="#227e9e" fill="rgba(34,126,158,0.12)" />\n</AreaChart>`}>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIMELINE_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
                  <YAxis tick={{ fontSize: 11 }} unit="ms" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => `${v.toFixed(1)}ms`} />
                  <Area
                    type="monotone"
                    dataKey="latency"
                    stroke="#227e9e"
                    strokeWidth={2}
                    fill="rgba(34,126,158,0.12)"
                    name="Latency"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Preview>
        </Group>

        <Group title="Line Chart — Multi-series Throughput">
          <Preview label="Multiple lines with legend — compare metrics across time">
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TIMELINE_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="throughput" stroke="#508223" strokeWidth={2} dot={false} name="Throughput (Mbps)" />
                  <Line type="monotone" dataKey="latency" stroke="#d63b25" strokeWidth={2} dot={false} name="Latency (ms)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Preview>
        </Group>

        <Group title="Implementation Reference">
          <TokenTable>
            <TokenRow name="ResponsiveContainer" value="width='100%' height={fixed}" description="Always wrap charts; set explicit px height on the wrapper div" />
            <TokenRow name="CartesianGrid strokeDasharray" value="'3 3'" description="Standard dashed grid; stroke rgba(0,0,0,0.06)" />
            <TokenRow name="Tooltip contentStyle" value="bg-card border rounded-lg text-xs" description="Match app surface styling for consistency" />
            <TokenRow name="Bar radius" value="[2,2,0,0]" description="Rounds top corners of bars only" />
            <TokenRow name="margin" value="top:4 right:16 left:-16 bottom:0" description="Compensates for YAxis label width" />
            <TokenRow name="Series: healthy" value="#508223" description="Green — healthy metric lines/bars" />
            <TokenRow name="Series: warning" value="#de8011" description="Amber — warning / degraded metrics" />
            <TokenRow name="Series: critical" value="#d63b25" description="Red — critical / incident count" />
            <TokenRow name="Series: brand" value="#227e9e" description="Cyan — neutral metrics (latency, throughput)" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
