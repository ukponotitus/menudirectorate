import React from "react";

// ── Button ───────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", loading, children, className = "", disabled, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-display";
  const variants = {
    primary: "bg-[#E06000] text-white hover:bg-[#C75500] focus:ring-[#E06000]",
    secondary: "bg-[#1D5C42] text-white hover:bg-[#164A35] focus:ring-[#1D5C42]",
    outline: "border-2 border-[#E06000] text-[#E06000] hover:bg-[#FFF3E8] focus:ring-[#E06000]",
    ghost: "text-[#706860] hover:bg-[#F5F0E8] hover:text-[#1A1714] focus:ring-[#E8E0D4]",
    danger: "bg-[#C0392B] text-white hover:bg-[#A93226] focus:ring-[#C0392B]",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3 text-base" };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
      {children}
    </button>
  );
}

// ── Badge ────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "orange" | "green";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[#F5F0E8] text-[#706860]",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    orange: "bg-[#FFF3E8] text-[#E06000]",
    green: "bg-[#E8F5F0] text-[#1D5C42]",
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>;
}

// ── Input ────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, hint, icon, className = "", ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-semibold text-[#1A1714] mb-1.5 font-display">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#706860]">{icon}</span>}
      <input ref={ref} className={`w-full px-4 py-2.5 ${icon ? "pl-10" : ""} rounded-lg border ${error ? "border-red-500 focus:ring-red-500" : "border-[#E8E0D4] focus:ring-[#E06000]"} bg-white text-[#1A1714] text-sm focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-[#A89E94] transition-all ${className}`} {...props} />
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    {hint && !error && <p className="mt-1 text-xs text-[#706860]">{hint}</p>}
  </div>
));
Input.displayName = "Input";

// ── Textarea ─────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className = "", ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-semibold text-[#1A1714] mb-1.5 font-display">{label}</label>}
    <textarea ref={ref} className={`w-full px-4 py-2.5 rounded-lg border ${error ? "border-red-500" : "border-[#E8E0D4]"} bg-white text-[#1A1714] text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000] focus:border-transparent placeholder:text-[#A89E94] resize-none transition-all ${className}`} {...props} />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
));
Textarea.displayName = "Textarea";

// ── Select ───────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}
export function Select({ label, error, options, className = "", ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-[#1A1714] mb-1.5 font-display">{label}</label>}
      <select className={`w-full px-4 py-2.5 rounded-lg border ${error ? "border-red-500" : "border-[#E8E0D4]"} bg-white text-[#1A1714] text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000] focus:border-transparent transition-all ${className}`} {...props}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── Skeleton ─────────────────────────────────────────────
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-[#E8E0D4] rounded-lg animate-pulse ${className}`} />;
}

export function MealCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#E8E0D4]">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-9 w-full mt-2" />
      </div>
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}
export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-[#E8E0D4]">
            <h2 className="text-lg font-bold text-[#1A1714] font-display">{title}</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#706860] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Toast ────────────────────────────────────────────────
import { useApp } from "../context";

export function ToastContainer() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white min-w-[200px] max-w-[340px] animate-in slide-in-from-right-4 pointer-events-auto ${t.type === "success" ? "bg-[#2D7A57]" : t.type === "error" ? "bg-[#C0392B]" : "bg-[#1D5C42]"}`}>
          {t.type === "success" && <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
          {t.type === "error" && <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
          {t.type === "info" && <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ── Confirm Modal ────────────────────────────────────────
interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "danger" | "primary";
}
export function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = "Confirm", variant = "danger" }: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-[#706860] text-sm mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant={variant} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}

// ── Empty State ──────────────────────────────────────────
interface EmptyStateProps { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode; }
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      {icon && <div className="text-[#E8E0D4] mb-4">{icon}</div>}
      <h3 className="text-xl font-bold text-[#1A1714] mb-2 font-display">{title}</h3>
      {description && <p className="text-[#706860] text-sm max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  );
}

// ── Tabs ─────────────────────────────────────────────────
interface TabsProps { tabs: string[]; active: string; onChange: (t: string) => void; className?: string; }
export function Tabs({ tabs, active, onChange, className = "" }: TabsProps) {
  return (
    <div className={`flex bg-[#F5F0E8] rounded-lg p-1 gap-1 ${className}`}>
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={`flex-1 px-4 py-2 rounded-md text-sm font-semibold transition-all ${active === t ? "bg-white text-[#1A1714] shadow-sm" : "text-[#706860] hover:text-[#1A1714]"}`}>
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Difficulty & Time helpers ────────────────────────────
export function DifficultyBadge({ level }: { level: string }) {
  const v = level === "Easy" ? "success" : level === "Medium" ? "warning" : "error";
  return <Badge variant={v as any}>{level}</Badge>;
}

export function TimeDisplay({ minutes, label }: { minutes: number; label?: string }) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const str = h > 0 ? `${h}h ${m > 0 ? m + "m" : ""}` : `${m} min`;
  return <span className="text-sm text-[#706860]">{label ? `${label}: ` : ""}{str}</span>;
}
