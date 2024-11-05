import React, { useState } from "react";
import { TiRefresh } from "react-icons/ti";

const RegState3 = ({
  handleSubmit,
  handleOTP,
  loading,
  error,
  otpTimer,
  resentOTP,
}) => {
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let errorMessage = "";
  let errorClass = "bg-error"; // Default error styling
  // Determine error message and class based on the provided error
  if (error === "Please enter the OTP.") {
    errorMessage = "Please fill in the required email OTP fields";
    errorClass = "bg-error"; // Error styling for empty OTP
  } else if (error === "OTP expired. Please request a new one.") {
    errorMessage = error;
    errorClass = "bg-yellow-700"; // Warning styling for expired OTP
  } else if (error === "Invalid OTP. Please check and try again.") {
    errorMessage = error;
    errorClass = "bg-error"; // Error styling for invalid OTP
  } else if (error === "Server error. Please try again later.") {
    errorMessage = error;
    errorClass = "bg-yellow-700"; // Warning styling for server issues
  } else if (error === "An unknown error occurred. Please try again.") {
    errorMessage = error;
    errorClass = "bg-error"; // Default error styling for unknown errors
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

  const getBorderClass = (value) => {
    if ((touched || submitted) && value.trim() === "") {
      return "border-red-500";
    }
    return "border-base-100";
  };

  const getLabelClass = (value) => {
    if ((touched || submitted) && value.trim() === "") {
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
        <div className="bg-neutral text-base-100 p-5 rounded-lg mt-4  w-[500px]   ">
          <div className="flex justify-between">
            <label htmlFor="otp" className={`font-black `}>
              Verification Email OTP
            </label>{" "}
            <label htmlFor="timer" className="font-black">
              Timer: <span className="text-primary">{formattedTime}</span>
            </label>{" "}
          </div>
          {errorMessage && (
            <p
              className={`m-auto text-sm pt-3 pb-2 w-full h-10 text-white font-bold h-13 rounded-md text-center mb-2 ${errorClass}`}
            >
              {errorMessage}
            </p>
          )}
         
          <input
            type="text"
            name="otp"
            placeholder="XXXXXX"
            maxLength={6}
            className={`bg-white text-black border-2 ${getBorderClass(document.querySelector('input[name="otp"]')?.value || "")}`}
            onChange={(e) => handleOTP(e.target.value)}
            onBlur={handleBlur}
          />{" "}
          {(touched || submitted) && document.querySelector('input[name="otp"]')?.value.trim() === "" && (
            <p className="text-red-500 text-sm mt-1 italic">Note: OTP is required</p>
          )}
           <p 
            className="flex gap-1 mt-3 ml-[310px] w-[150px] items-center border-b border-primary  text-primary text-sm text-center  p-0 justify-end cursor-pointer"
            onClick={resentOTP}
          >
            Resend the otp <TiRefresh />{" "}
          </p>
          <button
            type="submit"
            className="w-full bg-base-100 text-neutral font-bold text-base p-1.5 rounded mt-3 "
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? "Validating..." : "Submit"}
          </button>
          <i className="text-sm">
            Note: Please enter the OTP code from your email
          </i>
        </div>
        <ul className="steps mt-10 text-base-content">
          <li className="step step-primary">Enter Valid LRN</li>
          <li className="step step-primary">Validate Information</li>
          <li className="step step-primary">Verify Email</li>
          <li className="step">Verify phone number</li>
          <li className="step">Account Created</li>
        </ul>
      </form>
    </>
  );
};

export default RegState3;