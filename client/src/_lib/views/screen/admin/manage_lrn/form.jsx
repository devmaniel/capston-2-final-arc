import React from "react";

import { FaFileExcel } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

// sweet alert
import Swal from "sweetalert2";

export default function Form({ handleSubmit, historyData }) {
  const showHistoryPopup = () => {
    const historyHtml = historyData
      .map(({ timestamp, insertedData, updatedData, invalidData }) => {
        const formattedDate = new Date(timestamp).toLocaleString("en-PH", {
          timeZone: "Asia/Manila",
        });

        // Combine all data into a single array
        const allData = [
          ...invalidData.map((row) => ({ ...row, type: "error" })),
          ...insertedData.map((row) => ({ ...row, type: "success" })),
          ...updatedData.map((row) => ({ ...row, type: "success" })),
        ];

        // Generate the table HTML to display all data
        const tableHtml = `
        <div class="overflow-x-auto bg-neutral text-base-100 mt-5 line-clamp-4 rounded-md">
            <h4 class="p-5">Recorded At: ${formattedDate}</h4>
            <table class="table table-lg">
                <thead class="text-base-100">
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Valid LRN</th>
                        <th>Section</th>
                        <th>Track</th>
                        <th>Year Level</th>
                        <th>Status LRN</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                      allData.length > 0
                        ? allData
                            .map(
                              (row) => `
                              <tr class="text-white ${row.type === "error" ? "bg-red-900" : "bg-green-900 text-white"}">
                                  <td>${row.last_name || "N/A"}</td>
                                  <td>${row.first_name || "N/A"}</td>
                                  <td>${row.middle_name || "N/A"}</td>
                                  <td>${row.valid_lrn || "N/A"}</td>
                                  <td>${row.section || "N/A"}</td>
                                  <td>${row.track || "N/A"}</td>
                                  <td>${row.year_level || "N/A"}</td>
                                  <td>${row.status_lrn || "N/A"}</td>
                                  <td>${row.role || "N/A"}</td>
                              </tr>
                            `
                            )
                            .join("")
                        : "<tr><td colspan='9'>No data available</td></tr>"
                    }
                </tbody>
                <tfoot class="text-base-100">
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Valid LRN</th>
                        <th>Section</th>
                        <th>Track</th>
                        <th>Year Level</th>
                        <th>Status LRN</th>
                        <th>Role</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        `;

        return `
        <div>
            ${tableHtml}
        </div>
        `;
      })
      .join("");

    Swal.fire({
      title: "History Entry",
      html: historyHtml,
      icon: "info",
      customClass: {
        popup: "responsive-modal",
        confirmButton: "bg-primary text-white hover:bg-primary-dark",
      },
    });
  };
  return (
    <>
      <div className="bg-neutral rounded-md text-base-100">
        <div className="border-base-100 p-5 border-b flex justify-between">
          <h1 className="font-black text-base-100 ">Cycle Account </h1>

          <div className="flex gap-5">
            <FaHistory
              className="text-2xl cursor-pointer"
              onClick={showHistoryPopup}
            />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission
            handleSubmit(e); // Pass the event object to handleSubmit
          }}
          className="p-5 leading-10 flex flex-col gap-3"
        >
          <div className="">
            <label
              htmlFor="file"
              className="text-md text-base-100  font-semibold"
            >
              Import excel file
            </label>
            <input
              type="file"
              className="mt-2 bg-sky-500 file-input file-input-bordered file-input-md w-full text-base-100 "
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <p className="text-sm italic pt-5 pb-5 text-base-100">
              {" "}
              Please upload an Excel file containing student information. The
              file should include columns with details. Ensure that the data is
              correctly formatted to avoid any errors during import.
            </p>

            <button
              type="submit"
              className="bg-sky-500 col-span-2 rounded-md text-xl p-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
