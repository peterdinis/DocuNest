import { FC } from "react";
import { Edit3, Mic, FolderOpen, Users } from "lucide-react";

const HeroServices: FC = () => {
    return (
        <div className="py-16">
            <div className="xl:container m-auto space-y-16 px-6 text-gray-500 md:px-12">
                <div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
                        Enhance Your Note-Taking Experience <br className="sm:block" hidden />
                        with AI-Powered Tools
                    </h2>
                </div>
                <div className="md:-mx-8 mt-16 grid gap-8 lg:gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:lg:bg-transparent border border-gray-100 lg:border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-gray-600/10 lg:shadow-transparent lg:hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300">
                        <div className="relative">
                            <Edit3 className="w-10 h-10 text-gray-800 dark:text-white" />
                            <h3 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 transition dark:text-white">
                                Intelligent Summarization
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Automatically generate concise summaries of your notes using advanced AI algorithms.
                            </p>
                        </div>
                    </div>
                    <div className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:lg:bg-transparent border border-gray-100 lg:border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-gray-600/10 lg:shadow-transparent lg:hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300">
                        <div className="relative">
                            <Mic className="w-10 h-10 text-gray-800 dark:text-white" />
                            <h3 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 transition dark:text-white">
                                Voice to Text
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Convert your spoken words into text, making note-taking faster and more efficient.
                            </p>
                        </div>
                    </div>
                    <div className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:lg:bg-transparent border border-gray-100 lg:border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-gray-600/10 lg:shadow-transparent lg:hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300">
                        <div className="relative">
                            <FolderOpen className="w-10 h-10 text-gray-800 dark:text-white" />
                            <h3 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 transition dark:text-white">
                                Smart Organization
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Organize your notes intelligently based on context and relevance using AI categorization.
                            </p>
                        </div>
                    </div>
                    <div className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:lg:bg-transparent border border-gray-100 lg:border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-gray-600/10 lg:shadow-transparent lg:hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300">
                        <div className="relative">
                            <Users className="w-10 h-10 text-gray-800 dark:text-white" />
                            <h3 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 transition dark:text-white">
                                Collaborative Notes
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Work together with classmates in real-time to create and edit notes seamlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroServices;