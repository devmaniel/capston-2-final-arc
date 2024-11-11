import React from "react";

// screens
import TotalBook from "./totalBook";
import TotalRequest from "./TotalRequest";
import TotalStudent from "./TotalStudent.jsx";
import TotalViolatedAcc from "./totalViolatedAcc.jsx";
import BaseHistory from "./BaseHistory.jsx";
import BaseChart from "./BaseChart.jsx";
import RecentAddbooks from "./RecentAddbooks.jsx";
// styles
import "@styles/admin/Base1.scss";

// custom hooks
import { axiosFetch } from "@hook/axiosFetch";

const Base1 = () => {
  let { data: totalBooksData, status: Check } = axiosFetch("/admin/Base1");
  let { data: totalActive } = axiosFetch("/admin/Base2");
  let { data: totalActiveAcc } = axiosFetch("/admin/Base3");
  let { data: totalViolated } = axiosFetch("/admin/Base4");
  let { data: activityLog } = axiosFetch("/admin/Base5");

  console.log("Data: ", activityLog);

  const { data: bookChart } = axiosFetch("admin/Base6");

  return (
    <section className="mx-5">
      <div className="mb-5  ">
        <div>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="grow outline-none bg-transparent"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      <div className="base1 flex gap-5">
        {totalBooksData === null ? (
          <div className=" totalBooks bg-default"></div>
        ) : (
          <div className="totalBooks border bg-white transition-shadow duration-300 text-black p-6 shadow-sm">
            <TotalBook totalBooks={totalBooksData} />
          </div>
        )}

        {totalActive ? (
          <div className="totalRequest border bg-white   p-6">
            <TotalRequest totalActive={totalActive} />
          </div>
        ) : (
          <div className=" totalRequest bg-default"></div>
        )}

        <div className="dailyreport flex flex-col gap-3 ">
          {totalActiveAcc === null ? (
            <div className="bg-default px-5"></div>
          ) : (
            <div className="bg-neutral  text-base-100  px-5">
              <TotalStudent totalActive={totalActiveAcc} />
            </div>
          )}

          {totalViolated === null ? (
            <div className="bg-default px-5"></div>
          ) : (
            <div className="bg-neutral  text-base-100  px-5">
              <TotalViolatedAcc totalViolations={totalViolated} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 w-full text-black">
        {bookChart === null ? (
          <div className="bg-default base-chart w-full h-full p-2"></div>
        ) : (
          <div className="bg-white w-full h-full border base-chart p-2">
            <BaseChart chartData={bookChart} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Base1;
