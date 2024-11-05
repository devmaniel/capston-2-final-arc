import { createFileRoute, redirect } from "@tanstack/react-router";

// screens

import { IoIosCloseCircleOutline } from "react-icons/io";

import Footer from "../../../_lib/views/screen/student/common/Footer";
import Nav from "@_lib/views/screen/student/common/Nav";
import Categories from "@_lib/views/screen/student/catalog/Categories";

import auth from "../../../_lib/api/auth";

import Bookmark from "../../../_lib/views/screen/student/Bookmark/bookmark";
import RequestOut from "../../../_lib/views/screen/student/Bookmark/RequestOut";


import { useState } from "react";

export const Route = createFileRoute("/student/bookmark/")({
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
  component: () => <Bookmark />,
});
