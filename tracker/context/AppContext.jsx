'use client';
import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [budgets, setBudgets] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, budgets, setBudgets }}>
      {children}
    </AppContext.Provider>
  );
};
