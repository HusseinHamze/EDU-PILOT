import React, { useState, useEffect } from 'react';
import SideBar from "./Elements/SideBar";
import Dashboard from "./Sections/Dashboard";
import Users from "./Sections/Users";
import Majors from "./Sections/Majors";
import Assessment from "./Sections/Assessment";
import Universities from "./Sections/Universities";
import Settings from "./Sections/Settings";
import EditAdmins from "./Sections/EditAdmins";
import { useLocation } from 'react-router-dom';

const Admin = ({ defaultSection = 'dashboard' }) => {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [userType, setUserType] = useState('all');
  const location = useLocation();

  useEffect(() => {
    // Get userType from URL query parameters
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type) {
      setUserType(type);
    }
  }, [location.search]);

  // Update active section when defaultSection changes
  useEffect(() => {
    setActiveSection(defaultSection);
  }, [defaultSection]);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users type={userType} />;
      case 'admins':
        return <EditAdmins />;
      case 'majors':
        return <Majors />;
      case 'assessment':
        return <Assessment />;
      case 'universities':
        return <Universities />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen relative">
      <SideBar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        setUserType={setUserType}
      />
      <div className="flex-1 overflow-y-auto md:ml-0 ml-20 transition-all duration-300">
        {renderSection()}
      </div>
    </div>
  );
};

export default Admin;
