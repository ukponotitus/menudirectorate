import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MEALS, RECIPES } from "../data";
import { useApp } from "../context";
import { IngredientList, CookingStepCard, AddToPlanModal } from "../components/meals";
import { Badge, DifficultyBadge, Button, Tabs } from "../components/ui";

export default function MealDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, showToast } = useApp();

  const meal = MEALS.find((m) => m.id === id);
  const recipe = RECIPES.find((r) => r.mealId === id);
  const related = MEALS.filter((m) => m.category === meal?.category && m.id !== id).slice(0, 3);

  const [servings, setServings] = useState(meal?.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("Ingredients");
  const [planOpen, setPlanOpen] = useState(false);

  if (!meal) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1714] font-display mb-2">Meal Not Found</h1>
          <p className="text-[#706860] mb-4">This meal doesn't exist in our database.</p>
          <Link to="/meals" className="text-[#E06000] font-semibold hover:underline">← Back to Meals</Link>
        </div>
      </div>
    );
  }

  const isFav = favorites.has(meal.id);
  const totalTime = meal.prepTime + meal.cookTime;

  const handleToggleFav = () => {
    toggleFavorite(meal.id);
    showToast(isFav ? "Removed from favorites" : "Added to favorites!");
  };

  const toggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  // Default recipe if no recipe found
  const ingredients = recipe?.ingredients || [
    { ingredientId: "beef", ingredientName: "Beef", quantity: 500, unit: "g" },
    { ingredientId: "onion", ingredientName: "Onion", quantity: 1, unit: "piece" },
    { ingredientId: "pepper", ingredientName: "Pepper", quantity: 3, unit: "pieces" },
    { ingredientId: "seasoning-cubes", ingredientName: "Seasoning Cubes", quantity: 2, unit: "cubes" },
    { ingredientId: "salt", ingredientName: "Salt", quantity: "to taste", unit: "" },
  ];

  const prepSteps = recipe?.preparationSteps || ["Wash and prepare all ingredients.", "Season the protein with salt and seasoning.", "Prepare vegetables and set aside."];
  const cookSteps = recipe?.cookingSteps || [
    { id: "cs1", mealId: meal.id, stepNumber: 1, title: "Prepare Ingredients", instruction: "Gather and prepare all your ingredients as described in the preparation steps.", duration: 10 },
    { id: "cs2", mealId: meal.id, stepNumber: 2, title: "Begin Cooking", instruction: "Follow the traditional method of preparing this dish, starting with the protein.", duration: 20 },
    { id: "cs3", mealId: meal.id, stepNumber: 3, title: "Add Seasonings", instruction: "Add all your seasonings, crayfish and other flavoring agents.", duration: 5 },
    { id: "cs4", mealId: meal.id, stepNumber: 4, title: "Finish & Serve", instruction: "Adjust seasoning to taste, cook for final 5 minutes and serve hot.", duration: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF6] pb-20 md:pb-0">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 md:h-96 bg-[#1A1714] overflow-hidden">
        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Back button */}
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 bg-black/30 backdrop-blur rounded-lg text-white hover:bg-black/50 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Favorite button */}
        <button onClick={handleToggleFav} className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur rounded-lg text-white hover:bg-black/50 transition-colors">
          <svg className={`w-5 h-5 ${isFav ? "fill-[#E06000] text-[#E06000]" : "fill-none"}`} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>

        {/* Meal name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="orange">{meal.category}</Badge>
            <Badge variant="default">{meal.mealType}</Badge>
            <DifficultyBadge level={meal.difficulty} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">{meal.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Meta info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Prep Time", value: `${meal.prepTime} min`, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Cook Time", value: `${meal.cookTime} min`, icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
            { label: "Total Time", value: `${totalTime} min`, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Serves", value: `${meal.servings} people`, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-[#E8E0D4] p-4 text-center">
              <svg className="w-5 h-5 text-[#E06000] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              <div className="text-sm font-bold text-[#1A1714] font-display">{item.value}</div>
              <div className="text-xs text-[#706860]">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Link to={`/meals/${meal.id}/cook`} className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E06000] text-white font-semibold rounded-xl hover:bg-[#C75500] transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Start Cooking
          </Link>
          <Button variant="outline" onClick={() => setPlanOpen(true)} className="flex-1 min-w-[140px]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Add to Meal Plan
          </Button>
          <Button variant={isFav ? "secondary" : "ghost"} onClick={handleToggleFav} className="flex-1 min-w-[120px]">
            <svg className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {isFav ? "Saved" : "Save Favorite"}
          </Button>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl border border-[#E8E0D4] p-5 mb-6">
          <h2 className="text-lg font-bold text-[#1A1714] font-display mb-2">About This Meal</h2>
          <p className="text-[#706860] text-sm leading-relaxed">{meal.description}</p>
        </div>

        {/* Tabs */}
        <Tabs tabs={["Ingredients", "Preparation", "Cooking Steps"]} active={activeTab} onChange={setActiveTab} className="mb-6" />

        {activeTab === "Ingredients" && (
          <div>
            {/* Servings control */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#1A1714] font-display">Ingredients</h2>
                <p className="text-xs text-[#706860]">Ingredients for {servings} {servings === 1 ? "person" : "people"}</p>
              </div>
              <div className="flex items-center gap-3 bg-[#F5F0E8] rounded-lg p-1">
                <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-[#1A1714] font-bold hover:bg-[#E8E0D4] transition-colors">−</button>
                <span className="text-sm font-bold text-[#1A1714] w-4 text-center">{servings}</span>
                <button onClick={() => setServings(Math.min(20, servings + 1))} className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-[#1A1714] font-bold hover:bg-[#E8E0D4] transition-colors">+</button>
              </div>
            </div>
            <IngredientList
              ingredients={ingredients}
              servings={meal.servings}
              targetServings={servings}
              checkedItems={checkedIngredients}
              onToggleCheck={toggleIngredient}
            />
            {checkedIngredients.size > 0 && (
              <p className="mt-3 text-xs text-[#2D7A57] font-semibold">{checkedIngredients.size} of {ingredients.length} ingredients checked ✓</p>
            )}
          </div>
        )}

        {activeTab === "Preparation" && (
          <div>
            <h2 className="text-lg font-bold text-[#1A1714] font-display mb-4">Preparation Steps</h2>
            <div className="space-y-3">
              {prepSteps.map((step, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl border border-[#E8E0D4] p-4">
                  <div className="w-7 h-7 rounded-full bg-[#FFF3E8] text-[#E06000] flex items-center justify-center text-sm font-bold shrink-0 font-display">{i + 1}</div>
                  <p className="text-sm text-[#706860] leading-relaxed flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Cooking Steps" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1A1714] font-display">Step-by-Step Cooking Guide</h2>
              <Link to={`/meals/${meal.id}/cook`} className="text-sm font-semibold text-[#E06000] hover:underline">Start Cooking →</Link>
            </div>
            <div className="space-y-3">
              {cookSteps.map((step) => <CookingStepCard key={step.id} step={step} />)}
            </div>
          </div>
        )}

        {/* Related meals */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-[#1A1714] font-display mb-4">You Might Also Like</h2>
            <div className="space-y-3">
              {related.map((m) => (
                <Link key={m.id} to={`/meals/${m.id}`} className="flex items-center gap-4 bg-white rounded-xl border border-[#E8E0D4] p-3 hover:shadow-sm transition-shadow group">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#1A1714] font-display text-sm">{m.name}</div>
                    <div className="text-xs text-[#706860]">{m.prepTime + m.cookTime} min · {m.difficulty}</div>
                  </div>
                  <svg className="w-4 h-4 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <AddToPlanModal open={planOpen} onClose={() => setPlanOpen(false)} mealId={meal.id} mealName={meal.name} />
    </div>
  );
}
