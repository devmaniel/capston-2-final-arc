import React from "react";

import Default_2_frequest_strand from "./default_2_frequest_strand";
import { CiExport } from "react-icons/ci";
import { Link, useMatch, useNavigate } from "@tanstack/react-router";

import { CiCalendarDate } from "react-icons/ci";

const default_2 = ({
  MostFrequestStrandBorrower,
  default1_Date,
  handleDateChange,
}) => {
  return (
    <div className="grid grid-cols-2 h-52 gap-4 mt-2 text-[#333333]">
      {/* First div (75% wider) */}
      <div className="col-span-3 rounded-md bg-white p-4 border-2">
        <div className="flex justify-between items-center ">
          <h3 className="mb-2 font-black">
            Most Requested and Borrowed Books by Strand
          </h3>

          <div className="flex items-center gap-5">
            <select
              className="bg-white border px-2 py-1 rounded-md"
              value={default1_Date}
              onChange={(event) => handleDateChange(event, "default1_Date")}
            >
              <option disabled>Pick a Date Range</option>
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="last_week">Last Week</option>
              <option value="last_month">Last Month</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="one_year_ago">One Year Ago</option>
            </select>

            <Link
              to="/admin/analytics/most_frequest_strand_borrower"
              activeProps={{ className: "text-primary font-black" }}
              activeOptions={{ exact: true }}
            >
              <button
                className="hover:bg-slate-300 duration-300 transition hover:text-white p-2 rounded tooltip"
                data-tip="Export Data"
              >
                <CiExport className="text-[18px] hover:underline" />
              </button>
            </Link>
          </div>
        </div>

        <Default_2_frequest_strand
          MostFrequestStrandBorrower={MostFrequestStrandBorrower}
        />
      </div>
      
    </div>
  );
};

export default default_2;
