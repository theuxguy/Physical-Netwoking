import { SectionHeader, Group, Swatch, TokenTable, TokenRow } from "../ui";

const SURFACES = [
  { color: "#ffffff", label: "background", value: "#ffffff", note: "Page background" },
  { color: "#ffffff", label: "card", value: "#ffffff", note: "Card surface", border: true },
  { color: "#fafafa", label: "sidebar", value: "#fafafa", note: "Sidebar surface", border: true },
  { color: "#f3f3f5", label: "input-background", value: "#f3f3f5", note: "Input fill" },
  { color: "#ececf0", label: "muted", value: "#ececf0", note: "Muted background" },
  { color: "#e9ebef", label: "accent", value: "#e9ebef", note: "Accent / hover fill" },
];

const TEXT = [
  { color: "#0a0a0b", label: "foreground", value: "#0a0a0b", note: "Primary text" },
  { color: "#717182", label: "muted-foreground", value: "#717182", note: "Subtle / secondary text" },
  { color: "#030213", label: "primary", value: "#030213", note: "Primary interactive" },
  { color: "#ffffff", label: "primary-foreground", value: "#ffffff", note: "On primary", border: true },
  { color: "#d4183d", label: "destructive", value: "#d4183d", note: "Errors / danger" },
];

const STATUS = [
  { color: "#508223", label: "Healthy border", value: "#508223", note: "Status: healthy" },
  { color: "rgba(80,130,35,0.12)", label: "Healthy fill", value: "rgba(80,130,35,0.12)", note: "Status: healthy bg", border: true },
  { color: "#de8011", label: "Warning border", value: "#de8011", note: "Status: warning" },
  { color: "rgba(222,128,17,0.15)", label: "Warning fill", value: "rgba(222,128,17,0.15)", note: "Status: warning bg", border: true },
  { color: "#d63b25", label: "Critical border", value: "#d63b25", note: "Status: critical" },
  { color: "rgba(214,59,37,0.15)", label: "Critical fill", value: "rgba(214,59,37,0.15)", note: "Status: critical bg", border: true },
];

const APP_COLORS = [
  { color: "#227e9e", label: "Brand cyan", value: "#227e9e", note: "Loading spinners, highlights" },
  { color: "#5ba8d0", label: "Comparison blue", value: "#5ba8d0", note: "Map comparison mode label" },
  { color: "#0f1729", label: "Header dark", value: "#0f1729", note: "Main header background" },
  { color: "#1a1a1a", label: "Dark surface", value: "#1a1a1a", note: "Dark mode card/panel" },
  { color: "#404040", label: "Dark border", value: "#404040", note: "Dark mode border" },
];

const CHARTS = [
  { color: "oklch(0.646 0.222 41.116)", label: "chart-1", value: "oklch(0.646 0.222 41)", note: "Orange" },
  { color: "oklch(0.6 0.118 184.704)", label: "chart-2", value: "oklch(0.6 0.118 185)", note: "Teal" },
  { color: "oklch(0.398 0.07 227.392)", label: "chart-3", value: "oklch(0.398 0.07 227)", note: "Navy" },
  { color: "oklch(0.828 0.189 84.429)", label: "chart-4", value: "oklch(0.828 0.189 84)", note: "Yellow" },
  { color: "oklch(0.769 0.188 70.08)", label: "chart-5", value: "oklch(0.769 0.188 70)", note: "Warm orange" },
];

export function Colors() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Color Tokens"
        description="All color values are defined as CSS custom properties in theme.css and resolved via Tailwind's @theme inline block. Use the variable names when writing new components to stay consistent with light/dark mode."
      />

      <div className="space-y-8">
        <Group title="Surfaces & Backgrounds">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {SURFACES.map((s) => (
              <Swatch key={s.label} color={s.color} label={s.label} value={s.value} note={s.note} border={s.border} />
            ))}
          </div>
        </Group>

        <Group title="Text & Foreground">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {TEXT.map((s) => (
              <Swatch key={s.label} color={s.color} label={s.label} value={s.value} note={s.note} border={s.border} />
            ))}
          </div>
        </Group>

        <Group title="Status Colors">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Used across health cards, network diagram blocks, and map labels. Always pair border + fill colors together.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {STATUS.map((s) => (
              <Swatch key={s.label} color={s.color} label={s.label} value={s.value} note={s.note} border={s.border} />
            ))}
          </div>
        </Group>

        <Group title="App-Specific Colors">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {APP_COLORS.map((s) => (
              <Swatch key={s.label} color={s.color} label={s.label} value={s.value} note={s.note} />
            ))}
          </div>
        </Group>

        <Group title="Chart Palette">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Used by Recharts components via <code className="font-mono">--chart-1</code> through <code className="font-mono">--chart-5</code>. Separate dark mode values exist in theme.css.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {CHARTS.map((s) => (
              <Swatch key={s.label} color={s.color} label={s.label} value={s.value} note={s.note} />
            ))}
          </div>
        </Group>

        <Group title="CSS Variable Reference">
          <TokenTable>
            <TokenRow name="--background" value="#ffffff" description="Main page background" />
            <TokenRow name="--foreground" value="oklch(0.145 0 0)" description="Primary text color" />
            <TokenRow name="--card" value="#ffffff" description="Card and panel background" />
            <TokenRow name="--primary" value="#030213" description="Primary action / button fill" />
            <TokenRow name="--primary-foreground" value="#ffffff" description="Text on primary fill" />
            <TokenRow name="--secondary" value="oklch(0.95 0.0058 264.53)" description="Secondary button fill" />
            <TokenRow name="--muted" value="#ececf0" description="Muted surface (disabled, subtle areas)" />
            <TokenRow name="--muted-foreground" value="#717182" description="Placeholder text, captions" />
            <TokenRow name="--accent" value="#e9ebef" description="Hover fill for ghost elements" />
            <TokenRow name="--destructive" value="#d4183d" description="Error states, destructive actions" />
            <TokenRow name="--border" value="rgba(0,0,0,0.1)" description="Default border color" />
            <TokenRow name="--input-background" value="#f3f3f5" description="Input field background" />
            <TokenRow name="--ring" value="oklch(0.708 0 0)" description="Focus ring color" />
            <TokenRow name="--radius" value="0.625rem" description="Default border radius (10px)" />
          </TokenTable>
        </Group>
      </div>
    </div>
  );
}
