import React, { useState } from 'react';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';

const Majors = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { header: 'Major Name', accessor: 'name' },
        { header: 'Category', accessor: 'category' },
        { header: 'Required GPA', accessor: 'gpa' },
        { header: 'Required Courses', accessor: 'courses' },
        { header: 'Career Paths', accessor: 'careers' },
        { header: 'Actions', accessor: 'actions' }
    ];

    const initialData = [
        {
            name: 'Computer Science',
            category: 'STEM',
            gpa: '3.0',
            courses: 'Calculus, Programming, Data Structures',
            careers: 'Software Engineer, Data Scientist, Web Developer',
            actions: 'Edit'
        },
        {
            name: 'Business Administration',
            category: 'Business',
            gpa: '2.8',
            courses: 'Accounting, Marketing, Management',
            careers: 'Business Analyst, Marketing Manager, Entrepreneur',
            actions: 'Edit'
        },
        {
            name: 'Psychology',
            category: 'Social Sciences',
            gpa: '2.5',
            courses: 'General Psychology, Statistics, Research Methods',
            careers: 'Clinical Psychologist, Counselor, HR Specialist',
            actions: 'Edit'
        }
    ];

    const filteredData = initialData.filter(major => 
        Object.values(major).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0E1C36] dark:text-white">Majors Management</h1>
            </div>
            
            <div className="mb-6">
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                <Table data={filteredData} columns={columns} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Major Categories Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">Major Categories</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">STEM</p>
                                <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">12 Majors</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Business</p>
                                <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">8 Majors</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Social Sciences</p>
                                <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">10 Majors</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">Quick Stats</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Majors</p>
                                    <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">30</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Most Popular</p>
                                    <p className="text-lg font-medium text-[#0E1C36] dark:text-white">Computer Science</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Major Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">Add New Major</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0E1C36] dark:text-white">Create New Major</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Add a new major to the system</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full p-3 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200">
                            Add Major
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Majors; 