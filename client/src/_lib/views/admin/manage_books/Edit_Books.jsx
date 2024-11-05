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

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/AdminSection.scss";

import Edit_Book_Form from "../../screen/admin/manage_books/Edit_Book_Form";

import { axiosFetchEditBook } from "../../../hook/axiosFetchEditBook";
import { useSearch } from "@tanstack/react-router";

import { useState, useEffect } from "react";

import Swal from "sweetalert2";

import axios from "../../../api/axios";

const Edit_Books = () => {
  const { book_id } = useSearch({ from: "/admin/manage_books/edit_book" });

  console.log("Book ID:", book_id);

  const {
    data: bookData,
    status: fetchStatus,
    refetch: refetchBookData,
  } = axiosFetchEditBook(`/admin/table_book/view/edit/${book_id}`);

  console.log(bookData);

  const [formData, setFormData] = useState({
    id: "",
    book_name: "",
    book_author: "",
    isbn_code: "",
    quantity: "",
    publisher: null,
    date_of_publish: null,
    edition: null,
    classifications_name: "",
    description: "",
    book_img_file: null,
    book_status: "",
  });

  useEffect(() => {
    if (bookData) {
      setFormData({
        id: bookData.id || "",
        book_name: bookData.book_name || "",
        book_author: bookData.book_author || "",
        isbn_code: bookData.isbn_code || "",
        quantity: bookData.quantity || "",
        publisher: bookData.publisher || null, // Added publisher
        date_of_publish: bookData.date_of_publish || null, // Added date_of_publish
        edition: bookData.edition || null, // Added edition
        classifications_name: bookData.classifications_name || "",
        description: bookData.description || "",
        book_img_file: bookData.book_img_file || null,
        book_status: bookData.book_status || "",
      });
    }
  }, [bookData]);

  const handleInputChange = (value, type_of_field) => {
    setFormData((prevData) => ({
      ...prevData,
      [type_of_field]: value,
    }));
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to edit this book.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        if (formData.book_img_file instanceof File) {
          formDataToSend.append("file", formData.book_img_file);
        }

        Swal.fire({
          title: "Loading...",
          text: "Submitting the edit request.",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await axios.post("/admin/edit", formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Server Response:", response.data);

          Swal.fire({
            title: "Success!",
            text: "Book edited successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay",
          });

          // Re-fetch updated book data after the successful post
          refetchBookData();
        } catch (error) {
          console.error("Error posting data:", error);

          Swal.fire({
            title: "Error!",
            text: "There was a problem editing the book. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "Okay",
          });
        }
      }
    });
  };

  if (!fetchStatus) {
    return <div>Loading...</div>;
  }

  if (fetchStatus === 404) {
    return <div>Invalid Book ID</div>;
  }

  if (fetchStatus === 500 || fetchStatus === "Unknown") {
    return <div>Server error</div>;
  }

  return (
    <>
      <div className="flex">
        <Drawer dh={"h-120vh"} />
        <div className="dashboard h-full w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Manage Books", "Edit Book"]} />

            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5  mb-5">
            <Edit_Book_Form
              data={bookData}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handlePostSubmit}
            />
            <div className="bfoot w-fill h-[20px] mt-[30px] "></div>
          </section>
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default Edit_Books;
