import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AppProvider } from "./context";
import { Navbar } from "./components/layout";
import { Footer } from "./components/layout";
import { ToastContainer } from "./components/ui";

// User pages
import Home from "./pages/Home";
import Meals from "./pages/Meals";
import MealDetail from "./pages/MealDetail";
import CookingMode from "./pages/CookingMode";
import { CategoriesPage, CategoryDetailPage } from "./pages/Categories";
import MealPlan from "./pages/MealPlan";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminMeals from "./pages/admin/AdminMeals";
import MealForm from "./pages/admin/MealForm";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminIngredients from "./pages/admin/AdminIngredients";
import AdminRecipes from "./pages/admin/AdminRecipes";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminMealPlans from "./pages/admin/AdminMealPlans";

// Layout wrapper for user-facing pages
function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Layout wrapper for auth pages (no nav/footer)
function AuthLayout() {
  return <Outlet />;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* User-facing routes with navbar + footer */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/meals/:id" element={<MealDetail />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<CategoryDetailPage />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Cooking mode — full screen, no nav */}
          <Route path="/meals/:id/cook" element={<CookingMode />} />

          {/* Auth routes — no nav/footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/meals" element={<AdminMeals />} />
          <Route path="/admin/meals/new" element={<MealForm />} />
          <Route path="/admin/meals/:id/edit" element={<MealForm />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/ingredients" element={<AdminIngredients />} />
          <Route path="/admin/recipes" element={<AdminRecipes />} />
          <Route path="/admin/meal-plans" element={<AdminMealPlans />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
}
