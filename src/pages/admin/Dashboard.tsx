import React from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../components/layout";
import { MEALS, INGREDIENTS, CATEGORIES, USERS, REPORTS } from "../../data";
import { Badge } from "../../components/ui";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const mealViewsData = [
  { name: "Mon", views: 120 }, { name: "Tue", views: 98 }, { name: "Wed", views: 145 },
  { name: "Thu", views: 87 }, { name: "Fri", views: 160 }, { name: "Sat", views: 210 }, { name: "Sun", views: 175 },
];

const popularMealsData = MEALS.slice(0, 5).map((m, i) => ({ name: m.name.split(" ").slice(0, 2).join(" "), views: 200 - i * 25 }));

const userGrowthData = [
  { month: "Jan", users: 45 }, { month: "Feb", users: 120 }, { month: "Mar", users: 280 },
  { month: "Apr", users: 420 }, { month: "May", users: 680 }, { month: "Jun", users: 940 },
  { month: "Jul", users: 1240 },
];

const categoryData = CATEGORIES.slice(0, 5).map((c, i) => ({ name: c.name, value: c.mealCount, color: ["#E06000", "#1D5C42", "#F5A623", "#2D7A57", "#706860"][i] }));

export default function Dashboard() {
  const stats = [
    { label: "Total Meals", value: MEALS.length, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", change: "+3 this week", trend: "up" },
    { label: "Meal Categories", value: CATEGORIES.length, icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z", change: "+1 this month", trend: "up" },
    { label: "Total Ingredients", value: INGREDIENTS.length, icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", change: "+5 this week", trend: "up" },
    { label: "Total Users", value: "1,240", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", change: "+48 this week", trend: "up" },
    { label: "Meal Plans Created", value: "3,845", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", change: "+120 this week", trend: "up" },
    { label: "Pending Reports", value: REPORTS.filter((r) => r.status === "pending").length, icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", change: "Needs attention", trend: "down" },
  ];

  const recentMeals = MEALS.slice(0, 5);
  const recentUsers = USERS.slice(0, 5);

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#E8E0D4] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.trend === "down" ? "bg-red-100" : "bg-[#FFF3E8]"}`}>
                  <svg className={`w-4 h-4 ${s.trend === "down" ? "text-red-600" : "text-[#E06000]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                </div>
              </div>
              <div className="text-2xl font-bold text-[#1A1714] font-display">{s.value}</div>
              <div className="text-xs text-[#706860] mt-0.5">{s.label}</div>
              <div className={`text-[10px] font-semibold mt-1 ${s.trend === "down" ? "text-red-500" : "text-[#2D7A57]"}`}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meal Views */}
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-5">
            <h3 className="text-base font-bold text-[#1A1714] font-display mb-4">Meal Views This Week</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mealViewsData} barSize={24}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#706860" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#706860" }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E8E0D4", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} cursor={{ fill: "#F5F0E8" }} />
                <Bar dataKey="views" fill="#E06000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Growth */}
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-5">
            <h3 className="text-base font-bold text-[#1A1714] font-display mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={userGrowthData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#706860" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#706860" }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E8E0D4" }} />
                <Line type="monotone" dataKey="users" stroke="#1D5C42" strokeWidth={2.5} dot={{ fill: "#1D5C42", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Popular Meals */}
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-5">
            <h3 className="text-base font-bold text-[#1A1714] font-display mb-4">Most Popular Meals</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={popularMealsData} layout="vertical" barSize={16}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#706860" }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#706860" }} width={80} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E8E0D4" }} />
                <Bar dataKey="views" fill="#F5A623" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-5">
            <h3 className="text-base font-bold text-[#1A1714] font-display mb-4">Meals by Category</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E8E0D4" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-[10px] text-[#706860]">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#1A1714] font-display">Recent Reports</h3>
              <Link to="/admin/reports" className="text-xs text-[#E06000] font-semibold hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {REPORTS.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${r.status === "pending" ? "bg-amber-400" : r.status === "resolved" ? "bg-green-500" : "bg-[#A89E94]"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1714] line-clamp-1">{r.mealName}</p>
                    <p className="text-[10px] text-[#706860]">{r.reason}</p>
                  </div>
                  <Badge variant={r.status === "pending" ? "warning" : r.status === "resolved" ? "success" : "default"} className="text-[10px] shrink-0">{r.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Meals */}
          <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D4]">
              <h3 className="text-base font-bold text-[#1A1714] font-display">Recent Meals</h3>
              <Link to="/admin/meals" className="text-xs text-[#E06000] font-semibold hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-[#E8E0D4]">
              {recentMeals.map((m) => (
                <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1A1714] line-clamp-1">{m.name}</div>
                    <div className="text-xs text-[#706860]">{m.category} · {m.difficulty}</div>
                  </div>
                  <Badge variant={m.status === "published" ? "success" : "warning"}>{m.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D4]">
              <h3 className="text-base font-bold text-[#1A1714] font-display">Recent Users</h3>
              <Link to="/admin/users" className="text-xs text-[#E06000] font-semibold hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-[#E8E0D4]">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-8 h-8 rounded-full bg-[#E06000] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {u.firstName[0]}{u.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1A1714]">{u.firstName} {u.lastName}</div>
                    <div className="text-xs text-[#706860]">{u.email}</div>
                  </div>
                  <Badge variant={u.status === "active" ? "success" : "error"}>{u.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
