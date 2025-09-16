import React, { useState } from 'react';
import { Smile } from 'lucide-react';

const MessageReactions = ({ messageId, reactions = {}, onReact, currentUser }) => {
    const [showPicker, setShowPicker] = useState(false);

    const availableReactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

    const handleReaction = (emoji) => {
        onReact(messageId, emoji);
        setShowPicker(false);
    };

    const reactionCounts = Object.entries(reactions).map(([emoji, users]) => ({
        emoji,
        count: users.length,
        hasReacted: users.includes(currentUser)
    }));

    return (
        <div className="message-reactions">
            {reactionCounts.length > 0 && (
                <div className="reactions-display">
                    {reactionCounts.map(({ emoji, count, hasReacted }) => (
                        <button
                            key={emoji}
                            className={`reaction-button ${hasReacted ? 'reacted' : ''}`}
                            onClick={() => handleReaction(emoji)}
                        >
                            {emoji} {count}
                        </button>
                    ))}
                </div>
            )}

            <div className="reaction-picker-container">
                <button
                    className="add-reaction-button"
                    onClick={() => setShowPicker(!showPicker)}
                >
                    <Smile size={16} />
                </button>

                {showPicker && (
                    <div className="reaction-picker">
                        {availableReactions.map(emoji => (
                            <button
                                key={emoji}
                                className="reaction-option"
                                onClick={() => handleReaction(emoji)}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageReactions;