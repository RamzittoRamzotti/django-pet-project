import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function MessagesPage() {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch('http://localhost:8000/chats/', {
                    method: 'GET',
                    credentials: 'include',

                });
                const data = await response.json();
                if (response.status === 200) {
                    setChats(data);
                } else {
                    throw new Error('Failed to fetch chats');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchChats();
    }, []);

    return (
        <div className="messages-page">
            <h2>Ваши чаты</h2>
            <div className="ads-list-container">
                {chats.length > 0 ? (
                    chats.map(chat => (
                        <div className="ads-list" key={chat.id} onClick={() => navigate(`/chats/${chat.id}`)}>
                            <ul>
                                <li className="ads-list-topic">Chat between {chat.sender_username} and {chat.getter_username}</li>
                                <li>Последнее сообщение: {chat.messages[chat.messages.length - 1]?.text}</li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <div>Нет чатов</div>
                )}
            </div>
        </div>
    );
}