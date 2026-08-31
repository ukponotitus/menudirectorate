export interface Meal {
  id: string;
  name: string;
  description: string;
  category: string;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Any";
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "published" | "draft";
  featured: boolean;
  createdAt: string;
  tags?: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  status: "active" | "inactive";
  mealsUsedIn?: number;
}

export interface RecipeIngredient {
  ingredientId: string;
  ingredientName: string;
  quantity: number | string;
  unit: string;
}

export interface CookingStep {
  id: string;
  mealId: string;
  stepNumber: number;
  title: string;
  instruction: string;
  image?: string;
  duration?: number;
}

export interface Recipe {
  id: string;
  mealId: string;
  ingredients: RecipeIngredient[];
  preparationSteps: string[];
  cookingSteps: CookingStep[];
}

export interface MealPlanEntry {
  id: string;
  userId: string;
  day: string;
  mealType: "Breakfast" | "Lunch" | "Dinner";
  mealId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  mealCount: number;
  color: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  joinedAt: string;
  avatar?: string;
}

export interface Report {
  id: string;
  mealId: string;
  mealName: string;
  reason: string;
  description: string;
  status: "pending" | "resolved" | "dismissed";
  date: string;
  reportedBy: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}
