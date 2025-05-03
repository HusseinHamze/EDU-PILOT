import React, { useState } from 'react';
import SideBar from "./Elements/SideBar";
import Dashboard from "./Sections/Dashboard";
import Users from "./Sections/Users";
import Majors from "./Sections/Majors";
import Assessment from "./Sections/Assessment";
import Universities from "./Sections/Universities";
import Settings from "./Sections/Settings";

export default function Admin() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [userType, setUserType] = useState('all');

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'users':
                return <Users type={userType} />;
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
        <div className="flex h-screen">
            <SideBar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection}
                setUserType={setUserType}
            />
            <div className="flex-1 overflow-y-auto">
                {renderSection()}
            </div>
        </div>
    );
}