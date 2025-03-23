import './login.css'

function Login(){
    return(
        <div className="login-card">
            <div className="Info-side-container">
                <div className="login-info">
                    <h1>Login</h1>
                    <p>Enter Your account details</p>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password"/>
                    <a href="#">Forgot Password?</a>
                    <button>Login</button>
                </div>
                <div className="signup">
                    <p>Don't have an account?</p>
                    <button>Sign Up</button>
                </div>
            </div>
            <div className="element-side-container">

            </div>
        </div>
    );
}

export default Login