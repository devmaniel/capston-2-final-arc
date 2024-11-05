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
import { axiosFetchTableBook } from "../../../hook/axiosFetchTableBook";
import { axiosFetch } from "../../../hook/axiosFetch";
import axios from "../../../api/axios";

import Swal from "sweetalert2";

import { Link } from "@tanstack/react-router";

import Lrn_table from "./lrn_table";

const lrn_landing = () => {
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
                to="/admin/manage_lrn/cycle_account"
                className="tab "
              >
                Cycle LRN
              </Link>
            </div>

            <div className="flex justify-between items-center mt-0 w-full">
              <div className="flex gap-5 items-center w-full">
                <Searchj />
                <SelectInput
                  label={"Filter"}
                  options={["newest", "oldest", "A-Z", "Z-A"]}
                />
                <SelectInput
                  label={"Status"}
                  options={["registered", "unregistered"]}
                />
              </div>
            </div>

            <div className="mt-5">
              <Lrn_table />
            </div>
          </section>

          <Pagination />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default lrn_landing;
