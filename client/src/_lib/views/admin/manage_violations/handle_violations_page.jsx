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

import Handle_violations_form from "./handle_violations_form";
import Handle_violations_history from "./handle_violations_history";

import { useSearch } from "@tanstack/react-router";

import useAxiosSpecificViolations from "../../../hook/useAxiosSpecificViolations";

const handle_violations_page = () => {
  // Get the search params using the useSearch hook
  const { violations_id } = useSearch({
    from: "/admin/manage_violations/handle_violations",
  });

  const { data, loading, error, status } =
    useAxiosSpecificViolations(violations_id);

  const handleUpdateStatus = async (violations_id, statusUpdate) => {
    try {
      // Show loading alert for 1.5 seconds
      Swal.fire({
        title: "Updating...",
        text: "Please wait while we update the violation status.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        "/admin/post_update_specific_violations",
        {
          violations_id,
          statusUpdate,
        }
      );

      // Add a 1.5 seconds delay before closing the loading and showing the result
      setTimeout(() => {
        if (response.status === 200) {
          // Close loading alert and show success message
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Violation status updated successfully.",
          });
        }
      }, 1500); // 1.5 seconds delay
    } catch (error) {
      console.error("Error updating violation status:", error);
      let errorMessage =
        "An error occurred while updating the violation status.";

      if (error.response && error.response.status === 404) {
        errorMessage = "Violation not found.";
      }

      // Add a 1.5 seconds delay before closing the loading and showing the error
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorMessage,
        });
      }, 1500); // 1.5 seconds delay
    }
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Violations ID:", violations_id);
  console.log("Violations Data", data);

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps
              links={["Components", "Manage Violations", "Handle Violations"]}
            />

            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">
            <Handle_violations_history
              handleUpdateStatus={handleUpdateStatus}
              violations_data={data.data}
            />
            <Handle_violations_form user_data={data.data} />
          </section>

          <Pagination />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default handle_violations_page;
