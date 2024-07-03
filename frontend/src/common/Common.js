import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function RequireAuth({children}) {
    let navigate = useNavigate();
    const user = localStorage.getItem("username");
    if (user) {
        return children;
    } else {
        alert("Вам нужно аутентифицироваться!");
        navigate('/auth');
    }
}