import React, { useState } from 'react';
import { X, Settings, Bell, Volume2 } from 'lucide-react';
import { notificationManager } from '../utils/notifications';

const SettingsPanel = ({ isOpen, onClose }) => {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleSoundToggle = () => {
        const newValue = !soundEnabled;
        setSoundEnabled(newValue);
        notificationManager.setSoundEnabled(newValue);
    };

    const handleNotificationsToggle = async () => {
        const newValue = !notificationsEnabled;
        setNotificationsEnabled(newValue);

        if (newValue && 'Notification' in window) {
            await Notification.requestPermission();
        }
    };

    return (
        <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
            <div className="settings-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Settings size={20} />
                    <h3>Settings</h3>
                </div>
                <button onClick={onClose} className="logout-button">
                    <X size={20} />
                </button>
            </div>

            <div className="settings-option">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Volume2 size={18} />
                    <span>Sound Notifications</span>
                </div>
                <div
                    className={`settings-toggle ${soundEnabled ? 'active' : ''}`}
                    onClick={handleSoundToggle}
                />
            </div>

            <div className="settings-option">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bell size={18} />
                    <span>Browser Notifications</span>
                </div>
                <div
                    className={`settings-toggle ${notificationsEnabled ? 'active' : ''}`}
                    onClick={handleNotificationsToggle}
                />
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--background-light)', borderRadius: 'var(--border-radius-small)' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>About</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    Real-time chat application built with Socket.io, React, and Express.
                    Features include private messaging, typing indicators, and real-time notifications.
                </p>
            </div>
        </div>
    );
};

export default SettingsPanel;