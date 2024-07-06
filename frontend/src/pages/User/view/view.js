import {useState} from "react";
import "./view.css"

export default function ViewAds() {
    const [text, setText] = useState('');
    const handleSubmit = () => {
    }
    return (
        <div className="fixed-container-main">
            <div className="form-group">
                <input type="text" className="form-control" value={text} placeholder="Text input"/>
                <button type="submit" className="btn btn-default" onSubmit={handleSubmit}>Найти</button>
            </div>
        </div>
    )
}