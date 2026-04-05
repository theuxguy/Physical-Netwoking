import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRef, useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useTimeRange } from "../contexts/TimeRangeContext";
import Pop2Block from "../../imports/Pop2Block";
import Pop3Block from "./Pop3Block";
import InternetBlock from "../../imports/InternetBlock";
import BackboneBlock from "../../imports/BackboneBlock";
import CustomerNetworkBlock from "../../imports/CustomerNetworkBlock";
import AD1Block from "./AD1Block";
import AD2Block from "./AD2Block";
import AD3Block from "./AD3Block";

interface BlockPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

interface Position {
  x: number;
  y: number;
}

interface NetworkDiagramProps {
  onADClick: (adName: string) => void;
  expandedAD: string | null;
  expandedBlocks: string[];
}

const BLOCK_SIZES = {
  internet: { width: 166, height: 45 },
  backbone: { width: 138, height: 45 },
  customerNetwork: { width: 219, height: 44 },
  pop2: { width: 167, height: 78 },
  pop3: { width: 167, height: 78 },
  ad1: { width: 536, height: 245 },
  ad2: { width: 536, height: 245 },
  ad3: { width: 536, height: 245 },
};

const formatDate = (date: Date) => {
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month} ${day}, ${year} ${hours}:${minutes} UTC`;
};

export function NetworkDiagram({ onADClick, expandedAD, expandedBlocks }: NetworkDiagramProps) {
  const { currentWindowDate, initialEndDate, setCurrentWindowDate, setHasMovedWindow, setShowComparison } = useTimeRange();
  const containerRef = useRef<HTMLDivElement>(null);
  const internetRef = useRef<HTMLDivElement>(null);
  const backboneRef = useRef<HTMLDivElement>(null);
  const customerNetworkRef = useRef<HTMLDivElement>(null);
  const pop2Ref = useRef<HTMLDivElement>(null);
  const pop3Ref = useRef<HTMLDivElement>(null);
  const ad1Ref = useRef<HTMLDivElement>(null);
  const ad2Ref = useRef<HTMLDivElement>(null);
  const ad3Ref = useRef<HTMLDivElement>(null);
  
  const [connections, setConnections] = useState<Array<{x1: number, y1: number, x2: number, y2: number}>>([]);
  const [initialized, setInitialized] = useState(false);
  const [hasAddedAD, setHasAddedAD] = useState(false);
  
  // Position state for each block
  const [internetPos, setInternetPos] = useState<Position>({ x: 0, y: 0 });
  const [backbonePos, setBackbonePos] = useState<Position>({ x: 0, y: 0 });
  const [customerNetworkPos, setCustomerNetworkPos] = useState<Position>({ x: 0, y: 0 });
  const [pop2Pos, setPop2Pos] = useState<Position>({ x: 0, y: 0 });
  const [pop3Pos, setPop3Pos] = useState<Position>({ x: 0, y: 0 });
  const [ad1Pos, setAd1Pos] = useState<Position>({ x: 0, y: 0 });
  const [ad2Pos, setAd2Pos] = useState<Position>({ x: 0, y: 0 });
  const [ad3Pos, setAd3Pos] = useState<Position>({ x: 0, y: 0 });
  
  // Store initial positions for reset
  const initialPositions = useRef<{[key: string]: Position}>({});
  
  // Dragging state
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  // Hover state
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  
  // Block status colors based on their actual border colors
  const blockColors = {
    internet: '#508223', // green - healthy
    backbone: '#de8011', // amber - warning
    customerNetwork: '#508223', // green - healthy
    pop2: '#d63b25', // red - critical
    pop3: '#d63b25', // red - critical
    ad1: '#d63b25', // red - critical (ADI-1 has red border)
    ad2: '#508223', // green - healthy (ADI-2 has green border)
    ad3: 'rgba(222,128,17,0.6)', // amber - warning (ADI-3 has amber border)
  };
  
  const getHoverColor = (blockName: string) => {
    const borderColor = blockColors[blockName as keyof typeof blockColors];
    
    // Convert border color to lighter shade for hover
    if (borderColor === '#508223') {
      // Green - healthy
      return 'rgba(80, 130, 35, 0.15)';
    } else if (borderColor === '#de8011' || borderColor.startsWith('#de')) {
      // Amber - warning
      return 'rgba(222, 128, 17, 0.15)';
    } else if (borderColor === '#d63b25') {
      // Red - critical
      return 'rgba(214, 59, 37, 0.15)';
    }
    
    return 'rgba(0, 0, 0, 0.05)';
  };

  const calculateInitialPositions = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    
    // Validate dimensions
    if (!containerRect.width || !containerRect.height || isNaN(centerX) || isNaN(centerY)) {
      return;
    }
    
    // Calculate positions to center everything
    const topRowWidth = BLOCK_SIZES.internet.width + BLOCK_SIZES.backbone.width + BLOCK_SIZES.customerNetwork.width + 32; // 32px for gaps
    const topRowStartX = centerX - topRowWidth / 2;
    const topY = centerY - 150;
    
    const internet = { x: topRowStartX, y: topY };
    const backbone = { x: topRowStartX + BLOCK_SIZES.internet.width + 16, y: topY };
    const customerNetwork = { x: topRowStartX + BLOCK_SIZES.internet.width + BLOCK_SIZES.backbone.width + 32, y: topY };
    
    const popRowWidth = BLOCK_SIZES.pop2.width + BLOCK_SIZES.pop3.width + 16;
    const popRowStartX = centerX - popRowWidth / 2;
    const popY = topY + 100;
    
    const pop2 = { x: popRowStartX, y: popY };
    const pop3 = { x: popRowStartX + BLOCK_SIZES.pop2.width + 16, y: popY };
    
    // Position AD blocks in a row with spacing
    const adRowWidth = (BLOCK_SIZES.ad1.width * 3) + 32; // 3 blocks + 2 gaps of 16px each
    const adRowStartX = centerX - adRowWidth / 2;
    const adY = popY + 100;
    
    const ad1 = { x: adRowStartX, y: adY };
    const ad2 = { x: adRowStartX + BLOCK_SIZES.ad1.width + 16, y: adY };
    const ad3 = { x: adRowStartX + (BLOCK_SIZES.ad1.width * 2) + 32, y: adY };
    
    initialPositions.current = {
      internet,
      backbone,
      customerNetwork,
      pop2,
      pop3,
      ad1,
      ad2,
      ad3,
    };
    
    setInternetPos(internet);
    setBackbonePos(backbone);
    setCustomerNetworkPos(customerNetwork);
    setPop2Pos(pop2);
    setPop3Pos(pop3);
    setAd1Pos(ad1);
    setAd2Pos(ad2);
    setAd3Pos(ad3);
    setInitialized(true);
  };

  const calculateConnections = () => {
    if (!containerRef.current || !initialized) return;

    const blocks = [
      { pos: internetPos, size: BLOCK_SIZES.internet },
      { pos: backbonePos, size: BLOCK_SIZES.backbone },
      { pos: customerNetworkPos, size: BLOCK_SIZES.customerNetwork },
      { pos: pop2Pos, size: BLOCK_SIZES.pop2 },
      { pos: pop3Pos, size: BLOCK_SIZES.pop3 },
      { pos: ad1Pos, size: BLOCK_SIZES.ad1 },
      { pos: ad2Pos, size: BLOCK_SIZES.ad2 },
      { pos: ad3Pos, size: BLOCK_SIZES.ad3 },
    ];

    const positions: BlockPosition[] = blocks.map(block => ({
      x: block.pos.x,
      y: block.pos.y,
      width: block.size.width,
      height: block.size.height,
      centerX: block.pos.x + block.size.width / 2,
      centerY: block.pos.y + block.size.height / 2,
    }));

    // Connect every block to every other block
    const newConnections: Array<{x1: number, y1: number, x2: number, y2: number}> = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        newConnections.push({
          x1: positions[i].centerX,
          y1: positions[i].centerY,
          x2: positions[j].centerX,
          y2: positions[j].centerY,
        });
      }
    }

    setConnections(newConnections);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      calculateInitialPositions();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);
  
  // Recalculate connections when any position changes
  useEffect(() => {
    if (initialized) {
      calculateConnections();
    }
  }, [internetPos, backbonePos, customerNetworkPos, pop2Pos, pop3Pos, ad1Pos, ad2Pos, ad3Pos, initialized]);
  
  const handleMouseDown = (blockName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(blockName);
    
    const positions = {
      internet: internetPos,
      backbone: backbonePos,
      customerNetwork: customerNetworkPos,
      pop2: pop2Pos,
      pop3: pop3Pos,
      ad1: ad1Pos,
      ad2: ad2Pos,
      ad3: ad3Pos,
    };
    
    const currentPos = positions[blockName as keyof typeof positions];
    
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      
      setDragOffset({
        x: e.clientX - containerRect.left - currentPos.x,
        y: e.clientY - containerRect.top - currentPos.y,
      });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    let newX = e.clientX - containerRect.left - dragOffset.x;
    let newY = e.clientY - containerRect.top - dragOffset.y;
    
    // Validate that newX and newY are valid numbers
    if (isNaN(newX) || isNaN(newY)) return;
    
    // Get block size
    const blockSize = BLOCK_SIZES[dragging as keyof typeof BLOCK_SIZES];
    
    // Add boundaries to keep blocks within container
    newX = Math.max(0, Math.min(newX, containerRect.width - blockSize.width));
    newY = Math.max(0, Math.min(newY, containerRect.height - blockSize.height));
    
    const setters = {
      internet: setInternetPos,
      backbone: setBackbonePos,
      customerNetwork: setCustomerNetworkPos,
      pop2: setPop2Pos,
      pop3: setPop3Pos,
      ad1: setAd1Pos,
      ad2: setAd2Pos,
      ad3: setAd3Pos,
    };
    
    const setter = setters[dragging as keyof typeof setters];
    if (setter) {
      setter({ x: newX, y: newY });
    }
  };
  
  const handleMouseUp = () => {
    setDragging(null);
  };
  
  useEffect(() => {
    if (dragging) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging]);

  const resetPositions = () => {
    const positions = initialPositions.current;
    
    // Validate all positions before setting
    if (positions['internet'] && !isNaN(positions['internet'].x) && !isNaN(positions['internet'].y)) {
      setInternetPos(positions['internet']);
    }
    if (positions['backbone'] && !isNaN(positions['backbone'].x) && !isNaN(positions['backbone'].y)) {
      setBackbonePos(positions['backbone']);
    }
    if (positions['customerNetwork'] && !isNaN(positions['customerNetwork'].x) && !isNaN(positions['customerNetwork'].y)) {
      setCustomerNetworkPos(positions['customerNetwork']);
    }
    if (positions['pop2'] && !isNaN(positions['pop2'].x) && !isNaN(positions['pop2'].y)) {
      setPop2Pos(positions['pop2']);
    }
    if (positions['pop3'] && !isNaN(positions['pop3'].x) && !isNaN(positions['pop3'].y)) {
      setPop3Pos(positions['pop3']);
    }
    if (positions['ad1'] && !isNaN(positions['ad1'].x) && !isNaN(positions['ad1'].y)) {
      setAd1Pos(positions['ad1']);
    }
    if (positions['ad2'] && !isNaN(positions['ad2'].x) && !isNaN(positions['ad2'].y)) {
      setAd2Pos(positions['ad2']);
    }
    if (positions['ad3'] && !isNaN(positions['ad3'].x) && !isNaN(positions['ad3'].y)) {
      setAd3Pos(positions['ad3']);
    }
  };

  // Wrapper function to track when AD blocks are clicked
  const handleADClick = (adName: string) => {
    // Check if it's an AD block (not a BLD block)
    if (adName === 'ad1' || adName === 'ad2' || adName === 'ad3') {
      setHasAddedAD(true);
    }
    onADClick(adName);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Network Diagram */}
      <div 
        className="relative w-full h-[500px] bg-white dark:bg-[#0f0f0f] border border-[#d8d8d8] dark:border-[#404040] rounded-lg overflow-hidden"
      >
        {/* Message Banner */}
        {!hasAddedAD && (
          <div className="absolute left-4 top-4 z-30 bg-[#e8f4f8] dark:bg-[#1a3a44] border border-[#4db8e8] dark:border-[#4db8e8] rounded-lg px-4 py-3 max-w-md">
            <p className="text-sm text-[#00688c] dark:text-[#4db8e8] font-['Inter:Regular',sans-serif]">
              Click to add an Activity Domain (AD) to the table to see a further breakdown of its health metrics.
            </p>
          </div>
        )}
        
        {/* Refresh + live data label */}
        <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
          <button
            onClick={() => { setCurrentWindowDate(initialEndDate); setHasMovedWindow(false); setShowComparison(false); }}
            className="flex items-center gap-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-1.5 text-xs dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh</span>
          </button>
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#404040] rounded px-3 py-1.5 text-xs font-bold dark:text-white">
            Showing live data for {formatDate(currentWindowDate)}
          </div>
        </div>
        
        {/* Availability Domain Blocks - positioned at bottom of map area */}
        <div className="absolute top-6 bottom-6 left-6 right-6 z-20">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            centerOnInit={false}
            wheel={{ step: 0.1 }}
            panning={{ disabled: dragging !== null }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <TransformComponent
                  wrapperStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                  contentStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div 
                    ref={containerRef} 
                    className="w-full h-full relative"
                    onMouseMove={handleMouseMove}
                    style={{ cursor: dragging ? 'grabbing' : 'default' }}
                  >
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                      {connections.map((conn, index) => (
                        <line
                          key={index}
                          x1={conn.x1}
                          y1={conn.y1}
                          x2={conn.x2}
                          y2={conn.y2}
                          className="stroke-[#508223] dark:stroke-[#7fb83e]"
                          strokeWidth="1"
                        />
                      ))}
                    </svg>
                    
                    {/* Internet Block */}
                    <div 
                      ref={internetRef} 
                      className="absolute"
                      style={{
                        left: `${internetPos.x}px`,
                        top: `${internetPos.y}px`,
                        width: `${BLOCK_SIZES.internet.width}px`,
                        height: `${BLOCK_SIZES.internet.height}px`,
                        cursor: 'grab',
                        userSelect: 'none',
                        zIndex: 1,
                      }}
                      onMouseDown={(e) => handleMouseDown('internet', e)}
                      onMouseEnter={() => setHoveredBlock('internet')}
                      onMouseLeave={() => setHoveredBlock(null)}
                    >
                      {hoveredBlock === 'internet' && (
                        <div 
                          className="absolute inset-0 pointer-events-none rounded"
                          style={{
                            backgroundColor: getHoverColor('internet'),
                            zIndex: 10,
                          }}
                        />
                      )}
                      <InternetBlock />
                    </div>
                    
                    {/* Backbone Block */}
                    <div 
                      ref={backboneRef} 
                      className="absolute"
                      style={{
                        left: `${backbonePos.x}px`,
                        top: `${backbonePos.y}px`,
                        width: `${BLOCK_SIZES.backbone.width}px`,
                        height: `${BLOCK_SIZES.backbone.height}px`,
                        cursor: 'grab',
                        userSelect: 'none',
                        zIndex: 1,
                      }}
                      onMouseDown={(e) => handleMouseDown('backbone', e)}
                      onMouseEnter={() => setHoveredBlock('backbone')}
                      onMouseLeave={() => setHoveredBlock(null)}
                    >
                      {hoveredBlock === 'backbone' && (
                        <div 
                          className="absolute inset-0 pointer-events-none rounded"
                          style={{
                            backgroundColor: getHoverColor('backbone'),
                            zIndex: 10,
                          }}
                        />
                      )}
                      <BackboneBlock />
                    </div>
                    
                    {/* Customer Network Block */}
                    <div 
                      ref={customerNetworkRef} 
                      className="absolute"
                      style={{
                        left: `${customerNetworkPos.x}px`,
                        top: `${customerNetworkPos.y}px`,
                        width: `${BLOCK_SIZES.customerNetwork.width}px`,
                        height: `${BLOCK_SIZES.customerNetwork.height}px`,
                        cursor: 'grab',
                        userSelect: 'none',
                        zIndex: 1,
                      }}
                      onMouseDown={(e) => handleMouseDown('customerNetwork', e)}
                      onMouseEnter={() => setHoveredBlock('customerNetwork')}
                      onMouseLeave={() => setHoveredBlock(null)}
                    >
                      {hoveredBlock === 'customerNetwork' && (
                        <div 
                          className="absolute inset-0 pointer-events-none rounded"
                          style={{
                            backgroundColor: getHoverColor('customerNetwork'),
                            zIndex: 10,
                          }}
                        />
                      )}
                      <CustomerNetworkBlock />
                    </div>
                    
                    {/* POP-2 Block */}
                    <div 
                      ref={pop2Ref} 
                      className="absolute"
                      style={{
                        left: `${pop2Pos.x}px`,
                        top: `${pop2Pos.y}px`,
                        width: `${BLOCK_SIZES.pop2.width}px`,
                        height: `${BLOCK_SIZES.pop2.height}px`,
                        cursor: 'grab',
                        userSelect: 'none',
                        zIndex: 1,
                      }}
                      onMouseDown={(e) => handleMouseDown('pop2', e)}
                      onMouseEnter={() => setHoveredBlock('pop2')}
                      onMouseLeave={() => setHoveredBlock(null)}
                    >
                      {hoveredBlock === 'pop2' && (
                        <div 
                          className="absolute inset-0 pointer-events-none rounded"
                          style={{
                            backgroundColor: getHoverColor('pop2'),
                            zIndex: 10,
                          }}
                        />
                      )}
                      <Pop2Block />
                    </div>
                    
                    {/* POP-3 Block */}
                    <div 
                      ref={pop3Ref} 
                      className="absolute"
                      style={{
                        left: `${pop3Pos.x}px`,
                        top: `${pop3Pos.y}px`,
                        width: `${BLOCK_SIZES.pop3.width}px`,
                        height: `${BLOCK_SIZES.pop3.height}px`,
                        cursor: 'grab',
                        userSelect: 'none',
                        zIndex: 1,
                      }}
                      onMouseDown={(e) => handleMouseDown('pop3', e)}
                      onMouseEnter={() => setHoveredBlock('pop3')}
                      onMouseLeave={() => setHoveredBlock(null)}
                    >
                      {hoveredBlock === 'pop3' && (
                        <div 
                          className="absolute inset-0 pointer-events-none rounded"
                          style={{
                            backgroundColor: getHoverColor('pop3'),
                            zIndex: 10,
                          }}
                        />
                      )}
                      <Pop3Block />
                    </div>
                    
                    {/* AD Blocks */}
                    <div 
                      ref={ad1Ref} 
                      className="absolute overflow-hidden"
                      style={{
                        left: `${ad1Pos.x}px`,
                        top: `${ad1Pos.y}px`,
                        width: `${BLOCK_SIZES.ad1.width}px`,
                        height: `${BLOCK_SIZES.ad1.height}px`,
                        cursor: 'grab',
                        userSelect: 'none',
                        zIndex: 1,
                      }}
                      onMouseDown={(e) => handleMouseDown('ad1', e)}
                      onMouseEnter={() => setHoveredBlock('ad1')}
                      onMouseLeave={() => setHoveredBlock(null)}
                      onClick={() => handleADClick('ad1')}
                    >
                      <AD1Block onClick={() => handleADClick('ad1')} isClickable={true} onBLDClick={onADClick} isHovered={hoveredBlock === 'ad1' || expandedBlocks.includes('ad1')} expandedBlocks={expandedBlocks} />
                    </div>
                    
                    <div 
                      ref={ad2Ref}
                      className="absolute overflow-hidden"
                      style={{
                        left: `${ad2Pos.x}px`,
                        top: `${ad2Pos.y}px`,
                        width: `${BLOCK_SIZES.ad2.width}px`,
                        height: `${BLOCK_SIZES.ad2.height}px`,
                        cursor: 'grab',
                        userSelect: 'none',
                        zIndex: 1,
                      }}
                      onMouseDown={(e) => handleMouseDown('ad2', e)}
                      onMouseEnter={() => setHoveredBlock('ad2')}
                      onMouseLeave={() => setHoveredBlock(null)}
                      onClick={() => handleADClick('ad2')}
                    >
                      <AD2Block onClick={() => handleADClick('ad2')} isClickable={true} onBLDClick={onADClick} isHovered={hoveredBlock === 'ad2' || expandedBlocks.includes('ad2')} />
                    </div>
                    
                    <div 
                      ref={ad3Ref}
                      className="absolute overflow-hidden"
                      style={{
                        left: `${ad3Pos.x}px`,
                        top: `${ad3Pos.y}px`,
                        width: `${BLOCK_SIZES.ad3.width}px`,
                        height: `${BLOCK_SIZES.ad3.height}px`,
                        cursor: 'grab',
                        userSelect: 'none',
                        zIndex: 1,
                      }}
                      onMouseDown={(e) => handleMouseDown('ad3', e)}
                      onMouseEnter={() => setHoveredBlock('ad3')}
                      onMouseLeave={() => setHoveredBlock(null)}
                      onClick={() => handleADClick('ad3')}
                    >
                      <AD3Block onClick={() => handleADClick('ad3')} isClickable={true} onBLDClick={onADClick} isHovered={hoveredBlock === 'ad3' || expandedBlocks.includes('ad3')} />
                    </div>
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
        
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={3}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Zoom controls */}
              <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
                
                
                
              </div>

              <TransformComponent
                wrapperStyle={{
                  width: '100%',
                  height: '100%',
                }}
                contentStyle={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Network diagram content */}
                
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}