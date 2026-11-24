import type { NcContextType } from '@/types';

import { createContext, useContext } from 'react';

export const AppContext = createContext<NcContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
