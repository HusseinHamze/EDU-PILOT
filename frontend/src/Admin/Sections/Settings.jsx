import React, { useState } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        emailUpdates: true,
        language: 'en'
    });

    const handleToggle = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Dark Mode</h3>
                                <p className="text-sm text-gray-500">Enable dark mode for the interface</p>
                            </div>
                            <button
                                onClick={() => handleToggle('darkMode')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                    settings.darkMode ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Email Notifications</h3>
                                <p className="text-sm text-gray-500">Receive email updates about your account</p>
                            </div>
                            <button
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

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Language
                            </label>
                            <select
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={settings.language}
                                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Security</h2>
                    <div className="space-y-4">
                        <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings; 