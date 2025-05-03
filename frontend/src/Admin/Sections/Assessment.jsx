import React, { useState } from 'react';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';

const Assessment = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { header: 'Student Name', accessor: 'student' },
        { header: 'Assessment Date', accessor: 'date' },
        { header: 'Interests', accessor: 'interests' },
        { header: 'Skills', accessor: 'skills' },
        { header: 'Suggested Major', accessor: 'major' },
        { header: 'Recommended Universities', accessor: 'universities' },
        { header: 'Actions', accessor: 'actions' }
    ];

    const initialData = [
        {
            student: 'John Doe',
            date: '2024-03-15',
            interests: 'Technology, Problem Solving, Mathematics',
            skills: 'Programming, Analytical Thinking, Teamwork',
            major: 'Computer Science',
            universities: 'MIT, Stanford, UC Berkeley',
            actions: 'View Details'
        },
        {
            student: 'Jane Smith',
            date: '2024-03-14',
            interests: 'Business, Leadership, Marketing',
            skills: 'Communication, Strategic Planning, Management',
            major: 'Business Administration',
            universities: 'Harvard, Wharton, NYU',
            actions: 'View Details'
        },
        {
            student: 'Bob Johnson',
            date: '2024-03-13',
            interests: 'Psychology, Human Behavior, Research',
            skills: 'Analysis, Communication, Empathy',
            major: 'Psychology',
            universities: 'Yale, Columbia, UCLA',
            actions: 'View Details'
        }
    ];

    const filteredData = initialData.filter(assessment => 
        Object.values(assessment).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Assessment Management</h1>
            </div>
            
            <div className="mb-6">
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <Table data={filteredData} columns={columns} />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Assessment Statistics</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Total Qustions</p>
                            <p className="text-2xl font-bold">38</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Completed Today</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Average Completion Time</p>
                            <p className="text-2xl font-bold">15 min</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Top Suggested Majors</h2>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                            <span>Computer Science</span>
                            <span className="text-gray-500">45%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                            <span>Business Administration</span>
                            <span className="text-gray-500">30%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                            <span>Psychology</span>
                            <span className="text-gray-500">25%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="font-medium">New Assessment Completed</p>
                            <p className="text-sm text-gray-500">John Doe - Computer Science</p>
                        </div>
                        <div>
                            <p className="font-medium">Assessment Updated</p>
                            <p className="text-sm text-gray-500">Jane Smith - Business Administration</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assessment; 