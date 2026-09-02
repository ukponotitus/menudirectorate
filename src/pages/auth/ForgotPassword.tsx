import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Input, Button } from "../../components/ui";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address."); return; }

    setLoading(true);

    // Use the current origin so the link works on both dev and production
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#E06000] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <span className="font-bold text-[#1A1714] font-display">MenuDirectorate</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E0D4] p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8F5F0] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#2D7A57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#1A1714] font-display mb-2">Check your email</h2>
              <p className="text-[#706860] text-sm mb-6">
                We sent a password reset link to <strong className="text-[#1A1714]">{email}</strong>. Click the link in the email to set a new password.
              </p>
              <p className="text-xs text-[#A89E94] mb-6">Didn't receive it? Check your spam folder or try again.</p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="text-sm text-[#706860] hover:text-[#1A1714] transition-colors"
              >
                Use a different email
              </button>
              <span className="text-[#E8E0D4] mx-2">·</span>
              <Link to="/login" className="text-[#E06000] font-semibold text-sm hover:underline">Back to Login</Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1A1714] font-display mb-2">Forgot Password?</h1>
                <p className="text-[#706860] text-sm">Enter your registered email and we will send you a link to reset your password.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
                )}
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@email.com"
                />
                <Button type="submit" variant="primary" loading={loading} className="w-full py-3">
                  Send Reset Link
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
