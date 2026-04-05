import { Filter } from "lucide-react";
import { useViewMode } from "../contexts/ViewModeContext";

export function BottomControls() {
  const { viewMode, setViewMode } = useViewMode();
  
  return (
    <div className="flex items-center justify-between px-[24px] pt-[0px] pb-[8px]">
      {/* Left: Tabs */}
      <div className="flex gap-2">
        <button 
          className={`px-4 py-2 rounded text-sm flex items-center gap-2 ${
            viewMode === 'general' 
              ? 'bg-gray-200 dark:bg-[#2a2a2a] dark:text-white' 
              : 'border border-gray-300 dark:border-[#404040] bg-white dark:bg-[#1a1a1a] dark:text-white'
          }`}
          onClick={() => setViewMode('general')}
        >
          <span>General health</span>
        </button>
        <button 
          className={`px-4 py-2 rounded text-sm flex items-center gap-2 ${
            viewMode === 'backbone' 
              ? 'bg-gray-200 dark:bg-[#2a2a2a] dark:text-white' 
              : 'border border-gray-300 dark:border-[#404040] bg-white dark:bg-[#1a1a1a] dark:text-white'
          }`}
          onClick={() => setViewMode('backbone')}
        >
          <span>Backbone health</span>
          
        </button>
      </div>
      
      {/* Right: Action buttons */}
      <div className="flex gap-2">
        <button className="px-4 py-2 border border-gray-300 dark:border-[#404040] rounded text-sm flex items-center gap-2 bg-white dark:bg-[#1a1a1a] dark:text-white">
          <span>⊕</span>
          <span>Export</span>
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-[#404040] rounded text-sm flex items-center gap-2 bg-white dark:bg-[#1a1a1a] dark:text-white">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
}