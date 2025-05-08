import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, ListChecks, Building, Settings, LogOut, ChevronDown } from 'lucide-react';
import axios from 'axios';

const SideBar = ({ activeSection, setActiveSection, setUserType }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost/EDU-PILOT/backend/admin/logout.php', {}, {
                withCredentials: true
            });
            
            // Clear local storage
            localStorage.removeItem('admin');
            
            // Redirect to login page
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
            // Force redirect even if logout fails
            window.location.href = '/login';
        }
    };

    const handleSectionClick = (section) => {
        setActiveSection(section);
        if (isMobile) setIsOpen(false);
    };

    const handleUserTypeClick = (type) => {
        if (type === 'admins') {
            setActiveSection('admins');
        } else {
            setUserType(type);
            setActiveSection('users');
        }
        setIsUsersDropdownOpen(false); // Close dropdown after selection
        if (isMobile) setIsOpen(false);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsUsersDropdownOpen(false); // Close dropdown when collapsing
        }
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
        <>
            {/* Mobile overlay */}
            {isOpen && isMobile && (
                <div 
                    className="fixed inset-0 bg-black/50 z-10 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`
                fixed md:relative z-20 bg-[#0E1C36] dark:bg-gray-800 text-white h-screen 
                ${isOpen ? 'w-64' : 'w-20'} 
                transition-all duration-300 ease-in-out
                shadow-lg flex flex-col rounded-tr-2xl rounded-br-2xl
                ${isMobile && !isOpen ? 'w-20' : ''}
            `}>
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-white/20">
                    {isOpen && (
                        <h1 className="text-xl font-bold truncate">Edu-Pilot Admin</h1>
                    )}
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d={isOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>
                
                {/* Menu Items - Scrollable Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <nav className="mt-4">
                        {menuItems.map((item) => (
                            <div key={item.name}>
                                <div
                                    className={`
                                        flex items-center p-4 mx-2 my-1 rounded-lg
                                        hover:bg-white/10 transition-colors duration-200 cursor-pointer
                                        ${activeSection === item.section && !item.dropdown ? 'bg-white/20' : ''}
                                        ${!isOpen ? 'justify-center' : ''}
                                        ${item.dropdown ? 'pr-2' : ''}
                                    `}
                                    onClick={() => {
                                        if (item.dropdown) {
                                            if (!isOpen) {
                                                setIsOpen(true);
                                                setTimeout(() => setIsUsersDropdownOpen(true), 300);
                                            } else {
                                                setIsUsersDropdownOpen(!isUsersDropdownOpen);
                                            }
                                        } else {
                                            handleSectionClick(item.section);
                                        }
                                    }}
                                >
                                    <div className="flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    {isOpen && (
                                        <span className="ml-4 truncate flex-1">{item.name}</span>
                                    )}
                                    {item.dropdown && isOpen && (
                                        <ChevronDown 
                                            size={16} 
                                            className={`
                                                transition-transform flex-shrink-0
                                                ${isUsersDropdownOpen ? 'rotate-180' : ''}
                                            `} 
                                        />
                                    )}
                                </div>
                                {item.dropdown && isUsersDropdownOpen && isOpen && (
                                    <div className="ml-8 mr-2 space-y-1">
                                        {item.dropdown.map((subItem) => (
                                            <div
                                                key={subItem.name}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleUserTypeClick(subItem.type);
                                                }}
                                                className={`
                                                    block p-2 pl-4 rounded-lg
                                                    hover:bg-white/10 transition-colors duration-200 cursor-pointer
                                                    ${activeSection === 'users' && subItem.type === 'all' ? 'bg-white/20' : ''}
                                                `}
                                            >
                                                {subItem.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className={`
                    p-4 border-t border-white/20
                    ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300
                `}>
                    <button
                        onClick={handleLogout}
                        className={`
                            flex items-center w-full p-2 rounded-lg
                            text-red-400 hover:bg-red-500/30 transition-colors duration-200
                            ${!isOpen ? 'justify-center' : ''}
                        `}
                    >
                        <LogOut size={20} />
                        {isOpen && <span className="ml-4">Logout</span>}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideBar;