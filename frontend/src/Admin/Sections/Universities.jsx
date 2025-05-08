import React, { useState, useEffect } from 'react';
import Table from '../Elements/Table';
import SearchBar from '../Elements/SearchBar';
import { 
    FaUniversity, FaMapMarkerAlt, FaTrophy, FaGraduationCap, FaPercentage, 
    FaChartLine, FaEye, FaTimes, FaPlus, FaBook, FaDollarSign,
    FaLaptopCode, FaHeartbeat, FaHammer, FaPencilRuler, FaPalette,
    FaPray, FaChartBar, FaFlask, FaBalanceScale, FaBriefcase,
    FaFilm, FaBrain, FaGlobe, FaPills, FaCalculator, FaTheaterMasks,
    FaChild, FaBullhorn, FaLandmark, FaFootballBall, FaPaintBrush
} from 'react-icons/fa';
import axios from 'axios';

const getMajorIcon = (majorName) => {
    const iconMap = {
        'Computer Science': { icon: FaLaptopCode, color: 'text-blue-500' },
        'Medicine': { icon: FaHeartbeat, color: 'text-red-500' },
        'Engineering': { icon: FaHammer, color: 'text-yellow-600' },
        'Architecture': { icon: FaPencilRuler, color: 'text-gray-600' },
        'Graphic Design': { icon: FaPalette, color: 'text-pink-500' },
        'Religious Studies': { icon: FaPray, color: 'text-purple-500' },
        'Business Administration': { icon: FaChartBar, color: 'text-blue-600' },
        'Physics': { icon: FaFlask, color: 'text-green-500' },
        'Law': { icon: FaBalanceScale, color: 'text-indigo-500' },
        'Marketing': { icon: FaBriefcase, color: 'text-orange-500' },
        'Film and Media Studies': { icon: FaFilm, color: 'text-red-600' },
        'Psychology': { icon: FaBrain, color: 'text-pink-600' },
        'International Relations': { icon: FaGlobe, color: 'text-blue-400' },
        'Pharmacy': { icon: FaPills, color: 'text-green-600' },
        'Economics': { icon: FaCalculator, color: 'text-gray-700' },
        'Philosophy': { icon: FaBook, color: 'text-yellow-700' },
        'Animation': { icon: FaTheaterMasks, color: 'text-purple-600' },
        'Early Childhood Development': { icon: FaChild, color: 'text-pink-400' },
        'Journalism': { icon: FaBullhorn, color: 'text-yellow-500' },
        'Political Science': { icon: FaLandmark, color: 'text-blue-700' },
        'Sports Science': { icon: FaFootballBall, color: 'text-green-700' },
        'Visual Arts': { icon: FaPaintBrush, color: 'text-indigo-600' }
    };

    // Default icon if major not found in map
    return iconMap[majorName] || { icon: FaGraduationCap, color: 'text-gray-500' };
};

const Universities = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [universitiesData, setUniversitiesData] = useState({
        universities: [],
        statistics: {
            total_universities: 0,
            total_programs: 0,
            total_majors: 0
        },
        top_universities: [],
        recent_activity: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUniversity, setNewUniversity] = useState({
        name: '',
        major: '',
        description: '',
        key_features: '',
        admission_rate: '',
        tuition_range: ''
    });
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);

    const columns = [
        { 
            header: 'University Name', 
            accessor: 'name',
            cell: (row) => (
                <div className="flex items-center gap-2 max-w-[200px]">
                    <FaUniversity className="text-blue-500 flex-shrink-0" />
                    <span className="truncate">{row.name}</span>
                </div>
            )
        },
        { 
            header: 'Major', 
            accessor: 'major',
            cell: (row) => (
                <div className="flex items-center gap-2 max-w-[200px]">
                    <FaGraduationCap className="text-purple-500 flex-shrink-0" />
                    <span className="truncate">{row.major}</span>
                </div>
            )
        },
        { 
            header: 'Ranking', 
            accessor: 'ranking',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-500 flex-shrink-0" />
                    <span>#{row.ranking}</span>
                </div>
            )
        },
        { 
            header: 'Acceptance Rate', 
            accessor: 'acceptance',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <FaPercentage className="text-green-500 flex-shrink-0" />
                    <span>{row.acceptance}</span>
                </div>
            )
        },
        { 
            header: 'Tuition Range', 
            accessor: 'tuition',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <FaDollarSign className="text-indigo-500 flex-shrink-0" />
                    <span>{row.tuition}</span>
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

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost/EDU-PILOT/backend/admin/get_universities.php', {
                withCredentials: true
            });

            if (response.data.success) {
                setUniversitiesData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching universities:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (university) => {
        setSelectedUniversity(university);
    };

    const closeDetails = () => {
        setSelectedUniversity(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUniversity(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/EDU-PILOT/backend/admin/add_university.php', 
                newUniversity,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                // Refresh the data
                fetchUniversities();
                // Reset form and close it
                setNewUniversity({
                    name: '',
                    major: '',
                    description: '',
                    key_features: '',
                    admission_rate: '',
                    tuition_range: ''
                });
                setShowAddForm(false);
                // Show success message
                alert('University added successfully!');
            } else {
                throw new Error(response.data.message || 'Failed to add university');
            }
        } catch (error) {
            console.error('Error adding university:', error);
            alert(error.message || 'Failed to add university');
        }
    };

    if (loading) {
        return (
            <div className="p-4 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0E1C36] dark:text-white mb-4">Universities Management</h1>
                <SearchBar onSearch={setSearchTerm} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Universities</p>
                            <h3 className="text-2xl font-bold text-[#0E1C36] dark:text-white">
                                {universitiesData.statistics.total_universities}
                            </h3>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                            <FaUniversity className="text-blue-500 dark:text-blue-300 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Programs</p>
                            <h3 className="text-2xl font-bold text-[#0E1C36] dark:text-white">
                                {universitiesData.statistics.total_programs}
                            </h3>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                            <FaGraduationCap className="text-green-500 dark:text-green-300 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Majors</p>
                            <h3 className="text-2xl font-bold text-[#0E1C36] dark:text-white">
                                {universitiesData.statistics.total_majors}
                            </h3>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                            <FaGraduationCap className="text-purple-500 dark:text-purple-300 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                <div className="p-4 border-b dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-[#0E1C36] dark:text-white">Top Universities</h2>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {universitiesData.top_universities.map((uni, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                                        index === 1 ? 'bg-gray-100 text-gray-600' :
                                        index === 2 ? 'bg-orange-100 text-orange-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        {index + 1}
                                    </div>
                                    <h3 className="font-semibold text-[#0E1C36] dark:text-white">{uni.name}</h3>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <p>Programs: {uni.program_count}</p>
                                    <p>Ranking: #{uni.best_ranking}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#0E1C36] dark:text-white">Universities List</h2>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <FaPlus />
                        Add University
                    </button>
                </div>
                <Table
                    data={universitiesData.universities.filter(uni =>
                        Object.values(uni).some(value =>
                            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    )}
                    columns={[
                        {
                            header: 'University Name',
                            accessor: 'name',
                            cell: (row) => (
                                <div className="flex items-center gap-2">
                                    <FaUniversity className="text-blue-500" />
                                    <span>{row.name}</span>
                                </div>
                            )
                        },
                        {
                            header: 'Major',
                            accessor: 'major',
                            cell: (row) => {
                                const { icon: Icon, color } = getMajorIcon(row.major);
                                return (
                                    <div className="flex items-center gap-2">
                                        <Icon className={color} />
                                        <span>{row.major}</span>
                                    </div>
                                );
                            }
                        },
                        {
                            header: 'Ranking',
                            accessor: 'ranking',
                            cell: (row) => (
                                <div className="flex items-center gap-2">
                                    <FaTrophy className="text-yellow-500" />
                                    <span>#{row.ranking}</span>
                                </div>
                            )
                        },
                        {
                            header: 'Admission Rate',
                            accessor: 'acceptance',
                            cell: (row) => (
                                <div className="flex items-center gap-2">
                                    <FaPercentage className="text-purple-500" />
                                    <span>{row.acceptance}</span>
                                </div>
                            )
                        },
                        {
                            header: 'Tuition Range',
                            accessor: 'tuition',
                            cell: (row) => (
                                <div className="flex items-center gap-2">
                                    <FaDollarSign className="text-green-500" />
                                    <span>{row.tuition}</span>
                                </div>
                            )
                        },
                        {
                            header: 'Actions',
                            accessor: 'actions',
                            cell: (row) => (
                                <button
                                    onClick={() => handleViewDetails(row)}
                                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                                >
                                    <FaEye />
                                    View Details
                                </button>
                            )
                        }
                    ]}
                />
            </div>

            {/* University Details Modal */}
            {selectedUniversity && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#0E1C36] dark:text-white">University Details</h2>
                            <button onClick={closeDetails} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">University Name</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedUniversity.name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Major</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedUniversity.major}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Ranking</h3>
                                <p className="text-gray-600 dark:text-gray-400">#{selectedUniversity.ranking}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Description</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedUniversity.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Key Features</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedUniversity.key_features}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Acceptance Rate</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedUniversity.acceptance}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Tuition Range</h3>
                                <p className="text-gray-600 dark:text-gray-400">{selectedUniversity.tuition}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add University Form */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#0E1C36] dark:text-white">Add New University</h2>
                            <button onClick={() => {
                                setShowAddForm(false);
                                setNewUniversity({
                                    name: '',
                                    major: '',
                                    description: '',
                                    key_features: '',
                                    admission_rate: '',
                                    tuition_range: ''
                                });
                            }} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    University Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newUniversity.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Major
                                </label>
                                <input
                                    type="text"
                                    name="major"
                                    value={newUniversity.major}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={newUniversity.description}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Key Features
                                </label>
                                <textarea
                                    name="key_features"
                                    value={newUniversity.key_features}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Acceptance Rate
                                </label>
                                <input
                                    type="text"
                                    name="admission_rate"
                                    value={newUniversity.admission_rate}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., 25%"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tuition Range
                                </label>
                                <input
                                    type="text"
                                    name="tuition_range"
                                    value={newUniversity.tuition_range}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., $20,000-$24,000/year"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E1C36] dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="flex-1 p-3 bg-[#0E1C36] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200"
                                >
                                    Add University
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Universities; 