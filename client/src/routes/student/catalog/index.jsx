import {
  createFileRoute,
  redirect,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { classifications } from "../../../_lib/data/ClassificationsData";
import { TbBookOff } from "react-icons/tb";

// authentication api
import auth from "../../../_lib/api/auth";

// Valid filters and classifications
const Based = {
  filter: ["newest", "oldest", "a-z", "z-a"],
  classifications: ["all", ...classifications], // Include "all" as a valid option
};

// Default values for query params
const defaultParams = {
  page: 1,
  filter: "newest",
  classifications: "all",
};

// Helper function to validate and normalize search params
const validateAndNormalizeParams = (search) => {
  let {
    page = defaultParams.page,
    filter = defaultParams.filter,
    classifications = defaultParams.classifications,
  } = search;

  // Validate page
  page = parseInt(page, 10);
  if (isNaN(page) || page < 1) page = defaultParams.page;

  // Validate filter
  if (!Based.filter.includes(filter)) filter = defaultParams.filter;

  // Validate classifications
  if (!Based.classifications.includes(classifications))
    classifications = defaultParams.classifications;

  return { page, filter, classifications };
};

export const Route = createFileRoute("/student/catalog/")({
  validateSearch: (search) => validateAndNormalizeParams(search),

  beforeLoad: async ({ search }) => {
    const role = "student";
    const authResult = await auth(role);

    if (!authResult.success) {
      // Handle authentication failures
      switch (authResult.reason) {
        case "session_not_found":
        case "invalid_session":
        case "expired_session":
          console.log(`Error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
        case "pending_violations":
          console.log(
            "User has pending violations. Redirecting to /violations_page"
          );
          throw redirect({ to: "/violations_page" });
        case "role_mismatch":
          console.log(
            `Role mismatch. Redirecting to: ${role === "admin" ? "/student" : "/admin"}`
          );
          throw redirect({ to: role === "admin" ? "/student" : "/admin" });
        case "unenrolled":
          console.log("User is no longer enrolled. Redirecting to /noLonger");
          throw redirect({ to: "/noLonger" });
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }

    if (authResult.role !== role) {
      console.log(
        `Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`
      );
      throw redirect({
        to: authResult.role === "student" ? "/student" : "/login",
      });
    }

    // Return validated search parameters
    return { search: validateAndNormalizeParams(search) };
  },

  component: () => <Viewpage />,
});

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";
import Footer from "../../../_lib/views/screen/student/common/Footer";
import { Link } from "@tanstack/react-router";

// screens
import Nav from "@_lib/views/screen/student/common/Nav";
import Categories from "@_lib/views/screen/student/catalog/Categories";

// hooks
import { axiosFetchCatalogBook } from "../../../_lib/hook/axiosFetchCatalogBook";
import { useState, useEffect } from "react";

import axios from "../../../_lib/api/axios";
import Cookies from "js-cookie";

function Viewpage() {
  const search = useSearch({ from: "/student/catalog/" });
  const { page, filter, classifications } = validateAndNormalizeParams(search);
  const [statePage, setStatePage] = useState(page);
  const [stateFilter, setStateFilter] = useState(filter);
  const [stateClass, setStateClass] = useState(classifications);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  console.log(
    "Page:",
    statePage,
    "Filter:",
    stateFilter,
    "Classifications:",
    stateClass
  );

  // Synchronize state with query parameters
  useEffect(() => {
    const { page, filter, classifications } =
      validateAndNormalizeParams(search);
    setStatePage(page);
    setStateFilter(filter);
    setStateClass(classifications);
  }, [search]);

  // Determine the route based on search query
  const route = searchQuery
    ? `/student/table_book/${statePage}/${stateFilter}/${stateClass}/active/${searchQuery}`
    : `/student/table_book/${statePage}/${stateFilter}/${stateClass}/active`;

  // Fetch data
  const { bookdata: books, totalPage } = axiosFetchCatalogBook(route);

  console.log("Book Data Value:", books);

  console.log("Total Page", totalPage);

  const title = [
    {
      recent: "Recently Updated",
      topBooks: "Top Books",
      bago: "New!",
    },
  ];

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${i === statePage ? "btn-active" : ""}`}
          aria-label={i}
          onClick={() => handlePage(i)} // Add click handler
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  console.log("BOok Data", books);

  const handleSearch = (query) => {
    console.log("Search Query:", query);
    setSearchQuery(query);
    // Add any additional logic for handling the search query
  };

  const handlePage = (pageNumber) => {
    // Update the state with the new page number
    setStatePage(pageNumber);

    // Update the URL query parameters
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        page: pageNumber, // Update the page parameter
      }),
      replace: true,
    });
  };

  // Handlers for select changes
  const handleFilter = (event) => {
    const newFilter = event.target.value;
    setStateFilter(newFilter);
    console.log("Filter changed to:", newFilter);

    // Update query parameters
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        filter: newFilter,
      }),
      replace: true,
    });
  };

  const handleClassifications = (event) => {
    const newClassifications = event.target.value;
    setStateClass(newClassifications);
    console.log("Classification changed to:", newClassifications);

    // Update query parameters
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        classifications: newClassifications,
      }),
      replace: true,
    });
  };

  // Log state when it changes
  useEffect(() => {
    console.log("State Filter changed to:", stateFilter);
  }, [stateFilter]);

  useEffect(() => {
    console.log("State Classification changed to:", stateClass);
  }, [stateClass]);

  useEffect(() => {
    console.log("State Search changed to:", searchQuery);
  }, [searchQuery]);

  const sessionId = Cookies.get("sessionId"); // Retrieve sessionId from cookies

  const postBookmark = (book_id) => {
    // Ensure the function is invoked on click
    return async () => {
      try {
        const response = await axios.post("/student/post_bookmark", {
          sessionId,
          book_id,
        });

        console.log("Bookmark response:", response.data);
      } catch (error) {
        console.error("Error posting bookmark:", error);
      }
    };
  };

  return (
    <>
      <Nav />
      <div className="w-full max-w-[1280px] mx-[auto]">
        <Categories
          handleClassifications={handleClassifications}
          handleFilter={handleFilter}
          propsFilter={stateFilter}
          propsClass={stateClass}
          onSearch={handleSearch}
        />

        {/*Displaying Image */}

        <div className="flex main mx-auto">
          <div className="books-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6 ">
            {books.length > 0 ? (
              books.map((book) => (
                <div key={book.id} className="book-img  rounded relative">
                  <div className="relative group">
                    <Link to={`/student/catalog/book?bookId=${book.id}`}>
                      <div className="relative bg-white h-[auto]  p-5 flex flex-col rounded  shadow-md">
                        <div className="relative w-full p-3">
                          <img
                            src={`/Book Image/${book.book_img_file}`}
                            alt={book.book_img_file}
                            className="w-[150px] h-[160px] mx-auto bg-white sm:w-[120px] sm:h-[180px] md:w-[140px] md:h-[190px] lg:w-[170px] lg:h-[230px] object-fit cursor-pointer"
                          />
                        </div>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                        <div className="text-left text-black z-[10]">
                          <div className="max-w-[100px] z-[999] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[150px] my-[10px] overflow-hidden">
                            <div>
                              <p className="truncate text-[14px] tracking-[1px] sm:text-[12px] md:text-[14px] lg:text-[16px] group-hover:underline transition-all duration-300">
                                {book.name}
                              </p>
                              <p className="truncate text-gray-400 text-[10px] tracking-[1px] sm:text-[8px] md:text-[10px] lg:text-[11px]">
                                {book.book_author}
                              </p>
                            </div>
                          </div>

                          <div className=" flex  w-full   ">
                            <p className=" text-center flex  text-[10px] text-white h-[28px] w-full">
                              <div className="w-full">
                                {book.quantity > 0 ? (
                                  <p className="mx-1 uppercase bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 w-full shadow-lg p-2 tracking-[1px]">
                                    {book.quantity === 1
                                      ? "Available"
                                      : "Available"}
                                  </p>
                                ) : (
                                  <p className="tracking-[1px] bg-gradient-to-r from-red-400 via-red-500 to-red-600 p-2 w-full shadow-lg">
                                    NOT AVAILABLE
                                  </p>
                                )}
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="absolute inset-0 sm:top-[.6rem] sm:left-0 top-[.6rem] sm:mx-0  h-[20px] sm:h-[28px] w-fit">
                      <div className="bg-[#eab208e0] p-[8px] shadow-md">
                        <p className="mx-[.5rem] tracking-[1px] text-[10px] text-white">
                          {book.classifications_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mx-[7rem] sm:mx-[33rem] my-10 opacity-50 w-full flex flex-col items-center text-center">
                <div className="bg-gradient-to-b w-full from-[#f0f9ff] to-[#fffaf0] rounded-[50%] flex justify-center">
                  <img src="../images/logo.png" className="mx-auto" />
                </div>
                <h1 className="font-bold tracking-[1px] text-[20px] sm:text-[30px] mt-6">
                  No Books Data!
                </h1>
              </div>
            )}
          </div>
        </div>

        {/*PAGINATION */}

        <div className="join mt-10 mb-10 flex justify-center">
          {renderButtons()}
        </div>
      </div>

      <Footer />
    </>
  );
}
