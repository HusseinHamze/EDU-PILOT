import { Link } from 'react-router-dom'
import { Plane } from "lucide-react";
import { motion } from "framer-motion";

function HomeHeader() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full z-50 bg-transparent flex justify-between items-center p-6 text-[#0E1C36]"
    >
      <div className="text-3xl font-bold flex items-center gap-2">
        <Plane className="w-8 h-8 text-[#0E1C36]" />
        <span>Edu-Pilot</span>
      </div>

      <nav className="flex space-x-6 text-[20px]">
        {["Home", "ChatBot", "Team", "Majors", "About"].map((text, index) => (
          <Link
            key={index}
            to="/"
            className="relative group overflow-hidden pb-1 transition-all duration-300 ease-in-out hover:text-[#142c5e] hover:font-bold"
          >
            {text}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0E1C36] transform origin-center scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
        ))}
      </nav>

      <Link
        to="/Login"
        className="relative flex h-[40px] w-25 items-center justify-center rounded-lg overflow-hidden bg-[#0E1C36] font-medium text-white shadow-2xl transition-all duration-300 hover:bg-transparent hover:text-[#0E1C36] border border-transparent hover:border-[#0E1C36]"
      >
        <span className="relative z-10">Login</span>
      </Link>
    </motion.header>
  );
}

export default HomeHeader;
