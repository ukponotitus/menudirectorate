import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Meal, Category, RecipeIngredient } from "../types";
import { useApp } from "../context";
import { Badge, DifficultyBadge, Button } from "./ui";

// ── MealCard ─────────────────────────────────────────────
interface MealCardProps {
  meal: Meal;
  variant?: "default" | "compact" | "horizontal" | "featured";
}

export function MealCard({ meal, variant = "default" }: MealCardProps) {
  const { favorites, toggleFavorite, showToast } = useApp();
  const isFav = favorites.has(meal.id);
  const totalTime = meal.prepTime + meal.cookTime;

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(meal.id);
    showToast(isFav ? "Removed from favorites" : "Added to favorites ❤️");
  };

  if (variant === "horizontal") {
    return (
      <Link to={`/meals/${meal.id}`} className="flex bg-white rounded-xl border border-[#E8E0D4] overflow-hidden hover:shadow-md transition-shadow group">
        <div className="w-32 sm:w-44 shrink-0 bg-[#F5F0E8] relative overflow-hidden">
          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-[#1A1714] font-display line-clamp-1">{meal.name}</h3>
              <button onClick={handleFav} className="shrink-0 p-1.5 rounded-lg hover:bg-[#F5F0E8] transition-colors">
                <svg className={`w-4 h-4 ${isFav ? "fill-[#E06000] text-[#E06000]" : "text-[#A89E94]"}`} fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>
            <p className="text-[#706860] text-xs line-clamp-2 mb-2">{meal.description}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="orange">{meal.category}</Badge>
            <DifficultyBadge level={meal.difficulty} />
            <span className="text-xs text-[#706860] ml-auto">{totalTime} min</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/meals/${meal.id}`} className="flex items-center gap-3 bg-white rounded-xl border border-[#E8E0D4] p-3 hover:shadow-sm transition-shadow group">
        <div className="w-14 h-14 rounded-lg bg-[#F5F0E8] shrink-0 overflow-hidden">
          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[#1A1714] text-sm line-clamp-1 font-display">{meal.name}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-[#706860]">{totalTime} min</span>
            <span className="text-[#E8E0D4]">·</span>
            <DifficultyBadge level={meal.difficulty} />
          </div>
        </div>
        <svg className="w-4 h-4 text-[#A89E94] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link to={`/meals/${meal.id}`} className="relative rounded-2xl overflow-hidden group block h-72 bg-[#1A1714]">
        <img src={meal.image} alt={meal.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <button onClick={handleFav} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/40 transition-colors z-10">
          <svg className={`w-4 h-4 ${isFav ? "fill-[#E06000] text-[#E06000]" : "text-white"}`} fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="orange">{meal.mealType}</Badge>
            <DifficultyBadge level={meal.difficulty} />
          </div>
          <h3 className="text-white font-bold text-xl font-display mb-1">{meal.name}</h3>
          <div className="flex items-center gap-3 text-white/70 text-xs">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {totalTime} min total
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Serves {meal.servings}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 bg-[#F5F0E8] overflow-hidden">
        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <button onClick={handleFav} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white shadow-sm transition-colors">
          <svg className={`w-4 h-4 ${isFav ? "fill-[#E06000] text-[#E06000]" : "text-[#A89E94]"}`} fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
        {meal.featured && <div className="absolute top-3 left-3"><Badge variant="orange">Featured</Badge></div>}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-[#1A1714] font-display line-clamp-1">{meal.name}</h3>
        </div>
        <p className="text-[#706860] text-xs line-clamp-2 mb-3">{meal.description}</p>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge variant="default">{meal.mealType}</Badge>
          <DifficultyBadge level={meal.difficulty} />
        </div>
        <div className="flex items-center justify-between text-xs text-[#706860] mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Prep: {meal.prepTime}min
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
            Cook: {meal.cookTime}min
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {meal.servings} servings
          </span>
        </div>
        <Link to={`/meals/${meal.id}`} className="block w-full text-center py-2.5 bg-[#E06000] text-white rounded-lg text-sm font-semibold hover:bg-[#C75500] transition-colors">View Recipe</Link>
      </div>
    </div>
  );
}

// ── CategoryCard ─────────────────────────────────────────
export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={`/categories/${category.id}`} className="group relative rounded-xl overflow-hidden bg-white border border-[#E8E0D4] hover:shadow-md transition-shadow">
      <div className="h-32 relative overflow-hidden bg-[#F5F0E8]">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-[#1A1714] font-display text-sm">{category.name}</h3>
        <p className="text-[#706860] text-xs mt-0.5">{category.mealCount} meals</p>
      </div>
    </Link>
  );
}

// ── IngredientList ────────────────────────────────────────
interface IngredientListProps {
  ingredients: RecipeIngredient[];
  servings: number;
  targetServings: number;
  checkedItems: Set<string>;
  onToggleCheck: (name: string) => void;
}
export function IngredientList({ ingredients, servings, targetServings, checkedItems, onToggleCheck }: IngredientListProps) {
  const scale = targetServings / servings;
  return (
    <div className="space-y-2">
      {ingredients.map((ing, i) => {
        const qty = typeof ing.quantity === "number" ? (ing.quantity * scale).toFixed(ing.quantity * scale % 1 === 0 ? 0 : 1) : ing.quantity;
        const checked = checkedItems.has(ing.ingredientName);
        return (
          <button key={i} onClick={() => onToggleCheck(ing.ingredientName)} className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${checked ? "border-[#2D7A57] bg-[#E8F5F0]" : "border-[#E8E0D4] bg-white hover:border-[#E06000] hover:bg-[#FFF8F3]"}`}>
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${checked ? "border-[#2D7A57] bg-[#2D7A57]" : "border-[#E8E0D4]"}`}>
              {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`flex-1 text-sm ${checked ? "line-through text-[#A89E94]" : "text-[#1A1714]"} font-medium`}>{ing.ingredientName}</span>
            <span className="text-sm text-[#706860] shrink-0">{qty} {ing.unit}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── CookingStepCard ───────────────────────────────────────
import type { CookingStep } from "../types";

interface CookingStepCardProps {
  step: CookingStep;
  active?: boolean;
  completed?: boolean;
}
export function CookingStepCard({ step, active, completed }: CookingStepCardProps) {
  return (
    <div className={`rounded-xl border p-5 transition-all ${active ? "border-[#E06000] bg-[#FFF8F3] shadow-sm" : completed ? "border-[#2D7A57] bg-[#E8F5F0]" : "border-[#E8E0D4] bg-white"}`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${active ? "bg-[#E06000] text-white" : completed ? "bg-[#2D7A57] text-white" : "bg-[#F5F0E8] text-[#706860]"}`}>
          {completed ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : step.stepNumber}
        </div>
        <div className="flex-1">
          <h4 className={`font-bold font-display mb-1 ${active ? "text-[#E06000]" : "text-[#1A1714]"}`}>{step.title}</h4>
          <p className={`text-sm leading-relaxed ${completed ? "text-[#A89E94]" : "text-[#706860]"}`}>{step.instruction}</p>
          {step.duration && (
            <div className="flex items-center gap-1.5 mt-2">
              <svg className="w-3.5 h-3.5 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-xs text-[#A89E94]">{step.duration} minutes</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SearchBar ─────────────────────────────────────────────
interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
}
export function SearchBar({ value, onChange, onSubmit, placeholder = "Search for a meal, ingredient or category...", className = "" }: SearchBarProps) {
  const handleKey = (e: React.KeyboardEvent) => { if (e.key === "Enter" && onSubmit) onSubmit(); };
  return (
    <div className={`relative flex items-center ${className}`}>
      <svg className="absolute left-4 w-5 h-5 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        className="w-full pl-12 pr-32 py-3.5 rounded-xl border border-[#E8E0D4] bg-white text-[#1A1714] text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000] focus:border-transparent placeholder:text-[#A89E94] shadow-sm"
      />
      {onSubmit && (
        <button onClick={onSubmit} className="absolute right-2 px-4 py-2 bg-[#E06000] text-white rounded-lg text-sm font-semibold hover:bg-[#C75500] transition-colors">Search</button>
      )}
    </div>
  );
}

// ── AddToPlanModal ────────────────────────────────────────
import { Modal, Button as Btn, Select } from "./ui";
import { DAYS, MEAL_TYPES } from "../data";

interface AddToPlanModalProps {
  open: boolean;
  onClose: () => void;
  mealId: string;
  mealName: string;
}
export function AddToPlanModal({ open, onClose, mealId, mealName }: AddToPlanModalProps) {
  const { addToMealPlan, showToast } = useApp();
  const [day, setDay] = React.useState("Monday");
  const [mealType, setMealType] = React.useState<"Breakfast" | "Lunch" | "Dinner">("Dinner");

  const handleAdd = () => {
    addToMealPlan({ userId: "guest", day, mealType, mealId });
    showToast(`${mealName} added to ${day} ${mealType.toLowerCase()}.`);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add to Meal Plan" size="sm">
      <div className="space-y-4">
        <div className="p-3 bg-[#FFF3E8] rounded-lg">
          <p className="text-sm font-semibold text-[#E06000]">{mealName}</p>
        </div>
        <Select label="Day" value={day} onChange={(e) => setDay(e.target.value)} options={DAYS.map((d) => ({ value: d, label: d }))} />
        <Select label="Meal Time" value={mealType} onChange={(e) => setMealType(e.target.value as any)} options={MEAL_TYPES.map((t) => ({ value: t, label: t }))} />
        <div className="flex gap-3 pt-2">
          <Btn variant="ghost" onClick={onClose} className="flex-1">Cancel</Btn>
          <Btn variant="primary" onClick={handleAdd} className="flex-1">Add to Meal Plan</Btn>
        </div>
      </div>
    </Modal>
  );
}
