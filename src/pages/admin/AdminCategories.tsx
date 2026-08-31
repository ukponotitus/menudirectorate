import React, { useState } from "react";
import { AdminLayout } from "../../components/layout";
import { CATEGORIES } from "../../data";
import type { Category } from "../../types";
import { Badge, Button, Modal, Input, ConfirmModal } from "../../components/ui";
import { useApp } from "../../context";

export default function AdminCategories() {
  const { showToast } = useApp();
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const newCat: Category = { id: form.name.toLowerCase().replace(/\s+/g, "-"), name: form.name, description: form.description, image: "https://images.unsplash.com/photo-1665332195309-9d75071138f0?w=400&h=300&fit=crop", mealCount: 0, color: "#E06000" };
    setCategories((p) => [...p, newCat]);
    showToast("Category added successfully.");
    setAddOpen(false);
    setForm({ name: "", description: "" });
  };

  const handleEdit = () => {
    if (!editTarget) return;
    setCategories((p) => p.map((c) => c.id === editTarget.id ? { ...editTarget, name: form.name || editTarget.name, description: form.description || editTarget.description } : c));
    showToast("Category updated.");
    setEditTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setCategories((p) => p.filter((c) => c.id !== deleteTarget.id));
    showToast("Category deleted.");
    setDeleteTarget(null);
  };

  return (
    <AdminLayout title="Meal Categories">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button variant="primary" onClick={() => { setForm({ name: "", description: "" }); setAddOpen(true); }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Category
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F0E8] border-b border-[#E8E0D4]">
                <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden md:table-cell">Description</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Meals</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D4]">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#FDFAF6]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-[#1A1714]">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#706860] text-sm hidden md:table-cell max-w-xs">
                    <span className="line-clamp-1">{cat.description}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="orange">{cat.mealCount}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => { setEditTarget(cat); setForm({ name: cat.name, description: cat.description }); }} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#706860] hover:text-[#E06000] transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => setDeleteTarget(cat)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#A89E94] hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Category" size="sm">
        <div className="space-y-4">
          <Input label="Category Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g., Soups" />
          <Input label="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Brief description..." />
          <div className="flex gap-3"><Button variant="ghost" onClick={() => setAddOpen(false)} className="flex-1">Cancel</Button><Button variant="primary" onClick={handleAdd} className="flex-1">Add Category</Button></div>
        </div>
      </Modal>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Category" size="sm">
        <div className="space-y-4">
          <Input label="Category Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <Input label="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          <div className="flex gap-3"><Button variant="ghost" onClick={() => setEditTarget(null)} className="flex-1">Cancel</Button><Button variant="primary" onClick={handleEdit} className="flex-1">Save Changes</Button></div>
        </div>
      </Modal>

      <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Category" message={`Delete "${deleteTarget?.name}"? This will not delete the meals in this category.`} confirmLabel="Delete" />
    </AdminLayout>
  );
}
