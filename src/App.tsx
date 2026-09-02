import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context";
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
import ResetPassword from "./pages/auth/ResetPassword";

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

// Public layout: visible to everyone (landing page)
function PublicLayout() {
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

// Protected layout: requires login — redirects to /login with return path
function ProtectedLayout() {
  const { currentUser } = useApp();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

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

// Auth layout: bare pages (no nav/footer)
function AuthLayout() {
  return <Outlet />;
}

// Protected cooking mode (full-screen, no nav)
function ProtectedCookingMode() {
  const { currentUser } = useApp();
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <CookingMode />;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing page — public, no auth required */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Protected routes — require login */}
          <Route element={<ProtectedLayout />}>
            <Route path="/meals" element={<Meals />} />
            <Route path="/meals/:id" element={<MealDetail />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<CategoryDetailPage />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Cooking mode — full screen, protected */}
          <Route path="/meals/:id/cook" element={<ProtectedCookingMode />} />

          {/* Auth routes — no nav/footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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
