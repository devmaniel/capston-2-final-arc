import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";

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
      <div className="w-full max-w-[1300px] mx-auto">
        <div className="p-4">
          <div>
            <h1 className="font-bold tracking-wide text-2xl mb-2">
              Our Terms & Condition
            </h1>
            <p className="text-sm my-1 mb-1 text-gray-600">
              Quick answers to questions you may have. Can't find what you're
              looking for?
            </p>
            <div className="border-b-2 mt-2"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
