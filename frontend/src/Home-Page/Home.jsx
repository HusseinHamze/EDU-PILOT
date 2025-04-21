import NavBar from "../Multi-Use/NavBar"
import HomeBody from "./HomeBody"
import Footer from "../Multi-Use/Footer"

function Home(){
    return(
        <div className="home-container"> {/* Added a wrapper div for controlling section heights */}
            <NavBar />
            <div className="home-sections"> {/* Wrapper for the sections */}
                {/* Each child of this div will be a full viewport height */}
                <div className="home-section">
                  <HomeBody />
                </div>
            </div>
            <div className="footer-section">
              <Footer />
            </div>
        </div>
    )
}

export default Home