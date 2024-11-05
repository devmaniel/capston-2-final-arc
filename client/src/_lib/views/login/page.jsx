import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import LoginForm from "../screen/login/LoginForm";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "../../api/axios";

import ColorMode from "../../colors/colorMode";

import { Link } from "@tanstack/react-router";

export default function HomeLogin() {
  const [loginForm, setLoginForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (name, value) => {
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const postLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowToast(false); // Hide toast when attempting to log in

    try {
      const response = await axios.post("/test/jwt-login", loginForm);

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        Cookies.set("sessionId", response.data.sessionId, { expires: 1 });

        const userRole = response.data.role;
        if (userRole === "student") {
          window.location.href = "/student";
        } else if (userRole === "admin") {
          window.location.href = "/admin";
        } else {
          setError("Unexpected user role.");
          setShowToast(true);
        }
      } else {
        setError("Unexpected response from the server.");
        setShowToast(true);
      }
    } catch (err) {
      let errorMessage;

      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Invalid LRN or password.";
        } else {
          errorMessage = "Login failed. Please try again later.";
        }
      } else if (err.request) {
        errorMessage = "Server is down. Please try again later.";
      } else {
        errorMessage = "An unexpected error occurred.";
      }

      setError(errorMessage);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <>
      <div className="p-5 absolute right-0">
        <ColorMode />
      </div>

      <div className="w-full">
        <div className="gap-5  m-auto flex items-center justify-center">
          <h1
            className="animate-slidein opacity-0 text-xl font-extrabold text-center text-neutral"
            style={{ animationDelay: "100ms" }}
          >
            Sign in to
            <br />
            BBSHS library
          </h1>

          <img
            src="/images/logo.png"
            style={{ animationDelay: "200ms" }}
            className="mb-5 mt-5 h-[100px] rounded-[50%] bg-[white] animate-slidein opacity-0 "
            alt="Bagong Barrio Senior Highschool Library"
          />
        </div>
        <LoginForm
          loginForm={loginForm}
          setFormInput={handleInputChange}
          handleSubmit={postLogin}
          loadingState={loading}
        />
      </div>
      {showToast && error && (
        <div className="toast toast-bottom mb-[50px]  toast-end">
          <div className=" w-full relative bottom-0 right-0 flex items-center px-2 py-3 border-l-8 border-red-500 bg-gradient-to-b from-[#f0f9ff] to-[#fffaf0] ... text-black rounded-md shadow-lg">
            <div className="text-red-500 text-2xl mr-3">
              <IoMdCloseCircle />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Error</p>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              <IoIosCloseCircle />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
