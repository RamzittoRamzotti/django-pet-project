export function Header(){
    return (
        <header>
            <div className="fixed-container">
                <div>

                </div>
                <RequireAuth>
                    <div className="links">

                    </div>
                </RequireAuth>

            </div>
        </header>
    );
}

export function Footer() {
    return (
        <footer>
            <div className="fixed-container">
                <div>

                </div>
                <div>

                </div>

            </div>
        </footer>
    );
}