import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, BookOpen, ShieldCheck, BarChart3, Shield, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
    const { t } = useLanguage();

    const navItems = [
        { name: t('dashboard'), path: '/', icon: LayoutDashboard },
        { name: t('fileComplaint'), path: '/complaint', icon: FileText },
        { name: t('policyAssistant'), path: '/policy', icon: BookOpen },
        { name: t('docVerification'), path: '/document', icon: ShieldCheck },
        { name: t('analytics'), path: '/analytics', icon: BarChart3 },
    ];

    return (
        <div className="h-screen w-64 bg-[#1e293b] text-white flex flex-col fixed left-0 top-0 z-50 shadow-xl font-sans">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                    <Shield size={24} className="text-white" fill="currentColor" />
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-tight tracking-tight">CivicNexus AI</h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Governance Platform</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-1.5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 font-medium'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <item.icon size={20} className={({ isActive }) => isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                        <span className="text-sm tracking-wide">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Admin Link at Bottom */}
            <div className="p-4 px-4 border-t border-slate-700/50">
                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <Settings size={20} />
                    <span className="text-sm tracking-wide">{t('admin')}</span>
                </NavLink>

                <p className="mt-4 text-[10px] text-slate-500 text-center leading-relaxed">
                    Empowering Citizens<br />
                    © 2024 CivicNexus
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
