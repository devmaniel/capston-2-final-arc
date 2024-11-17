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
import Searchj from "../../screen/admin/manage_books/searchj";
import Request_table from "./request_table";

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/Footer.scss";

import axiosFetchRequest from "../../../hook/axiosFetchRequest";

const manage_request_index = () => {
  const validStatuses = [
    "all",
    "pending",
    "accepted",
    "rejected",
    "borrowed",
    "return",
    "completed",
    "cancelled",
    "violated",
  ];

  // State to manage the current page and status
  const [pageState, setPageState] = useState(1); // Initialize pageState as a number
  const [statusState, setStatusState] = useState("all"); // Initialize statusState with the default value
  const [formatState, setFormatState] = useState("Newest");
  const [searchState, setSearchState] = useState("");

  // Update searchState when input changes
  const handleSearchState = (event) => {
    setSearchState(event.target.value); // Set searchState to input value
  };

  // Handle format state change
  const handleFormatState = (event) => {
    const newFormat = event.target.value; // Get the new format value
    setFormatState(newFormat); // Update the format state based on selection
    console.log("Format State changed to:", newFormat); // Log the new format state
  };

  // Function to handle page changes
  const handlePage = (newPage) => {
    setPageState(newPage); // Update the page state
  };

  // Function to handle status changes
  const handleStatus = (newStatus) => {
    console.log("Status", newStatus);
    if (validStatuses.includes(newStatus)) {
      setStatusState(newStatus); // Update the status state
      setPageState(1); // Reset to the first page whenever status changes
    }
  };

  // Fetch requests based on the current status, page, format, and search term
  const { requests, loading, error, pagination } = axiosFetchRequest(
    statusState,
    pageState,
    formatState,
    searchState // Pass searchState to the function
  );

 
  if (error) return <div>{error}</div>;
  if (!requests) return <div>No data available</div>;

  console.log("Test", requests);
  console.log("Total Page", pagination);

  // Ensure requests is an object with a 'requests' property that is an array
  const requestData =
    requests && Array.isArray(requests.requests) ? requests.requests : [];

  console.log("Formatted requestData:", requestData);

  const tabLinks = [
    { name: "Manage Request", path: "/admin/manage_request" },
    { name: "Scan Request", path: "/admin/manage_request/scan_request" },
  ];

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Manage Books"]} />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>
          <section className="mx-5 ">
          <Tab tablink={tabLinks} />
            <div className="flex justify-between items-center mt-2 ">
              <div className="flex gap-5 items-center w-full">
              <Searchj searchValue={searchState} handleSearch={handleSearchState} />

                <SelectInput
                  label={"Filter"}
                  options={["Newest", "Oldest", "A-Z", "Z-A"]}
                  value={formatState} // Pass the current format state value
                  onChange={handleFormatState} // Pass the change handler
                />

                <SelectInput
                  label={"Request Status"}
                  options={validStatuses} // Use validStatuses directly
                  value={statusState} // Bind the current status state
                  onChange={(e) => handleStatus(e.target.value)} // Update the status state on change
                />
              </div>
            </div>

            <Request_table requests={requests} />
          </section>
          <Pagination
            totalPages={pagination.totalPages}
            handlePage={handlePage}
          />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default manage_request_index;
