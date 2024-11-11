import { useState } from "react";

import { BiBookAdd } from "react-icons/bi";

import { formclass } from "../../../data/FormClassification";

import { Link } from "@tanstack/react-router";

const Add_Books_Form = ({
  scannedBookData,
  handleFormSubmit,
  handleInput,
  isError,
  handleScanAgain,
}) => {
  // Function to convert date to yyyy-mm-dd format for date input
  function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Optional function to convert date to dd/mm/yy format if needed elsewhere
  function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <div className="bg-neutral rounded-md text-base-100 -mt-5">
        <div className="border-base-100 p-5 border-b flex justify-between">
          <h1 className="font-black">Add Books Form</h1>
          <BiBookAdd className="text-2xl" />
        </div>

        <form
          action=""
          className="p-5 leading-10 flex flex-col gap-3 text-base-100"
          onSubmit={handleFormSubmit}
        >
          <div>
            <label htmlFor="file" className="text-md font-semibold">
              Image:
            </label>
            <input
              onChange={(e) => {
                handleInput(e.target.files[0], "bookimage");
              }}
              type="file"
              className={`mt-2 bg-primary p-2 rounded-md file-input file-input-bordered file-input-md w-full text-neutral ${
                scannedBookData.bookimage === null ? "bg-error" : ""
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h1 className="text-md font-semibold">Title:</h1>
              <input
                type="text"
                placeholder="Enter Book Name"
                value={scannedBookData.bookname}
                onChange={(e) => {
                  handleInput(e.target.value, "bookname");
                }}
                className={`input bg-base-100 text-neutral rounded-md w-full ${scannedBookData.bookname === "" ? "input-error border-2 border-error" : ""}`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Author:</h1>
              <input
                onChange={(e) => {
                  handleInput(e.target.value, "authorname");
                }}
                value={scannedBookData.authorname}
                type="text"
                placeholder="Enter Book Author"
                className={`input bg-base-100 text-neutral rounded-md w-full ${scannedBookData.authorname === "" ? "input-error border-2 border-error" : ""}`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">ISBN Code: </h1>
              <input
                onChange={(e) => {
                  handleInput(e.target.value, "isbncode");
                }}
                value={scannedBookData.isbncode}
                type="text"
                placeholder="Enter Book ISBN"
                className={`input bg-base-100 text-neutral rounded-md w-full ${scannedBookData.isbncode === "" ? "input-error border-2 border-error" : ""}`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Number of Copies:</h1>
              <input
                value={scannedBookData.quantity}
                onChange={(e) => {
                  handleInput(e.target.value, "quantity");
                }}
                type="number"
                min="0" // Ensure only positive numbers are allowed
                placeholder="Enter book quantity"
                className={`input bg-base-100 text-neutral rounded-md w-full ${scannedBookData.quantity < 1 && scannedBookData.quantity !== "" ? "input-error border-2 border-error" : ""}`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Classifications:</h1>
              <select
                value={scannedBookData.classifications}
                onChange={(e) => handleInput(e.target.value, "classifications")}
                className={`input bg-base-100 text-neutral rounded-md w-full ${
                  scannedBookData.classifications === ""
                    ? "input-error border-2 border-error"
                    : ""
                }`}
              >
                <option value="" disabled>
                  Select a classification
                </option>
                {formclass.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h1 className="text-md font-semibold">Publishers:</h1>
              <input
                type="text"
                placeholder="Enter Publishers"
                value={scannedBookData.publisher}
                name="publisher"
                onChange={(e) => {
                  handleInput(e.target.value, "publisher");
                }}
                className={`input bg-base-100 text-neutral rounded-md w-full ${
                  scannedBookData.publisher === ""
                    ? "input-error border-2 border-error"
                    : ""
                }`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Date of publish:</h1>
              <input
                value={formatDateForInput(scannedBookData.date_of_publish)}
                type="date"
                placeholder="Enter Date of Publish"
                name="date_of_publish"
                onChange={(e) => {
                  handleInput(e.target.value, "date_of_publish");
                }}
                className={`input bg-base-100 text-neutral rounded-md w-full ${
                  scannedBookData.date_of_publish === ""
                    ? "input-error border-2 border-error"
                    : ""
                }`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Edition:</h1>
              <input
                type="text"
                placeholder="Enter Edition"
                name="edition"
                value={scannedBookData.edition}
                onChange={(e) => {
                  handleInput(e.target.value, "edition");
                }}
                className={`input bg-base-100 text-neutral rounded-md w-full ${
                  scannedBookData.edition === ""
                    ? "input-error border-2 border-error"
                    : ""
                }`}
              />
            </div>

            <div className="col-span-2">
              <h1 className="text-md font-semibold">Description:</h1>
              <textarea
                onChange={(e) => {
                  handleInput(e.target.value, "description");
                }}
                value={scannedBookData.description || "No description given"}
                cols="30"
                rows="10"
                placeholder="Enter book description"
                className={`input bg-base-100 text-neutral rounded-md p-2 min-h-32 input-bordered w-full ${scannedBookData.description === "" ? "input-error border-2 border-error" : ""} `}
              />
            </div>

            <div className="flex"></div>

            <button
              type="submit"
              className="bg-primary col-span-2 rounded-md text-white text-xl p-2 font-black"
            >
              Add
            </button>
            <button
              className="bg-error col-span-2 rounded-md text-white text-xl p-2 font-bold"
              onClick={() => window.location.reload()}
            >
              Scan Again
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add_Books_Form;
