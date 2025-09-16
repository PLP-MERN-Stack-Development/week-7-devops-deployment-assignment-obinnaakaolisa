// Notification utilities for the chat app

export class NotificationManager {
    constructor() {
        this.permission = 'default';
        this.soundEnabled = true;
        this.init();
    }

    async init() {
        // Request notification permission
        if ('Notification' in window) {
            this.permission = await Notification.requestPermission();
        }
    }

    showNotification(title, options = {}) {
        if (this.permission === 'granted' && document.hidden) {
            const notification = new Notification(title, {
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                ...options
            });

            // Auto close after 5 seconds
            setTimeout(() => {
                notification.close();
            }, 5000);

            return notification;
        }
    }

    playSound() {
        if (this.soundEnabled) {
            // Create a simple notification sound using Web Audio API
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            } catch (error) {
                console.log('Could not play notification sound:', error);
            }
        }
    }

    notifyNewMessage(sender, message, isPrivate = false) {
        const title = isPrivate ? `${sender} (Private)` : `${sender}`;
        const body = message.length > 50 ? message.substring(0, 50) + '...' : message;

        this.showNotification(title, {
            body,
            tag: 'new-message'
        });

        this.playSound();
    }

    notifyUserJoined(username) {
        this.showNotification('User Joined', {
            body: `${username} joined the chat`,
            tag: 'user-activity'
        });
    }

    notifyUserLeft(username) {
        this.showNotification('User Left', {
            body: `${username} left the chat`,
            tag: 'user-activity'
        });
    }

    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
    }
}

export const notificationManager = new NotificationManager();