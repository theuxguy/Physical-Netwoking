import { createContext, useContext, useState, ReactNode } from "react";

export type SimulateScenario = "no-live-data" | "no-data" | null;

interface SimulateContextType {
  activeScenario: SimulateScenario;
  activatedAt: Date | null;
  setScenario: (scenario: SimulateScenario) => void;
}

const SimulateContext = createContext<SimulateContextType>({
  activeScenario: null,
  activatedAt: null,
  setScenario: () => {},
});

export function SimulateProvider({ children }: { children: ReactNode }) {
  const [activeScenario, setActiveScenario] = useState<SimulateScenario>(null);
  const [activatedAt, setActivatedAt] = useState<Date | null>(null);

  const setScenario = (scenario: SimulateScenario) => {
    setActiveScenario(scenario);
    setActivatedAt(scenario ? new Date() : null);
  };

  return (
    <SimulateContext.Provider value={{ activeScenario, activatedAt, setScenario }}>
      {children}
    </SimulateContext.Provider>
  );
}

export const useSimulate = () => useContext(SimulateContext);
