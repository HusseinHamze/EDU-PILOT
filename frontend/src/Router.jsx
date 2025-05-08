import { Routes, Route } from 'react-router-dom';
import Home from "./Home-Page/Home";
import Login from './Login-Page/Login';
import Chatbot from './Chatbot/Chatbot';
import Assessment from './Assessments/Assessment';
import AssessmentGateway from './Home-Page/AssessmentGateway';
import AssessmentHistory from './Assessments/AssessmentHistory';
import About from './About/About';
import ScrollToTop from './Multi-Use/ScrollToTop';
import Result from './Assessments/Result';
import Admin from './Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Chatbot' element={<Chatbot />} />
        <Route path='/Assessment' element={<Assessment />} />
        <Route path='/assessment-gateway' element={<AssessmentGateway />} />
        <Route path='/assessment/history' element={<AssessmentHistory />} />
        <Route path='/About' element={<About />} />
        <Route path='/results' element={<Result />} />
        <Route 
          path='/admin/*' 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/admin/admins' 
          element={
            <ProtectedRoute requireSuperAdmin={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router; 