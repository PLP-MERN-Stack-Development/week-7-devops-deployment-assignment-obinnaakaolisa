import React, { useState } from 'react';
import { useSocket } from './socket/socket';
import Login from './components/Login';
import Chat from './components/Chat';
import UserList from './components/UserList';
import ConnectionStatus from './components/ConnectionStatus';
import SettingsPanel from './components/SettingsPanel';
import { LogOut, Settings } from 'lucide-react';

function App() {
  const { connect, disconnect, isConnected } = useSocket();
  const [username, setUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    connect(name);
  };

  const handleLogout = () => {
    disconnect();
    setUsername('');
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!isConnected) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="user-info">
              <div className="user-avatar">
                {getInitials(username)}
              </div>
              <div className="user-name">{username}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="logout-button"
                onClick={() => setShowSettings(true)}
                title="Settings"
              >
                <Settings size={20} />
              </button>
              <button className="logout-button" onClick={handleLogout} title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          </div>
          <UserList
            currentUser={username}
            onUserSelect={handleUserSelect}
            selectedUser={selectedUser}
          />
        </div>
        <Chat
          currentUser={username}
          selectedUser={selectedUser}
        />
      </div>

      <ConnectionStatus isConnected={isConnected} />
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}

export default App;
