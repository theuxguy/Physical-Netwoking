import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

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

export function RegionProvider({ children }: { children: ReactNode }) {
  const [expandedRegions, setExpandedRegions] = useState<RegionMetrics[]>([]);

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