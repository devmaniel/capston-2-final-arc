import React, { useState } from "react";
import axios from "../../../../api/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-()])[A-Za-z\d@$!%*?&_\-()]{8,}$/;

const Password_Change_Dialog = ({ lrnvalue }) => {
  const [postPasswordChange, setPostPasswordChange] = useState({
    lrn: lrnvalue,
    current: "",
    newPass: "",
    samePass: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [touched, setTouched] = useState({
    current: false,
    newPass: false,
    samePass: false,
  });

  const [errors, setErrors] = useState({
    current: "",
    newPass: "",
    samePass: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    newPass: false,
    samePass: false,
  });

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPostPasswordChange((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "newPass") {
      if (strongPasswordRegex.test(value)) {
        setPasswordStrength("Strong password");
      } else if (value.length >= 8) {
        setPasswordStrength(
          "Medium password: include uppercase, number, and special character."
        );
      } else {
        setPasswordStrength(
          "Weak password: must be at least 8 characters long."
        );
      }
    }

    if (name === "samePass") {
      if (value !== postPasswordChange.newPass) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
  
    if (!postPasswordChange.current) {
      newErrors.current = "Current password cannot be empty.";
    }
  
    if (!postPasswordChange.newPass) {
      newErrors.newPass = "New password cannot be empty.";
    } else if (!strongPasswordRegex.test(postPasswordChange.newPass)) {
      newErrors.newPass =
        "New password must include uppercase letters, lowercase letters, numbers, and special characters.";
    }
  
    if (postPasswordChange.current === postPasswordChange.newPass) {
      newErrors.newPass = "New password cannot be the same as the current password.";
    }
  
    if (!postPasswordChange.samePass) {
      newErrors.samePass = "Confirm password cannot be empty.";
    } else if (postPasswordChange.newPass !== postPasswordChange.samePass) {
      newErrors.samePass = "Passwords do not match.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default behavior
    if (validateForm()) {
      setIsLoading(true); // Set loading state to true

      // Simulate a delay before making the API call
      setTimeout(() => {
        axios
          .post("/student/change_pass", postPasswordChange)
          .then((response) => {
            console.log("Password change successful:", response.data);
            setPasswordChangeSuccess(true); // Set success message state to true
          })
          .catch((error) => {
            console.error("Error changing password:", error);
            if (error.response && error.response.data) {
              setErrors({ current: error.response.data.message }); // Set error from server response
            }
            setPasswordChangeSuccess(false); // Reset success message state on error
          })
          .finally(() => {
            setIsLoading(false); // Reset loading state
          });
      }, 2000); // 2 seconds delay
    }
  };

  return (
    <dialog id="my_modal_passwordchange" className="modal backdrop-blur-lg">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Change Password</h3>
        <p className="text-[12px] my-1 text-gray-500">
          Update your password associated with your account.
        </p>

        {passwordChangeSuccess && (
          <p className="text-sm mt-2 text-green-600 italic">
            Your password has been changed successfully.
          </p>
        )}

        <div className="text-black my-2 gap-5 w-full">
          <div className="mb-10 gap-6">
            {/* Current Password */}
            <label className="form-control w-full relative mb-5">
              <span
                className={`label-text mb-2 ${errors.current ? "text-error" : ""}`}
              >
                Current Password
              </span>
              <div className="flex items-center">
                <input
                  type={showPassword.current ? "text" : "password"}
                  name="current"
                  value={postPasswordChange.current}
                  onChange={handlePasswordChange}
                  onBlur={handleBlur}
                  placeholder="Type here"
                  className={`input input-bordered w-full bg-white ${
                    errors.current ? "border-error border-4" : ""
                  }`}
                />
                <span
                  className="cursor-pointer absolute right-0 mx-4"
                  onClick={() => toggleShowPassword("current")}
                >
                  {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.current && (
                <span className="text-error italic font-thin">
                  {errors.current}
                </span>
              )}
            </label>

            {/* New Password */}
            <label className="form-control w-full relative mb-5">
              <span
                className={`label-text mb-2 ${errors.newPass ? "text-error " : ""}`}
              >
                New Password
              </span>
              <div className="flex items-center">
                <input
                  type={showPassword.newPass ? "text" : "password"}
                  name="newPass"
                  value={postPasswordChange.newPass}
                  onChange={handlePasswordChange}
                  onBlur={handleBlur}
                  placeholder="Type here"
                  className={`input input-bordered w-full bg-white ${
                    errors.newPass ? "border-error border-4" : ""
                  }`}
                />
                <span
                  className="cursor-pointer absolute right-0 mx-4"
                  onClick={() => toggleShowPassword("newPass")}
                >
                  {showPassword.newPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.newPass && (
                <span className="text-red-500 italic text-[12px] leading-normal my-2 font-thin">
                  {errors.newPass}
                </span>
              )}
              <span
                className={`text-sm mt-1 ${
                  passwordStrength === "Strong password"
                    ? "text-green-500"
                    : passwordStrength.includes("Medium")
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {passwordStrength}
              </span>
            </label>

            {/* Confirm Password */}
            <label className="form-control w-full relative mb-5">
              <span
                className={`label-text mb-2 ${errors.samePass || confirmPasswordError ? "text-error" : ""}`}
              >
                Confirm Password
              </span>
              <div className="flex items-center">
                <input
                  type={showPassword.samePass ? "text" : "password"}
                  name="samePass"
                  value={postPasswordChange.samePass}
                  onChange={handlePasswordChange}
                  onBlur={handleBlur}
                  placeholder="Type here"
                  className={`input input-bordered w-full bg-white ${
                    errors.samePass || confirmPasswordError
                      ? "border-error border-4"
                      : ""
                  }`}
                />
                <span
                  className="cursor-pointer absolute right-0 mx-4"
                  onClick={() => toggleShowPassword("samePass")}
                >
                  {showPassword.samePass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              
              {confirmPasswordError && (
                <span className="text-error italic font-thin">
                  {confirmPasswordError}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-base-100 absolute right-5 top-5 bg-neutral">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Password_Change_Dialog;
