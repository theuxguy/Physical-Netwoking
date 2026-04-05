import { Header } from "./components/Header";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { RegionProvider } from "./contexts/RegionContext";
import { TimeRangeProvider } from "./contexts/TimeRangeContext";
import { ViewModeProvider } from "./contexts/ViewModeContext";
import { HoveredConnectionProvider } from "./contexts/HoveredConnectionContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { Toaster } from "./components/ui/sonner";

// Main App component with context providers
export default function App() {
  return (
    <DarkModeProvider>
      <TimeRangeProvider>
        <RegionProvider>
          <ViewModeProvider>
            <HoveredConnectionProvider>
              <div className="size-full flex flex-col bg-white dark:bg-[#0f0f0f]">
                {/* Top Header */}
                <Header />

                {/* Main Content - Full Width */}
                <div className="flex flex-1 overflow-hidden">
                  <RouterProvider router={router} />
                </div>
                <Toaster position="top-right" closeButton />
              </div>
            </HoveredConnectionProvider>
          </ViewModeProvider>
        </RegionProvider>
      </TimeRangeProvider>
    </DarkModeProvider>
  );
}