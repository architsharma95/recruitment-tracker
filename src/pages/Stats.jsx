import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { BarChart3, TrendingUp, CheckCircle2, XCircle, ArrowUpDown } from 'lucide-react';

const Stats = () => {
    const { applications } = useApp();
    const [sortConfig, setSortConfig] = useState({ key: 'dateApplied', direction: 'desc' });

    // Calculate Metrics
    const metrics = useMemo(() => {
        const total = applications.length;
        const interviewing = applications.filter(a => a.status === 'Interview').length;
        const offers = applications.filter(a => a.status === 'Offer').length;
        const rejected = applications.filter(a => a.status === 'Rejected').length;
        const rejectionRate = total > 0 ? Math.round((rejected / total) * 100) : 0;

        return { total, interviewing, offers, rejectionRate };
    }, [applications]);

    // Sort Applications
    const sortedApplications = useMemo(() => {
        let sortableItems = [...applications];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [applications, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Offer': return 'var(--success)';
            case 'Rejected': return 'var(--error)';
            case 'Interview': return 'var(--primary)';
            case 'Screening': return 'var(--warning)';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <Layout>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-xl)' }}>Application Stats</h1>

            {/* Metrics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <div style={{ padding: 'var(--spacing-md)', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Applications</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.total}</div>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <div style={{ padding: 'var(--spacing-md)', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(234, 179, 8, 0.1)', color: 'var(--warning)' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Interviewing</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.interviewing}</div>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <div style={{ padding: 'var(--spacing-md)', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Offers</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.offers}</div>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <div style={{ padding: 'var(--spacing-md)', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>
                        <XCircle size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Rejection Rate</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.rejectionRate}%</div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: 'var(--spacing-md)', cursor: 'pointer' }} onClick={() => requestSort('company')}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    Company <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', cursor: 'pointer' }} onClick={() => requestSort('role')}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    Role <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', cursor: 'pointer' }} onClick={() => requestSort('status')}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    Status <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', cursor: 'pointer' }} onClick={() => requestSort('dateApplied')}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    Date Applied <ArrowUpDown size={14} />
                                </div>
                            </th>
                            <th style={{ padding: 'var(--spacing-md)' }}>Coffee Chats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedApplications.map((app) => (
                            <tr key={app.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: 'var(--spacing-md)', fontWeight: '500' }}>{app.company}</td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-muted)' }}>{app.role}</td>
                                <td style={{ padding: 'var(--spacing-md)' }}>
                                    <span style={{
                                        color: getStatusColor(app.status),
                                        border: `1px solid ${getStatusColor(app.status)}`,
                                        padding: '2px 8px',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem'
                                    }}>
                                        {app.status}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', color: 'var(--text-muted)' }}>{app.dateApplied}</td>
                                <td style={{ padding: 'var(--spacing-md)' }}>{app.coffeeChats?.length || 0}</td>
                            </tr>
                        ))}
                        {sortedApplications.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Stats;
