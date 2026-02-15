import React from 'react';
import { Upload, FileText, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Document = ({ accessibilityMode }) => {
    const { t } = useLanguage();
    const [uploading, setUploading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [verificationStatus, setVerificationStatus] = React.useState(null); // 'idle', 'analyzing', 'verified', 'error'
    const [analysisReport, setAnalysisReport] = React.useState(null);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setUploading(true);
        setVerificationStatus('analyzing');
        setAnalysisReport(null);

        // Simulate AI Analysis
        setTimeout(() => {
            setUploading(false);
            setVerificationStatus('verified');

            // Smart Mock: Derive details from filename
            const nameLower = selectedFile.name.toLowerCase();
            let predictedType = "Unknown Document";
            let confidence = "85.0%";

            if (nameLower.includes("aadhaar")) {
                predictedType = "Aadhaar Card";
                confidence = "99.2%";
            } else if (nameLower.includes("pan")) {
                predictedType = "PAN Card";
                confidence = "98.5%";
            } else if (nameLower.includes("voter")) {
                predictedType = "Voter ID";
                confidence = "97.8%";
            } else if (nameLower.includes("license") || nameLower.includes("dl")) {
                predictedType = "Driving License";
                confidence = "96.4%";
            } else {
                predictedType = "Government ID";
                confidence = "88.5%";
            }

            // Mock Analysis Result
            setAnalysisReport({
                docType: predictedType,
                name: "Suresh Kumar", // In a real app, this would be OCR'd
                idNumber: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
                dob: "12-05-1980",
                address: "Matches registered address",
                validity: "Valid",
                confidence: confidence
            });
        }, 2500);
    };

    return (
        <div className="h-[calc(100vh-5rem)] p-6 overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{t('docTitle')}</h2>
                    <p className="text-sm text-slate-500">{t('docSubtitle')}</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 h-full pb-20">
                {/* Left: Upload Zone */}
                <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center">
                    {!file ? (
                        <>
                            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                                <Upload size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{t('uploadDocs')}</h3>
                            <p className="text-slate-500 text-sm mb-8 max-w-xs">{t('dragDrop')}<br />Supported: PDF, JPG, PNG (Max 10MB per file)</p>

                            <label className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 cursor-pointer">
                                {t('browseFiles')}
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
                            </label>
                        </>
                    ) : (
                        <div className="w-full">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                                <div className="p-3 bg-white rounded-lg border border-slate-100 text-indigo-600">
                                    <FileText size={24} />
                                </div>
                                <div className="text-left flex-1 overflow-hidden">
                                    <h4 className="font-semibold text-slate-900 truncate">{file.name}</h4>
                                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                {verificationStatus === 'verified' && <CheckCircle size={20} className="text-green-500" />}
                            </div>

                            {verificationStatus === 'analyzing' && (
                                <div className="text-center py-8">
                                    <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-slate-600 font-medium">Analyzing Document...</p>
                                    <p className="text-slate-400 text-xs">Verifying details with government database</p>
                                </div>
                            )}

                            {verificationStatus === 'verified' && (
                                <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center mb-6">
                                    <div className="inline-flex p-2 bg-green-100 text-green-600 rounded-full mb-2">
                                        <CheckCircle size={20} />
                                    </div>
                                    <h4 className="font-bold text-green-800">Verification Successful</h4>
                                    <p className="text-xs text-green-600">Document is authentic and valid.</p>

                                    <button onClick={() => setFile(null)} className="mt-4 text-xs font-semibold text-slate-500 hover:text-slate-800 underline">Upload Another</button>
                                </div>
                            )}
                        </div>
                    )}

                    {!file && (
                        <div className="mt-12 w-full text-left">
                            <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-4">{t('supportedDocs')}</h4>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                                {['Aadhaar Card', 'Voter ID', 'Passport', 'Income Certificate', 'PAN Card', 'Driving License', 'Birth Certificate', 'Caste Certificate'].map(doc => (
                                    <div key={doc} className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle size={14} className="text-green-500" /> {doc}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Uploaded Status / Analysis */}
                <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col relative overflow-hidden">
                    {analysisReport ? (
                        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Sparkles className="text-amber-500" size={20} />
                                AI Analysis Report
                            </h3>

                            <div className="space-y-6 flex-1">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Document Type</p>
                                    <p className="text-slate-900 font-semibold">{analysisReport.docType}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Extracted Name</p>
                                        <p className="text-slate-900 font-medium">{analysisReport.name}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">ID Number</p>
                                        <p className="text-slate-900 font-mono tracking-wide">{analysisReport.idNumber}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Date of Birth</p>
                                        <p className="text-slate-900 font-medium">{analysisReport.dob}</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                        <p className="text-xs text-green-600 uppercase tracking-wider font-bold mb-1">Status</p>
                                        <p className="text-green-800 font-bold flex items-center gap-2">
                                            {analysisReport.validity} <CheckCircle size={14} />
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-xs text-amber-600 uppercase tracking-wider font-bold">AI Confidence Score</p>
                                        <span className="text-amber-700 font-bold">{analysisReport.confidence}</span>
                                    </div>
                                    <div className="w-full bg-amber-200 rounded-full h-2">
                                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: analysisReport.confidence }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center relative">
                            <div className="absolute top-0 right-0 p-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10 opacity-60">
                                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4 mx-auto border-2 border-dashed border-slate-200">
                                    <FileText size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-400 mb-1">{t('noDocs')}</h3>
                                <p className="text-slate-400 text-xs text-center">{t('uploadDocs')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Document;
