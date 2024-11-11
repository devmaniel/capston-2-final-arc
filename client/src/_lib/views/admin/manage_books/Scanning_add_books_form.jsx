import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Swal from "sweetalert2";
import axios from "axios";
import "../../../../styles/admin/QR_Scanner.css";

const Scanning_add_books_form = ({
  isScannerRunning,
  qrCodeRegionId,
  startScanner,
  handleRestartScanning,
  showScanResultModal,
  fetchBookDetails,
}) => {
  

  return (
    <div className="bg-neutral rounded-md m-auto text-base-100 h-[490px] w-500px">
      <div className="border-base-100 p-5 border-b flex justify-between">
        <h1 className="font-black">Add Books using Scanner</h1>
        {!isScannerRunning && (
          <button
            onClick={handleRestartScanning}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Restart Scanner
          </button>
        )}
      </div>
      <div className="w-full p-5">
        <div className="qr_area rounded-md flex justify-center items-center">
          {!isScannerRunning && (
            <p className="text-2xl font-black w-[450px] text-center">
              Please activate the camera to proceed with adding books using a
              scan.
            </p>
          )}
          <div
            id="qr-reader"
            style={{
              display: isScannerRunning ? "block" : "none",
              width: "400px",
              height: "300px",
            }}
          />
        </div>

        {isScannerRunning && (
          <p className="text-sm font-normal italic w-[400px] mt-5">
            Note: Please activate the camera to proceed with adding books via
            barcode or QR scan. Ensure proper lighting and focus for an accurate
            scan.
          </p>
        )}
      </div>
    </div>
  );
};

export default Scanning_add_books_form;
