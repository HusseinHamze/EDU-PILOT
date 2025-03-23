import { Link } from 'react-router-dom'
import './HomeNav.css'

function HomeNavbar(){

    return(
        <nav className="home-navbar-container">
            <Link className="tittle" to="/">EduPilot</Link>
            <ul>
                <li><Link to="/">ChatBot</Link></li>
                <li><Link to="/">Help</Link></li>
                <li><Link to="/">About</Link></li>
                <li><Link to="/Login">Login|Signup</Link></li>
            </ul>
        </nav>
    );
}

export default HomeNavbar