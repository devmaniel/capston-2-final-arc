import React from "react";

import { IoMdBook } from "react-icons/io";
import { LuBookX } from "react-icons/lu";
import { GiBookmark } from "react-icons/gi";

const default_1 = ({ TotalBookActive, TotalOutOfStock, TotalBookBorrowed }) => {
  return (
    <div className="grid grid-cols-3  gap-2 text-white">
      <div className="bg-gradient-to-l from-sky-300 via-sky-400 to-sky-500 p-4 rounded-md flex  justify-between">
        <div>
          <h1 className="font-black">
            Total Books Available: {TotalBookActive}{" "}
          </h1>
          <select className="px-1 py-1 rounded-md mt-1 w-[50%] bg-transparent text-white">
            <option disabled>Pick a Date Range</option>
            <option value="all">All</option>
            <option value="today" className="text-black">Today</option>
            <option value="this_week">This Week</option>
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
            <option value="last_6_months">Last 6 Months</option>
            <option value="one_year_ago">One Year Ago</option>
          </select>
        </div>

        <IoMdBook className="text-white text-4xl" />
      </div>

      <div className="bg-gradient-to-l from-red-300 via-red-400 to-red-500 p-4 rounded-md flex items-center justify-between">
        <div>
          <h1 className="font-black">
            Total Books Unavailable: {TotalOutOfStock}{" "}
            <p className="font-thin text-sm">This week</p>
          </h1>
        </div>

        <LuBookX className="text-white text-4xl" />
      </div>

      <div className="bg-gradient-to-l from-purple-300 via-purple-400 to-purple-500 p-4 rounded-md flex items-center justify-between">
        <div>
          <h1 className="font-black">
            Total Books Borrowed: {TotalBookBorrowed}{" "}
          </h1>
          <p className="font-thin text-sm">This week</p>
        </div>

        <GiBookmark className="text-white text-4xl" />
      </div>
    </div>
  );
};

export default default_1;
