import { Moon, Sun, FlaskConical, ChevronDown } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useSimulate, SimulateScenario } from "../contexts/SimulateContext";
import { Link, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const SIMULATE_OPTIONS: { id: SimulateScenario; label: string }[] = [
  { id: "no-live-data", label: "No live data" },
  { id: "no-data",      label: "No data" },
];

function formatTimestamp(date: Date) {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day   = date.getDate();
  const year  = date.getFullYear();
  const hh    = String(date.getHours()).padStart(2, "0");
  const mm    = String(date.getMinutes()).padStart(2, "0");
  return `${month} ${day}, ${year} ${hh}:${mm} UTC`;
}

export function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { activeScenario, activatedAt, setScenario } = useSimulate();
  const location = useLocation();

  const [simulateOpen, setSimulateOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!simulateOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setSimulateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [simulateOpen]);

  const handleSelect = (id: SimulateScenario) => {
    const next = activeScenario === id ? null : id;
    setScenario(next);
    setSimulateOpen(false);

    if (next === "no-live-data") {
      const ts = formatTimestamp(new Date());
      toast.warning("No live data available", {
        description: `Showing data last polled at ${ts}. The dashboard will refresh automatically once live data is restored.`,
        duration: 8000,
      });
    }
  };

  return (
    <div className="bg-[#0f1729] dark:bg-[#0a0a0a] h-[44px] flex items-center justify-between px-4">
      {/* Left: Logo + nav */}
      <div className="flex items-center gap-6">
        <div className="text-white font-semibold">iNsight</div>
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-1 rounded text-sm transition-colors ${
              location.pathname === "/" || location.pathname.startsWith("/region")
                ? "text-white bg-white/15"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            Realm View
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-1 rounded text-sm transition-colors ${
              location.pathname === "/dashboard"
                ? "text-white bg-white/15"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            Dashboard
          </Link>

          {/* Simulate menu */}
          <div ref={menuRef} className="relative ml-1">
            <button
              onClick={() => setSimulateOpen(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm transition-colors ${
                activeScenario
                  ? "text-[#de8011] bg-[#de8011]/15 hover:bg-[#de8011]/20"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Simulate scenarios"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Simulate</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${simulateOpen ? "rotate-180" : ""}`} />
            </button>

            {simulateOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#1a2035] border border-white/10 rounded-md shadow-xl overflow-hidden z-50 min-w-[160px]">
                {SIMULATE_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between gap-3 ${
                      activeScenario === option.id
                        ? "bg-[#de8011]/20 text-[#de8011]"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {option.label}
                    {activeScenario === option.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#de8011] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right: active scenario badge + dark mode */}
      <div className="flex items-center gap-6 text-white text-sm">
        {activeScenario && activatedAt && (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#de8011]/15 border border-[#de8011]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#de8011] animate-pulse" />
            <span className="text-[#de8011] text-xs font-medium">
              {SIMULATE_OPTIONS.find(o => o.id === activeScenario)?.label}
            </span>
            <button
              onClick={() => setScenario(null)}
              className="text-[#de8011]/60 hover:text-[#de8011] ml-0.5 leading-none"
              aria-label="Clear simulation"
            >
              ✕
            </button>
          </div>
        )}

        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4" />
              <span className="text-sm">Light mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span className="text-sm">Dark mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
