import { useState } from 'react';
import NavBar from '../Multi-Use/NavBar';
import Footer from '../Multi-Use/Footer';
function Login() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <>
    <NavBar/>
    <div className="flex items-center justify-center h-screen">
      <div className="flex bg-[#AFCBFF] w-[50%] h-[70%] rounded-lg shadow-md">
        {/* Info Side */}
        <div className="flex flex-col justify-between items-center bg-[#0E1C36] w-1/2 h-full rounded-l-lg p-10">
          <div className="w-full max-w-[300px] flex flex-col gap-4 overflow-y-auto">
            <h1 className="text-[#D7F9FF] text-2xl font-bold">{isSignup ? 'Sign Up' : 'Login'}</h1>
            <p className="text-xs text-[#D7F9FF]/70">{isSignup ? 'Create your account' : 'Enter your account details'}</p>
            {isSignup && <input type="text" placeholder="Username" className="bg-transparent border-b-2 border-[#D7F9FF]/50 outline-none text-[#D7F9FF] py-1 placeholder:text-[#D7F9FF]/50" />}
            <input type="email" placeholder="Email" className="bg-transparent border-b-2 border-[#D7F9FF]/50 outline-none text-[#D7F9FF] py-1 placeholder:text-[#D7F9FF]/50" />
            <input type="password" placeholder="Password" className="bg-transparent border-b-2 border-[#D7F9FF]/50 outline-none text-[#D7F9FF] py-1 placeholder:text-[#D7F9FF]/50" />
            {isSignup && <input type="date" placeholder="Date of Birth" className="bg-transparent border-b-2 border-[#D7F9FF]/50 outline-none text-[#D7F9FF] py-1 placeholder:text-[#D7F9FF]/50" />}
            {!isSignup && <a href="#" className="text-xs text-[#D7F9FF]/50">Forgot Password?</a>}
            <button className="bg-[#AFCBFF] text-[#0E1C36] h-12 rounded-full font-bold text-lg hover:bg-blue-300 transition">{isSignup ? 'Sign Up' : 'Login'}</button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[#D7F9FF]/50 text-sm">{isSignup ? 'Already have an account?' : "Don't have an account?"}</p>
            <button onClick={() => setIsSignup(!isSignup)} className="bg-[#AFCBFF] text-[#0E1C36] h-8 px-4 rounded-full text-xs font-bold hover:bg-blue-300 transition">
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </div>

        {/* Element Side */}
        <div className="relative flex items-center justify-center w-1/2 h-full rounded-r-lg overflow-hidden">
          <div className="z-10 flex flex-col items-center text-[#D7F9FF] text-center">
            <h1 className="text-2xl font-bold">Welcome To Edu-Pilot</h1>
            <p className="opacity-70 text-sm">Login To Access Your Account</p>
            <img src="login-img.png" alt="Main" className="w-[300px] h-[300px] mt-8" />
          </div>
          <img src="/Vector1.svg" alt="Vector 1" className="absolute w-[350px] h-[350px] bottom-0 right-0" />
          <img src="/Vector2.svg" alt="Vector 2" className="absolute w-[200px] h-[200px] left-[-25%]" />
          <img src="/Vector3.svg" alt="Vector 3" className="absolute w-[200px] h-[200px] top-[-15%]" />
          <img src="/Vector4.svg" alt="Vector 4" className="absolute w-[150px] h-[150px] top-0 right-0" />
          <img src="/Vector5.svg" alt="Vector 5" className="absolute w-[100px] h-[100px] right-0 top-[15%]" />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Login;
