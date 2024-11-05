import { createFileRoute, redirect } from '@tanstack/react-router';
import auth from '../../../_lib/api/auth';
import Student_View_Form_Page from '../../../_lib/views/screen/admin/manage_student/Student_View_Form_Page';

export const Route = createFileRoute('/admin/manage_students/student_view_form')({
  validateSearch: (search) => {
    return {
      student_id: search.student_id,
    };
  },
  
  beforeLoad: async ({ search }) => {
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
      if (!search.student_id) {
        throw redirect({
          to: '/admin/manage_students',
          replace: true,
        });
      }
      return { student_id: search.student_id };
    } else {
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
  component: ({ student_id }) => <Student_View_Form_Page student_id={student_id} />
});