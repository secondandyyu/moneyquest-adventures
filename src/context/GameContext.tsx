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
}

interface GameContextType {
  state: GameState;
  addXP: (amount: number) => void;
  completeScenario: (scenarioId: string, choiceIndex: number, xpEarned: number) => void;
  isScenarioCompleted: (scenarioId: string) => boolean;
  getScenarioResult: (scenarioId: string) => ScenarioResult | undefined;
  isLevelUnlocked: (levelId: string) => boolean;
  isCategoryUnlocked: (categoryId: string) => boolean;
  isLevelCompleted: (levelId: string) => boolean;
  getCategoryProgress: (categoryId: string) => { completed: number; total: number };
  purchaseItem: (item: ShopItem) => boolean;
  isItemPurchased: (itemId: string) => boolean;
  equipItem: (item: ShopItem) => void;
  resetProgress: () => void;
}

const defaultState: GameState = {
  xp: 0,
  completedScenarios: {},
  purchasedItems: [],
  activeTheme: "default",
  activeFont: "nunito",
};

const GameContext = createContext<GameContextType | undefined>(undefined);

function loadState(): GameState {
  try {
    const saved = localStorage.getItem("moneyquest-progress");
    if (saved) return JSON.parse(saved);
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
    setState((s) => ({ ...s, xp: s.xp + amount }));
  };

  const completeScenario = (scenarioId: string, choiceIndex: number, xpEarned: number) => {
    setState((s) => {
      if (s.completedScenarios[scenarioId]) return s;
      return {
        ...s,
        xp: s.xp + xpEarned,
        completedScenarios: {
          ...s.completedScenarios,
          [scenarioId]: { scenarioId, choiceIndex, xpEarned },
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
        if (levelIdx === 0) return true; // First level always unlocked
        // Previous level must be completed
        const prevLevel = cat.levels[levelIdx - 1];
        return prevLevel.scenarios.every((s) => !!state.completedScenarios[s.id]);
      }
    }
    return false;
  };

  const isCategoryUnlocked = (categoryId: string) => {
    const catIdx = categories.findIndex((c) => c.id === categoryId);
    if (catIdx <= 0) return true; // First category always unlocked
    // Previous category must have all levels completed
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
    if (state.xp < item.price || state.purchasedItems.includes(item.id)) return false;
    setState((s) => ({
      ...s,
      xp: s.xp - item.price,
      purchasedItems: [...s.purchasedItems, item.id],
      ...(item.type === "theme" ? { activeTheme: item.value } : {}),
      ...(item.type === "font" ? { activeFont: item.value } : {}),
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
        resetProgress,
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
