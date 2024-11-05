import { createFileRoute, redirect } from "@tanstack/react-router";
import auth from "../../../_lib/api/auth";
import Index_table from "../../../_lib/views/screen/admin/manage_student/Index_table";
import Student_View_Form_Page from "../../../_lib/views/screen/admin/manage_student/Student_View_Form_Page"; // Make sure to import your component

export const Route = createFileRoute("/admin/manage_students/")({
  beforeLoad: async (context) => { // Use context to get params
    const role = "admin";
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
      return { student_id: context.params.student_id }; // Pass student_id to the component
    } else {
      // Handle redirection based on the reason provided by the auth function
      switch (authResult.reason) {
        case "session_not_found":
        case "invalid_session":
        case "expired_session":
          console.log(`Error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
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
  component: ({ student_id }) => <Index_table student_id={student_id} />  , // Pass student_id to Index_table
});
