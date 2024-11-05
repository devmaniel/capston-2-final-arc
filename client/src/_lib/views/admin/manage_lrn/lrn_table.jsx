import React from "react";

const lrn_table = () => {
  return (
    <>
      <div className="overflow-x-auto bg-neutral text-base-100 rounded-md">
        <table className="table">
          {/* head */}
          <thead className="text-base-100 ">
            <tr>
              <th>
               
              </th>
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
            {/* row 1 */}
            <tr>
              <th></th>
              <td>
                <div className="flex items-center gap-3">
                  <h1>Last Name, First Name M.I.</h1>
                </div>
              </td>
              <td>LRN1234567891011</td>
              <td>
                {" "}
                <span className="badge badge-primary badge-sm">Academic</span>
              </td>
              <td>
                {" "}
                <span className="badge badge-primary badge-sm">STEM</span>
              </td>
              <td>
                {" "}
                <h1>Grade - 12</h1>
              </td>
              <td>
                {" "}
                <h1>STEM: 12-1</h1>
              </td>
              <td>Student</td>
              <td>
                {" "}
                <span className="badge badge-primary badge-sm">Registered</span>
              </td>
              <td>MM/YY/DD</td>
              <td>MM/YY/DD</td>
              <th>
                <a href="#">Details</a>
              </th>
            </tr>
            {/* row 2 */}
          </tbody>
          {/* foot */}
          <tfoot className="text-base-100 ">
            <tr>
              <th>
                
              </th>
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

export default lrn_table;
