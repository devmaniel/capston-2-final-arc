import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "@styles/login.scss";

import { Link } from "@tanstack/react-router";

export default function LoginForm({
  loginForm,
  setFormInput,
  handleSubmit,
  loadingState,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-base-100 mb-12 flex flex-col items-center"
    >
      <div
        className="w-96 p-4 bg-neutral rounded-xl mt-3 text-base-100 animate-slidein opacity-0"
        style={{ animationDelay: "300ms" }}
      >
        <label
          htmlFor="lrn"
          className="animate-slidein opacity-0"
          style={{ animationDelay: "400ms" }}
        >
          Learner References Number (LRN):
        </label>{" "}
        <br />
        <input
          type="text"
          name="lrn"
          placeholder="Enter your LRN"
          className="animate-slidein opacity-0 bg-white text-black border-2 border-base-100"
          style={{ animationDelay: "400ms" }}
          value={loginForm.lrn}
          onChange={(e) => setFormInput("lrn", e.target.value)}
        />
        <label
          htmlFor="password"
          className="animate-slidein opacity-0"
          style={{ animationDelay: "500ms" }}
        >
          Password:
        </label>{" "}
        <br />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="bg-white text-black border-2 border-base-100 animate-slidein opacity-0"
            style={{ animationDelay: "500ms" }}
            value={loginForm.password}
            onChange={(e) => setFormInput("password", e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-2 mt-3 sm:mt-none text-black"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-base-100 text-neutral font-bold text-base p-1.5 rounded mt-5"
          disabled={loadingState}
        >
          {loadingState ? "Logging in..." : "Login"}
        </button>
        <Link to="/forgot_password" className="text-sm">Forgot Password?</Link> 
        
      </div>

      
      <ul className="mt-[20px] text-sm mb-10 text-center text-base-content flex justify-center gap-5">
          <Link to="/privacy">Privacy</Link> |
          <Link to="/about">About BBSHS Library</Link> |
          <Link to="/register">Want to Register Account?</Link>
        </ul>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
