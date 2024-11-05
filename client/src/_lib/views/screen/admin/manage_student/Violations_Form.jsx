import React from "react";
import { FiEdit } from "react-icons/fi";

import { MdChangeHistory } from "react-icons/md";

const Violations_Form = () => {
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
                <th>1</th>
                <td>Violated - Lost Books</td>
                <td>MM/DD/YY</td>
                <td>Pending</td>
                <td>Unresolved</td>
              </tr>
             
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default Violations_Form;
