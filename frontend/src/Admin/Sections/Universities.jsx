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

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <Table data={filteredData} columns={columns} />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">University Statistics</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Total Universities</p>
                            <p className="text-2xl font-bold">50</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Top 10 Universities</p>
                            <p className="text-2xl font-bold">10</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="font-medium">New University Added</p>
                            <p className="text-sm text-gray-500">University of California, Berkeley</p>
                        </div>
                        <div>
                            <p className="font-medium">Ranking Updated</p>
                            <p className="text-sm text-gray-500">MIT moved to #1 position</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Universities; 