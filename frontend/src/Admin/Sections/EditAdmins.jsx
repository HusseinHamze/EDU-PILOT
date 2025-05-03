import React, { useState } from 'react';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';


export default function EditAdmins() {

    return (
        <div className="p-6">
            <div className="flex justify-between text-[#0E1C36] items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
            </div>
            
            <SearchBar onSearch={setSearchTerm} />
            <Table data={filteredData} columns={columns} />
        </div>
    );

}