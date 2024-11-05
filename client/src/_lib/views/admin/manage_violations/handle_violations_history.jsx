import React from "react";
import { MdChangeHistory } from "react-icons/md";

const handle_violations_history = ({ handleUpdateStatus, violations_data }) => {
  return (
    <div className="bg-neutral rounded-md text-base-100 mb-5">
      <div className="border-base-100 p-5 border-b flex justify-between">
        <h1 className="font-black">Violations History</h1>
        <MdChangeHistory className="text-2xl" />
      </div>

      <form className="p-5 leading-10 flex flex-col gap-3 text-base-100">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead className="text-base-100">
              <tr>
                <th></th>
                <th>Name of Violations</th>
                <th>Date Issued</th>
                <th>Status</th>
                <th>Resolved at</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>{violations_data.id_violations}</th>
                <td>{violations_data.type_of_violation}</td>
                <td>{violations_data.date_issued}</td>
                <td>{violations_data.id_violations}</td>
                <td>
                  <select
                    className="select select-bordered w-full max-w-xs text-neutral"
                    onChange={(e) =>
                      handleUpdateStatus(
                        violations_data.id_violations,
                        e.target.value
                      )
                    }
                    defaultValue={violations_data.status}
                  >
                    <option disabled>Select status update</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default handle_violations_history;
