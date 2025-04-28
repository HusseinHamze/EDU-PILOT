import { useState } from 'react';
import { Home, Users, BookOpen, ListChecks, Settings, LogOut, Building, ChevronDown } from 'lucide-react';

function SidebarItem({ icon, label, isActive, onClick, hasDropdown, isDropdownOpen }) {
  return (
    <div className="relative">
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors
          ${isActive ? 'bg-[#AFCBFF]/40 dark:bg-[#0E1C36]/40' : 'hover:bg-[#AFCBFF]/20 dark:hover:bg-[#0E1C36]/20'}`}
        onClick={onClick}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
        {hasDropdown && <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />}
      </div>
      {hasDropdown && isDropdownOpen && (
        <div className="ml-6 mt-1 space-y-1">
          <button className="text-sm px-3 py-2 hover:bg-[#AFCBFF]/20 dark:hover:bg-[#0E1C36]/20 rounded cursor-pointer">
            View All Users
          </button>
          <button className="text-sm px-3 py-2 hover:bg-[#AFCBFF]/20 dark:hover:bg-[#0E1C36]/20 rounded cursor-pointer">
            Admins
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'users', icon: <Users size={20} />, label: 'Manage Users', hasDropdown: true },
    { id: 'majors', icon: <BookOpen size={20} />, label: 'Majors' },
    { id: 'assessment', icon: <ListChecks size={20} />, label: 'Assessment' },
    { id: 'universities', icon: <Building size={20} />, label: 'Universities' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleTabClick = (id) => {
    if (id === 'users') {
      setIsUsersDropdownOpen(!isUsersDropdownOpen);
    } else {
      setActiveTab(id);
      setIsUsersDropdownOpen(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#0E1C36] dark:bg-[#AFCBFF] text-white dark:text-[#0E1C36] flex flex-col rounded-tr-2xl rounded-br-2xl shadow-lg">
        <div className="text-2xl font-bold p-6 border-b border-gray-600 dark:border-gray-300">
          Edu-Pilot Admin
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeTab === item.id}
              onClick={() => handleTabClick(item.id)}
              hasDropdown={item.hasDropdown}
              isDropdownOpen={isUsersDropdownOpen}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-600 dark:border-gray-300 space-y-2">
          <button 
            onClick={() => console.log('Logging out...')}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-500/20 rounded cursor-pointer text-sm font-medium text-red-400 dark:text-red-600"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h2>
        <p>Content for {activeTab} goes here.</p>
      </div>
    </div>
  );
}