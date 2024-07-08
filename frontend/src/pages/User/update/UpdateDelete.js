import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../../common/Common";
import "./updatedelete.css";

export function UpdateUserAds() {
    const { ad_id } = useParams();
    let location = useLocation();
    let navigate = useNavigate();
    const [ad, setAd] = useState({});
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [preview, setPreview] = useState(null);
    const csrftoken = getCookie("csrftoken");

    const StartUserView = async () => {
        try {
            const response = await fetch(`http://localhost:8000/userads/${ad_id}/`, {
                method: "GET",
                credentials: 'include',
            });
            const data_json = await response.json();
            if (response.status === 200) {
                setAd(data_json);
                setTopic(data_json.topic);
                setName(data_json.name);
                setDescription(data_json.description);
                if (data_json.image) {
                    setPreview(data_json.image);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        StartUserView();
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault();
        let method = "PUT";
        let formData = new FormData();
        if (topic) {
            formData.append("topic", topic);
        } else {
            method = "PATCH";
        }
        if (name) {
            formData.append("name", name);
        } else {
            method = "PATCH";
        }
        if (description) {
            formData.append("description", description);
        } else {
            method = "PATCH";
        }
        if (image) {
            formData.append("image", image);
        } else {
            method = "PATCH";
        }
        try {
            const response = await fetch(`http://localhost:8000/userads/${ad_id}/`, {
                method: method,
                credentials: `include`,
                headers: {
                    'X-CSRFToken': `${csrftoken}`
                },
                body: formData
            });
            if (response.status === 200 || response.status === 204) {
                navigate("/viewuserads");
            } else {
                const data = await response.json();
                throw new Error(data.detail);
            }
        } catch (error) {
            alert(error);
            navigate(location.pathname);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <>
            <div className="popup-container-up">
                <div className="pop-up">
                    <p>Подтвердите обновление объявления</p>
                    <div className="button-delete">
                        <button className="btn btn-success" onClick={handleUpdate}>Подтвердить</button>
                        <button className="btn btn-info" onClick={() => {
                            let popupContainer = document.querySelector(".popup-container-up");
                            popupContainer.style.display = 'none';
                        }}>Отмена</button>
                    </div>
                </div>
            </div>
            <div className="fixed-container-update-main">
                <h2>Редактирование объявления</h2>
                <div className="ads-list-container">
                    {ad && (
                        <div className="ads-list" key={ad.id}>
                            <ul>
                                <li className="ads-list-topic">{ad.display_topic}</li>
                                <li><img className="ads-img" src={preview || ad.image} alt={ad.name} /></li>
                                <li>{ad.name}</li>
                                <li>{ad.description}</li>
                            </ul>
                        </div>
                    )}
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let popupContainer = document.querySelector(".popup-container-up");
                    popupContainer.style.display = 'flex';
                }}>
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
                        <input className='form-control' type='text' id='name' value={name}
                               onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>
                            Описание:
                        </label>
                        <textarea className='form-control' id='description' value={description}
                                  onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='image'>
                            Изображение:
                        </label>
                        <input className='form-control' type='file' id='image' onChange={handleImageChange} />
                    </div>
                    <div className='form-group'>
                        <div className='formContainerButton popupButton'>
                            <button className='btn-new' type='submit'>Отправить объявление</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
