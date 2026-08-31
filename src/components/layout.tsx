import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context";

// ── Navbar ───────────────────────────────────────────────
export function Navbar() {
  const { currentUser, favorites, searchQuery, setSearchQuery } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/meals", label: "Meals" },
    { to: "/categories", label: "Categories" },
    { to: "/meal-plan", label: "Meal Plan" },
    { to: "/favorites", label: "Favorites" },
  ];

  const active = (to: string) => location.pathname === to ? "text-[#E06000]" : "text-[#706860] hover:text-[#1A1714]";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/meals?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#E06000] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="font-bold text-[#1A1714] text-lg font-display hidden sm:block">MenuDirectorate</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className={`text-sm font-semibold transition-colors ${active(l.to)}`}>{l.label}</Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg hover:bg-[#F5F0E8] text-[#706860] transition-colors" aria-label="Search">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            {currentUser ? (
              <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#F5F0E8] transition-colors">
                <div className="w-7 h-7 bg-[#E06000] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {currentUser.firstName[0]}
                </div>
                <span className="text-sm font-semibold text-[#1A1714] hidden sm:block">{currentUser.firstName}</span>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="text-sm font-semibold text-[#706860] hover:text-[#1A1714] px-3 py-1.5 rounded-lg hover:bg-[#F5F0E8] transition-colors">Login</Link>
                <Link to="/register" className="text-sm font-semibold bg-[#E06000] text-white px-4 py-2 rounded-lg hover:bg-[#C75500] transition-colors">Sign Up</Link>
              </div>
            )}

            {/* Mobile menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-[#F5F0E8] text-[#706860]" aria-label="Menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a meal, ingredient or category..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#E8E0D4] text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000] focus:border-transparent"
                autoFocus
              />
              <button type="submit" className="px-4 py-2.5 bg-[#E06000] text-white rounded-lg text-sm font-semibold hover:bg-[#C75500] transition-colors">Search</button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#E8E0D4] pt-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${location.pathname === l.to ? "bg-[#FFF3E8] text-[#E06000]" : "text-[#706860] hover:bg-[#F5F0E8] hover:text-[#1A1714]"}`}>{l.label}</Link>
              ))}
              {!currentUser && (
                <div className="flex gap-2 mt-2 pt-2 border-t border-[#E8E0D4]">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 rounded-lg border border-[#E8E0D4] text-sm font-semibold text-[#706860]">Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 rounded-lg bg-[#E06000] text-white text-sm font-semibold">Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </header>
  );
}

function MobileBottomNav() {
  const location = useLocation();
  const { favorites } = useApp();

  const items = [
    { to: "/", label: "Home", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { to: "/meals", label: "Meals", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { to: "/meal-plan", label: "Plan", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { to: "/favorites", label: "Saved", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
    { to: "/profile", label: "Profile", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E8E0D4] z-50">
      <div className="flex">
        {items.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link key={item.to} to={item.to} className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors ${isActive ? "text-[#E06000]" : "text-[#706860]"}`}>
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// ── Footer ───────────────────────────────────────────────
export function Footer() {
  const footerLinks = {
    Product: [
      { label: "Home", to: "/" },
      { label: "Meals", to: "/meals" },
      { label: "Categories", to: "/categories" },
      { label: "Meal Plan", to: "/meal-plan" },
      { label: "Favorites", to: "/favorites" },
    ],
    Account: [
      { label: "Login", to: "/login" },
      { label: "Register", to: "/register" },
      { label: "Profile", to: "/profile" },
    ],
    Information: [
      { label: "How It Works", to: "/#how-it-works" },
      { label: "About", to: "/#about" },
    ],
  };

  return (
    <footer className="bg-[#1A1714] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#E06000] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <span className="font-bold text-xl font-display">MenuDirectorate</span>
            </div>
            <p className="text-[#A89E94] text-sm mb-1 font-medium">Plan. Prepare. Cook.</p>
            <p className="text-[#706860] text-sm mb-4">Your digital guide to better meal planning and preparation.</p>
            <p className="text-[#706860] text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Ikot Ekpene, Akwa Ibom, Nigeria
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-sm mb-4 font-display">{section}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}><Link to={l.to} className="text-[#A89E94] hover:text-white text-sm transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#2A2520] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#706860] text-xs">© {new Date().getFullYear()} MenuDirectorate. ICT-Assisted Food Menu Directorate System.</p>
          <div className="flex gap-4">
            <a href="#" className="text-[#706860] hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#706860] hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Admin Layout ─────────────────────────────────────────
export function AdminLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const { currentUser, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { to: "/admin/meals", label: "Meals", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { to: "/admin/categories", label: "Meal Categories", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg> },
    { to: "/admin/ingredients", label: "Ingredients", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
    { to: "/admin/recipes", label: "Recipes", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { to: "/admin/meal-plans", label: "Meal Plans", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { to: "/admin/users", label: "Users", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    { to: "/admin/reports", label: "Reports", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
    { to: "/admin/settings", label: "Settings", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  const handleLogout = () => { logout(); navigate("/admin"); };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`${mobile ? "fixed inset-0 z-50 flex" : "hidden lg:flex"} ${mobile && sidebarOpen ? "flex" : mobile ? "hidden" : ""}`}>
      {mobile && <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />}
      <div className={`${mobile ? "w-72" : "w-64"} bg-[#1A1714] flex flex-col h-full`}>
        <div className="p-6 border-b border-[#2A2520]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E06000] rounded-lg flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
            <div>
              <div className="text-white font-bold text-sm font-display">MenuDirectorate</div>
              <div className="text-[#706860] text-xs">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? "bg-[#E06000] text-white" : "text-[#A89E94] hover:bg-[#2A2520] hover:text-white"}`}>
                {item.icon}{item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2A2520]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#E06000] rounded-full flex items-center justify-center text-white text-xs font-bold">
              {currentUser?.firstName?.[0] || "A"}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">{currentUser?.firstName || "Admin"}</div>
              <div className="text-[#706860] text-xs">Administrator</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#A89E94] hover:bg-[#2A2520] hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#FDFAF6] overflow-hidden">
      <Sidebar />
      <Sidebar mobile />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E8E0D4] px-4 sm:px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-[#F5F0E8] text-[#706860]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            {title && <h1 className="text-lg font-bold text-[#1A1714] font-display">{title}</h1>}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-[#706860] hover:text-[#1A1714] transition-colors hidden sm:block">← View Site</Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E06000] rounded-full flex items-center justify-center text-white text-xs font-bold">{currentUser?.firstName?.[0] || "A"}</div>
              <span className="text-sm font-semibold text-[#1A1714] hidden sm:block">{currentUser?.firstName} {currentUser?.lastName}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
