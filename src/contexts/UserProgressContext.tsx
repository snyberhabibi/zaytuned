"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { UserProgress, Badge, PassportStamp, SectionType } from "@/types";

interface UserProgressContextType {
  progress: UserProgress | null;
  isLoading: boolean;
  markCityVisited: (cityId: string) => void;
  markSectionViewed: (cityId: string, section: SectionType) => void;
  completeCity: (cityId: string) => void;
  addBadge: (badge: Omit<Badge, "earnedAt">) => void;
  addStamp: (cityId: string) => void;
  getCityProgress: (cityId: string) => number;
  totalPoints: number;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(
  undefined
);

const STORAGE_KEY = "zaytuned_progress";

function generateVisitorId(): string {
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function createInitialProgress(): UserProgress {
  return {
    id: generateVisitorId(),
    visitorId: generateVisitorId(),
    citiesCompleted: [],
    citiesInProgress: {},
    badges: [],
    passportStamps: [],
    quizScores: [],
    totalPoints: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function UserProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        parsed.createdAt = new Date(parsed.createdAt);
        parsed.updatedAt = new Date(parsed.updatedAt);
        parsed.badges = parsed.badges.map((b: Badge) => ({
          ...b,
          earnedAt: new Date(b.earnedAt),
        }));
        parsed.passportStamps = parsed.passportStamps.map((s: PassportStamp) => ({
          ...s,
          earnedAt: new Date(s.earnedAt),
        }));
        setProgress(parsed);
      } else {
        setProgress(createInitialProgress());
      }
    } catch {
      setProgress(createInitialProgress());
    }
    setIsLoading(false);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress && !isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoading]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...updates,
        updatedAt: new Date(),
      };
    });
  };

  const markCityVisited = (cityId: string) => {
    if (!progress) return;

    if (!progress.citiesInProgress[cityId]) {
      updateProgress({
        citiesInProgress: {
          ...progress.citiesInProgress,
          [cityId]: {
            cityId,
            sectionsViewed: [],
            quizzesTaken: [],
            lastVisited: new Date(),
            completionPercentage: 0,
          },
        },
      });
    }
  };

  const markSectionViewed = (cityId: string, section: SectionType) => {
    if (!progress) return;

    const cityProgress = progress.citiesInProgress[cityId];
    if (!cityProgress) {
      markCityVisited(cityId);
      return;
    }

    if (!cityProgress.sectionsViewed.includes(section)) {
      const newSections = [...cityProgress.sectionsViewed, section];
      const totalSections = 10; // Total possible sections
      const completionPercentage = Math.round(
        (newSections.length / totalSections) * 100
      );

      updateProgress({
        citiesInProgress: {
          ...progress.citiesInProgress,
          [cityId]: {
            ...cityProgress,
            sectionsViewed: newSections,
            lastVisited: new Date(),
            completionPercentage,
          },
        },
        totalPoints: progress.totalPoints + 10, // 10 points per section
      });
    }
  };

  const completeCity = (cityId: string) => {
    if (!progress || progress.citiesCompleted.includes(cityId)) return;

    updateProgress({
      citiesCompleted: [...progress.citiesCompleted, cityId],
      totalPoints: progress.totalPoints + 100, // 100 points for completing a city
    });

    // Auto-add passport stamp
    addStamp(cityId);
  };

  const addBadge = (badge: Omit<Badge, "earnedAt">) => {
    if (!progress) return;

    const existingBadge = progress.badges.find((b) => b.id === badge.id);
    if (existingBadge) return;

    updateProgress({
      badges: [
        ...progress.badges,
        { ...badge, earnedAt: new Date() },
      ],
      totalPoints: progress.totalPoints + 50, // 50 points per badge
    });
  };

  const addStamp = (cityId: string) => {
    if (!progress) return;

    const existingStamp = progress.passportStamps.find(
      (s) => s.cityId === cityId
    );
    if (existingStamp) return;

    updateProgress({
      passportStamps: [
        ...progress.passportStamps,
        {
          cityId,
          earnedAt: new Date(),
          design: "default",
        },
      ],
    });
  };

  const getCityProgress = (cityId: string): number => {
    if (!progress) return 0;
    if (progress.citiesCompleted.includes(cityId)) return 100;
    return progress.citiesInProgress[cityId]?.completionPercentage || 0;
  };

  return (
    <UserProgressContext.Provider
      value={{
        progress,
        isLoading,
        markCityVisited,
        markSectionViewed,
        completeCity,
        addBadge,
        addStamp,
        getCityProgress,
        totalPoints: progress?.totalPoints || 0,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error(
      "useUserProgress must be used within a UserProgressProvider"
    );
  }
  return context;
}
