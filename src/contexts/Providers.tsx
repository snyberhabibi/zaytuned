"use client";

import { LanguageProvider } from "./LanguageContext";
import { ContentModeProvider } from "./ContentModeContext";
import { UserProgressProvider } from "./UserProgressContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ContentModeProvider>
        <UserProgressProvider>{children}</UserProgressProvider>
      </ContentModeProvider>
    </LanguageProvider>
  );
}
