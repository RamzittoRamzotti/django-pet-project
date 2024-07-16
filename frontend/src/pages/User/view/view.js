import React, {useEffect, useState} from "react";
import "./view.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../common/Common";
export default function ViewAds() {
    const [text, setText] = useState('');
    const [data, setData] = useState({results: [], previous: null, next: null});
    const [topic, setTopic] = useState('');
    const [limit, setLimit] = useState('');
    const [adsId, setAdsId] = useState(0);

    let navigate = useNavigate();
    let csrftoken = getCookie('csrftoken');
    useEffect(() => {
        const StartView = async () => {
            const response = await fetch("http://localhost:8000/ads/?limit=5", {
                method: "GET",
                credentials: 'include'
            });
            const res = await response.json();
            if (response.status === 200) {
                setData(res);
            }
        }
        StartView();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = "http://localhost:8000/ads/";
        if (limit) {
            url += `?limit=${limit}`;
        } else {
            url += `?limit=5`;
        }
        if (text) {
            url += `&search=${text}`;
        }
        if (topic) {
            url += `&topic=${topic}`;
        }
        const response = await fetch(url, {
            method: "GET",
            credentials: 'include'
        });
        const res = await response.json();
        if (response.status === 200) {
            setData(res);
        }
        setTopic('');
    }

    const fetchLists = async (url) => {
        const response = await fetch(url, {
            method: "GET",
            credentials: 'include'
        });
        const data = await response.json();
        if (response.status === 200) {
            return data;
        }
    }
    const checkChat = async (getter_id, ad_id) => {
        const user_id = localStorage.getItem("id")
        const response = await fetch(`http://localhost:8000/chats/${user_id}/${getter_id}/${ad_id}/`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        if (response.status === 200){
            navigate(`/chats/${data['id']}`)
        }else if (data.detail === 'No such chat') {
            csrftoken = getCookie('csrftoken');
            const resp = await fetch(`http://localhost:8000/chats/${user_id}/${getter_id}/${ad_id}/`, {
                method: "POST",
                credentials: 'include',
                headers:{
                    'Accept': 'application/json',
                    'X-CSRFToken': `${csrftoken}`
                },

            })
            const resp_data=await resp.json();
            if (resp.status === 201){
                navigate(`/chats/${resp_data['id']}`);
            }else{
                alert(resp_data.detail);
            }
        }

    }
    return (
        <div className="fixed-container-main-view">
            <div className="search-container">
                <h2>Поиск объявлений</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Поиск"
                            />
                            <button type="submit" className="btn btn-default">Найти</button>
                        </div>
                        <div className="radio-group">
                            <label htmlFor="cars" className="radio-inline">
                                <input
                                    type="radio"
                                    id="cars"
                                    name="topic"
                                    value="cars"
                                    checked={topic === 'cars'}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                <span className="radio-label">Машины</span>
                            </label>
                            <label htmlFor="real_estate" className="radio-inline">
                                <input
                                    type="radio"
                                    id="real_estate"
                                    name="topic"
                                    value="real_estate"
                                    checked={topic === 'real_estate'}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                <span className="radio-label">Недвижимость</span>
                            </label>
                            <label htmlFor="appliances" className="radio-inline">
                                <input
                                    type="radio"
                                    id="appliances"
                                    name="topic"
                                    value="appliances"
                                    checked={topic === 'appliances'}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                <span className="radio-label">Бытовая техника</span>
                            </label>
                            <label htmlFor="clothing" className="radio-inline">
                                <input
                                    type="radio"
                                    id="clothing"
                                    name="topic"
                                    value="clothing"
                                    checked={topic === 'clothing'}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                <span className="radio-label">Одежда</span>
                            </label>
                            <label htmlFor="other" className="radio-inline">
                                <input
                                    type="radio"
                                    id="other"
                                    name="topic"
                                    value="other"
                                    checked={topic === 'other'}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                <span className="radio-label">Другое</span>
                            </label>
                            {/*<div className='form-group'>*/}

                            <select className="select2-container" style={{marginLeft: 10 + "px"}} value={limit}
                                    onChange={(e) => setLimit(e.target.value)}>
                                <option value="5">Количество обяъвлений на странице</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                            {/*</div>*/}
                        </div>

                    </div>
                </form>
                <div className="ads-list-container">
                    {data.results.length > 0 ? (
                        data.results.map(ad => (
                            <div className="ads-list" key={ad.id}>
                                <ul>
                                    <li className="ads-list-topic">{ad.display_topic}</li>
                                    <li><img className="ads-img" src={ad.image} alt={ad.name}/></li>
                                    <li>{ad.name}</li>
                                    <li>{ad.description}</li>
                                    <li>Объявитель: {ad.user_name}</li>
                                    <li><p className="btn btn-success" onClick={()=>{
                                        // setAdsId(ad.id);
                                        checkChat(ad.user, ad.id);
                                    
                                    }}>Связь </p> </li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div style={{height: 100 + '%'}}>Нет объявлений</div>
                    )}
                </div>
                <div className="buttons-container">
                    <button
                        id="prevbutton"
                        type="button"
                        onClick={async () => {
                            const prevData = await fetchLists(data.previous);
                            setData(prevData);
                        }}
                        hidden={data.previous === null}
                    >
                        Предыдущие
                    </button>
                    <button
                        id="nextbutton"
                        type="button"
                        onClick={async () => {
                            const nextData = await fetchLists(data.next);
                            setData(nextData);
                        }}
                        hidden={data.next === null}
                    >
                        Следующие
                    </button>
                </div>
            </div>
        </div>
    );
}
