import { ContentHeader } from "./ContentHeader";
import { IncidentChart } from "./IncidentChart";
import { MapSection } from "./MapSection";
import { BottomControls } from "./BottomControls";
import { MetricsSection } from "./MetricsSection";
import { BackboneMatrix } from "./BackboneMatrix";
import { DragHandle } from "./DragHandle";
import { useViewMode } from "../contexts/ViewModeContext";
import { useDragResize } from "../hooks/useDragResize";

export function RealmView() {
  const { viewMode } = useViewMode();
  const { height: mapHeight, handleDragStart } = useDragResize(320);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0f0f0f] overflow-hidden">
      {/* Breadcrumb and header */}
      <ContentHeader />

      {/* Chart section */}
      <IncidentChart />

      {/* Map section — height controlled by drag handle */}
      <div style={{ height: mapHeight }} className="flex-shrink-0 min-h-0">
        <MapSection />
      </div>

      {/* Drag handle */}
      <DragHandle onMouseDown={handleDragStart} />

      {/* Bottom section — fills remaining space, scrollable */}
      <div className="flex-1 overflow-auto min-h-0">
        <BottomControls />
        {viewMode === 'backbone' ? <BackboneMatrix /> : <MetricsSection />}
      </div>
    </div>
  );
}