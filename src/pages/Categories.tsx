import React from "react";
import { useParams, Link } from "react-router-dom";
import { CATEGORIES, MEALS } from "../data";
import { CategoryCard, MealCard } from "../components/meals";
import { EmptyState } from "../components/ui";

export function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      <div className="bg-white border-b border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-bold text-[#1A1714] font-display mb-2">Meal Categories</h1>
          <p className="text-[#706860]">Browse all meals organized by category.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/categories/${cat.id}`} className="group relative rounded-2xl overflow-hidden border border-[#E8E0D4] bg-white hover:shadow-md transition-shadow">
              <div className="h-40 relative overflow-hidden bg-[#F5F0E8]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold font-display text-base">{cat.name}</h3>
                  <p className="text-white/70 text-xs">{cat.mealCount} meals</p>
                </div>
              </div>
              <div className="p-3">
                <p className="text-[#706860] text-xs line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const category = CATEGORIES.find((c) => c.id === id);
  const meals = MEALS.filter((m) => m.category === id && m.status === "published");

  if (!category) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center">
        <EmptyState title="Category Not Found" description="This category doesn't exist." action={<Link to="/categories" className="text-[#E06000] font-semibold hover:underline">← Back to Categories</Link>} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Hero */}
      <div className="relative h-48 sm:h-64 bg-[#1A1714] overflow-hidden">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Link to="/categories" className="text-[#A89E94] text-sm hover:text-white mb-3 inline-block">← All Categories</Link>
          <h1 className="text-3xl font-bold text-white font-display">{category.name}</h1>
          <p className="text-[#A89E94] text-sm mt-1">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-[#706860]"><strong className="text-[#1A1714]">{meals.length} meals</strong> in {category.name}</span>
        </div>

        {meals.length === 0 ? (
          <EmptyState
            title="No meals in this category yet"
            description="Check back soon as we continue adding recipes."
            action={<Link to="/meals" className="text-[#E06000] font-semibold hover:underline">Browse All Meals</Link>}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {meals.map((m) => <MealCard key={m.id} meal={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
