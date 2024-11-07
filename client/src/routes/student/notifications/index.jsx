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

import { useAxiosNotifications } from "../../../_lib/hook/useAxiosNotifications";
import { formatDistanceToNow } from "date-fns"; // Library to format time

export default function Notifications() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { loading, data, error } = useAxiosNotifications();

  if (loading) return <div>Loading...</div>;

  console.log("Notifications Data", data);

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

          {data && data.length > 0 ? (
        data.map((notification, index) => (
          <div key={index} className="notif my-2">
            <div
              className={`bg-neutral w-auto h-auto rounded ${
                !notification.isRead ? "bg-opacity-90" : "bg-opacity-50"
              }`}
            >
              <div className="flex mb-3">
                <img
                  src="/images/logo.png"
                  className="h-12"
                  alt="BBSHS Logo"
                />
                <div className="my-2 mx-4 flex-1 overflow-hidden">
                  <div className="flex">
                    <h1 className="text-xs font-bold">BBSHS</h1>
                    <h1 className="text-xs mx-1 truncate">
                      {notification.descriptions}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xs text-primary">
                      {formatDistanceToNow(new Date(notification.createdAt))} ago
                    </h1>
                    <button
                      className="p-1 hover:bg-gray-200 rounded-full"
                      onClick={() => setIsExpanded(!isExpanded)}
                      aria-label="More options"
                    >
                      <BsThreeDots className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="notif my-4 w-full max-w-md mx-auto">
          <div className="rounded-lg text-center overflow-hidden">
            <img
              src="/images/logo.png"
              alt="Company Logo"
              className="mx-auto h-24 w-24 mb-4"
            />
            <h1 className="text-lg font-bold text-gray-800">
              No notifications yet.
            </h1>
            <p className="text-gray-500 mt-2">
              Stay tuned! Notifications will appear here when available.
            </p>
          </div>
        </div>
      )}

          
        </div>{" "}
      </div>
    </>
  );
}
