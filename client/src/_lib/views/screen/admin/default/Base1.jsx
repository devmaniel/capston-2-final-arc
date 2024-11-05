import React from "react";

// screens
import TotalBook from "./totalBook";
import TotalRequest from "./TotalRequest";
import TotalStudent from "./TotalStudent.jsx";
import TotalViolatedAcc from "./totalViolatedAcc.jsx";
import BaseHistory from "./BaseHistory.jsx";
import BaseChart from "./BaseChart.jsx";

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
  const { data: bookChart } = axiosFetch("admin/Base6");

  return (
    <section className="mx-5">
      <div className="base1 flex gap-5">
        {totalBooksData === null ? (
          <div className="skeleton totalBooks bg-default"></div>
        ) : (
          <div className="totalBooks bg-neutral text-base-100 p-6">
            <TotalBook totalBooks={totalBooksData} />
          </div>
        )}

        {totalActive ? (
          <div className="totalRequest bg-neutral text-base-100  p-6">
            <TotalRequest totalActive={totalActive} />
          </div>
        ) : (
          <div className="skeleton totalRequest bg-default"></div>
        )}

        <div className="dailyreport flex flex-col gap-3 ">
          {totalActiveAcc === null ? (
            <div className="bg-default skeleton b  px-5"></div>
          ) : (
            <div className="bg-neutral text-base-100  px-5">
              <TotalStudent totalActive={totalActiveAcc} />
            </div>
          )}

          {totalViolated === null ? (
            <div className="bg-default skeleton b  px-5"></div>
          ) : (
            <div className="bg-neutral text-base-100  px-5">
              <TotalViolatedAcc totalViolations={totalViolated} />
            </div>
          )}
        </div>
      </div>

      <div className="flex  mt-5 gap-5 base2">
        {bookChart === null ? (
          <div className="bg-default skeleton base-chart h-96 p-2"></div>
        ) : (
          <div className="bg-secondary base-chart p-2">
            <BaseChart chartData={bookChart} />
          </div>
        )}
        {activityLog === null ? (
          <div className=" skeleton base-history bg-default"></div>
        ) : (
          <div className=" base-history p-5 bg-neutral text-base-100  h-5/6">
            <h1 className="text-2xl font-semibold pb-2">Recent History</h1>
            {activityLog.map((entry, index) => (
              <BaseHistory key={index} entry={entry} />
            ))}
          </div>
        )}

       
      </div>
    </section>
  );
};

export default Base1;
