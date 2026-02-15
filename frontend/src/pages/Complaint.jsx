import React, { useState } from 'react';
import ChatPanel from '../components/ChatPanel';
import { Upload } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useComplaints } from '../context/ComplaintContext';

const Complaint = ({ accessibilityMode }) => {
    const { t } = useLanguage();
    const { addComplaint } = useComplaints();

    const [desc, setDesc] = useState('');
    const [dept, setDept] = useState('');
    const [urgency, setUrgency] = useState('Medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!desc) return;

        addComplaint({
            title: desc,
            dept: dept || 'General',
            urgency: urgency
        });

        setDesc('');
        setDept('');
        // Optional: Show success feedback or redirect
        alert("Complaint Filed Successfully via Dashboard!");
    };

    return (
        <div className="h-[calc(100vh-5rem)] p-6 overflow-hidden">
            <div className="grid grid-cols-12 gap-6 h-full">
                {/* Left: Complaint Form */}
                <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 overflow-y-auto">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <Upload size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{t('complaintTitle')}</h2>
                            <p className="text-sm text-slate-500">{t('complaintSubtitle')}</p>
                        </div>
                    </div>

                    <form className="space-y-6 max-w-2xl" onSubmit={handleSubmit}>
                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('describeComplaint')}</label>
                            <textarea
                                rows="4"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all resize-none text-sm text-slate-700 placeholder-slate-400"
                                placeholder={t('beDetailed')}
                            ></textarea>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('location')}</label>
                            <input
                                type="text"
                                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-sm"
                                placeholder={t('enterLocation')}
                            />
                        </div>

                        {/* Department & Category Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">{t('department')}</label>
                                <select
                                    value={dept}
                                    onChange={(e) => setDept(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-sm bg-white cursor-pointer"
                                >
                                    <option value="">{t('selectDept')}</option>
                                    <option value="Public Works">Public Works</option>
                                    <option value="Water">Water</option>
                                    <option value="Electricity">Electricity</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">{t('category')}</label>
                                <select className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all text-sm bg-white cursor-pointer">
                                    <option>{t('selectCat')}</option>
                                    <option>Repair</option>
                                    <option>Service Issue</option>
                                </select>
                            </div>
                        </div>

                        {/* Urgency */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">{t('urgency')}</label>
                            <div className="grid grid-cols-3 gap-4">
                                <button type="button" onClick={() => setUrgency('Low')} className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${urgency === 'Low' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t('low')}</button>
                                <button type="button" onClick={() => setUrgency('Medium')} className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${urgency === 'Medium' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t('medium')}</button>
                                <button type="button" onClick={() => setUrgency('High')} className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${urgency === 'High' ? 'bg-red-50 border-red-200 text-red-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t('high')}</button>
                            </div>
                        </div>

                        {/* Evidence Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('attachEvidence')}</label>
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="p-3 bg-slate-100 rounded-full text-slate-400 mb-3 group-hover:bg-amber-100 group-hover:text-amber-500 transition-colors">
                                    <Upload size={20} />
                                </div>
                                <p className="text-sm font-medium text-slate-600">{t('dragDrop')}</p>
                                <p className="text-xs text-slate-400 mt-1">Supports: Images, PDFs (Max 10MB)</p>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-[#5b7aa2] hover:bg-[#4a6589] text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all text-sm uppercase tracking-wide">
                            {t('submitComplaint')}
                        </button>
                    </form>
                </div>

                {/* Right: AI Assistant */}
                <div className="col-span-12 lg:col-span-4 h-full">
                    <ChatPanel
                        context="complaint_filing"
                        initialMessage={t('complaintContext')}
                        placeholder={t('typeMessage')}
                        onComplaintFiled={addComplaint}
                    />
                </div>
            </div>
        </div>
    );
};

export default Complaint;
