import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const ChatPanel = ({ context = 'general', placeholder = 'Type your message...', initialMessage, onComplaintFiled }) => {
    const { t } = useLanguage();
    const [messages, setMessages] = useState([
        { role: 'assistant', content: initialMessage || t('genContext') }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Update initial message when language changes
    useEffect(() => {
        setMessages(prev => {
            const newMsg = [...prev];
            if (newMsg.length > 0 && newMsg[0].role === 'assistant') {
                newMsg[0].content = initialMessage || t('genContext');
            }
            return newMsg;
        });
    }, [initialMessage, t]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/query', {
                query: input,
                citizen_id: "CIT-001",
                language: t('langCode') || 'en' // Assuming 'langCode' is available, or use a prop
            });

            const data = response.data;
            const displayContent = data.response_display || data.response || data.suggested_action || "Processed.";

            const aiMsg = {
                role: 'assistant',
                content: displayContent,
                details: data
            };

            setMessages(prev => [...prev, aiMsg]);

            // Auto-file complaint if backend confirms it
            if (data.complaint_id && data.type === 'complaint_logged') {
                if (onComplaintFiled) {
                    onComplaintFiled({
                        id: data.complaint_id,
                        title: data.original_query || "Chat Complaint",
                        dept: data.department,
                        urgency: data.urgency
                    });
                }
            }
        } catch (error) {
            console.error("Error sending message:", error);
            // Fallback message could also be improved with translation, but keeping simple for now
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the server. (Connection Failed)" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#fcfcfc] rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm relative">
            {/* Header */}
            <div className="bg-[#1e40af] p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">{t('aiAssistant')}</h3>
                        <div className="flex items-center gap-1.5 opacity-90">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-medium uppercase tracking-wide">{t('online')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')]">
                <AnimatePresence>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'assistant' ? 'bg-white border border-slate-100 text-indigo-600' : 'bg-slate-800 text-white'}`}>
                                {msg.role === 'assistant' ? <Sparkles size={14} /> : <User size={14} />}
                            </div>

                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === 'assistant'
                                ? 'bg-[#fffbeb] border border-[#fef3c7] text-slate-800 rounded-tl-none'
                                : 'bg-white border border-slate-100 text-slate-700 rounded-tr-none'
                                }`}>
                                <p className="leading-relaxed">{msg.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs pl-12">
                        <Loader2 className="animate-spin" size={12} />
                        {t('generating')}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={placeholder || t('typeMessage')}
                        className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm outline-none placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPanel;
