import './login.css'
import { useState } from 'react';

function Login() {
    const [isSignup, setIsSignup] = useState(false);

    return (
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
            
            </div>
        </div>
    );
}

export default Login;
