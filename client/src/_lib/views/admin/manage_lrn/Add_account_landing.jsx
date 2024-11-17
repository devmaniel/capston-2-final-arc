import React from "react";

import { Link } from "@tanstack/react-router";

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

import Swal from "sweetalert2";

import axios from "../../../api/axios"

import Add_account_form from "./Add_account_form";

const Add_account_landing = () => {
  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Manage LRN", "Add Student"]} />

            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">
            <div role="tablist" className="tabs tabs-boxed mb-5">
              <Link role="tab" to="/admin/manage_lrn/" className="tab">
                LRN Table
              </Link>
              <Link
                role="tab"
                to="/admin/manage_lrn/Add_Student"
                className="tab tab-active"
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
                <Add_account_form />
            </div>
          </section>

          <Pagination />
        </div>
      </div>
     
    </>
  );
};

export default Add_account_landing;
