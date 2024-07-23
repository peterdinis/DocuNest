"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Card, CardBody } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const SettingsContent: FC = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <Header text="Settings" />
            <main className="flex-1 w-full p-6 sm:p-8 lg:p-10 overflow-auto">
                <section>
                    <h2 className="text-lg font-semibold mb-6">General</h2>
                    <Card className="bg-white p-6 shadow rounded-lg">
                        <CardBody className="grid gap-8">
                            <div className="grid gap-4">
                                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Used AI Functions</label>
                                15 / 100
                            </div>
                            <div className="grid gap-4">
                                <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">Profile Informations</label>
                                Name: 
                            </div>
                            <div className="grid gap-4">
                                <label htmlFor="sort-notes" className="block text-sm font-medium text-gray-700">Sort Notes By</label>
                                <select id="sort-notes" className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    <option value="date">Date</option>
                                    <option value="title">Title</option>
                                    <option value="modified">Last Modified</option>
                                </select>
                            </div>
                        </CardBody>
                    </Card>
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