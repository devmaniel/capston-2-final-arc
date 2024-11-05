import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { BsPersonFillCheck } from "react-icons/bs";
import { Link } from "@tanstack/react-router";
import "@styles/DesignTest.scss";
import { GiBookshelf } from "react-icons/gi";

export const Route = createFileRoute("/design")({
  component: () => Design(),
});

function Design() {
  return (
    <>
      <div className="mb-12 flex flex-col items-center">
        <div className="bg-gradient-to-b from-[#f0f9ff] to-[#fffaf0] ... border border-gray-300 w-full max-w-[600px] text-neutral-900 p-8 rounded-2xl mt-4 shadow-2xl flex flex-col gap-6 justify-center items-center">
          <GiBookshelf className="text-[48px] text-primary animate-bounce" />
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-wider">
              Welcome to BBSHS Library!
            </h1>
            <p className="my-1 text-sm text-gray-600">
              Get up and log-in to your account.
            </p>
          </div>
          <div>
            <img src="../images/success.jpg" className="mb-5 h-[250px] mx-auto rounded-[50%]"/>
          <p className="text-center text-lg leading-relaxed text-gray-700">
            Welcome to a world of knowledge! Access thousands of books,
            journals, and educational resources right at your fingertips.
            <Link
              to="/login"
              className="text-primary font-semibold text-[12px] mx-2 tracking-normal hover:underline"
            >
              Redirect to Login
            </Link>
          </p>
          </div>
    
        </div>

        <ul className="steps mt-10 text-base-content">
          <li className="step step-primary">Enter Valid LRN</li>
          <li className="step step-primary">Validate Information</li>
          <li className="step step-primary">Verify Email</li>
          <li className="step step-primary">Verify phone number</li>
          <li className="step step-primary">Account Created</li>
        </ul>
      </div>
    </>
  );
}
