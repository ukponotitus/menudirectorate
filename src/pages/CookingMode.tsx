import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MEALS, RECIPES } from "../data";
import { useApp } from "../context";
import { AddToPlanModal } from "../components/meals";

export default function CookingMode() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();

  const meal = MEALS.find((m) => m.id === id);
  const recipe = RECIPES.find((r) => r.mealId === id);

  const defaultSteps = [
    { id: "cs1", mealId: id!, stepNumber: 1, title: "Prepare Ingredients", instruction: "Gather and prepare all ingredients as listed in the recipe. Wash and cut all vegetables. Season the protein with salt, pepper and seasoning cubes.", duration: 10 },
    { id: "cs2", mealId: id!, stepNumber: 2, title: "Begin Cooking", instruction: "Start cooking the protein first. Place in a pot with water, seasoning and cook on medium heat until tender.", duration: 20 },
    { id: "cs3", mealId: id!, stepNumber: 3, title: "Add Seasoning & Base", instruction: "Add palm oil, crayfish, blended pepper and other seasonings. Stir and allow to cook together for 8-10 minutes.", duration: 10 },
    { id: "cs4", mealId: id!, stepNumber: 4, title: "Final Stage", instruction: "Add remaining vegetables or leaves. Cook for the final 3-5 minutes. Taste and adjust seasoning.", duration: 5 },
    { id: "cs5", mealId: id!, stepNumber: 5, title: "Serve", instruction: "Remove from heat. Serve hot with pounded yam, fufu, eba or any preferred swallow. Enjoy your meal!", duration: 2 },
  ];

  const steps = recipe?.cookingSteps || defaultSteps;
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);

  if (!meal) {
    return (
      <div className="min-h-screen bg-[#1A1714] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold font-display mb-4">Meal not found</h1>
          <Link to="/meals" className="text-[#F5A623]">← Back to Meals</Link>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-[#1A1714] flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-24 h-24 bg-[#2D7A57] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-white font-display mb-2">Meal Complete!</h1>
          <p className="text-[#A8D5C2] text-lg mb-2">You completed</p>
          <h2 className="text-2xl font-bold text-[#F5A623] font-display mb-8">{meal.name}</h2>

          <div className="space-y-3">
            <button onClick={() => setPlanOpen(true)} className="w-full py-4 bg-[#E06000] text-white font-bold rounded-xl hover:bg-[#C75500] transition-colors text-base">
              Add to Meal Plan
            </button>
            <Link to={`/meals/${meal.id}`} className="block w-full py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-base">
              Back to Recipe
            </Link>
            <Link to="/meals" className="block w-full py-4 text-[#706860] font-semibold hover:text-[#A89E94] transition-colors text-base">
              Explore More Meals
            </Link>
          </div>
        </div>
        <AddToPlanModal open={planOpen} onClose={() => setPlanOpen(false)} mealId={meal.id} mealName={meal.name} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1714] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg text-[#706860] hover:text-white hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="text-center">
          <div className="text-white font-bold font-display text-sm sm:text-base">{meal.name}</div>
          <div className="text-[#706860] text-xs">Step {currentStep + 1} of {steps.length}</div>
        </div>
        <div className="w-9" /> {/* spacer */}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <div className="h-full bg-[#E06000] transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Step indicators */}
      <div className="flex justify-center gap-2 py-4 px-4">
        {steps.map((_, i) => (
          <button key={i} onClick={() => setCurrentStep(i)} className={`transition-all duration-300 rounded-full ${i === currentStep ? "w-8 h-2 bg-[#E06000]" : i < currentStep ? "w-2 h-2 bg-[#2D7A57]" : "w-2 h-2 bg-white/20"}`} />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-6 max-w-xl mx-auto w-full">
        {/* Step number badge */}
        <div className="inline-flex items-center gap-2 bg-[#E06000]/20 border border-[#E06000]/40 text-[#F5A623] text-sm font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
          Step {currentStep + 1} of {steps.length}
        </div>

        {/* Step title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-display text-center mb-6 leading-tight">{step.title}</h2>

        {/* Instruction */}
        <p className="text-[#C4B9AE] text-lg sm:text-xl text-center leading-relaxed mb-6">{step.instruction}</p>

        {/* Duration */}
        {step.duration && (
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-xl mb-8">
            <svg className="w-4 h-4 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-sm font-semibold">{step.duration} minutes</span>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="px-4 sm:px-8 pb-8 flex gap-4 max-w-xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="flex-1 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          className="flex-[2] py-4 bg-[#E06000] text-white font-bold rounded-xl hover:bg-[#C75500] transition-colors text-base shadow-lg"
        >
          {currentStep === steps.length - 1 ? "Finish Cooking 🎉" : "Next Step →"}
        </button>
      </div>
    </div>
  );
}
