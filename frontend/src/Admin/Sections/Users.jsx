import React, { useState, useEffect } from 'react';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';
import axios from 'axios';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState([]);
    const [stats, setStats] = useState({
        total_users: 0,
        active_users: 0,
        percentage_change: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [addUserError, setAddUserError] = useState('');
    const [addUserSuccess, setAddUserSuccess] = useState('');
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [activityFilter, setActivityFilter] = useState('all');

    // Activity type definitions
    const ACTIVITY_TYPES = {
        NEW_REGISTRATION: 'New Registration',
        STARTED_ASSESSMENT: 'Started Assessment',
        COMPLETED_ASSESSMENT: 'Completed Assessment'
    };

    // Filter options for the dropdown
    const filterOptions = [
        { value: 'all', label: 'All Activities' },
        { value: 'New Registration', label: 'New Registrations' },
        { value: 'Started Assessment', label: 'Started Assessments' },
        { value: 'Completed Assessment', label: 'Completed Assessments' }
    ];

    const columns = [
        { header: 'Name', accessor: 'Name' },
        { header: 'Email', accessor: 'Email' },
        { 
            header: 'Status', 
            accessor: 'status',
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                    row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
            )
        },
        { 
            header: 'Assessment Status', 
            accessor: 'assessment_status',
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                    row.assessment_status === 'Completed' ? 'bg-green-100 text-green-800' :
                    row.assessment_status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {row.assessment_status}
                </span>
            )
        },
        { 
            header: 'Last Login', 
            accessor: 'last_login',
            cell: (row) => row.last_login ? new Date(row.last_login).toLocaleDateString() : 'Never'
        },
        { 
            header: 'Joined', 
            accessor: 'created_at',
            cell: (row) => new Date(row.created_at).toLocaleDateString()
        }
    ];

    useEffect(() => {
        // Initial load
        fetchUserData(true);
        
        // Set up automatic refresh every 5 seconds
        const refreshInterval = setInterval(() => fetchUserData(false), 5000);
        
        // Cleanup interval on component unmount
        return () => clearInterval(refreshInterval);
    }, []);

    const fetchUserData = async (isInitialLoad = false) => {
        try {
            if (isInitialLoad) {
                setLoading(true);
            }
            setError(null);
            
            const response = await axios.get('http://localhost/EDU-PILOT/backend/get_users.php', {
                withCredentials: true
            });
            
            console.log('Activity data:', response.data?.data?.recent_activity); // Debug log
            
            if (response.data.success) {
                const { users = [], stats = {}, recent_activity = [] } = response.data.data || {};
                
                setUserData(users || []);
                setStats({
                    total_users: stats.total_users || 0,
                    active_users: stats.active_users || 0,
                    percentage_change: stats.percentage_change || 0
                });
                setRecentActivity(recent_activity || []);
                
                if (isInitialLoad) {
                    setInitialLoadComplete(true);
                }
            } else {
                throw new Error(response.data.message || 'Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error.message);
        } finally {
            if (isInitialLoad) {
                setLoading(false);
            }
        }
    };

    const filteredData = userData.filter(user => 
        Object.values(user).some(value => 
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAddUserError('');
        setAddUserSuccess('');

        try {
            const response = await axios.post('http://localhost/EDU-PILOT/backend/add_student.php', newUser, {
                withCredentials: true
            });
            
            console.log('Add student response:', response.data);
            
            if (response.data.success) {
                setAddUserSuccess('Student created successfully!');
                setNewUser({ name: '', email: '', password: '' });
                
                // Immediately fetch updated data
                await fetchUserData();
                
                setShowAddForm(false);
            } else {
                setAddUserError(response.data.message || 'Failed to create student');
            }
        } catch (error) {
            console.error('Error creating student:', error);
            setAddUserError(error.message || 'An error occurred while creating the student');
        }
    };

    const getActivityText = (activity) => {
        const name = activity.Name || 'A user';
        
        // Debug log
        console.log('Activity data in getActivityText:', activity);
        
        // Check for survey answers
        if (activity.Answer_Value === 'New Registration') {
            return `${name} registered as a new user`;
        }
        
        // Check for assessment status
        if (activity.assessment_status === 'Started') {
            return `${name} started an assessment`;
        }
        if (activity.assessment_status === 'Completed') {
            return `${name} completed an assessment`;
        }
        
        // Check for specific answer values that indicate assessment progress
        if (activity.Answer_Value && activity.Answer_Value !== 'registration') {
            return `${name} answered a question in the assessment`;
        }
        
        return `${name} performed an action`;
    };

    const getActivityIcon = (activity) => {
        // Check for registration
        if (activity.Answer_Value === 'New Registration') {
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            );
        }
        
        // Check for assessment status
        if (activity.assessment_status === 'Started') {
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            );
        }
        
        if (activity.assessment_status === 'Completed') {
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        }
        
        // Default icon for answer submission
        if (activity.Answer_Value && activity.Answer_Value !== 'registration') {
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            );
        }
        
        // Default icon
        return (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    };

    const getActivityColor = (activity) => {
        // Registration color
        if (activity.Answer_Value === 'New Registration') {
            return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300';
        }
        
        // Assessment status colors
        if (activity.assessment_status === 'Started') {
            return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300';
        }
        if (activity.assessment_status === 'Completed') {
            return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300';
        }
        
        // Answer submission color
        if (activity.Answer_Value && activity.Answer_Value !== 'registration') {
            return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300';
        }
        
        // Default color
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300';
    };

    // Filter activities based on selected filter
    const filteredActivities = activityFilter === 'all' 
        ? recentActivity 
        : recentActivity.filter(activity => activity.Answer_Value === activityFilter);

    // Only show loading screen on initial load
    if (loading && !initialLoadComplete) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E1C36]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0E1C36] dark:text-white">User Management</h1>
            </div>
            
            <div className="mb-6">
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                <Table data={filteredData} columns={columns} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* User Statistics Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">User Statistics</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                                <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">{stats.total_users}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                                <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">{stats.active_users}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">(Last 30 days)</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</p>
                                <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">
                                    {stats.percentage_change > 0 ? '+' : ''}{stats.percentage_change}%
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">(vs. last month)</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-[#0E1C36] dark:text-white">Recent Activity</h2>
                        <select
                            value={activityFilter}
                            onChange={(e) => setActivityFilter(e.target.value)}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            {filterOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-4">
                        {filteredActivities.length > 0 ? (
                            filteredActivities.map((activity, index) => (
                                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-start">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getActivityColor(activity)}`}>
                                            {getActivityIcon(activity)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-[#0E1C36] dark:text-white">{activity.Name}</p>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {activity.relative_time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {getActivityText(activity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-gray-500 dark:text-gray-400">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="font-medium">
                                        {activityFilter === 'all' 
                                            ? 'No recent activity' 
                                            : `No ${filterOptions.find(opt => opt.value === activityFilter)?.label.toLowerCase() || 'activities'}`
                                        }
                                    </p>
                                    <p className="text-sm mt-1">
                                        {activityFilter === 'all'
                                            ? 'Activities will appear here when users take actions'
                                            : 'Try selecting a different filter'
                                        }
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add User Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">Add New Student</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-start">
                                <div 
                                    className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3 cursor-pointer hover:bg-purple-200"
                                    onClick={() => setShowAddForm(!showAddForm)}
                                >
                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0E1C36] dark:text-white">Create New Student</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Click the plus icon to add a new student</p>
                                </div>
                            </div>
                        </div>

                        {showAddForm && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {addUserError && (
                                    <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                                        {addUserError}
                                    </div>
                                )}
                                {addUserSuccess && (
                                    <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                                        {addUserSuccess}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="Enter student's full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="Enter student's email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="Enter student's password"
                                    />
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        className="flex-1 p-3 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200"
                                    >
                                        Create Student
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setNewUser({ name: '', email: '', password: '' });
                                            setAddUserError('');
                                            setAddUserSuccess('');
                                        }}
                                        className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users; 