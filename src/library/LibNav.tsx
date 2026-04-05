import { cn } from "../app/components/ui/utils";

const NAV = [
  {
    group: "Foundations",
    items: [
      { id: "colors", label: "Color Tokens" },
      { id: "typography", label: "Typography" },
      { id: "spacing", label: "Spacing & Sizing" },
      { id: "elevation", label: "Elevation" },
    ],
  },
  {
    group: "Components",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "inputs", label: "Inputs & Search" },
      { id: "badges", label: "Badges" },
      { id: "switches", label: "Switches & Toggles" },
      { id: "cards", label: "Cards" },
      { id: "tables", label: "Tables" },
      { id: "status", label: "Status Indicators" },
      { id: "dataviz", label: "Data Visualization" },
    ],
  },
];

interface LibNavProps {
  active: string;
  onSelect: (id: string) => void;
}

export function LibNav({ active, onSelect }: LibNavProps) {
  return (
    <nav className="w-60 shrink-0 h-full overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col">
      <div className="p-4 space-y-6 flex-1">
        {NAV.map((section) => (
          <div key={section.group}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-2 mb-1.5">
              {section.group}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSelect(item.id)}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors",
                      active === item.id
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 font-medium"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400 dark:text-slate-600">Physical Networking</p>
        <p className="text-xs text-slate-400 dark:text-slate-600">Component Library</p>
      </div>
    </nav>
  );
}
