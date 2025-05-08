import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';
import { FaUserGraduate, FaCalendarAlt, FaLightbulb, FaTools, FaGraduationCap, FaUniversity, FaEye, FaChartBar, FaClock, FaListAlt, FaTimes } from 'react-icons/fa';

const Assessment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [assessmentData, setAssessmentData] = useState({
        assessments: [],
        statistics: {
            total_questions: 0,
            completed_today: 0,
            average_completion_time: 0
        },
        top_majors: [],
        recent_activity: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columns = [
        { 
            header: 'Student Name', 
            accessor: 'student',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <FaUserGraduate className="text-blue-500" />
                    <span>{row.student}</span>
                </div>
            )
        },
        { 
            header: 'Assessment Date', 
            accessor: 'date',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-500" />
                    <span>{new Date(row.date).toLocaleDateString()}</span>
                </div>
            )
        },
        { 
            header: 'Interests', 
            accessor: 'interests',
            cell: (row) => (
                <div className="flex items-center gap-2 max-w-[200px]">
                    <FaLightbulb className="text-yellow-500 flex-shrink-0" />
                    <span className="truncate">{row.interests}</span>
                </div>
            )
        },
        { 
            header: 'Skills', 
            accessor: 'skills',
            cell: (row) => (
                <div className="flex items-center gap-2 max-w-[200px]">
                    <FaTools className="text-purple-500 flex-shrink-0" />
                    <span className="truncate">{row.skills}</span>
                </div>
            )
        },
        { 
            header: 'Suggested Major', 
            accessor: 'major',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <FaGraduationCap className="text-indigo-500" />
                    <span>{row.major}</span>
                </div>
            )
        },
        { 
            header: 'Recommended Universities', 
            accessor: 'universities',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <FaUniversity className="text-red-500" />
                    <span>{row.universities}</span>
                </div>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (row) => (
                <button
                    onClick={() => handleViewDetails(row)}
                    className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    <FaEye className="text-blue-500" />
                    View Details
                </button>
            )
        }
    ];

    const fetchAssessmentData = useCallback(async (showLoading = true) => {
        if (showLoading) {
            setLoading(true);
        }
        try {
            const response = await axios.get('http://localhost/EDU-PILOT/backend/admin/get_assessments.php', {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                setAssessmentData(response.data.data);
                setError(null);
            } else {
                throw new Error(response.data.message || 'Failed to fetch assessments');
            }
        } catch (error) {
            console.error('Error fetching assessments:', error);
            setError(error.response?.data?.message || error.message || 'Failed to fetch assessments');
        } finally {
            if (showLoading) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchAssessmentData();
        
        // Set up automatic refresh every 30 seconds
        const refreshInterval = setInterval(() => {
            fetchAssessmentData(false);
        }, 30000);
        
        return () => clearInterval(refreshInterval);
    }, [fetchAssessmentData]);

    const handleViewDetails = (assessment) => {
        setSelectedAssessment(assessment);
    };

    const closeDetails = () => {
        setSelectedAssessment(null);
    };

    const filteredData = assessmentData.assessments.filter(assessment => 
        Object.values(assessment).some(value => 
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
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0E1C36] dark:text-white mb-4">Assessment Management</h1>
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Questions</p>
                            <h3 className="text-2xl font-bold text-[#0E1C36] dark:text-white">
                                {assessmentData.statistics.total_questions}
                            </h3>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                            <FaListAlt className="text-blue-500 dark:text-blue-300 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Completed Today</p>
                            <h3 className="text-2xl font-bold text-[#0E1C36] dark:text-white">
                                {assessmentData.statistics.completed_today}
                            </h3>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                            <FaCalendarAlt className="text-green-500 dark:text-green-300 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Average Completion Time</p>
                            <h3 className="text-2xl font-bold text-[#0E1C36] dark:text-white">
                                {assessmentData.statistics.average_completion_time} min
                            </h3>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                            <FaClock className="text-purple-500 dark:text-purple-300 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="overflow-x-auto">
                    <Table data={filteredData} columns={columns} />
                </div>
            </div>

            {/* Assessment Details Modal */}
            {selectedAssessment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#0E1C36] dark:text-white">Assessment Details</h2>
                            <button onClick={closeDetails} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Student Information</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.student}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Assessment Date</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {new Date(selectedAssessment.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Interests</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.interests}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Skills</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.skills}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Suggested Major</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.major}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Recommended Universities</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.universities}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Confidence Score</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedAssessment.confidence_score}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white flex items-center gap-2">
                        <FaGraduationCap className="text-indigo-500" />
                        Top Suggested Majors
                    </h2>
                    <div className="space-y-2">
                        {assessmentData.top_majors.map((major, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FaGraduationCap className="text-indigo-500" />
                                    <span className="font-medium">{major.name}</span>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                    {major.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white flex items-center gap-2">
                        <FaUserGraduate className="text-blue-500" />
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        {assessmentData.recent_activity.map((activity, index) => (
                            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FaUserGraduate className="text-blue-500" />
                                    <div>
                                        <p className="font-medium">{activity.type}</p>
                                        <p className="text-sm text-gray-500">{activity.student} - {activity.major}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assessment; 