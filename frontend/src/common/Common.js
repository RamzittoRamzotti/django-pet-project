import {useState} from "react";
import {useNavigate} from "react-router-dom";
import React from "react";
export function RequireAuth({children}) {
    let navigate = useNavigate();
    const username = localStorage.getItem('username');

    React.useEffect(() => {
        if (!username) {
            navigate('/auth');
        }
    }, [username, navigate]);
    return <>{children}</>;
    
}
export function RequireUnAuth({children}) {
    let navigate = useNavigate();
    const username = localStorage.getItem('username');

    React.useEffect(() => {
        if (username) {
            navigate('/');
        }
    }, [username, navigate]);
    return <>{children}</>;
    
}
export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
