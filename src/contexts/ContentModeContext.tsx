"use client";

import React, { createContext, useContext, useState } from "react";
import type { ContentMode } from "@/types";

interface ContentModeContextType {
  mode: ContentMode;
  setMode: (mode: ContentMode) => void;
  isKidsMode: boolean;
}

const ContentModeContext = createContext<ContentModeContextType | undefined>(
  undefined
);

export function ContentModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ContentMode>("deep");

  return (
    <ContentModeContext.Provider
      value={{
        mode,
        setMode,
        isKidsMode: mode === "kids",
      }}
    >
      <div className={mode === "kids" ? "kids-mode" : ""}>{children}</div>
    </ContentModeContext.Provider>
  );
}

export function useContentMode() {
  const context = useContext(ContentModeContext);
  if (!context) {
    throw new Error(
      "useContentMode must be used within a ContentModeProvider"
    );
  }
  return context;
}
