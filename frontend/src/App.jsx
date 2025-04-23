import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home-Page/Home";
import Login from './Login-Page/Login';
import Chatbot from './Chatbot/Chatbot';
import Assessment from './Assessments/Assessment';
import Majors from './Majors/Majors';
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Chatbot' element={<Chatbot/>}/>
      <Route path='/Assessment' element={<Assessment/>}/>
      <Route path='/Majors' element={<Majors/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App