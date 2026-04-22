import { ChevronLeft } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-[180px] bg-[#f5f5f5] dark:bg-[#1a1a1a] border-r border-[#d5d5d5] dark:border-[#333] flex flex-col">
      {/* Collapse/Expand button */}
      <div className="h-[44px] flex items-center px-3 border-b border-[#d5d5d5] dark:border-[#333]">
        <button
          aria-label="Collapse sidebar"
          className="text-gray-600 dark:text-gray-400 p-1 rounded hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Search filter */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Filter regions or countries"
          aria-label="Filter regions or countries"
          className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-[#404040] rounded bg-white dark:bg-[#111] dark:text-white dark:placeholder-gray-500"
        />
      </div>

      {/* Tree navigation placeholder */}
      <div className="flex-1 px-3 py-2">
        <div className="text-xs text-gray-700 dark:text-gray-400">
          {/* Tree items will go here */}
        </div>
      </div>
    </div>
  );
}
