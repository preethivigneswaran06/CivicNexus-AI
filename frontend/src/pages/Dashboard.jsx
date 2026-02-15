import React from 'react';
import ChatPanel from '../components/ChatPanel';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, AlertCircle, ArrowUpRight, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useComplaints } from '../context/ComplaintContext';

const StatCard = ({ label, value, trend, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all h-40 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon size={80} />
        </div>

        <div className="flex justify-between items-start z-10">
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-4xl font-bold text-slate-900">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-').replace('600', '100')} ${color}`}>
                <Icon size={20} />
            </div>
        </div>

        <div className="flex items-center gap-2 mt-4 z-10">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <ArrowUpRight size={12} /> {trend}
            </span>
            <span className="text-slate-400 text-xs">vs last month</span>
        </div>
    </div>
);

const RecentComplaintRow = ({ title, date, dept, status, t }) => {
    const statusStyles = {
        'Resolved': 'bg-green-100 text-green-700 border-green-200',
        'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
        'Pending': 'bg-amber-100 text-amber-700 border-amber-200'
    };

    const statusIcons = {
        'Resolved': <CheckCircle size={14} />,
        'In Progress': <Clock size={14} />,
        'Pending': <AlertCircle size={14} />
    };

    // Helper to translate status safely if needed, or rely on hardcoded for demo row data
    const displayStatus = status === 'Resolved' ? t('resolved') : status === 'In Progress' ? t('inProgress') : t('pending');

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${status === 'Resolved' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'} group-hover:bg-white group-hover:shadow-sm transition-all`}>
                    <FileText size={20} />
                </div>
                <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-0.5">{title}</h4>
                    <p className="text-xs text-slate-500">{dept} • {date}</p>
                </div>
            </div>
            <div className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 ${statusStyles[status]}`}>
                {statusIcons[status]}
                {displayStatus}
            </div>
        </div>
    );
};

const Dashboard = ({ accessibilityMode }) => {
    const { t } = useLanguage();
    const { complaints, stats } = useComplaints();

    return (
        <div className="p-8 space-y-8 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 text-blue-200 mb-2">
                        <MessageSquare size={16} />
                        <span className="text-sm font-semibold uppercase tracking-wider">AI-Powered Civic Platform</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 leading-tight">{t('heroTitle')}</h1>
                    <p className="text-blue-100 text-lg mb-8 opacity-90 leading-relaxed">
                        {t('heroDesc')}
                    </p>
                    <div className="flex gap-4">
                        <Link to="/complaint" className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/30 flex items-center gap-2">
                            {t('heroBtnComplaint')} <ArrowRight size={18} />
                        </Link>
                        <Link to="/policy" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/10 transition-all">
                            {t('heroBtnPolicy')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label={t('totalComplaints')} value={stats.total} trend="+12%" icon={FileText} color="text-indigo-600" />
                <StatCard label={t('resolved')} value={stats.resolved} trend="+8%" icon={CheckCircle} color="text-green-600" />
                <StatCard label={t('pending')} value={stats.pending} trend="-15%" icon={Clock} color="text-amber-600" />
                <StatCard label={t('inProgress')} value={stats.inProgress} trend="+5%" icon={ArrowUpRight} color="text-blue-600" />
            </div>

            {/* Recent Complaints */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">{t('recentComplaints')}</h3>
                    <button className="text-sm text-indigo-600 font-semibold hover:underline">{t('viewAll')}</button>
                </div>
                <div className="space-y-3">
                    {complaints.slice(0, 5).map((c, i) => (
                        <RecentComplaintRow key={i} title={c.title} dept={c.dept} date={c.date} status={c.status} t={t} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
