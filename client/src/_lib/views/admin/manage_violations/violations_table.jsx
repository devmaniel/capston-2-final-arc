import React from "react";

const Violations_table = ({ data = [] }) => {
  return (
    <>
      <div className="overflow-x-auto bg-neutral text-base-100 rounded-md">
        <table className="table">
          {/* Table Head */}
          <thead className="text-base-100">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type of Violations</th>
              <th>Date Issued</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((violation, index) => (
                <tr key={index}>
                  <th>
                    <label></label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      {violation.profileImage ? (
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={`/Profile Image/${violation.profileImage}`}
                              alt={`${violation.firstname} ${violation.lastname}'s Profile`}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder">
                          <div className="bg-base-100 text-neutral-content w-12 mask mask-squircle">
                            <span className="text-neutral">
                              {`${violation.firstname[0].toUpperCase()}${violation.lastname[0]?.toUpperCase() || ""}`}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <div className="font-bold">{`${violation.firstname} ${violation.lastname}`}</div>
                        <span className="badge badge-ghost badge-sm">{violation.track}</span>
                        <span className="badge badge-ghost badge-sm">{violation.section}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {violation.type_of_violation}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {violation.type_of_violation === "violated-lost"
                        ? "Book was not returned"
                        : violation.type_of_violation === "violated-damages"
                        ? "Returned book is damaged"
                        : "Unknown violation type"}
                    </span>
                  </td>
                  <td>{new Date(violation.date_issued).toLocaleDateString()}</td>
                  <th>
                    <span
                      className={`badge badge-${
                        violation.status === "resolved" ? "success" : "error"
                      } badge-sm`}
                    >
                      {violation.status === "resolved" ? "Resolved" : "Not Resolved"}
                    </span>
                  </th>
                  <th>
                    <a href={`/admin/manage_violations/handle_violations?violations_id=${violation.id_violations}`}>
                      Details
                    </a>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  No violations found
                </td>
              </tr>
            )}
          </tbody>
          {/* Table Footer */}
          <tfoot className="text-base-100">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type of Violations</th>
              <th>Date Issued</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Violations_table;
