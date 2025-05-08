import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';

// Configure axios defaults
axios.defaults.withCredentials = true;

const EditAdmins = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [admins, setAdmins] = useState([]);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        full_name: '',
        role: 'admin'
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    // Clear message after 5 seconds
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Memoize the fetchAdmins function
    const fetchAdmins = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching admins...'); // Debug log
            
            const response = await axios.get('http://localhost/EDU-PILOT/backend/admin/get_admins.php', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Raw response:', response); // Debug log
            console.log('Response data:', response.data); // Debug log
            
            if (response.data.success) {
                setAdmins(response.data.admins);
                setError(null);
            } else {
                throw new Error(response.data.message || 'Failed to fetch admins');
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setError(error.response?.data?.message || error.message || 'Failed to fetch admins');
        } finally {
            setLoading(false);
        }
    }, []);

    // Memoize the checkAuthentication function
    const checkAuthentication = useCallback(async () => {
        try {
            setLoading(true);
            console.log('Starting authentication check...');
            
            const debugResponse = await axios.get('http://localhost/EDU-PILOT/backend/admin/debug_session.php', {
                withCredentials: true
            });
            console.log('Session debug info:', debugResponse.data);
            
            const response = await axios.get('http://localhost/EDU-PILOT/backend/admin/check_super_admin.php', {
                withCredentials: true
            });
            
            console.log('Auth check response:', response.data);
            
            if (response.data.success && response.data.is_super_admin) {
                console.log('Super admin check passed:', response.data.admin);
                setCurrentAdmin(response.data.admin);
                await fetchAdmins();
            } else {
                console.log('Super admin check failed:', response.data);
                setError(response.data.message || 'Access denied. Super admin privileges required.');
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            console.error('Error response:', error.response?.data);
            setError(error.response?.data?.message || 'Authentication failed');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } finally {
            setLoading(false);
        }
    }, [fetchAdmins]);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    // Memoize the columns configuration
    const columns = React.useMemo(() => [
        { 
            header: 'Username', 
            accessor: 'username',
            cell: (row) => <span className="font-medium">{row.username}</span>
        },
        { header: 'Full Name', accessor: 'full_name' },
        { header: 'Email', accessor: 'email' },
        { 
            header: 'Role', 
            accessor: 'role',
            cell: (row) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    row.role === 'super_admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                }`}>
                    {row.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    {currentAdmin?.role === 'super_admin' && (
                        <>
                            {row.role === 'super_admin' && row.id !== currentAdmin.id ? (
                                <span className="text-xs text-gray-500 italic">
                                    Unable to edit super admin
                                </span>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setFormData({
                                                id: row.id,
                                                username: row.username,
                                                email: row.email,
                                                full_name: row.full_name,
                                                role: row.role,
                                                password: ''
                                            });
                                            setShowEditForm(true);
                                        }}
                                        className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                        title="Edit admin"
                                    >
                                        Edit
                                    </button>

                                    {row.role !== 'super_admin' && (
                                        <button
                                            onClick={() => handleDelete(row.id)}
                                            className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                            title="Delete admin"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            )
        }
    ], [currentAdmin]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setMessage({ type: '', text: '' }); // Clear previous messages
            
            const response = await axios.post('http://localhost/EDU-PILOT/backend/admin/add_admin.php', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Add admin response:', response.data);
            
            if (response.data.success) {
                setMessage({ 
                    type: 'success', 
                    text: 'Admin added successfully!' 
                });
                setShowAddForm(false);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    full_name: '',
                    role: 'admin'
                });
                await fetchAdmins(); // Refresh the admin list
            } else {
                // Handle field-specific errors
                const errorMessage = response.data.field 
                    ? `${response.data.field === 'username' ? 'Username' : 'Email'} already exists`
                    : response.data.message;
                setMessage({ 
                    type: 'error', 
                    text: errorMessage 
                });
            }
        } catch (error) {
            console.error('Error adding admin:', error);
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to add admin'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting edit with data:', formData); // Debug log
            
            const response = await axios.post(
                'http://localhost/EDU-PILOT/backend/admin/update_admin.php',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            console.log('Edit response:', response.data); // Debug log
            
            if (response.data.success) {
                setMessage({ type: 'success', text: 'Admin updated successfully!' });
                setShowEditForm(false);
                await fetchAdmins(); // Added await to ensure list is refreshed
            } else {
                setMessage({ type: 'error', text: response.data.message || 'Failed to update admin' });
            }
        } catch (error) {
            console.error('Error updating admin:', error);
            console.error('Error response:', error.response?.data); // Debug log
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to update admin'
            });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
            return;
        }
        
        try {
            setLoading(true);
            console.log('Attempting to delete admin with ID:', id); // Debug log
            
            const response = await axios.post(
                'http://localhost/EDU-PILOT/backend/admin/delete_admin.php',
                JSON.stringify({ id }), // Explicitly stringify the data
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            console.log('Delete response:', response.data); // Debug log
            
            if (response.data.success) {
                setMessage({
                    type: 'success',
                    text: 'Admin deleted successfully'
                });
                await fetchAdmins(); // Refresh the list
            } else {
                throw new Error(response.data.message || 'Failed to delete admin');
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
            console.error('Error response:', error.response?.data); // Debug log
            console.error('Error status:', error.response?.status); // Debug log
            setMessage({
                type: 'error',
                text: error.response?.data?.message || error.message || 'Failed to delete admin'
            });
        } finally {
            setLoading(false);
        }
    };

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

    const filteredData = admins.filter(admin =>
        Object.values(admin).some(value =>
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading) {
        return (
            <div className="p-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E1C36]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0E1C36] dark:text-white">Admin Management</h1>
                {currentAdmin?.role === 'super_admin' && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Add New Admin
                    </button>
                )}
            </div>

            {/* Notification Message */}
            {message.text && (
                <div 
                    className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg min-w-[300px] ${
                        message.type === 'success' 
                            ? 'bg-green-50 text-green-900 border border-green-200' 
                            : 'bg-red-50 text-red-900 border border-red-200'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {message.type === 'success' ? (
                                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                                </svg>
                            )}
                            <span className="font-medium">{message.text}</span>
                        </div>
                        <button 
                            onClick={() => setMessage({ type: '', text: '' })}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <Table data={filteredData} columns={columns} />
            </div>
            
            {/* Add Admin Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-[#0E1C36] dark:text-white">Add New Admin</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="flex-1 p-3 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90"
                                >
                                    Add Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setFormData({
                                            username: '',
                                            email: '',
                                            password: '',
                                            full_name: '',
                                            role: 'admin'
                                        });
                                    }}
                                    className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Admin Modal */}
            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-[#0E1C36] dark:text-white">Edit Admin</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Password (leave blank to keep current)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="flex-1 p-3 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90"
                                >
                                    Update Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditForm(false);
                                        setFormData({
                                            username: '',
                                            email: '',
                                            password: '',
                                            full_name: '',
                                            role: 'admin'
                                        });
                                    }}
                                    className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditAdmins;