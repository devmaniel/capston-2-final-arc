import React from "react";

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

const analytics_landing_page = () => {


  let { data: TotalBookActive } = axiosFetch(
    "/admin/analytics/total_book_active"
  );
  let { data: TotalOutOfStock } = axiosFetch(
    "/admin/analytics/total_out_of_stock"
  );
  let { data: TotalBookBorrowed } = axiosFetch(
    "/admin/analytics/total_borrowed_book"
  );

  const { arrayData: MostFrequestStrandBorrower } = useAxiosFetchArrayData('/admin/analytics/most_request_strand_borrower_bar'); // Replace with your API endpoint
  
  const { arrayData: MostYearStrandBorrower } = useAxiosFetchArrayData('/admin/analytics/most_request_strand_borrower'); // Replace with your API endpoint
  
  const { arrayData: MostYearLevelBorrower } = useAxiosFetchArrayData('/admin/analytics/most_request_strand_borrower'); // Replace with your API endpoint
  

  if (!TotalBookActive && !TotalOutOfStock && !TotalBookBorrowed && !MostFrequestStrandBorrower && !MostYearStrandBorrower && MostYearLevelBorrower)
    return <div>Loadin... </div>;


  console.log("MostFrequestStrandBorrower", MostFrequestStrandBorrower);
  
  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Analytics"]} />

            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">
            <div className="w-full bg-white p-4 text-[#333333] font-bold tracking-[1px] text-[18px] mb-2 rounded-md shadow-lg">
              Books
            </div>
            <Default_1
              TotalBookActive={TotalBookActive}
              TotalOutOfStock={TotalOutOfStock}
              TotalBookBorrowed={TotalBookBorrowed}
            />
            <Default_2 MostFrequestStrandBorrower={MostFrequestStrandBorrower} />
            <div className="mt-2">
              <Default_3 MostYearStrandBorrower={MostYearStrandBorrower} MostYearLevelBorrower={MostYearLevelBorrower}/>
            </div>
          </section>

          <Pagination />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default analytics_landing_page;
