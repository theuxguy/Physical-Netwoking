import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

// Mirror of the airports list in WorldMapDashboard — used to pick the default critical DC
const AIRPORTS = [
  { code: "JFK", name: "New York" },
  { code: "LAX", name: "Los Angeles" },
  { code: "ORD", name: "Chicago" },
  { code: "DFW", name: "Dallas" },
  { code: "DEN", name: "Denver" },
  { code: "SFO", name: "San Francisco" },
  { code: "SEA", name: "Seattle" },
  { code: "MIA", name: "Miami" },
  { code: "LHR", name: "London" },
  { code: "CDG", name: "Paris" },
  { code: "FRA", name: "Frankfurt" },
  { code: "AMS", name: "Amsterdam" },
  { code: "MAD", name: "Madrid" },
  { code: "FCO", name: "Rome" },
  { code: "IST", name: "Istanbul" },
  { code: "DXB", name: "Dubai" },
  { code: "DOH", name: "Doha" },
  { code: "SIN", name: "Singapore" },
  { code: "HKG", name: "Hong Kong" },
  { code: "NRT", name: "Tokyo" },
  { code: "ICN", name: "Seoul" },
  { code: "PEK", name: "Beijing" },
  { code: "PVG", name: "Shanghai" },
  { code: "BKK", name: "Bangkok" },
  { code: "SYD", name: "Sydney" },
  { code: "MEL", name: "Melbourne" },
  { code: "GRU", name: "São Paulo" },
  { code: "GIG", name: "Rio de Janeiro" },
  { code: "MEX", name: "Mexico City" },
  { code: "YYZ", name: "Toronto" },
  { code: "YVR", name: "Vancouver" },
  { code: "JNB", name: "Johannesburg" },
  { code: "CAI", name: "Cairo" },
  { code: "DEL", name: "Delhi" },
  { code: "BOM", name: "Mumbai" },
];

function mapSeededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Pick first airport with "danger" (Critical) status using the same seed as the map
const MAP_SEED = new Date("2023-08-18").getTime();
const DEFAULT_CRITICAL_AIRPORT = (() => {
  for (let i = 0; i < AIRPORTS.length; i++) {
    if (mapSeededRandom(MAP_SEED + i) >= 0.7) return AIRPORTS[i];
  }
  return AIRPORTS[0]; // fallback
})();

export interface RegionMetrics {
  code: string;
  name: string;
  healthStatus: "Healthy" | "Warning" | "Critical";
  ad1: {
    availability: string;
    performance: string;
    reliability: string;
  };
  ad2: {
    availability: string;
    performance: string;
    reliability: string;
  };
  ad3: {
    availability: string;
    performance: string;
    reliability: string;
  };
  fastConnect: {
    availability: string;
    performance: string;
    reliability: string;
  };
  internet: {
    availability: string;
    performance: string;
    reliability: string;
  };
  vpn: {
    availability: string;
    performance: string;
    reliability: string;
  };
  backbone: {
    availability: string;
    performance: string;
    reliability: string;
  };
}

interface RegionContextType {
  expandedRegions: RegionMetrics[];
  addRegion: (code: string, name: string, healthStatus: "Healthy" | "Warning" | "Critical") => void;
  removeRegion: (code: string) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

const getRandomStatus = () => {
  const statuses = ["Healthy", "Warning", "Critical"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

function buildRegionMetrics(code: string, name: string, healthStatus: "Healthy" | "Warning" | "Critical"): RegionMetrics {
  return {
    code,
    name,
    healthStatus,
    ad1: { availability: getRandomStatus(), performance: getRandomStatus(), reliability: getRandomStatus() },
    ad2: { availability: getRandomStatus(), performance: getRandomStatus(), reliability: getRandomStatus() },
    ad3: { availability: getRandomStatus(), performance: getRandomStatus(), reliability: getRandomStatus() },
    fastConnect: { availability: getRandomStatus(), performance: getRandomStatus(), reliability: getRandomStatus() },
    internet: { availability: getRandomStatus(), performance: getRandomStatus(), reliability: getRandomStatus() },
    vpn: { availability: getRandomStatus(), performance: getRandomStatus(), reliability: getRandomStatus() },
    backbone: { availability: getRandomStatus(), performance: getRandomStatus(), reliability: getRandomStatus() },
  };
}

const defaultRegion = buildRegionMetrics(
  DEFAULT_CRITICAL_AIRPORT.code,
  DEFAULT_CRITICAL_AIRPORT.name,
  "Critical"
);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [expandedRegions, setExpandedRegions] = useState<RegionMetrics[]>([defaultRegion]);

  const addRegion = (code: string, name: string, healthStatus: "Healthy" | "Warning" | "Critical") => {
    console.log('addRegion called in context:', code, name);
    console.log('Current expandedRegions:', expandedRegions);
    
    // Check if region already exists
    if (expandedRegions.some(r => r.code === code)) {
      console.log('Region already exists');
      return;
    }

    // Check if we already have 3 regions
    if (expandedRegions.length >= 3) {
      console.log('Already have 3 regions');
      return;
    }

    // Generate random metrics for the region
    const newRegion: RegionMetrics = {
      code,
      name,
      healthStatus,
      ad1: {
        availability: getRandomStatus(),
        performance: getRandomStatus(),
        reliability: getRandomStatus(),
      },
      ad2: {
        availability: getRandomStatus(),
        performance: getRandomStatus(),
        reliability: getRandomStatus(),
      },
      ad3: {
        availability: getRandomStatus(),
        performance: getRandomStatus(),
        reliability: getRandomStatus(),
      },
      fastConnect: {
        availability: getRandomStatus(),
        performance: getRandomStatus(),
        reliability: getRandomStatus(),
      },
      internet: {
        availability: getRandomStatus(),
        performance: getRandomStatus(),
        reliability: getRandomStatus(),
      },
      vpn: {
        availability: getRandomStatus(),
        performance: getRandomStatus(),
        reliability: getRandomStatus(),
      },
      backbone: {
        availability: getRandomStatus(),
        performance: getRandomStatus(),
        reliability: getRandomStatus(),
      },
    };

    console.log('Adding new region:', newRegion);
    setExpandedRegions([...expandedRegions, newRegion]);
    toast.success(`Region ${code} added to table`);
  };

  const removeRegion = (code: string) => {
    setExpandedRegions(expandedRegions.filter(r => r.code !== code));
    toast.error(`Region ${code} removed from table`);
  };

  return (
    <RegionContext.Provider value={{ expandedRegions, addRegion, removeRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}