import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, FileText, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const data = [
    { name: 'Jan', Filed: 40, Resolved: 24 },
    { name: 'Feb', Filed: 30, Resolved: 13 },
    { name: 'Mar', Filed: 50, Resolved: 45 },
    { name: 'Apr', Filed: 55, Resolved: 39 },
    { name: 'May', Filed: 65, Resolved: 48 },
    { name: 'Jun', Filed: 60, Resolved: 52 },
];

const deptData = [
    { name: 'Public Works', value: 45, color: '#1e40af' },
    { name: 'Water Dept', value: 32, color: '#166534' },
    { name: 'Electricity', value: 28, color: '#d97706' },
    { name: 'Sanitation', value: 24, color: '#78350f' },
    { name: 'Transport', value: 18, color: '#991b1b' },
];

const StatCard = ({ label, value, trend, icon: Icon }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <Icon size={20} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{trend}</span>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
    </div>
);

const Analytics = () => {
    const { t } = useLanguage();

    return (
        <div className="p-8 space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{t('analyticsTitle')}</h2>
                    <p className="text-sm text-slate-500">{t('analyticsSubtitle')}</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label={t('totalComplaints')} value="162" trend="+12%" icon={FileText} />
                <StatCard label={t('resRate')} value="84%" trend="+5%" icon={CheckCircle} />
                <StatCard label={t('avgTime')} value="3.2 days" trend="-15%" icon={Users} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Department Performance */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">{t('byDept')}</h3>
                    <div className="space-y-6">
                        {deptData.map((d) => (
                            <div key={d.name}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="font-semibold text-slate-700">{d.name}</span>
                                    <span className="font-bold text-slate-900">{d.value} complaints</span>
                                </div>
                                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: `${(d.value / 60) * 100}%`, backgroundColor: d.color }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                    <span>{Math.floor(d.value * 0.8)} resolved</span>
                                    <span>{Math.floor((d.value / 60) * 100)}% rate</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Trend */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">{t('monthlyTrend')}</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar dataKey="Filed" fill="#1e40af" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="Resolved" fill="#166534" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
