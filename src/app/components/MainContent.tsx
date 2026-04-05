import { ContentHeader } from "./ContentHeader";
import { IncidentChart } from "./IncidentChart";
import { MapSection } from "./MapSection";
import { BottomControls } from "./BottomControls";
import { MetricsSection } from "./MetricsSection";
import { BackboneMatrix } from "./BackboneMatrix";
import { useViewMode } from "../contexts/ViewModeContext";

export function MainContent() {
  const { viewMode } = useViewMode();
  
  return (
    <div className="flex-1 flex flex-col bg-white overflow-auto">
      {/* Breadcrumb and header */}
      <ContentHeader />
      
      {/* Chart section */}
      <IncidentChart />
      
      {/* Map section */}
      <MapSection />
      
      {/* Bottom controls */}
      <BottomControls />
      
      {/* Metrics section - conditional based on view mode */}
      {viewMode === 'backbone' ? <BackboneMatrix /> : <MetricsSection />}
    </div>
  );
}