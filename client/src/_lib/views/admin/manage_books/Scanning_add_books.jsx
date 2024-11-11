import React, { useEffect, useState, useRef } from "react";

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

import CreateForm from "../../screen/admin/create_books/form";

import Add_Books_Form from "./Add_Books_Form";

import { Html5Qrcode } from "html5-qrcode";

import { formclass } from "../../../data/FormClassification";

const Scanning_add_books = () => {
  const [isModalForm, setisModalForm] = useState(false);

  const tabLinks = [
    { name: "Manage Books", path: "/admin/manage_books" },
    { name: "Add Books", path: "/admin/manage_books/create_books" },
    {
      name: "Add Books using QR Scanner",
      path: "/admin/manage_books/qr_scan_add_books",
    },
  ];

  // Scanning_add_books_form.jsx
  const [isScannerRunning, setIsScannerRunning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility
  const html5QrCode = useRef(null);
  const qrCodeRegionId = "qr-reader";

  const formatISBN = (isbn) => {
    if (isbn.length === 10) {
      // Format ISBN-10 (e.g., "0123456789" -> "0-1234-5678-9")
      return isbn.replace(/(\d{1})(\d{4})(\d{4})(\d{1})/, "$1-$2-$3-$4");
    }
    if (isbn.length === 13) {
      // Format ISBN-13 (e.g., "9781234567890" -> "978-1-234-56789-0")
      return isbn.replace(
        /(\d{3})(\d{1})(\d{4})(\d{5})(\d{1})/,
        "$1-$2-$3-$4-$5"
      );
    }
    return isbn; // Return as-is if neither 10 nor 13 characters
  };

  const fetchBookDetails = async (isbn) => {
    try {
      const formattedISBN = formatISBN(isbn); // Ensure this function works correctly
      const response = await axios.get(`https://openlibrary.org/api/books`, {
        params: {
          bibkeys: `ISBN:${isbn}`,
          format: "json",
          jscmd: "details",
        },
      });
  
      const bookData = response.data[`ISBN:${isbn}`];
      if (bookData) {
        const { title, authors, publishers, publish_date, edition, description } = bookData.details;
  
        // Handle missing data with default values
        const authorNames = authors ? authors.map((author) => author.name).join(", ") : "N/A";
        const publisherNames = publishers ? publishers.join(", ") : "N/A";
        const bookTitle = title || "N/A";
        const bookEdition = edition || "N/A";
        const bookPublishDate = publish_date || "N/A";
        const bookDescription = description || "No Description"; // Default if description is missing
  
        setPostTest((prevState) => ({
          ...prevState,
          bookimage: null, // Removed book image
          bookname: bookTitle,
          authorname: authorNames,
          isbncode: formattedISBN, // Use formatted ISBN here
          publisher: publisherNames,
          date_of_publish: bookPublishDate,
          edition: bookEdition,
          description: bookDescription, // Set the description
        }));
  
        console.log({
          bookname: bookTitle,
          authorname: authorNames,
          isbncode: formattedISBN,
          publisher: publisherNames,
          date_of_publish: bookPublishDate,
          edition: bookEdition,
          description: bookDescription,
        });
  
        Swal.fire({
          title: "Book Details",
          html: `
            <div class="text-left">
              <p><strong>Title:</strong> ${bookTitle}</p>
              <p><strong>Author:</strong> ${authorNames}</p>
              <p><strong>Edition:</strong> ${bookEdition}</p>
              <p><strong>ISBN:</strong> ${formattedISBN}</p>
              <p><strong>Publisher:</strong> ${publisherNames}</p>
              <p><strong>Date of Publish:</strong> ${bookPublishDate}</p>
              <p><strong>Description:</strong> ${bookDescription}</p> <!-- Display description -->
            </div>
          `,
          icon: "success",
          confirmButtonText: "Proceed to Add Book",
          showCancelButton: true,
          cancelButtonText: "Scan Again",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            setIsModalVisible(true); // This should conditionally render your modal
            startScanner(); // Continue scanning if confirmed
          } else {
            handleRestartScanning(); // Restart scanning if canceled
          }
        });
      } else {
        Swal.fire({
          title: "Book Not Found",
          text: "No details found for this ISBN.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch book details. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error fetching book details:", error); // Consider logging more info about the error
    }
  };

  const handleScanAgain = () => {
    setIsModalVisible(false); // Set isModalVisible to false when Scan Again is clicked
  };

  const showScanResultModal = (decodedText) => {
    const isbn = decodedText.trim();
    Swal.fire({
      title: "Scanned Successfully!",
      html: `
        <div class="text-left">
          <p><strong>Scanned Value:</strong> ${isbn}</p>
        </div>
      `,
      icon: "success",
      confirmButtonText: "Fetch Book Details",
      showCancelButton: true,
      cancelButtonText: "Scan Again",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchBookDetails(isbn);
      } else {
        handleRestartScanning();
      }
    });
  };

  const startScanner = () => {
    const onScanSuccess = (decodedText) => {
      console.log("Scan detected:", decodedText);
      showScanResultModal(decodedText);
    };

    const onScanFailure = (error) => {
      console.debug("Scan error:", error);
    };

    if (html5QrCode.current) {
      html5QrCode.current
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 300, height: 200 } },
          onScanSuccess,
          onScanFailure
        )
        .then(() => {
          setIsScannerRunning(true);
          const qrReader = document.getElementById(qrCodeRegionId);
          if (qrReader) {
            qrReader.style.width = "400px";
            qrReader.style.height = "300px";
          }
        })
        .catch((err) => {
          console.error("Camera access error or permissions not granted:", err);
          setIsScannerRunning(false);
          Swal.fire({
            title: "Camera Access Error",
            text: "Please enable camera permissions to use Scanner.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  useEffect(() => {
    html5QrCode.current = new Html5Qrcode(qrCodeRegionId);
    startScanner();

    return () => {
      if (html5QrCode.current && html5QrCode.current.isScanning) {
        html5QrCode.current
          .stop()
          .then(() => {
            html5QrCode.current.clear();
          })
          .catch((err) => console.error("Failed to stop scanning:", err));
      }
    };
  }, []);

  const handleRestartScanning = () => {
    if (!isScannerRunning) {
      startScanner();
    }
  };

  // Add_Books_Form.jsx
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
    description: "No Description", // Default description
  });

  console.log("Post test Data", post);

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
      denyButtonText: `Don't save`,
      confirmButtonText: "Save",
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
                text:
                  err.response.data.message || "An unexpected error occurred.",
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
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps
              links={["Components", "Manage Books", "Add Books using QR Scan"]}
            />

            <div className="flex items-center gap-2 right-nav">
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">
            <Tab tablink={tabLinks} />

            <div className="flex justify-between items-center mt-0 h-full pt-5 w-full mb-5">
              {!isModalVisible && ( // Only render Scanning_add_books_form if isModalVisible is false
                <Scanning_add_books_form
                  isScannerRunning={isScannerRunning}
                  html5QrCode={html5QrCode}
                  qrCodeRegionId={qrCodeRegionId}
                  startScanner={startScanner}
                  handleRestartScanning={handleRestartScanning}
                  fetchBookDetails={fetchBookDetails}
                  showScanResultModal={showScanResultModal}
                />
              )}
            </div>

            {isModalVisible && <Add_Books_Form  handleScanAgain={handleScanAgain} scannedBookData={post} handleFormSubmit={handleFormSubmit} handleInput={handleInput} isError={isError} />}
          </section>

          <Pagination />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default Scanning_add_books;
