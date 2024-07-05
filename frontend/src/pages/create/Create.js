import "./create.css"
import {useState} from "react";

export default function CreateAds() {
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    return (
        <main>
            <div className="fixed-container-main">
                <h2>Создание объявления</h2>
                <form onSubmit={onSubmit}>
                    <div className=' form-group'>
                        <label htmlFor='login'>
                            Логин или email:
                        </label>
                        <select className="form-control" onChange={(e) => setLogin(e.target.value)}>
                            <option value="Машины">Машины</option>
                            <option value="Недвижимость">Недвижимость</option>
                            <option value="Одежда">Одежда</option>
                            <option value="Бытовая техника">Бытовая техника</option>
                            <option value="Другой">Другой</option>
                        </select>
                        <input className='form-control' type='text' id='login' value={login}
                               onChange={(e) => setLogin(e.target.value)}/>
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
        </main>
    )
}