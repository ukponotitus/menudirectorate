import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USERS } from "../../data";
import { useApp } from "../../context";
import { Input, Button } from "../../components/ui";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your credentials."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const admin = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === "admin");
    if (admin) {
      login(admin);
      showToast("Welcome, Administrator!");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials. Use admin@menudirectorate.ng");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1714] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-10 bg-[#E06000] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <span className="font-bold text-white text-xl font-display">MenuDirectorate</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Administrator Login</h1>
          <p className="text-[#706860] text-sm mt-1">Secure access for authorized administrators only.</p>
        </div>

        <div className="bg-[#242118] border border-[#2A2520] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-sm text-red-400">{error}</div>}

            <div>
              <label className="block text-sm font-semibold text-[#C4B9AE] mb-1.5 font-display">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@menudirectorate.ng" className="w-full px-4 py-2.5 rounded-lg border border-[#2A2520] bg-[#1A1714] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000] placeholder:text-[#4A4540]" required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#C4B9AE] mb-1.5 font-display">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-[#2A2520] bg-[#1A1714] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000] placeholder:text-[#4A4540]" required />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-[#E06000] text-white font-bold rounded-xl hover:bg-[#C75500] disabled:opacity-50 transition-colors text-base font-display flex items-center justify-center gap-2">
              {loading && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
              Sign In
            </button>
          </form>

          <div className="mt-6 p-3 bg-[#1A1714] rounded-lg">
            <p className="text-xs text-[#706860] font-semibold mb-1">Demo Admin Credentials:</p>
            <p className="text-xs text-[#4A4540]">Email: admin@menudirectorate.ng</p>
            <p className="text-xs text-[#4A4540]">Password: any password</p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="text-[#706860] text-sm hover:text-[#A89E94] transition-colors">← Back to Website</Link>
        </p>
      </div>
    </div>
  );
}
