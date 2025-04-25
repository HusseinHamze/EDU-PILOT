import { useState } from 'react';
import { Home, Users, BookOpen, ListChecks, Settings, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';

function SidebarItem({ icon, label, isActive, onClick }) {
  return (
    <div 
      className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors
        ${isActive ? 'bg-[#AFCBFF]/40 dark:bg-[#0E1C36]/40' : 'hover:bg-[#AFCBFF]/20 dark:hover:bg-[#0E1C36]/20'}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

// Content components for each section
function DashboardContent() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="font-semibold">Active Courses</h3>
          <p className="text-2xl">56</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
          <h3 className="font-semibold">Pending Assessments</h3>
          <p className="text-2xl">12</p>
        </div>
      </div>
    </div>
  );
}

function UsersContent() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <p>User list table would go here with search and filtering options.</p>
      </div>
    </div>
  );
}

function MajorsContent() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Academic Programs</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <p>Majors and courses management interface would go here.</p>
      </div>
    </div>
  );
}

function AssessmentContent() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assessment Center</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <p>Test creation and student assessment tools would go here.</p>
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">System Settings</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <p>Configuration options and system preferences would go here.</p>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      icon: <Home size={20} />,
      label: 'Dashboard',
      component: <DashboardContent />
    },
    {
      id: 'users',
      icon: <Users size={20} />,
      label: 'Manage Users',
      component: <UsersContent />
    },
    {
      id: 'majors',
      icon: <BookOpen size={20} />,
      label: 'Majors',
      component: <MajorsContent />
    },
    {
      id: 'assessment',
      icon: <ListChecks size={20} />,
      label: 'Assessment',
      component: <AssessmentContent />
    },
    {
      id: 'settings',
      icon: <Settings size={20} />,
      label: 'Settings',
      component: <SettingsContent />
    }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  const activeComponent = menuItems.find(item => item.id === activeTab)?.component;

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
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-600 dark:border-gray-300 space-y-2">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#AFCBFF]/20 dark:hover:bg-[#0E1C36]/20 rounded cursor-pointer text-sm font-medium"
          >
            <Settings size={20} />
            Toggle Theme
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-500/20 rounded cursor-pointer text-sm font-medium text-red-400 dark:text-red-600"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeComponent}
      </div>
    </div>
  );
}