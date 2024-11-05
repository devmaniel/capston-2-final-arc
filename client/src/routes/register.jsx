import { createFileRoute, redirect } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import RegisterUI from "../_lib/views/register/page";

export const Route = createFileRoute('/register')({
  component: () => <RegisterUI />,
  beforeLoad: () => {
    // Check if the sessionId cookie exists
    const sessionId = Cookies.get('sessionId');

    if (sessionId) {
      // Redirect to /student if sessionId cookie is present
      throw redirect({
        to: '/student',
      });
    }
    // If sessionId is not present, proceed to render RegisterUI
  },
});
