import React, { useState } from "react";
import "../../../../../styles/admin/print_data.css";
import useAxiosFetchArrayData from "../../../../hook/useAxiosFetchArrayData";

import { Link } from "@tanstack/react-router";

const Print_most_borrowed_class = () => {
  const [default4_Date, setDefault4_Date] = useState("all");

  const {
    arrayData: MostFrequestSectionBorrower,
    loading: MostBookBorrowedClassificationsLoading,
  } = useAxiosFetchArrayData(
    `/admin/analytics/most_borrowed_book_classifications?date=${default4_Date}`
  );

  console.log(
    "This URL: /admin/analytics/most_borrowed_book_classifications?date=${default4_Date}"
  );

  // Handler function to update state based on the selected date range
  const handleDateChange = (event, dateType) => {
    const newValue = event.target.value;

    switch (dateType) {
      case "default4_Date":
        setDefault4_Date(newValue);
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

  // Create a mapping of labels to their percentages
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
    <div className="bg-white h-auto w-full text-black text-center mx-auto p-5">
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
            value={default4_Date}
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

        <table className="divide-y divide-black mt-5 ml-10 border w-[540px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-md font-bold uppercase tracking-wider">
                Classifications
              </th>
              <th className="px-6 py-3 text-md text-center font-bold uppercase tracking-wider">
                Borrowed (Count & Percentage)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-black">
            {labelPercentages.map(({ label, rawFrequency, percentage }) => (
              <tr key={label}>
                <td className="px-6 py-4 text-sm text-left">{label}</td>
                <td className="px-6 py-4 text-sm text-center">
                  {rawFrequency} ({percentage}%)
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

export default Print_most_borrowed_class;
