'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface MegaMenuContextType {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const MegaMenuContext = createContext<MegaMenuContextType | undefined>(undefined);

export const MegaMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <MegaMenuContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
      {children}
    </MegaMenuContext.Provider>
  );
};

export const useMegaMenu = () => {
  const context = useContext(MegaMenuContext);
  if (!context) {
    throw new Error('useMegaMenu must be used within a MegaMenuProvider');
  }
  return context;
};
