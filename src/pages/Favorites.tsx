import React from "react";
import { Link } from "react-router-dom";
import { MEALS } from "../data";
import { useApp } from "../context";
import { MealCard } from "../components/meals";
import { EmptyState, Button } from "../components/ui";

export default function Favorites() {
  const { favorites } = useApp();
  const favMeals = MEALS.filter((m) => favorites.has(m.id));

  return (
    <div className="min-h-screen bg-[#FDFAF6] pb-20 md:pb-0">
      <div className="bg-white border-b border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-bold text-[#1A1714] font-display mb-1">Favorite Meals</h1>
          <p className="text-[#706860] text-sm">{favMeals.length} saved {favMeals.length === 1 ? "meal" : "meals"}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {favMeals.length === 0 ? (
          <EmptyState
            icon={<svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
            title="No favorite meals yet"
            description="Save meals you love by tapping the heart icon on any meal card."
            action={<Link to="/meals"><Button variant="primary">Explore Meals</Button></Link>}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favMeals.map((m) => <MealCard key={m.id} meal={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
