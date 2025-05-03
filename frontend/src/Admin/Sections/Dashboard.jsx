import React from 'react';

const Dashboard = () => {
    const stats = [
        { title: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
        { title: 'Active Courses', value: '45', change: '+5%', trend: 'up' },
        { title: 'Completed Assessments', value: '789', change: '+8%', trend: 'up' },
        { title: 'Average Score', value: '85%', change: '+2%', trend: 'up' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
                        <div className="flex items-baseline mt-2">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                            <span className={`ml-2 text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {/* Add recent activity items here */}
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Add New User
                        </button>
                        <button className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            Create Course
                        </button>
                        <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                            View Reports
                        </button>
                        <button className="p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                            Manage Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 