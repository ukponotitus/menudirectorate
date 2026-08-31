import React, { useState } from "react";
import { AdminLayout } from "../../components/layout";
import { Button, Input, Tabs } from "../../components/ui";
import { useApp } from "../../context";

export default function AdminSettings() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState("General");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    showToast("Settings saved successfully.");
    setSaving(false);
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        <Tabs tabs={["General", "System", "Account", "Notifications", "Security"]} active={activeTab} onChange={setActiveTab} className="mb-2" />

        {activeTab === "General" && (
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-6 space-y-4">
            <h2 className="text-base font-bold text-[#1A1714] font-display">General Settings</h2>
            <Input label="System Name" defaultValue="MenuDirectorate" />
            <Input label="Tagline" defaultValue="Plan. Prepare. Cook." />
            <Input label="Location" defaultValue="Ikot Ekpene, Akwa Ibom, Nigeria" />
            <Input label="Contact Email" type="email" defaultValue="contact@menudirectorate.ng" />
            <div>
              <label className="block text-sm font-semibold text-[#1A1714] mb-1.5 font-display">System Description</label>
              <textarea defaultValue="ICT-Assisted Food Menu Directorate System for Ikot Ekpene, Akwa Ibom, Nigeria." className="w-full px-4 py-2.5 rounded-lg border border-[#E8E0D4] text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000] resize-none" rows={3} />
            </div>
            <Button variant="primary" loading={saving} onClick={handleSave}>Save Settings</Button>
          </div>
        )}

        {activeTab === "System" && (
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-6 space-y-4">
            <h2 className="text-base font-bold text-[#1A1714] font-display">System Settings</h2>
            <div className="space-y-3">
              {[
                { label: "Allow User Registration", desc: "Allow new users to create accounts.", enabled: true },
                { label: "Email Verification Required", desc: "Require users to verify their email before access.", enabled: false },
                { label: "Guest Access", desc: "Allow non-logged-in users to browse meals.", enabled: true },
                { label: "Maintenance Mode", desc: "Put the system in maintenance mode.", enabled: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 rounded-lg border border-[#E8E0D4]">
                  <div>
                    <div className="text-sm font-semibold text-[#1A1714]">{s.label}</div>
                    <div className="text-xs text-[#706860]">{s.desc}</div>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${s.enabled ? "bg-[#E06000]" : "bg-[#E8E0D4]"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.enabled ? "right-1" : "left-1"}`} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" loading={saving} onClick={handleSave}>Save Settings</Button>
          </div>
        )}

        {activeTab === "Account" && (
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-6 space-y-4">
            <h2 className="text-base font-bold text-[#1A1714] font-display">Admin Account</h2>
            <Input label="First Name" defaultValue="System" />
            <Input label="Last Name" defaultValue="Administrator" />
            <Input label="Email" type="email" defaultValue="admin@menudirectorate.ng" />
            <hr className="border-[#E8E0D4]" />
            <h3 className="text-sm font-bold text-[#1A1714] font-display">Change Password</h3>
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
            <Button variant="primary" loading={saving} onClick={handleSave}>Update Account</Button>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-6 space-y-4">
            <h2 className="text-base font-bold text-[#1A1714] font-display">Notification Preferences</h2>
            <div className="space-y-3">
              {[
                { label: "New User Registration", desc: "Get notified when a new user registers.", enabled: true },
                { label: "New Meal Report", desc: "Get notified when a meal is reported.", enabled: true },
                { label: "Low Recipe Coverage", desc: "Alert when meals have no recipes.", enabled: false },
                { label: "Weekly Summary", desc: "Receive a weekly activity summary.", enabled: true },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between p-3 rounded-lg border border-[#E8E0D4]">
                  <div>
                    <div className="text-sm font-semibold text-[#1A1714]">{n.label}</div>
                    <div className="text-xs text-[#706860]">{n.desc}</div>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative cursor-pointer ${n.enabled ? "bg-[#E06000]" : "bg-[#E8E0D4]"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full ${n.enabled ? "right-1" : "left-1"}`} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" loading={saving} onClick={handleSave}>Save Preferences</Button>
          </div>
        )}

        {activeTab === "Security" && (
          <div className="bg-white rounded-xl border border-[#E8E0D4] p-6 space-y-4">
            <h2 className="text-base font-bold text-[#1A1714] font-display">Security Settings</h2>
            <div className="space-y-3">
              {[
                { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account.", enabled: false },
                { label: "Session Timeout", desc: "Automatically log out after 30 minutes of inactivity.", enabled: true },
                { label: "Login Notifications", desc: "Get notified of new admin login attempts.", enabled: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 rounded-lg border border-[#E8E0D4]">
                  <div>
                    <div className="text-sm font-semibold text-[#1A1714]">{s.label}</div>
                    <div className="text-xs text-[#706860]">{s.desc}</div>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative cursor-pointer ${s.enabled ? "bg-[#E06000]" : "bg-[#E8E0D4]"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full ${s.enabled ? "right-1" : "left-1"}`} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="primary" loading={saving} onClick={handleSave}>Save Settings</Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
