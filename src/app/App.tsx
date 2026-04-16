import { RouterProvider } from "react-router";
import { router } from "./routes";
import { RegionProvider } from "./contexts/RegionContext";
import { TimeRangeProvider } from "./contexts/TimeRangeContext";
import { ViewModeProvider } from "./contexts/ViewModeContext";
import { HoveredConnectionProvider } from "./contexts/HoveredConnectionContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";

// Main App component with context providers
export default function App() {
  return (
    <DarkModeProvider>
      <TimeRangeProvider>
        <RegionProvider>
          <ViewModeProvider>
            <HoveredConnectionProvider>
              <RouterProvider router={router} />
            </HoveredConnectionProvider>
          </ViewModeProvider>
        </RegionProvider>
      </TimeRangeProvider>
    </DarkModeProvider>
  );
}