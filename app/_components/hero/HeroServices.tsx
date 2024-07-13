import { FC } from "react";

const HeroServices: FC = () => {
    return (
        <div className="py-16">
        <div className="xl:container m-auto space-y-16 px-6 text-gray-500 md:px-12">
          <div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
              A technology-first approach to payments <br className="sm:block" hidden />
              and finance
            </h2>
          </div>
          <div className="md:-mx-8 mt-16 grid gap-8 lg:gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:lg:bg-transparent border border-gray-100 lg:border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-gray-600/10 lg:shadow-transparent lg:hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341111.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="package-delivery illustration"
                />
                <h3 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 transition dark:text-white">
                  First feature
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Neque Dolor, alias quae, quibusdam accusantium, laudantium recusandae tenetur fugiat
                  non cum doloribus aperiam voluptates nostrum.
                </p>
              </div>
            </div>
            <div className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:lg:bg-transparent border border-gray-100 lg:border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-gray-600/10 lg:shadow-transparent lg:hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341160.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="package-delivery illustration"
                />
                <h3 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 transition dark:text-white">
                  Second feature
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Neque Dolor, alias quae, quibusdam accusantium, laudantium recusandae tenetur fugiat
                  non cum doloribus aperiam voluptates nostrum.
                </p>
              </div>
            </div>
            <div className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:lg:bg-transparent border border-gray-100 lg:border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-gray-600/10 lg:shadow-transparent lg:hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341134.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="package-delivery illustration"
                />
                <h3 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 transition dark:text-white">
                  Third feature
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Neque Dolor, alias quae, quibusdam accusantium, laudantium recusandae tenetur fugiat
                  non cum doloribus aperiam voluptates nostrum.
                </p>
              </div>
            </div>
            <div className="group relative p-8 rounded-3xl bg-white dark:border-gray-700 dark:bg-gray-800 dark:lg:bg-transparent border border-gray-100 lg:border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-gray-600/10 lg:shadow-transparent lg:hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="package-delivery illustration"
                />
                <h3 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 transition dark:text-white">
                  Fourth feature
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Neque Dolor, alias quae, quibusdam accusantium, laudantium recusandae tenetur fugiat
                  non cum doloribus aperiam voluptates nostrum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
                 
    )
}

export default HeroServices;