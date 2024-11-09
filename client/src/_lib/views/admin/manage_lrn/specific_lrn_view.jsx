import React, { useState, useEffect } from "react";

import { useSearch } from "@tanstack/react-router";



import Nav from "../../../views/screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../../colors/colorMode";
import Base1 from "../../screen/admin/default/Base1";
import Tab from "@screen/admin/common/TabPagination";

import Searchj from "../../screen/admin/manage_books/searchj";
import SelectInput from "../../screen/admin/common/SelectInput";

import LRN_View_Form from "../../screen/admin/manage_lrn/LRN_View_Form";


import useAxiosStudentLRN from "../../../hook/useAxiosStudentLRN";

const specific_lrn_view = ({ lrn_id }) => {
    const search = useSearch({ from: "/admin/manage_lrn/specific_lrn" });
    const [finalLRNId, setFinalLRNId] = useState(null);
  
    useEffect(() => {
      console.log("lrnId from props:", lrn_id);
      console.log("lrnId from search params:", search.lrn_id);
  
      const idToFetch = lrn_id || search.lrn_id;
      if (idToFetch) {
        setFinalLRNId(idToFetch);
      }
    }, [lrn_id, search.lrn_id]);
  
    const { data, loading, error, refetch } = useAxiosStudentLRN(finalLRNId);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No student data found</div>;
  
    console.log("LRN Student: ", data.data);

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Manage Students"]} />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-4">
            <div className="flex justify-between items-center mt-2 w-full">
              
            </div>

            <LRN_View_Form  studentData={data.data}/>
           
          
          </section>
        </div>
      </div>
      <footer className="w-full h-10 mt-[1600px]"></footer>
    </>
  );
};

export default specific_lrn_view;
