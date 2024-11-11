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

import Scanning_add_books_form from "./Scanning_add_books_form";

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/Footer.scss";

// api
import { axiosFetchTableBook } from "../../../hook/axiosFetchTableBook";
import { axiosFetch } from "../../../hook/axiosFetch";
import axios from "../../../api/axios";

import Swal from "sweetalert2";

import { formclass } from "../../../data/FormClassification";

import CreateForm from "../../../views/screen/admin/create_books/form";


const Scanning_add_books_barcode = () => {
    const tabLinks = [
        { name: "Manage Books", path: "/admin/manage_books" },
        { name: "Add Books", path: "/admin/manage_books/create_books" },
        { name: "Add Books using QR Scanner", path: "/admin/manage_books/qr_scan_add_books" },
        { name: "Add Books using Barcode", path: "/admin/manage_books/qr_scan_add_books_barcode" }
        
        
      ];

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
          <Breadcrumps
              links={["Components", "Manage Books", "Add Books using QR Scan",]}
            />

            <div className="flex items-center gap-2 right-nav">
            
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">

          <Tab tablink={tabLinks} />
           
            <div className="flex justify-between items-center mt-0 h-full pt-5 w-full">
              <Scanning_add_books_form />
            </div>

            <CreateForm  />
          </section>

          <Pagination />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  )
}

export default Scanning_add_books_barcode