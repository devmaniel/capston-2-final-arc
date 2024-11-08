import React from "react";

import Request_Screens from "../screen/student/Request/Request_Screens";

import { useSearch } from "@tanstack/react-router";

import { axiosFetchSingleRequest } from "../../hook/axiosFetchSingleRequest";
import Loading from "../Loading";

const View_Request_Page = () => {
  const { request_id } = useSearch({
    from: "/student/request_history/view_request",
  });

  const { data, error, loading } = axiosFetchSingleRequest(request_id);

  if (!data && loading) {
    return (
      <>
        <div className="relative">
          <div className="fixed top-0 left-0 w-full h-[4px] bg-sky-600 z-[999] overflow-hidden">
            <div className="h-full bg-sky-900 animate-[loading_2s_linear_infinite] translate-x-[-100%]">
              <div
                className="h-full w-full animate-loading"
                style={{ animation: "loading 2s linear infinite" }}
              ></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </>
    );
  }

  console.log(data);

  console.log("Request ID:", request_id);

  return (
    <>
      <Request_Screens requestData={data} />
    </>
  );
};

export default View_Request_Page;
