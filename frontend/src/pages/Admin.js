import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

export function Admin() {
    let navigate = useNavigate();

    useEffect(() => {
        window.location.href = "http://localhost:8000/admin/";
    }, [navigate]);

    return null;
}