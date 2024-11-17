import React, { useState } from "react";
import "../../../../../styles/admin/print_data.css";
import useAxiosFetchArrayData from "../../../../hook/useAxiosFetchArrayData";

import { Link } from "@tanstack/react-router";

const Print_most_year_level_section_borrower = () => {
  const [default2_Date, setDefault2_Date] = useState("all");

  const { arrayData: MostFrequestSectionBorrower } = useAxiosFetchArrayData(
    `/admin/analytics/most_year_level_borrower?date=${default2_Date}`
  );

  // Handler function to update state based on the selected date range
  const handleDateChange = (event, dateType) => {
    const newValue = event.target.value;

    switch (dateType) {
      case "default1_Date":
        setDefault1_Date(newValue);
        break;
      case "default2_Date":
        setDefault2_Date(newValue);
        break;
      case "default3_Date":
        setDefault3_Date(newValue);
        break;
      default:
        console.warn("Unknown date type:", dateType);
    }
  };

  // Ensure data is fully loaded and contains necessary fields
  if (
    !MostFrequestSectionBorrower ||
    !MostFrequestSectionBorrower.data ||
    !MostFrequestSectionBorrower.labels
  ) {
    return <div>Loading...</div>;
  }

  // Calculate the total for percentage calculation
  const totalFrequency = MostFrequestSectionBorrower.data.reduce(
    (acc, freq) => acc + freq,
    0
  );

  // Create a mapping of labels to their raw numbers and percentages
  const labelPercentages = MostFrequestSectionBorrower.labels.map(
    (label, index) => {
      const frequency = MostFrequestSectionBorrower.data[index];
      const percentage = totalFrequency
        ? ((frequency / totalFrequency) * 100).toFixed(2)
        : 0;
      return { label, rawFrequency: frequency, percentage };
    }
  );

  // Generate a dynamic paragraph based on the percentages
  const summaryText =
    labelPercentages
      .map(
        ({ label, percentage }) =>
          `${label} accounts for ${percentage} of all borrowings`
      )
      .join(". ") + ".";

  const handlePrint = () => {
    window.print();
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className=" h-[auto] w-full text-black text-center mx-auto p-5">
      <div className="flex justify-between ">
        <Link
          to="/admin/analytics"
          className="text-left back hover:underline transition duration-300"
        >
          Back
        </Link>

        <div className="flex gap-2">
          <select
            className="select select-primary bg-base-100 text-neutral w-full max-w-xs"
            value={default2_Date}
            onChange={(event) => handleDateChange(event, "default2_Date")}
          >
            <option disabled>Pick a Date Range</option>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
            <option value="last_6_months">Last 6 Months</option>
            <option value="one_year_ago">One Year Ago</option>
          </select>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded print-btn"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
      <div className="h-[auto] w-[700px] mx-auto -mt-11  p-10 page">
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="School Logo"
            className="h-20 w-20 mb-2"
          />
        </div>
        <div id="print-area" className="border-b pb-5">
          <h1 className="text-3xl font-bold mb-3">Library Report</h1>
          {/* <div className="flex justify-between items-center"> */}
          <p className="text-sm   mt-5">Generated on: {today}</p>
          <p className="text-sm font-semibold ">
            Report: Most Borrowed Sections
          </p>
          {/* </div> */}
        </div>
        <div>
          <p className="text-center mt-5">
            The report titled "Most Frequent Section Borrower" displays data on
            the borrowing activity of various academic sections. Each
            section—ICT-401, STEM-401, HUMMS-301, ABM-402, and GAS-401—has
            borrowed one item, representing 20.00% of the total borrowing
            activity. The data suggests an equal borrowing frequency across all
            sections, with no single section dominating the borrowing
            statistics. This distribution indicates that borrowing activities
            are evenly distributed among the sections included in the report.
          </p>
        </div>
        <table className="divide-y divide-black mt-10 ml-10 border w-[540px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-500 px-4 py-2 bg-gray-200">
                Sections
              </th>
              <th className="border border-gray-500 px-4 py-2 bg-gray-200">
                Books Borrowed
              </th>
              <th className="border border-gray-500 px-4 py-2 bg-gray-200">
                Percentage
              </th>
            </tr>
          </thead>

          <tbody>
            {labelPercentages.map(({ label, rawFrequency, percentage }) => (
              <tr key={label}>
                <td className="border border-gray-500 px-4 py-2">{label}</td>
                <td className="border border-gray-500 px-4 py-2">
                  {rawFrequency}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-white w-full h-auto">
          <p class="border-t border-black pt-2 absolute   text-center w-[250px] -ml-35 mt-[230px]">
            <span className="text-sm">
              Signature of the Head Librarian Over Printed Name
            </span>
          </p>

          <p className="border-t border-black pt-2 absolute w-[250px]   ml-[350px] mt-[230px]">
            <span className="text-sm">Date: {today}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Print_most_year_level_section_borrower;
