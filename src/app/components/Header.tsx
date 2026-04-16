import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { Link, useLocation } from "react-router";

export function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

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
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6 text-white text-sm">
        
        
        
        
        {/* Dark mode toggle */}
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