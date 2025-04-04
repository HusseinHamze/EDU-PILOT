import './HeroSection.css'
import HeroImg from './hero-img.png'

function HeroSection(){
    
    return(
        <div className="hero-container">
            <div className='left-side'>
                
                <h1>Not Sure What To Study? Let EduPilot Guide You!</h1>

                <p>Answer a few questions and get personalized 
                    university major recommendations based on 
                    interests and skills.</p>

                <ul>
                    <li><b>AI-Powered Recommendations</b> - Smart career matching based on your inputs</li>
                    <li><b>Easy & Fast</b> - Takes only a few minutes to complete</li>
                    <li><b>Personalized Insights</b> - Tailored to your skills & interests</li>
                    <li><b>Free to Use</b> - No cost for students</li>
                </ul>    

                <button>Start Your Assessment</button>

            </div>
            <div className='right-side'>
                <img src={HeroImg} alt="No Image" />
            </div>

        </div>
    );

}

export default HeroSection