import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, PlusCircle, LogOut, BarChart2 } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: BarChart2, label: 'Stats', path: '/stats' },
        // Add more items here later
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '250px',
                backgroundColor: 'var(--surface)',
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                padding: 'var(--spacing-lg)'
            }}>
                <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md)' }}></div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)' }}>RecruitTrack</h1>
                </div>

                <nav style={{ flex: 1 }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--radius-md)',
                                color: location.pathname === item.path ? 'var(--text-main)' : 'var(--text-muted)',
                                backgroundColor: location.pathname === item.path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                marginBottom: 'var(--spacing-xs)',
                                transition: 'all 0.2s'
                            }}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-md)' }}>
                    <div style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-main)', fontWeight: '500' }}>
                        {user?.username}
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)',
                            color: 'var(--text-muted)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            padding: 'var(--spacing-xs) 0'
                        }}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: 'var(--spacing-xl)', overflowY: 'auto' }}>
                <div className="container" style={{ maxWidth: '100%', padding: 0 }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
