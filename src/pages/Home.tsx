import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MEALS, CATEGORIES } from "../data";
import { MealCard, CategoryCard, SearchBar } from "../components/meals";
import { Button } from "../components/ui";
import { useApp } from "../context";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { mealPlan } = useApp();

  const featuredMeals = MEALS.filter((m) => m.featured && m.status === "published").slice(0, 4);
  const popularMeals = MEALS.filter((m) => m.status === "published").slice(0, 8);

  const handleSearch = () => {
    if (search.trim()) navigate(`/meals?q=${encodeURIComponent(search.trim())}`);
  };

  // Today's plan from meal plan context
  const today = "Monday";
  const todayPlan = ["Breakfast", "Lunch", "Dinner"].map((type) => {
    const entry = mealPlan.find((e) => e.day === today && e.mealType === type);
    return { type, meal: entry ? MEALS.find((m) => m.id === entry.mealId) : null };
  });

  const steps = [
    { num: "01", title: "Choose a Meal", desc: "Browse or search for any meal from our growing collection of local and popular dishes." },
    { num: "02", title: "Check Ingredients", desc: "See everything you need to prepare the meal with exact quantities and units." },
    { num: "03", title: "Follow the Recipe", desc: "Follow clear, step-by-step cooking instructions at your own pace." },
    { num: "04", title: "Plan Your Meal", desc: "Add meals to your daily or weekly timetable and always know what you're cooking next." },
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* ── Hero ── */}
      <section className="relative bg-[#1A1714] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1665332195309-9d75071138f0?w=1400&h=700&fit=crop&auto=format"
          alt="Nigerian jollof rice and food spread"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E06000]/20 border border-[#E06000]/40 text-[#F5A623] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Ikot Ekpene, Akwa Ibom, Nigeria
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight font-display">
              What would you like to <span className="text-[#F5A623]">cook today?</span>
            </h1>
            <p className="text-[#C4B9AE] text-lg mb-8 max-w-xl">
              Discover meals, explore ingredients, follow step-by-step cooking instructions and plan your meals with ease.
            </p>

            <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} className="mb-6 max-w-xl" />

            <div className="flex flex-wrap gap-3">
              <Link to="/meals" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E06000] text-white font-semibold rounded-xl hover:bg-[#C75500] transition-colors text-sm">
                Explore Meals
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/meal-plan" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-sm backdrop-blur">
                Create Meal Plan
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-3 gap-4">
            {[{ n: `${MEALS.length}+`, l: "Meals" }, { n: `${CATEGORIES.length}`, l: "Categories" }, { n: "50+", l: "Ingredients" }].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-bold text-white font-display">{s.n}</div>
                <div className="text-[#706860] text-xs">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Today's Meal Plan ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1714] font-display">Today's Meal Plan</h2>
            <p className="text-[#706860] text-sm mt-1">Your scheduled meals for today</p>
          </div>
          <Link to="/meal-plan" className="text-sm font-semibold text-[#E06000] hover:underline">View Full Plan →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {todayPlan.map(({ type, meal }) => (
            <div key={type} className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-[#F5F0E8] border-b border-[#E8E0D4]">
                <div className={`w-2 h-2 rounded-full ${type === "Breakfast" ? "bg-amber-400" : type === "Lunch" ? "bg-green-500" : "bg-[#E06000]"}`} />
                <span className="text-xs font-bold text-[#706860] uppercase tracking-wide">{type}</span>
              </div>
              {meal ? (
                <div>
                  <div className="h-36 bg-[#F5F0E8] overflow-hidden">
                    <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#1A1714] font-display text-sm mb-1">{meal.name}</h3>
                    <p className="text-xs text-[#706860] mb-3">{meal.prepTime + meal.cookTime} min total</p>
                    <Link to={`/meals/${meal.id}`} className="text-xs font-semibold text-[#E06000] hover:underline">View Recipe →</Link>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-10 h-10 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <p className="text-xs text-[#A89E94] mb-2">No meal planned</p>
                  <Link to="/meal-plan" className="text-xs font-semibold text-[#E06000] hover:underline">Add meal</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-white border-y border-[#E8E0D4] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1714] font-display">Explore Meal Categories</h2>
              <p className="text-[#706860] text-sm mt-1">Browse meals by category</p>
            </div>
            <Link to="/categories" className="text-sm font-semibold text-[#E06000] hover:underline">All Categories →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.slice(0, 12).map((cat) => <CategoryCard key={cat.id} category={cat} />)}
          </div>
        </div>
      </section>

      {/* ── Popular Meals ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1714] font-display">Popular Meals</h2>
            <p className="text-[#706860] text-sm mt-1">Loved by cooks in Ikot Ekpene</p>
          </div>
          <Link to="/meals" className="text-sm font-semibold text-[#E06000] hover:underline">View All →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {featuredMeals.map((m) => <MealCard key={m.id} meal={m} variant="featured" />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularMeals.slice(0, 4).map((m) => <MealCard key={m.id} meal={m} />)}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-[#1D5C42] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white font-display mb-3">How It Works</h2>
            <p className="text-[#A8D5C2] max-w-xl mx-auto">From choosing a meal to building your weekly timetable — four simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && <div className="hidden lg:block absolute top-6 left-1/2 w-full h-px bg-white/20" />}
                <div className="relative bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-[#E06000] rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4 font-display">{step.num}</div>
                  <h3 className="text-white font-bold font-display mb-2">{step.title}</h3>
                  <p className="text-[#A8D5C2] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meal Planning CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-br from-[#E06000] to-[#C75500] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">Plan Your Meals Ahead</h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">Organize breakfast, lunch and dinner for the week and always know what you're cooking next.</p>
            <Link to="/meal-plan" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#E06000] font-bold rounded-xl hover:bg-[#FFF3E8] transition-colors text-base">
              Create Meal Plan
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
