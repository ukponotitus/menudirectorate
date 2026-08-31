import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MEALS, DAYS, MEAL_TYPES } from "../data";
import { useApp } from "../context";
import { Tabs, Button, EmptyState, Modal, Select } from "../components/ui";
import { AddToPlanModal } from "../components/meals";

const today = new Date().toLocaleDateString("en-NG", { weekday: "long" });
const currentDay = DAYS.includes(today) ? today : "Monday";

export default function MealPlan() {
  const { mealPlan, removeFromMealPlan, addToMealPlan, showToast } = useApp();
  const [activeTab, setActiveTab] = useState("This Week");
  const [editEntry, setEditEntry] = useState<any>(null);
  const [addModal, setAddModal] = useState<{ day: string; type: "Breakfast" | "Lunch" | "Dinner" } | null>(null);
  const [selectedMealId, setSelectedMealId] = useState("");

  const getMealForSlot = (day: string, type: string) =>
    mealPlan.find((e) => e.day === day && e.mealType === type);

  const getMealData = (mealId: string) => MEALS.find((m) => m.id === mealId);

  const handleRemove = (id: string, name: string) => {
    removeFromMealPlan(id);
    showToast(`${name} removed from meal plan.`, "info");
  };

  const todaySlots = MEAL_TYPES.map((type) => {
    const entry = getMealForSlot(currentDay, type);
    return { type, entry, meal: entry ? getMealData(entry.mealId) : null };
  });

  const weekFilled = mealPlan.length;

  const DayCard = ({ day }: { day: string }) => (
    <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
      <div className={`px-4 py-3 border-b border-[#E8E0D4] ${day === currentDay ? "bg-[#FFF3E8]" : "bg-[#F5F0E8]"}`}>
        <div className="flex items-center justify-between">
          <span className={`font-bold text-sm font-display ${day === currentDay ? "text-[#E06000]" : "text-[#1A1714]"}`}>{day}</span>
          {day === currentDay && <span className="text-[10px] font-bold bg-[#E06000] text-white px-2 py-0.5 rounded-full">TODAY</span>}
        </div>
      </div>
      <div className="divide-y divide-[#E8E0D4]">
        {MEAL_TYPES.map((type) => {
          const entry = getMealForSlot(day, type);
          const meal = entry ? getMealData(entry.mealId) : null;
          return (
            <div key={type} className="p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <div className={`w-1.5 h-1.5 rounded-full ${type === "Breakfast" ? "bg-amber-400" : type === "Lunch" ? "bg-green-500" : "bg-[#E06000]"}`} />
                <span className="text-[10px] font-bold text-[#706860] uppercase tracking-wider">{type}</span>
              </div>
              {meal ? (
                <div>
                  <div className="flex items-start gap-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0">
                      <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#1A1714] line-clamp-1">{meal.name}</div>
                      <div className="text-[10px] text-[#A89E94]">{meal.prepTime + meal.cookTime}min</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Link to={`/meals/${meal.id}`} className="text-[10px] font-semibold text-[#E06000] hover:underline">Recipe</Link>
                    <button onClick={() => handleRemove(entry!.id, meal.name)} className="text-[10px] font-semibold text-[#A89E94] hover:text-red-500 transition-colors">Remove</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setAddModal({ day, type })} className="w-full flex items-center gap-1.5 text-[10px] text-[#A89E94] hover:text-[#E06000] transition-colors py-0.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add meal
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFAF6] pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1A1714] font-display">My Meal Plan</h1>
              <p className="text-[#706860] text-sm mt-1">Plan your daily and weekly meals.</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold text-[#E06000] font-display">{weekFilled}</div>
              <div className="text-xs text-[#706860]">meals planned</div>
            </div>
          </div>
          <Tabs tabs={["Today", "This Week"]} active={activeTab} onChange={setActiveTab} className="mt-6 max-w-xs" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "Today" && (
          <div>
            <h2 className="text-xl font-bold text-[#1A1714] font-display mb-4">{currentDay}'s Meals</h2>
            {todaySlots.every((s) => !s.meal) ? (
              <EmptyState
                icon={<svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                title="No meals planned for today"
                description="Start planning by adding breakfast, lunch or dinner."
                action={<Link to="/meals" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E06000] text-white rounded-xl text-sm font-semibold hover:bg-[#C75500] transition-colors">Explore Meals</Link>}
              />
            ) : (
              <div className="space-y-4">
                {todaySlots.map(({ type, entry, meal }) => (
                  <div key={type} className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
                    <div className={`flex items-center gap-3 px-4 py-3 border-b border-[#E8E0D4] ${!meal ? "bg-[#F5F0E8]" : type === "Breakfast" ? "bg-amber-50" : type === "Lunch" ? "bg-green-50" : "bg-[#FFF3E8]"}`}>
                      <div className={`w-2 h-2 rounded-full ${type === "Breakfast" ? "bg-amber-400" : type === "Lunch" ? "bg-green-500" : "bg-[#E06000]"}`} />
                      <span className="text-xs font-bold text-[#706860] uppercase tracking-wider">{type}</span>
                    </div>
                    {meal ? (
                      <div className="flex gap-4 p-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5F0E8] shrink-0">
                          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#1A1714] font-display mb-1">{meal.name}</h3>
                          <p className="text-xs text-[#706860] mb-3">Prep: {meal.prepTime}min · Cook: {meal.cookTime}min</p>
                          <div className="flex gap-3">
                            <Link to={`/meals/${meal.id}`} className="text-sm font-semibold text-[#E06000] hover:underline">View Recipe</Link>
                            <Link to={`/meals/${meal.id}/cook`} className="text-sm font-semibold text-[#1D5C42] hover:underline">Start Cooking</Link>
                            <button onClick={() => handleRemove(entry!.id, meal.name)} className="text-sm font-semibold text-[#A89E94] hover:text-red-500 transition-colors">Remove</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        <button onClick={() => setAddModal({ day: currentDay, type })} className="flex items-center gap-2 text-sm text-[#A89E94] hover:text-[#E06000] transition-colors">
                          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#E8E0D4] flex items-center justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></div>
                          Add {type.toLowerCase()} meal
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "This Week" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1A1714] font-display">Weekly Timetable</h2>
              <p className="text-xs text-[#706860]">{weekFilled} / 21 slots filled</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {DAYS.map((day) => <DayCard key={day} day={day} />)}
            </div>
          </div>
        )}
      </div>

      {/* Quick Add Modal */}
      {addModal && (
        <Modal open={true} onClose={() => setAddModal(null)} title={`Add ${addModal.type} for ${addModal.day}`} size="sm">
          <div className="space-y-4">
            <Select
              label="Select a Meal"
              value={selectedMealId}
              onChange={(e) => setSelectedMealId(e.target.value)}
              options={[{ value: "", label: "Choose a meal..." }, ...MEALS.filter((m) => m.status === "published").map((m) => ({ value: m.id, label: m.name }))]}
            />
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setAddModal(null)} className="flex-1">Cancel</Button>
              <Button variant="primary" onClick={() => {
                if (!selectedMealId) return;
                addToMealPlan({ userId: "guest", day: addModal.day, mealType: addModal.type, mealId: selectedMealId });
                const meal = MEALS.find((m) => m.id === selectedMealId);
                showToast(`${meal?.name} added to ${addModal.day} ${addModal.type.toLowerCase()}.`);
                setAddModal(null);
                setSelectedMealId("");
              }} className="flex-1">Add Meal</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
