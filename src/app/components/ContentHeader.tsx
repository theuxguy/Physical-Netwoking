import { useState, useEffect, useRef } from "react";
import { useTimeRange } from "../contexts/TimeRangeContext";
import { useSimulate } from "../contexts/SimulateContext";
import { HelpCircle, WifiOff } from "lucide-react";
import { Link } from "react-router";
import { HelpDrawer } from "./HelpDrawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type TimeRangeOption = 'last24h' | 'lastWeek' | 'last2Weeks' | 'lastMonth' | 'custom';

type ContentHeaderProps = {
  isRegionView?: boolean;
  regionCode?: string;
};

function formatTimestamp(date: Date) {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day   = date.getDate();
  const year  = date.getFullYear();
  const hh    = String(date.getHours()).padStart(2, "0");
  const mm    = String(date.getMinutes()).padStart(2, "0");
  return `${month} ${day}, ${year} ${hh}:${mm} UTC`;
}

export function ContentHeader({ isRegionView = false, regionCode }: ContentHeaderProps) {
  const { startDate, endDate, setTimeRange } = useTimeRange();
  const { activeScenario, activatedAt } = useSimulate();

  const [selectedOption, setSelectedOption] = useState<TimeRangeOption>('lastWeek');
  const [helpOpen, setHelpOpen] = useState(false);
  const [startInput, setStartInput] = useState(formatDateForDisplay(startDate));
  const [endInput, setEndInput] = useState(formatDateForDisplay(endDate));
  const isInternalChangeRef = useRef(false);
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    setStartInput(formatDateForDisplay(startDate));
    setEndInput(formatDateForDisplay(endDate));
    if (!isInternalChangeRef.current && !isInitialMountRef.current) {
      setSelectedOption('custom');
    }
    isInternalChangeRef.current = false;
    isInitialMountRef.current = false;
  }, [startDate, endDate]);

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

  // Suppress unused warning — kept for custom range apply
  void handleSetTimeline;
  void startInput;
  void endInput;
  void setStartInput;
  void setEndInput;

  return (
    <div className="border-b border-[#d5d5d5] dark:border-[#333333] py-[16px] px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-3">
        <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 list-none p-0 m-0">
          {isRegionView ? (
            <>
              <li><Link to="/" className="hover:underline">Realm view</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">Region view ({regionCode})</li>
            </>
          ) : (
            <li aria-current="page">Realm view</li>
          )}
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-2xl dark:text-white mb-2 pb-[8px]">
        {isRegionView ? `Region View — ${regionCode}` : 'Realm View'}
      </h1>

      {/* No live data banner */}
      {activeScenario === "no-live-data" && (
        <div className="flex items-start gap-3 mb-3 px-4 py-5 rounded-lg bg-[#de8011]/8 dark:bg-[#de8011]/10 border border-[#de8011]/30 dark:border-[#de8011]/25">
          <WifiOff className="w-4 h-4 text-[#de8011] shrink-0 mt-0.5" />
          <p className="text-sm text-[#7a4a00] dark:text-[#de8011] leading-snug">
            <span className="font-semibold">No live data available.</span>
            {" "}Showing data last polled at{" "}
            <span className="font-medium">{activatedAt ? formatTimestamp(activatedAt) : "—"}</span>.
            {" "}The dashboard will automatically refresh and this banner will be dismissed once live data is available.
          </p>
        </div>
      )}

      {/* Filters row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm dark:text-white">Timeframe</span>
        </div>

        {/* Time range — shadcn Select */}
        <Select value={selectedOption} onValueChange={(v) => handleDropdownChange(v as TimeRangeOption)}>
          <SelectTrigger className="w-[160px] max-w-[400px] bg-white dark:bg-[#1a1a1a] dark:text-white dark:border-[#404040]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last24h">Last 24 hours</SelectItem>
            <SelectItem value="lastWeek">Last week</SelectItem>
            <SelectItem value="last2Weeks">Last 2 weeks</SelectItem>
            <SelectItem value="lastMonth">Last month</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1" />

        {/* Help button */}
        <button
          onClick={() => setHelpOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 dark:border-[#404040] rounded text-sm bg-white dark:bg-[#1a1a1a] dark:text-white hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
          aria-label="Open dashboard guide"
        >
          <HelpCircle className="w-4 h-4 text-[#227e9e]" aria-hidden="true" />
          <span>Help</span>
        </button>
      </div>

      <HelpDrawer open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
