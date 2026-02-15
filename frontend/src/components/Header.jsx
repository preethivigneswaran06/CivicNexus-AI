import React from 'react';
import { Bell, User, Languages, Eye, Volume2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header = ({ accessibilityMode, setAccessibilityMode }) => {
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/': return t('dashboard');
            case '/complaint': return t('fileComplaint');
            case '/policy': return t('policyAssistant');
            case '/document': return t('docVerification');
            case '/analytics': return t('analytics');
            case '/admin': return t('admin');
            default: return t('dashboard');
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'hi' : 'en');
    };

    const speakTitle = () => {
        const text = `You are on the ${getPageTitle()} page`;
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-40 shadow-sm/50">
            {/* Left: Breadcrumbs / Welcome */}
            <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-amber-500 rounded-full"></div>
                <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{t('welcome')}</p>
                    <h2 className="text-xl font-bold text-slate-900 leading-none">{t('citizen')}</h2>
                </div>
                <div className="h-6 w-px bg-slate-300 mx-2"></div>
                <span className="text-slate-400 font-medium">/ {getPageTitle()}</span>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-4">
                {/* Language Toggle */}
                <button
                    onClick={() => {
                        const langs = ['en', 'hi', 'ta', 'mr'];
                        const nextIdx = (langs.indexOf(language) + 1) % langs.length;
                        setLanguage(langs[nextIdx]);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all font-mono"
                    title="Switch Language: EN -> HI -> TA -> MR"
                >
                    <Languages size={18} />
                    <span className="text-sm font-bold uppercase">{language.toUpperCase()}</span>
                </button>

                {/* Speak Button (Accessibility) */}
                <button
                    onClick={speakTitle}
                    className="p-2 rounded-full border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                    title="Read Aloud"
                >
                </button>

                {/* Accessibility Toggle */}
                <button
                    onClick={() => setAccessibilityMode(!accessibilityMode)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all border ${accessibilityMode ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                >
                    <Eye size={18} />
                </button>


                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                        <User size={20} />
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{t('citizen')}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Standard User</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
