import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context";
import { supabase } from "../../lib/supabase";
import { Input, Button } from "../../components/ui";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";
  const { showToast } = useApp();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [pendingEmail, setPendingEmail] = useState(""); // set when awaiting email confirmation

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.phone.trim()) errs.phone = "Phone number is required.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match.";
    if (!agreed) errs.agreed = "You must agree to the Terms of Service.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError || !data.user) {
      setServerError(authError?.message ?? "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    // Save profile to localStorage so context can restore it on next load
    localStorage.setItem(`md_profile_${data.user.id}`, JSON.stringify({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      role: "user",
      joinedAt: new Date().toISOString().split("T")[0],
    }));

    if (!data.session) {
      // Email confirmation required — show verification screen
      setPendingEmail(form.email);
      setLoading(false);
      return;
    }

    // Email confirmation disabled — session is live, go straight in
    showToast(`Welcome to MenuDirectorate, ${form.firstName}!`);
    navigate(from, { replace: true });
    setLoading(false);
  };

  // --- Email confirmation pending screen ---
  if (pendingEmail) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#E06000] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <span className="font-bold text-[#1A1714] text-lg font-display">MenuDirectorate</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E0D4] p-8 text-center">
            <div className="w-16 h-16 bg-[#E8F5F0] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#2D7A57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-[#1A1714] font-display mb-2">Check your email</h2>
            <p className="text-[#706860] text-sm mb-2">
              We sent a confirmation link to
            </p>
            <p className="font-semibold text-[#1A1714] mb-4">{pendingEmail}</p>
            <p className="text-[#706860] text-sm mb-6">
              Click the link in the email to verify your account, then come back and sign in.
            </p>

            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full py-3 bg-[#E06000] text-white font-semibold rounded-xl hover:bg-[#C75500] transition-colors text-sm text-center"
              >
                Go to Login
              </Link>
              <button
                onClick={() => setPendingEmail("")}
                className="block w-full py-3 border border-[#E8E0D4] text-[#706860] font-semibold rounded-xl hover:bg-[#F5F0E8] transition-colors text-sm"
              >
                Use a different email
              </button>
            </div>

            <p className="text-xs text-[#A89E94] mt-6">
              {"Didn't receive it? Check your spam folder or try again with a different email."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- Registration form ---
  return (
    <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#E06000] rounded-lg flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
            <span className="font-bold text-[#1A1714] text-lg font-display">MenuDirectorate</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#1A1714] font-display">Create an account</h1>
          <p className="text-[#706860] mt-1 text-sm">Join MenuDirectorate and start planning your meals.</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E0D4] p-6 sm:p-8">
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{serverError}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" value={form.firstName} onChange={set("firstName")} placeholder="Emem" error={errors.firstName} />
              <Input label="Last Name" value={form.lastName} onChange={set("lastName")} placeholder="Akpan" error={errors.lastName} />
            </div>
            <Input label="Email Address" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" error={errors.email} />
            <Input label="Phone Number" type="tel" value={form.phone} onChange={set("phone")} placeholder="08012345678" error={errors.phone} />
            <Input label="Password" type="password" value={form.password} onChange={set("password")} placeholder="••••••••" error={errors.password} hint="At least 6 characters" />
            <Input label="Confirm Password" type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" error={errors.confirm} />

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-[#E8E0D4] text-[#E06000] focus:ring-[#E06000]" />
                <span className="text-sm text-[#706860]">I agree to the <a href="#" className="text-[#E06000] font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-[#E06000] font-semibold hover:underline">Privacy Policy</a>.</span>
              </label>
              {errors.agreed && <p className="mt-1 text-xs text-red-600">{errors.agreed}</p>}
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full py-3 text-base">Create Account</Button>
          </form>
        </div>

        <p className="text-center text-sm text-[#706860] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#E06000] font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
