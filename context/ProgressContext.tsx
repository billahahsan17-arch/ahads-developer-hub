
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressState {
  totalSeconds: number;
  xp: number;
  streakDays: number;
  lastVisit: number;
  completedModules: string[];
  mistakeCount: number;
}

interface ProgressContextType {
  stats: ProgressState;
  addXP: (amount: number) => void;
  markModuleComplete: (id: string) => void;
  incrementMistake: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<ProgressState>({
    totalSeconds: 0,
    xp: 8450, // Starting baseline
    streakDays: 1,
    lastVisit: Date.now(),
    completedModules: [],
    mistakeCount: 0
  });

  // Load from Storage
  useEffect(() => {
    const saved = localStorage.getItem('atlas_neural_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Streak Calculation
      const last = new Date(parsed.lastVisit);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) parsed.streakDays += 1;
      if (diffDays > 1) parsed.streakDays = 1; // Streak broken
      
      setStats(parsed);
    }
  }, []);

  // Save to Storage & Time Tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const next = { ...prev, totalSeconds: prev.totalSeconds + 1, lastVisit: Date.now() };
        localStorage.setItem('atlas_neural_state', JSON.stringify(next));
        return next;
      });
    }, 1000); // Tick every second

    return () => clearInterval(interval);
  }, []);

  const addXP = (amount: number) => {
    setStats(prev => {
      const next = { ...prev, xp: prev.xp + amount };
      localStorage.setItem('atlas_neural_state', JSON.stringify(next));
      return next;
    });
  };

  const markModuleComplete = (id: string) => {
    setStats(prev => {
      if (prev.completedModules.includes(id)) return prev;
      const next = { ...prev, completedModules: [...prev.completedModules, id], xp: prev.xp + 500 };
      localStorage.setItem('atlas_neural_state', JSON.stringify(next));
      return next;
    });
  };

  const incrementMistake = () => {
      setStats(prev => ({ ...prev, mistakeCount: prev.mistakeCount + 1 }));
  };

  return (
    <ProgressContext.Provider value={{ stats, addXP, markModuleComplete, incrementMistake }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
