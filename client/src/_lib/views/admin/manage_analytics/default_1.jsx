import React from "react";

import { IoMdBook } from "react-icons/io";
import { LuBookX } from "react-icons/lu";
import { GiBookmark } from "react-icons/gi";

const default_1 = ({
  singledefault1 = { singledefault1 },
  singledefault2 = { singledefault2 },
  singledefault3 = { singledefault3 },
  handleDateChange = { handleDateChange },
  TotalBookActive,
  TotalOutOfStock,
  TotalBookBorrowed,
}) => {
  return (
    <div className="grid grid-cols-3  gap-2 text-white">
      <div className="bg-gradient-to-l from-sky-300 via-sky-400 to-sky-500 p-4 rounded-md flex  justify-between">
        <div>
          <h1 className="font-black">
            Total Books Available: {TotalBookActive}{" "}
          </h1>
          <select
            className=" text-xs py-1 rounded-md mt-1 w-[70%] bg-transparent text-white"
            value={singledefault1}
            onChange={(event) => handleDateChange(event, "singledefault1")}
          >
            <option disabled className="text-black">
              Pick a Date Range
            </option>
            <option value="all" className="text-black">
              All
            </option>
            <option value="today" className="text-black">
              Today
            </option>
            <option value="this_week" className="text-black">
              This Week
            </option>
            <option value="last_week" className="text-black">
              Last Week
            </option>
            <option value="last_month" className="text-black">
              Last Month
            </option>
            <option value="last_6_months" className="text-black">
              Last 6 Months
            </option>
            <option value="one_year_ago" className="text-black">
              One Year Ago
            </option>
          </select>
        </div>

        <IoMdBook className="text-white text-4xl" />
      </div>

      <div className="bg-gradient-to-l from-red-300 via-red-400 to-red-500 p-4 rounded-md flex items-center justify-between">
        <div>
          <h1 className="font-black">
            Total Books Unavailable: {TotalOutOfStock}{" "}
          </h1>
          <select
            className=" text-xs py-1 rounded-md mt-1 w-[70%] bg-transparent text-white"
            value={singledefault2}
            onChange={(event) => handleDateChange(event, "singledefault2")}
          >
            <option disabled className="text-black">
              Pick a Date Range
            </option>
            <option value="all" className="text-black">
              All
            </option>
            <option value="today" className="text-black">
              Today
            </option>
            <option value="this_week" className="text-black">
              This Week
            </option>
            <option value="last_week" className="text-black">
              Last Week
            </option>
            <option value="last_month" className="text-black">
              Last Month
            </option>
            <option value="last_6_months" className="text-black">
              Last 6 Months
            </option>
            <option value="one_year_ago" className="text-black">
              One Year Ago
            </option>
          </select>
        </div>

        <LuBookX className="text-white text-4xl" />
      </div>

      <div className="bg-gradient-to-l from-purple-300 via-purple-400 to-purple-500 p-4 rounded-md flex items-center justify-between">
        <div>
          <h1 className="font-black">
            Total Books Borrowed: {TotalBookBorrowed}{" "}
          </h1>
          <select
            className=" text-xs py-1 rounded-md mt-1 w-[70%] bg-transparent text-white"
            value={singledefault3}
            onChange={(event) => handleDateChange(event, "singledefault3")}
          >
            <option disabled className="text-black">
              Pick a Date Range
            </option>
            <option value="all" className="text-black">
              All
            </option>
            <option value="today" className="text-black">
              Today
            </option>
            <option value="this_week" className="text-black">
              This Week
            </option>
            <option value="last_week" className="text-black">
              Last Week
            </option>
            <option value="last_month" className="text-black">
              Last Month
            </option>
            <option value="last_6_months" className="text-black">
              Last 6 Months
            </option>
            <option value="one_year_ago" className="text-black">
              One Year Ago
            </option>
          </select>
        </div>

        <GiBookmark className="text-white text-4xl" />
      </div>
    </div>
  );
};

export default default_1;
