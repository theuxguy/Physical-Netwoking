import { createContext, useContext, useState, ReactNode } from 'react';

interface HoveredConnectionContextType {
  hoveredConnection: { from: string; to: string } | null;
  setHoveredConnection: (connection: { from: string; to: string } | null) => void;
}

const HoveredConnectionContext = createContext<HoveredConnectionContextType | undefined>(undefined);

export function HoveredConnectionProvider({ children }: { children: ReactNode }) {
  const [hoveredConnection, setHoveredConnection] = useState<{ from: string; to: string } | null>(null);

  return (
    <HoveredConnectionContext.Provider value={{ hoveredConnection, setHoveredConnection }}>
      {children}
    </HoveredConnectionContext.Provider>
  );
}

export function useHoveredConnection() {
  const context = useContext(HoveredConnectionContext);
  if (context === undefined) {
    throw new Error('useHoveredConnection must be used within a HoveredConnectionProvider');
  }
  return context;
}
