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
