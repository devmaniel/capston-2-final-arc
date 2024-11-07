import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";

// authentication api
import auth from "../../../_lib/api/auth";

// Route definition for the Privacy page
export const Route = createFileRoute("/student/privacy/Privacy")({
  beforeLoad: async () => {
    const role = "student";
    const authResult = await auth(role);
    
    if (authResult.success) {
      if (authResult.role !== role) {
        console.log(
          `Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`
        );
        throw redirect({
          to: authResult.role === "student" ? "/student" : "/login",
        });
      }
      // Proceed if session is valid and roles match
      return {};
    } else {
      switch (authResult.reason) {
        case "session_not_found":
        case "invalid_session":
        case "expired_session":
          console.log(`Error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
        case "pending_violations":
          console.log(
            "User has pending violations. Redirecting to /violations_page"
          );
          throw redirect({ to: "/violations_page" });
        case "role_mismatch":
          console.log(
            `Role mismatch. Redirecting to: ${role === "admin" ? "/student" : "/admin"}`
          );
          throw redirect({ to: role === "admin" ? "/student" : "/admin" });
        case "unenrolled":
          console.log("User is no longer enrolled. Redirecting to /noLonger");
          throw redirect({ to: "/noLonger" });
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }
  },
  component: Privacy,
});

export default function Privacy() {
  // Set default active content to 0 (i.e., "About our Policy")
  const [activeContent, setActiveContent] = useState(0);

  // Function to handle button click and toggle content visibility
  const handleButtonClick = (index) => {
    setActiveContent(index === activeContent ? null : index);
  };

  return (
    <>
      <Nav />
      <div className="w-full max-w-[1300px] mx-auto mb-10">
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex  overflow-x-auto no-scrollbar w-full max-w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
              <button
                className={`py-2 px-4 text-lg font-bold rounded-md ${
                  activeContent === 0 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleButtonClick(0)}
              >
                About our Policy
              </button>
              <button
                className={`py-2 px-4 text-lg font-bold rounded-md ${
                  activeContent === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleButtonClick(1)}
              >
                Information We Collect
              </button>
              <button
                className={`py-2 px-4 text-lg font-bold rounded-md ${
                  activeContent === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleButtonClick(2)}
              >
                How We Use Your Information
              </button>
              <button
                className={`py-2 px-4 text-lg font-bold rounded-md ${
                  activeContent === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleButtonClick(3)}
              >
                Share Information
              </button>
              <button
                className={`py-2 px-4 text-lg font-bold rounded-md ${
                  activeContent === 4 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleButtonClick(4)}
              >
                Data Security
              </button>
              <button
                className={`py-2 px-4 text-lg font-bold rounded-md ${
                  activeContent === 5 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleButtonClick(5)}
              >
                Contact Us
              </button>
            </div>

            <div className="p-5 sm:p-10">
              {activeContent === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-8 sm:px-6 py-4">
                  <div className="flex justify-center items-center sm:border-r-2 sm:pr-6">
                    <img
                      src="/images/logo.png"
                      alt="Logo"
                      className="h-[300px] w-[300px] bg-white rounded-[50%]"
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-2xl mb-3 font-extrabold text-neutral tracking-tight mt-5 sm:text-3xl sm:mt-0">
                      Privacy Policy for Bagong Barrio Senior High School
                    </h1>
                    <p className="text-gray-600 text-sm mb-3">
                      Last Updated: November, 4, 2024
                    </p>
                    <div className="border-b-2 mb-5"></div>

                    <p>
                      Welcome to Bagong Barrio Senior High School Privacy
                      Policy. We value your privacy and are committed to
                      protecting your personal information. This Privacy Policy
                      outlines the information we collect, how we use it, and
                      your rights regarding your data.
                    </p>
                  </div>
                </div>
              )}

              {activeContent === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-8 sm:px-6 py-4">
                  <div className="flex justify-center items-center sm:border-r-2 sm:pr-6">
                    <img
                      src="/images/collect.png"
                      alt="Logo"
                      className="h-[300px] w-[300px] "
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-2xl mb-3 font-extrabold text-neutral tracking-tight mt-5 sm:text-3xl sm:mt-0">
                      Information We Collect
                    </h1>
                    <div className="border-b-2 mb-4 border-gray-300 "></div>
                    <p className="text-sm text-gray-600">
                      We collect different types of information when you use our
                      library system:
                    </p>
                    <div className="mt-4">
                      <p className="list-item">
                        Personal Information: When you register, we may collect
                        your name, email address, library card number, and
                        contact information
                      </p>
                      <p className="list-item mt-4">
                        Usage Data: We collect data on how you interact with our
                        system, including your search history, borrowed
                        materials, and reading preferences.
                      </p>
                      <p className="list-item mt-4">
                        Device Information: Information about the device you use
                        to access our system, such as IP address, browser type,
                        and operating system.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeContent === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-8 sm:px-6 py-4">
                  <div className="flex justify-center items-center sm:border-r-2 sm:pr-6">
                    <img
                      src="/images/how.png"
                      alt="Logo"
                      className="h-[300px] w-[300px] "
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-2xl mb-3 font-extrabold text-neutral tracking-tight mt-5 sm:text-3xl sm:mt-0">
                      How We Use Your Information
                    </h1>
                    <div className="border-b-2 mb-4 border-gray-300 "></div>
                    <p className="text-sm text-gray-600">
                      We use your information to provide, improve, and
                      personalize your experience with our library system. This
                      includes:
                    </p>
                    <div className="mt-4 mx-4">
                      <p className="list-item">
                        Managing your library account, including checking out
                        and reserving books.
                      </p>
                      <p className="list-item mt-4">
                        Personalizing book recommendations based on your reading
                        history.
                      </p>
                      <p className="list-item mt-4">
                        Improving the system by analyzing usage patterns to
                        enhance features and functionality.
                      </p>
                      <p className="list-item mt-4">
                        Communicating with you regarding account updates,
                        overdue items, and library events.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeContent === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-8 sm:px-6 py-4">
                  <div className="flex justify-center items-center sm:border-r-2 sm:pr-6">
                    <img
                      src="/images/sharing.png"
                      alt="Logo"
                      className="h-[300px] w-[300px] "
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-2xl mb-3 font-extrabold text-neutral tracking-tight mt-5 sm:text-3xl sm:mt-0">
                      Sharing Your Information
                    </h1>
                    <div className="border-b-2 mb-4 border-gray-300 "></div>
                    <p className="text-sm text-gray-600">
                      We do not sell or rent your personal information. We may
                      share information with third parties only in the following
                      circumstances:
                    </p>
                    <div className="mt-4 mx-4">
                      <p className="list-item">
                        Service Providers: We may work with third-party service
                        providers to perform certain functions, such as hosting
                        and maintaining the system.
                      </p>
                      <p className="list-item mt-4">
                        Legal Requirements: We may disclose your information to
                        comply with applicable laws, regulations, or legal
                        proceedings.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeContent === 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-8 sm:px-6 py-4">
                  <div className="flex justify-center items-center sm:border-r-2 sm:pr-6">
                    <img
                      src="/images/data.png"
                      alt="Logo"
                      className="h-[300px] w-[300px] "
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-2xl mb-3 font-extrabold text-neutral tracking-tight mt-5 sm:text-3xl sm:mt-0">
                      Data Security
                    </h1>
                    <div className="border-b-2 mb-4 border-gray-300 "></div>
                    <p className="text-sm text-gray-600">
                      We do not sell or rent your personal information. We may
                      share information with third parties only in the following
                      circumstances:
                    </p>
                    <div className="mt-4 ">
                      <p className="">
                        We use industry-standard security measures to protect
                        your personal information. However, no data transmission
                        or storage system is completely secure. While we strive
                        to use commercially acceptable means to protect your
                        personal information, we cannot guarantee its absolute
                        security.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeContent === 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-8 sm:px-6 py-4">
                  <div className="flex justify-center items-center sm:border-r-2 sm:pr-6">
                    <img
                      src="/images/contact.png"
                      alt="Logo"
                      className="h-[300px] w-[300px]"
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-2xl mb-3 font-extrabold text-neutral tracking-tight mt-5 sm:text-3xl sm:mt-0">
                      Contact Us
                    </h1>
                    <div className="border-b-2 mb-4 border-gray-300 "></div>
                    <p className="text-sm text-gray-600">
                      We respect your privacy and do not sell or rent your
                      personal information. If you reach out to us, we may share
                      your details with third parties only under the following
                      conditions:
                    </p>
                    <div className="mt-4 ">
                      <p className="">
                        We use industry-standard security measures to protect
                        the information you provide when sending us an email.
                        However, no email transmission or storage system is
                        completely secure. While we make every effort to use
                        commercially acceptable methods to safeguard your
                        information, we cannot guarantee its absolute security.
                      </p>
                    </div>
                    <div className="mt-4 ">
                      <p className="">
                        Email:
                        <span className="font-bold tracking-[1px] mx-2">
                          bagongbarrio.edu.ph
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
