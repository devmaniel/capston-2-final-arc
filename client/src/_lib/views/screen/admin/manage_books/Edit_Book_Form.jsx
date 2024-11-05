import React from "react";
import { FiEdit } from "react-icons/fi";

// class data
import { formclass } from "../../../../data/FormClassification";

const Edit_Book_Form = ({
  data,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div className="bg-neutral rounded-md text-base-100">
      <div className="border-base-100 p-5 border-b flex justify-between">
        <h1 className="font-black">Edit Book</h1>
        <FiEdit className="text-2xl" />
      </div>

      <form
        className="p-5 leading-10 flex flex-col gap-3 text-base-100"
        onSubmit={handleSubmit}
      >
        <input
          name="book_image"
          type="file"
          id="file"
          className="mt-2 bg-primary p-2 rounded-md file-input file-input-bordered file-input-md w-full text-neutral"
          onChange={(e) => handleInputChange(e.target.files[0], "book_image")}
        />

        <input
          type="hidden"
          name="book"
          value={data.id}
          className="input bg-base-100 text-neutral rounded-md w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-md font-semibold">Book Name:</h1>
            <input
              type="text"
              name="book_name"
              placeholder={data.book_name} // Set the original value as a placeholder
              value={formData.book_name || ""}
              onChange={(e) => handleInputChange(e.target.value, "book_name")}
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Author Name:</h1>
            <input
              type="text"
              name="book_author"
              placeholder={data.book_author}
              value={formData.book_author || ""}
              onChange={(e) => handleInputChange(e.target.value, "book_author")}
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">ISBN Code:</h1>
            <input
              type="text"
              name="isbn_code"
              placeholder={data.isbn_code}
              value={formData.isbn_code || ""}
              onChange={(e) => handleInputChange(e.target.value, "isbn_code")}
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Quantity:</h1>
            <input
              type="number"
              name="quantity"
              placeholder={data.quantity}
              value={formData.quantity || ""}
              onChange={(e) => handleInputChange(e.target.value, "quantity")}
              className="input bg-base-100 text-neutral rounded-md w-full"
              min="0" // Ensure input does not accept values less than 0
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Classifications:</h1>
            <select
              name="classification"
              value={formData.classifications_name || data.classifications_name} // Fallback to bookData if no changes
              onChange={(e) =>
                handleInputChange(e.target.value, "classifications_name")
              }
              className="input bg-base-100 text-neutral rounded-md w-full"
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
            <h1 className="text-md font-semibold">Book Status:</h1>
            <select
              name="bookstatus"
              value={formData.book_status || data.book_status} // Fallback to data if no changes
              onChange={
                (e) => handleInputChange(e.target.value, "book_status") // Make sure to update the correct field
              }
              className="input bg-base-100 text-neutral rounded-md w-full"
            >
              <option value="" disabled>
                Select a book status
              </option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>

          <div>
            {/* Quantity Input */}
            <h1 className="text-md font-semibold">Quantity:</h1>
            <input
              type="number"
              name="quantity"
              placeholder={data.quantity}
              value={formData.quantity || ""}
              onChange={(e) => handleInputChange(e.target.value, "quantity")}
              className="input bg-base-100 text-neutral rounded-md w-full"
              min="0"
            />
          </div>

          <div>
            {/* Edition Input */}
            <h1 className="text-md font-semibold">Edition:</h1>
            <input
              type="text"
              placeholder="Enter Edition"
              name="edition"
              value={formData.edition || data.edition}
              onChange={(e) => handleInputChange(e.target.value, "edition")}
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            {/* Publishers Input */}
            <h1 className="text-md font-semibold">Publishers:</h1>
            <input
              type="text"
              placeholder="Enter Publishers"
              name="publishers"
              value={formData.publisher || data.publisher}
              onChange={(e) => handleInputChange(e.target.value, "publisher")}
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            {/* Date of Publish Input */}
            <h1 className="text-md font-semibold">Date of publish:</h1>
            <input
              type="date"
              name="date_of_publish"
              value={formData.date_of_publish || data.date_of_publish}
              onChange={(e) =>
                handleInputChange(e.target.value, "date_of_publish")
              }
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div className="col-span-2">
            <h1 className="text-md font-semibold">Description:</h1>
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder={data.description}
              value={formData.description || ""}
              onChange={(e) => handleInputChange(e.target.value, "description")}
              className="input bg-base-100 text-neutral rounded-md p-2 min-h-32 input-bordered w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-base-100 col-span-2 rounded-md text-neutral text-xl p-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit_Book_Form;
