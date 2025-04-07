import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Home-Page/Home";
import Login from './Login-Page/Login';
import Chatbot from './Chatbot/Chatbot';
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path="/Chatbot" element={<Chatbot />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App

