import React from 'react';
import { Clock, MapPin, AlertCircle } from 'lucide-react';

const ComplaintCard = ({ id, title, status, date, urgency }) => {
    const urgencyStyles = {
        High: 'text-red-600 bg-red-50 border-red-100 ring-1 ring-red-200',
        Medium: 'text-amber-600 bg-amber-50 border-amber-100 ring-1 ring-amber-200',
        Low: 'text-green-600 bg-green-50 border-green-100 ring-1 ring-green-200',
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all cursor-pointer group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover:bg-indigo-500 transition-colors"></div>

            <div className="pl-3">
                <div className="flex justify-between items-start mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${urgencyStyles[urgency] || urgencyStyles.Medium}`}>
                        {urgency} Priority
                    </span>
                    <span className="text-xs text-slate-400 font-mono tracking-tight">{id}</span>
                </div>

                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors line-clamp-1">{title}</h3>

                <div className="flex items-center gap-4 text-slate-500 text-xs mb-4">
                    <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400" />
                        <span>Sector 4</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${status === 'Resolved' ? 'bg-green-500' : 'bg-indigo-500 animate-pulse'}`}></span>
                        <span className="text-xs font-medium text-slate-600">
                            {status}
                        </span>
                    </div>
                    <AlertCircle size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default ComplaintCard;
