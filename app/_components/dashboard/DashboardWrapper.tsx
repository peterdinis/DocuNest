import { FC } from "react";

const DashboardWrapper: FC = () => {
    return (
        <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
        <aside className="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
          <div className="my-4 w-full border-b-4 border-indigo-100 text-center">
            <span className="font-mono text-xl font-bold tracking-widest"> <span className="text-indigo-600">HELLO</span> DEV </span>
          </div>
          <div className="my-4"></div>
        </aside>
        <main className="main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
          <div className="flex h-full items-center justify-center bg-white text-center text-5xl font-bold shadow-md">Content</div>
        </main>
      </div>
    )
}

export default DashboardWrapper;