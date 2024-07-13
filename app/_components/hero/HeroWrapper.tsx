import { FC } from "react";

const HeroWrapper: FC = () => {
  return (
    <div>
      <img
        className="absolute w-full object-cover object-left-top h-screen inset-0 top-0 hidden dark:block"
        src="images/bg.webp"
        alt="image"
        loading="lazy"
      />
      <img
        className="absolute w-full object-cover object-top h-screen inset-0 top-0 dark:hidden"
        src="images/bg2.webp"
        alt="image"
        loading="lazy"
      />
      <div className="relative container m-auto px-6 md:px-12 lg:px-7">
        <div className="py-40 lg:py-56 md:w-9/12 lg:w-7/12 dark:lg:w-6/12 ml-auto">
          <h1 className="text-gray-900 dark:text-white font-bold text-4xl md:text-6xl lg:text-4xl xl:text-6xl">
            Shaping a world with{" "}
            <span className="text-teal-600 dark:text-teal-500">
              reimagination.
            </span>
          </h1>
          <p className="mt-8 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            incidunt nam itaque sed eius modi error totam sit illum. Voluptas
            doloribus asperiores quaerat aperiam. Quidem harum omnis beatae
            ipsum soluta!
          </p>
          <div className="mt-16 space-y-2 lg:space-y-0 md:w-max sm:space-x-6">
            <button
              type="button"
              title="Start buying"
              className="w-full py-3 px-6 text-center rounded-full transition bg-teal-300 hover:bg-teal-100 active:bg-teal-400 focus:bg-teal-300 sm:w-max"
            >
              <span className="block text-teal-900 font-semibold text-sm">
                Contact Us
              </span>
            </button>
            <button
              type="button"
              title="Start buying"
              className="w-full py-3 px-6 text-center rounded-full transition border border-gray-200 dark:active:bg-teal-900 dark:focus:bg-gray-800 active:bg-teal-200 focus:bg-teal-100 sm:w-max"
            >
              <span className="block text-teal-800 dark:text-teal-100 font-semibold text-sm">
                About us
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWrapper;
