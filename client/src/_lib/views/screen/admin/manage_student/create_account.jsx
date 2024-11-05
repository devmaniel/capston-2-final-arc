import React, { useState } from "react";

// common components
import Nav from "@screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Tab from "@screen/admin/common/TabPagination";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../../../colors/colorMode";

// screens component
import CreateForm from "./create_form";

// styles
import "@styles/admin/AdminLand.scss";
import "@styles/admin/AdminSection.scss";

import axios from "../../../../api/axios";

const create_account = () => {
  let [post, setPost] = useState({
    firstName: null,
    lastName: null,
    LRN: null,
    email: null,
    pn: null,
    pw: null,
    cs: "TEST-1",
    section: "ABM-1",
    type: "TEST",
  });
  let [isError, setError] = useState(false);

  const tabLinks = [
    { name: "Manage Students", path: "/admin/manage_student" },
    { name: "Create Account", path: "/admin/manage_students/create_account" },
  ];

  function handleInput(e, field) {
    console.log(field + e);
    setPost({ ...post, [field]: e });
    
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Profile Account:", post);

    // Check if all properties are valid
    const isValid = Object.values(post).every(
      (value) => value !== null && value !== 0 && value !== ""
    );

    if (isValid) {
      axios.post("/test", { post })
      .then((res) => {
        console.log("Server response:", res.data);
        setError(false);
      })
      .catch((err) => {
        console.log("Error details:", err.response ? err.response.data : err.message);
        setError(true);
      });
    } else {
      setError(true);
    }
  }

  

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps
              links={["Components", "Manage Books", "Create Account"]}
            />

            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 w-fill h-fit flex flex-col gap-5  text-white ">
            <Tab tablink={tabLinks} />
            <CreateForm
              postprops={post}
              handleFormSubmit={handleFormSubmit}
              handleInput={handleInput}
              isError={isError}
            />

            <div className="bfoot w-fill h-[20px] mt-[30px] "></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default create_account;
