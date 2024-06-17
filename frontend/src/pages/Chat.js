import React, { useState, useEffect } from "react";
import { Input, Button, Card } from "antd";
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from "../config/config";
import Voting from '../components/Vote';
import Message from '../components/Message'
import OnlineMessage from '../components/OnlineMessage'

const Chat = () => {
    const location = useLocation();
    const { username, chatHistory } = location.state;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(chatHistory);
    const [votingEvent, setVotingEvent] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(BASE_URL);

        socketInstance.on('connect', () => {
            console.log('Connected to Socket.IO server');
            socketInstance.emit('connectUser', { username });
        });

        socketInstance.on('messageFromServer', (msg) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });

        socketInstance.on('isOnline', (msg) => {
            setMessages(prevMessages => [...prevMessages, { type: 'online', msg }]);
        });

        socketInstance.on('votingEvent', (event) => {
            setVotingEvent(event);
            setTimeout(() => {
                setVotingEvent(null);
            }, 60000 / 2);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.off('connect');
            socketInstance.off('messageFromServer');
            socketInstance.off('votingEvent');
            socketInstance.close();
        };
    }, [username]);

    const sendMessage = () => {
        if (message.trim() !== "" && socket) {
            const msg = {
                sender: username,
                content: message.trim(),
                timestamp: new Date().toISOString()
            };
            socket.emit('sendMessageToServer', msg);
            setMessage("");
            // setMessages(prevMessages => [...prevMessages, msg]);
        }
    };

    const handleVote = (selectedOption) => {
        if (socket) {
            const vote = {
                voter: username,
                option: selectedOption,
                timestamp: new Date().toISOString(),
                event: votingEvent
            };
            socket.emit('vote', vote);
            setVotingEvent(null);
        }
    };

    const cancelVote = () => {
        setVotingEvent(null);
    };

    return (
        <div className="chat-container">
            <Card className="chat-window">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        msg.type === 'online' ? (
                            <OnlineMessage key={index} username={msg.msg.username} currentUser={username} />
                        ) : (
                            <Message key={index} msg={msg} username={username} />
                        )
                    ))}
                </div>

                <div className="chat-input">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onPressEnter={sendMessage}
                        placeholder="Type a message..."
                    />
                    <Button onClick={sendMessage} type="primary">Send</Button>
                </div>
            </Card>

            {votingEvent && (
                <Voting
                    votingEvent={votingEvent}
                    onVote={handleVote}
                    onCancel={cancelVote}
                />
            )}
        </div>
    );
};

export default Chat;






