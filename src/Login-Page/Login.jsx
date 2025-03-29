import './login.css'
import { useState } from 'react';
import mainImg from './login-img.png'
import vector1 from './vector1.svg'
import vector2 from './vector2.svg'
import vector3 from './vector3.svg'
import vector4 from './vector4.svg'
import vector5 from './vector5.svg'

function Login() {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className='login-card-container'>
            <div className="login-card">
                <div className="Info-side-container">
                    <div className="login-info">
                        <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
                        <p>{isSignup ? 'Create your account' : 'Enter your account details'}</p>
                        {isSignup && <input type="text" placeholder="Username" />}
                        <input type="email" placeholder="Email" /> 
                        <input type="password" placeholder="Password" />
                        {isSignup && <input type="date" placeholder="Date of Birth" />} 
                        {!isSignup && <a href="#">Forgot Password?</a>}
                        <button>{isSignup ? 'Sign Up' : 'Login'}</button>
                    </div>
                    <div className="signup">
                        <p>{isSignup ? 'Already have an account?' : "Don't have an account?"}</p>
                        <button onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </div>
                <div className="element-side-container">
                    <div className='main-element'>
                        <h1>Welcome To Edu-Pilot</h1>
                        <p>Login To Access Your Account</p>
                        <img src={mainImg} alt="No photo" />
                    </div>
                    <img className='vector1' src={vector1} alt="No Photo" />
                    <img className='vector2' src={vector2} alt="No Photo" />
                    <img className='vector3' src={vector3} alt="No Photo" />
                    <img className='vector4' src={vector4} alt="No Photo" />
                    <img className='vector5' src={vector5} alt="No Photo" />
                </div>
            </div>
        </div>
    );
}

export default Login;