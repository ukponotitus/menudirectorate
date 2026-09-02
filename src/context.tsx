import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import type { User, MealPlanEntry, ToastMessage } from "./types";
import { DEFAULT_MEAL_PLAN } from "./data";
import { supabase } from "./lib/supabase";

// localStorage helpers — persist per user so data survives page refreshes
function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

interface AppContextType {
  currentUser: User | null;
  isAdmin: boolean;
  authLoading: boolean;
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
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>(DEFAULT_MEAL_PLAN);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const currentUserRef = useRef<User | null>(null);
  useEffect(() => { currentUserRef.current = currentUser; }, [currentUser]);

  // Whether data was loaded from storage (guard against saving during initial load)
  const dataReadyRef = useRef(false);

  const isAdmin = currentUser?.role === "admin";

  // Load user data from localStorage when session is available
  const loadUserData = useCallback((userId: string, email: string, meta?: Record<string, any>) => {
    // Try to load saved profile from localStorage
    const savedProfile = lsGet<Partial<User> | null>(`md_profile_${userId}`, null);

    const user: User = {
      id: userId,
      email,
      firstName: savedProfile?.firstName ?? meta?.firstName ?? email.split("@")[0],
      lastName: savedProfile?.lastName ?? meta?.lastName ?? "",
      phone: savedProfile?.phone ?? "",
      role: savedProfile?.role ?? "user",
      status: "active",
      joinedAt: savedProfile?.joinedAt ?? new Date().toISOString().split("T")[0],
    };

    setCurrentUser(user);
    setFavorites(new Set(lsGet<string[]>(`md_favs_${userId}`, [])));
    setMealPlan(lsGet<MealPlanEntry[]>(`md_plan_${userId}`, DEFAULT_MEAL_PLAN));
    dataReadyRef.current = true;
  }, []);

  // Subscribe to Supabase auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        dataReadyRef.current = false;
        loadUserData(
          session.user.id,
          session.user.email ?? "",
          session.user.user_metadata,
        );
      } else if (event === "SIGNED_OUT" || !session) {
        if (currentUserRef.current?.role !== "admin") {
          setCurrentUser(null);
          setFavorites(new Set());
          setMealPlan(DEFAULT_MEAL_PLAN);
          dataReadyRef.current = false;
        }
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadUserData]);

  // Admin / mock login
  const login = useCallback((user: User) => {
    setCurrentUser(user);
    setAuthLoading(false);
  }, []);

  const logout = useCallback(async () => {
    if (currentUserRef.current?.role === "admin") {
      setCurrentUser(null);
    } else {
      await supabase.auth.signOut();
    }
  }, []);

  const toggleFavorite = useCallback((mealId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(mealId)) next.delete(mealId);
      else next.add(mealId);
      const uid = currentUserRef.current?.id;
      if (uid && dataReadyRef.current) lsSet(`md_favs_${uid}`, [...next]);
      return next;
    });
  }, []);

  const addToMealPlan = useCallback((entry: Omit<MealPlanEntry, "id">) => {
    const id = `mp-${Date.now()}`;
    setMealPlan((prev) => {
      const filtered = prev.filter(
        (e) => !(e.day === entry.day && e.mealType === entry.mealType)
      );
      const next = [...filtered, { ...entry, id }];
      const uid = currentUserRef.current?.id;
      if (uid && dataReadyRef.current) lsSet(`md_plan_${uid}`, next);
      return next;
    });
  }, []);

  const removeFromMealPlan = useCallback((id: string) => {
    setMealPlan((prev) => {
      const next = prev.filter((e) => e.id !== id);
      const uid = currentUserRef.current?.id;
      if (uid && dataReadyRef.current) lsSet(`md_plan_${uid}`, next);
      return next;
    });
  }, []);

  const updateMealPlan = useCallback((id: string, updates: Partial<MealPlanEntry>) => {
    setMealPlan((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...updates } : e));
      const uid = currentUserRef.current?.id;
      if (uid && dataReadyRef.current) lsSet(`md_plan_${uid}`, next);
      return next;
    });
  }, []);

  const showToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <AppContext.Provider value={{
      currentUser, isAdmin, authLoading, login, logout,
      favorites, toggleFavorite,
      mealPlan, addToMealPlan, removeFromMealPlan, updateMealPlan,
      toasts, showToast,
      searchQuery, setSearchQuery,
    }}>
      {authLoading ? (
        <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-[#E06000] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#706860]">Loading...</p>
          </div>
        </div>
      ) : children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
