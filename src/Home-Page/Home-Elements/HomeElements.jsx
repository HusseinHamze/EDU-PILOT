import vectorShape from './vector.svg'
import HomeImg from './Home-img.png'
import './HomeElements.css'

function HomeElements(){

    return(
        <div className="home-elements-container">
            <div className="vectorShape-container">
                <img src={vectorShape} alt="No Image"/>
            </div>
            <div className="home-img-container">
                <img src={HomeImg} alt="No Image"/>
            </div>
    </div>
    );

}

export default HomeElements