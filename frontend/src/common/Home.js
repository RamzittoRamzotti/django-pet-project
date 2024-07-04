import "./common.css"
import "../pages/login.css"

export function Home() {
    const response = fetch('http://localhost:8000/ads/')
    return (
        <main>
            <div className="fixed-container-main">
                <h1>Hello world!</h1>
            </div>
        </main>
    );
}
