import React from "react";

const Lrn_table = ({ data }) => {
  return (
    <>
      <div className="overflow-x-auto bg-neutral text-base-100 rounded-md">
        <table className="table">
          {/* head */}
          <thead className="text-base-100">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Student LRN</th>
              <th>Track</th>
              <th>Strands</th>
              <th>Year level</th>
              <th>Section</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Date Updated</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through data to create table rows */}
            {data.map((item) => (
              <tr key={item.id}>
                <th>
                  <span
                    className={`badge capitalize  badge-sm text-white ${item.status_lrn === "enrolled" ? "badge-primary" : item.status_lrn === "unenrolled" ? "badge-error" : "badge-ghost"} text-uppercase`}
                  >
                    {item.status_lrn}
                  </span>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <h1>{`${item.last_name}, ${item.first_name} ${item.middle_name || ""}`}</h1>
                  </div>
                </td>
                <td>{item.valid_lrn}</td>
                <td>
                  <span className="badge badge-primary badge-sm">
                    {item.track}
                  </span>
                </td>
                <td>
                  <span className="badge badge-primary badge-sm">STEM</span>{" "}
                  {/* Adjust as necessary */}
                </td>
                <td>
                  <h1>Grade - {item.year_level}</h1>
                </td>
                <td>
                  <h1>{item.section}</h1>
                </td>
                <td>{item.role}</td>
                <td>
                  <span
                    className={`badge badge-sm capitalize ${item.acc_status === "registered" ? "badge-primary" : "badge-ghost"}`}
                  >
                    {item.acc_status}
                  </span>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot className="text-base-100">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Student LRN</th>
              <th>Track</th>
              <th>Strands</th>
              <th>Year level</th>
              <th>Section</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Date Updated</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Lrn_table;
