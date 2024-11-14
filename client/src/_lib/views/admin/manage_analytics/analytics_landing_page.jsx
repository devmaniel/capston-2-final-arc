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
  const [default1_Date, setDefault1_Date] = useState("this_week");
  const [default2_Date, setDefault2_Date] = useState("all");
  const [default3_Date, setDefault3_Date] = useState("all");

  // Handler function to update state based on the selected date range
  const handleDateChange = (event, dateType) => {
    const newValue = event.target.value;

    switch (dateType) {
      case "default1_Date":
        setDefault1_Date(newValue);
        break;
      case "default2_Date":
        setDefault2_Date(newValue);
        break;
      case "default3_Date":
        setDefault3_Date(newValue);
        break;
      default:
        console.warn("Unknown date type:", dateType);
    }
  };

  const { data: TotalBookActive, loading: TotalBookActiveLoading } = axiosFetch(
    `/admin/analytics/total_book_active`
  );
  const { data: TotalOutOfStock, loading: TotalOutOfStockLoading } = axiosFetch(
    "/admin/analytics/total_out_of_stock"
  );
  const { data: TotalBookBorrowed, loading: TotalBookBorrowedLoading } =
    axiosFetch(`/admin/analytics/total_borrowed_book`);

  const {
    arrayData: MostFrequestStrandBorrower,
    loading: MostFrequestStrandBorrowerLoading,
  } = useAxiosFetchArrayData(
    `/admin/analytics/most_request_strand_borrower_bar?date=${default1_Date}`
  );
  const {
    arrayData: MostYearStrandBorrower,
    loading: MostYearStrandBorrowerLoading,
  } = useAxiosFetchArrayData(`/admin/analytics/most_request_strand_borrower?date=${default3_Date}`);
  const {
    arrayData: MostYearLevelBorrower,
    loading: MostYearLevelBorrowerLoading,
  } = useAxiosFetchArrayData(`/admin/analytics/most_year_level_borrower?date=${default2_Date}`);

  // Check if any loading state is true
  if (
    TotalBookActiveLoading ||
    TotalOutOfStockLoading ||
    TotalBookBorrowedLoading ||
    MostFrequestStrandBorrowerLoading ||
    MostYearStrandBorrowerLoading ||
    MostYearLevelBorrowerLoading
  ) {
    return <div>Loading...</div>;
  }

  // Handlers for filters
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  return (
    <>
      <div className="flex h-max">
        <Drawer dh={"h-lvh"} />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between">
            <Breadcrumps links={["Components", "Analytics"]} />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5">
            {/* Default Components Rendered with Props */}
            <Default_1
              TotalBookActive={TotalBookActive}
              TotalOutOfStock={TotalOutOfStock}
              TotalBookBorrowed={TotalBookBorrowed}
            />

            <Default_2
              MostFrequestStrandBorrower={MostFrequestStrandBorrower}
              default1_Date={default1_Date}
              handleDateChange={handleDateChange}
            />

            <div className="mt-2">
              <Default_3
                MostYearStrandBorrower={MostYearLevelBorrower}
                MostYearLevelBorrower={MostYearStrandBorrower}
                default2_Date={default2_Date}
                default3_Date={default3_Date}
                handleDateChange={handleDateChange}
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
