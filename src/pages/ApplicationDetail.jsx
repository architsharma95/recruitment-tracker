import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { ArrowLeft, Coffee, Calendar, Building2, User } from 'lucide-react';

const ApplicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { applications, updateApplication, deleteApplication, addCoffeeChat } = useApp();

    const app = applications.find(a => a.id === id);

    const [isChatFormOpen, setIsChatFormOpen] = useState(false);
    const [chatName, setChatName] = useState('');
    const [chatDate, setChatDate] = useState(new Date().toISOString().split('T')[0]);
    const [chatNotes, setChatNotes] = useState('');
    const [chatRating, setChatRating] = useState(5);

    if (!app) {
        return (
            <Layout>
                <div>Application not found</div>
            </Layout>
        );
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            deleteApplication(app.id);
            navigate('/');
        }
    };

    const handleStatusChange = (e) => {
        updateApplication(app.id, { status: e.target.value });
    };

    const handleAddChat = (e) => {
        e.preventDefault();
        addCoffeeChat(app.id, {
            name: chatName,
            date: chatDate,
            notes: chatNotes,
            rating: Number(chatRating)
        });
        setIsChatFormOpen(false);
        setChatName('');
        setChatNotes('');
        setChatRating(5);
    };

    return (
        <Layout>
            <button
                onClick={() => navigate('/')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    color: 'var(--text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: 'var(--spacing-lg)'
                }}
            >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Main Info */}
                <div>
                    <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-lg)' }}>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-xs)' }}>{app.company}</h1>
                                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>{app.role}</h2>
                            </div>
                            <select
                                value={app.status}
                                onChange={handleStatusChange}
                                className="input"
                                style={{ width: 'auto' }}
                            >
                                <option value="Applied">Applied</option>
                                <option value="Screening">Screening</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-lg)', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                <Calendar size={18} />
                                <span>Applied: {app.dateApplied}</span>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)' }}>Description</h3>
                            <p style={{ color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>{app.description || 'No description provided.'}</p>
                        </div>

                        <div style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border)' }}>
                            <button onClick={handleDelete} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                Delete Application
                            </button>
                        </div>
                    </div>

                    {/* Coffee Chats Section */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Coffee Chats</h3>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowChatForm(!showChatForm)}
                            >
                                {showChatForm ? 'Cancel' : 'Add Chat'}
                            </button>
                        </div>

                        {showChatForm && (
                            <form onSubmit={handleChatSubmit} style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
                                {/* Form fields remain the same */}
                                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                                    <div>
                                        <label className="label">Employee Name</label>
                                        <input
                                            required
                                            className="input"
                                            value={newChat.name}
                                            onChange={e => setNewChat({ ...newChat, name: e.target.value })}
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    {/* ... other fields ... */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                        <div>
                                            <label className="label">Date</label>
                                            <input
                                                required
                                                type="date"
                                                className="input"
                                                value={newChat.date}
                                                onChange={e => setNewChat({ ...newChat, date: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="label">Rating (1-5)</label>
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                max="5"
                                                className="input"
                                                value={newChat.rating}
                                                onChange={e => setNewChat({ ...newChat, rating: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">Notes</label>
                                        <textarea
                                            className="input"
                                            rows="3"
                                            value={newChat.notes}
                                            onChange={e => setNewChat({ ...newChat, notes: e.target.value })}
                                            placeholder="Key takeaways..."
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Chat</button>
                                </div>
                            </form>
                        )}

                        <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                            {app.coffeeChats?.length === 0 ? (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                                    No coffee chats recorded yet.
                                </p>
                            ) : (
                                app.coffeeChats?.map((chat) => (
                                    <div key={chat.id} style={{
                                        padding: 'var(--spacing-md)',
                                        backgroundColor: 'var(--background)',
                                        borderRadius: 'var(--radius-md)',
                                        borderLeft: '4px solid var(--primary)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                            <span style={{ fontWeight: '600' }}>{chat.name}</span>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{chat.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-sm)' }}>
                                            <span style={{ color: 'var(--warning)' }}>{'★'.repeat(chat.rating)}</span>
                                            <span style={{ color: 'var(--text-muted)' }}>{'★'.repeat(5 - chat.rating)}</span>
                                        </div>
                                        {chat.notes && (
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{chat.notes}</p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info (Optional) */}
                <div>
                    {/* Could add more stats or related info here */}
                </div>
            </div>
        </Layout>
    );
};

export default ApplicationDetail;
