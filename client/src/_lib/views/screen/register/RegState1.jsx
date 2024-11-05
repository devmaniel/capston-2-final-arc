import { useState } from "react";

export default function RegisterForm({
  postProps,
  setLRN,
  loadinglrn,
  handleSubmit,
  error,
}) {
  const [isTouched, setIsTouched] = useState(false); // Track whether the field was touched
  let errorMessage = "";
  let errorClass = "bg-error"; // Default class

  if (error === "Please enter your LRN." && isTouched) {
    errorMessage = error;
    errorClass = "bg-error"; // Warning styling for empty input
  } else if (error === "Account already exists.") {
    errorMessage = error;
    errorClass = "bg-error"; // Error styling for existing account
  } else if (error === "Invalid LRN.") {
    errorMessage = error;
    errorClass = "bg-error"; // Error styling for invalid LRN
  } else if (error === "server-error") {
    errorMessage = "An error occurred. Please try again.";
    errorClass = "bg-yellow-700"; // Error styling for server issues
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsTouched(true); // Mark the field as touched on form submission
          handleSubmit(e);
        }}
        className="mb-12 flex flex-col items-center"
      >
        <div className="bg-neutral text-base-100 p-5 rounded-lg mt-4 w-[400px]">
          <label htmlFor="lrn" className="font-black">
             Learner Reference Number (LRN):
          </label>

          {errorMessage && (
            <p
              className={`m-auto ${errorClass} w-full text-sm pt-2 mb-2 pb-2 text-white font-bold h-13 rounded-md text-center `}
            >
              {errorMessage}
            </p>
            
          )}

          <input
            value={postProps}
            onChange={(e) => {
              setLRN(e.target.value);
              setIsTouched(true); // Mark the field as touched when the user types
            }}
            onBlur={() => setIsTouched(true)} // Mark as touched when the input loses focus
            type="text"
            name="lrn"
            placeholder="Learner Reference Number"
            className={`bg-white text-black border-2 ${
              postProps.trim() === "" && isTouched
                ? "border-error"
                : "border-base-100"
            }`}
          />

          {postProps.trim() === "" && isTouched && (
            <p className="font-medium text-sm mt-3 mb-2 italic text-red-500">
              Note: This field is required and cannot be left blank. Please
              enter a LRN.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-base-100 text-neutral font-bold text-base p-1.5 rounded mt-5"
            disabled={loadinglrn} // Disable button while loading
          >
            {loadinglrn ? "Validating..." : "Submit"}
          </button>

          <i className="text-sm">Note: Must be Enrolled LRN on BBSHS</i>
        </div>

        <ul className="steps mt-10 text-base-content">
          <li className="step step-primary">Enter Valid LRN</li>
          <li className="step">Validate Information</li>
          <li className="step">Verify Email</li>
          <li className="step">Verify Phone Number</li>
          <li className="step">Account Created</li>
        </ul>
      </form>
    </>
  );
}
