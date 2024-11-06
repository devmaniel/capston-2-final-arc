import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/nolonger")({
  component: nolonger,
});

export default function nolonger() {
  return (
    <>
      <div className="h-screen flex items-center justify-center relative">
        <div className="text-center px-4 sm:px-8 md:px-16">
          <div className="">
            <img
              src="/images/stop.png"
              alt="Stop"
              className="w-40 sm:w-56 md:w-72 mx-auto "
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-[#D2635C] leading-tight mb-4">
            Oops!{" "}
            <span className="text-primary">
              You are no longer enrolled at this school
            </span>
          </h1>
          <p className="text-lg sm:text-sm text-neutral mb-6">
            It appears that you are no longer enrolled at this school. Please
            check your enrollment status or return to the homepage.
          </p>

          <div>
            <a
              href="/login"
              className="  font-semibold text-lg text-neutral hover:underline"
            >
              Go to login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
