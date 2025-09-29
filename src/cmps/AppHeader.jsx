import { Link, NavLink } from "react-router";
import logo from '../assets/img/logo.png'

export function AppHeader() {
    return (
        <header className="app-header container">
            <div className="logo">
                <Link to="/" >
                    <img src={logo} alt="Miss Toys Logo" width={40} />
                </Link>
                <h1>Miss Toys</h1>
            </div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </header>
    )
}