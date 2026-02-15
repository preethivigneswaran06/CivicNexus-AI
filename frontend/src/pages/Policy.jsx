import React from 'react';
import ChatPanel from '../components/ChatPanel';
import { Search, ChevronDown, BookOpen, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import policiesData from '../data/policies.json';

const PolicyAccordion = ({ title, details, isOpen = false }) => {
    const [open, setOpen] = React.useState(isOpen);

    return (
        <div className={`border rounded-xl transition-all duration-200 ${open ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
            <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
                <h3 className={`font-semibold text-sm ${open ? 'text-amber-800' : 'text-slate-700'}`}>{title}</h3>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${open ? 'rotate-180 text-amber-600' : ''}`} />
            </div>
            {open && details && (
                <div className="px-4 pb-4 pt-0">
                    <div className="space-y-3 text-sm text-slate-600">
                        {/* Description */}
                        <p className="italic text-slate-500">{details.description}</p>

                        {/* Benefits */}
                        {details.benefits && (
                            <div>
                                <span className="font-bold text-xs uppercase text-amber-600">Benefits</span>
                                <p className="mt-1">{Array.isArray(details.benefits) ? details.benefits.join(', ') : details.benefits}</p>
                            </div>
                        )}

                        {/* Eligibility */}
                        {details.eligibility && (
                            <div>
                                <span className="font-bold text-xs uppercase text-amber-600">Eligibility</span>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                    {details.eligibility.map((e, i) => <li key={i}>{e}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Process */}
                        {details.process && (
                            <div>
                                <span className="font-bold text-xs uppercase text-amber-600">Application Process</span>
                                <ol className="list-decimal pl-4 mt-1 space-y-1">
                                    {details.process.map((e, i) => <li key={i}>{e}</li>)}
                                </ol>
                            </div>
                        )}

                        {/* Documents */}
                        {details.documents && (
                            <div>
                                <span className="font-bold text-xs uppercase text-amber-600">Required Documents</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {details.documents.map((doc, i) => (
                                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">{doc}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const Policy = ({ accessibilityMode }) => {
    const { t } = useLanguage();

    // Group policies by category
    const groupedPolicies = policiesData.reduce((acc, policy) => {
        const cat = policy.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(policy);
        return acc;
    }, {});

    return (
        <div className="h-[calc(100vh-5rem)] p-6 overflow-hidden">
            <div className="grid grid-cols-12 gap-6 h-full">
                {/* Left: Content */}
                <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col h-full min-h-0">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{t('policyTitle')}</h2>
                            <p className="text-sm text-slate-500">{t('policySubtitle')}</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                        />
                    </div>

                    {/* Categories */}
                    <div className="space-y-6 overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-slate-200">
                        {Object.entries(groupedPolicies).map(([category, policies]) => (
                            <div key={category}>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t(category) || category}</h4>
                                <div className="space-y-3">
                                    {policies.map(policy => (
                                        <PolicyAccordion key={policy.id} title={policy.title} details={policy.details ? { ...policy.details, description: policy.description } : { description: policy.description }} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Link Footer */}
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3">
                            <Sparkles size={14} className="text-amber-500" /> {t('usefulPortals')}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer block">
                                <p className="font-semibold text-sm text-slate-900">India.gov.in</p>
                                <p className="text-xs text-slate-500">National Portal</p>
                            </a>
                            <a href="https://digilocker.gov.in/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer block">
                                <p className="font-semibold text-sm text-slate-900">DigiLocker</p>
                                <p className="text-xs text-slate-500">Document Storage</p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right: AI Assistant */}
                <div className="col-span-12 lg:col-span-4 h-full">
                    <ChatPanel
                        context="policy"
                        initialMessage={t('policyContext')}
                        placeholder={t('typeMessage')}
                    />
                </div>
            </div>
        </div>
    );
};

export default Policy;
