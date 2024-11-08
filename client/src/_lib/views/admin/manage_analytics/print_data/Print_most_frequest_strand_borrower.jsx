import React from "react";
import "../../../../../styles/admin/print_data.css";
import useAxiosFetchArrayData from "../../../../hook/useAxiosFetchArrayData";

import { Link } from "@tanstack/react-router";

const Print_most_frequest_strand_borrower = () => {
  const { arrayData: MostFrequestStrandBorrower } = useAxiosFetchArrayData(
    "/admin/analytics/most_request_strand_borrower_bar"
  );

  // Ensure data is fully loaded and contains necessary fields
  if (
    !MostFrequestStrandBorrower ||
    !MostFrequestStrandBorrower.frequency ||
    !MostFrequestStrandBorrower.labels
  ) {
    return <div>Loading...</div>;
  }

  console.log(
    "Most Frequest Strand Borrower Data:",
    MostFrequestStrandBorrower
  );

  const fixedLabels = ["ICT", "GAS", "STEM", "HUMSS", "COOKERY", "ABM"];

  // Calculate the total frequency for percentage calculation
  const totalFrequency = MostFrequestStrandBorrower.frequency.reduce(
    (acc, freq) => acc + freq,
    0
  );

  // Create a mapping of labels to their percentages
  const labelPercentages = fixedLabels.map((label) => {
    const index = MostFrequestStrandBorrower.labels.indexOf(label);
    const frequency =
      index !== -1 ? MostFrequestStrandBorrower.frequency[index] : 0;
    const percentage = totalFrequency
      ? ((frequency / totalFrequency) * 100).toFixed(2)
      : 0;
    return { label, percentage: `${percentage}%` };
  });

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

  return (
    <div className="bg-white h-auto w-full text-black text-center mx-auto p-5">
      <div className="flex justify-between ">
        <Link
          to="/admin/analytics"
          className="text-left back hover:underline transition duration-300"
        >
          Back
        </Link>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded print-btn"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
      <div className=" h-[700px] w-[700px] mx-auto text-center p-10 page">
        <h1 className="font-bold">Most Frequent Strand Borrower </h1>

        <p className="pt-5 text-justify p-10">{summaryText}</p>

        <table className="divide-y divide-black ml-10 border w-[540px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-md font-bold uppercase tracking-wider">
                Strand
              </th>
              <th className="px-6 py-3 text-md text-center font-bold uppercase tracking-wider">
                Percentage Borrowed
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-black">
            {labelPercentages.map(({ label, percentage }) => (
              <tr key={label}>
                <td className="px-6 py-4 text-sm text-left">{label}</td>
                <td className="px-6 py-4 text-sm text-center">{percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Print_most_frequest_strand_borrower;
