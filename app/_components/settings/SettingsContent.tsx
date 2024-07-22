"use client";

import { FC } from "react";

const SettingsContent: FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center gap-4">
                <h1 className="text-2xl font-semibold">Settings</h1>
            </header>
            <main className="flex-1 max-w-5xl mx-auto p-6 sm:p-8 lg:p-10">
                <section>
                    <h2 className="text-lg font-semibold mb-6">General</h2>
                    <div className="bg-white p-6 shadow rounded-lg">
                        <div className="grid gap-8">
                            <div className="grid gap-4">
                                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
                                <select id="theme" className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="system">System</option>
                                </select>
                            </div>
                            <div className="grid gap-4">
                                <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">Font Size</label>
                                <input
                                    id="font-size"
                                    type="range"
                                    min="12"
                                    max="20"
                                    step="2"
                                    defaultValue="16"
                                    className="w-full mt-1"
                                    aria-label="Font size"
                                />
                            </div>
                            <div className="grid gap-4">
                                <label htmlFor="sort-notes" className="block text-sm font-medium text-gray-700">Sort Notes By</label>
                                <select id="sort-notes" className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <option value="date">Date</option>
                                    <option value="title">Title</option>
                                    <option value="modified">Last Modified</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-6">Account</h2>
                    <div className="bg-white p-6 shadow rounded-lg">
                        <div className="grid gap-8">
                            <div className="grid gap-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input id="name" type="text" defaultValue="John Doe" className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                            <div className="grid gap-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input id="email" type="email" defaultValue="john@example.com" className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                            <div className="grid gap-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input id="password" type="password" className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                        <div className="border-t pt-6 mt-6">
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Save Changes</button>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-6">Privacy</h2>
                    <div className="bg-white p-6 shadow rounded-lg">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center space-x-3">
                                <input id="share-data" type="checkbox" defaultChecked className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="share-data" className="text-sm font-medium text-gray-700">Share anonymous usage data to improve the app</label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <input id="delete-account" type="checkbox" className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="delete-account" className="text-sm font-medium text-gray-700">Delete my account and all my data</label>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SettingsContent;