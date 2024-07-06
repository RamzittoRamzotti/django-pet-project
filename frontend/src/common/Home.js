import "./common.css"
import "../pages/login.css"
import {getCookie} from "./Common"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';
import {useEffect, useState} from "react";

export function Home() {
    const csrftoken = getCookie('csrftoken');
    const [ads, setAds] = useState([]);
    useEffect(() => {
        const request = async () => {
            try {
                const response = await fetch('http://localhost:8000/ads/?limit=5&offset=0', {
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
                                    <li>Объявитель: {ad.user}</li>
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
