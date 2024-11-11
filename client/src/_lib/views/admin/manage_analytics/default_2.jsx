import React from "react";

import Default_2_frequest_strand from "./default_2_frequest_strand";
import { CiExport } from "react-icons/ci";
import { Link, useMatch, useNavigate } from "@tanstack/react-router";

const default_2 = ({ MostFrequestStrandBorrower }) => {
  return (
    <div className="grid grid-cols-4 h-60 gap-4 mt-2 text-[#333333]">
      {/* First div (75% wider) */}
      <div className="col-span-3 rounded-md bg-white p-4 border-2">
        <div className="flex justify-between items-center ">
          <h3 className="mb-2 font-black">
            Most Requested and Borrowed Books by Strand
          </h3>
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

        <Default_2_frequest_strand
          MostFrequestStrandBorrower={MostFrequestStrandBorrower}
        />
      </div>
      {/* Second div */}
      <div className="col-span-1 rounded-md bg-white text-[#333333] border-2 h-56 p-4">
        <h1 className="font-bold">Legend</h1>
        <ul className="list-none pl-2">
          <li style={{ position: "relative", paddingLeft: "20px" }}>
            <span
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: "#D38141", // Change color here for each strand
              }}
            ></span>
            STEM
          </li>
          <li style={{ position: "relative", paddingLeft: "20px" }}>
            <span
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: "blue",
              }}
            ></span>
            ABM
          </li>
          <li style={{ position: "relative", paddingLeft: "20px" }}>
            <span
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: "green",
              }}
            ></span>
            GAS
          </li>
          <li style={{ position: "relative", paddingLeft: "20px" }}>
            <span
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: "green",
              }}
            ></span>
            Cookery
          </li>
          <li style={{ position: "relative", paddingLeft: "20px" }}>
            <span
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: "orange",
              }}
            ></span>
            HUMSS
          </li>
          <li
            className="mb-2"
            style={{
              position: "relative",
              paddingLeft: "20px",
              marginBottom: "5px",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: "#337E7E",
              }}
            ></span>
            ICT
          </li>
        </ul>
      </div>
    </div>
  );
};

export default default_2;
