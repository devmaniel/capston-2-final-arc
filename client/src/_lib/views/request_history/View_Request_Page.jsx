import React from "react";

import Request_Screens from "../screen/student/Request/Request_Screens";

import { useSearch } from "@tanstack/react-router";

import { axiosFetchSingleRequest } from "../../hook/axiosFetchSingleRequest";

const View_Request_Page = () => {
  
  const { request_id } = useSearch({
    from: '/student/request_history/view_request',
  });

  const { data, error, loading } = axiosFetchSingleRequest(request_id);

  if(!data && loading){
    return <div>Loading...</div>
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
