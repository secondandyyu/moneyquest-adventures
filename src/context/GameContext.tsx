import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { categories } from "@/data/gameData";

interface ScenarioResult {
  scenarioId: string;
  choiceIndex: number;
  xpEarned: number;
}

interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: "theme" | "font" | "cosmetic";
  value: string;
}

interface GameState {
  xp: number;
  completedScenarios: Record<string, ScenarioResult>;
  purchasedItems: string[];
  activeTheme: string;
  activeFont: string;
  activePowerUps: string[];
  streak: number;
  bestStreak: number;
}

interface GameContextType {
  state: GameState;
  addXP: (amount: number) => void;
  completeScenario: (scenarioId: string, choiceIndex: number, xpEarned: number, quality: string) => void;
  isScenarioCompleted: (scenarioId: string) => boolean;
  getScenarioResult: (scenarioId: string) => ScenarioResult | undefined;
  isLevelUnlocked: (levelId: string) => boolean;
  isCategoryUnlocked: (categoryId: string) => boolean;
  isLevelCompleted: (levelId: string) => boolean;
  getCategoryProgress: (categoryId: string) => { completed: number; total: number };
  purchaseItem: (item: ShopItem) => boolean;
  isItemPurchased: (itemId: string) => boolean;
  equipItem: (item: ShopItem) => void;
  togglePowerUp: (value: string) => void;
  hasPowerUp: (value: string) => boolean;
  resetProgress: () => void;
  resetLevel: (levelId: string) => void;
}

const defaultState: GameState = {
  xp: 0,
  completedScenarios: {},
  purchasedItems: [],
  activeTheme: "default",
  activeFont: "nunito",
  activePowerUps: [],
  streak: 0,
  bestStreak: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

function loadState(): GameState {
  try {
    const saved = localStorage.getItem("moneyquest-progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed };
    }
  } catch {}
  return defaultState;
}

function saveState(state: GameState) {
  localStorage.setItem("moneyquest-progress", JSON.stringify(state));
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addXP = (amount: number) => {
    setState((s) => ({ ...s, xp: Math.max(0, s.xp + amount) }));
  };

  const hasPowerUp = (value: string) => state.activePowerUps.includes(value);

  const completeScenario = (scenarioId: string, choiceIndex: number, xpEarned: number, quality: string) => {
    setState((s) => {
      if (s.completedScenarios[scenarioId]) return s;
      const xpMultiplier = s.activePowerUps.includes("xp-booster") ? 1.5 : 1;
      const finalXP = Math.round(xpEarned * xpMultiplier);
      const newStreak = quality === "best" ? s.streak + 1 : 0;
      const newBestStreak = Math.max(s.bestStreak, newStreak);
      return {
        ...s,
        xp: s.xp + finalXP,
        streak: newStreak,
        bestStreak: newBestStreak,
        completedScenarios: {
          ...s.completedScenarios,
          [scenarioId]: { scenarioId, choiceIndex, xpEarned: finalXP },
        },
      };
    });
  };

  const isScenarioCompleted = (scenarioId: string) => !!state.completedScenarios[scenarioId];
  const getScenarioResult = (scenarioId: string) => state.completedScenarios[scenarioId];

  const isLevelUnlocked = (levelId: string) => {
    for (const cat of categories) {
      const levelIdx = cat.levels.findIndex((l) => l.id === levelId);
      if (levelIdx !== -1) {
        if (!isCategoryUnlocked(cat.id)) return false;
        if (levelIdx === 0) return true;
        const prevLevel = cat.levels[levelIdx - 1];
        return prevLevel.scenarios.every((s) => !!state.completedScenarios[s.id]);
      }
    }
    return false;
  };

  const isCategoryUnlocked = (categoryId: string) => {
    const catIdx = categories.findIndex((c) => c.id === categoryId);
    if (catIdx <= 0) return true;
    const prevCat = categories[catIdx - 1];
    return prevCat.levels.every((level) =>
      level.scenarios.every((s) => !!state.completedScenarios[s.id])
    );
  };

  const isLevelCompleted = (levelId: string) => {
    for (const cat of categories) {
      const level = cat.levels.find((l) => l.id === levelId);
      if (level) {
        return level.scenarios.every((s) => isScenarioCompleted(s.id));
      }
    }
    return false;
  };

  const getCategoryProgress = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return { completed: 0, total: 0 };
    const total = cat.levels.reduce((sum, l) => sum + l.scenarios.length, 0);
    const completed = cat.levels.reduce(
      (sum, l) => sum + l.scenarios.filter((s) => isScenarioCompleted(s.id)).length,
      0
    );
    return { completed, total };
  };

  const purchaseItem = (item: ShopItem) => {
    if (state.purchasedItems.includes(item.id)) return false;
    const discount = state.activePowerUps.includes("shop-discount") ? 0.75 : 1;
    const finalPrice = Math.round(item.price * discount);
    if (state.xp < finalPrice) return false;
    setState((s) => ({
      ...s,
      xp: Math.max(0, s.xp - finalPrice),
      purchasedItems: [...s.purchasedItems, item.id],
      ...(item.type === "theme" ? { activeTheme: item.value } : {}),
      ...(item.type === "font" ? { activeFont: item.value } : {}),
      ...(item.type === "powerup" ? { activePowerUps: [...s.activePowerUps, item.value] } : {}),
    }));
    return true;
  };

  const isItemPurchased = (itemId: string) => state.purchasedItems.includes(itemId);

  const equipItem = (item: ShopItem) => {
    if (!state.purchasedItems.includes(item.id)) return;
    setState((s) => ({
      ...s,
      ...(item.type === "theme" ? { activeTheme: item.value } : {}),
      ...(item.type === "font" ? { activeFont: item.value } : {}),
    }));
  };

  const togglePowerUp = (value: string) => {
    setState((s) => ({
      ...s,
      activePowerUps: s.activePowerUps.includes(value)
        ? s.activePowerUps.filter((c) => c !== value)
        : [...s.activePowerUps, value],
    }));
  };

  const resetLevel = (levelId: string) => {
    for (const cat of categories) {
      const level = cat.levels.find((l) => l.id === levelId);
      if (level) {
        setState((s) => {
          const newCompleted = { ...s.completedScenarios };
          let xpToRemove = 0;
          for (const scenario of level.scenarios) {
            if (newCompleted[scenario.id]) {
              xpToRemove += newCompleted[scenario.id].xpEarned;
              delete newCompleted[scenario.id];
            }
          }
          return { ...s, xp: Math.max(0, s.xp - xpToRemove), completedScenarios: newCompleted };
        });
        break;
      }
    }
  };

  const resetProgress = () => {
    setState(defaultState);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        addXP,
        completeScenario,
        isScenarioCompleted,
        getScenarioResult,
        isLevelUnlocked,
        isCategoryUnlocked,
        isLevelCompleted,
        getCategoryProgress,
        purchaseItem,
        isItemPurchased,
        equipItem,
        togglePowerUp,
        hasPowerUp,
        resetProgress,
        resetLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
