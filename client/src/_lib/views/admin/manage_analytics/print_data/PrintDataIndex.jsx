import React from "react";
import "../../../../../styles/admin/print_data.css";

const PrintDataIndex = () => {
  const handlePrint = () => {
    window.print();
  };
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div className="bg-white h-auto w-full text-black text-center mx-auto p-5">
      <div className="flex justify-between ">
        <button
          className="back text-left back hover:underline transition duration-300"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded print-btn"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
      <div className=" h-[700px] w-[700px] mx-auto text-center p-10 page">
        <h1 className="font-bold">Most Frequent Strand Borrower (Bar Graph)</h1>

        <p className="pt-5 text-justify p-10">
          Recent data shows that the ICT strand is the most popular for
          borrowing. It accounts for 45% of all borrowings. The ABM strand
          follows with 25%. HUMSS has a borrowing rate of 15%. Cookery comes
          next at 10%. The GAS strand is at 3%. Finally, the STEM strand has the
          lowest at 2%. Overall, ICT leads in resource borrowing among all
          strands.
        </p>

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
            <tr>
              <td className="px-6 py-4 text-sm text-left">ICT</td>
              <td className="px-6 py-4 text-sm text-center">45%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-left">ABM</td>
              <td className="px-6 py-4 text-sm text-center">25%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-left">HUMSS</td>
              <td className="px-6 py-4 text-sm text-center">15%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-left">Cookery</td>
              <td className="px-6 py-4 text-sm text-center">10%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-left">GAS</td>
              <td className="px-6 py-4 text-sm text-center">3%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-left">STEM</td>
              <td className="px-6 py-4 text-sm text-center">2%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintDataIndex;
