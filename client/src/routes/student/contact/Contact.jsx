import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { FaBuilding } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

// authentication api
import auth from "../../../_lib/api/auth";


export const Route = createFileRoute("/student/contact/Contact")({
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
  component: Contact,
});

export default function Contact() {
  return (
    <>
      <Nav />
      <div className="w-full max-w-[1300px] mx-auto mb-10">
        <div className="p-4">
          <div className="mb-4 text-center">
            <h1 className="font-bold tracking-wide text-2xl mb-2">
              Get in Touch
            </h1>
            <p className="text-sm text-gray-600 w-[70%] mx-auto">
              We value your feedback and are here to assist you! If you have any
              questions, concerns, or suggestions, please don't hesitate to
              reach out to us. You can contact us through the following methods:
            </p>
            <div className="border-b-2 border-gray-300 mt-2"></div>
          </div>

          <div className="bg-white h-auto w-full shadow-md rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
              <div className="bg-primary text-white p-4 h-auto rounded-md ">
                <h1 className="text-4xl my-2 text-[#ffffff] font-bold">
                  Contact Information
                </h1>
                <p className="text-[12px] my-2 text-white">
                  For any inquiries or support, please use the following contact
                  information:
                </p>

                <div className="mx-auto items-center text-center my-5">
                  <div className="bg-[#5A9FD8] p-4 w-fit items-center text-center mx-auto mb-3 rounded-md">
                    <FaBuilding className="text-[20px]" />
                  </div>
                  <h1 className="font-bold text-[19px] tracking-[1px]">
                    School information:
                  </h1>
                  <p className="text-xs my-1">
                    Bagong Barrior Senior High School
                  </p>
                </div>

                <div className="mx-auto items-center text-center my-10">
                  <div className="bg-[#5A9FD8] p-4 w-fit items-center text-center mx-auto mb-3 rounded-md">
                    <FaLocationArrow className="text-[20px]" />
                  </div>
                  <h1 className="font-bold text-[19px] tracking-[1px]">
                    Address:
                  </h1>
                  <p className="text-xs my-1">
                    MX5X+WC2, Tirad pass cor, De Jesus, Bagong Barrio West,
                    Caloocan, 1400 Kalakhang Maynila
                  </p>
                </div>

                <div className="mx-auto items-center text-center my-10">
                  <div className="bg-[#5A9FD8] p-4 w-fit items-center text-center mx-auto mb-3 rounded-md">
                    <IoCall className="text-[20px]" />
                  </div>
                  <h1 className="font-bold text-[19px] tracking-[1px]">
                    Call Us:
                  </h1>
                  <p className="text-xs my-1">
                    Call us to speak to a member of our team. We are always
                    happy to help. <br />
                    <br />
                    <span className="font-bold tracking-[1px] text-[16px]">
                      09123123122
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid col-span-1 md:col-span-2">
                <div className="p-4">
                  <h1 className="text-4xl my-2 text-[#333333] font-bold">
                    Still need help?
                  </h1>

                  <div className="mt-5">
                    <form className="text-[#333333]">
                      <label>
                        Your email address{" "}
                        <span className="text-gray-600">
                          (So we can reply to you)
                        </span>
                      </label>
                      <label className="input input-bordered border flex items-center gap-2 mt-2 bg-[#F5F5F5] mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                          type="text"
                          className="grow"
                          placeholder="Email"
                        />
                      </label>

                      <label>Subject</label>
                      <label className="input input-bordered border flex items-center gap-2 mt-2 bg-[#F5F5F5]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                          type="text"
                          className="grow"
                          placeholder="Let us know how we can help you"
                        />
                      </label>

                      <div class="space-y-2 mt-4">
                        <label
                          class="block text-sm font-medium text-gray-700"
                          for="message"
                        >
                          Your Message
                        </label>

                        <textarea
                          id="message"
                          class="textarea textarea-bordered w-full p-3 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="Type your message here"
                          rows="4"
                        ></textarea>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="terms-checkbox"
                          className="checkbox"
                          aria-label="I agree to the terms of service"
                        />
                        <label
                          htmlFor="terms-checkbox"
                          className="text-sm text-gray-700"
                        >
                          By submitting this form, you confirm that you have
                          read and agree to our
                          <a
                            href="/terms"
                            className="text-blue-500 hover:underline mx-1"
                          >
                            Terms of Service
                          </a>
                          <span className="">and</span>
                          <a
                            href="/privacy"
                            className="text-blue-500 hover:underline mx-1"
                          >
                            Privacy Statement
                          </a>
                          .
                        </label>
                      </div>

                      <div className="mt-10 w-full">
                        <button className="bg-primary w-full px-4 rounded-md text-white font-bold">
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
