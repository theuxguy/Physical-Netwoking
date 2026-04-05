import { useState, useEffect } from "react";
import { cn } from "../app/components/ui/utils";
import { LibNav } from "./LibNav";
import { Colors } from "./sections/Colors";
import { Typography } from "./sections/Typography";
import { Spacing } from "./sections/Spacing";
import { Elevation } from "./sections/Elevation";
import { Buttons } from "./sections/Buttons";
import { Inputs } from "./sections/Inputs";
import { Badges } from "./sections/Badges";
import { Switches } from "./sections/Switches";
import { Cards } from "./sections/Cards";
import { Tables } from "./sections/Tables";
import { StatusIndicators } from "./sections/StatusIndicators";
import { DataVisualization } from "./sections/DataVisualization";
import { Moon, Sun, Layers } from "lucide-react";

const SECTIONS: Record<string, React.ComponentType> = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  elevation: Elevation,
  buttons: Buttons,
  inputs: Inputs,
  badges: Badges,
  switches: Switches,
  cards: Cards,
  tables: Tables,
  status: StatusIndicators,
  dataviz: DataVisualization,
};

function getHash() {
  return window.location.hash.slice(1) || "colors";
}

export function LibraryApp() {
  const [active, setActive] = useState(getHash);
  const [dark, setDark] = useState(() => localStorage.getItem("lib-dark") === "true");

  useEffect(() => {
    const handler = () => setActive(getHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const handleSelect = (id: string) => {
    window.location.hash = id;
    setActive(id);
  };

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("lib-dark", String(next));
  };

  const ActiveSection = SECTIONS[active] ?? Colors;

  return (
    <div className={cn(dark && "dark", "h-screen overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-950")}>
      {/* Top bar */}
      <header className="h-12 shrink-0 flex items-center justify-between px-5 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-10">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Component Library
          </span>
          <span className="text-slate-300 dark:text-slate-700 select-none">·</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">Physical Networking Dashboard</span>
        </div>
        <button
          onClick={toggleDark}
          className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <LibNav active={active} onSelect={handleSelect} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-10 space-y-10">
            <ActiveSection />
          </div>
        </main>
      </div>
    </div>
  );
}
