import React, { createContext, useCallback, useContext, useState } from "react";

interface ShipmentModalContextValue {
  isOpen: boolean;
  herbName: string;
  open: (herbName?: string) => void;
  close: () => void;
}

const ShipmentModalContext = createContext<ShipmentModalContextValue | null>(null);

export const ShipmentModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [herbName, setHerbName] = useState("Đinh lăng");

  const open = useCallback((name: string = "Đinh lăng") => {
    setHerbName(name);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ShipmentModalContext.Provider value={{ isOpen, herbName, open, close }}>
      {children}
    </ShipmentModalContext.Provider>
  );
};

export const useShipmentModal = (): ShipmentModalContextValue => {
  const ctx = useContext(ShipmentModalContext);
  if (!ctx) {
    throw new Error("useShipmentModal phải được dùng bên trong <ShipmentModalProvider>");
  }
  return ctx;
};
