import React, {useEffect, useState} from "react";


import Nav from "../../../screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../../../colors/colorMode";
import Base1 from "../../../screen/admin/default/Base1";
import Tab from "@screen/admin/common/TabPagination";

import Searchj from "../manage_books/searchj";
import SelectInput from "../common/SelectInput";

import Student_View_Form_Screen from "./Student_View_Form_Screen";
import Violations_Form from "./Violations_Form";


import { useSearch } from '@tanstack/react-router';

import useAxiosFetchSingleStudent from "../../../../hook/useAxiosFetchSingleStudent";


const Student_View_Form_Page = ({ student_id }) => {
  const search = useSearch({ from: '/admin/manage_students/student_view_form' });

  // Ensure the search params are set before fetching
  const [finalStudentId, setFinalStudentId] = useState(null);

  useEffect(() => {
    // Log the student_id from props and search params
    console.log('student_id from props:', student_id);
    console.log('student_id from search params:', search.student_id);

    // Update finalStudentId only when it's available
    const idToFetch = student_id || search.student_id;
    if (idToFetch) {
      setFinalStudentId(idToFetch);
    }
  }, [student_id, search.student_id]);

  // Fetch student data only when finalStudentId is available
  const { data, loading, error } = useAxiosFetchSingleStudent(finalStudentId);

  // Handle loading state
  if (loading) {
    return <div>Loading student data...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching student data: {error}</div>;
  }

  console.log("Data:", data)

  const tabLinks = [];

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

            <Student_View_Form_Screen  studentData={data}/>
           
          
          </section>
        </div>
      </div>
      <footer className="w-full h-10 mt-[1600px]"></footer>
    </>
  );
};

export default Student_View_Form_Page;
