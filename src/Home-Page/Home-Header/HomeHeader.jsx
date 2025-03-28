import { Link } from 'react-router-dom'
import './HomeHeader.css'

function HomeHeader(){

    return(
        <nav className="home-navbar-container">
            <Link className="tittle" to="/">EduPilot</Link>
            <ul>
                <li><Link to="/">ChatBot</Link></li>
                <li><Link to="/">Help</Link></li>
                <li><Link to="/">About</Link></li>
                <li><Link to="/Login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default HomeHeader