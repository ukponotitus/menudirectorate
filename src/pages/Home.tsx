import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MEALS, CATEGORIES } from "../data";
import { MealCard, CategoryCard, SearchBar } from "../components/meals";
import { useApp } from "../context";

// ─── Landing page for guests ──────────────────────────────

function LandingPage() {
  const previewMeals = MEALS.filter((m) => m.status === "published").slice(0, 6);

  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "32+ Nigerian Meals",
      desc: "Browse an ever-growing collection of local Akwa Ibom dishes and popular Nigerian favourites — from Afang Soup to Jollof Rice.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Step-by-Step Recipes",
      desc: "Follow detailed cooking instructions with ingredient checklists, prep steps, and a hands-free cooking mode — so nothing gets missed.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "7-Day Meal Planner",
      desc: "Organise breakfast, lunch and dinner for the entire week. Always know what you are cooking next and never scramble for ideas again.",
    },
  ];

  const steps = [
    { num: "01", title: "Create a free account", desc: "Sign up in seconds — no credit card needed." },
    { num: "02", title: "Browse & discover meals", desc: "Search or explore 32+ Nigerian dishes by category." },
    { num: "03", title: "Follow the recipe", desc: "Cook with confidence using our guided cooking mode." },
    { num: "04", title: "Plan your week", desc: "Build a full 7-day timetable for your household." },
  ];

  const stats = [
    { n: `${MEALS.length}+`, l: "Meals" },
    { n: `${CATEGORIES.length}`, l: "Categories" },
    { n: "50+", l: "Ingredients" },
    { n: "7-Day", l: "Meal Planning" },
  ];

  return (
    <div className="bg-[#FDFAF6]">

      {/* ── Hero ── */}
      <section className="relative bg-[#1A1714] overflow-hidden min-h-[90vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1665332195309-9d75071138f0?w=1600&h=900&fit=crop&auto=format"
          alt="Nigerian jollof rice spread"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1714]/95 via-[#1A1714]/70 to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#E06000]/20 border border-[#E06000]/40 text-[#F5A623] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ikot Ekpene, Akwa Ibom, Nigeria
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 font-display">
              Discover, Cook &{" "}
              <span className="text-[#F5A623]">Plan Nigerian Meals</span>
            </h1>
            <p className="text-[#C4B9AE] text-lg leading-relaxed mb-8 max-w-md">
              Your all-in-one guide to local Akwa Ibom dishes and popular Nigerian recipes — with ingredients, step-by-step instructions and a weekly meal planner.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E06000] text-white font-bold rounded-xl hover:bg-[#C75500] transition-colors text-sm shadow-lg shadow-[#E06000]/30"
              >
                Get Started — It's Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm"
              >
                Sign In
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {stats.map((s) => (
                <div key={s.l} className="flex items-center gap-1.5">
                  <span className="text-[#F5A623] font-bold text-sm font-display">{s.n}</span>
                  <span className="text-[#A89E94] text-sm">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating meal cards (desktop) — triangular staircase */}
        <div className="hidden lg:flex absolute right-32 xl:right-40 top-1/2 -translate-y-1/2 flex-col gap-3 w-[26rem]">
          {MEALS.filter((m) => m.featured).slice(0, 3).map((meal, i) => (
            <div
              key={meal.id}
              className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl overflow-hidden shadow-xl"
              style={{ transform: `translateX(${(2 - i) * 48}px)` }}
            >
              <div className="h-44 relative overflow-hidden">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white text-sm font-bold font-display leading-tight">{meal.name}</p>
                  <p className="text-white/70 text-xs mt-0.5">{meal.prepTime + meal.cookTime} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-[#E06000] text-sm font-bold uppercase tracking-wider mb-3">Everything you need</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1714] font-display">Cook smarter, eat better</h2>
          <p className="text-[#706860] mt-3 max-w-lg mx-auto">
            MenuDirectorate gives every home cook in Ikot Ekpene the tools to prepare great Nigerian meals confidently.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-[#E8E0D4] rounded-2xl p-8 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-[#FFF3E8] rounded-2xl flex items-center justify-center text-[#E06000] mb-5 group-hover:bg-[#E06000] group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1A1714] font-display mb-2">{f.title}</h3>
              <p className="text-[#706860] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Meal preview (locked) ── */}
      <section className="bg-[#F5F0E8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[#E06000] text-sm font-bold uppercase tracking-wider mb-2">Meals waiting for you</p>
              <h2 className="text-3xl font-bold text-[#1A1714] font-display">A taste of what's inside</h2>
              <p className="text-[#706860] mt-2 text-sm">Sign in to view full recipes, ingredients and cooking instructions.</p>
            </div>
            <Link
              to="/register"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#E06000] text-white font-semibold rounded-xl hover:bg-[#C75500] transition-colors text-sm"
            >
              Unlock All Recipes →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {previewMeals.map((meal) => (
              <Link
                key={meal.id}
                to="/register"
                className="group relative rounded-xl overflow-hidden block bg-[#E8E0D4] aspect-[3/4]"
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-semibold">Sign in to view</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-bold font-display leading-tight line-clamp-2">{meal.name}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{meal.prepTime + meal.cookTime} min</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 border-2 border-dashed border-[#D4C8BC] rounded-2xl p-8 text-center">
            <svg className="w-10 h-10 text-[#A89E94] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-[#1A1714] font-bold font-display mb-1">
              {MEALS.length - 6} more meals waiting for you
            </p>
            <p className="text-[#706860] text-sm mb-4">Create a free account to unlock all recipes, ingredients and your meal planner.</p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1D5C42] text-white font-semibold rounded-xl hover:bg-[#164A35] transition-colors text-sm"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-[#1D5C42] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mb-3">How It Works</h2>
            <p className="text-[#A8D5C2] max-w-lg mx-auto">Start cooking better Nigerian meals in four simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-0 h-px bg-white/20" />
                )}
                <div className="relative bg-white/10 border border-white/15 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 bg-[#E06000] rounded-full flex items-center justify-center text-white text-base font-bold mx-auto mb-4 font-display shadow-lg shadow-[#E06000]/40">
                    {step.num}
                  </div>
                  <h3 className="text-white font-bold font-display mb-2">{step.title}</h3>
                  <p className="text-[#A8D5C2] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories preview ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1A1714] font-display mb-2">12 Meal Categories</h2>
          <p className="text-[#706860] text-sm">From breakfast to dinner, soups to drinks — we have got it all.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to="/register"
              className="group relative rounded-xl overflow-hidden bg-[#F5F0E8] border border-[#E8E0D4] hover:shadow-md transition-shadow"
            >
              <div className="h-24 relative overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-2.5">
                <p className="font-bold text-[#1A1714] font-display text-xs">{cat.name}</p>
                <p className="text-[#A89E94] text-[10px] mt-0.5">{cat.mealCount} meals</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#E06000] text-[#E06000] font-semibold rounded-xl hover:bg-[#FFF3E8] transition-colors text-sm"
          >
            Sign Up to Explore All Categories
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-gradient-to-br from-[#E06000] to-[#B85000] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mb-4">
            Ready to cook great Nigerian meals?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join home cooks across Ikot Ekpene who plan, prepare and cook better with MenuDirectorate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#E06000] font-bold rounded-xl hover:bg-[#FFF3E8] transition-colors text-base"
            >
              Create Free Account
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              Sign In Instead
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-6">Free to use · No credit card required · Ikot Ekpene, Akwa Ibom</p>
        </div>
      </section>
    </div>
  );
}

// ─── Dashboard for logged-in users ────────────────────────

function UserDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { mealPlan } = useApp();

  const featuredMeals = MEALS.filter((m) => m.featured && m.status === "published").slice(0, 4);
  const popularMeals = MEALS.filter((m) => m.status === "published").slice(0, 8);

  const handleSearch = () => {
    if (search.trim()) navigate(`/meals?q=${encodeURIComponent(search.trim())}`);
  };

  const today = "Monday";
  const todayPlan = ["Breakfast", "Lunch", "Dinner"].map((type) => {
    const entry = mealPlan.find((e) => e.day === today && e.mealType === type);
    return { type, meal: entry ? MEALS.find((m) => m.id === entry.mealId) : null };
  });

  const steps = [
    { num: "01", title: "Choose a Meal", desc: "Browse or search for any meal from our growing collection of local and popular dishes." },
    { num: "02", title: "Check Ingredients", desc: "See everything you need to prepare the meal with exact quantities and units." },
    { num: "03", title: "Follow the Recipe", desc: "Follow clear, step-by-step cooking instructions at your own pace." },
    { num: "04", title: "Plan Your Meal", desc: "Add meals to your daily or weekly timetable and always know what you are cooking next." },
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Hero */}
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
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/meal-plan" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-sm backdrop-blur">
                Create Meal Plan
              </Link>
            </div>
          </div>
        </div>

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

      {/* Today's Meal Plan */}
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
                    <svg className="w-5 h-5 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#A89E94] mb-2">No meal planned</p>
                  <Link to="/meal-plan" className="text-xs font-semibold text-[#E06000] hover:underline">Add meal</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Explore Categories */}
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

      {/* Popular Meals */}
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

      {/* How It Works */}
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

      {/* Planning CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-br from-[#E06000] to-[#C75500] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">Plan Your Meals Ahead</h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">Organise breakfast, lunch and dinner for the week and always know what you are cooking next.</p>
            <Link to="/meal-plan" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#E06000] font-bold rounded-xl hover:bg-[#FFF3E8] transition-colors text-base">
              Create Meal Plan
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Root — switches between landing and dashboard ────────

export default function Home() {
  const { currentUser } = useApp();
  return currentUser ? <UserDashboard /> : <LandingPage />;
}
