import { createFileRoute, redirect } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { BsThreeDots } from "react-icons/bs";
import { React, useState } from "react";
//screens
import Nav from "../../../_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";

// authentication api
import auth from "../../../_lib/api/auth";

export const Route = createFileRoute("/student/notifications/")({
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
      // Handle redirection based on the reason provided by the auth function
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
  component: () => Notifications(),
});

export default function Notifications() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <Nav />
      <div className="w-[1300px] mx-auto text-base-100 ">
        <div className="bg-neutral h-[auto] w-[500px] shadow-xl mx-auto my-10 p-5 rounded-lg">
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Notifications</h1>
            <BsThreeDots />
          </div>
          <ul className="text-base-100 flex py-5 text-[14px]">
            <li>All</li>
            <li className="mx-5">Unread</li>
          </ul>
          <div>
            <h1 className="text-[12px]">Earlier</h1>
          </div>
          <div className="notif my-2">
            <div className="bg-neutral w-[auto] h-auto rounded">
              <div className="flex mb-3">
                <img src="/images/logo.png" className="h-12" />
                <div className="my-2 mx-4  overflow-hidden">
                  <div className="flex">
                    <h1 className="text-[12px] font-bold">BBSHS</h1>
                    <h1 className="text-[12px] mx-1 truncate">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eaque perferendis error nostrum vitae amet sunt cupiditate
                      laboriosam fugiat mollitia rerum blanditiis porro
                      architecto, quia deserunt quasi ea, provident veniam.
                      Libero.
                    </h1>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[12px] text-primary">1h ago</h1>
                    <BsThreeDots />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isExpanded && (
            <>
              <div className="notif my-2">
                <div className="bg-neutral w-[auto] h-auto rounded">
                  <div className="flex mb-3">
                    <img src="/images/logo.png" className="h-12" />
                    <div className="my-2 mx-4  overflow-hidden">
                      <div className="flex">
                        <h1 className="text-[12px] font-bold">BBSHS</h1>
                        <h1 className="text-[12px] mx-1 truncate">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eaque perferendis error nostrum vitae amet sunt
                          cupiditate laboriosam fugiat mollitia rerum blanditiis
                          porro architecto, quia deserunt quasi ea, provident
                          veniam. Libero.
                        </h1>
                      </div>
                      <div className="flex justify-between items-center">
                        <h1 className="text-[12px] text-primary">1h ago</h1>
                        <BsThreeDots />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <ul className="text-base-100 flex py-5 text-[14px]">
            <li className="text-center mx-auto text-base-100 list-item-none">
              <button
                className="text-[12px] hover:underline text-base-100 px-2 rounded flex items-center"
                onClick={handleToggle}
              >
                {isExpanded ? "View less" : "View more"}
              </button>
            </li>
          </ul>
        </div>{" "}
      </div>
    </>
  );
}
