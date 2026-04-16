import { useState, Fragment } from "react";
import { SectionHeader } from "../ui";
import { cn } from "../../app/components/ui/utils";

type Mode = "light" | "dark";

// ── Consolidated mapping table ────────────────────────────────────────────────
// component token (or "—") → semantic token → primitive → hex per mode
const TOKEN_MAP: {
  component: string;
  semantic: string;
  primitive: string;
  light: string;
  dark: string;
  border?: boolean;
  group?: string;
}[] = [
  // ── Shell / Layout ────────────────────────────────────────────────────────
  { group: "Shell", component: "--header-bg",              semantic: "--shell-header-bg",        primitive: "--primitive-navy-900",           light: "#0f1729", dark: "#0a0a0a" },
  { component: "--page-bg",                                semantic: "--shell-page-bg",          primitive: "--primitive-neutral-000",        light: "#ffffff", dark: "#0f0f0f", border: true },
  { component: "--surface-bg",                             semantic: "--shell-surface-bg",       primitive: "--primitive-neutral-000",        light: "#ffffff", dark: "#1a1a1a", border: true },
  { component: "--sidebar-bg",                             semantic: "--shell-sidebar-bg",       primitive: "--primitive-neutral-050",        light: "#f5f5f5", dark: "#1a1a1a", border: true },

  // ── Text ─────────────────────────────────────────────────────────────────
  { group: "Text", component: "--text-primary",            semantic: "--content-text-primary",   primitive: "--primitive-neutral-900",        light: "#161513", dark: "#ffffff", border: true },
  { component: "--text-body",                              semantic: "--content-text-body",      primitive: "--primitive-neutral-800",        light: "#222222", dark: "#e0e0e0", border: true },
  { component: "--text-muted",                             semantic: "--content-text-muted",     primitive: "--primitive-neutral-600",        light: "#665f5b", dark: "#999999" },
  { component: "--icon-fill",                              semantic: "--content-icon",           primitive: "--primitive-neutral-600",        light: "#665f5b", dark: "#a0a0a0" },

  // ── Borders ───────────────────────────────────────────────────────────────
  { group: "Borders", component: "--border-default",       semantic: "--ui-border-default",      primitive: "--primitive-neutral-300",        light: "#d8d8d8", dark: "#404040" },
  { component: "--border-subtle",                          semantic: "--ui-border-subtle",       primitive: "--primitive-neutral-350",        light: "#d5d5d5", dark: "#404040" },
  { component: "--border-strong",                          semantic: "--ui-border-strong",       primitive: "--primitive-neutral-400",        light: "#b9b9b9", dark: "#404040" },
  { component: "--border-muted",                           semantic: "--ui-border-muted",        primitive: "--primitive-neutral-450",        light: "#b6b2ad", dark: "#505050" },

  // ── Tables ────────────────────────────────────────────────────────────────
  { group: "Tables", component: "--table-header-bg",       semantic: "--ui-table-header-surface",primitive: "--primitive-neutral-025",        light: "#f8f8f8", dark: "#252525", border: true },
  { component: "--table-header-alt-bg",                    semantic: "--ui-table-header-alt",    primitive: "--primitive-neutral-075",        light: "#eeeeee", dark: "#252525", border: true },
  { component: "--table-row-hover",                        semantic: "--ui-table-row-hover",     primitive: "--primitive-neutral-100",        light: "#f0f0f0", dark: "#333333", border: true },

  // ── Charts ────────────────────────────────────────────────────────────────
  { group: "Charts", component: "--chart-container-border",semantic: "--chart-surface-border",   primitive: "--primitive-neutral-450",        light: "#b6b2ad", dark: "#404040" },
  { component: "--chart-grid-line",                        semantic: "--chart-grid",             primitive: "--primitive-neutral-100",        light: "#f0f0f0", dark: "#2a2a2a", border: true },
  { component: "--chart-axis-line",                        semantic: "--chart-axis",             primitive: "--primitive-neutral-350",        light: "#d5d5d5", dark: "#404040" },
  { component: "--chart-axis-line-strong",                 semantic: "--chart-axis-strong",      primitive: "--primitive-neutral-400",        light: "#b9b9b9", dark: "#505050" },
  { component: "--chart-window-stroke",                    semantic: "--chart-window",           primitive: "--primitive-cyan-500",           light: "#227e9e", dark: "#227e9e" },
  { component: "--chart-comparison-stroke",                semantic: "--chart-comparison",       primitive: "--primitive-amber-700",          light: "#de8011", dark: "#de8011" },
  { component: "--chart-bar-healthy",                      semantic: "--status-healthy-chart",   primitive: "--primitive-green-700",          light: "#508223", dark: "#508223" },
  { component: "--chart-bar-warning",                      semantic: "--status-warning-chart",   primitive: "--primitive-amber-700",          light: "#de8011", dark: "#ff981e" },
  { component: "--chart-bar-critical",                     semantic: "--status-critical-chart",  primitive: "--primitive-red-600",            light: "#d63b25", dark: "#e85540" },

  // ── Map ───────────────────────────────────────────────────────────────────
  { group: "Map", component: "--map-label-text",           semantic: "--brand-text",             primitive: "--primitive-cyan-700",           light: "#006080", dark: "#006080" },
  { component: "--map-info-bg",                            semantic: "--map-info-surface",       primitive: "--primitive-info-bg-light",      light: "#e8f4f8", dark: "#1a3a44", border: true },
  { component: "--map-info-border",                        semantic: "--map-info-outline",       primitive: "--primitive-cyan-300",           light: "#4db8e8", dark: "#4db8e8" },
  { component: "--map-marker-healthy",                     semantic: "--status-healthy-dot",     primitive: "--primitive-green-700",          light: "#508223", dark: "#6ba32e" },
  { component: "--map-marker-warning",                     semantic: "--status-warning-dot",     primitive: "--primitive-amber-700",          light: "#de8011", dark: "#de8011" },
  { component: "--map-marker-critical",                    semantic: "--status-critical-dot",    primitive: "--primitive-red-600",            light: "#d63b25", dark: "#d63b25" },

  // ── Network Diagram ───────────────────────────────────────────────────────
  { group: "Network", component: "--network-line-healthy", semantic: "--network-healthy-stroke", primitive: "--primitive-green-700",          light: "#508223", dark: "#7fb83e" },

  // ── Interaction ───────────────────────────────────────────────────────────
  { group: "Interaction", component: "--action-link",      semantic: "--interaction-link",       primitive: "--primitive-cyan-800",           light: "#00688c", dark: "#4db8e8" },
  { component: "--action-link-alt",                        semantic: "--interaction-link-alt",   primitive: "--primitive-cyan-800",           light: "#00688c", dark: "#4da6c7" },
  { component: "--selected-bg",                            semantic: "--interaction-selected-bg",primitive: "--primitive-selected-bg-light",  light: "#e4f1f7", dark: "#1e3a4a", border: true },
  { component: "--spinner-stroke",                         semantic: "--interaction-spinner",    primitive: "--primitive-cyan-500",           light: "#227e9e", dark: "#227e9e" },

  // ── Status: Healthy ───────────────────────────────────────────────────────
  { group: "Status: Healthy", component: "--badge-healthy-bg",     semantic: "--status-healthy-bg",      primitive: "--primitive-green-700 / 15%",    light: "#e4f3de", dark: "#22291b", border: true },
  { component: "--badge-healthy-border",                           semantic: "--status-healthy-border",  primitive: "--primitive-green-700",          light: "#508223", dark: "#6ba32e" },
  { component: "--badge-healthy-text",                             semantic: "--status-healthy-text",    primitive: "--primitive-green-800",          light: "#3a5e18", dark: "#e4e4e4", border: true },

  // ── Status: Warning ───────────────────────────────────────────────────────
  { group: "Status: Warning", component: "--badge-warning-bg",     semantic: "--status-warning-bg",      primitive: "--primitive-amber-700 / 15%",    light: "#faeedd", dark: "#37230e", border: true },
  { component: "--badge-warning-border",                           semantic: "--status-warning-border",  primitive: "--primitive-amber-600",          light: "#ac630c", dark: "#de8011" },
  { component: "--badge-warning-text",                             semantic: "--status-warning-text",    primitive: "--primitive-amber-800",          light: "#7a4400", dark: "#e4e4e4", border: true },
  { component: "--text-warning-insight",                           semantic: "--status-warning-insight", primitive: "--primitive-amber-insight",      light: "#9a5800", dark: "#ff981e" },

  // ── Status: Critical ──────────────────────────────────────────────────────
  { group: "Status: Critical", component: "--badge-critical-bg",   semantic: "--status-critical-bg",     primitive: "--primitive-red-600 / 15%",      light: "#f9e1dd", dark: "#36201d", border: true },
  { component: "--badge-critical-border",                          semantic: "--status-critical-border", primitive: "--primitive-red-600",            light: "#d63b25", dark: "#e85540" },
  { component: "--badge-critical-text",                            semantic: "--status-critical-text",   primitive: "--primitive-red-800",            light: "#8b1a0a", dark: "#e4e4e4", border: true },

  // ── Brand ─────────────────────────────────────────────────────────────────
  { group: "Brand", component: "—",                                semantic: "--brand-accent",           primitive: "--primitive-cyan-500",           light: "#227e9e", dark: "#227e9e" },
  { component: "—",                                                 semantic: "--brand-header",           primitive: "--primitive-navy-900",           light: "#0f1729", dark: "#0f1729" },
];


export function Colors() {
  const [mode, setMode] = useState<Mode>("light");
  const isDark = mode === "dark";

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Color Tokens"
        description="Three-tier system: component tokens alias semantic tokens which resolve primitive values. Every color used in the dashboard prototype is documented here."
      />

      {/* Mode tab */}
      <div className="flex items-center gap-0 rounded-lg border border-slate-200 dark:border-slate-700 w-fit overflow-hidden">
        {(["light", "dark"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "px-5 py-2 text-sm font-medium transition-colors flex items-center gap-2",
              mode === m
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-white text-slate-500 hover:text-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            {m === "light" ? "☀" : "☾"} {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-12">

        {/* ── Consolidated mapping table ── */}
        <div className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Full chain for <strong className="font-semibold">{mode}</strong> mode. Rows marked <span className="font-mono">—</span> in the component column are semantic tokens used directly. Badge bg values marked <span className="font-mono">/ 15%</span> are alpha-composited on the surface color.
          </p>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500">
                  <th className="text-left px-5 py-3">Component token</th>
                  <th className="text-left px-4 py-3">Semantic token</th>
                  <th className="text-left px-4 py-3">Primitive</th>
                  <th className="text-left px-4 py-3">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-950 text-xs">
                {TOKEN_MAP.map((row) => {
                  const hex = isDark ? row.dark : row.light;
                  const isPlaceholder = row.component === "—";
                  const isGroupStart = row.group !== undefined;
                  return (
                    <Fragment key={row.component + row.semantic}>
                      {isGroupStart && (
                        <tr className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                          <td colSpan={4} className="px-5 py-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{row.group}</span>
                          </td>
                        </tr>
                      )}
                      <tr className="border-t border-slate-100 dark:border-slate-800/60">
                        <td className="py-3 px-5">
                          {isPlaceholder
                            ? <span className="text-slate-300 dark:text-slate-600 font-mono">—</span>
                            : <code className="font-mono text-blue-600 dark:text-blue-400">{row.component}</code>
                          }
                        </td>
                        <td className="py-3 px-4">
                          <code className="font-mono text-violet-600 dark:text-violet-400">{row.semantic}</code>
                        </td>
                        <td className="py-3 px-4">
                          <code className="font-mono text-slate-400 dark:text-slate-500 text-[11px]">{row.primitive}</code>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded shrink-0"
                              style={{
                                backgroundColor: hex,
                                border: row.border ? "1px solid #cbd5e1" : "1px solid transparent",
                              }}
                            />
                            <code className="font-mono text-slate-600 dark:text-slate-400">{hex}</code>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
