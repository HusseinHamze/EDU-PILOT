import React, { useState } from 'react';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';

export default function EditAdmins() {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Sample data - replace with actual data from your backend
    const [admins, setAdmins] = useState([
        { id: 1, name: 'Admin 1', email: 'admin1@example.com', role: 'Super Admin' },
        { id: 2, name: 'Admin 2', email: 'admin2@example.com', role: 'Admin' },
    ]);

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
    ];

    const handleSearch = (term) => {
        setSearchTerm(term);
        // Add filtering logic here when you have actual data
    };

    return (
        <div className="p-6">
            <div className="flex justify-between text-[#0E1C36] items-center mb-6">
                <h1 className="text-2xl dark:text-white font-bold">Admins Management</h1>
            </div>
            
            <SearchBar onSearch={handleSearch} />
            <Table 
                data={admins.filter(admin => 
                    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
                )} 
                columns={columns} 
            />
        </div>
    );
}