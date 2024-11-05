import React, { useState, useEffect } from "react";

// screens components
import Nav from "@screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Tab from "@screen/admin/common/TabPagination";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../../colors/colorMode";
import Pagination from "@screen/admin/common/Paginations";
import SelectInput from "../../screen/admin/common/SelectInput";

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/Footer.scss";

import View_Request_Form from "./View_Request_Form";

import axiosFetchSpecificBookmark from "../../../hook/axiosFetchSpecificBookmark";

import { useLocation } from "@tanstack/react-router";

import axios from "../../../api/axios";

import Swal from "sweetalert2";

const View_Request_Page = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const requestId = queryParams.get("requestId");

  // State to trigger refetch
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  
  // State to manage fetched data
  const { data, loading, error, status } = axiosFetchSpecificBookmark(requestId, refetchTrigger);
  
  console.log("Specific Book Data", data);

  // Initial state for the form
  const [postForm, setPostForm] = useState({
    requestId: "",
    adminComment: "",
    status: "",
    book_id: "",
    phone_number: ""
  });

  // Update form state based on fetched data
  useEffect(() => {
    if (data && data.request) {
      setPostForm({
        requestId: data.request.requestId,
        adminComment: data.request.adminComment || "", // Handle null or undefined comments
        status: data.request.status || "", // Ensure this matches the data structure
        book_id: data.book,
        phone_number: data.user.phoneNumber
      });
    }
  }, [data]);

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data. Please try again.</p>;
  }

  // Handle case where requestId is not provided
  if (!requestId) {
    return <p>No request ID provided. Please check your URL.</p>;
  }

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
  try {
    const response = await axios.post("/admin/post_update_request", postForm); // Adjust the endpoint as needed

    if (response.status === 200) {
      // Check if the response message is "Failed to send SMS."
      if (response.data.message === "Failed to send SMS.") {
        Swal.fire({
          title: "Error!",
          text: "Failed to send SMS.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setRefetchTrigger(!refetchTrigger); // Trigger refetch
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response ? error.response.data.message : "An error occurred",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};


  console.log("Post Form", postForm);

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps
              links={[
                "Components",
                "Manage Request Table",
                "Manage Request Form",
              ]}
            />

            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">
            <div className="flex justify-between items-center mt-2 w-full">
              <View_Request_Form
                data={data}
                postForm={postForm}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </section>
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default View_Request_Page;
