import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ApplicationCard from '../components/ApplicationCard';
import AddApplicationModal from '../components/AddApplicationModal';
import { Plus } from 'lucide-react';

const Dashboard = () => {
    const { applications, addApplication } = useApp();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = (app) => {
        navigate(`/applications/${app.id}`);
    };

    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My Applications</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn btn-primary"
                    style={{ display: 'flex', gap: 'var(--spacing-sm)' }}
                >
                    <Plus size={20} />
                    <span>Add Application</span>
                </button>
            </div>

            {applications.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--spacing-xl)',
                    color: 'var(--text-muted)',
                    backgroundColor: 'var(--surface)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px dashed var(--border)'
                }}>
                    <p>No applications yet. Start by adding one!</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 'var(--spacing-lg)'
                }}>
                    {applications.map(app => (
                        <ApplicationCard
                            key={app.id}
                            app={app}
                            onClick={handleCardClick}
                        />
                    ))}
                </div>
            )}

            <AddApplicationModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={addApplication}
            />
        </Layout>
    );
};

export default Dashboard;
