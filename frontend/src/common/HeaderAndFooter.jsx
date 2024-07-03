import "./common.css"
import {Link} from "react-router-dom";
import {useState} from "react";

export function Header() {
    const [isStaff, setIsStaff] = useState(false);
    const [username, setUsername] = useState(false);

    const getHeader = async () => {
        try {
            const response = await fetch("http://localhost:8000/auths/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            const data = await response.json();
            if (response.status === 200) {
                setIsStaff(data.is_staff);
                setUsername(data.username)
            } else {
                throw new Error(data.detail)
            }

        } catch (error) {
            console.log(error);
        }
    }

    getHeader();
    return (
        <header>
            <div className="headerContainer">
                <div className="logo">
                    Доска объявлений
                </div>
                {username && <div className="links">
                    <p><Link>...</Link></p>
                    <p><Link>...</Link></p>
                </div>}
                <div className="side-buttons">
                    {isStaff && (
                        <p className="admin-button">
                            <Link to="/admin" className="admin-button-text ">
                                Админка
                            </Link>
                        </p>)}
                    {username && <p className="logout-button">
                        <Link to='/logout' className="logout-button-text">
                            Выйти
                        </Link>
                    </p>}
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
                    <div>
                        <p>by ramzittoramzotti</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}