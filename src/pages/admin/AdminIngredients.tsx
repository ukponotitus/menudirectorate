import React, { useState } from "react";
import { AdminLayout } from "../../components/layout";
import { INGREDIENTS } from "../../data";
import type { Ingredient } from "../../types";
import { Badge, Button, Modal, Input, ConfirmModal } from "../../components/ui";
import { useApp } from "../../context";

export default function AdminIngredients() {
  const { showToast } = useApp();
  const [ingredients, setIngredients] = useState<Ingredient[]>(INGREDIENTS);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Ingredient | null>(null);
  const [form, setForm] = useState({ name: "", description: "", category: "", unit: "g" });

  const filtered = ingredients.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const newIng: Ingredient = { id: form.name.toLowerCase().replace(/\s+/g, "-"), ...form, status: "active", mealsUsedIn: 0 };
    setIngredients((p) => [...p, newIng]);
    showToast("Ingredient added successfully.");
    setAddOpen(false);
    setForm({ name: "", description: "", category: "", unit: "g" });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setIngredients((p) => p.filter((i) => i.id !== deleteTarget.id));
    showToast("Ingredient deleted.");
    setDeleteTarget(null);
  };

  const handleToggleStatus = (id: string) => {
    setIngredients((p) => p.map((i) => i.id === id ? { ...i, status: i.status === "active" ? "inactive" : "active" } : i));
  };

  return (
    <AdminLayout title="Ingredients">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ingredients..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8E0D4] text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000]" />
          </div>
          <Button variant="primary" onClick={() => setAddOpen(true)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Ingredient
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F0E8] border-b border-[#E8E0D4]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Ingredient</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden sm:table-cell">Unit</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden lg:table-cell">Meals Used In</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D4]">
                {filtered.map((ing) => (
                  <tr key={ing.id} className="hover:bg-[#FDFAF6]">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#1A1714]">{ing.name}</div>
                      <div className="text-xs text-[#706860] line-clamp-1">{ing.description}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell"><Badge variant="default">{ing.category}</Badge></td>
                    <td className="px-4 py-3 text-[#706860] hidden sm:table-cell">{ing.unit}</td>
                    <td className="px-4 py-3 hidden lg:table-cell"><span className="text-[#706860]">{ing.mealsUsedIn || 0} meals</span></td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggleStatus(ing.id)}>
                        <Badge variant={ing.status === "active" ? "success" : "warning"}>{ing.status}</Badge>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setDeleteTarget(ing)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#A89E94] hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-[#E8E0D4] text-xs text-[#706860]">Showing {filtered.length} of {ingredients.length} ingredients</div>
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Ingredient" size="sm">
        <div className="space-y-4">
          <Input label="Ingredient Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g., Afang Leaves" />
          <Input label="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Brief description..." />
          <Input label="Category" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} placeholder="e.g., Vegetables" />
          <Input label="Default Unit" value={form.unit} onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))} placeholder="g, ml, pieces..." />
          <div className="flex gap-3"><Button variant="ghost" onClick={() => setAddOpen(false)} className="flex-1">Cancel</Button><Button variant="primary" onClick={handleAdd} className="flex-1">Save Ingredient</Button></div>
        </div>
      </Modal>

      <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Ingredient" message={`Delete "${deleteTarget?.name}"? This may affect meals using this ingredient.`} confirmLabel="Delete" />
    </AdminLayout>
  );
}
