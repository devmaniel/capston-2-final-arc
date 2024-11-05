import React from "react";

import { MdAccountCircle } from "react-icons/md";

export default function create_form({
  postprops,
  handleFormSubmit,
  handleInput,
  isError,
}) {
  return (
    <>
      <div className="bg-primary rounded-md">
        <div className="border-white p-5 border-b flex justify-between">
          <h1 className="font-black">Create Account Form</h1>

          <MdAccountCircle className="text-2xl" />
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="p-5 leading-10 flex flex-col gap-3"
        >
          <div className="">
            <label htmlFor="file" className="text-md  font-semibold">
              Profile Image:
            </label>
            <input
              type="file"
              className="mt-2 bg-sky-500 file-input file-input-bordered file-input-md w-full text-white "
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h1 className="text-md font-semibold">First Name:</h1>
              <input
                onChange={(e) => {
                  handleInput(e.target.value, "firstName");
                }}
                type="text"
                placeholder="enter first name"
                className="input bg-white text-black rounded-md input-bordered w-full "
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Last Name:</h1>
              <input
                type="text"
                onChange={(e) => {
                  handleInput(e.target.value, "lastName");
                }}
                placeholder="enter last author"
                className="input bg-white text-black rounded-md input-bordered w-full "
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">
                Learner References Number:
              </h1>
              <input
                type="text"
                onChange={(e) => {
                  handleInput(e.target.value, "LRN");
                }}
                placeholder="enter lrn"
                className="input bg-white text-black rounded-md input-bordered w-full "
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Email:</h1>
              <input
                onChange={(e) => {
                  handleInput(e.target.value, "email");
                }}
                type="text"
                placeholder="enter email"
                className="input bg-white text-black rounded-md input-bordered w-full "
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Phone Number:</h1>
              <input
                onChange={(e) => {
                  handleInput(e.target.value, "pn");
                }}
                type="text"
                placeholder="enter phone number"
                className="input bg-white text-black rounded-md input-bordered w-full "
              />
            </div>

            <div>
              <h1 className="text-md font-semibold">Password:</h1>
              <input
                onChange={(e) => {
                  handleInput(e.target.value, "pw");
                }}
                type="password"
                placeholder="enter password"
                className="input bg-white text-black rounded-md input-bordered w-full "
              />
            </div>

            <div className="flex gap-5">
              <div>
                <h1 className="text-md font-semibold">Course/Track:</h1>
                <select
                  onChange={(e) => {
                    handleInput(e.target.value, "cs");
                  }}
                  className="input bg-white text-black rounded-md input-bordered w-32 "
                >
                  <option value="drama">ABM</option>
                  <option value="action">GAS</option>
                  <option value="romance">STEM</option>
                </select>
              </div>

              <div>
                <h1 className="text-md font-semibold">Section:</h1>
                <select
                  onChange={(e) => {
                    handleInput(e.target.value, "section");
                  }}
                  className="input bg-white text-black rounded-md input-bordered w-32 "
                >
                  <option value="drama">ABM - 1</option>
                  <option value="action">ABM - 2</option>
                  <option value="romance">ABM - 3</option>
                </select>
              </div>
              <div>
                <h1 className="text-md font-semibold">Account Type:</h1>
                <select
                  onChange={(e) => {
                    handleInput(e.target.value, "type");
                  }}
                  className="input bg-white text-black rounded-md input-bordered w-32 "
                >
                  <option value="drama">Staff</option>
                  <option value="action">Teacher</option>
                  <option value="romance">Student</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-sky-500 col-span-2 rounded-md text-xl p-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
