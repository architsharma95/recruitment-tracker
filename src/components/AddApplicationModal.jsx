import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddApplicationModal = ({ isOpen, onClose, onAdd }) => {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [dateApplied, setDateApplied] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ company, role, dateApplied, description });
        setCompany('');
        setRole('');
        setDescription('');
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--spacing-md)',
                        right: 'var(--spacing-md)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.5rem', fontWeight: 'bold' }}>Add Application</h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <label className="label">Company</label>
                        <input
                            type="text"
                            className="input"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            placeholder="e.g. Google"
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <label className="label">Role</label>
                        <input
                            type="text"
                            className="input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            placeholder="e.g. Frontend Engineer"
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <label className="label">Date Applied</label>
                        <input
                            type="date"
                            className="input"
                            value={dateApplied}
                            onChange={(e) => setDateApplied(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <label className="label">Description</label>
                        <textarea
                            className="input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder="Job description or notes..."
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Application</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddApplicationModal;
