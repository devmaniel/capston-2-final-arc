import React, { useState } from "react";
import { TiRefresh } from "react-icons/ti";

const RegState4 = ({
  handleSubmit,
  handleOTP,
  loading,
  error,
  otpTimer,
  resentOTP,
}) => {
  const [touched, setTouched] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  let errorMessage = "";
  let errorClass = "bg-error"; // Default error styling
  if (error === "Please fill in all required fields.") {
    errorMessage = "Please fill in all required fields."; // Match with Form4HandleSubmit
  } else if (error === "Invalid OTP. Please check and try again.") {
    errorMessage = error; // No need to change here, just match
  } else if (
    error === "Invalid or expired OTP. Please request a new OTP and try again."
  ) {
    errorMessage = error; // Message for invalid or expired OTP
    errorClass = "bg-error"; // Custom styling for invalid or expired OTP
  } else if (error === "Server error. Please try again later.") {
    errorMessage = error; // No need to change here, just match
    errorClass = "bg-yellow-700"; // Warning styling for server issues
  } else if (error === "An unknown error occurred. Please try again.") {
    errorMessage = error; // No need to change here, just match
  }

  // Format the otpTimer into mm:ss format
  const minutes = Math.floor(otpTimer / 60);
  const seconds = otpTimer % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const handleBlur = () => {
    setTouched(true);
  };

  const handleChange = (e) => {
    setOtpValue(e.target.value);
    handleOTP(e.target.value);
  };

  const getBorderClass = () => {
    if ((touched || submitted) && otpValue.trim() === "") {
      return "border-red-500";
    }
    return "border-base-100";
  };

  const getLabelClass = () => {
    if ((touched || submitted) && otpValue.trim() === "") {
      return "text-red-500";
    }
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    handleSubmit(e);
  };

  return (
    <>
      <form className="mb-12 flex flex-col  items-center" onSubmit={onSubmit}>
        <div className="bg-neutral text-base-100 p-5 rounded-lg mt-4    w-[500px] ">
          <div className="flex justify-between">
            <label htmlFor="otp" className={`font-black`}>
              Verification Phone OTP
            </label>{" "}
            <label htmlFor="timer" className="font-black">
              Timer: <span className="text-primary">{formattedTime}</span>
            </label>{" "}
          </div>
          {errorMessage && (
            <p
              className={`m-auto text-sm pt-3 pb-2 w-full h-13 text-white font-bold rounded-md text-center mb-2 ${errorClass}`}
            >
              {errorMessage}
            </p>
          )}
          <input
            type="text"
            name="otp"
            placeholder="XXXXXX"
            maxLength={6}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`bg-white text-black border-2 ${getBorderClass()}`}
          />{" "}
          {(touched || submitted) && otpValue.trim() === "" && (
            <p className="text-red-500 text-sm mt-1 italic">Note: OTP is required</p>
          )}
          <button
            type="submit"
            className="w-full bg-base-100 text-neutral font-bold text-base p-1.5 rounded mt-5 "
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? "Validating..." : "Submit"}
          </button>
          <p
            className="flex gap-1 mt-3 ml-[310px] w-[150px] items-center border-b border-primary  text-primary text-sm text-center  p-0 justify-end cursor-pointer"
            onClick={resentOTP}
          >
            Resend the otp <TiRefresh />{" "}
          </p>
          <i className="text-sm">
            Note: Please enter the OTP code from your phone number
          </i>
        </div>
        <ul className="steps mt-10 text-base-content">
          <li className="step step-primary">Enter Valid LRN</li>
          <li className="step step-primary">Validate Information</li>
          <li className="step step-primary">Verify Email</li>
          <li className="step step-primary">Verify phone number</li>
          <li className="step">Account Created</li>
        </ul>
      </form>
    </>
  );
};

export default RegState4;