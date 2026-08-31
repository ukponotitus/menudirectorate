import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { User, MealPlanEntry, ToastMessage } from "./types";
import { DEFAULT_MEAL_PLAN } from "./data";

interface AppContextType {
  currentUser: User | null;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
  favorites: Set<string>;
  toggleFavorite: (mealId: string) => void;
  mealPlan: MealPlanEntry[];
  addToMealPlan: (entry: Omit<MealPlanEntry, "id">) => void;
  removeFromMealPlan: (id: string) => void;
  updateMealPlan: (id: string, updates: Partial<MealPlanEntry>) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["jollof-rice", "afang-soup", "egusi-soup"]));
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>(DEFAULT_MEAL_PLAN);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = currentUser?.role === "admin";

  const login = useCallback((user: User) => setCurrentUser(user), []);
  const logout = useCallback(() => setCurrentUser(null), []);

  const toggleFavorite = useCallback((mealId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(mealId)) {
        next.delete(mealId);
        return next;
      }
      next.add(mealId);
      return next;
    });
  }, []);

  const addToMealPlan = useCallback((entry: Omit<MealPlanEntry, "id">) => {
    const id = `mp-${Date.now()}`;
    setMealPlan((prev) => {
      const filtered = prev.filter(
        (e) => !(e.day === entry.day && e.mealType === entry.mealType && e.userId === entry.userId)
      );
      return [...filtered, { ...entry, id }];
    });
  }, []);

  const removeFromMealPlan = useCallback((id: string) => {
    setMealPlan((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateMealPlan = useCallback((id: string, updates: Partial<MealPlanEntry>) => {
    setMealPlan((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const showToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <AppContext.Provider value={{ currentUser, isAdmin, login, logout, favorites, toggleFavorite, mealPlan, addToMealPlan, removeFromMealPlan, updateMealPlan, toasts, showToast, searchQuery, setSearchQuery }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
