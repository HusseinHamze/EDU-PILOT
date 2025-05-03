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
                <h1 className="text-2xl font-bold">Majors Management</h1>
            </div>
            
            <div className="mb-6">
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <Table data={filteredData} columns={columns} />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Major Categories</h2>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                            <span>STEM</span>
                            <span className="text-gray-500">12 Majors</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                            <span>Business</span>
                            <span className="text-gray-500">8 Majors</span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                            <span>Social Sciences</span>
                            <span className="text-gray-500">10 Majors</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Total Majors</p>
                            <p className="text-2xl font-bold">30</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Most Popular</p>
                            <p className="text-lg font-medium">Computer Science</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Majors; 