import { createFileRoute, redirect } from "@tanstack/react-router";

// common components
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "@_lib/views/screen/student/common/Footer";
import About from "@_lib/views/screen/student/About/About";

import { Link, useMatch, useNavigate } from "@tanstack/react-router";
// styles
import "@styles/student/AboutPage.scss";

import auth from "../../../_lib/api/auth";

export const Route = createFileRoute("/student/about/")({
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
        case "pending_violations":  // Handle pending violations here
          console.log("User has pending violations. Redirecting to /violations_page");
          throw redirect({ to: "/violations_page" });
        case "role_mismatch":
          console.log(
            `Role mismatch. Redirecting to: ${role === "admin" ? "/student" : "/admin"}`
          );
          throw redirect({ to: role === "admin" ? "/student" : "/admin" });
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }
  },
  component: () => AboutPage(),
});

function AboutPage() {
  return (
    <>
      <Nav />

      <About/>

      <Footer />
    </>
  );
}

