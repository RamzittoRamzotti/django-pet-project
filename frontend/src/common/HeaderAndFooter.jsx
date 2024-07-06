import "./common.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";

export function Header() {
    const [isStaff, setIsStaff] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const id = localStorage.getItem("id");

    const getHeader = async () => {
        try {
            const response = await fetch(`http://localhost:8000/auth/${id}/`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                setIsStaff(data.is_staff);
                setUsername(data.username);
            } else if (response.status !== 403) {
                throw new Error(data.detail);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getHeader();
        }
    }, [location, id]); // обновление при изменении URL или ID пользователя

    return (
        <header>
            <div className="headerContainer">
                <div className="logo" onClick={() => navigate("/")}>
                    Доска объявлений
                </div>
                {username && <div className="links">
                    <p id="find-link">Найти объявления</p>
                    <p onClick={() => {
                        navigate('/createads')
                    }}>Создать объявление</p>
                </div>}
                <div className="side-buttons">

                    {isStaff && (
                        <p onClick={() => navigate('/admin')} className="admin-button">
                            Админка
                        </p>
                    )}
                    {username ? (
                        <>
                            <p onClick={() => navigate('/view')} className="view-button">
                                Ваши объявления
                            </p>
                            <p onClick={() => navigate('/logout')} className="logout-button">
                                Выйти
                            </p>
                        </>
                    ) : (
                        location.pathname !== "/register" ? (
                            <p className="signup-button" onClick={() => navigate("/register")}>
                                Зарегистрироваться
                            </p>
                        ) : (
                            <p className="back-button" onClick={() => navigate('/auth')}>
                                <span className="back-button-text">
                                    Назад
                                </span>
                            </p>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}

export function Footer() {
    return (
        <footer>
            <div className="fixed-container">
                <div className="footer-links">
                    <div className="github-link">
                        <Link to="https://github.com/RamzittoRamzotti/django-pet-project"
                              _target="blank"
                              rel="noreferrer"
                              className="github-link-text">django-pet-project</Link>
                    </div>
                    <div className="footer-data">
                        <p>by ramzittoramzotti</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}