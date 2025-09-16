import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../socket/socket';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Chat = ({ currentUser, selectedUser }) => {
  const { messages, sendMessage, sendPrivateMessage, setTyping, typingUsers } = useSocket();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setTyping(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, setTyping]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (!isTyping && e.target.value.trim()) {
      setIsTyping(true);
      setTyping(true);
    } else if (!e.target.value.trim() && isTyping) {
      setIsTyping(false);
      setTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      if (selectedUser) {
        sendPrivateMessage(selectedUser.id, message.trim());
      } else {
        sendMessage(message.trim());
      }
      setMessage('');
      setIsTyping(false);
      setTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return 'now';
    }
  };

  // Filter messages based on selected user
  const filteredMessages = selectedUser
    ? messages.filter(msg =>
      msg.isPrivate &&
      ((msg.senderId === selectedUser.id) || (msg.sender === currentUser && msg.senderId !== selectedUser.id))
    )
    : messages.filter(msg => !msg.isPrivate);

  const chatTitle = selectedUser ? selectedUser.username : 'Global Chat';
  const chatSubtitle = selectedUser
    ? 'Private conversation'
    : `${typingUsers.length > 0 ? `${typingUsers.join(', ')} typing...` : 'Everyone can see this'}`;

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-avatar">
          {selectedUser ? getInitials(selectedUser.username) : '#'}
        </div>
        <div>
          <div className="chat-title">{chatTitle}</div>
          <div className="chat-subtitle">{chatSubtitle}</div>
        </div>
      </div>

      <div className="messages-container">
        {filteredMessages.map((msg) => {
          if (msg.system) {
            return (
              <div key={msg.id} className="system-message">
                {msg.message}
              </div>
            );
          }

          const isOwnMessage = msg.sender === currentUser;

          return (
            <div key={msg.id} className={`message ${isOwnMessage ? 'own' : ''} ${msg.isPrivate ? 'private-message' : ''}`}>
              {!isOwnMessage && (
                <div className="message-avatar">
                  {getInitials(msg.sender)}
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {msg.message}
                </div>
                <div className="message-time">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          );
        })}

        {!selectedUser && typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-container">
        <form className="message-input-form" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className="message-input"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${selectedUser ? selectedUser.username : 'everyone'}...`}
            rows={1}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!message.trim()}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
