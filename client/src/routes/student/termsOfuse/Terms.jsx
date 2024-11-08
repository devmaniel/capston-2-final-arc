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
              <dialog id="my_modal_1" className="modal backdrop-blur-md">
                <div className="modal-box max-w-2xl  p-4">
                  <h3 className="font-extrabold tracking-[1px] text-4xl">
                    Terms & Condition
                  </h3>
                  <p className="text-xs text-gray-500 mx-2 mt-2">
                    Last Updated: November 7, 2024
                  </p>
                  <div className="border-b-2 mt-3 mx-2"></div>
                  <p className="py-4 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      1. Acceptance of Terms
                    </span>
                    <br />
                    By creating an account, logging in, or otherwise accessing
                    our library system, you agree to abide by these Terms of Use
                    and any other policies or guidelines we post.
                  </p>
                  <p className="py-2 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      2. User Responsibilities
                    </span>
                    <br />
                    <span className="text-[12px] text-gray-600">
                      You agree to use Bagong Barrio Senior High School website
                      responsibly and ethically. This includes, but is not
                      limited to, the following:
                    </span>
                    <p className="py-2 ">
                      <span className="font-bold">
                        Providing Accurate Information:
                      </span>
                      You agree to provide accurate, complete, and up-to-date
                      information when creating an account.
                    </p>
                    <p className="py-2 ">
                      <span className="font-bold">
                        Maintaining Account Security:
                      </span>{" "}
                      You are responsible for maintaining the confidentiality of
                      your account credentials and all activities under your
                      account.
                    </p>
                    <p className="py-2 ">
                      <span className="font-bold">Compliance with Laws:</span>{" "}
                      You agree to use the library system in compliance with all
                      applicable laws and regulations. Respecting Intellectual
                      Property: You may not copy, distribute, or otherwise use
                      library resources in a manner that infringes on copyright
                      or other intellectual property rights.
                    </p>
                  </p>
                  <p className="py-2 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      3. Library Materials and Content
                    </span>
                    <br />
                    <p className="py-2 ">
                      <span className="font-bold">Access to Materials:</span>{" "}
                      The library system grants you access to a wide range of
                      materials, including digital books, journals, and other
                      resources. You may use these materials for personal,
                      non-commercial purposes. Restrictions on Use: You may not
                      reproduce, distribute, or exploit any content available in
                      our library without explicit permission, except as
                      permitted by copyright law or under license terms.
                    </p>
                  </p>
                  <p className="py-2 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      4. Prohibited Activities
                    </span>
                    <br />
                    <span className="text-[12px] text-gray-600">
                      You agree to use Bagong Barrio Senior High School website
                      responsibly and ethically. This includes, but is not
                      limited to, the following:
                    </span>
                    <p className="py-2 ">
                      <span className="font-bold">Unauthorized Access:</span>{" "}
                      Attempting to access another user’s account or restricted
                      areas of the system without authorization.
                    </p>
                    <p className="py-2 ">
                      <span className="font-bold">Automated Systems:</span>{" "}
                      Using bots, scrapers, or other automated means to access
                      or interfere with the library system.
                    </p>
                    <p className="py-2 ">
                      <span className="font-bold">Disruptive Behavior:</span>{" "}
                      Engaging in activities that may disrupt, damage, or
                      interfere with the library system or its security.  
                    </p>
                  </p>
                  <p className="py-2 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      5. Termination of Use
                    </span>
                    <br />
                    <span className="my-2">
                      We reserve the right to terminate or suspend your access
                      to the library system at our discretion, without notice,
                      for any behavior that violates these Terms of Use or
                      otherwise disrupts the library services.
                    </span>
                  </p>
                  <p className="py-2 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      6. Privacy and Data Collection
                    </span>
                    <br />
                    <span className="my-2">
                      We collect and handle personal information according to
                      our Privacy Policy. By using our library system, you agree
                      to the terms outlined in the Privacy Policy.
                    </span>
                  </p>
                  <p className="py-2 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      7. Disclaimers and Limitation of Liability
                    </span>
                    <br />
                    <p className="py-2 ">
                      <span className="font-bold">Service Availability:</span>{" "}
                      We do not guarantee uninterrupted access to our library
                      system and may modify or discontinue services without
                      notice.
                    </p>
                    <p className="py-2 ">
                      <span className="font-bold">
                        Disclaimer of Warranties:
                      </span>{" "}
                      The library system is provided “as is,” and we make no
                      warranties or representations regarding the accuracy,
                      completeness, or reliability of the system and its
                      content.
                    </p>
                    <p className="py-2 ">
                      <span className="font-bold">
                        Limitation of Liability:
                      </span>{" "}
                      To the fullest extent permitted by law, Bagong Barrio
                      Senior High School Library System shall not be liable for
                      any damages arising out of or in connection with your use
                      or inability to use the library system.
                    </p>
                  </p>
                  <p className="py-2 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      8. Changes to the Terms
                    </span>
                    <br />
                    <span className="my-2">
                      We may update these Terms of Use from time to time. We
                      will notify users of any significant changes by posting
                      the updated terms on our website and indicating the
                      “Effective Date.” Continued use of the system after any
                      changes constitutes acceptance of the updated terms.
                    </span>
                  </p>
                  <p className="py-2 mx-2">
                    <span className="font-bold tracking-[1px] mb-3">
                      9. Contact Information
                    </span>
                    <br />
                    <span className="my-2">
                      If you have questions about these Terms of Use, please
                      contact us at: <span className="font-bold">bagongbarrioshs.edu.ph</span>
                    </span>
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">
                        I agree to the terms & conditions.
                      </button>
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
