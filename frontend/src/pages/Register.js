import { useLocation, useNavigate,} from "react-router-dom";
import { useState } from "react";
import { getCookie } from "../common/Common";
import "./login.css"
export function Register() {
    return (
        <main className='main-section'>
            <div className='fixed-conatiner fixed-container-login'>
                <h2>Регистрация</h2>
            </div>
            <div className='fixed-container loginForm'>
                <RegisterForm/>
            </div>
        </main>
    )
}

export function RegisterForm (){
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const csrftoken = getCookie('csrftoken');
    let location = useLocation();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auth/register/', {
                method: 'POST',
                credentials: `include`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRFToken': `${csrftoken}`
                },
                body: JSON.stringify({username,email, password})
            })
            const data = await response.json();
            if (response.status === 201) {
                alert(data.detail);
                navigate("/auth");
            } else {
                throw new Error(data.detail)
            }
        } catch (error) {
            alert(error);
            navigate(location.pathname)
        }

    }
    return (
        <div className='loginForm'>
            <form>
                <div className=' form-group'>
                    <label htmlFor='username'>
                        Имя пользователя:
                    </label>
                    <input className='form-control' type='text' id='username' value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>
                        Электронная почта:
                    </label>
                    <input className='form-control' type='email' id='email' value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
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
                        <button className='btn-new' type='submit' onClick={handleSubmit}>Зарегистрироваться</button>
                    </div>
                </div>
            </form>
        </div>
    )
}