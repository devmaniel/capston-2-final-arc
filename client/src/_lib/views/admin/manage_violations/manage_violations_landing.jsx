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


import Violations_table from "./violations_table";

import useAxiosFetchViolations from "../../../hook/useAxiosFetchViolations";


const manage_violations_landing = () => {
  const { data, loading, error } = useAxiosFetchViolations();

  if (loading) return <p>Loading violations...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("Violations Data", data);

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Manage Violations"]} />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">
            <div className="flex justify-between items-center mt-0 w-full">
              <div className="flex gap-5 items-center w-full">
                <Searchj />
                <SelectInput label="Filter" options={["newest", "oldest", "A-Z", "Z-A"]} />
                <SelectInput label="Status" options={["violated", "resolved"]} />
              </div>
            </div>

            <div className="mt-5">
              <Violations_table data={data} />
            </div>
          </section>

          <Pagination />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default manage_violations_landing;

