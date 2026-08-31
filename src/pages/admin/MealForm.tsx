import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AdminLayout } from "../../components/layout";
import { MEALS, CATEGORIES, INGREDIENTS } from "../../data";
import type { RecipeIngredient } from "../../types";
import { Input, Textarea, Select, Button } from "../../components/ui";
import { useApp } from "../../context";

export default function MealForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const existingMeal = id && id !== "new" ? MEALS.find((m) => m.id === id) : null;
  const isEdit = !!existingMeal;

  const [form, setForm] = useState({
    name: existingMeal?.name || "",
    description: existingMeal?.description || "",
    category: existingMeal?.category || "",
    mealType: existingMeal?.mealType || "Dinner",
    prepTime: existingMeal?.prepTime?.toString() || "",
    cookTime: existingMeal?.cookTime?.toString() || "",
    servings: existingMeal?.servings?.toString() || "4",
    difficulty: existingMeal?.difficulty || "Easy",
    status: existingMeal?.status || "draft",
  });

  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    isEdit ? (INGREDIENTS.slice(0, 3).map((ing, i) => ({ ingredientId: ing.id, ingredientName: ing.name, quantity: 200 + i * 50, unit: ing.unit }))) : []
  );

  const [cookingSteps, setCookingSteps] = useState<{ title: string; instruction: string; duration: string }[]>(
    isEdit ? [{ title: "Prepare Ingredients", instruction: "Wash and prepare all ingredients.", duration: "10" }] : []
  );

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Meal name is required.";
    if (!form.category) errs.category = "Please select a category.";
    if (!form.prepTime || isNaN(+form.prepTime)) errs.prepTime = "Preparation time must be a valid number.";
    if (!form.cookTime || isNaN(+form.cookTime)) errs.cookTime = "Cooking time must be a valid number.";
    return errs;
  };

  const handleSave = async (publish = false) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    showToast(isEdit ? "Meal updated successfully." : publish ? "Meal published successfully." : "Meal saved as draft.");
    navigate("/admin/meals");
    setSaving(false);
  };

  const addIngredient = () => setIngredients((p) => [...p, { ingredientId: "", ingredientName: "", quantity: 100, unit: "g" }]);
  const removeIngredient = (i: number) => setIngredients((p) => p.filter((_, idx) => idx !== i));
  const updateIngredient = (i: number, k: string, v: string | number) =>
    setIngredients((p) => p.map((ing, idx) => idx === i ? { ...ing, [k]: v } : ing));

  const addStep = () => setCookingSteps((p) => [...p, { title: "", instruction: "", duration: "" }]);
  const removeStep = (i: number) => setCookingSteps((p) => p.filter((_, idx) => idx !== i));
  const updateStep = (i: number, k: string, v: string) =>
    setCookingSteps((p) => p.map((s, idx) => idx === i ? { ...s, [k]: v } : s));

  return (
    <AdminLayout title={isEdit ? "Edit Meal" : "Add New Meal"}>
      <div className="max-w-3xl space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#706860]">
          <Link to="/admin/meals" className="hover:text-[#E06000] transition-colors">Meals</Link>
          <span>›</span>
          <span className="text-[#1A1714]">{isEdit ? `Edit: ${existingMeal?.name}` : "New Meal"}</span>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-[#E8E0D4] p-6 space-y-4">
          <h2 className="text-base font-bold text-[#1A1714] font-display">Meal Information</h2>
          <Input label="Meal Name" value={form.name} onChange={set("name")} placeholder="e.g., Afang Soup" error={errors.name} />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Describe this meal..." rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={form.category} onChange={set("category")} options={[{ value: "", label: "Select category" }, ...CATEGORIES.map((c) => ({ value: c.id, label: c.name }))]} error={errors.category} />
            <Select label="Meal Type" value={form.mealType} onChange={set("mealType")} options={["Breakfast", "Lunch", "Dinner", "Snack", "Any"].map((v) => ({ value: v, label: v }))} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input label="Prep Time (min)" type="number" value={form.prepTime} onChange={set("prepTime")} placeholder="20" error={errors.prepTime} />
            <Input label="Cook Time (min)" type="number" value={form.cookTime} onChange={set("cookTime")} placeholder="35" error={errors.cookTime} />
            <Input label="Servings" type="number" value={form.servings} onChange={set("servings")} placeholder="4" />
            <Select label="Difficulty" value={form.difficulty} onChange={set("difficulty")} options={["Easy", "Medium", "Hard"].map((v) => ({ value: v, label: v }))} />
          </div>
          <Select label="Status" value={form.status} onChange={set("status")} options={[{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }]} />
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-xl border border-[#E8E0D4] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#1A1714] font-display">Ingredients</h2>
            <button onClick={addIngredient} className="text-sm text-[#E06000] font-semibold hover:underline">+ Add Ingredient</button>
          </div>
          {ingredients.length === 0 ? (
            <div className="border-2 border-dashed border-[#E8E0D4] rounded-lg p-6 text-center">
              <p className="text-sm text-[#A89E94] mb-2">No ingredients added yet.</p>
              <button onClick={addIngredient} className="text-sm text-[#E06000] font-semibold hover:underline">Add first ingredient</button>
            </div>
          ) : (
            <div className="space-y-3">
              {ingredients.map((ing, i) => (
                <div key={i} className="grid grid-cols-5 gap-2 items-end">
                  <div className="col-span-2">
                    <Select label={i === 0 ? "Ingredient" : ""} value={ing.ingredientId} onChange={(e) => {
                      const found = INGREDIENTS.find((x) => x.id === e.target.value);
                      if (found) updateIngredient(i, "ingredientId", found.id);
                      if (found) updateIngredient(i, "ingredientName", found.name);
                    }} options={[{ value: "", label: "Select ingredient" }, ...INGREDIENTS.map((ing) => ({ value: ing.id, label: ing.name }))]} />
                  </div>
                  <Input label={i === 0 ? "Quantity" : ""} type="number" value={ing.quantity.toString()} onChange={(e) => updateIngredient(i, "quantity", Number(e.target.value))} placeholder="200" />
                  <Input label={i === 0 ? "Unit" : ""} value={ing.unit} onChange={(e) => updateIngredient(i, "unit", e.target.value)} placeholder="g" />
                  <button onClick={() => removeIngredient(i)} className="mb-0.5 p-2.5 rounded-lg border border-[#E8E0D4] hover:bg-red-50 hover:border-red-200 hover:text-red-500 text-[#A89E94] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cooking Steps */}
        <div className="bg-white rounded-xl border border-[#E8E0D4] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#1A1714] font-display">Cooking Steps</h2>
            <button onClick={addStep} className="text-sm text-[#E06000] font-semibold hover:underline">+ Add Step</button>
          </div>
          {cookingSteps.length === 0 ? (
            <div className="border-2 border-dashed border-[#E8E0D4] rounded-lg p-6 text-center">
              <p className="text-sm text-[#A89E94] mb-2">No cooking steps added yet.</p>
              <button onClick={addStep} className="text-sm text-[#E06000] font-semibold hover:underline">Add first step</button>
            </div>
          ) : (
            <div className="space-y-4">
              {cookingSteps.map((step, i) => (
                <div key={i} className="border border-[#E8E0D4] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#E06000] text-white text-xs font-bold flex items-center justify-center">{i + 1}</div>
                      <span className="text-sm font-semibold text-[#706860]">Step {i + 1}</span>
                    </div>
                    <button onClick={() => removeStep(i)} className="text-[#A89E94] hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <Input label="Title" value={step.title} onChange={(e) => updateStep(i, "title", e.target.value)} placeholder="e.g., Prepare the Meat" />
                    <Textarea label="Instruction" value={step.instruction} onChange={(e) => updateStep(i, "instruction", e.target.value)} placeholder="Describe what to do in this step..." rows={2} />
                    <Input label="Duration (minutes, optional)" type="number" value={step.duration} onChange={(e) => updateStep(i, "duration", e.target.value)} placeholder="10" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 justify-end pb-8">
          <Button variant="ghost" onClick={() => navigate("/admin/meals")}>Cancel</Button>
          <Button variant="outline" loading={saving} onClick={() => handleSave(false)}>Save as Draft</Button>
          <Button variant="primary" loading={saving} onClick={() => handleSave(true)}>{isEdit ? "Update Meal" : "Publish Meal"}</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
