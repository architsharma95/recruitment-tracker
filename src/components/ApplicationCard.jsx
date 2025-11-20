import React from 'react';
import { Building2, Calendar, Coffee } from 'lucide-react';

const ApplicationCard = ({ app, onClick }) => {
    const statusColors = {
        'Applied': 'var(--text-muted)',
        'Screening': 'var(--warning)',
        'Interview': 'var(--primary)',
        'Offer': 'var(--success)',
        'Rejected': 'var(--error)'
    };

    return (
        <div
            className="card"
            onClick={() => onClick(app)}
            style={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                ':hover': { transform: 'translateY(-2px)' }
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-sm)' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{app.company}</h3>
                <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: statusColors[app.status] || 'var(--text-muted)',
                    border: `1px solid ${statusColors[app.status] || 'var(--text-muted)'}`
                }}>
                    {app.status}
                </span>
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                {app.role}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    <span>{app.dateApplied}</span>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                }}>
                    <Coffee size={16} />
                    <span>{app.coffeeChats?.length || 0} Coffee Chats</span>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;
