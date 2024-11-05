import { createFileRoute, redirect } from "@tanstack/react-router";

import auth from "../_lib/api/auth";

export const Route = createFileRoute("/violations_page")({
  beforeLoad: async () => {
    const role = "student";
    const authResult = await auth(role);

    if (authResult.success) {
      if (authResult.role !== role) {
        console.log(`Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`);
        throw redirect({
          to: authResult.role === "student" ? "/student" : "/login",
        });
      }
      // If the user is authenticated and has the correct role, but doesn't have pending violations,
      // redirect them to the student page
      if (authResult.reason !== "pending_violations") {
        throw redirect({ to: "/student" });
      }
      // If the user has pending violations, allow them to proceed to this page
      return {};
    } else {
      // Handle authentication failures
      switch (authResult.reason) {
        case "session_not_found":
        case "invalid_session":
        case "expired_session":
          console.log(`Error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
        case "role_mismatch":
          console.log(`Role mismatch. Redirecting to: ${role === "admin" ? "/student" : "/admin"}`);
          throw redirect({ to: role === "admin" ? "/student" : "/admin" });
        case "pending_violations":
          // If the user has pending violations, allow them to proceed to this page
          return {};
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }
  },
  component: () => Violations_Page(),
});

import useLogout from "../_lib/api/logout";

function Violations_Page() {
  const { logout, loading, error } = useLogout();
  return (
    <>
      <div className="relative h-32  w-[70%] float-end text-base-100">
        <div
          className="bg-gradient-to-b from-sky-500 to-sky-600 shadow-xl h-56 absolute inset-x-0 top-0"
          style={{
            borderBottomLeftRadius: "200px",
            borderBottomRightRadius: "100%",
          }}
        ></div>
      </div>

      <div className="relative h-screen  w-[60%] ...">
        <div
          className="absolute bottom-0 left-0 h-56 w-[300px] shadow-xl bg-gradient-to-b from-sky-500 to-sky-600"
          style={{
            borderBottomRightRadius: "60%",
            borderTopRightRadius: "300px",
          }}
        ></div>
      </div>

      <div className="w-full max-w-[1300px] mx-auto absolute inset-0 my-3">
        <div className="flex justify-center items-center w-full">
          <img
            src="/public/images/vio.png"
            className="h-[300px] w-auto object-cover"
          />
        </div>
        <div className="text-center w-[40%] mx-auto">
          <p className="font-[600] text-sm tracking-[1px]">
            Violation detected on your account.
          </p>

          <div className="border-b-2 border-secondary my-2 mb-2"></div>
          <div className="bg-gray-100 p-3 rounded-md ">
            <p className="text-sm text-gray-700 tracking-[1px] text-justify">
              We’ve detected a violation related to your library account that
              requires immediate attention. Please review our library policies
              to understand the issue. <span className="font-black">For further assistance, contact our
              library support team directly. Your prompt response will help us
              resolve this matter quickly.
                </span> 
            </p>
          </div>
          
         
          <div className="">
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="bg-gradient-to-l from-blue-400 text-white to-blue-500 my-3 w-full btn p-2 hover:bg-blue-600  rounded"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
