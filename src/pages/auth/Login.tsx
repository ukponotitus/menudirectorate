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
      setError("Invalid email or password. Try emem.akpan@email.com");
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E8E0D4]" /></div>
              <div className="relative flex justify-center"><span className="bg-[#FDFAF6] px-3 text-xs text-[#A89E94]">or</span></div>
            </div>

            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#E8E0D4] rounded-xl text-sm font-semibold text-[#1A1714] hover:bg-[#F5F0E8] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-sm text-[#706860] mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#E06000] font-semibold hover:underline">Create an account</Link>
          </p>

          <div className="mt-6 p-3 bg-[#F5F0E8] rounded-lg">
            <p className="text-xs text-[#706860] font-semibold mb-1">Demo Account:</p>
            <p className="text-xs text-[#706860]">Email: emem.akpan@email.com</p>
            <p className="text-xs text-[#706860]">Password: any password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
