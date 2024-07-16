import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from '../../common/Common';
export function ChatPage() {
    const { chat_id } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    let csrftoken = getCookie('csrftoken');
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:8000/chats/messages/${chat_id}/`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.status === 200) {
                    setMessages(data);
                } else {
                    throw new Error('Failed to fetch messages');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchMessages();
    }, [chat_id]);

    const handleSendMessage = async () => {
        try {
            const response = await fetch(`http://localhost:8000/chats/messages/${chat_id}/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': `${csrftoken}`
                },
                body: JSON.stringify({ text: newMessage }),
            });
            const data = await response.json();
            if (response.status === 201) {
                setMessages([...messages, data]);
                setNewMessage('');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chat-page">
            <h2>Переписка по чату #{chat_id}</h2>
            <div className="messages-container">
                {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.sender === 'current_user' ? 'Вы' : ''}`}>
                        <p>{msg.sender_username}: {msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение"
                ></textarea>
                <button onClick={handleSendMessage}>Отправить</button>
            </div>
        </div>
    );
}