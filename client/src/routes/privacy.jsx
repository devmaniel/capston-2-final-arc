import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: privacy,
});

import React from "react";

const handleClick = () => {
  window.location.href = "/login";
};

export default function privacy() {
  return (
    <>
      <div className="w-full max-w-[1300px] mx-auto mb-10">
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between">
              <h1 className="font-bold tracking-wide text-2xl mb-2">
                Privacy Policy
              </h1>
              <div>
                <button onClick={handleClick} className="hover:underline">Back to Home</button>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Last Updated: November 5, 2024
            </p>
            <div className="border-b-2 border-gray-300 mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mt-5 md:col-span-2">
              <h2 className="font-semibold text-lg">Information We Collect</h2>
              <p className="mt-2 text-sm text-gray-600">
                We may collect the following types of information:
              </p>
              <div className="mt-3">
                <div className="list-item mx-4 mb-2">
                  <span className="font-bold">Personal Information:</span>{" "}
                  Information that identifies you, such as your name, email
                  address, phone number, and any other information you provide
                  when you contact us or sign up for our services.
                </div>
                <div className="list-item mx-4">
                  <span className="font-bold">Usage Data:</span> Information
                  about how you use our Site, including your IP address, browser
                  type, access times, pages viewed, and the referring URL.
                </div>
              </div>

              <h2 className="font-semibold text-lg mt-5">
                How We Use Your Information
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We may use the information we collect for various purposes,
                including to:
              </p>
              <div className="mt-3">
                <div className="list-item mx-4 mb-2">
                  Provide, operate, and maintain our Site
                </div>
                <div className="list-item mx-4 mb-2">
                  Improve, personalize, and expand our Site
                </div>
                <div className="list-item mx-4 mb-2">
                  Understand and analyze how you use our Site
                </div>
                <div className="list-item mx-4 mb-2">
                  Communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the Site
                </div>
                <div className="list-item mx-4">
                  Process your transactions and send you related information
                </div>
              </div>

              <h2 className="font-semibold text-lg mt-5">
                Information Sharing and Disclosure
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We do not sell or rent your personal information to third
                parties. We may share your information in the following
                situations:
              </p>
              <div className="mt-3">
                <div className="list-item mx-4 mb-2">
                  With service providers who assist us in operating our Site and
                  conducting our business
                </div>
                <div className="list-item mx-4 mb-2">
                  To comply with legal obligations, enforce our terms, and
                  protect our rights
                </div>
              </div>

              <h2 className="font-semibold text-lg mt-5">Contact Us</h2>
              <div className="mt-3">
                <div className="list-item mx-4 mb-2">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at{" "}
                  <span className="font-bold">bagongbarrioshs@edu.ph.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <img
                src="https://img.freepik.com/free-vector/businessman-putting-electronic-signature-document-security-shields-electronic-signature-e-signature-template-e-sign-consent-agreement-concept-illustration_335657-2374.jpg?t=st=1730746759~exp=1730750359~hmac=6a78309698c3efedb1b1fa063997520f06a63d5fbe0e5162720e414bed74e8f6&w=740"
                alt="Descriptive Image"
                className="rounded-md shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
