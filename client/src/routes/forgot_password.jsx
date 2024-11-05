import { createFileRoute } from "@tanstack/react-router";
import ColorMode from "../_lib/colors/colorMode";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import axios from "../_lib/api/axios";

export const Route = createFileRoute("/forgot_password")({
  component: () => Forgot_Password(),
});

function Forgot_Password() {
  const [email, setEmail] = useState("");
  const [successState, setSuccessState] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailError(!emailRegex.test(value));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (isEmailError || !email) return; // Early return if there's an error

    setLoading(true); // Set loading to true when starting the request

    // Delay the API request for 1.5 seconds
    setTimeout(async () => {
        try {
            // Await server response
            const response = await axios.post("/forgot_password", { email });

            // Treat a successful response (200) as success
            if (response.status === 200) {
                setSuccessState(true); // Update success state if request is successful
            }
        } catch (error) {
            // Check if the error response is a 404
            if (error.response && error.response.status === 404) {
                setSuccessState(true); // Update success state if a 404 error occurs
            }
            // Log the error (optional)
            console.error("Error:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false); // Ensure loading is reset after the request
        }
    }, 1500); // 1500 milliseconds = 1.5 seconds
};

  
  

  return (
    <>
      <div className="p-5 absolute right-0">
        <ColorMode />
      </div>

      <div className="w-full">
        <div className="gap-5 mt-2 m-auto flex items-center justify-center">
          <h1 className="text-xl font-extrabold text-center text-neutral">
            Sign in to
            <br />
            BBSHS library
          </h1>
          <img
            src="/images/logo.png"
            className="mb-5 mt-5 h-[100px] rounded-[50%] bg-[white]"
            alt="Bagong Barrio Senior Highschool Library"
          />
        </div>

        <form
          className="mb-12 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="bg-neutral text-base-100 p-5 rounded-lg mt-4 w-[400px]">
            {successState && (
              <p className="font-bold text-sm text-primary  mt-3 mb-2">
                If your email matches an existing account we will send you a
                username recovery email within a few minutes. If you have not
                received an email check your spam folder.
              </p>
            )}

            <label htmlFor="email" className="font-black">
              Email Address:
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={email}
              onChange={handleEmailChange}
              className={`bg-white text-black border-2 ${
                isEmailError ? "border-error" : "border-base-100"
              }`}
            />
            <p className="font-medium text-xs mt-3 mb-2 italic text-base-100">
              Note: This field is required and cannot be left blank. Please
              enter a valid email address.
            </p>

            <button
              type="submit"
              className={`w-full bg-base-100 text-neutral font-bold text-base p-1.5 rounded mt-5 ${
                loading || isEmailError ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading || isEmailError}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs mt-[8px]"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        <ul className="mt-[-20px] text-sm mb-10 text-center text-base-content flex justify-center gap-5">
          <Link to="/privacy">Privacy</Link> |
          <Link to="/about">About BBSHS Library</Link> |
          <Link to="/login">Want to Login Account?</Link>
        </ul>
      </div>
    </>
  );
}

export default Forgot_Password;
