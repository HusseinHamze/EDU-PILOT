import React, { useState } from 'react';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
        { header: 'Status', accessor: 'status' },
        { header: 'Actions', accessor: 'actions' }
    ];

    const initialData = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            status: 'Active',
            actions: 'Edit'
        },
        {
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'Instructor',
            status: 'Active',
            actions: 'Edit'
        },
        {
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'Student',
            status: 'Inactive',
            actions: 'Edit'
        }
    ];

    const filteredData = initialData.filter(user => 
        Object.values(user).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Add New User
                </button>
            </div>
            
            <SearchBar onSearch={setSearchTerm} />
            <Table data={filteredData} columns={columns} />
        </div>
    );
};

export default Users; 