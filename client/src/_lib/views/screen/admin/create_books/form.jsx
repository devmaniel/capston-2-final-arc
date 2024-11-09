import { useState } from "react";

import { BiBookAdd } from "react-icons/bi";

import FormAction from "../../../admin/manage_books/FormAction";

export default function Form({
  postprops,
  handleFormSubmit,
  handleInput,
  isError,
  classdata,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <div className="bg-neutral rounded-md text-base-100">
        <div className="border-base-100 p-5 border-b flex justify-between">
          <h1 className="font-black">Add Books Form</h1>

          <BiBookAdd className="text-2xl" />
        </div>

        <form
          action=""
          className="p-5 leading-10 flex flex-col gap-3 text-base-100"
          onSubmit={handleFormSubmit}
        >
          <div className="">
            <label htmlFor="file" className="text-md  font-semibold">
              Image:
            </label>
            <input
              onChange={(e) => {
                handleInput(e.target.files[0], "bookimage");
              }}
              type="file"
              className={`mt-2 bg-primary p-2 rounded-md file-input file-input-bordered file-input-md w-full text-neutral ${
                postprops.bookimage === null ? "bg-error" : ""
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h1 className="text-md font-semibold">Title:</h1>
              <input
                type="text"
                placeholder="Enter Book Name"
                name="book"
                onChange={(e) => {
                  handleInput(e.target.value, "bookname");
                }}
                className={`input bg-base-100 text-neutral rounded-md w-full ${postprops.bookname === "" ? "input-error border-2 border-error" : ""}`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Author:</h1>
              <input
                onChange={(e) => {
                  handleInput(e.target.value, "authorname");
                }}
                type="text"
                placeholder="Enter Book Author"
                className={`input bg-base-100 text-neutral rounded-md w-full ${postprops.authorname === "" ? "input-error border-2 border-error" : ""}`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">ISBN Code: </h1>
              <input
                onChange={(e) => {
                  handleInput(e.target.value, "isbncode");
                }}
                type="text"
                placeholder="Enter Book ISBN"
                className={`input bg-base-100 text-neutral rounded-md w-full ${postprops.isbncode === "" ? "input-error border-2 border-error" : ""}`}
              />
            </div>
            <div>
              <h1 className="text-md font-semibold">Number of Copies:</h1>
              <input
                value={postprops.quantity}
                onChange={(e) => {
                  handleInput(e.target.value, "quantity");
                }}
                type="number"
                min="0" // Ensure only positive numbers are allowed
                placeholder="Enter book quantity"
                className={`input bg-base-100 text-neutral rounded-md w-full ${postprops.quantity < 1 && postprops.quantity !== "" ? "input-error border-2 border-error" : ""}`}
              />
            </div>
            <div>
              <h1 className="text-md font-semibold">Classifications:</h1>
              <select
                value={postprops.classifications}
                onChange={(e) => handleInput(e.target.value, "classifications")}
                className={`input bg-base-100 text-neutral rounded-md w-full ${
                  postprops.classifications === ""
                    ? "input-error border-2 border-error"
                    : ""
                }`}
              >
                <option value="" disabled>
                  Select a classification
                </option>
                {classdata.map((option, index) => (
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
                name="publisher"
                onChange={(e) => {
                  handleInput(e.target.value, "publisher");
                }}
                className={`input bg-base-100 text-neutral rounded-md w-full ${
                  postprops.publisher === ""
                    ? "input-error border-2 border-error"
                    : ""
                }`}
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Date of publish:</h1>
              <input
                type="date"
                placeholder="Enter Date of Publish"
                name="date_of_publish"
                onChange={(e) => {
                  handleInput(e.target.value, "date_of_publish");
                }}
                className={`input bg-base-100 text-neutral rounded-md w-full ${
                  postprops.date_of_publish === ""
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
                onChange={(e) => {
                  handleInput(e.target.value, "edition");
                }}
                className={`input bg-base-100 text-neutral rounded-md w-full ${
                  postprops.edition === ""
                    ? "input-error border-2 border-error"
                    : ""
                }`}
              />
            </div>

            <div className="col-span-2 ">
              <h1 className="text-md font-semibold ">Description:</h1>
              <textarea
                onChange={(e) => {
                  handleInput(e.target.value, "description");
                }}
                name="description"
                id=""
                cols="30"
                rows="10"
                placeholder="Enter Book Description"
                className={`input bg-base-100 text-neutral rounded-md p-2 min-h-32 input-bordered w-full ${postprops.description === "" ? "input-error border-2 border-error" : ""} `}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-base-100 col-span-2 rounded-md text-neutral text-xl p-2"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
