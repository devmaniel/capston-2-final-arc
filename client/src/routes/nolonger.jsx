import { createFileRoute, redirect } from "@tanstack/react-router";
import React from "react";
import auth from "../_lib/api/auth";

export const Route = createFileRoute("/nolonger")({
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
          console.log("User is unenrolled. Proceeding to NoLonger page");
          return {}; // Proceed to render the NoLonger page instead of redirecting
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }
  },
  component: nolonger,
});


import useLogout from "../_lib/api/logout";

export default function nolonger() {
  const { logout, loading, error } = useLogout();

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
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              href="/login"
              className="  font-semibold text-lg text-neutral hover:underline"
            >
              Logout
              {error && <p className="error">{error}</p>}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
