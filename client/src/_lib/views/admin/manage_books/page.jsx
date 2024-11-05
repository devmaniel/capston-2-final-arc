import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

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

const page = ({ pageNum, pageFil, pageClass, bookStatus, classDataTest }) => {
  const navigate = useNavigate();


  // query params
  const [pageState, setPage] = useState(pageNum);
  const [filter, setFilter] = useState(pageFil);
  const [classState, setClass] = useState(pageClass);
  const [bookStatusState, setBookStatus] = useState(bookStatus || "active");
  const [searchState, setSearchState] = useState(''); // Search state

 
  
  // fetch data with search functionality
  const { bookdata: books, totalPage } = axiosFetchTableBook(
    "/admin/table_book",
    pageState,
    filter,
    classState,
    bookStatusState,
    searchState // Include searchState in the fetch
  );

  console.log(books);

  console.log(
    `Page: ${pageState} Filter: ${filter} Classfications: ${classState} Book Status: ${bookStatusState}`
  );

  const Based = {
    filter: ["newest", "oldest", "a-z", "z-a"],
    classifications: classDataTest ? ["all", ...classDataTest] : ["all"],
  };


    // Handle search input change
    const handleSearch = (event) => {
      setSearchState(event.target.value); // Update search state
    };

  const handlePage = (page) => {
    // page handle
    setPage(page);
    navigate({
      to: ".",
      search: (prev) => ({ ...prev, page, filter }),
      replace: true,
    });
  };

  const handleFilter = (event) => {
    // Filter handle
    console.log("Testoo dayo " + event.target.value);
    const newFilter = event.target.value.toLowerCase();
    setFilter(newFilter);

    // Update the URL using TanStack Router
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        page: pageState, // Keep the current page state
        filter: newFilter, // Update the filter
      }),
      replace: true,
    });
  };

  const handleClass = (event) => {
    // Handle classifications changes
    const newClass = event.target.value.toLowerCase();
    setClass(newClass);

    // Reset page to 1 and update the URL
    navigate({
      to: ".", // Current route
      search: (prev) => ({
        ...prev,
        page: 1, // Reset page to 1
        filter, // Keep the current filter
        classifications: newClass, // Update the classifications
      }),
      replace: true, // Replace current entry in the history stack
    });

    // Update the page state to 1
    setPage(1);
  };

  // Handle filter change for book status
  const handleBookStatus = (event) => {
    // Handle book status changes
    console.log("Selected book status: " + event.target.value);
    const newStatus = event.target.value.toLowerCase();
    setBookStatus(newStatus);

    // Update the URL using TanStack Router
    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        page: pageState, // Keep the current page state
        filter, // Maintain the current filter
        classifications: classState, // Maintain the current classifications
        bookStatus: newStatus, // Update the book status
      }),
      replace: true,
    });
  };

  const handleSetBookStatus = (bookId, status, setBookStatusLoading) => {
    let action = "";
    let confirmationText = "";
    let successMessage = "";

    // Determine action based on status
    if (status === "active") {
      action = "archive";
      confirmationText = "Do you want to archive this book?";
      successMessage = "The book has been archived.";
    } else if (status === "archived") {
      action = "unarchive";
      confirmationText = "Do you want to unarchive this book?";
      successMessage = "The book has been restored to active.";
    } else if (status === "delete") {
      action = "delete";
      confirmationText = "Do you want to delete this book?";
      successMessage = "The book has been deleted.";
    }

    Swal.fire({
      title: "Are you sure?",
      text: confirmationText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Set loading state
        setBookStatusLoading(true);

        // API call to update the book's status
        axios
          .post(`/update_book_status/${bookId}`, { status: action })
          .then((response) => {
            Swal.fire(
              action.charAt(0).toUpperCase() + action.slice(1) + "d!",
              successMessage,
              "success"
            );
          })
          .catch((error) => {
            Swal.fire("Error", "Could not update the book status.", "error");
            console.error("Error updating book status:", error);
          })
          .finally(() => {
            // Reset loading state
            setBookStatusLoading(false);
          });
      }
    });
  };

  const tabLinks = [
    { name: "Manage Books", path: "/admin/manage_books" },
    { name: "Create Books", path: "/admin/manage_books/create_books" },
  ];

  // Check if books is undefined or null (still loading)
  if (books === undefined || books === null) {
    return <div>Loading...</div>;
  }

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

            <div className="flex justify-between items-center mt-10 w-full">
              <div className="flex gap-5 items-center w-full">
              <Searchj searchValue={searchState} handleSearch={handleSearch} />

                <SelectInput
                  label={"Filter"}
                  value={filter} // Use value instead of filter
                  onChange={handleFilter} // Use onChange instead of handleFilter
                  options={["newest", "oldest", "A-Z", "Z-A"]}
                />

                <SelectInput
                  label={"Classifications"}
                  value={pageClass} // Changed from filter={pageClass}
                  onChange={handleClass} // Changed from handleFilter={handleClass}
                  options={classDataTest}
                />

                <SelectInput
                  label={"Book Status"}
                  value={bookStatusState} // Use value prop instead of filter
                  onChange={handleBookStatus} // Use onChange instead of handleFilter
                  options={["active", "archived", "deleted"]}
                />
              </div>
            </div>
            <Table data={books} handleSetBookStatus={handleSetBookStatus} />
          </section>

          <Pagination
            totalPages={totalPage}
            handlePage={handlePage}
            handleFilter={handleFilter}
          />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default page;
