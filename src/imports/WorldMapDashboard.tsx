import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker, Line } from "react-simple-maps";
import { useRegion } from "../app/contexts/RegionContext";
import { useTimeRange } from "../app/contexts/TimeRangeContext";
import { useViewMode } from "../app/contexts/ViewModeContext";
import { useHoveredConnection } from "../app/contexts/HoveredConnectionContext";
import { useDarkMode } from "../app/contexts/DarkModeContext";
import svgPaths from "./svg-health-success-icon";
import dangerSvgPaths from "./svg-danger-indicator-icon";
import warningSvgPaths from "./svg-warning-indicator-icon";
import buttonSvgPaths from "./svg-tooltip-button-icons";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Major international airports with coordinates
const airports = [
  { code: "JFK", coordinates: [-73.7781, 40.6413], name: "New York" },
  { code: "LAX", coordinates: [-118.4085, 33.9416], name: "Los Angeles" },
  { code: "ORD", coordinates: [-87.9073, 41.9742], name: "Chicago" },
  { code: "DFW", coordinates: [-97.0403, 32.8998], name: "Dallas" },
  { code: "DEN", coordinates: [-104.6731, 39.8561], name: "Denver" },
  { code: "SFO", coordinates: [-122.3790, 37.6213], name: "San Francisco" },
  { code: "SEA", coordinates: [-122.3088, 47.4502], name: "Seattle" },
  { code: "MIA", coordinates: [-80.2906, 25.7959], name: "Miami" },
  { code: "LHR", coordinates: [-0.4543, 51.4700], name: "London" },
  { code: "CDG", coordinates: [2.5479, 49.0097], name: "Paris" },
  { code: "FRA", coordinates: [8.5622, 50.0379], name: "Frankfurt" },
  { code: "AMS", coordinates: [4.7683, 52.3105], name: "Amsterdam" },
  { code: "MAD", coordinates: [-3.5673, 40.4839], name: "Madrid" },
  { code: "FCO", coordinates: [12.2389, 41.8003], name: "Rome" },
  { code: "IST", coordinates: [28.8146, 41.2753], name: "Istanbul" },
  { code: "DXB", coordinates: [55.3644, 25.2532], name: "Dubai" },
  { code: "DOH", coordinates: [51.6088, 25.2731], name: "Doha" },
  { code: "SIN", coordinates: [103.9915, 1.3644], name: "Singapore" },
  { code: "HKG", coordinates: [113.9185, 22.3080], name: "Hong Kong" },
  { code: "NRT", coordinates: [140.3929, 35.7720], name: "Tokyo" },
  { code: "ICN", coordinates: [126.4407, 37.4602], name: "Seoul" },
  { code: "PEK", coordinates: [116.5974, 40.0801], name: "Beijing" },
  { code: "PVG", coordinates: [121.8050, 31.1443], name: "Shanghai" },
  { code: "BKK", coordinates: [100.7501, 13.6900], name: "Bangkok" },
  { code: "SYD", coordinates: [151.1772, -33.9399], name: "Sydney" },
  { code: "MEL", coordinates: [144.8432, -37.6690], name: "Melbourne" },
  { code: "GRU", coordinates: [-46.4730, -23.4356], name: "São Paulo" },
  { code: "GIG", coordinates: [-43.2502, -22.8099], name: "Rio de Janeiro" },
  { code: "MEX", coordinates: [-99.0721, 19.4363], name: "Mexico City" },
  { code: "YYZ", coordinates: [-79.6248, 43.6777], name: "Toronto" },
  { code: "YVR", coordinates: [-123.1816, 49.1967], name: "Vancouver" },
  { code: "JNB", coordinates: [28.2460, -26.1392], name: "Johannesburg" },
  { code: "CAI", coordinates: [31.4056, 30.1219], name: "Cairo" },
  { code: "DEL", coordinates: [77.0999, 28.5562], name: "Delhi" },
  { code: "BOM", coordinates: [72.8682, 19.0895], name: "Mumbai" },
];

// Seeded random number generator for consistent randomization
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate random status based on seed
const getRandomStatus = (seed: number): string => {
  const rand = seededRandom(seed);
  if (rand < 0.4) return "healthy";
  if (rand < 0.7) return "warning";
  return "danger";
};

// Generate random health percentage for each airport
const getHealthPercentage = (status: string) => {
  if (status === "healthy") return Math.floor(Math.random() * 15) + 85; // 85-99%
  if (status === "warning") return Math.floor(Math.random() * 20) + 60; // 60-79%
  return Math.floor(Math.random() * 30) + 30; // 30-59% for danger
};

export default function Group({ overrideEndDate, readOnly }: { overrideEndDate?: Date; readOnly?: boolean }) {
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 3 });
  const [hoveredAirport, setHoveredAirport] = useState<string | null>(null);
  const [clickedAirport, setClickedAirport] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [expandedButton, setExpandedButton] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { addRegion, removeRegion, expandedRegions } = useRegion();
  const { startDate, endDate } = useTimeRange();
  const { viewMode } = useViewMode();
  const { hoveredConnection, setHoveredConnection } = useHoveredConnection();
  const { isDarkMode } = useDarkMode();
  
  // Regenerate health percentages and statuses when time range changes
  const airportHealthData = useMemo(() => {
    // Use timestamp as seed for pseudo-random but consistent values
    const seed = (overrideEndDate || endDate).getTime();
    return airports.map((airport, index) => {
      const status = getRandomStatus(seed + index);
      return {
        ...airport,
        status,
        healthPercentage: getHealthPercentage(status)
      };
    });
  }, [endDate, overrideEndDate]);

  // Generate backbone connections between airports
  const backboneConnections = useMemo(() => {
    const seed = (overrideEndDate || endDate).getTime();
    const connections: Array<{
      from: typeof airports[0];
      to: typeof airports[0];
      status: string;
    }> = [];

    // Define regional groups based on geographic location
    const regions = {
      northAmerica: ['JFK', 'LAX', 'ORD', 'DFW', 'DEN', 'SFO', 'SEA', 'MIA', 'YYZ', 'YVR'],
      southAmerica: ['GRU', 'GIG', 'MEX'],
      europe: ['LHR', 'CDG', 'FRA', 'AMS', 'MAD', 'FCO'],
      middleEast: ['IST', 'DXB', 'DOH', 'CAI'],
      asia: ['NRT', 'ICN', 'PEK', 'PVG', 'HKG', 'BKK', 'SIN'],
      india: ['DEL', 'BOM'],
      oceania: ['SYD', 'MEL'],
      africa: ['JNB']
    };

    // Create dense mesh within each region - connect each airport to multiple others in same region
    let connectionIndex = 0;
    Object.values(regions).forEach(regionCodes => {
      for (let i = 0; i < regionCodes.length; i++) {
        for (let j = i + 1; j < regionCodes.length; j++) {
          const from = airports.find(a => a.code === regionCodes[i]);
          const to = airports.find(a => a.code === regionCodes[j]);
          
          if (from && to) {
            const connectionStatus = getRandomStatus(seed + connectionIndex * 100);
            connections.push({ from, to, status: connectionStatus });
            connectionIndex++;
          }
        }
      }
    });

    // Add inter-regional connections (backbone links between continents)
    const interRegionalPairs = [
      // North America to Europe
      ['JFK', 'LHR'], ['JFK', 'CDG'], ['ORD', 'LHR'], ['YYZ', 'LHR'],
      // North America to Asia
      ['LAX', 'NRT'], ['LAX', 'HKG'], ['SFO', 'NRT'], ['SFO', 'HKG'], ['SEA', 'NRT'],
      // Europe to Middle East
      ['LHR', 'DXB'], ['FRA', 'DXB'], ['LHR', 'DOH'], ['IST', 'DXB'],
      // Europe to Asia
      ['LHR', 'HKG'], ['FRA', 'SIN'],
      // Middle East to Asia
      ['DXB', 'SIN'], ['DXB', 'HKG'], ['DOH', 'SIN'],
      // Middle East to India
      ['DXB', 'DEL'], ['DXB', 'BOM'], ['DOH', 'DEL'],
      // Asia to India
      ['SIN', 'DEL'], ['BKK', 'DEL'], ['HKG', 'DEL'],
      // Asia to Oceania
      ['SIN', 'SYD'], ['HKG', 'SYD'],
      // Americas connections
      ['MEX', 'LAX'], ['MEX', 'DFW'], ['GRU', 'MEX'], ['MIA', 'GRU'],
      // Africa connections
      ['JNB', 'DXB'], ['JNB', 'CAI'], ['CAI', 'IST'], ['CAI', 'DXB'],
    ];

    interRegionalPairs.forEach(([fromCode, toCode]) => {
      const from = airports.find(a => a.code === fromCode);
      const to = airports.find(a => a.code === toCode);
      
      if (from && to) {
        const connectionStatus = getRandomStatus(seed + connectionIndex * 100);
        connections.push({ from, to, status: connectionStatus });
        connectionIndex++;
      }
    });

    return connections;
  }, [endDate, overrideEndDate]);

  function handleMoveEnd(position: any) {
    setPosition(position);
  }

  const handleAddRegion = (code: string, name: string) => {
    console.log('handleAddRegion called:', code, name);
    const airport = airportHealthData.find(a => a.code === code);
    const healthStatus = airport?.status === "healthy" ? "Healthy" : airport?.status === "warning" ? "Warning" : "Critical";
    addRegion(code, name, healthStatus);
    setHoveredAirport(null); // Close the hover card after adding
    setClickedAirport(null);
  };

  const handleToggleRegion = (code: string, name: string) => {
    const isExpanded = expandedRegions.some(r => r.code === code);
    if (isExpanded) {
      console.log('Removing region:', code);
      removeRegion(code);
    } else {
      console.log('Adding region:', code, name);
      const airport = airportHealthData.find(a => a.code === code);
      const healthStatus = airport?.status === "healthy" ? "Healthy" : airport?.status === "warning" ? "Warning" : "Critical";
      addRegion(code, name, healthStatus);
    }
    setHoveredAirport(null); // Close the hover card after action
    setClickedAirport(null);
  };

  const handleMarkerClick = (code: string) => {
    console.log('Marker clicked:', code);
    setClickedAirport(code);
    setHoveredAirport(code);
  };

  const handleMouseEnter = (code: string) => {
    if (!clickedAirport) {
      setHoveredAirport(code);
    }
  };

  const handleMouseLeave = () => {
    if (!clickedAirport) {
      setHoveredAirport(null);
    }
  };

  const activeAirport = clickedAirport || hoveredAirport;

  // Calculate scale factor for labels based on zoom level
  // Always use 1/zoom so the visual size stays constant at all zoom levels
  const getLabelScale = (zoom: number) => {
    const safeZoom = zoom && zoom > 0 ? zoom : 1;
    return 1 / safeZoom;
  };

  const labelScale = getLabelScale(position.zoom);

  // Calculate stroke width for lines that doesn't scale with zoom
  const getStrokeWidth = (zoom: number) => {
    // Base stroke width at 1x zoom
    const baseWidth = 2;
    // Inverse scale to maintain constant visual thickness
    // Ensure zoom is never 0 or invalid
    const safeZoom = zoom && zoom > 0 ? zoom : 1;
    return baseWidth / safeZoom;
  };

  const strokeWidth = getStrokeWidth(position.zoom);

  // Calculate fixed offset for hover cards that doesn't change with zoom
  const getHoverCardOffset = (zoom: number) => {
    // Card height is 83px — offset keeps it fully above the marker
    const baseOffset = -83;
    const safeZoom = zoom && zoom > 0 ? zoom : 1;
    return baseOffset / safeZoom;
  };

  const hoverCardOffset = getHoverCardOffset(position.zoom);

  // Handle pinch-to-zoom on trackpad
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Detect pinch gesture (ctrl key + wheel on most trackpads)
      if (e.ctrlKey) {
        e.preventDefault();
        
        const zoomSensitivity = 0.01;
        const delta = -e.deltaY * zoomSensitivity;
        const newZoom = Math.max(1, Math.min(8, position.zoom + delta));
        
        setPosition(prev => ({
          ...prev,
          zoom: newZoom
        }));
      }
    };

    const mapElement = document.querySelector('[data-name="world-map-visualization"]');
    if (mapElement) {
      mapElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => mapElement.removeEventListener('wheel', handleWheel);
    }
  }, [position.zoom]);

  // Track panning state
  const handleMoveStart = () => {
    setIsPanning(true);
  };

  const handleMoveEndWithPanning = (newPosition: any) => {
    setPosition(newPosition);
    setIsPanning(false);
  };

  return (
    <div className="relative h-full w-full" style={{ cursor: isPanning ? 'grabbing' : 'grab' }}>
      <div className="absolute contents left-0 top-0">
        <div className="absolute h-full left-0 top-0 w-full" data-name="world-map-visualization">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 200,
              center: [0, 20]
            }}
            className="w-full h-full absolute inset-0"
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEndWithPanning}
              onMoveStart={handleMoveStart}
              minZoom={1}
              maxZoom={8}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isDarkMode ? "#2a2a2a" : "#E0E0E0"}
                      stroke={isDarkMode ? "#404040" : "#FFFFFF"}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: isDarkMode ? '#3a3a3a' : '#D0D0D0', outline: 'none' },
                        pressed: { fill: isDarkMode ? '#4a4a4a' : '#C0C0C0', outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>
              
              {/* Backbone health connections */}
              {viewMode === 'backbone' && backboneConnections.map((connection, index) => {
                const strokeColor = 
                  connection.status === 'healthy' ? '#508223' :
                  connection.status === 'warning' ? '#de8011' :
                  '#d63b25';
                
                const [fromLng, fromLat] = connection.from.coordinates;
                const [toLng, toLat] = connection.to.coordinates;
                
                // Check if this connection is hovered
                const isHovered = hoveredConnection && 
                  ((hoveredConnection.from === connection.from.code && hoveredConnection.to === connection.to.code) ||
                   (hoveredConnection.from === connection.to.code && hoveredConnection.to === connection.from.code));
                
                const currentStrokeWidth = isHovered ? strokeWidth * 3 : strokeWidth;
                const currentOpacity = isHovered ? 1 : 0.5;
                
                // Check if the connection crosses the antimeridian (wraps around the world)
                const lngDiff = Math.abs(toLng - fromLng);
                
                if (lngDiff > 180) {
                  // Connection wraps around - draw two line segments
                  const isFromWest = fromLng < 0;
                  
                  if (isFromWest) {
                    // From is in western hemisphere, to is in eastern
                    // Draw from 'from' to left edge, and from right edge to 'to'
                    return (
                      <g key={`connection-${index}`}>
                        {/* Invisible thicker line for hover detection */}
                        <Line
                          from={[fromLng, fromLat]}
                          to={[-180, fromLat + (toLat - fromLat) * ((fromLng + 180) / (360 - lngDiff))]}
                          stroke="transparent"
                          strokeWidth={strokeWidth * 6}
                          strokeLinecap="round"
                          onMouseEnter={() => setHoveredConnection({ from: connection.from.code, to: connection.to.code })}
                          onMouseLeave={() => setHoveredConnection(null)}
                          style={{ cursor: 'pointer' }}
                        />
                        <Line
                          from={[180, fromLat + (toLat - fromLat) * ((fromLng + 180) / (360 - lngDiff))]}
                          to={[toLng, toLat]}
                          stroke="transparent"
                          strokeWidth={strokeWidth * 6}
                          strokeLinecap="round"
                          onMouseEnter={() => setHoveredConnection({ from: connection.from.code, to: connection.to.code })}
                          onMouseLeave={() => setHoveredConnection(null)}
                          style={{ cursor: 'pointer' }}
                        />
                        {/* Visible line */}
                        <Line
                          from={[fromLng, fromLat]}
                          to={[-180, fromLat + (toLat - fromLat) * ((fromLng + 180) / (360 - lngDiff))]}
                          stroke={strokeColor}
                          strokeWidth={currentStrokeWidth}
                          strokeLinecap="round"
                          strokeOpacity={currentOpacity}
                          style={{ pointerEvents: 'none' }}
                        />
                        <Line
                          from={[180, fromLat + (toLat - fromLat) * ((fromLng + 180) / (360 - lngDiff))]}
                          to={[toLng, toLat]}
                          stroke={strokeColor}
                          strokeWidth={currentStrokeWidth}
                          strokeLinecap="round"
                          strokeOpacity={currentOpacity}
                          style={{ pointerEvents: 'none' }}
                        />
                      </g>
                    );
                  } else {
                    // From is in eastern hemisphere, to is in western
                    // Draw from 'from' to right edge, and from left edge to 'to'
                    return (
                      <g key={`connection-${index}`}>
                        {/* Invisible thicker line for hover detection */}
                        <Line
                          from={[fromLng, fromLat]}
                          to={[180, fromLat + (toLat - fromLat) * ((180 - fromLng) / (360 - lngDiff))]}
                          stroke="transparent"
                          strokeWidth={strokeWidth * 6}
                          strokeLinecap="round"
                          onMouseEnter={() => setHoveredConnection({ from: connection.from.code, to: connection.to.code })}
                          onMouseLeave={() => setHoveredConnection(null)}
                          style={{ cursor: 'pointer' }}
                        />
                        <Line
                          from={[-180, fromLat + (toLat - fromLat) * ((180 - fromLng) / (360 - lngDiff))]}
                          to={[toLng, toLat]}
                          stroke="transparent"
                          strokeWidth={strokeWidth * 6}
                          strokeLinecap="round"
                          onMouseEnter={() => setHoveredConnection({ from: connection.from.code, to: connection.to.code })}
                          onMouseLeave={() => setHoveredConnection(null)}
                          style={{ cursor: 'pointer' }}
                        />
                        {/* Visible line */}
                        <Line
                          from={[fromLng, fromLat]}
                          to={[180, fromLat + (toLat - fromLat) * ((180 - fromLng) / (360 - lngDiff))]}
                          stroke={strokeColor}
                          strokeWidth={currentStrokeWidth}
                          strokeLinecap="round"
                          strokeOpacity={currentOpacity}
                          style={{ pointerEvents: 'none' }}
                        />
                        <Line
                          from={[-180, fromLat + (toLat - fromLat) * ((180 - fromLng) / (360 - lngDiff))]}
                          to={[toLng, toLat]}
                          stroke={strokeColor}
                          strokeWidth={currentStrokeWidth}
                          strokeLinecap="round"
                          strokeOpacity={currentOpacity}
                          style={{ pointerEvents: 'none' }}
                        />
                      </g>
                    );
                  }
                }
                
                // Normal connection - doesn't cross antimeridian
                return (
                  <g key={`connection-${index}`}>
                    {/* Invisible thicker line for hover detection */}
                    <Line
                      from={connection.from.coordinates}
                      to={connection.to.coordinates}
                      stroke="transparent"
                      strokeWidth={strokeWidth * 6}
                      strokeLinecap="round"
                      onMouseEnter={() => setHoveredConnection({ from: connection.from.code, to: connection.to.code })}
                      onMouseLeave={() => setHoveredConnection(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* Visible line */}
                    <Line
                      from={connection.from.coordinates}
                      to={connection.to.coordinates}
                      stroke={strokeColor}
                      strokeWidth={currentStrokeWidth}
                      strokeLinecap="round"
                      strokeOpacity={currentOpacity}
                      style={{ pointerEvents: 'none' }}
                    />
                  </g>
                );
              })}
              
              {airportHealthData.map((airport) => {
                const isSelected = expandedRegions.some(r => r.code === airport.code);
                const statusColor = airport.status === "danger" ? "#d63b25" : airport.status === "warning" ? "#ac630c" : "#5f7d4f";
                const selectedTextColor = airport.status === "danger" ? "#a02a18" : airport.status === "warning" ? "#7a4500" : "#3a5c1a";
                return (
                <Marker key={airport.code} coordinates={airport.coordinates}>
                  <foreignObject x="-20" y="-8" width="40" height="16" style={{ overflow: 'visible' }}>
                    <div
                      className="relative rounded-[3px] h-[16px] cursor-pointer"
                      onMouseEnter={readOnly ? undefined : () => { handleMouseEnter(airport.code); }}
                      onMouseLeave={readOnly ? undefined : () => { handleMouseLeave(); }}
                      onClick={readOnly ? undefined : (e) => { e.stopPropagation(); handleMarkerClick(airport.code); }}
                      style={{
                        backgroundColor: isSelected ? 'white' : statusColor,
                        transform: `scale(${labelScale})`,
                        transformOrigin: 'center center',
                        pointerEvents: readOnly ? 'none' : 'auto'
                      }}
                    >
                      <div aria-hidden="true" className="absolute border-solid inset-0 pointer-events-none rounded-[3px]" style={{ borderWidth: 1, borderColor: statusColor }} />
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex items-center justify-center px-[5px] relative size-full">
                          <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0">
                            <div className="relative shrink-0 size-[10px]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                                {airport.status === "danger" ? (
                                  <path clipRule="evenodd" d={dangerSvgPaths.p1a4c9d80} fill={isSelected ? selectedTextColor : "white"} fillRule="evenodd" />
                                ) : airport.status === "warning" ? (
                                  <path d={warningSvgPaths.pcef2880} fill={isSelected ? selectedTextColor : "white"} />
                                ) : (
                                  <path d={svgPaths.p24a580} fill={isSelected ? selectedTextColor : "white"} />
                                )}
                              </svg>
                            </div>
                            <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[10px] text-center whitespace-nowrap" style={{ color: isSelected ? selectedTextColor : 'white' }}>{airport.code}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </Marker>
                );
              })}
              
              {/* Render hover card separately after all markers so it appears on top */}
              {!readOnly && activeAirport && airportHealthData.find(a => a.code === activeAirport) && (() => {
                const airport = airportHealthData.find(a => a.code === activeAirport)!;
                const isRegionExpanded = expandedRegions.some(r => r.code === airport.code);
                return (
                  <Marker key={`hover-${activeAirport}`} coordinates={airport.coordinates}>
                    <foreignObject x="0" y={hoverCardOffset} width="180" height="83" style={{ overflow: 'visible', pointerEvents: 'auto' }}>
                      <div
                        className={
                          airport.status === "healthy"
                            ? "bg-[rgba(228,238,224,0.8)] content-stretch flex flex-col gap-[6px] items-start justify-center px-[11px] rounded-[9px] size-full backdrop-blur-sm relative z-[1000]"
                            : airport.status === "warning"
                            ? "bg-[rgba(255,243,224,0.8)] content-stretch flex flex-col gap-[6px] items-start justify-center px-[11px] rounded-[9px] size-full backdrop-blur-sm relative z-[1000]"
                            : "bg-[rgba(255,228,224,0.8)] content-stretch flex flex-col gap-[6px] items-start justify-center px-[11px] rounded-[9px] size-full backdrop-blur-sm relative z-[1000]"
                        }
                        onMouseEnter={() => handleMouseEnter(activeAirport)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          transform: `scale(${labelScale})`,
                          transformOrigin: 'left top'
                        }}
                      >
                        <div aria-hidden="true" className="absolute border border-[rgba(22,21,19,0.12)] border-solid inset-0 pointer-events-none rounded-[9px]" />
                        <div className="relative shrink-0">
                          <div className="content-stretch flex items-start relative">
                            <div className={
                              airport.status === "healthy"
                                ? "bg-[#436b1d] relative rounded-[6px] shrink-0"
                                : airport.status === "warning"
                                ? "bg-[#ac630c] relative rounded-[6px] shrink-0"
                                : "bg-[#d63b25] relative rounded-[6px] shrink-0"
                            }>
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex items-center justify-center px-[6px] py-[3px] relative">
                                  <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-white whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                                    <p className="leading-[14px]">
                                      {airport.status === "healthy" ? "Healthy" : airport.status === "warning" ? "Warning" : "Danger"} {airport.healthPercentage}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="font-medium leading-[14px] not-italic relative shrink-0 text-[#161513] text-[10px]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                          Region: {airport.name}
                        </p>
                        <div className="content-stretch flex gap-[11px] items-center relative shrink-0">
                          <div
                            className={`relative rounded-[15px] shrink-0 cursor-pointer hover:bg-[rgba(22,21,19,0.05)] transition-all duration-200 ${expandedButton === `left-${airport.code}` ? 'pr-[6px]' : ''}`}
                            onMouseEnter={() => {
                              setHoveredButton(`left-${airport.code}`);
                              if (hoverTimer) clearTimeout(hoverTimer);
                              const timer = setTimeout(() => {
                                setExpandedButton(`left-${airport.code}`);
                              }, 1000);
                              setHoverTimer(timer);
                            }}
                            onMouseLeave={() => {
                              if (hoverTimer) clearTimeout(hoverTimer);
                              setHoveredButton(null);
                              setExpandedButton(null);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleRegion(airport.code, airport.name);
                            }}
                          >
                            <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[inherit] gap-[4px]">
                              <div className="relative shrink-0 size-[14px]">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                                  {isRegionExpanded ? (
                                    <path d="M0.832217 4.58334H9.16555V5.41667H0.832217V4.58334Z" fill="#161513" />
                                  ) : (
                                    <path d={buttonSvgPaths.pea7b770} fill="#161513" />
                                  )}
                                </svg>
                              </div>
                              {expandedButton === `left-${airport.code}` && (
                                <span className="font-normal text-[9px] text-[#161513] whitespace-nowrap">
                                  {isRegionExpanded ? 'Remove' : 'Add'}
                                </span>
                              )}
                            </div>
                            <div aria-hidden="true" className="absolute border border-[rgba(22,21,19,0.5)] border-solid inset-0 pointer-events-none rounded-[15px]" />
                          </div>
                          <div
                            className={`relative rounded-[15px] shrink-0 cursor-pointer hover:bg-[rgba(22,21,19,0.05)] transition-all duration-200 ${expandedButton === `right-${airport.code}` ? 'pr-[6px]' : ''}`}
                            onMouseEnter={() => {
                              setHoveredButton(`right-${airport.code}`);
                              if (hoverTimer) clearTimeout(hoverTimer);
                              const timer = setTimeout(() => {
                                setExpandedButton(`right-${airport.code}`);
                              }, 1000);
                              setHoverTimer(timer);
                            }}
                            onMouseLeave={() => {
                              if (hoverTimer) clearTimeout(hoverTimer);
                              setHoveredButton(null);
                              setExpandedButton(null);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/region/${airport.code}`);
                            }}
                          >
                            <div className="content-stretch flex items-center justify-center overflow-clip p-[6px] relative rounded-[inherit] gap-[4px]">
                              <div className="relative shrink-0 size-[14px]">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                                  <path clipRule="evenodd" d={buttonSvgPaths.p2f8eab00} fill="#161513" fillRule="evenodd" />
                                </svg>
                              </div>
                              {expandedButton === `right-${airport.code}` && (
                                <span className="font-normal text-[9px] text-[#161513] whitespace-nowrap">
                                  Check
                                </span>
                              )}
                            </div>
                            <div aria-hidden="true" className="absolute border border-[rgba(22,21,19,0.5)] border-solid inset-0 pointer-events-none rounded-[15px]" />
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                  </Marker>
                );
              })()}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}