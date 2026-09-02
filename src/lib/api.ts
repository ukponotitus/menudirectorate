import { publicAnonKey, projectId } from "../../utils/supabase/info";
import type { MealPlanEntry } from "../types";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-90792705`;
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
};

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  role: "user" | "admin";
  joinedAt: string;
}

async function post(path: string, body: object) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function get(path: string) {
  const res = await fetch(`${BASE}${path}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  try {
    const data = await get(`/profile/${userId}`);
    return data.profile ?? null;
  } catch {
    return null;
  }
}

export async function saveProfile(userId: string, profile: UserProfile) {
  await post("/profile", { userId, profile });
}

export async function getFavorites(userId: string): Promise<string[]> {
  try {
    const data = await get(`/favorites/${userId}`);
    return Array.isArray(data.favorites) ? data.favorites : [];
  } catch {
    return [];
  }
}

export async function saveFavorites(userId: string, favorites: string[]) {
  await post("/favorites", { userId, favorites });
}

export async function getMealPlan(userId: string): Promise<MealPlanEntry[] | null> {
  try {
    const data = await get(`/mealplan/${userId}`);
    return Array.isArray(data.mealPlan) ? data.mealPlan : null;
  } catch {
    return null;
  }
}

export async function saveMealPlan(userId: string, mealPlan: MealPlanEntry[]) {
  await post("/mealplan", { userId, mealPlan });
}
