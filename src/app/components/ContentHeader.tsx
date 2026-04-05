import { useState, useEffect, useRef } from "react";
import { useTimeRange } from "../contexts/TimeRangeContext";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

type TimeRangeOption = 'last24h' | 'lastWeek' | 'last2Weeks' | 'lastMonth' | 'custom';

type ContentHeaderProps = {
  isRegionView?: boolean;
  regionCode?: string;
};

export function ContentHeader({ isRegionView = false, regionCode }: ContentHeaderProps) {
  const { startDate, endDate, setTimeRange } = useTimeRange();
  
  const [selectedOption, setSelectedOption] = useState<TimeRangeOption>('lastWeek');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [startInput, setStartInput] = useState(formatDateForDisplay(startDate));
  const [endInput, setEndInput] = useState(formatDateForDisplay(endDate));
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isInternalChangeRef = useRef(false);
  const isInitialMountRef = useRef(true);

  // Update inputs when dates change from external sources (like the blue window drag)
  useEffect(() => {
    setStartInput(formatDateForDisplay(startDate));
    setEndInput(formatDateForDisplay(endDate));
    // When dates change externally (not from dropdown), set to custom mode
    // Skip this on initial mount to preserve the 'lastWeek' default
    if (!isInternalChangeRef.current && !isInitialMountRef.current) {
      setSelectedOption('custom');
    }
    isInternalChangeRef.current = false;
    isInitialMountRef.current = false;
  }, [startDate, endDate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function formatDateForDisplay(date: Date): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${dayName}, ${monthName} ${day}, ${year} ${hours}:${minutes}`;
  }

  function parseDisplayDate(dateStr: string): Date | null {
    // Simple parser for "Mon, Jul 06, 2023 14:30" format
    try {
      const parts = dateStr.replace(/,/g, '').split(' ');
      if (parts.length !== 5) return null;
      
      const months: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      
      const month = months[parts[1]];
      const day = parseInt(parts[2]);
      const year = parseInt(parts[3]);
      const timeParts = parts[4].split(':');
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      
      if (month === undefined || isNaN(day) || isNaN(year) || isNaN(hours) || isNaN(minutes)) return null;
      
      return new Date(year, month, day, hours, minutes);
    } catch {
      return null;
    }
  }

  function handleSetTimeline() {
    const newStart = parseDisplayDate(startInput);
    const newEnd = parseDisplayDate(endInput);
    
    if (newStart && newEnd && newStart <= newEnd) {
      setTimeRange(newStart, newEnd);
    }
  }

  function handleDropdownChange(option: TimeRangeOption) {
    setSelectedOption(option);
    
    if (option !== 'custom') {
      const now = new Date();
      let newStart: Date;
      
      switch (option) {
        case 'last24h':
          newStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'lastWeek':
          newStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'last2Weeks':
          newStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
          break;
        case 'lastMonth':
          newStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          return;
      }
      
      isInternalChangeRef.current = true;
      setTimeRange(newStart, now);
    }
  }

  function getDropdownLabel(option: TimeRangeOption): string {
    switch (option) {
      case 'last24h': return 'Last 24 hours';
      case 'lastWeek': return 'Last week';
      case 'last2Weeks': return 'Last 2 weeks';
      case 'lastMonth': return 'Last month';
      case 'custom': return 'Custom';
    }
  }

  return (
    <div className="border-b border-[#d5d5d5] dark:border-[#333333] py-[16px] px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
        {isRegionView ? (
          <>
            <Link to="/" className="hover:underline">Realm view</Link>
            <span>›</span>
            <span>Region view ({regionCode})</span>
          </>
        ) : (
          <>
            <span>Realm view</span>
            <span>›</span>
          </>
        )}
      </div>
      
      {/* Title and description */}
      <h1 className="text-2xl dark:text-white mb-2 px-[0px] pt-[0px] pb-[8px]">{isRegionView ? `Region View - ${regionCode}` : 'Realm View'}</h1>
      
      
      {/* Filters row */}
      <div className="flex items-center gap-4">
        {/* Map selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm dark:text-white">Timeframe</span>
          
        </div>
        
        {/* Time range dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="px-3 py-1.5 border border-gray-300 dark:border-[#404040] rounded text-sm bg-white dark:bg-[#1a1a1a] dark:text-white min-w-[160px] flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#252525]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{getDropdownLabel(selectedOption)}</span>
            <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full mt-1 left-0 bg-white dark:bg-[#1a1a1a] rounded-md shadow-[0px_6px_12px_0px_rgba(0,0,0,0.2)] dark:shadow-[0px_6px_12px_0px_rgba(0,0,0,0.6)] min-w-full z-50 border border-gray-200 dark:border-[#404040]">
              <div className="py-2">
                {(['last24h', 'lastWeek', 'last2Weeks', 'lastMonth', 'custom'] as TimeRangeOption[]).map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left px-4 py-3 text-sm dark:text-white hover:bg-[rgba(22,21,19,0.08)] dark:hover:bg-[#2a2a2a] ${
                      selectedOption === option ? 'bg-[#e4f1f7] dark:bg-[#1e3a4a]' : ''
                    }`}
                    onClick={() => {
                      handleDropdownChange(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {getDropdownLabel(option)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Help icon */}
        <button className="flex items-center gap-2 text-sm dark:text-white">
          
          
        </button>
      </div>
    </div>
  );
}