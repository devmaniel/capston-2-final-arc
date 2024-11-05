import { createFileRoute } from "@tanstack/react-router";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
export const Route = createFileRoute("/change_password")({
  component: () => Change_Password_Component(),
});

import axios from "../_lib/api/axios";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import ColorMode from "../_lib/colors/colorMode";
import Swal from "sweetalert2";

function Change_Password_Component() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    // Extract the otpCode from the URL query parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("verf_code");
    setOtpCode(code); // Set the OTP code state
  }, []);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log("OTP CODE", otpCode);

  // Password strength validation function
  const isStrongPassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/;
    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  // Password match validation
  const passwordMatched = () => {
    return (
      password !== "" && confirmPassword !== "" && password === confirmPassword
    );
  };

  // Password strength note
  const passwordNote = password ? (
    isStrongPassword(password) ? (
      <p className="italic text-green-500 text-xs mt-3">Strong Password</p>
    ) : (
      <p className="italic text-error text-xs mt-3">
        Note: Password must be at least 8 characters, include a capital letter,
        a number, and a special character.
      </p>
    )
  ) : (
    <p className="italic text-base-100 text-xs mt-3">
      Note: This field is required and cannot be left blank. Please enter a
      strong password with at least 8 characters, including upper and lower case
      letters, numbers, and special characters.
    </p>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isStrongPassword(password) && passwordMatched()) {
      setIsLoading(true);

      try {
        // Show loading modal
        Swal.fire({
          title: "Processing...",
          html: "Please wait while we change your password.",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Make the POST request to change the password
        const response = await axios.post(`/forgot_password_change`, {
          otpCode: otpCode,
          changePassword: password,
        });

        // Wait for 1.5 seconds before showing success message
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message and redirect after OK is clicked
        Swal.fire({
          icon: "success",
          title: "Password Changed Successfully",
          text: response.data.message,
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect to the login page after the user clicks "OK"
          window.location.href = "http://localhost:5173/login";
        });
      } catch (error) {
        // Handle error response
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      // Handle validation errors
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please ensure your passwords match and are strong.",
        confirmButtonText: "OK",
      });
    }
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
          onSubmit={handleSubmit}
          className="mb-12 flex flex-col items-center"
        >
          <div className="bg-neutral text-base-100 p-5 rounded-lg mt-4 w-[400px] relative">
            <label htmlFor="password" className="font-black">
              New Password:
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setIsPasswordTouched(true)}
              className={`bg-white text-black border-2 ${
                isPasswordTouched && password === ""
                  ? "border-error"
                  : "border-base-100"
              }`}
            />
            <span
              className="absolute right-9 my-5 sm:my-7 items-center transform -translate-y-1/2 cursor-pointer"
              style={{ zIndex: 1 }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaEye className="text-black" />
              ) : (
                <FaEyeSlash className="text-black" />
              )}
            </span>

            {passwordNote}

            <label htmlFor="confirm_password" className="font-black">
              Confirm Password:
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="Enter Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setIsConfirmPasswordTouched(true)}
              className={`bg-white text-black border-2 ${
                isConfirmPasswordTouched &&
                (!passwordMatched() || confirmPassword === "")
                  ? "border-error"
                  : "border-base-100"
              }`}
            />
            <span
              className="absolute right-9 my-0 sm:my-7 items-center transform -translate-y-1/2 cursor-pointer"
              style={{ zIndex: 1 }}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <FaEye className="text-black" />
              ) : (
                <FaEyeSlash className="text-black" />
              )}
            </span>

            {/* Show error message if passwords do not match, or success message if they do */}
            {!passwordMatched() && confirmPassword && (
              <p className="italic text-error text-xs mt-3">
                Note: Must be the same as the new password.
              </p>
            )}
            {passwordMatched() && confirmPassword && (
              <p className="italic text-green-500 text-xs mt-3">
                Password matched
              </p>
            )}

            <button
              type="submit"
              disabled={
                (password === "" && confirmPassword === "") || // Check if both fields are empty
                !isStrongPassword(password) || // Check if the password is not strong
                !passwordMatched() // Check if passwords do not match
              }
              className={`w-full font-bold text-base p-1.5 rounded mt-5 ${
                (password === "" && confirmPassword === "") ||
                !isStrongPassword(password) ||
                !passwordMatched()
                  ? "bg-gray-300 text-black cursor-not-allowed"
                  : "bg-base-100 text-neutral"
              }`}
            >
              Submit
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
