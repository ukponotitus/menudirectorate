import React from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../components/layout";
import { MEALS, RECIPES } from "../../data";
import { Badge } from "../../components/ui";

export default function AdminRecipes() {
  return (
    <AdminLayout title="Recipe Management">
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F0E8] border-b border-[#E8E0D4]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Meal</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden md:table-cell">Ingredients</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden md:table-cell">Steps</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden lg:table-cell">Prep Time</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D4]">
                {MEALS.filter((m) => m.status === "published").map((meal) => {
                  const recipe = RECIPES.find((r) => r.mealId === meal.id);
                  return (
                    <tr key={meal.id} className="hover:bg-[#FDFAF6]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0">
                            <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#1A1714] text-sm">{meal.name}</div>
                            <div className="text-xs text-[#706860]">{meal.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-[#706860]">{recipe ? recipe.ingredients.length : "—"} ingredients</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-[#706860]">{recipe ? recipe.cookingSteps.length : "—"} steps</span>
                      </td>
                      <td className="px-4 py-3 text-[#706860] hidden lg:table-cell">{meal.prepTime + meal.cookTime} min total</td>
                      <td className="px-4 py-3">
                        <Badge variant={recipe ? "success" : "warning"}>{recipe ? "Complete" : "No recipe"}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Link to={`/meals/${meal.id}`} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#706860] hover:text-[#1A1714] transition-colors" title="View">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </Link>
                          <Link to={`/admin/meals/${meal.id}/edit`} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#706860] hover:text-[#E06000] transition-colors" title="Edit Recipe">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
