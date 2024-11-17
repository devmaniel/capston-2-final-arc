import React, { useState } from "react";

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

import useAxiosFetchLRNTable from "../../../hook/useAxiosFetchLRNTable";

import { Link } from "@tanstack/react-router";

import Lrn_table from "./lrn_table";

const lrn_landing = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [status, setStatus] = useState("all");
  const [statuslrn, setStatusLRN] = useState("all");
  const [search, setSearch] = useState("");

  const handleSetPage = (newPage) => {
    setPage(newPage); // Update the page state
  };

  // Function to handle filter selection
  const handleSetFilter = (event) => {
    setFilter(event.target.value);
  };

  // Function to handle status selection
  const handleSetStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSetStatusLRN = (event) => {
    setStatusLRN(event.target.value);
  };
  // Add a function to handle input changes for search
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const { data, loading, error, fetchStatus, totalPages } = useAxiosFetchLRNTable(
    page,
    filter,
    status,
    statuslrn,
    search // Pass search as an argument
  );

  if (!data) {
    return <di>Loading...</di>;
  }

 

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Manage LRN"]} />

            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">
            <div role="tablist" className="tabs tabs-boxed mb-5">
              <Link
                role="tab"
                to="/admin/manage_lrn/"
                className="tab tab-active"
              >
                LRN Table
              </Link>
              <Link
                role="tab"
                to="/admin/manage_lrn/Add_Student"
                className="tab "
              >
                Add Student
              </Link>
              <Link
                role="tab"
                to="/admin/manage_lrn/cycle_account"
                className="tab "
              >
                Cycle LRN
              </Link>
            </div>

            <div className="flex justify-between items-center mt-0 w-full">
              <div className="flex gap-5 items-center w-full">
                <Searchj
                  searchValue={search}
                  handleSearch={handleSearchChange}
                />
                <SelectInput
                  label={"Filter"}
                  value={filter} // Bind value to the filter state
                  onChange={handleSetFilter} // Bind onChange to handleSetFilter
                  options={["newest", "oldest", "A-Z", "Z-A"]}
                />
                <SelectInput
                  label={"Status"}
                  value={status} // Bind value to the status state
                  onChange={handleSetStatus} // Bind onChange to handleSetStatus
                  options={["all", "registered", "unregistered"]}
                />
                <SelectInput
                  label={"Status LRN"}
                  value={statuslrn} // Bind value to the status state
                  onChange={handleSetStatusLRN} // Bind onChange to handleSetStatus
                  options={["all", "enrolled", "unenrolled"]}
                />
              </div>
            </div>

            <div className="mt-5">
              <Lrn_table data={data} /> {/* Pass data as props */}
            </div>
          </section>

          <Pagination totalPages={totalPages} handlePage={handleSetPage} />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default lrn_landing;
