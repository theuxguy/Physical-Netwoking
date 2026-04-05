import { useParams } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ContentHeader } from "./ContentHeader";
import { IncidentChart } from "./IncidentChart";
import { BottomControls } from "./BottomControls";
import { NetworkDiagram } from "./NetworkDiagram";
import { RegionHealthTable } from "./RegionHealthTable";

const getBlockLabel = (block: string) => {
  if (block.startsWith('bld')) {
    const num = block.replace('bld', '');
    return `BLD ${num}`;
  } else if (block.startsWith('ad')) {
    return block.toUpperCase().replace('AD', 'AD-');
  }
  return block.toUpperCase();
};

export function RegionView() {
  const { regionCode } = useParams<{ regionCode: string }>();
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]);

  const handleBlockClick = (blockName: string) => {
    // Add block if not already expanded, max 8 blocks
    if (!expandedBlocks.includes(blockName) && expandedBlocks.length < 8) {
      setExpandedBlocks([...expandedBlocks, blockName]);
      toast.success(`${getBlockLabel(blockName)} added to table`);
    }
  };

  const handleCloseBlock = (blockName: string) => {
    setExpandedBlocks(expandedBlocks.filter(b => b !== blockName));
    toast.error(`${getBlockLabel(blockName)} removed from table`);
  };
  
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0f0f0f] overflow-auto">
      {/* Breadcrumb and header */}
      <ContentHeader isRegionView regionCode={regionCode} />
      
      {/* Chart section */}
      <IncidentChart />
      
      {/* Network diagram section with Availability Domain */}
      <div className="px-6 pb-6">
        <NetworkDiagram onADClick={handleBlockClick} expandedAD={null} expandedBlocks={expandedBlocks} />
      </div>
      
      {/* Bottom controls */}
      <BottomControls />

      {/* Table section */}
      <div className="px-6 pb-6">
        <RegionHealthTable expandedBlocks={expandedBlocks} onCloseBlock={handleCloseBlock} />
      </div>
    </div>
  );
}