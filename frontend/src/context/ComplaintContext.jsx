import React, { createContext, useContext, useState } from 'react';

const ComplaintContext = createContext();

export const useComplaints = () => useContext(ComplaintContext);

export const ComplaintProvider = ({ children }) => {
    const [complaints, setComplaints] = useState([
        { id: 'CMP-9921', title: 'Major pipeline burst in Sector 6', dept: 'Water Debt', status: 'In Progress', date: 'Feb 12, 2024', urgency: 'High' },
        { id: 'CMP-9922', title: 'Transformer spark reported', dept: 'Electricity', status: 'Pending', date: 'Feb 10, 2024', urgency: 'High' },
        { id: 'CMP-9923', title: 'Traffic light malfunction', dept: 'Traffic Police', status: 'Resolved', date: 'Feb 8, 2024', urgency: 'Medium' }
    ]);

    const addComplaint = (newComplaint) => {
        const complaint = {
            id: newComplaint.id || `CMP-${Math.floor(10000 + Math.random() * 90000)}`,
            title: newComplaint.title,
            dept: newComplaint.dept || 'General',
            status: 'Pending',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            urgency: newComplaint.urgency || 'Medium'
        };
        setComplaints(prev => [complaint, ...prev]);
    };

    const stats = {
        total: complaints.length + 21, // Demo base
        resolved: complaints.filter(c => c.status === 'Resolved').length + 18,
        pending: complaints.filter(c => c.status === 'Pending').length + 3,
        inProgress: complaints.filter(c => c.status === 'In Progress').length
    };

    return (
        <ComplaintContext.Provider value={{ complaints, addComplaint, stats }}>
            {children}
        </ComplaintContext.Provider>
    );
};
