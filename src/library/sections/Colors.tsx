import { useState } from "react";
import { SectionHeader, Group, Swatch, TokenTable, TokenRow } from "../ui";
import { cn } from "../../app/components/ui/utils";

// ── Light mode ───────────────────────────────────────────────────────────────
const SURFACES_LIGHT = [
  { color: "#ffffff",  label: "background",      value: "#ffffff",  note: "Page background", border: true },
  { color: "#ffffff",  label: "card",             value: "#ffffff",  note: "Card surface", border: true },
  { color: "#fafafa",  label: "sidebar",          value: "#fafafa",  note: "Sidebar surface", border: true },
  { color: "#f3f3f5",  label: "input-background", value: "#f3f3f5",  note: "Input fill" },
  { color: "#ececf0",  label: "muted",            value: "#ececf0",  note: "Muted background" },
  { color: "#e9ebef",  label: "accent",           value: "#e9ebef",  note: "Accent / hover fill" },
];

const TEXT_LIGHT = [
  { color: "#0a0a0b",  label: "foreground",         value: "#0a0a0b",  note: "Primary text" },
  { color: "#717182",  label: "muted-foreground",    value: "#717182",  note: "Subtle / secondary text" },
  { color: "#030213",  label: "primary",             value: "#030213",  note: "Primary interactive" },
  { color: "#ffffff",  label: "primary-foreground",  value: "#ffffff",  note: "On primary", border: true },
  { color: "#d4183d",  label: "destructive",         value: "#d4183d",  note: "Errors / danger" },
];

const STATUS_LIGHT = [
  { color: "#508223",               label: "Healthy border", value: "#508223",               note: "Status: healthy" },
  { color: "rgba(80,130,35,0.12)",  label: "Healthy fill",   value: "rgba(80,130,35,0.12)",  note: "Status: healthy bg", border: true },
  { color: "#de8011",               label: "Warning border", value: "#de8011",               note: "Status: warning" },
  { color: "rgba(222,128,17,0.15)", label: "Warning fill",   value: "rgba(222,128,17,0.15)", note: "Status: warning bg", border: true },
  { color: "#d63b25",               label: "Critical border",value: "#d63b25",               note: "Status: critical" },
  { color: "rgba(214,59,37,0.15)",  label: "Critical fill",  value: "rgba(214,59,37,0.15)",  note: "Status: critical bg", border: true },
];

const CHARTS_LIGHT = [
  { color: "oklch(0.646 0.222 41.116)", label: "chart-1", value: "oklch(0.646 0.222 41)", note: "Orange" },
  { color: "oklch(0.6 0.118 184.704)",  label: "chart-2", value: "oklch(0.6 0.118 185)",  note: "Teal" },
  { color: "oklch(0.398 0.07 227.392)", label: "chart-3", value: "oklch(0.398 0.07 227)", note: "Navy" },
  { color: "oklch(0.828 0.189 84.429)", label: "chart-4", value: "oklch(0.828 0.189 84)", note: "Yellow" },
  { color: "oklch(0.769 0.188 70.08)",  label: "chart-5", value: "oklch(0.769 0.188 70)", note: "Warm orange" },
];

// ── Dark mode ────────────────────────────────────────────────────────────────
const SURFACES_DARK = [
  { color: "#0f0f0f",  label: "background",      value: "oklch(0.145 0 0) ≈ #0f0f0f", note: "Page background" },
  { color: "#0f0f0f",  label: "card",             value: "oklch(0.145 0 0) ≈ #0f0f0f", note: "Card / panel" },
  { color: "#1a1a1a",  label: "dark surface",     value: "#1a1a1a",  note: "Panels, map overlay, inputs" },
  { color: "#2a2a2a",  label: "dark surface 2",   value: "#2a2a2a",  note: "Hover fill on dark surfaces" },
  { color: "#333333",  label: "muted / secondary",value: "oklch(0.269 0 0) ≈ #333333", note: "Muted / secondary bg" },
  { color: "#404040",  label: "dark border",      value: "#404040",  note: "Component borders" },
];

const TEXT_DARK = [
  { color: "#fafafa",  label: "foreground",         value: "oklch(0.985 0 0) ≈ #fafafa", note: "Primary text" },
  { color: "#b3b3b3",  label: "muted-foreground",   value: "oklch(0.708 0 0) ≈ #b3b3b3", note: "Subtle / secondary text" },
  { color: "#fafafa",  label: "primary",            value: "oklch(0.985 0 0) ≈ #fafafa", note: "Primary interactive", border: true },
  { color: "#343434",  label: "primary-foreground", value: "oklch(0.205 0 0) ≈ #343434", note: "On primary fill" },
  { color: "#7a2020",  label: "destructive",        value: "oklch(0.396 0.141 25.723)",  note: "Errors / danger" },
];

const STATUS_DARK = [
  { color: "#6ba32e",               label: "Healthy border", value: "#6ba32e",               note: "Status: healthy" },
  { color: "rgba(80,130,35,0.12)",  label: "Healthy fill",   value: "rgba(80,130,35,0.12)",  note: "Status: healthy bg", border: true },
  { color: "#de8011",               label: "Warning border", value: "#de8011",               note: "Status: warning" },
  { color: "rgba(222,128,17,0.15)", label: "Warning fill",   value: "rgba(222,128,17,0.15)", note: "Status: warning bg", border: true },
  { color: "#e85540",               label: "Critical border",value: "#e85540",               note: "Status: critical" },
  { color: "rgba(214,59,37,0.15)",  label: "Critical fill",  value: "rgba(214,59,37,0.15)",  note: "Status: critical bg", border: true },
];

const CHARTS_DARK = [
  { color: "oklch(0.488 0.243 264.376)", label: "chart-1", value: "oklch(0.488 0.243 264)", note: "Blue-violet" },
  { color: "oklch(0.696 0.17 162.48)",   label: "chart-2", value: "oklch(0.696 0.17 162)",  note: "Green" },
  { color: "oklch(0.769 0.188 70.08)",   label: "chart-3", value: "oklch(0.769 0.188 70)",  note: "Warm orange" },
  { color: "oklch(0.627 0.265 303.9)",   label: "chart-4", value: "oklch(0.627 0.265 304)", note: "Purple" },
  { color: "oklch(0.645 0.246 16.439)",  label: "chart-5", value: "oklch(0.645 0.246 16)",  note: "Red-orange" },
];

const APP_COLORS = [
  { color: "#227e9e", label: "Brand cyan",      value: "#227e9e", note: "Loading spinners, highlights" },
  { color: "#5ba8d0", label: "Comparison blue", value: "#5ba8d0", note: "Map comparison mode label" },
  { color: "#0f1729", label: "Header (light)",  value: "#0f1729", note: "Main header background" },
  { color: "#0a0a0a", label: "Header (dark)",   value: "#0a0a0a", note: "Main header background dark" },
];

function SwatchGrid({ swatches, cols = 6, bg = "white" }: {
  swatches: { color: string; label: string; value: string; note?: string; border?: boolean }[];
  cols?: number;
  bg?: "white" | "dark";
}) {
  return (
    <div
      className={cn(
        "grid gap-4 p-5 rounded-xl border",
        bg === "dark"
          ? "bg-[#1a1a1a] border-[#404040]"
          : "bg-white border-slate-200"
      )}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {swatches.map((s) => (
        <Swatch key={s.label + s.value} color={s.color} label={s.label} value={s.value} note={s.note} border={s.border} />
      ))}
    </div>
  );
}

type Mode = "light" | "dark";

const TOKEN_ROWS: [string, string, string, string][] = [
  ["--background",         "#ffffff",                    "oklch(0.145 0 0) ≈ #0f0f0f",  "Page background"],
  ["--foreground",         "oklch(0.145 0 0) ≈ #0a0a0b","oklch(0.985 0 0) ≈ #fafafa",  "Primary text"],
  ["--card",               "#ffffff",                    "oklch(0.145 0 0) ≈ #0f0f0f",  "Card surface"],
  ["--primary",            "#030213",                    "oklch(0.985 0 0) ≈ #fafafa",  "Primary action fill"],
  ["--primary-foreground", "#ffffff",                    "oklch(0.205 0 0) ≈ #343434",  "Text on primary"],
  ["--secondary",          "oklch(0.95 0.0058 264.53)", "oklch(0.269 0 0) ≈ #333333",  "Secondary button fill"],
  ["--muted",              "#ececf0",                    "oklch(0.269 0 0) ≈ #333333",  "Muted surface"],
  ["--muted-foreground",   "#717182",                    "oklch(0.708 0 0) ≈ #b3b3b3",  "Placeholder, captions"],
  ["--accent",             "#e9ebef",                    "oklch(0.269 0 0) ≈ #333333",  "Hover fill"],
  ["--destructive",        "#d4183d",                    "oklch(0.396 0.141 25.723)",   "Errors / danger"],
  ["--border",             "rgba(0,0,0,0.1)",           "oklch(0.269 0 0) ≈ #333333",  "Default border"],
  ["--input",              "transparent",                "oklch(0.269 0 0) ≈ #333333",  "Input border/bg"],
  ["--input-background",   "#f3f3f5",                    "— (not overridden)",           "Input field fill"],
  ["--ring",               "oklch(0.708 0 0)",          "oklch(0.439 0 0) ≈ #6b6b6b",  "Focus ring"],
  ["--sidebar",            "oklch(0.985 0 0) ≈ #fafafa","oklch(0.205 0 0) ≈ #343434",  "Sidebar background"],
  ["--chart-1",            "oklch(0.646 0.222 41)",     "oklch(0.488 0.243 264)",       "Chart series 1"],
  ["--chart-2",            "oklch(0.6 0.118 185)",      "oklch(0.696 0.17 162)",        "Chart series 2"],
  ["--chart-3",            "oklch(0.398 0.07 227)",     "oklch(0.769 0.188 70)",        "Chart series 3"],
  ["--chart-4",            "oklch(0.828 0.189 84)",     "oklch(0.627 0.265 304)",       "Chart series 4"],
  ["--chart-5",            "oklch(0.769 0.188 70)",     "oklch(0.645 0.246 16)",        "Chart series 5"],
];

export function Colors() {
  const [mode, setMode] = useState<Mode>("light");
  const isDark = mode === "dark";
  const bg = isDark ? "dark" : "white";

  const surfaces = isDark ? SURFACES_DARK : SURFACES_LIGHT;
  const text     = isDark ? TEXT_DARK     : TEXT_LIGHT;
  const status   = isDark ? STATUS_DARK   : STATUS_LIGHT;
  const charts   = isDark ? CHARTS_DARK   : CHARTS_LIGHT;

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Color Tokens"
        description="All color values are defined as CSS custom properties in theme.css. Light mode values live in :root, dark mode values in .dark. Use the variable names when writing components — never hardcode values directly."
      />

      {/* ── Mode tabs ── */}
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

      {/* ── Content ── */}
      <div className="space-y-8">

        <Group title="Surfaces & Backgrounds">
          <SwatchGrid swatches={surfaces} cols={6} bg={bg} />
        </Group>

        <Group title="Text & Foreground">
          <SwatchGrid swatches={text} cols={5} bg={bg} />
        </Group>

        <Group title="Status Colors">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Always pair border + fill together.{isDark && " In dark mode, border colors are slightly brighter to maintain contrast against dark surfaces."}
          </p>
          <SwatchGrid swatches={status} cols={6} bg={bg} />
        </Group>

        <Group title="App-Specific Colors">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hardcoded values outside the CSS variable system. Avoid using in new components unless necessary.
          </p>
          <SwatchGrid swatches={APP_COLORS} cols={4} bg={bg} />
        </Group>

        <Group title="Chart Palette">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Used by Recharts via <code className="font-mono">--chart-1</code> through <code className="font-mono">--chart-5</code>.{" "}
            {isDark ? "Dark palette uses cooler, more vibrant hues." : "Light palette uses warm, earthy tones."}
          </p>
          <SwatchGrid swatches={charts} cols={5} bg={bg} />
        </Group>

        <Group title="CSS Variable Reference">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left text-xs font-semibold text-slate-500 px-5 py-3 w-44">Token</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-0 py-3">Value ({mode} mode)</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Usage</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-950 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {TOKEN_ROWS.map(([token, light, dark, usage]) => (
                  <tr key={token}>
                    <td className="py-2.5 px-5">
                      <code className="font-mono text-violet-600 dark:text-violet-400">{token}</code>
                    </td>
                    <td className="py-2.5 pr-4">
                      <code className="font-mono text-slate-600 dark:text-slate-400">{isDark ? dark : light}</code>
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400">{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Group>

      </div>
    </div>
  );
}
