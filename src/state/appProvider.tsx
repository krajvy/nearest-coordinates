import type { ReactNode } from 'react';

import { useReducer } from 'react';
import { appReducer } from '@/state/appReducer';
import { AppContext } from '@/state/appContext';
import { initialState } from '@/constants';

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
