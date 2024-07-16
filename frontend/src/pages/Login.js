import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { getCookie } from '../common/Common';
import './login.css'
import '../common/common.css'

export function Login() {
    return (
        <main className='main-section'>
            <div className='fixed-conatiner fixed-container-login'>
                <h2>Логин</h2>
            </div>
            <div className='fixed-container loginForm'>
                <LoginForm/>
            </div>
        </main>
    )
}

function LoginForm() {
    const [user, setUser] = useState(localStorage.getItem("username"));
    let navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const csrftoken = getCookie('csrftoken');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auth/login/', {
                method: 'POST',
                credentials: `include`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRFToken': `${csrftoken}`
                },
                body: JSON.stringify({login, password})
            })
            const data = await response.json();
            if (response.status === 200) {
                setUser(data.username);
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);
                localStorage.setItem("is_staff", data.is_staff);
                localStorage.setItem("id", data.id);
                return navigate("/");
            } else {
                throw new Error(data.detail)
            }
        } catch (error) {
            alert(error);
        }

    }
    return (
        <div className='loginForm'>
            <form>
                <div className=' form-group'>
                    <label htmlFor='login'>
                        Логин или email:
                    </label>
                    <input className='form-control' type='text' id='login' value={login} onChange={(e) => setLogin(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>
                        Пароль:
                    </label>
                    <input className='form-control' type='password' id='password' value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <div className='formContainerButton'>
                        <button className='btn-new' type='submit' onClick={handleSubmit}>Войти</button>
                    </div>
                </div>
            </form>
        </div>
    )

}
