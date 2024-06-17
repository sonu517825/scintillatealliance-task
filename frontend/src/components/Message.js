import React from "react";
import { Card } from "antd";

const Message = ({ msg, username }) => {
    const isSentByCurrentUser = msg.sender === username;
    const senderName = isSentByCurrentUser ? 'You' : msg.sender;

    return (
        <div style={{ display: 'flex', justifyContent: isSentByCurrentUser ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
            <Card style={{
                maxWidth: '70%',
                wordWrap: 'break-word',
                backgroundColor: isSentByCurrentUser ? '#80DFC0' : '#FFE4E1',
                padding: '10px',
                borderRadius: '10px'
            }}>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{senderName}</p>
                <p style={{ margin: 0 }}>{msg.content}</p>
                <p style={{ margin: 0 }}>{new Date(msg.timestamp).toLocaleString()}</p>
            </Card>
        </div>
    );
};

export default Message;