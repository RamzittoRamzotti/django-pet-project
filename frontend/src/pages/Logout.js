import {useNavigate} from "react-router-dom";

export function Logout() {

    let navigate = useNavigate();
    const logout = async () => {
        const response = await fetch('http://localhost:8000/auths/logout/', {
            method: 'GET',
            credentials: "include",
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log(data);
            navigate('/auth');
        } else {
            alert(data.detail);
        }
    }
    logout();
}