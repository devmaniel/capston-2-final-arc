import React from "react";

import StudentNav from "../screen/student/common/Nav";

import { IoIosFunnel } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import Footer from "../../../_lib/views/screen/student/common/Footer";

import Loading from "../Loading";
import Request_History_Dialog from "./Request_History_Dialog";
import Book_QR_Dialog from "./Book_QR_Dialog";
import Request_Modal_Dialog from "./Request_Modal_Dialog";
import Request_Step_Dialog from "./Request_Step_Dialog";

import { useState, useEffect, useCallback } from "react";
import axiosStudentFetchRequest from "../../hook/axiosStudentFetchRequest";
import axios from "../../api/axios";

import Swal from "sweetalert2";

import { Link } from "@tanstack/react-router";

const Page = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [statusDate, setStatusDate] = useState("Newest");
  const [searchBar, setSearchBar] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Memoized fetch function to include statusFilter, statusDate, and searchBar in the POST request
  const fetchStudentHistory = useCallback(async () => {
    try {
      const fetchedData = await axiosStudentFetchRequest(
        statusFilter,
        statusDate,
        searchBar
      );
      setData(fetchedData);
    } catch (error) {
      setError(error);
    }
  }, [statusFilter, statusDate, searchBar]);

  // Handle cancel request by sending request id to the server
  const handleCancelRequest = async (requestId) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "/student/postcancel_request_student",
            {
              request_id: requestId,
            }
          );
          console.log("Request cancelled:", response.data);

          // Show success message
          Swal.fire(
            "Cancelled!",
            "Your request has been cancelled.",
            "success"
          );

          // Refresh the student history
          await fetchStudentHistory(); // Ensure that data is refetched
        } catch (error) {
          console.error("Error cancelling request:", error);

          // Show error message
          Swal.fire(
            "Error!",
            "There was an issue cancelling your request.",
            "error"
          );
        }
      }
    });
  };

  // Call fetchStudentHistory on component mount or when dependencies change
  useEffect(() => {
    fetchStudentHistory();
  }, [fetchStudentHistory]);

  // Handle status filter change
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle status date change
  const handleStatusDate = (e) => {
    setStatusDate(e.target.value);
  };

  // Handle search bar change
  const handleSearchChange = (e) => {
    setSearchBar(e.target.value); // Update searchBar state
    console.log("Search Input:", e.target.value); // Log the search input
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <>
        <div className="relative">
          <div className="fixed top-0 left-0 w-full h-[4px] bg-sky-600 z-[999] overflow-hidden">
            <div className="h-full bg-sky-900 animate-[loading_2s_linear_infinite] translate-x-[-100%]">
              <div
                className="h-full w-full animate-loading"
                style={{ animation: "loading 2s linear infinite" }}
              ></div>
            </div>
          </div>
          <Loading />
        </div>

        <style jsx>{`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </>
    );
  }

  console.log("Test", data.data.requests);

  return (
    <>
      <StudentNav />
      <div className="container mx-auto px-4 h-screen">
        <Filter
          statusFilter={statusFilter}
          setStatusFilter={handleStatusFilter}
          dateFilter={statusDate}
          setStatusDate={handleStatusDate}
          searchBar={searchBar} // Pass searchBar state to Filter
          setSearchBar={handleSearchChange} // Pass handleSearchChange to Filter
        />
        <div className="overflow-x-auto mt-5">
          <RequestTable
            requests={data.data.requests}
            user={data.data.user}
            handleCancelRequest={handleCancelRequest}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

function RequestTable({ requests, user, handleCancelRequest }) {
  return (
    <div className="p-2 max-w-[1285px] w-full mx-auto ">
      <div className="bg-white text-black  rounded-md">
        <table className="table min-w-full bg-white text-black ">
          {/* head */}
          <thead className="">
            <tr className=" text-black ">
              <th>Request Code</th>
              <th>Title</th>
              <th>Author</th>
              <th>Number of Copies</th>
              <th>Date of Borrowed</th>
              <th>Date of Returned</th>
              <th>History</th>
              {/* <th>Book QR</th> */}
              <th>Request QR</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="overflow-hidden ">
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td>{request.request_code}</td>
                <td className="overflow-hidden w-64">
                  <p className="truncate whitespace-nowrap">
                    {request.book_name}
                  </p>
                </td>
                <td className="overflow-hidden w-[50px]">
                  <p className="truncate whitespace-nowrap">
                    {request.book_author}
                  </p>
                </td>

                <td className="text-end">{request.book_qty}</td>
                <td className="text-end">
                  {new Date(request.pickupdate).toLocaleDateString()}
                </td>
                <td className="text-end">
                  {new Date(request.returndate).toLocaleDateString()}
                </td>
                <td>
                  <Link
                    to={`/student/request_history/view_request?request_id=${request.id}`}
                    className="badge badge-success"
                  >
                    <p>View</p>
                  </Link>

                  <Request_History_Dialog
                    userData={user}
                    requestData={request}
                    modalId={`my_modal_History_${index}`}
                  />
                </td>
                {/* <td>
                  <button
                    className="badge badge-success "
                    onClick={() =>
                      document
                        .getElementById(`my_modal_QR_${index}`)
                        .showModal()
                    }
                  >
                    <p>View</p>
                  </button>
                  <Book_QR_Dialog
                    requestData={request}
                    modalId={`my_modal_QR_${index}`}
                  />
                </td> */}
                <td>
                  <button
                    className="badge badge-primary text-white"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_Request_${index}`)
                        .showModal()
                    }
                  >
                    <p>View</p>
                  </button>
                  <Request_Modal_Dialog
                    requestData={request.request_qr_img}
                    modalId={`my_modal_Request_${index}`}
                  />
                </td>
                <td>
                  <button
                    className="badge badge-info"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_Status_${index}`)
                        .showModal()
                    }
                  >
                    {/* Check for the specific statuses and show "violated" */}
                    <p>
                      {request.status === "violated-lost" ||
                      request.status === "violated-damages"
                        ? "violated"
                        : request.status}
                    </p>
                  </button>
                  <Request_Step_Dialog
                    requestData={request.status.toLowerCase()}
                    modalId={`my_modal_Status_${index}`}
                  />
                </td>
                <td>
                  {(request.status === "pending" ||
                    request.status === "accepted") &&
                    request.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancelRequest(request.id)}
                        className="badge border-none bg-red-700 text-white"
                      >
                        Cancel
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Filter({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setStatusDate,
  searchBar,
  setSearchBar,
}) {
  return (
    <div className="categories text-center p-4 max-w-[1300px] w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between sm:justify-between md:justify-between">
        {/* Search box */}
        <div className="max-w-xs md:max-w-sm lg:max-w-md w-full">
          <div className="label">
            <span className="label-text">Search</span>
            <span className="label-text-alt"></span>
          </div>
          <label className="input bg-white text-black  input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow text-black"
              placeholder="Search..."
              value={searchBar} // Bind searchBar state to the input value
              onChange={setSearchBar} // Handle input changes
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70  cursor-none"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </div>

        {/* Filter section */}
        <div className="w-full flex justify-end">
          <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-center w-full md:w-auto">
            <label className="form-control w-full md:max-w-xs">
              <div className="label">
                <span className="label-text">By Status</span>
                <span className="label-text-alt">
                  <IoIosFunnel />
                </span>
              </div>
              <select
                className="select select-bordered bg-white text-gray-500 "
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <option disabled>Pick one</option>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>

            <label className="form-control w-full md:max-w-xs">
              <div className="label">
                <span className="label-text">By Date</span>
                <span className="label-text-alt">
                  <IoIosFunnel />
                </span>
              </div>
              <select
                className="select select-bordered bg-white text-gray-500 "
                onChange={setStatusDate}
                value={dateFilter}
              >
                <option disabled>Pick one</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="AZ">A-Z</option>
                <option value="ZA">Z-A</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
