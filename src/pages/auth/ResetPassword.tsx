import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Input, Button } from "../../components/ui";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  // Supabase sends a recovery token in the URL hash; onAuthStateChange fires PASSWORD_RECOVERY
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    // Also check current session — Supabase may have already processed the token
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const validate = () => {
    const e: typeof errors = {};
    if (!password) e.password = "Please enter a new password.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    if (!confirm) e.confirm = "Please confirm your new password.";
    else if (password !== confirm) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrors({ password: error.message });
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setDone(true);
    setLoading(false);
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#1A1714] font-display mb-2">Invalid Reset Link</h2>
          <p className="text-[#706860] text-sm mb-6">This password reset link is invalid or has expired. Please request a new one.</p>
          <Link to="/forgot-password" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E06000] text-white font-semibold rounded-xl hover:bg-[#C75500] transition-colors text-sm">
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#E06000] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="font-bold text-[#1A1714] font-display">MenuDirectorate</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E0D4] p-8">
          {done ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8F5F0] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#2D7A57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#1A1714] font-display mb-2">Password Reset!</h2>
              <p className="text-[#706860] text-sm mb-6">Your password has been updated. You can now sign in with your new password.</p>
              <Button variant="primary" onClick={() => navigate("/login")} className="w-full py-3 text-base">
                Sign In Now
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1A1714] font-display mb-1">Set New Password</h1>
                <p className="text-[#706860] text-sm">Choose a strong new password for your account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                  placeholder="••••••••"
                  error={errors.password}
                  hint="At least 6 characters"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })); }}
                  placeholder="••••••••"
                  error={errors.confirm}
                />
                <Button type="submit" variant="primary" loading={loading} className="w-full py-3">
                  Reset Password
                </Button>
              </form>

              <p className="text-center text-sm text-[#706860] mt-4">
                <Link to="/login" className="text-[#E06000] font-semibold hover:underline">← Back to Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
