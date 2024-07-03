import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import './login.css'
import '../common/common.css'

export function Login() {
    return (
        <main>
            <div className='fixed-container'>
                <h2>Логин</h2>
            </div>
            <div className='fixed-container'>
                <LoginForm/>
            </div>
        </main>
    )
}

function LoginForm() {
    let navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auths/login/', {
                method: 'POST',
                credentials: `include`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({login, password})
            })
            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem("username", data.username);
                localStorage.setItem("email", data.email);
                localStorage.setItem("is_staff", data.is_staff);
                navigate("/");
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
                <div className='formContainer'>
                    <label htmlFor='login'>
                        Логин или email:
                    </label>
                    <input type='text' id='login' value={login} onChange={(e) => setLogin(e.target.value)}/>
                </div>
                <div className='formContainer'>
                    <label htmlFor='password'>
                        Пароль:
                    </label>
                    <input type='password' id='password' value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='formContainerButton'>
                    <button className='btn-new' type='submit' onClick={handleSubmit}>Войти</button>
                </div>
            </form>
        </div>
    )

}
