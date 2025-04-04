import { Link } from 'react-router-dom'
import { Plane } from "lucide-react";

function HomeHeader(){

    return(
      <header className="flex justify-between items-center p-6 text-[#0E1C36]">
      <div className="text-3xl font-bold flex items-center gap-2">
        <Plane className="w-8 h-8 text-[#0E1C36]" />
        <span>Edu-Pilot</span>
      </div>
      
      <nav className="space-x-6 text-[20px]">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="" className="hover:underline">
          ChatBot
        </Link>
        <Link to="" className="hover:underline">
          Team
        </Link>
        <Link to="/" className="hover:underline">
          About
        </Link>
        <Link to="" className="hover:underline">
          Help
        </Link>
      </nav>
    
      <div>
        <Link to="/Login" className=" text-[20px] hover:underline">
          Login
        </Link>
      </div>
    </header>
    
    );
}

export default HomeHeader