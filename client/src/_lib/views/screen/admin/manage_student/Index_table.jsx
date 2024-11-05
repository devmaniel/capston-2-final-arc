import React, { useState } from "react";

import Nav from "../../../screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../../../colors/colorMode";
import Base1 from "../../../screen/admin/default/Base1";
import Tab from "@screen/admin/common/TabPagination";

import Searchj from "../manage_books/searchj";
import SelectInput from "../common/SelectInput";

import Studnt_table from "./studnt_table";

import useAxiosFetchStudentTable from "../../../../hook/useAxiosFetchStudentTable";

const Index_table = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState(""); // Initialize with empty string instead of null

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const handleStatus = (event) => {
    const newStatus = event.target.value.toLowerCase(); // Ensure lowercase
    console.log("New status:", newStatus); // Debugging line
    setStatus(newStatus); // Update the status state
  };

  // Fetch the student data using the hook, passing in page, filter, and status
  const { data, loading, error } = useAxiosFetchStudentTable(
    page,
    filter,
    status,
    search
  );

  if (!data && loading) return <div>Loading...</div>; // Show a loading message while data is being fetched
  if (error) return <div>Error: {error}</div>; // Show an error message if something goes wrong

  console.log(`Original Data`, data.pagination);
  console.log(`Student table data:`, data.data);

  const tabLinks = [];

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Manage Students"]} />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-4">
            <div className="flex justify-between items-center mt-2 w-full">
              <div className="flex gap-5 items-center w-full">
                <Searchj searchValue={search} handleSearch={handleSearch} />
                <SelectInput
                  label={"Filter"}
                  options={["newest", "oldest", "a-z", "z-a"]}
                  onChange={handleFilter} // Pass the handleFilter to the SelectInput
                />
                <SelectInput
                  label={"Status"}
                  options={["All", "Active", "Violated"]}
                  onChange={handleStatus} // Pass the handleStatus to the SelectInput
                />

               
              </div>
            </div>
            <Studnt_table studentdata={data.data} />

            <div className="join mt-5 flex justify-center">
              {data.pagination &&
                Array.from(
                  { length: data.pagination.totalPages },
                  (_, index) => {
                    const pageNumber = index + 1; // Page numbers start from 1
                    return (
                      <button
                        key={pageNumber}
                        className={`join-item btn ${page === pageNumber ? "active" : ""}`} // Add 'active' class for current page
                        onClick={() => handlePage(pageNumber)} // Set page on click
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                )}

              {/* Optional: Display ellipsis if there are many pages */}
              {data.pagination && data.pagination.totalPages > 5 && (
                <>
                  <button className="join-item btn btn-disabled">...</button>
                  <button
                    className="join-item btn"
                    onClick={() => handlePage(data.pagination.totalPages)} // Go to last page
                  >
                    {data.pagination.totalPages}
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
      <footer className="w-full h-10 mt-[1600px]"></footer>
    </>
  );
};

export default Index_table;
