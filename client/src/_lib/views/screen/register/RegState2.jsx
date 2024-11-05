import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const RegState2 = ({
  postProps,
  setInput,
  handleSubmit,
  loading,
  error,
  fielderror,
}) => {
  const [touched, setTouched] = useState({
    lastName: false,
    firstName: false,
    middleName: false,
    phoneNumber: false,
    email: false,
    password: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  let errorMessage = "";
  let errorClass = "bg-error"; // Default error styling

  if (error === "Please enter your LRN.") {
    errorMessage = error;
    errorClass = "bg-error"; // Warning styling for empty input
  } else if (error === "Account already exists.") {
    errorMessage = error;
    errorClass = "bg-error"; // Error styling for existing account
  } else if (error === "Invalid LRN.") {
    errorMessage = error;
    errorClass = "bg-error"; // Error styling for invalid LRN
  } else if (error === "Invalid credentials. Please check your details.") {
    errorMessage = error;
    errorClass = "bg-error"; // Error styling for invalid credentials
  } else if (error === "server-error") {
    errorMessage = "An error occurred. Please try again.";
    errorClass = "bg-yellow-700"; // Warning styling for server issues
  } else if (error === "Server is down. Please try again later.") {
    errorMessage = error;
    errorClass = "bg-warning"; // Warning styling for server down
  } else if (error) {
    errorMessage = error;
    errorClass = "bg-error"; // Default error styling for unknown errors
  }

  // Validation variables
  const isFirstNameEmpty = postProps.firstName.trim() === "";
  const isLastNameEmpty = postProps.lastName.trim() === "";
  const isPhoneNumberEmpty = postProps.phoneNumber.trim() === "";
  const isEmailEmpty = postProps.email.trim() === "";
  const isPasswordEmpty = postProps.password.trim() === "";

  // Simple regex for email and phone number validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberRegex = /^\+\d{11,}$/;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-()#^])[A-Za-z\d@$!%*?&_\-()#^]{8,}$/;

  // Validation errors
  const emailError = !emailRegex.test(postProps.email) && !isEmailEmpty;
  const phoneNumberError =
    !phoneNumberRegex.test(postProps.phoneNumber) && !isPhoneNumberEmpty;
  const passwordError =
    isPasswordEmpty || !strongPasswordRegex.test(postProps.password);
  const firstNameError = isFirstNameEmpty;
  const lastNameError = isLastNameEmpty;

  const getBorderClass = (field) => {
    if (touched[field] || submitted) {
      switch (field) {
        case "lastName":
          return lastNameError ? "border-red-500" : "";
        case "firstName":
          return firstNameError ? "border-red-500" : "";
        case "phoneNumber":
          return phoneNumberError || isPhoneNumberEmpty ? "border-red-500" : "";
        case "email":
          return emailError || isEmailEmpty ? "border-red-500" : "";
        case "password":
          return passwordError ? "border-red-500" : "";
        default:
          return "";
      }
    }
    return "";
  };

  // Strong password validation regex

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setInput(password, "password");

    if (strongPasswordRegex.test(password)) {
      setPasswordStrength("Strong password");
    } else if (password.length >= 8 && /[A-Z]/.test(password)) {
      setPasswordStrength(
        "Medium password. Your password must have a numeric and special characters."
      );
    } else {
      setPasswordStrength(
        "Weak password. Your password must be at least 8 characters long and include an uppercase letter."
      );
    }
  };

  //Password Percentage
  const getPasswordStrengthPercentage = (strength) => {
    switch (strength) {
      case "Strong password":
        return "100%";
      case "Medium password. Your password must have a numeric and special characters.":
        return "50%";
      case "Weak password. Your password must be at least 8 characters long and include an uppercase letter.":
        return "25%";
      default:
        return "0%";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Check if the email is empty
    if (isEmailEmpty) {
      // Set error message for empty email
      errorMessage = "Email cannot be empty.";
      errorClass = "bg-error"; // Error styling for empty email
      return; // Prevent submission
    }

    // Existing validation for password strength
    if (
      passwordStrength ===
        "Weak password. Your password must be at least 8 characters long and include an uppercase letter." ||
      passwordStrength ===
        "Medium password. Your password must have a numeric and special characters."
    ) {
      return; // Prevent submission if password is weak or medium
    }

    // Proceed with form submission
    handleSubmit(e);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mb-12 flex flex-col items-center">
        <div className="bg-neutral text-base-100 p-5 w-[1000px] rounded-lg">
          {error && (
            <p
              className={`m-auto w-full text-sm pt-2 pb-2 text-white ${errorClass} font-bold h-13 rounded-md text-center`}
            >
              {error}
            </p>
          )}

          <div className="grid grid-cols-3 gap-4">
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="font-medium">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className={`bg-white text-black border border-base-100 w-full ${getBorderClass("lastName")}`}
                value={postProps.lastName}
                onChange={(e) => setInput(e.target.value, "lastName")}
                onBlur={() => handleBlur("lastName")}
              />
              {(touched.lastName || submitted) && lastNameError && (
                <span className="text-sm text-red-500 italic mt-2">
                  Note: Last name is required
                </span>
              )}
            </div>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="font-medium">
                First Name:
              </label>
              <input
                value={postProps.firstName}
                onChange={(e) => setInput(e.target.value, "firstName")}
                onBlur={() => handleBlur("firstName")}
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`bg-white text-black border border-base-100 w-full ${getBorderClass("firstName")}`}
              />
              {(touched.firstName || submitted) && firstNameError && (
                <span className="text-sm text-red-500 italic mt-2">
                  Note: First name is required
                </span>
              )}
            </div>
            {/* Middle Name */}
            <div>
              <label htmlFor="middleName" className="font-medium">
                Middle Name:
              </label>
              <input
                value={postProps.middleName}
                onChange={(e) => setInput(e.target.value, "middleName")}
                onBlur={() => handleBlur("middleName")}
                type="text"
                name="middleName"
                placeholder="Middle Name (optional)"
                className="bg-white text-black border border-base-100 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="font-medium block">
                Phone Number:
              </label>
              <div className="relative flex items-center">
                <span className="bg-base-100 text-neutral absolute left-0 rounded-l-md flex items-center px-2 h-full">
                  <img
                    src="/icon/philippines-svgrepo-com.svg"
                    alt="philippines-svgrepo-com.svg"
                    className="h-5"
                  />
                  &nbsp;+63
                </span>
                <input
                  value={postProps.phoneNumber}
                  onChange={(e) => setInput(e.target.value, "phoneNumber")}
                  onBlur={() => handleBlur("phoneNumber")}
                  type="text"
                  name="phoneNumber"
                  placeholder="+63xxxxxxxxxx"
                  className={`bg-white text-black border border-base-100 pl-[80px] w-full ${getBorderClass("phoneNumber")}`}
                />
              </div>
              {(touched.phoneNumber || submitted) && isPhoneNumberEmpty && (
                <span className="text-sm text-red-500 italic mt-2">
                  Note: Phone number is required
                </span>
              )}
              {(touched.phoneNumber || submitted) && phoneNumberError && (
                <span className="text-sm text-red-500 italic mt-2">
                  Note: Phone number format is invalid
                </span>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="font-medium">
                Email:
              </label>
              <input
                value={postProps.email}
                onChange={(e) => setInput(e.target.value, "email")}
                onBlur={() => handleBlur("email")}
                type="text"
                name="email"
                placeholder="Email"
                className={`bg-white text-black border border-base-100 w-full ${getBorderClass("email")}`}
              />
              {(touched.email || submitted) && isEmailEmpty && (
                <span className="text-sm text-red-500 italic mt-2">
                  Note: Email is required and need to be valid
                </span>
              )}
              {(touched.email || submitted) && emailError && (
                <span className="text-sm text-red-500 italic mt-2">
                  Note: Email format is invalid
                </span>
              )}
            </div>
          </div>
          {/* Password Section */}
          <div className="mt-4 relative">
            <label htmlFor="password" className="font-medium">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={postProps.password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur("password")}
              name="password"
              placeholder="Password"
              className={`bg-white text-black border border-base-100 w-full pr-12 ${getBorderClass("password")}`}
            />
            <span
              className={`absolute right-3 my-0 sm:my-7 items-center transform -translate-y-1/2 cursor-pointer`}
              style={{ zIndex: 1 }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaEye className="text-black" />
              ) : (
                <FaEyeSlash className="text-black" />
              )}
            </span>

            {postProps.password && (
              <>
                <div className="w-full bg-gray-300 rounded h-2 mt-4">
                  <div
                    className={`h-full rounded transition-all duration-300 ${
                      passwordStrength === "Strong password"
                        ? "bg-green-500"
                        : passwordStrength === "Medium password"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{
                      width: getPasswordStrengthPercentage(passwordStrength),
                    }}
                  />
                </div>
                <span
                  className={`text-sm ${
                    passwordStrength === "Strong password"
                      ? "text-green-500"
                      : passwordStrength === "Medium password"
                        ? "text-white"
                        : "text-red-500"
                  }`}
                >
                  {isPasswordEmpty
                    ? ""
                    : passwordStrength ===
                        "Weak password. Your password must be an 8 characters or longer password."
                      ? "Weak password. Your password must be at least 8 characters long."
                      : passwordStrength}
                </span>
              </>
            )}

            {(touched.password || submitted) && isPasswordEmpty && (
              <span className="text-sm text-red-500 italic mt-2">
                Note: Password is required
              </span>
            )}

            <p className="text-[13px] text-gray-600 italic ">
              Note: Please use a strong password (at least 8 characters with a
              mix of letters, uppercase, numbers, and special characters) to
              proceed.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-base-100 text-neutral font-bold text-base p-1.5 rounded mt-3"
            disabled={loading || passwordStrength !== "Strong password"}
          >
            {loading ? "Validating..." : "Submit"}
          </button>



          <i className="text-[13px] text-gray-600">
            Note: Must be valid account setup.
          </i>
        </div>

        <ul className="steps mt-10 text-base-content">
          <li className="step step-primary">Enter Valid LRN</li>
          <li className="step step-primary">Validate Information</li>
          <li className="step">Verify Email</li>
          <li className="step">Verify Phone Number</li>
          <li className="step">Account Created</li>
        </ul>


      </form>
    </>
  );
};

export default RegState2;
