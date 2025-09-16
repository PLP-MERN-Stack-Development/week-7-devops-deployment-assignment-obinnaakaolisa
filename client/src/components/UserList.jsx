import React, { useState } from 'react';
import { useSocket } from '../socket/socket';

const UserList = ({ currentUser, onUserSelect, selectedUser }) => {
  const { users, sendPrivateMessage } = useSocket();

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleUserClick = (user) => {
    onUserSelect(user);
  };

  const filteredUsers = users.filter(user => user.username !== currentUser);

  return (
    <div className="users-section">
      <div className="users-title">
        Online ({filteredUsers.length})
      </div>
      <div>
        {/* Global Chat Option */}
        <button
          className={`user-item ${!selectedUser ? 'active' : ''}`}
          onClick={() => onUserSelect(null)}
        >
          <div className="user-item-avatar">
            #
          </div>
          <div className="user-item-name">Global Chat</div>
        </button>

        {/* Individual Users */}
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
            onClick={() => handleUserClick(user)}
          >
            <div className="user-item-avatar">
              {getInitials(user.username)}
              <div className="online-indicator"></div>
            </div>
            <div className="user-item-name">{user.username}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
