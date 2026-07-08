import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AppData } from '../types';
import { appReducer, AppAction } from './appReducer';
import { loadAppData, saveAppData } from './storage';

interface AppContextValue {
  data: AppData;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, dispatch] = useReducer(appReducer, undefined, loadAppData);

  // Single Source of Truth: mỗi lần data đổi, ghi ngay xuống localStorage (Revision 10 — 1 key duy nhất).
  useEffect(() => {
    saveAppData(data);
  }, [data]);

  return <AppContext.Provider value={{ data, dispatch }}>{children}</AppContext.Provider>;
};

export function useAppData(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppData phải được dùng bên trong AppProvider.');
  return ctx;
}
