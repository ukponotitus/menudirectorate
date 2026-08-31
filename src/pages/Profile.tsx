import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context";
import { MEALS } from "../data";
import { Input, Button, Tabs, Badge } from "../components/ui";
import { MealCard } from "../components/meals";

export default function Profile() {
  const { currentUser, logout, favorites, mealPlan, showToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: currentUser?.firstName || "", lastName: currentUser?.lastName || "", email: currentUser?.email || "", phone: currentUser?.phone || "" });

  const favMeals = MEALS.filter((m) => favorites.has(m.id)).slice(0, 4);
  const plannedCount = mealPlan.filter((e) => e.userId === "guest").length;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1A1714] font-display mb-2">Sign In Required</h2>
          <p className="text-[#706860] text-sm mb-6">Please sign in to view your profile and manage your meal plans.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login"><Button variant="primary">Login</Button></Link>
            <Link to="/register"><Button variant="outline">Sign Up</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    showToast("Profile updated successfully.");
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    showToast("You have been logged out.", "info");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] pb-20 md:pb-0">
      {/* Profile header */}
      <div className="bg-white border-b border-[#E8E0D4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E06000] rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-display shrink-0">
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-[#1A1714] font-display">{currentUser.firstName} {currentUser.lastName}</h1>
              <p className="text-[#706860] text-sm">{currentUser.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="green">Active</Badge>
                <span className="text-xs text-[#A89E94]">Member since {new Date(currentUser.joinedAt).toLocaleDateString("en-NG", { month: "long", year: "numeric" })}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="shrink-0 hidden sm:flex">Logout</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Saved Meals", value: favorites.size },
              { label: "Meals Planned", value: plannedCount },
              { label: "Categories", value: 12 },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 bg-[#F5F0E8] rounded-xl">
                <div className="text-2xl font-bold text-[#E06000] font-display">{s.value}</div>
                <div className="text-xs text-[#706860]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Tabs tabs={["Personal Information", "Meal Preferences", "Favorites", "Meal Plan", "Account Settings"]} active={activeTab} onChange={setActiveTab} className="mb-6 overflow-x-auto" />

        {activeTab === "Personal Information" && (
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#1A1714] font-display">Personal Information</h2>
              {!editing ? (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit Profile</Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                  <Button variant="primary" size="sm" onClick={handleSave}>Save Changes</Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="First Name" value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} disabled={!editing} />
              <Input label="Last Name" value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} disabled={!editing} />
              <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} disabled={!editing} />
              <Input label="Phone Number" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} disabled={!editing} />
            </div>
          </div>
        )}

        {activeTab === "Meal Preferences" && (
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-6">
            <h2 className="text-lg font-bold text-[#1A1714] font-display mb-5">Meal Preferences</h2>
            <div className="space-y-4">
              {["Soups", "Rice Dishes", "Local Meals", "Breakfast"].map((pref) => (
                <label key={pref} className="flex items-center justify-between p-3 rounded-lg border border-[#E8E0D4] cursor-pointer hover:border-[#E06000] transition-colors">
                  <span className="text-sm font-semibold text-[#1A1714]">{pref}</span>
                  <div className="w-10 h-6 bg-[#E06000] rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Favorites" && (
          <div>
            <h2 className="text-lg font-bold text-[#1A1714] font-display mb-4">Favorite Meals ({favorites.size})</h2>
            {favMeals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favMeals.map((m) => <MealCard key={m.id} meal={m} variant="compact" />)}
              </div>
            ) : (
              <p className="text-[#706860] text-sm">No favorite meals yet. <Link to="/meals" className="text-[#E06000] font-semibold hover:underline">Explore Meals</Link></p>
            )}
            {favorites.size > 4 && <Link to="/favorites" className="mt-4 block text-sm text-[#E06000] font-semibold hover:underline">View all {favorites.size} favorites →</Link>}
          </div>
        )}

        {activeTab === "Meal Plan" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1A1714] font-display">My Meal Plan</h2>
              <Link to="/meal-plan" className="text-sm text-[#E06000] font-semibold hover:underline">View Full Plan →</Link>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E0D4] p-4 text-center">
              <div className="text-3xl font-bold text-[#E06000] font-display mb-1">{plannedCount}</div>
              <p className="text-sm text-[#706860]">meals planned this week</p>
              <Link to="/meal-plan" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#E06000] text-white rounded-lg text-sm font-semibold hover:bg-[#C75500] transition-colors">Manage Meal Plan</Link>
            </div>
          </div>
        )}

        {activeTab === "Account Settings" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#E8E0D4] p-6">
              <h2 className="text-lg font-bold text-[#1A1714] font-display mb-4">Account Settings</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[#E8E0D4] hover:border-[#E06000] text-left transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-[#1A1714]">Change Password</div>
                    <div className="text-xs text-[#706860]">Update your account password</div>
                  </div>
                  <svg className="w-4 h-4 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[#E8E0D4] hover:border-[#E06000] text-left transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-[#1A1714]">Notification Preferences</div>
                    <div className="text-xs text-[#706860]">Manage email and push notifications</div>
                  </div>
                  <svg className="w-4 h-4 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <button onClick={handleLogout} className="w-full flex items-center justify-between p-3 rounded-lg border border-red-200 hover:bg-red-50 text-left transition-colors">
                  <div className="text-sm font-semibold text-red-600">Logout</div>
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-red-100 hover:bg-red-50 text-left transition-colors">
                  <div className="text-sm font-semibold text-red-400">Delete Account</div>
                  <svg className="w-4 h-4 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
