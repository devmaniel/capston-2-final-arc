import React from "react";

import Default_frequent_class from "./default_frequent_class";
import Default_3_frequent_yr from "./default_3_frequent_yr";
import { CiExport } from "react-icons/ci";
import { Link, useMatch, useNavigate } from "@tanstack/react-router";
const default_3 = ({
  MostYearStrandBorrower,
  MostYearLevelBorrower,
  MostBookBorrowedClassifications,
  MostBookBorrowedBookTitle,
  default2_Date,
  default3_Date,
  default4_Date,
  default5_Date,
  handleDateChange,
}) => {
  return (
    <div className="grid grid-cols-4  gap-4 mt-[210px] my-2 ">
      <div className="col-span-2 rounded-md bg-white text-[#333333] my-2  border-2 p-4">
        <div className="flex justify-between  ">
          <h3 className="mb-2 font-black text-[#333333]">
            Top Borrower by Strand & Year Level
          </h3>
          <div className="flex  items-center justify-end">
            <select
              className="bg-white border px-2 py-1 rounded-md w-[50%]"
              value={default2_Date}
              onChange={(event) => handleDateChange(event, "default2_Date")}
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
              to="/admin/analytics/print_most_year_level_section_borrower"
              activeProps={{ className: "" }}
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
        <Default_frequent_class
          MostYearStrandBorrower={MostYearStrandBorrower}
        />
      </div>

      <div className="col-span-2 rounded-md bg-white p-4 my-2  border-2">
        <div className="flex justify-between items-center ">
          <h3 className="mb-2 font-black text-[#333333]">
            Most Borrowed by Year Level
          </h3>

          <div className="flex items-center gap-2  justify-end">
            <select
              className="bg-white border px-2 py-1 rounded-md w-[50%]"
              value={default3_Date}
              onChange={(event) => handleDateChange(event, "default3_Date")}
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
              to="/admin/analytics/print_most_year_level_borrower"
              activeProps={{ className: "" }}
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
        <Default_3_frequent_yr MostYearLevelBorrower={MostYearLevelBorrower} />
      </div>

      <div className="col-span-2 rounded-md bg-white p-4 my-2  border-2">
        <div className="flex justify-between items-center ">
          <h3 className="mb-2 font-black text-[#333333]">
            Most Borrowed Books Based on Classifications
          </h3>

          <div className="flex items-center gap-2  justify-end">
            <select
              className="bg-white border px-2 py-1 rounded-md w-[50%]"
              value={default4_Date}
              onChange={(event) => handleDateChange(event, "default4_Date")}
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
              to="/admin/analytics/print_most_borrowed_book_class"
              activeProps={{ className: "" }}
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
        <Default_3_frequent_yr MostYearLevelBorrower={MostBookBorrowedClassifications} />
      </div>

      <div className="col-span-2 rounded-md bg-white p-4 my-2  border-2">
        <div className="flex justify-between items-center ">
          <h3 className="mb-2 font-black text-[#333333]">
            Most Borrowed Book Titles
          </h3>

          <div className="flex items-center gap-2  justify-end">
            <select
              className="bg-white border px-2 py-1 rounded-md w-[50%]"
              value={default5_Date}
              onChange={(event) => handleDateChange(event, "default5_Date")}
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
              to="/admin/analytics/print_most_borrowed_title"
              activeProps={{ className: "" }}
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
        <Default_3_frequent_yr MostYearLevelBorrower={MostBookBorrowedBookTitle} />
      </div>
    </div>
  );
};

export default default_3;
