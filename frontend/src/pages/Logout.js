import {useNavigate} from "react-router-dom";

export function Logout() {

    let navigate = useNavigate();
    const logout = async () => {
        const response = await fetch('http://localhost:8000/auth/logout/', {
            method: 'GET',
            credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        localStorage.clear();
        navigate('/auth');
        
    }
    logout();
}