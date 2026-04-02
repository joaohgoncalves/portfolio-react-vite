import React, { createContext, useContext, useState } from 'react';

export type CursorVariant = 'default' | 'button' | 'text';

interface CursorContextType {
  variant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextType>({
  variant: 'default',
  setCursorVariant: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<CursorVariant>('default');

  return (
    <CursorContext.Provider value={{ variant, setCursorVariant: setVariant }}>
      {children}
    </CursorContext.Provider>
  );
};
