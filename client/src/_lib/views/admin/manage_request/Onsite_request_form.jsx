import React from 'react'

import { FiEdit } from "react-icons/fi";

const Onsite_request_form = () => {
  return (
    <div className="bg-neutral rounded-md text-base-100">
    <div className="border-base-100 p-5 border-b flex justify-between">
      <h1 className="font-black">Edit Book</h1>
      <FiEdit className="text-2xl" />
    </div>

    <form
      className="p-5 leading-10 flex flex-col gap-3 text-base-100"
     
    >
      <input
        name="book_image"
        type="file"
        id="file"
        className="mt-2 bg-primary p-2 rounded-md file-input file-input-bordered file-input-md w-full text-neutral"
        
      />

      <input
        type="hidden"
        name="book"
        className="input bg-base-100 text-neutral rounded-md w-full"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-md font-semibold">Book Name:</h1>
          <input
            type="text"
            name="book_name"
           
           
            className="input bg-base-100 text-neutral rounded-md w-full"
          />
        </div>

        <div>
          <h1 className="text-md font-semibold">Author Name:</h1>
          <input
            type="text"
            name="book_author"
            
            className="input bg-base-100 text-neutral rounded-md w-full"
          />
        </div>

        <div>
          <h1 className="text-md font-semibold">ISBN Code:</h1>
          <input
            type="text"
            name="isbn_code"
           
            className="input bg-base-100 text-neutral rounded-md w-full"
          />
        </div>

        <div>
          <h1 className="text-md font-semibold">Quantity:</h1>
          <input
            type="number"
            name="quantity"
           
            className="input bg-base-100 text-neutral rounded-md w-full"
            min="0" // Ensure input does not accept values less than 0
          />
        </div>

       

        

        <div>
          {/* Quantity Input */}
          <h1 className="text-md font-semibold">Quantity:</h1>
          <input
            type="number"
            name="quantity"
           
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
           
            className="input bg-base-100 text-neutral rounded-md w-full"
          />
        </div>

        <div>
          {/* Date of Publish Input */}
          <h1 className="text-md font-semibold">Date of publish:</h1>
          <input
            type="date"
            name="date_of_publish"
           
            className="input bg-base-100 text-neutral rounded-md w-full"
          />
        </div>

        <div className="col-span-2">
          <h1 className="text-md font-semibold">Description:</h1>
          <textarea
            name="description"
            cols="30"
            rows="10"
            
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
  )
}

export default Onsite_request_form
