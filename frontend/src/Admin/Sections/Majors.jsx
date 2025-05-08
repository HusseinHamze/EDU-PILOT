import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';
import { FaGraduationCap, FaLaptopCode, FaHeartbeat, FaChartLine, FaPalette, FaUsers, FaBook, FaChalkboardTeacher, FaBriefcase } from 'react-icons/fa';

const Majors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [majorsData, setMajorsData] = useState({
        majors: [],
        categories: [],
        total_majors: 0,
        most_popular: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [newMajor, setNewMajor] = useState({
        name: '',
        category: '',
        description: '',
        info: ''
    });

    // Icon mapping for categories
    const categoryIcons = {
        'STEM': <FaLaptopCode className="text-blue-500" />,
        'Health Sciences': <FaHeartbeat className="text-red-500" />,
        'Business': <FaChartLine className="text-green-500" />,
        'Arts & Design': <FaPalette className="text-purple-500" />,
        'Social Sciences': <FaUsers className="text-yellow-500" />,
        'Humanities': <FaBook className="text-indigo-500" />,
        'Education': <FaChalkboardTeacher className="text-teal-500" />,
        'Professional Studies': <FaBriefcase className="text-orange-500" />,
        'Other': <FaGraduationCap className="text-gray-500" />
    };

    const columns = [
        { 
            header: 'Major Name', 
            accessor: 'name',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    {categoryIcons[row.category] || categoryIcons['Other']}
                    <div className="font-medium text-[#0E1C36] whitespace-normal">{row.name}</div>
                </div>
            )
        },
        { 
            header: 'Category', 
            accessor: 'category',
            cell: (row) => (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                    {row.category}
                </span>
            )
        },
        { 
            header: 'Stats', 
            accessor: 'stats',
            cell: (row) => (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Students:</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            {row.student_count}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Universities:</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                            {row.university_count}
                        </span>
                    </div>
                </div>
            )
        },
        { 
            header: 'Description', 
            accessor: 'description',
            cell: (row) => (
                <div className="text-sm text-gray-600 whitespace-normal pr-4">
                    {row.description}
                </div>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (row) => (
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-full"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded hover:bg-red-600 transition-colors w-full"
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    const fetchMajorsData = useCallback(async (showLoading = true) => {
        if (showLoading) {
            setLoading(true);
        }
        try {
            const response = await axios.get('http://localhost/EDU-PILOT/backend/admin/get_majors.php', {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                setMajorsData(response.data.data);
                setError(null);
            } else {
                throw new Error(response.data.message || 'Failed to fetch majors');
            }
        } catch (error) {
            console.error('Error fetching majors:', error);
            setError(error.response?.data?.message || error.message || 'Failed to fetch majors');
        } finally {
            if (showLoading) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchMajorsData();
        
        // Set up automatic refresh every 30 seconds
        const refreshInterval = setInterval(() => {
            fetchMajorsData(false);
        }, 30000);
        
        return () => clearInterval(refreshInterval);
    }, [fetchMajorsData]);

    const handleEdit = (major) => {
        setSelectedMajor(major);
        setNewMajor({
            name: major.name,
            category: major.category,
            description: major.description,
            info: major.info || ''
        });
        setShowEditModal(true);
    };

    const handleUpdateMajor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/EDU-PILOT/backend/admin/update_major.php',
                {
                    id: selectedMajor.id,
                    ...newMajor
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setShowEditModal(false);
                setSelectedMajor(null);
                setNewMajor({ name: '', category: '', description: '', info: '' });
                fetchMajorsData();
            } else {
                throw new Error(response.data.message || 'Failed to update major');
            }
        } catch (error) {
            console.error('Error updating major:', error);
            setError(error.response?.data?.message || error.message || 'Failed to update major');
        }
    };

    const handleDelete = async (majorId) => {
        if (!window.confirm('Are you sure you want to delete this major?')) {
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost/EDU-PILOT/backend/admin/delete_major.php',
                { id: majorId },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                fetchMajorsData();
            } else {
                throw new Error(response.data.message || 'Failed to delete major');
            }
        } catch (error) {
            console.error('Error deleting major:', error);
            setError(error.response?.data?.message || error.message || 'Failed to delete major');
        }
    };

    const handleAddMajor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/EDU-PILOT/backend/admin/add_major.php',
                newMajor,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setShowAddModal(false);
                setNewMajor({ name: '', category: '', description: '', info: '' });
                fetchMajorsData();
            } else {
                throw new Error(response.data.message || 'Failed to add major');
            }
        } catch (error) {
            console.error('Error adding major:', error);
            setError(error.response?.data?.message || error.message || 'Failed to add major');
        }
    };

    const filteredData = majorsData.majors.filter(major => 
        Object.values(major).some(value => 
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
                <h1 className="text-2xl font-bold text-[#0E1C36] dark:text-white">Majors Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Add New Major
                </button>
            </div>
            
            {/* Add Major Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-[#0E1C36] dark:text-white">Add New Major</h2>
                        <form onSubmit={handleAddMajor} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Major Name
                                </label>
                                <input
                                    type="text"
                                    value={newMajor.name}
                                    onChange={(e) => setNewMajor({...newMajor, name: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category
                                </label>
                                <select
                                    value={newMajor.category}
                                    onChange={(e) => setNewMajor({...newMajor, category: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {Object.keys(categoryIcons).map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={newMajor.description}
                                    onChange={(e) => setNewMajor({...newMajor, description: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                    rows="3"
                                    required
                                />
            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Additional Info
                                </label>
                                <textarea
                                    value={newMajor.info}
                                    onChange={(e) => setNewMajor({...newMajor, info: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90"
                                >
                                    Add Major
                                </button>
                            </div>
                        </form>
                            </div>
                        </div>
            )}

            {/* Edit Major Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-[#0E1C36] dark:text-white">Edit Major</h2>
                        <form onSubmit={handleUpdateMajor} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Major Name
                                </label>
                                <input
                                    type="text"
                                    value={newMajor.name}
                                    onChange={(e) => setNewMajor({...newMajor, name: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category
                                </label>
                                <select
                                    value={newMajor.category}
                                    onChange={(e) => setNewMajor({...newMajor, category: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {Object.keys(categoryIcons).map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={newMajor.description}
                                    onChange={(e) => setNewMajor({...newMajor, description: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                    rows="3"
                                    required
                                />
                        </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Additional Info
                                </label>
                                <textarea
                                    value={newMajor.info}
                                    onChange={(e) => setNewMajor({...newMajor, info: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36]"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedMajor(null);
                                        setNewMajor({ name: '', category: '', description: '', info: '' });
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90"
                                >
                                    Update Major
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Major Categories Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">Major Categories</h2>
                    <div className="space-y-2">
                        {majorsData.categories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center gap-2">
                                    {categoryIcons[category.name] || categoryIcons['Other']}
                                    <span className="text-sm font-medium text-[#0E1C36] dark:text-white">{category.name}</span>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                    {category.count}
                                </span>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">Quick Stats</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Majors</p>
                            <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">{majorsData.total_majors}</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Most Popular Major</p>
                            <p className="text-xl font-semibold text-[#0E1C36] dark:text-white">{majorsData.most_popular}</p>
                        </div>
                    </div>
                </div>

                {/* Most Popular Majors */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">Top Majors</h2>
                    <div className="space-y-2">
                        {majorsData.majors.slice(0, 5).map((major, index) => (
                            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        {categoryIcons[major.category] || categoryIcons['Other']}
                                        <span className="text-sm font-medium text-[#0E1C36] dark:text-white">{major.name}</span>
                                </div>
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                        {major.student_count} students
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Majors Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <Table 
                    columns={columns}
                    data={filteredData}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default Majors; 