import React from 'react';

const Table = ({ data, columns }) => {
    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className="w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((column, index) => (
                                <th 
                                    key={index} 
                                    scope="col" 
                                    className="px-4 py-3 md:px-6 md:py-4"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr 
                                key={rowIndex} 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                {columns.map((column, colIndex) => (
                                    <td 
                                        key={colIndex} 
                                        className="px-4 py-3 md:px-6 md:py-4"
                                    >
                                        <div className="flex items-center">
                                            {row[column.accessor]}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No data available
                </div>
            )}
        </div>
    );
};

export default Table; 