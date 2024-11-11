import React, { useState, useEffect } from "react";

// screens components
import Nav from "@screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Tab from "@screen/admin/common/TabPagination";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../../colors/colorMode";
import Pagination from "@screen/admin/common/Paginations";
import SelectInput from "../../screen/admin/common/SelectInput";

// screens manage_books
import Table from "@screen/admin/manage_books/table";
import Searchj from "../../screen/admin/manage_books/searchj";

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/Footer.scss";

// api
import axios from "../../../api/axios";

import Swal from "sweetalert2";

// default
import Default_1 from "./default_1";
import Default_2 from "./default_2";
import Default_3 from "./default_3";

import { axiosFetch } from "../../../hook/axiosFetch";

import useAxiosFetchArrayData from "../../../hook/useAxiosFetchArrayData";

const AnalyticsLandingPage = () => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");

  const { data: TotalBookActive } = axiosFetch(
    "/admin/analytics/total_book_active"
  );
  const { data: TotalOutOfStock } = axiosFetch(
    "/admin/analytics/total_out_of_stock"
  );
  const { data: TotalBookBorrowed } = axiosFetch(
    "/admin/analytics/total_borrowed_book"
  );

  const { arrayData: MostFrequestStrandBorrower } = useAxiosFetchArrayData(
    "/admin/analytics/most_request_strand_borrower_bar"
  );
  const { arrayData: MostYearStrandBorrower } = useAxiosFetchArrayData(
    "/admin/analytics/most_request_strand_borrower"
  );
  const { arrayData: MostYearLevelBorrower } = useAxiosFetchArrayData(
    "/admin/analytics/most_year_level_borrower"
  );

  // Loading state check
  if (
    !TotalBookActive ||
    !TotalOutOfStock ||
    !TotalBookBorrowed ||
    !MostFrequestStrandBorrower ||
    !MostYearStrandBorrower ||
    !MostYearLevelBorrower
  ) {
    return <div>Loading...</div>;
  }

  // Handlers for filters
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between">
            <Breadcrumps links={["Components", "Analytics"]} />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5">
            <div className="mb-2 ">
              <div className="flex gap-4 justify-between">
                <div className="flex flex-col w-full md:w-1/3">
                  <label
                    htmlFor="category"
                    className="font-medium text-sm text-neutral"
                  >
                    Classifications
                  </label>
                  <select
                    id="category"
                    className="mt-2 p-2 border border-gray-300 rounded-md text-[#333333]"
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    <option value="fiction">ABM</option>
                    <option value="non-fiction">GAS</option>
                    <option value="science">STEM</option>
                    <option value="science">ICT</option>
                    <option value="science">COOKERY</option>
                    <option value="science">ACADEMIC</option>
                    <option value="science">TVL</option>
                  </select>
                </div>

                {/* Filter 2: Dropdown for Book Status */}
                <div className="flex flex-col w-full md:w-1/3">
                  <label
                    htmlFor="status"
                    className="font-medium text-sm text-neutral"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="mt-2 p-2 border border-gray-300 rounded-md text-[#333333]"
                    onChange={handleStatusChange}
                  >
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                    <option value="out-of-stock">Unavailable</option>
                  </select>
                </div>

                {/* Filter 3: Date Picker for Year */}
                <div className="flex flex-col w-full md:w-1/3">
                  <label
                    htmlFor="year"
                    className="font-medium text-sm text-neutral"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="year"
                    className="mt-2 p-2 border border-gray-300 rounded-md text-[#333333]"
                    onChange={handleYearChange}
                  />
                </div>
              </div>
            </div>

            {/* Default Components Rendered with Props */}
            <Default_1
              TotalBookActive={TotalBookActive}
              TotalOutOfStock={TotalOutOfStock}
              TotalBookBorrowed={TotalBookBorrowed}
            />

            <Default_2
              MostFrequestStrandBorrower={MostFrequestStrandBorrower}
            />

            <div className="mt-2">
              <Default_3
                MostYearStrandBorrower={MostYearLevelBorrower}
                MostYearLevelBorrower={MostYearStrandBorrower}
              />
            </div>
          </section>

          <Pagination />
        </div>
      </div>

      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default AnalyticsLandingPage;
