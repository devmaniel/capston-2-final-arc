import { useState } from "react";
import Swal from "sweetalert2";

// common components
import Nav from "@screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../../colors/colorMode";

// screens component
import CreateForm from "../../screen/admin/create_books/form";
import Tab from "@screen/admin/common/TabPagination";
import BookToast from "../../screen/admin/create_books/BookToast";

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/AdminSection.scss";

// axios
import axios from "../../../api/axios";

// class data
import { formclass } from "../../../data/FormClassification";

const page = () => {
  const tabLinks = [
    { name: "Manage Books", path: "/admin/manage_books" },
    { name: "Create Books", path: "/admin/manage_books/create_books" },
  ];

  console.log(formclass);

  const [post, setPostTest] = useState({
    bookimage: null,
    bookname: null,
    authorname: null,
    isbncode: null,
    classifications: "Fiction",
    quantity: 1,
    publisher: null,
    date_of_publish: null,
    edition: null,
    description: null,
  });

  let [isError, setError] = useState(false);

  function handleInput(value, field) {
    if (field === "bookimage") {
      setPostTest((prevPost) => ({
        ...prevPost,
        [field]: value,
      }));
      setPostProps((prevProps) => ({
        ...prevProps,
        [field]: value ? "valid" : null,
      }));
    } else {
      setPostTest((prevPost) => ({
        ...prevPost,
        [field]: value,
      }));
      setPostProps((prevProps) => ({
        ...prevProps,
        [field]: value.trim() !== "" ? "valid" : null,
      }));
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // Check if quantity is 0 or less
    if (post.quantity <= 0) {
      Swal.fire({
        title: "Error",
        text: "Quantity cannot be 0 or less.",
        icon: "error",
        customClass: {
          confirmButton: "bg-primary",
        },
      });
      return; // Prevent form submission if quantity is invalid
    }

    // Confirmation for no image
    if (post.bookimage === null) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to upload this book without an image. Do you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, continue",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "bg-primary",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          submitForm();
        }
      });
    } else {
      submitForm();
    }
  }

  function submitForm() {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      customClass: {
        confirmButton: "bg-primary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        const requiredFields = [
          "bookname",
          "authorname",
          "isbncode",
          "description",
          "publisher",
          "date_of_publish",
          "edition",
        ];
        let emptyFields = [];
  
        Object.keys(post).forEach((key) => {
          if (post[key] !== null && post[key] !== "") {
            formData.append(key, post[key]);
          }
          if (
            requiredFields.includes(key) &&
            (post[key] === null || post[key] === "")
          ) {
            emptyFields.push(key);
          }
        });
  
        if (emptyFields.length > 0) {
          Swal.fire({
            title: "Error",
            text: `The following fields are empty: ${emptyFields.join(", ")}`,
            icon: "error",
            customClass: {
              confirmButton: "bg-primary",
            },
          });
          return;
        }
  
        axios
          .post("/admin/create_book", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            setError(false);
            Swal.fire({
              title: "Saved!",
              text: "The book has been successfully added.",
              icon: "success",
              customClass: {
                confirmButton: "bg-primary",
              },
            });
          })
          .catch((err) => {
            console.log(err);
            setError(true);
            if (!err.response) {
              Swal.fire({
                title: "Server Error",
                text: "Unable to connect to the server. The server might be down or there might be a network issue.",
                icon: "error",
                customClass: {
                  confirmButton: "bg-primary",
                },
              });
            } else if (err.response.status >= 500) {
              Swal.fire({
                title: "Server Error",
                text: "The server encountered an error. Please try again later.",
                icon: "error",
                customClass: {
                  confirmButton: "bg-primary",
                },
              });
            } else {
              Swal.fire({
                title: "Error",
                text: err.response.data.message || "An unexpected error occurred.",
                icon: "error",
                customClass: {
                  confirmButton: "bg-primary",
                },
              });
            }
          });
      } else if (result.isDenied) {
        Swal.fire({
          title: "Changes not saved",
          text: "Your changes have not been saved.",
          icon: "info",
          customClass: {
            confirmButton: "bg-primary",
          },
        });
      }
    });
  }

  return (
    <>
      <div className="flex">
        <Drawer dh={"h-[150vh]"} />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps
              links={["Components", "Manage Books", "Create Books"]}
            />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 w-fill h-fit flex flex-col gap-5 text-white ">
            <Tab tablink={tabLinks} />

            <CreateForm
              postprops={post}
              handleFormSubmit={handleFormSubmit}
              handleInput={handleInput}
              isError={isError}
              classdata={formclass}
            />

            <div className="bfoot w-fill h-[20px] mt-[30px] "></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
