import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, BookOpen, ListChecks, Building, Settings, LogOut, ChevronDown } from 'lucide-react';

const SideBar = ({ activeSection, setActiveSection, setUserType }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Add your logout logic here
        navigate('/login');
    };

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    const handleUserTypeClick = (type) => {
        setUserType(type);
        setActiveSection('users');
    };

    const menuItems = [
        { name: 'Dashboard', section: 'dashboard', icon: <Home size={20} /> },
        { 
            name: 'Users', 
            section: 'users', 
            icon: <Users size={20} />,
            dropdown: [
                { name: 'All Users', type: 'all' },
                { name: 'Admins', type: 'admins' }
            ]
        },
        { name: 'Majors', section: 'majors', icon: <BookOpen size={20} /> },
        { name: 'Assessment', section: 'assessment', icon: <ListChecks size={20} /> },
        { name: 'Universities', section: 'universities', icon: <Building size={20} /> },
        { name: 'Settings', section: 'settings', icon: <Settings size={20} /> }
    ];

    return (
        <div className={`bg-gray-800 text-white h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
            <div className="p-4 flex items-center justify-between">
                <h1 className={`text-xl font-bold ${!isOpen && 'hidden'}`}>Edu-Pilot Admin</h1>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
                    </svg>
                </button>
            </div>
            
            <nav className="mt-8">
                {menuItems.map((item) => (
                    <div key={item.name}>
                        <div
                            className={`flex items-center p-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer ${
                                activeSection === item.section ? 'bg-gray-700' : ''
                            }`}
                            onClick={() => item.dropdown ? setIsUsersDropdownOpen(!isUsersDropdownOpen) : handleSectionClick(item.section)}
                        >
                            {item.icon}
                            <span className={`ml-4 ${!isOpen && 'hidden'}`}>{item.name}</span>
                            {item.dropdown && (
                                <ChevronDown 
                                    size={16} 
                                    className={`ml-auto transition-transform ${isUsersDropdownOpen ? 'rotate-180' : ''} ${!isOpen && 'hidden'}`} 
                                />
                            )}
                        </div>
                        {item.dropdown && isUsersDropdownOpen && (
                            <div className="ml-8 space-y-2">
                                {item.dropdown.map((subItem) => (
                                    <div
                                        key={subItem.name}
                                        onClick={() => handleUserTypeClick(subItem.type)}
                                        className={`block p-2 hover:bg-gray-700 transition-colors duration-200 cursor-pointer ${
                                            activeSection === 'users' && subItem.type === 'all' ? 'bg-gray-700' : ''
                                        }`}
                                    >
                                        {subItem.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className={`absolute bottom-0 ${isOpen ? 'w-64' : 'w-20'} p-4 border-t border-gray-700 transition-all duration-300`}>
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                >
                    <LogOut size={20} />
                    <span className={`ml-4 ${!isOpen && 'hidden'}`}>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SideBar;