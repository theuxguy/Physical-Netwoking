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
  const { height: tableHeight, handleDragStart } = useDragResize(280, 80, true);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0f0f0f] overflow-hidden">
      {/* Breadcrumb and header */}
      <ContentHeader />

      {/* Chart section */}
      <IncidentChart />

      {/* Map section — fills all remaining space between header and tables */}
      <div className="flex-1 min-h-0 flex flex-col">
        <MapSection />
      </div>

      {/* Drag handle — pull up to expand tables, push down to shrink */}
      <DragHandle onMouseDown={handleDragStart} />

      {/* Tables — fixed height pinned to bottom, scrollable internally */}
      <div style={{ height: tableHeight }} className="flex-shrink-0 overflow-auto min-h-0">
        <BottomControls />
        {viewMode === 'backbone' ? <BackboneMatrix /> : <MetricsSection />}
      </div>
    </div>
  );
}