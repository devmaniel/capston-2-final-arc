import { useState } from "react";
import ColorMode from "../../colors/colorMode";

// api
import axios from "../../api/axios";

import { Link } from "@tanstack/react-router";

// screen register
import RegState1 from "../screen/register/RegState1";
import RegState2 from "../screen/register/RegState2";
import RegState3 from "../screen/register/RegState3";
import RegState4 from "../screen/register/RegState4";
import RegState5 from "../screen/register/RegState5";

export default function Register() {
  const [formUI, setFormUI] = useState(1); // Default to 1 for testing

  const [form1s, setForm1] = useState({ lrn: "" });
  const [errorlrn, setErrorLRN] = useState("");
  const [loading, setLoading] = useState("");
  const [otpTimer, setOtpTimer] = useState("");

  const [mailOtpID, setMailOTPID] = useState();
  const [form2s, setForm2] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    phoneNumber: "9123374089",
    email: "",
    password: "",
  });

  const [erroracc, setErrorAcc] = useState("");

  const [form3s, setForm3] = useState({
    firstName: form2s.firstName,
    lastName: form2s.lastName,
    email: "",
    otp: "",
    phoneNumber: "",
  });

  const [errorEmailOTP, setErrorEmailOTP] = useState("");
  const [timer, setTimer] = useState("");

  const [form4s, setForm4] = useState({
    otp: "",
    phoneNumber: form2s.phoneNumber,
  });
  const [errorPhoneOTP, setErrorPhoneOTP] = useState("");

  function handleInput(value, field) {
    console.log(value);
    setForm2((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function HandleOTP(value) {
    console.log(value);
    setForm3((prevState) => ({
      ...prevState,
      otp: value,
    }));
  }

  function HandlePhoneOTP(value) {
    console.log(value);
    setForm4((prevState) => ({
      ...prevState,
      otp: value,
    }));
  }

  function HandleSubmit(step) {
    setFormUI(step);
  }

  function HandleSetLRN(value) {
    setForm1((prevState) => ({ ...prevState, lrn: value }));
  }

  function Form1HandleSubmit(e) {
    e.preventDefault();

    if (!form1s.lrn.trim()) {
      console.log("Form cannot be submitted, fields are empty.");
      setErrorLRN("Please enter your LRN.");
      setLoading(false); // End loading immediately
      return;
    }

    setLoading(true); // Start loading

    axios
      .post("/register/post-lrn", form1s)
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        switch (response.data.errorState) {
          case "account-exist":
            // Set error and wait for 2 seconds before hiding loading state
            setTimeout(() => {
              setErrorLRN("Account already exists.");
              setLoading(false); // End loading after error display
            }, 2000);
            break;
          case "invalid-input":
            // Set error and wait for 2 seconds before hiding loading state
            setTimeout(() => {
              setErrorLRN("Invalid LRN.");
              setLoading(false); // End loading after error display
            }, 2000);
            break;
          case null:
            console.log("The LRN is valid and user does not exist.");
            setErrorLRN(""); // Clear any existing errors
            // Add a 2-second delay before calling setFormUI
            setTimeout(() => {
              setFormUI(2);
              setLoading(false); // End loading after UI state changes
            }, 2000);
            return; // Prevent setting loading state to false immediately
          default:
            // Handle unexpected error
            setTimeout(() => {
              setErrorLRN("An unexpected error occurred.");
              setLoading(false); // End loading after error display
            }, 2000);
        }
      })
      .catch((error) => {
        console.error(
          "Error status:",
          error.response ? error.response.status : "Unknown"
        );
        console.error("Error message:", error.message);
        setTimeout(() => {
          setErrorLRN("server-error");
          setLoading(false); // End loading after error display
        }, 2000);
      });
  }

  // Function to handle form submission
  function Form2HandleSubmit(e) {
    e.preventDefault();

    // Ensure middle name is set to null if it's empty
    const postData = {
      ...form1s,
      ...form2s,
      middleName: form2s.middleName.trim() === "" ? null : form2s.middleName,
    };

    console.log("Sending data:", postData);

    setLoading(true); // Start loading

    axios
      .post("/register/post-otp", postData)
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 202 && response.data.valid_lrn) {
          // Store the OTP ID from the server response
          setMailOTPID(response.data.otp_id);
          console.log("Stored OTP ID:", response.data.otp_id);

          // Update form3s using values from form2s once the POST is successful
          setForm3((prevForm3) => ({
            ...prevForm3,
            email: form2s.email,
            phoneNumber: form2s.phoneNumber,
          }));

          // Add a 2-second delay before starting the OTP timer
          setTimeout(() => {
            // Initialize OTP timer after the loading state ends
            setOtpTimer(240); // Set timer to 60 seconds
            const timerInterval = setInterval(() => {
              setOtpTimer((prevTime) => {
                if (prevTime <= 1) {
                  clearInterval(timerInterval);
                  return 0;
                }
                return prevTime - 1;
              });
            }, 1000); // Decrement timer every second

            setFormUI(3); // Move to the OTP form
            setLoading(false); // End loading after UI state changes
          }, 2000); // Optional delay for better UX
        } else if (response.status === 202 && !response.data.valid_lrn) {
          // Invalid credentials
          setTimeout(() => {
            setErrorAcc("Invalid credentials. Please check your details.");
            setLoading(false); // End loading after error display
          }, 2000);
        } else {
          // Unexpected response
          setTimeout(() => {
            setErrorAcc("Unexpected response. Please try again.");
            setLoading(false); // End loading after error display
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(
          "Error status:",
          error.response ? error.response.status : "Unknown"
        );
        console.error("Error message:", error.message);

        setTimeout(() => {
          if (error.response && error.response.status === 400) {
            setErrorAcc(
              "Email is already in use. Please use a different email."
            );
          } else if (error.response && error.response.status === 500) {
            setErrorAcc("Internal Server Error. Please try again later.");
          } else if (error.response && error.response.status === 404) {
            setErrorAcc("Server is down. Please try again later.");
          } else {
            setErrorAcc("An error occurred. Please try again.");
          }
          setLoading(false); // End loading after error display
        }, 2000); // Optional delay for better UX
      });
  }

  // Function to handle form submission
  function Form3HandleSubmit(e) {
    e.preventDefault();
    console.log(form3s);
    console.log("Stored State OTP ID:", mailOtpID);

    // Check if OTP field is empty
    if (!form3s.otp.trim()) {
      console.log("Form cannot be submitted, fields are empty.");
      setErrorEmailOTP("Please enter the OTP.");
      setLoading(false); // End loading immediately
      return;
    }

    // Set loading state before making the request
    setLoading(true);

    // Perform the OTP verification request, including mailOtpID in the request body
    axios
      .post("/register/verify-otp", { ...form3s, mailOtpID })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        // Handle valid OTP response
        if (response.data.valid_otp) {
          console.log("OTP is valid.");
          setErrorEmailOTP(""); // Clear any existing errors

          // Add a 2-second delay before moving to the next step
          setTimeout(() => {
            setFormUI(4); // Move to the next step if OTP is valid
            setLoading(false); // End loading after UI state changes
          }, 2000);

          // Start the OTP timer after the loading state ends
          setTimeout(() => {
            setOtpTimer(240); // Initialize OTP timer
          }, 2000); // Delay to match UI state change
        } else {
          // Handle invalid OTP response
          setTimeout(() => {
            setErrorEmailOTP("Invalid OTP code. Please try again.");
            setLoading(false); // End loading after error display
            setOtpTimer(240); // Reset OTP timer on error
          }, 2000);
        }
      })
      .catch((error) => {
        const status = error.response ? error.response.status : "Unknown";
        console.error("Error status:", status);
        console.error("Error message:", error.message);

        let errorMessage = "An unknown error occurred. Please try again.";
        if (status === 401) {
          errorMessage = "OTP expired. Please request a new one.";
        } else if (status === 404) {
          errorMessage = "Invalid OTP. Please check and try again.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        }

        // Handle errors
        setTimeout(() => {
          setErrorEmailOTP(errorMessage);
          setLoading(false); // End loading after error display
          setOtpTimer(240); // Reset OTP timer on error
        }, 2000);
      });
  }

  function Form4HandleSubmit(e) {
    e.preventDefault();

    if (!form4s.otp || !form4s.phoneNumber) {
      setErrorPhoneOTP("Please fill in all required fields."); // Match this error with RegState4
      return;
    }

    setLoading(true);

    axios
      .post("/register/verify-phone", { ...form1s, ...form2s, ...form4s })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200 && response.data.valid_phone_otp) {
          setTimeout(() => {
            setFormUI(5);
            setLoading(false);
          }, 2000);
        } else if (response.status === 400) {
          if (response.data.valid_phone_otp === false) {
            setTimeout(() => {
              setErrorPhoneOTP(
                "Invalid or expired OTP. Please request a new OTP and try again."
              ); // Match this error with RegState4
              setLoading(false);
              setOtpTimer(240); // Reset OTP timer on error
            }, 2000);
          } else {
            setTimeout(() => {
              setErrorPhoneOTP("Invalid OTP. Please check and try again."); // Match this error with RegState4
              setLoading(false);
            }, 2000);
          }
        } else {
          setTimeout(() => {
            setErrorPhoneOTP("An unknown error occurred. Please try again."); // Match this error with RegState4
            setLoading(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(
          "Error status:",
          error.response ? error.response.status : "Unknown"
        );
        console.error("Error message:", error.message);

        setTimeout(() => {
          if (error.response?.status === 404) {
            setErrorPhoneOTP("Server error. Please try again later."); // Match this error with RegState4
          } else if (error.response?.status === 400) {
            if (error.response.data.valid_phone_otp === false) {
              setErrorPhoneOTP(
                "Invalid or expired OTP. Please request a new OTP and try again."
              ); // Match this error with RegState4
              setOtpTimer(240); // Reset OTP timer on error
            } else {
              setErrorPhoneOTP("Invalid OTP. Please check and try again."); // Match this error with RegState4
            }
          } else {
            setErrorPhoneOTP("An unknown error occurred. Please try again."); // Match this error with RegState4
          }
          setLoading(false);
        }, 2000);
      });
  }

  let formComponent;

  // Conditional rendering logic
  if (formUI === 1) {
    formComponent = (
      <RegState1
        postProps={form1s.lrn}
        setLRN={HandleSetLRN}
        handleSubmit={Form1HandleSubmit}
        loadinglrn={loading}
        error={errorlrn}
      />
    );
  } else if (formUI === 2) {
    formComponent = (
      <RegState2
        postProps={form2s}
        setInput={handleInput}
        handleSubmit={Form2HandleSubmit}
        loading={loading}
        error={erroracc}
      />
    );
  } else if (formUI === 3) {
    formComponent = (
      <RegState3
        handleOTP={HandleOTP}
        handleSubmit={Form3HandleSubmit}
        error={errorEmailOTP}
        loading={loading}
        otpTimer={otpTimer}
        resentOTP={Form2HandleSubmit}
      />
    );
  } else if (formUI === 4) {
    formComponent = (
      <RegState4
        handleOTP={HandlePhoneOTP}
        handleSubmit={Form4HandleSubmit}
        error={errorPhoneOTP}
        otpTimer={otpTimer}
        loading={loading}
        resentOTP={Form3HandleSubmit}
      />
    );
  } else if (formUI === 5) {
    formComponent = <RegState5 />;
  }

  return (
    <>
      <div className="p-5 absolute right-0">
        <ColorMode />
      </div>
      
      <div className="w-full">
        <div className=" gap-5 mt-2 m-auto flex items-center justify-center">
          <h1 className="text-xl font-extrabold   text-center text-neutral  ">
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

        {formComponent}

        <ul className="mt-[-20px] text-sm mb-10 text-center text-base-content flex justify-center gap-5">
        <Link to="/privacy">Privacy</Link> |
          <Link to="/about">About BBSHS Library</Link> |
          <Link to="/login">Want to Login Account?</Link>
        </ul>
      </div>
    </>
  );
}
