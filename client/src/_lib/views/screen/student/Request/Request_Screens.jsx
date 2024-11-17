import React from "react";
import ColorMode from "../../../../colors/colorMode";
import { GiBookCover } from "react-icons/gi";
import { MdNoteAlt } from "react-icons/md";
import { Link } from "@tanstack/react-router";

const Request_Screens = ({ requestData }) => {
  return (
    <>
      <div className="p-5 absolute left-0 top-0">
        <Link
          to="/student/request_history"
          className="text-left back hover:underline transition duration-300"
        >
          Back
        </Link>
      </div>

      <div className="p-5 absolute right-0 top-0">
        <ColorMode />
      </div>

      <div className="w-full max-w-screen-lg mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* Book Information Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg md:h-[750px] w-full border border-gray-200">
            <h1 className="flex items-center text-[#333333] gap-4 text-2xl md:text-3xl font-bold mb-6">
              <GiBookCover className="text-3xl md:text-4xl" />
              <span>Book Information</span>
            </h1>

            <img
              src={`/Book Image/${requestData.book.book_img_file}`}
              alt="Book Cover"
              className="h-[300px] md:h-[400px] w-auto mx-auto rounded-lg object-cover mb-6"
            />

            <div className="p-6 rounded-lg mx-auto">
              <div className="text-gray-700">
                <div className="mb-6 flex justify-between">
                  <span className="text-gray-500 mx-2 text-sm md:text-base font-medium">Title:</span>
                  <span className="text-gray-900 text-lg md:text-xl font-semibold">
                    {requestData.book.book_name}
                  </span>
                </div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-gray-500 text-sm md:text-base font-medium">Author:</span>
                  <span className="text-gray-900 text-lg md:text-xl font-semibold">
                    {requestData.book.book_author}
                  </span>
                </div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-gray-500 text-sm md:text-base font-medium">Classifications:</span>
                  <span className="text-gray-900 text-lg md:text-xl font-semibold">
                    {requestData.book.classifications}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Information Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border w-full  border-gray-200">
            <h1 className="flex items-center text-[#333333] gap-4 text-2xl md:text-3xl font-bold mb-6">
              <MdNoteAlt className="text-3xl md:text-4xl" />
              <span>Student Information</span>
            </h1>

            <label className="block mb-4">
              <span className="text-gray-500">Authorizer:</span>
              <input
                type="text"
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={requestData.request.authorizer}
                readOnly
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-500">Request Code:</span>
              <input
                type="text"
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={requestData.request.request_code}
                readOnly
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-500">Student Name:</span>
              <input
                type="text"
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={requestData.user.last_name + " " + requestData.user.first_name}
                readOnly
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-500">Email:</span>
              <input
                type="email"
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={requestData.user.email}
                readOnly
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-500">Date of Borrowed:</span>
              <input
                type="date"
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={
                  requestData.request.pickupdate
                    ? new Date(requestData.request.pickupdate).toISOString().split("T")[0]
                    : ""
                }
                readOnly
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-500">Date of Returned:</span>
              <input
                type="date"
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={
                  requestData.request.returndate
                    ? new Date(requestData.request.returndate).toISOString().split("T")[0]
                    : ""
                }
                readOnly
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-500">Student Comment:</span>
              <textarea
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={"Student Comment: " + requestData.request.student_comment}
                readOnly
              ></textarea>
            </label>

            <label className="block mb-4">
              <span className="text-gray-500">Admin Comment:</span>
              <textarea
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={"Admin Comment: " + (requestData.request.admin_comment || "")}
                readOnly
              ></textarea>
            </label>

            <label className="block">
              <span className="text-gray-500">Status:</span>
              <input
                type="text"
                className="mt-2 p-3 block w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700"
                value={requestData.request.status}
                readOnly
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Request_Screens;
