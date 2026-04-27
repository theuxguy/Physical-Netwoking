import { RouterProvider } from "react-router";
import { router } from "./routes";
import { RegionProvider } from "./contexts/RegionContext";
import { TimeRangeProvider } from "./contexts/TimeRangeContext";
import { ViewModeProvider } from "./contexts/ViewModeContext";
import { HoveredConnectionProvider } from "./contexts/HoveredConnectionContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { SimulateProvider } from "./contexts/SimulateContext";

export default function App() {
  return (
    <DarkModeProvider>
      <SimulateProvider>
        <TimeRangeProvider>
          <RegionProvider>
            <ViewModeProvider>
              <HoveredConnectionProvider>
                <RouterProvider router={router} />
              </HoveredConnectionProvider>
            </ViewModeProvider>
          </RegionProvider>
        </TimeRangeProvider>
      </SimulateProvider>
    </DarkModeProvider>
  );
}