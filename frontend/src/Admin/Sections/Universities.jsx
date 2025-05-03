import React, { useState } from 'react';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';

const Universities = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { header: 'University Name', accessor: 'name' },
        { header: 'Location', accessor: 'location' },
        { header: 'Ranking', accessor: 'ranking' },
        { header: 'Popular Majors', accessor: 'majors' },
        { header: 'Acceptance Rate', accessor: 'acceptance' },
        { header: 'Average GPA', accessor: 'gpa' },
        { header: 'Actions', accessor: 'actions' }
    ];

    const initialData = [
        {
            name: 'Massachusetts Institute of Technology',
            location: 'Cambridge, MA',
            ranking: '#1',
            majors: 'Computer Science, Engineering, Physics',
            acceptance: '7%',
            gpa: '4.0',
            actions: 'View Details'
        },
        {
            name: 'Stanford University',
            location: 'Stanford, CA',
            ranking: '#2',
            majors: 'Computer Science, Business, Engineering',
            acceptance: '4%',
            gpa: '3.95',
            actions: 'View Details'
        },
        {
            name: 'Harvard University',
            location: 'Cambridge, MA',
            ranking: '#3',
            majors: 'Business, Law, Medicine',
            acceptance: '5%',
            gpa: '3.9',
            actions: 'View Details'
        }
    ];

    const filteredData = initialData.filter(university => 
        Object.values(university).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Universities Management</h1>
            </div>
            
            <div className="mb-6">
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                <Table data={filteredData} columns={columns} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Statistics Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">University Statistics</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Universities</p>
                                <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">50</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Top 10 Universities</p>
                                <p className="text-2xl font-bold text-[#0E1C36] dark:text-white">10</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Updates Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">Recent Updates</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0E1C36] dark:text-white">New University Added</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">University of California, Berkeley</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0E1C36] dark:text-white">Ranking Updated</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">MIT moved to #1 position</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New University Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#0E1C36] dark:text-white">New University</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0E1C36] dark:text-white">Add New University</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Click to add a new university to the database</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full p-3 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200">
                            Add University
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Universities; 