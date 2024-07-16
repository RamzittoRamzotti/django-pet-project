import "./common.css"
import "../pages/login.css"
import {getCookie} from "./Common"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
export function Home() {
    let navigate = useNavigate();
    let csrftoken = getCookie('csrftoken');
    const [ads, setAds] = useState([]);
    const [adsId, setAdsId] = useState(null);
    useEffect(() => {
        const request = async () => {
            try {
                const response = await fetch('http://localhost:8000/startads/?limit=5&offset=0', {
                    method: "GET",
                    credentials: `include`,
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json()
                if (response.status === 200) {
                    setAds(data.results);
                }
            } catch (error) {
                console.log(error)
            }
        }
        request();
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        // adaptiveHeight: true
    };
    const checkChat = async (getter_id,ad_id) => {
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
                // body: JSON.stringify({"sender": `${user_id}`, "getter":`${getter_id}`})

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
        <main>
            <h1>Новые объявления</h1>
            <div className="fixed-container-main">
                <Slider {...settings}>
                    {ads.length > 0 ? (
                        ads.map(ad => (
                            <div className="ad-slide" key={ad.id}>
                                <ul>
                                    <li className="ads-topic">{ad.display_topic}</li>
                                    <li><img className="slider-img" src={ad.image}
                                             alt={ad.name}/></li>
                                    <li>{ad.name}</li>
                                    <li>{ad.description}</li>
                                    <li>Объявитель: {ad.user_name}</li>
                                    <li><p className="btn btn-success" style={{color: "white", paddingInline: 10+"px"}} 
                                    onClick={()=>{
                                        checkChat(ad.user,ad.id);
                                    }}
                                    >Связь </p> </li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </Slider>
            </div>
        </main>
    );
};
