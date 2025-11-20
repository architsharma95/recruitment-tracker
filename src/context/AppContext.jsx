import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchApplications();
        } else {
            setApplications([]);
        }
    }, [user]);

    const fetchApplications = async () => {
        const { data, error } = await supabase
            .from('applications')
            .select(`
        *,
        coffee_chats (*)
      `)
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching applications:', error);
        else {
            // Map snake_case DB columns to camelCase app state
            const mappedApps = (data || []).map(app => ({
                ...app,
                dateApplied: app.date_applied,
                coffeeChats: app.coffee_chats
            }));
            setApplications(mappedApps);
        }
    };

    const addApplication = async (app) => {
        const { data, error } = await supabase
            .from('applications')
            .insert([{
                company: app.company,
                role: app.role,
                date_applied: app.dateApplied,
                description: app.description,
                user_id: user.id,
                status: 'Applied',
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('Error adding application:', error);
            throw error;
        }

        const newApp = {
            ...data,
            dateApplied: data.date_applied,
            coffeeChats: []
        };
        setApplications([newApp, ...applications]);
        return newApp;
    };

    const updateApplication = async (id, updates) => {
        // Map camelCase updates to snake_case for DB
        const dbUpdates = {};
        if (updates.dateApplied) dbUpdates.date_applied = updates.dateApplied;
        if (updates.company) dbUpdates.company = updates.company;
        if (updates.role) dbUpdates.role = updates.role;
        if (updates.status) dbUpdates.status = updates.status;
        if (updates.description) dbUpdates.description = updates.description;

        const { error } = await supabase
            .from('applications')
            .update(dbUpdates)
            .eq('id', id);

        if (error) {
            console.error('Error updating application:', error);
            throw error;
        }

        setApplications(applications.map(app =>
            app.id === id ? { ...app, ...updates } : app
        ));
    };

    const deleteApplication = async (id) => {
        const { error } = await supabase
            .from('applications')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting application:', error);
            throw error;
        }

        setApplications(applications.filter(app => app.id !== id));
    };

    const addCoffeeChat = async (appId, chat) => {
        const { data, error } = await supabase
            .from('coffee_chats')
            .insert([{
                ...chat,
                application_id: appId,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('Error adding coffee chat:', error);
            throw error;
        }

        setApplications(applications.map(app => {
            if (app.id === appId) {
                return {
                    ...app,
                    coffeeChats: [...(app.coffeeChats || []), data]
                };
            }
            return app;
        }));
    };

    return (
        <AppContext.Provider value={{
            applications,
            addApplication,
            updateApplication,
            deleteApplication,
            addCoffeeChat
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
