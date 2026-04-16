import { useState } from "react";
import { Plus, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { AddComponentDrawer } from "./AddComponentDrawer";
import { MonitoringCard } from "./MonitoringCard";
import {
  DashboardItem, Status, COUNTRIES, CENTERS, MONITORING_METRICS,
  getStatus, worstStatus, ISSUE_DESCRIPTIONS, seededRandom,
} from "./dashboardData";

// ── status-summary helpers ──────────────────────────────────────────────────

function getAllStatuses(item: DashboardItem): Status[] {
  if (item.type === "region") {
    return COUNTRIES[item.region].flatMap((c) =>
      (CENTERS[c] ?? []).flatMap((dc) =>
        MONITORING_METRICS.map((m) => getStatus(`${item.region}-${c}-${dc}-${m}`))
      )
    );
  }
  if (item.type === "country") {
    return (CENTERS[item.country!] ?? []).flatMap((dc) =>
      MONITORING_METRICS.map((m) => getStatus(`${item.region}-${item.country}-${dc}-${m}`))
    );
  }
  const seed = `${item.region}-${item.country}-${item.center}`;
  return MONITORING_METRICS.map((m) => getStatus(`${seed}-${m}`));
}

// ── issue helpers ───────────────────────────────────────────────────────────

type Issue = {
  id: string;
  component: string;
  severity: "critical" | "warning";
  description: string;
  timestamp: string;
};

function getIssues(item: DashboardItem): Issue[] {
  const seed = item.id;
  const severities: Array<"critical" | "warning"> = ["critical", "warning", "critical", "warning", "warning"];
  const issues: Issue[] = [];
  severities.forEach((sev, i) => {
    const r = Math.abs(seededRandom(`${seed}-issue-${i}`));
    if (r < 0.6) {
      const descs = ISSUE_DESCRIPTIONS[sev];
      const di = Math.floor(Math.abs(seededRandom(`${seed}-desc-${i}`)) * descs.length);
      const h = Math.floor(Math.abs(seededRandom(`${seed}-time-${i}`)) * 24);
      const m = Math.floor(Math.abs(seededRandom(`${seed}-min-${i}`)) * 60);
      issues.push({
        id: `${seed}-${i}`,
        component: item.type === "center" ? item.center! : item.type === "country" ? item.country! : item.regionLabel,
        severity: sev,
        description: descs[di],
        timestamp: `${h}h ${m}m ago`,
      });
    }
  });
  return issues;
}

// ── status colors (shared) ──────────────────────────────────────────────────

const STATUS_COLORS = {
  critical: {
    cardBg: "bg-[rgba(214,59,37,0.08)] dark:bg-[rgba(214,59,37,0.12)]",
    cardBorder: "border-[rgba(214,59,37,0.4)]",
    cardText: "text-[#a02a18] dark:text-[#e85540]",
    cardLabel: "text-[#666] dark:text-[#999]",
    icon: "text-[#d63b25]",
    dot: "bg-[#d63b25]",
    badgeBg: "bg-[rgba(214,59,37,0.15)]",
    badgeBorder: "border-[#d63b25]",
    badgeText: "text-[#a02a18] dark:text-[#E4E4E4]",
  },
  warning: {
    cardBg: "bg-[rgba(222,128,17,0.08)] dark:bg-[rgba(222,128,17,0.12)]",
    cardBorder: "border-[rgba(222,128,17,0.4)]",
    cardText: "text-[#7a4a00] dark:text-[#de8011]",
    cardLabel: "text-[#666] dark:text-[#999]",
    icon: "text-[#de8011]",
    dot: "bg-[#de8011]",
    badgeBg: "bg-[rgba(222,128,17,0.15)]",
    badgeBorder: "border-[rgba(222,128,17,0.6)]",
    badgeText: "text-[#7a4a00] dark:text-[#E4E4E4]",
  },
  healthy: {
    cardBg: "bg-[rgba(80,130,35,0.08)] dark:bg-[rgba(80,130,35,0.12)]",
    cardBorder: "border-[rgba(80,130,35,0.4)]",
    cardText: "text-[#3a5c1a] dark:text-[#508223]",
    cardLabel: "text-[#666] dark:text-[#999]",
    icon: "text-[#508223]",
    dot: "bg-[#508223]",
    badgeBg: "bg-[rgba(80,130,35,0.15)]",
    badgeBorder: "border-[#508223]",
    badgeText: "text-[#3a5c1a] dark:text-[#E4E4E4]",
  },
};

function StatusBadge({ status }: { status: Status }) {
  const s = STATUS_COLORS[status];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded ${s.badgeBg} border ${s.badgeBorder}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} shrink-0`} />
      <span className={`text-[11px] font-medium capitalize ${s.badgeText}`}>{status}</span>
    </div>
  );
}

// ── Dashboard ───────────────────────────────────────────────────────────────

export function Dashboard() {
  const [items, setItems] = useState<DashboardItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addItem = (item: DashboardItem) => {
    if (!items.find((i) => i.id === item.id)) {
      setItems([...items, item]);
    }
  };

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  const hasItems = items.length > 0;

  // Aggregate status counts across all items
  const allStatuses = items.flatMap(getAllStatuses);
  const total = allStatuses.length;
  const criticalPct = total > 0 ? Math.round((allStatuses.filter((s) => s === "critical").length / total) * 100) : null;
  const warningPct  = total > 0 ? Math.round((allStatuses.filter((s) => s === "warning").length  / total) * 100) : null;
  const healthyPct  = total > 0 ? Math.round((allStatuses.filter((s) => s === "healthy").length  / total) * 100) : null;

  const allIssues = items.flatMap(getIssues);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0f0f0f] overflow-auto">

      {/* Page header */}
      <div className="border-b border-[#d5d5d5] dark:border-[#333333] py-4 px-10">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Dashboard</span>
        </div>
        <h1 className="text-2xl dark:text-white">Custom Dashboard</h1>
      </div>

      {/* Main content */}
      <div className="px-10 py-6 flex flex-col gap-6">

        {/* Add component button */}
        <div className="self-start">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add component
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {(["critical", "warning", "healthy"] as const).map((sev) => {
            const pct = sev === "critical" ? criticalPct : sev === "warning" ? warningPct : healthyPct;
            const s = STATUS_COLORS[sev];
            const Icon = sev === "critical" ? AlertCircle : sev === "warning" ? AlertTriangle : CheckCircle;
            return (
              <div key={sev} className={`rounded-lg border ${s.cardBorder} ${s.cardBg} px-6 py-5 flex items-center justify-between`}>
                <div>
                  <p className={`text-sm font-medium capitalize mb-1 ${s.cardLabel}`}>{sev}</p>
                  <p className={`text-3xl font-semibold ${s.cardText}`}>{pct !== null ? `${pct}%` : "- %"}</p>
                </div>
                <Icon className={`w-8 h-8 opacity-60 ${s.icon}`} />
              </div>
            );
          })}
        </div>

        {/* Monitoring */}
        <div>
          <p className="text-sm text-[#444] dark:text-[#aaa] mb-3">Monitoring</p>
          {!hasItems ? (
            <div className="border border-[#d8d8d8] dark:border-[#404040] rounded-lg h-[180px] flex items-center justify-center text-sm text-gray-400 dark:text-gray-600">
              Add a component to see monitoring data
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <MonitoringCard key={item.id} item={item} onRemove={() => removeItem(item.id)} />
              ))}
            </div>
          )}
        </div>

        {/* Issues */}
        <div>
          <p className="text-sm text-[#444] dark:text-[#aaa] mb-3">Issues</p>
          <div className="border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-hidden">
            {!hasItems || allIssues.length === 0 ? (
              <div className="h-[180px] flex items-center justify-center text-sm text-gray-400 dark:text-gray-600">
                {!hasItems ? "Add a component to see issues" : "No issues detected"}
              </div>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f8f8f8] dark:bg-[#252525] border-b border-[#d8d8d8] dark:border-[#404040]">
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-[#555] dark:text-[#aaa]">Severity</th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-[#555] dark:text-[#aaa]">Component</th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-[#555] dark:text-[#aaa]">Description</th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-[#555] dark:text-[#aaa]">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {allIssues.map((issue, i) => (
                    <tr key={issue.id} className={`border-b border-[#ebebeb] dark:border-[#333] last:border-0 ${i % 2 === 0 ? "" : "bg-[#fafafa] dark:bg-[#1c1c1c]"}`}>
                      <td className="px-4 py-2.5"><StatusBadge status={issue.severity} /></td>
                      <td className="px-4 py-2.5 text-[13px] text-[#333] dark:text-[#ccc] font-medium">{issue.component}</td>
                      <td className="px-4 py-2.5 text-[13px] text-[#555] dark:text-[#aaa]">{issue.description}</td>
                      <td className="px-4 py-2.5 text-[13px] text-[#888] dark:text-[#666] whitespace-nowrap">{issue.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      <AddComponentDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAdd={addItem}
      />
    </div>
  );
}
