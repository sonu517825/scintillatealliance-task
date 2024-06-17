import React from "react";
import { Card } from "antd";

const OnlineMessage = ({ username, currentUser }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Card style={{
                maxWidth: '20%',
                backgroundColor: username === currentUser ? '#80DFC0' : '#FFE4E1',
                borderRadius: '10px',
            }}>
                <h3 style={{ fontWeight: 'bold', margin: 0 }}>{username === currentUser ? 'You' : username} is Online</h3>
                <h5 style={{ margin: 0 }}>{new Date().toLocaleString()}</h5>
            </Card>
        </div>
    );
};

export default OnlineMessage;