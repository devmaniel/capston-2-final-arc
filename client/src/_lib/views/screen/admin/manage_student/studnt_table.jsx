import React from "react";

import { GrView } from "react-icons/gr";

import { Link } from "@tanstack/react-router";
import { BiSolidEdit } from "react-icons/bi";
import { BiHistory } from "react-icons/bi";

const studnt_table = ({ studentdata }) => {
  if (!studentdata) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto w-full h-full bg-neutral rounded-md  mt-5">
      <table className="table text-base-100 ">
        {/* head */}
        <thead className="text-base-100">
          <tr>
            <th>Actions</th>
            <th>Name</th>
            <th>Role</th>
            <th>Track</th>
            <th>Strand</th>
            <th>Year</th>
            <th>Section</th>
            <th>Account Status</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-base-100">
          {studentdata.map((student, index) => (
            <tr key={index}>
              <td>
                <div className="flex gap-2 justify-center items-center">
                  <Link
                    to={`/admin/manage_students/student_view_form?student_id=${student.userid}`}
                    className="text-primary"
                  >
                    <GrView />
                  </Link>
                  
                 
                </div>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  {student.profileImage ? (
                    // If profile image exists
                    <div className="avatar placeholder:">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`/Profile Image/${student.profileImage}`}
                          alt="Profile Image"
                        />
                      </div>
                    </div>
                  ) : (
                    // If no profile image exists
                    <div className="avatar placeholder">
                      <div className="bg-base-100  text-neutral-content w-12 mask mask-squircle">
                        <span className="text-neutral">
                          {`${student.first_name[0].toUpperCase()}${student.last_name[0]?.toUpperCase() || ""}`}
                        </span>
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="font-bold">
                      {`${student.first_name} ${student.middle_name || ""} ${student.last_name}`}
                    </div>
                    <div className="text-sm text-primary ">
                      {student.valid_lrn}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-ghost">{student.role}</span>
              </td>
             
              {/* Conditional rendering for student.track */}
              <td>
  {student.track === "ICT" &&
    "Information and Communications Technology (ICT)"}
  {student.track === "ABM" &&
    "Accountancy, Business and Management (ABM)"}
  {student.track === "HUMSS" && "Humanities and Social Sciences (HUMSS)"}
  {student.track === "GAS" && "Academic Strand (GAS)"}
  {!["ICT", "ABM", "HUMSS", "GAS"].includes(student.track) &&
    student.track}
</td>
<td>
  {/* Check if track is ICT or COOKERY for TVL department */}
  {["ICT", "COOKERY"].includes(student.track) 
    ? "TVL" 
    : ["GAS", "HUMSS", "STEM", "ABM"].includes(student.track)
    ? "Academic"
    : ""}
</td>
              <td>Grade - 12</td> {/* Add grade level if required */}
              <td>{student.section}</td>
              <td>
                <span
                  className={`badge ${student.acc_status ? "badge-primary" : "badge-secondary"}`}
                >
                    Registered
                </span>
              </td>
              <td>
                <span
                  className={`badge ${student.status === "Active" ? "badge-primary" : "badge-secondary"}`}
                >
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr className="text-base-100">
            <th>Actions</th>
            <th>Name</th>
            <th>Role</th>
            <th>Track</th>
            <th>Strand</th>
            <th>Year</th>
            <th>Section</th>
            <th>Account Status</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default studnt_table;
