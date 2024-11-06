import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/error404")({
  component: error404,
});

export default function error404() {
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
          <p className="text-lg sm:text-sm text-neutral mb-6">
            It seems the page you're looking for doesn't exist. Please check the
            URL or return to the homepage.
          </p>
          <div>
            <button
              className="px-6 py-3 text-white font-semibold text-xl rounded-lg shadow-lg bg-primary hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105"
              onclick="window.location.href='http://localhost:5173/login'"
            >
              Go to login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
