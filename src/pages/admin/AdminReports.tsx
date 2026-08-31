import React, { useState } from "react";
import { AdminLayout } from "../../components/layout";
import { REPORTS } from "../../data";
import type { Report } from "../../types";
import { Badge, Button, Modal, ConfirmModal } from "../../components/ui";
import { useApp } from "../../context";

export default function AdminReports() {
  const { showToast } = useApp();
  const [reports, setReports] = useState<Report[]>(REPORTS);
  const [viewReport, setViewReport] = useState<Report | null>(null);

  const updateStatus = (id: string, status: Report["status"]) => {
    setReports((p) => p.map((r) => r.id === id ? { ...r, status } : r));
    showToast(`Report ${status}.`);
    setViewReport(null);
  };

  const stats = [
    { label: "Total Reports", value: reports.length, color: "text-[#1A1714]" },
    { label: "Pending", value: reports.filter((r) => r.status === "pending").length, color: "text-amber-600" },
    { label: "Resolved", value: reports.filter((r) => r.status === "resolved").length, color: "text-[#2D7A57]" },
    { label: "Dismissed", value: reports.filter((r) => r.status === "dismissed").length, color: "text-[#706860]" },
  ];

  return (
    <AdminLayout title="Reports">
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#E8E0D4] p-4 text-center">
              <div className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</div>
              <div className="text-xs text-[#706860]">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D4] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F0E8] border-b border-[#E8E0D4]">
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Meal</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Reason</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden md:table-cell">Reported By</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#706860] uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D4]">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#FDFAF6]">
                    <td className="px-4 py-3 font-semibold text-[#1A1714]">{report.mealName}</td>
                    <td className="px-4 py-3 text-[#706860] max-w-xs">
                      <span className="line-clamp-1">{report.reason}</span>
                    </td>
                    <td className="px-4 py-3 text-[#706860] hidden md:table-cell">{report.reportedBy}</td>
                    <td className="px-4 py-3 text-[#706860] text-xs hidden lg:table-cell">{new Date(report.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Badge variant={report.status === "pending" ? "warning" : report.status === "resolved" ? "success" : "default"}>{report.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setViewReport(report)} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#706860] hover:text-[#1A1714] transition-colors" title="Review">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        {report.status === "pending" && (
                          <>
                            <button onClick={() => updateStatus(report.id, "resolved")} className="p-1.5 rounded-lg hover:bg-green-50 text-[#A89E94] hover:text-[#2D7A57] transition-colors" title="Resolve">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </button>
                            <button onClick={() => updateStatus(report.id, "dismissed")} className="p-1.5 rounded-lg hover:bg-[#F5F0E8] text-[#A89E94] hover:text-[#706860] transition-colors" title="Dismiss">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal open={!!viewReport} onClose={() => setViewReport(null)} title="Report Details" size="md">
        {viewReport && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Meal", viewReport.mealName], ["Reason", viewReport.reason], ["Reported By", viewReport.reportedBy], ["Date", new Date(viewReport.date).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })]].map(([l, v]) => (
                <div key={l as string}>
                  <div className="text-xs text-[#706860] font-semibold mb-0.5">{l}</div>
                  <div className="text-[#1A1714] font-medium">{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs text-[#706860] font-semibold mb-1">Description</div>
              <p className="text-sm text-[#1A1714] bg-[#F5F0E8] rounded-lg p-3">{viewReport.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#706860] font-semibold">Status:</span>
              <Badge variant={viewReport.status === "pending" ? "warning" : viewReport.status === "resolved" ? "success" : "default"}>{viewReport.status}</Badge>
            </div>
            {viewReport.status === "pending" && (
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" onClick={() => setViewReport(null)} className="flex-1">Cancel</Button>
                <Button variant="danger" onClick={() => updateStatus(viewReport.id, "dismissed")} className="flex-1">Dismiss</Button>
                <Button variant="secondary" onClick={() => updateStatus(viewReport.id, "resolved")} className="flex-1">Resolve</Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
