import React from 'react';
import { Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AdminCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={24} />
        </div>
    </div>
);

import { useComplaints } from '../context/ComplaintContext';

const Admin = () => {
    const { t } = useLanguage();
    const { complaints, stats } = useComplaints();
    const [selectedComplaint, setSelectedComplaint] = React.useState(null);

    const handleDownload = () => {
        const rows = [
            ["ID", "Issue", "Department", "Status"],
            ["CMP-9921", "Major pipeline burst in Sector 6", "Water Debt", "Critical"],
            ["CMP-9922", "Transformer spark reported", "Electricity", "High"],
            ["CMP-9923", "Traffic light malfunction", "Traffic Police", "High"]
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "civic_reports.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{t('adminTitle')}</h1>
                    <p className="text-slate-500">{t('adminSubtitle')}</p>
                </div>
                <button
                    onClick={handleDownload}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95"
                >
                    {t('downloadReports')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminCard title={t('totalCitizens')} value="12,450" color="bg-blue-100 text-blue-600" icon={Users} />
                <AdminCard title={t('openComplaints')} value={stats.total} color="bg-amber-100 text-amber-600" icon={AlertTriangle} />
                <AdminCard title={t('resolvedMonth')} value={stats.resolved} color="bg-green-100 text-green-600" icon={CheckCircle} />
                <AdminCard title={t('pendingVerif')} value="15" color="bg-indigo-100 text-indigo-600" icon={FileText} />
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">{t('recentIssues')}</h3>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold">{t('id')}</th>
                            <th className="p-4 font-semibold">{t('issue')}</th>
                            <th className="p-4 font-semibold">{t('department')}</th>
                            <th className="p-4 font-semibold">{t('status')}</th>
                            <th className="p-4 font-semibold">{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {complaints.map((c, i) => (
                            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-mono text-slate-600">{c.id}</td>
                                <td className="p-4 font-medium text-slate-900">{c.title}</td>
                                <td className="p-4 text-slate-600">{c.dept}</td>
                                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${c.urgency === 'High' || c.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{c.urgency}</span></td>
                                <td className="p-4">
                                    <button
                                        onClick={() => setSelectedComplaint(c)}
                                        className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline"
                                    >
                                        {t('view')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Resolution Progress Modal */}
            {selectedComplaint && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl scale-100 opacity-100 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Complaint #{selectedComplaint.id}</h3>
                                <p className="text-slate-500 text-sm">{selectedComplaint.title}</p>
                            </div>
                            <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-slate-600">
                                ✕
                            </button>
                        </div>

                        {/* Progress Stepper */}
                        <div className="space-y-6">
                            <div className="relative">
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>

                                {/* Step 1: Filed */}
                                <div className="relative flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white z-10 ring-4 ring-white">
                                        <CheckCircle size={16} />
                                    </div>
                                    <div className="pb-8">
                                        <h4 className="font-bold text-slate-900">Complaint Filed</h4>
                                        <p className="text-xs text-slate-500">Received via AI Assistant</p>
                                    </div>
                                </div>

                                {/* Step 2: Processing */}
                                <div className="relative flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white z-10 ring-4 ring-white animate-pulse">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    <div className="pb-8">
                                        <h4 className="font-bold text-slate-900">In Progress</h4>
                                        <p className="text-xs text-slate-500">Assigned to {selectedComplaint.dept} Department</p>
                                        <div className="mt-2 bg-amber-50 text-amber-700 text-xs p-2 rounded border border-amber-100">
                                            AI Analysis: Issue validated. Field team notified.
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Resolved */}
                                <div className="relative flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 z-10 ring-4 ring-white">
                                        <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-400">Resolution</h4>
                                        <p className="text-xs text-slate-400">Pending Field Report</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedComplaint(null)}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
