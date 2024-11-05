import React, { useState } from "react";
import { IoIosFunnel } from "react-icons/io";

import { classifications } from "../../../../data/ClassificationsData";

const Categories = ({
  handleClassifications,
  handleFilter,
  propsFilter,
  propsClass,
  onSearch,
}) => {
  const filterOptions = ["newest", "oldest", "a-z", "z-a"];

  // Local state to manage the search input value
  const [searchValue, setSearchValue] = useState("");

  // Function to handle input changes
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Function to handle search button click
  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  // Function to handle key press events
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchValue);
    }
  };

  return (
    <>
      <div className="w-full max-w-[1300px] mx-[auto] ">
        <div className="justify-center title flex  mb-2 items-center p-5 sm:p-0">
          <p className="items-center mx-auto pb-3 pt-5 border-b-2 border-[gainsboro] w-[1260px] text-[30px] font-mono font-bold tracking-[10px] sm:text-[60px] text-center ">
            BOOK CATALOG
          </p>
        </div>

        <div className="categories p-4 text-center mx-auto">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-4 items-center justify-between w-full">
            <div className="w-full sm:w-1/3">
              <div className="label">
                <span className="label-text">Search</span>
                <span className="label-text-alt"></span>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow  py-2 z-50 rounded-md focus:outline-none"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
                <button
                  className="bg-gray-200 hover:bg-gray-300 px-1 py-1 rounded-[50%]"
                  onClick={handleSearchClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 text-gray-600 "
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

            <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-5 sm:gap-7 items-center ">
              <label className="form-control w-full sm:max-w-xs">
                <div className="label">
                  <span className="label-text">Filter</span>
                  <span className="label-text-alt">
                    <IoIosFunnel />
                  </span>
                </div>
                <select
                  className="select select-bordered capitalize"
                  onChange={handleFilter}
                  value={propsFilter}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  {filterOptions.map((filter, index) => (
                    <option key={index} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-control w-full sm:max-w-xs">
                <div className="label">
                  <span className="label-text">Classification</span>
                  <span className="label-text-alt">
                    <IoIosFunnel />
                  </span>
                </div>
                <select
                  className="select select-bordered capitalize"
                  onChange={handleClassifications}
                  value={propsClass}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  {classifications.map((classification, index) => (
                    <option key={index} value={classification}>
                      {classification}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
