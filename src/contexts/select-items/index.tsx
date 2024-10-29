"use client";

import React, { createContext, useContext, useMemo } from "react";

const ConstantsContext = createContext<
  | {
      seniorityLevels: string[];
      skillsOptions: string[];
    }
  | undefined
>(undefined);

export const ConstantsProvider = function ConstantsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const seniorityLevels = ["Junior", "Middle", "Senior", "Lead"];
  const skillsOptions = [
    "C#",
    "React",
    "NuxtJS",
    "Spring",
    "JavaScript",
    "Python",
    "Next",
    "MUI",
    "Refine",
  ];

  const value = useMemo(
    () => ({ seniorityLevels, skillsOptions }),
    [seniorityLevels, skillsOptions],
  );

  return (
    <ConstantsContext.Provider value={value}>
      {children}
    </ConstantsContext.Provider>
  );
};

export const useConstants = () => {
  const context = useContext(ConstantsContext);
  if (!context) {
    throw new Error("useConstants must be used within a ConstantsProvider");
  }
  return context;
};
