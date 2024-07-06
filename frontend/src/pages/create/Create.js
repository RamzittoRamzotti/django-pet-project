import "./create.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../../common/Common";

export default function CreateAds() {
    let navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [data, setData] = useState({});
    const cookie = getCookie('csrftoken');

    const handleSubmit = async (event) => {
        event.preventDefault();
        let container = document.querySelector(".popup-container");
        let form = document.querySelector(".fixed-container-main");
        container.style.display = "flex";
        form.style.display = "none";

        let formData = new FormData();
        if (topic === "") {
            alert("Выберите корректный раздел");
            return navigate('/createads');
        }
        formData.append("topic", topic);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);

        try {
            const response = await fetch('http://localhost:8000/ads/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': `${cookie}`,
                    // 'Content-Type': 'multipart/form-data', // Удалите эту строку, так как FormData сам устанавливает заголовок
                    'Accept': 'application/json',
                },
                body: formData
            });

            const result = await response.json();
            setData(result);

            if (response.status === 201) {
                console.log(result.detail);
            } else {
                console.error(result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="create-main">
            <div className="popup-container">
                {data.detail && (
                    <div className="pop">
                        {data.detail}<br/>
                        <button onClick={() => {
                            let cont = document.querySelector(".popup-container");
                            cont.style.display = "none";
                            return navigate('/');
                        }}>Хорошо!
                        </button>
                    </div>
                )}
            </div>
            <div className="fixed-container-main">
                <h2>Создание объявления</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <select required className="form-control" value={topic}
                                onChange={(e) => setTopic(e.target.value)}>
                            <option value=''>Выберите раздел</option>
                            <option value="cars">Машины</option>
                            <option value="real_estate">Недвижимость</option>
                            <option value="clothes">Одежда</option>
                            <option value="appliances">Бытовая техника</option>
                            <option value="other">Другое</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='name'>
                            Название:
                        </label>
                        <input required className='form-control' type='text' id='name' value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>
                            Описание:
                        </label>
                        <textarea required className='form-control' id='description' value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='image'>
                            Изображение:
                        </label>
                        <input required className='form-control' type='file' id='image'
                               onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <div className='form-group'>
                        <div className='formContainerButton popupButton'>
                            <button className='btn-new' type='submit'>Отправить объявление</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
