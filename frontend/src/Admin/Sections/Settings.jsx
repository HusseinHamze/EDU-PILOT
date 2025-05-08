import React, { useState } from 'react';
import axios from 'axios';
import { FaMoon, FaEnvelope, FaGlobe, FaLock, FaUser, FaBell, FaKey, FaCheck, FaTimes, FaSun } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [settings, setSettings] = useState({
        notifications: true,
        emailUpdates: true,
        language: 'en'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleToggle = async (setting) => {
        try {
            setLoading(true);
            let newSettings;

            if (setting === 'darkMode') {
                toggleTheme();
                newSettings = {
                    ...settings,
                    darkMode: !isDarkMode
                };
            } else {
                newSettings = {
                    ...settings,
                    [setting]: !settings[setting]
                };
            }

            const response = await axios.post(
                'http://localhost/EDU-PILOT/backend/admin/update_settings.php',
                newSettings,
                { withCredentials: true }
            );

            if (response.data.success) {
                if (setting !== 'darkMode') {
                    setSettings(newSettings);
                }
                setMessage({ 
                    type: 'success', 
                    text: setting === 'darkMode' 
                        ? `Theme changed to ${!isDarkMode ? 'dark' : 'light'} mode`
                        : 'Settings updated successfully'
                });
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update settings' });
            if (setting === 'darkMode') {
                toggleTheme(); // Revert theme change if API call failed
            }
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleLanguageChange = async (e) => {
        try {
            setLoading(true);
            const newSettings = {
                ...settings,
                language: e.target.value
            };

            const response = await axios.post(
                'http://localhost/EDU-PILOT/backend/admin/update_settings.php',
                newSettings,
                { withCredentials: true }
            );

            if (response.data.success) {
                setSettings(newSettings);
                setMessage({ type: 'success', text: 'Language updated successfully' });
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update language' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost/EDU-PILOT/backend/admin/change_password.php',
                passwordData,
                { withCredentials: true }
            );

            if (response.data.success) {
                setMessage({ type: 'success', text: 'Password changed successfully' });
                setShowPasswordModal(false);
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to change password' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0E1C36] dark:text-white">Settings</h1>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {message.type === 'success' ? <FaCheck className="inline mr-2" /> : <FaTimes className="inline mr-2" />}
                    {message.text}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* General Settings Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FaUser className="text-blue-500" />
                        <h2 className="text-lg font-semibold text-[#0E1C36] dark:text-white">General Settings</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {isDarkMode ? (
                                    <FaMoon className="text-yellow-500" />
                                ) : (
                                    <FaSun className="text-yellow-500" />
                                )}
                                <div>
                                    <h3 className="font-medium text-[#0E1C36] dark:text-white">
                                        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                    </p>
                                </div>
                            </div>
                            <button
                                disabled={loading}
                                onClick={() => handleToggle('darkMode')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                                    isDarkMode ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-green-500" />
                                <div>
                                    <h3 className="font-medium text-[#0E1C36] dark:text-white">Email Notifications</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates</p>
                                </div>
                            </div>
                            <button
                                disabled={loading}
                                onClick={() => handleToggle('emailUpdates')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                    settings.emailUpdates ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        settings.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Language Settings Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FaGlobe className="text-purple-500" />
                        <h2 className="text-lg font-semibold text-[#0E1C36] dark:text-white">Language Settings</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Select Language
                            </label>
                            <select
                                disabled={loading}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={settings.language}
                                onChange={handleLanguageChange}
                            >
                                <option value="en">English</option>
                                <option value="ar">Arabic</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Security Settings Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FaLock className="text-red-500" />
                        <h2 className="text-lg font-semibold text-[#0E1C36] dark:text-white">Security</h2>
                    </div>
                    <div className="space-y-4">
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            <FaKey />
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#0E1C36] dark:text-white">Change Password</h2>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData(prev => ({
                                        ...prev,
                                        currentPassword: e.target.value
                                    }))}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData(prev => ({
                                        ...prev,
                                        newPassword: e.target.value
                                    }))}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData(prev => ({
                                        ...prev,
                                        confirmPassword: e.target.value
                                    }))}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-[#0E1C36] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                                >
                                    Change Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings; 