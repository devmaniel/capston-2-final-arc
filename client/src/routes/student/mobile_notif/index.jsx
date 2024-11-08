import { createFileRoute } from "@tanstack/react-router";
import Nav from "@_lib/views/screen/student/common/Nav";
import { BsThreeDots } from "react-icons/bs";

import { Link } from "@tanstack/react-router";

// authentication api
import auth from "../../../_lib/api/auth";

export const Route = createFileRoute("/student/mobile_notif/")({
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
  component: () => index(),
});

import { useAxiosNotifications } from "../../../_lib/hook/useAxiosNotifications";
import { formatDistanceToNow } from "date-fns"; // Library to format time

export default function index() {
  const { loading, data, counter, error } = useAxiosNotifications();
  if (loading) return <div>Loading...</div>;

  console.log("Notifications Data", data);

  return (
    <>
      <div>
        <Nav />
        <div className="w-full max-w-[1300px] mx-auto ">
          <div className="p-5">
            <div className="flex items-center justify-between ">
              <h1 className="font-bold">Notifications</h1>
              <BsThreeDots />
            </div>
            <ul className=" flex py-3 text-[12px] mx-3">
              <li>All</li>
              <li className="mx-2">Unread</li>
            </ul>
            <div>
              <h1 className="text-[12px]">New</h1>
            </div>

            {data && data.length > 0 ? (
              data.map((notification, index) => (
                <div key={index} className="notif my-2 text-black">
                  <div
                    className={`bg-white w-auto h-auto rounded shadow-sm ${
                      !notification.isRead ? "bg-opacity-90" : "bg-opacity-50"
                    }`}
                  >
                    <Link to={notification.href} className="flex mb-3 p-2">
                      <img
                        src="/images/logo.png"
                        className="h-12 object-cover bg-white rounded-[50%]"
                        alt="BBSHS Logo"
                      />
                      <div className="my-2 mx-4 flex-1 overflow-hidden">
                        <div className="flex text-black">
                          <h1 className="text-[12px] font-bold">BBSHS</h1>
                          <h1 className="text-[12px] mx-1 truncate">
                            {notification.descriptions}
                          </h1>
                        </div>
                        <div className="flex justify-between items-center">
                          <h1 className="text-[12px] text-primary">
                            {formatDistanceToNow(
                              new Date(notification.createdAt)
                            )}{" "}
                            ago
                          </h1>

                          <button
                            className="p-1 rounded-full"
                            aria-label="More options"
                          >
                            <BsThreeDots className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="notif my-4 w-full max-w-md mx-auto text-center">
                <div className="rounded-lg overflow-hidden">
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
          </div>
        </div>
      </div>
    </>
  );
}
