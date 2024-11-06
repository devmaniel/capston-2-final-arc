import React from "react";
import { Link } from "@tanstack/react-router";
const Error404 = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center relative">
        <div className="text-center px-4 sm:px-8 md:px-16">
          <div className="">
            <img
              src="/images/404.png"
              alt="404 Error"
              className="w-40 sm:w-56 md:w-72 mx-auto "
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#EB4F5D] leading-tight mb-4">
            Oops! <span className="text-primary">Page not found!</span>
          </h1>
          <p className="text-lg sm:text-md text-neutral mb-6">
            It seems the page you're looking for doesn't exist. Please check the
            URL or return to the homepage.
          </p>
          {/* <div>
            <a
              href="/login"
              className="  font-semibold text-lg text-neutral hover:underline"
            >
              Go to login
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Error404;
