import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { notificationManager } from '../utils/notifications';
import { config } from '../config/environment';

const SOCKET_URL = config.serverUrl;

const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  const onConnect = useCallback(() => {
    setIsConnected(true);
  }, []);

  const onDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  const onReceiveMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);

    // Show notification for new messages (not from current user)
    if (message.senderId !== socket.id) {
      notificationManager.notifyNewMessage(message.sender, message.message, false);
    }
  }, []);

  const onPrivateMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);

    // Show notification for private messages (not from current user)
    if (message.senderId !== socket.id) {
      notificationManager.notifyNewMessage(message.sender, message.message, true);
    }
  }, []);

  const onUserList = useCallback((userList) => {
    setUsers(userList);
  }, []);

  const onUserJoined = useCallback((user) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        system: true,
        message: `${user.username} joined the chat`,
        timestamp: new Date().toISOString(),
      },
    ]);
    notificationManager.notifyUserJoined(user.username);
  }, []);

  const onUserLeft = useCallback((user) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        system: true,
        message: `${user.username} left the chat`,
        timestamp: new Date().toISOString(),
      },
    ]);
    notificationManager.notifyUserLeft(user.username);
  }, []);

  const onTypingUsers = useCallback((users) => {
    setTypingUsers(users);
  }, []);

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
    };
  }, [onConnect, onDisconnect, onReceiveMessage, onPrivateMessage, onUserList, onUserJoined, onUserLeft, onTypingUsers]);

  const connect = (username) => {
    socket.connect();
    if (username) {
      socket.emit('user_join', username);
    }
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const sendMessage = (message) => {
    socket.emit('send_message', { message }, (acknowledgment) => {
      console.log('Message delivered:', acknowledgment);
    });
  };

  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  return {
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  };
};