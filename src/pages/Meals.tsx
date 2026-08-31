import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MEALS, CATEGORIES } from "../data";
import { MealCard } from "../components/meals";
import { SearchBar } from "../components/meals";
import { Select, MealCardSkeleton, EmptyState, Button } from "../components/ui";

const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "quickest", label: "Quickest" },
  { value: "az", label: "A-Z" },
];

export default function Meals() {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState("");
  const [mealType, setMealType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("popular");
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let list = MEALS.filter((m) => m.status === "published");
    const q = (query || initialQ).toLowerCase();
    if (q) list = list.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q) || m.category.toLowerCase().includes(q));
    if (category) list = list.filter((m) => m.category === category);
    if (mealType) list = list.filter((m) => m.mealType === mealType);
    if (difficulty) list = list.filter((m) => m.difficulty === difficulty);

    if (sort === "newest") list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sort === "quickest") list = [...list].sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
    else if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [query, initialQ, category, mealType, difficulty, sort]);

  const handleSearch = () => setParams(query ? { q: query } : {});
  const clearFilters = () => { setQuery(""); setCategory(""); setMealType(""); setDifficulty(""); setParams({}); };

  const hasFilters = query || category || mealType || difficulty;

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-bold text-[#1A1714] font-display mb-2">Explore Meals</h1>
          <p className="text-[#706860] mb-6">Find the perfect meal and learn how to prepare it.</p>
          <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} className="max-w-2xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-end">
          <div className="w-44">
            <Select
              label=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[{ value: "", label: "All Categories" }, ...CATEGORIES.map((c) => ({ value: c.id, label: c.name }))]}
            />
          </div>
          <div className="w-40">
            <Select
              label=""
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              options={[{ value: "", label: "All Meal Types" }, { value: "Breakfast", label: "Breakfast" }, { value: "Lunch", label: "Lunch" }, { value: "Dinner", label: "Dinner" }, { value: "Snack", label: "Snack" }, { value: "Any", label: "Any" }]}
            />
          </div>
          <div className="w-40">
            <Select
              label=""
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              options={[{ value: "", label: "Any Difficulty" }, { value: "Easy", label: "Easy" }, { value: "Medium", label: "Medium" }, { value: "Hard", label: "Hard" }]}
            />
          </div>
          <div className="w-36 ml-auto">
            <Select
              label=""
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              options={SORT_OPTIONS}
            />
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-[#E06000] font-semibold hover:underline whitespace-nowrap">Clear filters</button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-[#706860]">
            {initialQ || query ? `Search results for "${initialQ || query}"` : "All Meals"} — <strong className="text-[#1A1714]">{filtered.length} meals</strong>
          </span>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <MealCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="No meals found"
            description="Try searching with another meal name, ingredient or category."
            action={<Button variant="primary" onClick={clearFilters}>Explore All Meals</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((m) => <MealCard key={m.id} meal={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
