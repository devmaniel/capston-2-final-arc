import { createFileRoute } from '@tanstack/react-router'

import auth from "../../../_lib/api/auth";

import Add_account_landing from '../../../_lib/views/admin/manage_lrn/Add_account_landing';

export const Route = createFileRoute('/admin/manage_lrn/Add_Student')({
    beforeLoad: async () => {
        const role = "admin";
        const authResult = await auth(role);
    
        if (authResult.success) {
          if (authResult.role !== role) {
            console.log(`Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`);
            throw redirect({ to: authResult.role === 'student' ? '/student' : '/login' });
          }
          // Proceed if session is valid and roles match
          return {};
        } else {
          // Handle redirection based on the reason provided by the auth function
          switch (authResult.reason) {
            case 'session_not_found':
            case 'invalid_session':
            case 'expired_session':
              console.log(`Error reason: ${authResult.reason}`);
              throw redirect({ to: '/login' });
            case 'role_mismatch':
              console.log(`Role mismatch. Redirecting to: ${role === 'admin' ? '/student' : '/admin'}`);
              throw redirect({ to: role === 'admin' ? '/student' : '/admin' });
            default:
              console.log(`Unexpected error reason: ${authResult.reason}`);
              throw redirect({ to: '/login' });
          }
        }
      },
  component: () => <Add_account_landing />
})