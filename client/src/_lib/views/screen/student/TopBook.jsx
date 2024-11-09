import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Swal from "sweetalert2";

import axios from "../../../api/axios";
import Cookies from "js-cookie";

import "../../../../styles/loader.css";
import { DiVim } from "react-icons/di";

export default function TopBook({ bookData }) {
  console.log(bookData);
  console.log("Already Requested", bookData.alreadyRequested);

  const {
    id,
    book_name,
    book_author,
    book_img_file,
    book_img_qr,
    isbn_code,
    classifications_name,
    publisher,
    date_of_publish,
    edition,
    quantity,
    description,
    isBookmarked,
    user, // Add user information here
  } = bookData || {}; // Ensure bookData is defined

  console.log("User Information:", user);

  console.log("BOOK DATA", bookData);

  const imagepath = `/Book Image/${book_img_file}`;
  const qrpath = `/QR Image/${book_img_qr}`;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // State to handle error

  const [postSingleForm, setPostSingleForm] = useState({
    book_id: bookData.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    pickupDate: "",
    returnDate: "",
    quantity: 1, // Initialize with a default value of 1
    comment: "",
  });
  const [expandedBookId, setExpandedBookId] = useState(null); // State to track the expanded book

  const toggleDescription = (book_id) => {
    setExpandedBookId((prevBookId) =>
      prevBookId === book_id ? null : book_id
    );
  };
  const breakDescription = (description) => {
    if (!description) return [];

    const sentences = description.split(/(?<=[.!?])\s+/); // Split by sentence-ending punctuation
    const chunks = [];

    for (let i = 0; i < sentences.length; i += 3) {
      chunks.push(sentences.slice(i, i + 3).join(" ")); // Group sentences into chunks of 3
    }

    return chunks;
  };
  // Usage in your component
  const formattedDescription = breakDescription(description);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pickupDate: "",
    returnDate: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    pickupDate: false,
    returnDate: false,
  });

  // Validate fields individually
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) {
          error = "First Name is required.";
        }
        break;
      case "lastName":
        if (!value.trim()) {
          error = "Last Name is required.";
        }
        break;
      case "email":
        if (!value || !/\S+@\S+\.\S+/.test(value)) {
          error = "A valid Email is required.";
        }
        break;
      case "pickupDate":
        if (!value) {
          error = "Pick-up Date is required.";
        } else {
          const selectedDate = new Date(value);
          const today = new Date().setHours(0, 0, 0, 0);
          const dayOfWeek = selectedDate.getDay();

          if (selectedDate < today) {
            error = "Pick-up Date cannot be in the past.";
          } else if (dayOfWeek === 6 || dayOfWeek === 0) {
            // 0 is Sunday, 6 is Saturday
            error = "Pick-up Date cannot be on a Saturday or Sunday.";
          }
        }

        break;
      case "returnDate":
        if (!value) {
          error = "Return Date is required.";
        } else if (new Date(value) < new Date(postSingleForm.pickupDate)) {
          error = "Return Date must be after Pick-up Date.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "pickupDate") {
      const pickupDate = new Date(value);
      const returnDate = new Date(pickupDate);
      returnDate.setDate(pickupDate.getDate() + 3); // Add 7 days to pickupDate

      setPostSingleForm((prevState) => ({
        ...prevState,
        pickupDate: value,
        returnDate: returnDate.toISOString().split("T")[0], // Set returnDate in YYYY-MM-DD format
      }));

      // Validate and set errors for pickupDate
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));

      // Mark the field as touched
      setTouched((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    } else {
      setPostSingleForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      // Validate and set errors for other fields
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));

      // Mark the field as touched
      setTouched((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!postSingleForm.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
      isValid = false;
    }

    if (!postSingleForm.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
      isValid = false;
    }

    if (!postSingleForm.email || !/\S+@\S+\.\S+/.test(postSingleForm.email)) {
      newErrors.email = "A valid Email is required.";
      isValid = false;
    }

    if (!postSingleForm.pickupDate) {
      newErrors.pickupDate = "Pick-up Date is required.";
      isValid = false;
    } else if (
      new Date(postSingleForm.pickupDate) < new Date().setHours(0, 0, 0, 0)
    ) {
      newErrors.pickupDate = "Pick-up Date cannot be in the past.";
      isValid = false;
    }

    if (!postSingleForm.returnDate) {
      newErrors.returnDate = "Return Date is required.";
      isValid = false;
    } else if (
      new Date(postSingleForm.returnDate) < new Date(postSingleForm.pickupDate)
    ) {
      newErrors.returnDate = "Return Date must be after Pick-up Date.";
      isValid = false;
    }

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      pickupDate: true,
      returnDate: true,
    }); // Mark all fields as touched on form submit

    return isValid;
  };

  const sessionId = Cookies.get("sessionId"); // Retrieve sessionId from cookies

  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages

  const handleSingleRequest = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // Log the data being sent in the POST request
        console.log("Posting data:", { ...postSingleForm, sessionId });

        const response = await axios.post("/student/single_request", {
          ...postSingleForm,
          sessionId,
        });

        // Close the modal dialog
        document.getElementById("my_modal_3").close();
        if (response.status === 201) {
          // Check for successful creation
          console.log("Request was successful:", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Your request was successful!",
            didOpen: () => {
              Swal.getPopup().style.zIndex = 10000;
            },
          }).then((result) => {
            // Reload the page after the modal is closed
            if (result.isConfirmed) {
              window.location.reload(); // Reload the page
            }
          });
        } else {
          console.error("Unexpected status code:", response.status);
          showErrorAlert("Unexpected error occurred.");
        }
      } catch (error) {
        // Close the modal dialog before showing error
        document.getElementById("my_modal_3").close();

        if (error.response) {
          if (error.response.status === 404) {
            console.error("404 Not Found:", error.response.data);
            showErrorAlert("Error 404: Not Found");
          } else if (error.response.status === 500) {
            console.error("500 Server Error:", error.response.data);
            showErrorAlert("Server error occurred. Please try again later.");
          } else {
            console.error("Unexpected status code:", error.response.status);
            showErrorAlert("Unexpected error occurred.");
          }
        } else if (error.request) {
          console.error("Network error:", error.request);
          showErrorAlert("Network error: Unable to reach server.");
        } else {
          console.error("Error:", error.message);
          showErrorAlert("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      customClass: {
        container: "swal-container",
      },
      didOpen: () => {
        // Apply custom styles to ensure SweetAlert is on top
        Swal.getPopup().style.zIndex = 10000; // Higher than the modal's z-index
      },
    });
  };

  const [bookmarkState, setBookmarkState] = useState(isBookmarked);

  const postBookmark = (book_id) => {
    return async () => {
      try {
        const response = await axios.post("/student/post_bookmark", {
          sessionId, // Ensure you pass the sessionId here
          book_id,
        });
        console.log("Bookmark response:", response.data);
        // Toggle the bookmark state immediately after a successful API call
        setBookmarkState((prevState) => !prevState);
      } catch (error) {
        console.error("Error posting bookmark:", error);
      }
    };
  };

  return (
    <>
      <div className="p-4 w-full mx-auto max-w-[1300px]">
        <div className="topBook flex flex-col  md:flew-row lg:flex-row bg-white gap-4 md:gap-10 p-4 sm:p-6 md:p-10 mb-[5rem] text-base-100 shadow-lg rounded">
          <div className="w-full md:w-auto">
            <img
              src={imagepath}
              className="rounded  w-full md:w-[550px] h-auto md:h-[550px] object-cover"
            />
          </div>
          <div className="book-info w-full text-black">
            <div className="title">
              <div className="flex justify-between ">
                <h1 className="font-bold text-[24px] sm:text-[30px] md:text-[35px] font-mono">
                  {book_name}
                </h1>

                <div
                  className="tooltip"
                  data-tip="Bookmark"
                  onClick={postBookmark(id)}
                >
                  <button className="btn rounded my-1">
                    {bookmarkState ? (
                      <FaBookmark className="text-[20px] cursor-pointer text-yellow-300" />
                    ) : (
                      <FaRegBookmark className="text-[20px] cursor-pointer text-black-300" />
                    )}
                  </button>
                </div>
              </div>
              <p className="mb-2">
                <span className="font-bold">Author</span>: {book_author}
              </p>
            </div>
            <div className="border-b-2 mt-5 mb-5 border-primary"></div>
            <div className="description mt-5 ">
              <h1 className="font-black text-2xl ">Descriptions: </h1>
              {formattedDescription.map((chunk, index) => (
                <div key={index} className="my-2">
                  <p className="text-black text-sm">
                    {expandedBookId === bookData
                      ? chunk
                      : index === 0
                        ? chunk.slice(0, 250) +
                          (description.length > 250 ? "..." : "")
                        : null}
                  </p>
                  {expandedBookId === bookData &&
                    index === formattedDescription.length - 1 && (
                      <button
                        className="text-blue-500 text-[14px] hover:underline"
                        onClick={() => toggleDescription(bookData)}
                      >
                        View Less
                      </button>
                    )}
                  {index === 0 &&
                    description.length > 250 &&
                    !expandedBookId && (
                      <button
                        className="text-blue-500 text-[14px] hover:underline"
                        onClick={() => toggleDescription(bookData)}
                      >
                        View More...
                      </button>
                    )}
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-between md:flex-row items-start md:items-center gap-4 md:gap-[3rem] my-10">
              <div className="flex  justify-center items-center gap-x-4 gap-y-2  sm:gap-x-8 lg:gap-x-[4rem] xl:gap-x-[6rem]">
                <div className="font-bold border-r-[2px] border-[gainsboro] pr-[2.5rem] sm:pr-[3rem]">
                  <p>Publisher</p>
                  <p>Edition</p>
                  <p>Classifications</p>
                  <p>Publish Date</p>
                  <p>ISBN Code</p>
                  <p>Quantity</p>
                </div>
                <div className="mx-[1rem] sm:mx-[1rem] lg:mx-[-2rem] xl:mx-[-3rem]">
                  <p>{publisher}</p>
                  <p>{edition}</p>
                  <p>{classifications_name}</p>
                  <p>{date_of_publish}</p>
                  <p>{isbn_code}</p>
                  <div className="mb-3 flex items-center">
                    {quantity > 0 ? (
                      <p className="text-gray-700 ">{quantity}</p>
                    ) : (
                      <p className=" text-white badge badge-error">
                        NOT AVAILABLE
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="float-end">
                <p className="text-center mb-2 font-black">Book QR Code</p>
                <img
                  className="w-[80px] sm:w-[100px] rounded-lg shadow-lg md:w-[150px] h-[80px] sm:h-[100px] md:h-[150px] object-cover"
                  src={qrpath}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-5 my-10">
              <div className="flex items-center gap-3">
                <p className="font-bold">Request </p>
                <FaArrowDown />
              </div>
              <div className="border-2 border-primary w-full md:w-[100%]"></div>
            </div>

            {bookData.alreadyRequested === true ? (
              <div className="btn btn-accent float-end">
                Already Requested <FaWpforms className="text-[20px]" />
              </div>
            ) : quantity <= 0 ? (
              <div className="relative">
                <div
                  className={`p-2 rounded text-white float-end ${
                    quantity <= 0 ? "" : "bg-neutral hover:bg-[#383938]"
                  }`}
                >
                  <img
                    src="/images/notAvailable.jfif"
                    className="h-16 w-28"
                  />
                </div>
              </div>
            ) : bookData.isReachLimit ? (
              <div className="">
                <button
                  className="bg-[#CFCFD1] p-4 rounded shadow-md text-[#4d4c4cec] font-bold float-end"
                  disabled
                >
                  You've reached your request limit.
                </button>
              </div>
            ) : (
              <div className="">
                <button
                  className="btn btn-primary float-end"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Request Form <FaWpforms className="text-[20px]" />
                </button>
              </div>
            )}

            <dialog id="my_modal_3" className="modal backdrop-blur-md">
              <div className="modal-box text-white bg-neutral">
                <form method="dialog">
                  <button className="btn-sm bg-white text-black btn-circle absolute right-2 top-2 hover:bg-gray-200 hover:text-gray-800">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold  text-lg mb-2 text-base-100">
                  Request Form
                </h3>
                <div className="border-b-2"></div>
                <div className="form my-4">
                  <form
                    className="text-base-100"
                    onSubmit={handleSingleRequest}
                    style={{ zIndex: "1" }}
                  >
                    <div className="grid grid-cols-2 gap-5 text-base-100">
                      <div className="w-full">
                        <label className="font-bold tracking-[1px] py-2 mb-2 text-[15px]">
                          First Name:
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={postSingleForm.firstName}
                          onChange={handleInputChange}
                          onBlur={() =>
                            setTouched((prev) => ({ ...prev, firstName: true }))
                          }
                          disabled={true}
                          className={`border rounded bg-white text-black w-full border-gray-400 my-2 px-2 ${errors.firstName && touched.firstName ? "border-red-500" : ""}`}
                        />
                        {errors.firstName && touched.firstName && (
                          <span className="text-red-500 text-sm italic">
                            {errors.firstName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-base-100 mb-2 text-[15px] font-bold tracking-[1px]">
                          Last Name:
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={postSingleForm.lastName}
                          onChange={handleInputChange}
                          disabled={true}
                          className={`border rounded w-full bg-white text-black border-gray-400 my-2 px-2 ${errors.lastName ? "border-red-500" : ""}`}
                        />
                        {errors.lastName && (
                          <span className="text-red-500 text-sm italic">
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <label className="font-bold tracking-[1px] text-[15px]">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={postSingleForm.email}
                        onChange={handleInputChange}
                        disabled={true}
                        className={`border bg-white text-black rounded border-gray-400 my-2 px-2 ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm italic">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-5 text-black">
                      <div>
                        <label className="font-bold tracking-[1px] text-base-100 mb-2 text-[15px]">
                          Pick-up Date:
                        </label>
                        <input
                          type="date"
                          name="pickupDate"
                          placeholder="Pick-up Date"
                          value={postSingleForm.pickupDate}
                          onChange={handleInputChange}
                          className={`border w-full rounded bg-white appreance-none text-black border-gray-400 my-2 px-2 ${errors.pickupDate ? "border-red-500" : ""}`}
                        />
                        {errors.pickupDate && (
                          <span className="text-red-500 text-sm italic">
                            {errors.pickupDate}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-base-100 mb-2 text-[15px] font-bold tracking-[1px]">
                          Return Date:
                        </label>
                        <input
                          type="date"
                          name="returnDate"
                          placeholder="Return Date"
                          value={postSingleForm.returnDate}
                          disabled
                          className={`border bg-white text-black w-full rounded border-gray-400 my-2 px-2 `}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <label className="font-bold tracking-[1px] text-[15px]">
                        Comment:
                      </label>
                      <textarea
                        name="comment"
                        className=" px-2 rounded border text-black bg-white border-gray-400"
                        placeholder="Additional Comments"
                        rows="4"
                        cols="50"
                        value={postSingleForm.comment}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="my-4">
                      <button
                        className={`btn w-full text-white border-none px-2 ${loading ? "bg-primary" : error ? "bg-error" : "bg-primary"}`}
                        type="submit"
                        disabled={loading} // Disable button while loading
                      >
                        {loading ? (
                          <div className="loader"></div> // Loading animation
                        ) : error ? (
                          errorMessage // Display specific error message
                        ) : (
                          "Request"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
}
