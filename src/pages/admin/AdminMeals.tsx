import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../components/layout";
import { MEALS } from "../../data";
import type { Meal } from "../../types";
import { Badge, DifficultyBadge, Button, Input, ConfirmModal } from "../../components/ui";
import { useApp } from "../../context";

export default function AdminMeals() {
  const { showToast } = useApp();
  const [meals, setMeals] = useState<Meal[]>(MEALS);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Meal | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editMeal, setEditMeal] = useState<Meal | null>(null);

  const filtered = meals.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (meal: Meal) => {
    setMeals((prev) => prev.filter((m) => m.id !== meal.id));
    showToast(`${meal.name} deleted successfully.`);
    setDeleteTarget(null);
  };

  const handleToggleFeatured = (id: string) => {
    setMeals((prev) => prev.map((m) => m.id === id ? { ...m, featured: !m.featured } : m));
    showToast("Meal updated.");
  };

  const handleToggleStatus = (id: string) => {
    setMeals((prev) => prev.map((m) => m.id === id ? { ...m, status: m.status === "published" ? "draft" : "published" } : m));
    showToast("Meal status updated.");
  };

  return (
    <AdminLayout title="Meals">
      <div className="space-y-4">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search meals..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8E0D4] text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000]" />
          </div>
          <Link to="/admin/meals/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E06000] text-white text-sm font-semibold rounded-lg hover:bg-[#C75500] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Meal
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F0E8] border-b border-[#E8E0D4]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Meal</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden lg:table-cell">Prep Time</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden lg:table-cell">Difficulty</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D4]">
                {filtered.map((meal) => (
                  <tr key={meal.id} className="hover:bg-[#FDFAF6]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0">
                          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#1A1714] text-sm">{meal.name}</div>
                          {meal.featured && <span className="text-[10px] text-[#E06000] font-semibold">★ Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge variant="default">{meal.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-[#706860] hidden lg:table-cell">{meal.prepTime}min</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <DifficultyBadge level={meal.difficulty} />
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggleStatus(meal.id)}>
                        <Badge variant={meal.status === "published" ? "success" : "warning"}>{meal.status}</Badge>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link to={`/meals/${meal.id}`} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#706860] hover:text-[#1A1714]" title="View">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </Link>
                        <Link to={`/admin/meals/${meal.id}/edit`} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#706860] hover:text-[#E06000]" title="Edit">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </Link>
                        <button onClick={() => handleToggleFeatured(meal.id)} className={`p-1.5 rounded-lg hover:bg-[#F5F0E8] ${meal.featured ? "text-[#E06000]" : "text-[#A89E94]"}`} title={meal.featured ? "Remove from Featured" : "Add to Featured"}>
                          <svg className="w-4 h-4" fill={meal.featured ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                        </button>
                        <button onClick={() => setDeleteTarget(meal)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#A89E94] hover:text-red-500" title="Delete">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-[#A89E94] text-sm">No meals match your search.</div>
            )}
          </div>
          <div className="px-4 py-3 border-t border-[#E8E0D4] text-xs text-[#706860]">
            Showing {filtered.length} of {meals.length} meals
          </div>
        </div>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Delete Meal"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Meal"
      />
    </AdminLayout>
  );
}
