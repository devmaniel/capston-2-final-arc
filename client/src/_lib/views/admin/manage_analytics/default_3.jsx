import React from "react";

import Default_frequent_class from "./default_frequent_class";
import Default_3_frequent_yr from "./default_3_frequent_yr";
import { CiExport } from "react-icons/ci";
import { Link, useMatch, useNavigate } from "@tanstack/react-router";
const default_3 = ({MostYearStrandBorrower, MostYearLevelBorrower}) => {
  return (
    <div className="grid grid-cols-4  gap-4 mt-[210px] my-2 ">
      <div className="col-span-2 rounded-md bg-white text-[#333333] my-2  border-2 p-4">
        <div className="flex justify-between items-center ">
          <h3 className="mb-2 font-black text-[#333333]">
            Most Year level Section borrower (Pie Graph)
          </h3>
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
        <Default_frequent_class MostYearStrandBorrower={MostYearStrandBorrower} />
      </div>

      <div className="col-span-2 rounded-md bg-white p-4 my-2  border-2">
        <div className="flex justify-between items-center ">
          <h3 className="mb-2 font-black text-[#333333]">
            Most Year level Strand borrower (Pie Graph)
          </h3>
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
        <Default_3_frequent_yr  MostYearLevelBorrower={MostYearLevelBorrower}/>
      </div>
    </div>
  );
};

export default default_3;
