import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";
import { MdOutlineEditNote } from "react-icons/md";

// authentication api
import auth from "../../../_lib/api/auth";

export const Route = createFileRoute("/student/termsOfuse/Terms")({
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
  component: Terms,
});

export default function Terms() {
  return (
    <>
      <Nav />
      <div className="w-full max-w-[1300px] mx-auto h-auto">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-4 sm:px-6 sm:py-6">
            <div className="mt-4">
              <h1
                className="tracking-[1px] text-[32px] sm:text-[36px] md:text-[46px] font-black"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                Terms & Conditions
              </h1>
              <p className="text-xs text-gray-500 mx-2 mt-2">
                Last Updated: November 7, 2024
              </p>
              <div className="border-b-2 mt-4 mx-2"></div>
              <p className="text-[16px] mt-4 text-[#4C5055] leading-relaxed mx-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
                laudantium iusto, dolore nostrum similique obcaecati? Ipsa
                pariatur mollitia voluptatibus itaque? Itaque mollitia voluptate
                ipsum hic iste sed sequi id ducimus.
              </p>
              <div className="mt-5 mx-2">
                <button
                  className="bg-primary px-5 py-2 rounded-md shadow-md text-white font-bold tracking-[1px] transition-all duration-300 ease-in-out hover:bg-opacity-80"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Read More
                </button>
              </div>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box max-w-2xl  p-4">
                  <h3 className="font-extrabold tracking-[1px] text-4xl">
                    Terms & Condition
                  </h3>
                  <p className="text-xs text-gray-500 mx-2 mt-2">
                    Last Updated: November 7, 2024
                  </p>
                  <div className="border-b-2 mt-3 mx-2"></div>
                  <p className="py-4 mx-2">
                    Press ESC key or click the button below to close
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>

            <div className="flex justify-center items-center">
              <img
                src="/images/terms.png"
                className="w-full h-auto object-cover rounded-md"
                alt="Terms Image"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
