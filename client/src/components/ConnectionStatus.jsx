import React from 'react';
import { Wifi, WifiOff, Loader } from 'lucide-react';

const ConnectionStatus = ({ isConnected, isConnecting }) => {
    if (isConnected) {
        return (
            <div className="connection-status connected">
                <Wifi size={16} style={{ marginRight: '0.5rem' }} />
                Connected
            </div>
        );
    }

    if (isConnecting) {
        return (
            <div className="connection-status connecting">
                <Loader size={16} style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                Connecting...
            </div>
        );
    }

    return (
        <div className="connection-status disconnected">
            <WifiOff size={16} style={{ marginRight: '0.5rem' }} />
            Disconnected
        </div>
    );
};

export default ConnectionStatus;