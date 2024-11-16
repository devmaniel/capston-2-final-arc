import React from "react";

import Request_status_dialog from "./Request_status_dialog";
import Book_qr_dialog from "./book_qr_dialog";
import Request_QR_dialog from "./Request_QR_dialog";

import { Link } from "@tanstack/react-router";
import { useState } from "react";

const Request_table = ({ requests }) => {
  const [activeRequest, setActiveRequest] = useState(null);
  return (
    <div className="overflow-x-auto bg-neutral  rounded-md mt-5 p-5 text-base-100">
      <table className="table table-xl">
        <thead className="text-base-100">
          <tr>
            <th>Actions</th>
            <th>Status</th>
            <th>Request ID</th>
            <th>Requester Name</th>
            <th>Requester QR Code</th>

            
            <th>Title</th>

            <th>Number of Requested</th>
            <th>Date of Request</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <tr key={index}>
                <td>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/manage_request/view_request_form?requestId=${request["Request ID"]}`}
                      className="badge badge-success"
                    >
                      Respond
                    </Link>
                  </div>
                </td>
                <td>
                  <button
                    className="badge badge-info"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_Status_${index}`)
                        .showModal()
                    }
                  >
                    <p>
                      {request["Request Status"] === "violated-lost" ||
                      request["Request Status"] === "violated-damages"
                        ? "Violated"
                        : request["Request Status"]}
                    </p>
                  </button>
                  <Request_status_dialog
                    steps={request["Request Status"]}
                    dialogId={`my_modal_Status_${index}`}
                  />
                </td>
                <td>{request["Request Code"]}</td>
                <td>{request["Requester Name"]}</td>
                <td>
                  <button
                    className="badge badge-accent"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_Request_${index}`)
                        .showModal()
                    }
                  >
                    <p>View</p>
                  </button>
                  <Request_QR_dialog
                    url={request["Requester QR"]}
                    dialogId={`my_modal_Request_${index}`}
                  />
                </td>

                
                <td>{request["Book Name"]}</td>

                <td>{request["Request Quantity"]}</td>
                <td>
                  {new Date(request["Date Created"]).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center text-2xl font-bold">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Request_table;
