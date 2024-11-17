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

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/Footer.scss";

// api
import { axiosFetchTableBook } from "../../../hook/axiosFetchTableBook";
import { axiosFetch } from "../../../hook/axiosFetch";
import axios from "../../../api/axios";

import Swal from "sweetalert2";

import Onsite_request_form from "./Onsite_request_form";

import { Html5Qrcode } from "html5-qrcode";

import Scanning_add_books_form from "../manage_books/Scanning_add_books_form";

const Onsite_request_landing = () => {

  const validateQrCode = (qrData) => {
    const regex = /^http:\/\/localhost:5173\/student\/request_history\/view_request\?request_id=(\d+)$/;
    const match = qrData.match(regex);
    if (match) {
      return match[1]; // Extract the request_id
    }
    return null; // Return null if no match
  };


  const [isModalForm, setisModalForm] = useState(false);

  // Scanning_add_books_form.jsx
  const [isScannerRunning, setIsScannerRunning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility
  const html5QrCode = useRef(null);
  const qrCodeRegionId = "qr-reader";



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

      const requestId = validateQrCode(decodedText);
      if (requestId) {
        // If valid, show SweetAlert modal with options
        Swal.fire({
          title: "QR Code Scanned Successfully!",
          text: `Link is found!`,
          icon: "success",
          confirmButtonText: "Go to Link",
          showCancelButton: true,
          cancelButtonText: "Scan Again",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `http://localhost:5173/admin/manage_request/view_request_form?requestId=${requestId}`;
          } else {
            handleRestartScanning();
          }
        });
      } else {
        // Show error if QR code does not match
        Swal.fire({
          title: "Invalid QR Code",
          text: "The scanned QR code is not recognized. Please try again.",
          icon: "error",
          confirmButtonText: "Scan Again",
        }).then(() => {
          handleRestartScanning();
        });
      }
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
            text: "Please enable camera permissions to use the scanner.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  
  const handleRestartScanning = () => {
    if (html5QrCode.current && !isScannerRunning) {
      html5QrCode.current
        .stop()
        .then(() => {
          html5QrCode.current.clear();
          startScanner();
        })
        .catch((err) => console.error("Failed to restart scanning:", err));
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

  const tabLinks = [
    { name: "Manage Request", path: "/admin/manage_request" },
    { name: "Scan Request", path: "/admin/manage_request/scan_request" },
  ];

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

                <Scanning_add_books_form
                  isScannerRunning={isScannerRunning}
                  html5QrCode={html5QrCode}
                  qrCodeRegionId={qrCodeRegionId}
                  startScanner={startScanner}
                  handleRestartScanning={handleRestartScanning}

                  showScanResultModal={showScanResultModal}
                />
              
            </div>

           
          </section>

          <Pagination />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
};

export default Onsite_request_landing;
