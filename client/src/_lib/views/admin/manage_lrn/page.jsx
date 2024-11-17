// common components
import Nav from "@screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../../colors/colorMode";

// screens component
import CreateForm from "../../screen/admin/manage_lrn/form";

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/AdminSection.scss";

// sweet alert
import Swal from "sweetalert2";

// axios post
import axios from "../../../api/axios";
import { useState } from "react";

import { Link } from "@tanstack/react-router";
const page = () => {
  const [prevPostLRN, setPrevPostLRN] = useState([]);

  const PostLRNExcel = (event) => {
    const fileInput = event.target.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "No file selected",
        text: "Please select a file before submitting.",
      });
      return;
    }

    const validExtensions = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validExtensions.includes(file.type)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File Type",
        text: "Please upload an Excel file.",
      });
      return;
    }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      customClass: {
        confirmButton: "bg-primary text-white hover:bg-primary-dark",
        denyButton: "bg-red-500 text-white hover:bg-red-600",
        cancelButton: "bg-gray-400 text-white hover:bg-gray-500",
        popup: "responsive-modal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("file", file);

        axios
          .post("/admin/excelLRN", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const { insertedData, updatedData, invalidData } = response.data;
            const timestamp = new Date().toISOString(); // Get the current timestamp

            // Update state with both valid and invalid data and timestamp
            setPrevPostLRN((prevHistory) => [
              ...prevHistory,
              { timestamp, insertedData, updatedData, invalidData },
            ]);

            // Combine all data into a single array
            const allData = [
              ...invalidData.map((row) => ({ ...row, type: "error" })),
              ...insertedData.map((row) => ({ ...row, type: "success" })),
              ...updatedData.map((row) => ({ ...row, type: "success" })),
            ];

            // Generate the table HTML to display all data
            const tableHtml = `
                        <div class="overflow-x-auto bg-neutral text-base-100 mt-5 line-clamp-4 rounded-md">
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
                                    ${allData
                                      .map(
                                        (row) => `
                                            <tr class="text-white ${row.type === "error" ? "bg-red-900" : "bg-green-900"}">
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
                                      .join("")}
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

            Swal.fire({
              title: "Data Processed",
              html: tableHtml,
              icon: "info",
              customClass: {
                popup: "responsive-modal",
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text:
                error.response?.data?.error ||
                "An error occurred while processing the file.",
            });
          });
      }
    });
  };

  // Add the following CSS to handle responsiveness
  const style = document.createElement("style");
  style.innerHTML = `
    .responsive-modal {
        max-width: 95vw; /* Increase the maximum width */
        width: 95vw; /* Increase the default width */
        max-height: 80vh;
        overflow-y: auto;
    }
    @media (min-width: 768px) {
        .responsive-modal {
            max-width: 85vw; /* Increase width for medium screens */
            width: 85vw; /* Increase width for medium screens */
        }
    }
    @media (min-width: 1024px) {
        .responsive-modal {
            max-width: 75vw; /* Increase width for large screens */
            width: 75vw; /* Increase width for large screens */
        }
    }
`;
  document.head.appendChild(style);

  return (
    <>
      <div className="flex">
        <Drawer />
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

          <section className="mx-5 w-fill h-fit  text-white ">
            <div role="tablist" className="tabs tabs-boxed mb-5">
              <Link role="tab" to="/admin/manage_lrn/" className="tab">
                LRN Table
              </Link>
              <Link
                role="tab"
                to="/admin/manage_lrn/Add_Student"
                className="tab "
              >
                Add Student
              </Link>
              <Link
                role="tab"
                to="/admin/manage_lrn/cycle_account"
                className="tab tab-active"
              >
                Cycle LRN
              </Link>
            </div>

            <CreateForm handleSubmit={PostLRNExcel} historyData={prevPostLRN} />

            <div className="bfoot w-fill h-[20px] mt-[30px] "></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
