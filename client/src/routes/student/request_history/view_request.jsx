
import View_Request_Page from '../../../_lib/views/request_history/View_Request_Page'

import { createFileRoute, redirect } from '@tanstack/react-router';
import auth from '../../../_lib/api/auth';

export const Route = createFileRoute('/student/request_history/view_request')({
  validateSearch: (search) => {
    const requestId = search.request_id ? parseInt(search.request_id) : undefined
    
    // Validate that requestId exists
    if (!requestId) {
      throw redirect({ 
        to: '/student/request_history'  // Redirect to history page if no request_id
      });
    }
    
    return {
      request_id: requestId,
    }
  },

  beforeLoad: async ({ search }) => {
    const role = "student";
    const authResult = await auth(role);

    if (authResult.success) {
      // Check if role matches
      if (authResult.role !== role) {
        console.log(
          `Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`
        );
        // Redirect to admin view with the request_id if role is admin
        throw redirect({
          to: `/admin/manage_request/view_request_form?requestId=${search.request_id}`
        });
      }
      return {}; // Return empty object if auth succeeds
    }

    // Handle different auth failure scenarios
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
  },

  component: () => <View_Request_Page />
});