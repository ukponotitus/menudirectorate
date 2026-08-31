import React, { useState } from "react";
import { AdminLayout } from "../../components/layout";
import { DAYS, MEAL_TYPES, MEALS, DEFAULT_MEAL_PLAN } from "../../data";
import { Select, Button } from "../../components/ui";
import { useApp } from "../../context";

export default function AdminMealPlans() {
  const { showToast } = useApp();
  const [plan, setPlan] = useState(DEFAULT_MEAL_PLAN);

  const getEntry = (day: string, type: string) => plan.find((e) => e.day === day && e.mealType === type);
  const getMeal = (mealId: string) => MEALS.find((m) => m.id === mealId);

  const updateSlot = (day: string, type: string, mealId: string) => {
    const existing = getEntry(day, type);
    if (existing) {
      setPlan((p) => p.map((e) => e.id === existing.id ? { ...e, mealId } : e));
    } else {
      setPlan((p) => [...p, { id: `mp-${Date.now()}`, userId: "default", day, mealType: type as any, mealId }]);
    }
  };

  const handleSave = () => showToast("Recommended meal plan saved successfully.");

  return (
    <AdminLayout title="Meal Plan Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#706860]">Configure the recommended weekly meal timetable that users see as a starting point.</p>
          <Button variant="primary" onClick={handleSave}>Save Timetable</Button>
        </div>

        {/* Desktop table */}
        <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F0E8] border-b border-[#E8E0D4]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide w-28">Day</th>
                  {MEAL_TYPES.map((t) => (
                    <th key={t} className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${t === "Breakfast" ? "bg-amber-400" : t === "Lunch" ? "bg-green-500" : "bg-[#E06000]"}`} />
                        {t}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D4]">
                {DAYS.map((day) => (
                  <tr key={day} className="hover:bg-[#FDFAF6]">
                    <td className="px-4 py-3 font-bold text-[#1A1714] font-display">{day}</td>
                    {MEAL_TYPES.map((type) => {
                      const entry = getEntry(day, type);
                      const meal = entry ? getMeal(entry.mealId) : null;
                      return (
                        <td key={type} className="px-4 py-3">
                          <Select
                            value={entry?.mealId || ""}
                            onChange={(e) => updateSlot(day, type, e.target.value)}
                            options={[{ value: "", label: "— No meal —" }, ...MEALS.filter((m) => m.status === "published").map((m) => ({ value: m.id, label: m.name }))]}
                          />
                          {meal && <div className="text-xs text-[#706860] mt-1 ml-1">{meal.prepTime + meal.cookTime} min</div>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {DAYS.map((day) => (
            <div key={day} className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
              <div className="px-4 py-3 bg-[#F5F0E8] border-b border-[#E8E0D4]">
                <span className="font-bold text-[#1A1714] font-display">{day}</span>
              </div>
              <div className="p-4 space-y-3">
                {MEAL_TYPES.map((type) => {
                  const entry = getEntry(day, type);
                  return (
                    <div key={type}>
                      <label className="block text-xs font-semibold text-[#706860] mb-1">{type}</label>
                      <Select value={entry?.mealId || ""} onChange={(e) => updateSlot(day, type, e.target.value)} options={[{ value: "", label: "— No meal —" }, ...MEALS.filter((m) => m.status === "published").map((m) => ({ value: m.id, label: m.name }))]} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>Save Timetable</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
