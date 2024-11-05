import { axiosFetchBookmark } from "../../../../hook/axiosFetchBookmark";
import { useState, useEffect } from "react";

import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "../../../../api/axios";

import Footer from "../common/Footer";
import Nav from "@_lib/views/screen/student/common/Nav";
import Categories from "@_lib/views/screen/student/catalog/Categories";
import Loading from "../../../Loading";

import Swal from "sweetalert2";
import Cookies from "js-cookie";

const ellipsisContainerStyle = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginBottom: "15px",
};

const bookmark = () => {
  const { bookmarkData, userData, loading, error, refetch } =
    axiosFetchBookmark("/student/bookmark/post_fetch_bookmark");
  const [bookmarkPostData, setBookmarkPostData] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // State for "Select All"

  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    comment: "",
  });
  const [touched, setTouched] = useState({
    pickupDate: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateForm();
  }, [formData, touched]);

  const postBookmark = async (book_id) => {
    try {
      const sessionId = Cookies.get("sessionId");
      const response = await axios.post("/student/post_bookmark", {
        sessionId, // Ensure sessionId is correctly passed
        book_id,
      });
      console.log("Bookmark response:", response.data);

      // Refetch the bookmark data after a successful post
      refetch();
    } catch (error) {
      console.error("Error posting bookmark:", error);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if pickupDate is touched and empty
    if (touched.pickupDate && !formData.pickupDate) {
      newErrors.pickupDate = "Pick-up date cannot be empty";
    } else if (formData.pickupDate) {
      const pickupDate = new Date(formData.pickupDate);
      if (pickupDate < today) {
        newErrors.pickupDate = "Pick-up date cannot be in the past";
      }
      if (pickupDate.getDay() === 0 || pickupDate.getDay() === 6) {
        newErrors.pickupDate = "Pick-up date cannot be on Saturday or Sunday";
      }
    }

    // Check if returnDate is empty
    if (!formData.returnDate) {
      newErrors.returnDate = "Return date cannot be empty";
    }

    setErrors(newErrors);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setBookmarkPostData([]); // Clear all bookmarks
    } else {
      const allBookmarks = bookmarkData
        .filter((book) => book.quantity > 0) // Filter out books with quantity <= 0
        .map((book) => ({
          book_id: book.id,
          isBookmarked_id: book.isBookmark,
        }));
      setBookmarkPostData(allBookmarks); // Add all valid bookmarks
    }
    setSelectAll(!selectAll);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "pickupDate") {
      const pickupDate = new Date(value);
      const returnDate = new Date(pickupDate);
      returnDate.setDate(returnDate.getDate() + 3);
      setFormData((prevData) => ({
        ...prevData,
        returnDate: returnDate.toISOString().split("T")[0],
      }));
    }
  };

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId],
    }));
  };

  const breakDescription = (description) => {
    if (!description) return [];
    const sentences = description.split(/(?<=[.!?])\s+/);
    const chunks = [];
    for (let i = 0; i < sentences.length; i += 3) {
      chunks.push(sentences.slice(i, i + 3).join(" "));
    }
    return chunks;
  };

  const handleSubmit = async (e) => {
    const sessionId = Cookies.get("sessionId");
    e.preventDefault();
    setTouched({ pickupDate: true });
  
    if (Object.keys(errors).length === 0) {
      const requestData = {
        ...formData,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        bookmarkedBooks: bookmarkPostData,
        sessionId,
      };
  
      try {
        const response = await axios.post(
          "/student/bookmark/post_multiple_request_bookmark",
          requestData
        );
  
        if (response.status === 200) {
          if (response.data.message === "You've reached your request limit.") {
            Swal.fire({
              title: "Request Limit Reached",
              text: "You've reached your request limit. Please return a book before making a new request.",
              icon: "warning",
              confirmButtonText: "OK",
            });
          } else {
            document.getElementById("my_modal_3").close();
            Swal.fire({
              title: "Success!",
              text: "Your bookmark request has been submitted successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            await refetch();
          }
        }
      } catch (error) {
        document.getElementById("my_modal_3").close();
  
        if (error.response && error.response.status === 400) {
          if (error.response.data.message === "You've reached your request limit.") {
            Swal.fire({
              title: "Request Limit Reached",
              text: "You've reached your request limit. Please return a book before making a new request.",
              icon: "warning",
              confirmButtonText: "OK",
            });
          } else if (error.response.data.alreadyRequestedBooks) {
            Swal.fire({
              title: "Error!",
              html: `The following books have already been requested: <b><u>${error.response.data.alreadyRequestedBooks}</u></b>`,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was an error submitting your request. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    }
  };
  
  

  // State to track 1.5-second delay
  const [delayOver, setDelayOver] = useState(false);

  console.log("Bookmark Data:", bookmarkData);
  console.log("User Data:", userData);

  const handleBookmark = (bookId, isBookmarkedId) => {
    console.log(
      "handleBookmark called with bookId:",
      bookId,
      "and isBookmarkedId:",
      isBookmarkedId
    );
    setBookmarkPostData((prevData) => {
      // Check if the book is already bookmarked
      const existingBookmark = prevData.find((item) => item.book_id === bookId);

      let newData;
      if (existingBookmark) {
        // If the book is already bookmarked, remove it
        newData = prevData.filter((item) => item.book_id !== bookId);
      } else {
        // If the book is not bookmarked, add it
        newData = [
          ...prevData,
          { book_id: bookId, isBookmarked_id: isBookmarkedId },
        ];
      }
      console.log("Updated bookmarkPostData:", newData);
      return newData;
    });
  };

  // Effect to handle 1.5-second delay
  useEffect(() => {
    console.log("Starting 1.5-second delay...");
    const timer = setTimeout(() => {
      setDelayOver(true);
      console.log("Delay over.");
    }, 1500); // Set delay for 1.5 seconds

    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, []);

  if (!bookmarkData && !delayOver) {
    console.log("Loading or delay is still active. Showing loading spinner.");
    return <Loading />; // Show a loading message while waiting for the response or the delay
  }

  return (
    <>
      <Nav />
      <div className=" flex flex-col justify-between">
        <div className="w-full lg:w-[1300px] mx-auto px-4 mb-10">
          <div>
            <div className="mb-4">
              <div className="flex flex-wrap items-center justify-between">
                <h1 className="font-bold mb-2 text-[16px] sm:text-[18px] lg:text-[20px] mx-2">
                  My Shelves (
                  <span className="text-red-500 mx-1">
                    {bookmarkData?.length || 0}
                  </span>
                  )
                </h1>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <p className="mx-2">Select All</p>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </label>
                </div>
              </div>

              <div className="border-b-2 border-[gainsboro]"></div>
            </div>

            {bookmarkData && bookmarkData.length > 0 ? (
              bookmarkData

                .sort((a, b) => {
                  if (a.quantity === 0 && b.quantity === 0) return 0;
                  if (a.quantity === 0) return 1;
                  if (b.quantity === 0) return -1;
                  return b.quantity - a.quantity;
                })

                .map((book) => {
                  const formattedDescription = breakDescription(
                    book.description
                  );
                  const isExpanded = expandedDescriptions[book.id];

                  return (
                    <div
                      key={book.id}
                      className={`${
                        book.quantity <= 0
                          ? "bg-[#FAF9F6] text-black opacity-60"
                          : "bg-[#FAF9F6] text-black"
                      } mb-5 rounded-lg shadow-lg overflow-hidden`}
                    >
                      <div className="px-5 my-2 flex flex-wrap items-center justify-between">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={bookmarkPostData.some(
                            (item) => item.book_id === book.id
                          )}
                          onChange={() =>
                            handleBookmark(book.id, book.isBookmark)
                          }
                          disabled={book.quantity <= 0}
                        />
                        <button
                          className="btn btn-circle btn-outline"
                          onClick={() => postBookmark(book.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex flex-col lg:flex-row items-start">
                        <div className="p-5 mx-auto">
                          <img
                            src={`/Book Image/${book.book_img_file}`}
                            className="w-full sm:w-64 md:w-80 lg:w-96 rounded object-cover mb-4 "
                            alt={book.book_name}
                          />
                        </div>

                        <div className="p-5 flex flex-col w-full">
                          <h1 className="text-4xl font-extrabold mb-1">
                            {book.book_name}
                          </h1>
                          <p className="text-gray-600 mb-2 my-2">
                            Author |{" "}
                            <span className="italic">{book.book_author}</span>
                          </p>
                          <div className="flex items-center">
                            <p className="font-bold">Ratings: </p>
                            <div className="rating gap-1 my-2 mx-2">
                              {[...Array(5)].map((_, index) => (
                                <input
                                  key={index}
                                  type="radio"
                                  name={`rating-${book.id}`}
                                  className={`mask mask-heart bg-${["red", "orange", "yellow", "lime", "green"][index]}-400`}
                                  defaultChecked={index === 4}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute top-[-100px] right-[50px] hidden md:block">
                              <img
                                src="../images/bookmark.png"
                                className="h-36"
                                alt="Bookmark"
                              />
                            </div>
                          </div>

                          <div className="border-t-2 border-primary my-3"></div>

                          <div className="mb-3 flex items-center">
                            <h2 className="font-semibold">Classifications:</h2>
                            <p className="text-gray-700 mx-2">
                              {book.classifications_name}
                            </p>
                          </div>

                          <div className="mb-3 flex items-center">
                            <h2 className="font-semibold">Book Quantity:</h2>
                            {book.quantity > 0 ? (
                              <p className="text-gray-700 mx-2">
                                {book.quantity}
                              </p>
                            ) : (
                              <p className=" mx-2 badge badge-error text-white">
                                Out of Stock
                              </p>
                            )}
                          </div>

                          <div>
                            <h2 className="font-semibold text-gray-700">
                              Description:
                            </h2>
                            <p className="text-gray-700 text-sm my-2">
                              {formattedDescription.map((chunk, index) => (
                                <div key={index} className="my-2">
                                  <p className="text-black text-sm">
                                    {isExpanded
                                      ? chunk
                                      : index === 0
                                        ? chunk.slice(0, 250) +
                                          (book.description.length > 250
                                            ? "..."
                                            : "")
                                        : null}
                                  </p>
                                  {isExpanded &&
                                    index ===
                                      formattedDescription.length - 1 && (
                                      <button
                                        className="text-blue-500 text-[14px] hover:underline"
                                        onClick={() =>
                                          toggleDescription(book.id)
                                        }
                                      >
                                        View Less
                                      </button>
                                    )}
                                  {index === 0 &&
                                    book.description.length > 250 &&
                                    !isExpanded && (
                                      <button
                                        className="text-blue-500 text-[14px] hover:underline"
                                        onClick={() =>
                                          toggleDescription(book.id)
                                        }
                                      >
                                        View More...
                                      </button>
                                    )}
                                </div>
                              ))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="mx-auto my-10 opacity-50">
                <div className="mx-auto flex justify-center items-center">
                  <img
                    src="../images/logo.png"
                    className="bg-white w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-[50%]"
                  />
                </div>
                <h1 className="text-center font-bold tracking-[1px] text-[20px] sm:text-[30px]  mt-6">
                  No Books Data!
                </h1>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-4 h-auto rounded-t-xl z-10  sm:p-4 w-full fixed bottom-0 left-0 right-0 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between lg:px-4 pb-4 border-b border-black max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-black font-semibold text-lg w-full  text-center sm:text-left mb-2 md:mb-0">
              Total Books: {bookmarkPostData.length}
            </h5>

            <div className="flex items-center gap-3">
              <button
                className={`py-2 px-4 rounded text-white font-semibold w-full  transition-all duration-300 ${
                  bookmarkPostData.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-[#383938]"
                }`}
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                disabled={bookmarkPostData.length === 0}
              >
                Request
              </button>
            </div>
          </div>
          <p className="font-normal text-sm text-black text-center mb-4 mt-4 max-lg:max-w-lg max-lg:mx-auto">
            Note: Return the books on the due dates.
          </p>
        </div>

        <dialog id="my_modal_3" className="modal backdrop-blur-md">
          <div className="modal-box text-white bg-neutral">
            <form method="dialog">
              <button className="btn-sm bg-white text-black btn-circle absolute right-2 top-2 hover:bg-gray-200 hover:text-gray-800">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-2 text-base-100">
              Request Form
            </h3>
            <div className="border-b-2"></div>
            <div className="form my-4">
              <form onSubmit={handleSubmit} style={{ zIndex: "1" }}>
                <div className="grid grid-cols-2 gap-5 text-base-100">
                  <div className="w-full">
                    <label className="font-bold tracking-[1px] py-2 mb-2 text-[15px] text-base-100">
                      First Name:
                    </label>
                    <input
                      type="text"
                      value={userData.first_name}
                      disabled={true}
                      className="border bg-white rounded w-full text-black border-gray-400 my-2 px-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold tracking-[1px] py-2 mb-2 text-[15px] text-base-100">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={userData.last_name}
                      disabled={true}
                      className="border bg-white rounded w-full text-black border-gray-400 my-2 px-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold tracking-[1px] py-2 mb-2 text-[15px] text-base-100">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    disabled={true}
                    className="border rounded bg-white w-full text-black border-gray-400 my-2 px-2"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-bold tracking-[1px] py-2 mb-2 text-[15px] text-base-100">
                      Pick-up Date:
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, pickupDate: true }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className={`border  w-full rounded border-gray-400 my-2 px-2 bg-white text-black ${
                        errors.pickupDate ? "border-red-500" : ""
                      }`}
                    />
                    {errors.pickupDate && (
                      <span className="text-red-500 text-sm">
                        {errors.pickupDate}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="font-bold tracking-[1px] py-2 mb-2 text-[15px] text-base-100">
                      Return Date:
                    </label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      disabled
                      className="border bg-white rounded w-full text-black border-gray-400 my-2 px-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold tracking-[1px] py-2 mb-2 text-[15px] text-base-100">
                    Comment:
                  </label>
                  <textarea
                    name="comment"
                    className="textarea border text-black bg-white border-gray-400 w-full my-2 "
                    placeholder="Additional comments"
                    value={formData.comment}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn bg-primary hover:bg-[#383938] text-white border-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <Footer />
    </>
  );
};

export default bookmark;
