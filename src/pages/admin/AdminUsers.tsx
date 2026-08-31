import React, { useState } from "react";
import { AdminLayout } from "../../components/layout";
import { USERS } from "../../data";
import type { User } from "../../types";
import { Badge, Button, Modal, ConfirmModal } from "../../components/ui";
import { useApp } from "../../context";

export default function AdminUsers() {
  const { showToast } = useApp();
  const [users, setUsers] = useState<User[]>(USERS);
  const [search, setSearch] = useState("");
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    setUsers((p) => p.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
    showToast(user.status === "active" ? `${user.firstName} has been suspended.` : `${user.firstName} has been activated.`, "info");
    setSuspendTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setUsers((p) => p.filter((u) => u.id !== deleteTarget.id));
    showToast(`${deleteTarget.firstName} ${deleteTarget.lastName} has been deleted.`);
    setDeleteTarget(null);
  };

  return (
    <AdminLayout title="Users">
      <div className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: users.filter((u) => u.role === "user").length, color: "text-[#1D5C42]" },
            { label: "Active Users", value: users.filter((u) => u.status === "active").length, color: "text-[#2D7A57]" },
            { label: "Suspended", value: users.filter((u) => u.status === "suspended").length, color: "text-red-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#E8E0D4] p-4 text-center">
              <div className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</div>
              <div className="text-xs text-[#706860]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89E94]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8E0D4] text-sm focus:outline-none focus:ring-2 focus:ring-[#E06000]" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F0E8] border-b border-[#E8E0D4]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden md:table-cell">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden lg:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden sm:table-cell">Joined</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D4]">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FDFAF6]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E06000] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1A1714]">{user.firstName} {user.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#706860] hidden md:table-cell">{user.email}</td>
                    <td className="px-4 py-3 text-[#706860] hidden lg:table-cell">{user.phone}</td>
                    <td className="px-4 py-3"><Badge variant={user.role === "admin" ? "orange" : "default"}>{user.role}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={user.status === "active" ? "success" : "error"}>{user.status}</Badge></td>
                    <td className="px-4 py-3 text-[#706860] text-xs hidden sm:table-cell">{new Date(user.joinedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewUser(user)} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#706860] hover:text-[#1A1714]" title="View">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        {user.role !== "admin" && (
                          <button onClick={() => setSuspendTarget(user)} className={`p-1.5 rounded-lg hover:bg-[#F5F0E8] transition-colors ${user.status === "active" ? "text-amber-500" : "text-[#2D7A57]"}`} title={user.status === "active" ? "Suspend" : "Activate"}>
                            {user.status === "active" ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                          </button>
                        )}
                        {user.role !== "admin" && (
                          <button onClick={() => setDeleteTarget(user)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#A89E94] hover:text-red-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-[#E8E0D4] text-xs text-[#706860]">Showing {filtered.length} of {users.length} users</div>
        </div>
      </div>

      {/* View User Modal */}
      <Modal open={!!viewUser} onClose={() => setViewUser(null)} title="User Details" size="sm">
        {viewUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#E06000] flex items-center justify-center text-white text-xl font-bold">{viewUser.firstName[0]}{viewUser.lastName[0]}</div>
              <div>
                <h3 className="font-bold text-[#1A1714] font-display">{viewUser.firstName} {viewUser.lastName}</h3>
                <p className="text-sm text-[#706860]">{viewUser.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[["Phone", viewUser.phone], ["Role", viewUser.role], ["Status", viewUser.status], ["Joined", new Date(viewUser.joinedAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })]].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-[#E8E0D4]">
                  <span className="text-[#706860] font-medium">{l}</span>
                  <span className="text-[#1A1714] font-semibold capitalize">{v}</span>
                </div>
              ))}
            </div>
            {viewUser.role !== "admin" && (
              <Button variant={viewUser.status === "active" ? "danger" : "secondary"} onClick={() => { handleToggleStatus(viewUser.id); setViewUser(null); }} className="w-full">
                {viewUser.status === "active" ? "Suspend Account" : "Activate Account"}
              </Button>
            )}
          </div>
        )}
      </Modal>

      <ConfirmModal open={!!suspendTarget} onClose={() => setSuspendTarget(null)} onConfirm={() => suspendTarget && handleToggleStatus(suspendTarget.id)} title={suspendTarget?.status === "active" ? "Suspend Account" : "Activate Account"} message={`${suspendTarget?.status === "active" ? "Suspend" : "Activate"} ${suspendTarget?.firstName} ${suspendTarget?.lastName}'s account?`} confirmLabel={suspendTarget?.status === "active" ? "Suspend" : "Activate"} variant="primary" />
      <ConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete User" message={`Permanently delete ${deleteTarget?.firstName} ${deleteTarget?.lastName}'s account?`} confirmLabel="Delete User" />
    </AdminLayout>
  );
}
