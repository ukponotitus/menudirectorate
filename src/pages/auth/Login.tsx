import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { USERS } from "../../data";
import { useApp } from "../../context";
import { Input, Button } from "../../components/ui";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";
  const { login, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === "user");
    if (user) {
      login(user);
      showToast(`Welcome back, ${user.firstName}!`);
      navigate(from, { replace: true });
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] flex">
      {/* Left panel - image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1A1714] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1665332195309-9d75071138f0?w=800&h=900&fit=crop&auto=format" alt="Nigerian food" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1714]/90 to-[#E06000]/20" />
        <div className="relative flex flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#E06000] rounded-lg flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
            <span className="font-bold text-xl font-display">MenuDirectorate</span>
          </div>
          <blockquote className="text-2xl font-bold font-display leading-tight mb-4">"From choosing a meal to building your weekly timetable — all in one place."</blockquote>
          <p className="text-[#A89E94] text-sm">Plan. Prepare. Cook. — Ikot Ekpene, Akwa Ibom</p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-7 h-7 bg-[#E06000] rounded-lg flex items-center justify-center"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
              <span className="font-bold text-[#1A1714] font-display">MenuDirectorate</span>
            </Link>
            <h1 className="text-3xl font-bold text-[#1A1714] font-display">Welcome back</h1>
            <p className="text-[#706860] mt-1">Sign in to your account to continue.</p>
            {from !== "/" && (
              <div className="mt-3 p-3 bg-[#FFF3E8] border border-[#F5D0A9] rounded-lg text-xs text-[#E06000] font-medium">
                Sign in to access that page.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
            )}
            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-[#E8E0D4] text-[#E06000] focus:ring-[#E06000]" />
                <span className="text-sm text-[#706860]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#E06000] font-semibold hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full py-3 text-base">Login</Button>

            
          </form>

          <p className="text-center text-sm text-[#706860] mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#E06000] font-semibold hover:underline">Create an account</Link>
          </p>
{/* 
          <div className="mt-6 p-3 bg-[#F5F0E8] rounded-lg">
            <p className="text-xs text-[#706860] font-semibold mb-1">Demo Account:</p>
            <p className="text-xs text-[#706860]">Email: emem.akpan@email.com</p>
            <p className="text-xs text-[#706860]">Password: any password</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
