import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// TimeRange context for managing global time range state
type TimeRangeContextType = {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setTimeRange: (start: Date, end: Date) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hasMovedWindow: boolean;
  setHasMovedWindow: (moved: boolean) => void;
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;
  currentWindowDate: Date;
  setCurrentWindowDate: (date: Date) => void;
  initialEndDate: Date;
};

const TimeRangeContext = createContext<TimeRangeContextType | undefined>(undefined);

export function TimeRangeProvider({ children }: { children: ReactNode }) {
  // Default to "Last week" time range
  const defaultEndDate = new Date("2023-08-18");
  const defaultStartDate = new Date(defaultEndDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const [startDate, setStartDateInternal] = useState(defaultStartDate);
  const [endDate, setEndDateInternal] = useState(defaultEndDate);
  const [isLoading, setIsLoadingInternal] = useState(false);
  const [hasMovedWindow, setHasMovedWindowInternal] = useState(false);
  const [showComparison, setShowComparisonInternal] = useState(false);
  const [currentWindowDate, setCurrentWindowDateInternal] = useState(defaultEndDate);

  const setStartDate = useCallback((date: Date) => {
    setStartDateInternal(date);
  }, []);

  const setEndDate = useCallback((date: Date) => {
    setEndDateInternal(date);
  }, []);

  const setTimeRange = useCallback((start: Date, end: Date) => {
    setStartDateInternal(start);
    setEndDateInternal(end);
  }, []);

  const setIsLoading = useCallback((loading: boolean) => {
    setIsLoadingInternal(loading);
  }, []);

  const setHasMovedWindow = useCallback((moved: boolean) => {
    setHasMovedWindowInternal(moved);
  }, []);

  const setShowComparison = useCallback((show: boolean) => {
    setShowComparisonInternal(show);
  }, []);

  const setCurrentWindowDate = useCallback((date: Date) => {
    setCurrentWindowDateInternal(date);
  }, []);

  return (
    <TimeRangeContext.Provider 
      value={{ 
        startDate, 
        endDate, 
        setStartDate, 
        setEndDate, 
        setTimeRange, 
        isLoading, 
        setIsLoading,
        hasMovedWindow,
        setHasMovedWindow,
        showComparison,
        setShowComparison,
        currentWindowDate,
        setCurrentWindowDate,
        initialEndDate: defaultEndDate
      }}
    >
      {children}
    </TimeRangeContext.Provider>
  );
}

export function useTimeRange() {
  const context = useContext(TimeRangeContext);
  if (context === undefined) {
    // Provide fallback defaults for hot module reloading
    const defaultEndDate = new Date("2023-08-18");
    const defaultStartDate = new Date(defaultEndDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    console.warn("useTimeRange called outside TimeRangeProvider - using fallback values");
    return {
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      setStartDate: () => {},
      setEndDate: () => {},
      setTimeRange: () => {},
      isLoading: false,
      setIsLoading: () => {},
      hasMovedWindow: false,
      setHasMovedWindow: () => {},
      showComparison: false,
      setShowComparison: () => {},
      currentWindowDate: defaultEndDate,
      setCurrentWindowDate: () => {},
      initialEndDate: defaultEndDate
    };
  }
  return context;
}