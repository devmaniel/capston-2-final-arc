import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

import axios from "../../../api/axios";

const Add_account_form = () => {
  // Initialize the form state directly in the component
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    lrn: "",
    section: "",
    yearLevel: "g11",
    strand: "ABM",
    role: "student",
  });

  // Track touched fields
  const [touched, setTouched] = useState({
    lastName: false,
    firstName: false,
    lrn: false,
    section: false,
    yearLevel: false,
    strand: false,
    role: false,
  });

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handlePost = async () => {
    console.log("Starting handlePost function");
  
    // Check if all required fields are filled
    const isFormComplete =
      formData.lastName &&
      formData.firstName &&
      formData.lrn &&
      formData.section;
  
    if (!isFormComplete) {
      // Show SweetAlert modal if required fields are missing
      await Swal.fire({
        title: "Error!",
        text: "All fields are required!",
        icon: "error",
      });
      return; // Prevent further execution if validation fails
    }
  
    // Proceed with the rest of the handlePost function
    console.log("Showing confirmation modal");
    const result = await Swal.fire({
      title: "Add Account",
      text: "Do you want to add this account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      console.log("User confirmed. Proceeding with account creation");
  
      try {
        console.log("Showing loading modal");
        Swal.fire({
          title: "Adding account...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
        const postData = {
          first_name: formData.firstName,
          middle_name: formData.middleName,
          last_name: formData.lastName,
          valid_lrn: formData.lrn,
          track: `${formData.yearLevel}:${formData.strand}`,
          role: formData.role,
        };
        console.log("Prepared postData:", postData);
  
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Delay completed");
  
        const response = await axios.post(
          "/admin/post_single_lrn_student",
          postData
        );
        console.log("Server response:", response.data);
  
        Swal.close();
  
        await Swal.fire({
          title: "Success!",
          text: "Account has been added successfully",
          icon: "success",
        });
  
        setFormData({
          lastName: "",
          firstName: "",
          middleName: "",
          lrn: "",
          section: "",
          yearLevel: "g11",
          strand: "ABM",
          role: "student",
        });
        console.log("Form data cleared");
      } catch (error) {
        console.log("Error occurred:", error);
  
        Swal.close();
  
        // Check if the error response indicates that the LRN already exists
        if (error.response?.data?.message === "LRN already exists in the database") {
          await Swal.fire({
            title: "Error!",
            text: "This LRN already exists in the database.",
            icon: "error",
          });
        } else {
          await Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to add account",
            icon: "error",
          });
        }
      }
    } else {
      console.log("User cancelled the operation");
    }
  };
  

  // Handler function to update state when input changes
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Check if all fields except middleName are empty
  const isFormValid = Object.keys(formData).some(
    (key) => key !== "middleName" && formData[key] !== ""
  );

  return (
    <div className="bg-neutral rounded-md text-base-100  w-full">
      <div className="border-base-100 p-5 border-b flex justify-between">
        <h1 className="font-black">View LRN Student Profile</h1>
        <FiEdit className="text-2xl cursor-pointer" />
      </div>

      <form
        className="p-5 leading-10 flex flex-col gap-3 text-base-100"
        onSubmit={(e) => {
          e.preventDefault();
          handlePost();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Last Name */}
          <div>
            <h1 className="text-md font-semibold">Last Name:</h1>
            <input
              type="text"
              name="lastName"
              className={`input bg-base-100 text-neutral rounded-md w-full ${
                touched.lastName && !formData.lastName ? "border-error" : ""
              }`}
              value={formData.lastName}
              onChange={handlerChange}
              onBlur={handleBlur}
            />
            {touched.lastName && !formData.lastName && (
              <span className="text-sm italic text-error">
                Note: Last Name is required
              </span>
            )}
          </div>

          {/* First Name */}
          <div>
            <h1 className="text-md font-semibold">First Name:</h1>
            <input
              type="text"
              name="firstName"
              className={`input bg-base-100 text-neutral rounded-md w-full ${
                touched.firstName && !formData.firstName ? "border-error" : ""
              }`}
              value={formData.firstName}
              onChange={handlerChange}
              onBlur={handleBlur}
            />
            {touched.firstName && !formData.firstName && (
              <span className="text-sm italic text-error">
                Note: First Name is required
              </span>
            )}
          </div>

          {/* Middle Name (No validation for required) */}
          <div>
            <h1 className="text-md font-semibold">Middle Name:</h1>
            <input
              type="text"
              name="middleName"
              className="input bg-base-100 text-neutral rounded-md w-full"
              value={formData.middleName}
              onChange={handlerChange}
              onBlur={handleBlur}
            />
          </div>

          {/* LRN */}
          <div>
            <h1 className="text-md font-semibold">(LRN):</h1>
            <input
              type="text"
              name="lrn"
              className={`input bg-base-100 text-neutral rounded-md w-full ${
                touched.lrn && !formData.lrn ? "border-error" : ""
              }`}
              value={formData.lrn}
              onChange={handlerChange}
              onBlur={handleBlur}
            />
            {touched.lrn && !formData.lrn && (
              <span className="text-sm italic text-error">
                Note: LRN is required
              </span>
            )}
          </div>

          {/* Section */}
          <div>
            <h1 className="text-md font-semibold">Section:</h1>
            <input
              type="text"
              name="section"
              className={`input bg-base-100 text-neutral rounded-md w-full ${
                touched.section && !formData.section ? "border-error" : ""
              }`}
              value={formData.section}
              onChange={handlerChange}
              onBlur={handleBlur}
            />
            {touched.section && !formData.section && (
              <span className="text-sm italic text-error">
                Note: Section is required
              </span>
            )}
          </div>

          {/* Year Level */}
          <div>
            <h1 className="text-md font-semibold">Year Level:</h1>
            <select
              name="yearLevel"
              className={`input bg-base-100 text-neutral rounded-md w-full ${
                touched.yearLevel && !formData.yearLevel ? "border-error" : ""
              }`}
              value={formData.yearLevel}
              onChange={handlerChange}
              onBlur={handleBlur}
            >
              <option value="" disabled>
                Select a Year Level
              </option>
              <option value="g11">Grade 11</option>
              <option value="g12">Grade 12</option>
            </select>
            {touched.yearLevel && !formData.yearLevel && (
              <span className="text-sm italic text-error">
                Note: Year Level is required
              </span>
            )}
          </div>

          {/* Strand */}
          <div>
            <h1 className="text-md font-semibold">Strand:</h1>
            <select
              name="strand"
              className={`input bg-base-100 text-neutral rounded-md w-full ${
                touched.strand && !formData.strand ? "border-error" : ""
              }`}
              value={formData.strand}
              onChange={handlerChange}
              onBlur={handleBlur}
            >
              <option disabled>Select a Strand</option>
              <option value="ABM">
                Accountancy, Business, and Management (ABM)
              </option>
              <option value="GAS">General Academic Strand (GAS)</option>
              <option value="STEM">
                Science, Technology, Engineering, and Mathematics (STEM)
              </option>
              <option value="HUMSS">
                Humanities and Social Sciences (HUMSS)
              </option>
              <option value="Cookery">Cookery (Home Economics Strand)</option>
              <option value="ICT">
                Information and Communication Technology (ICT)
              </option>
            </select>
            {touched.strand && !formData.strand && (
              <span className="text-sm italic text-error">
                Note: Strand is required
              </span>
            )}
          </div>

          {/* Role */}
          <div>
            <h1 className="text-md font-semibold">Role:</h1>
            <select
              name="role"
              className={`input bg-base-100 text-neutral rounded-md w-full ${
                touched.role && !formData.role ? "border-error" : ""
              }`}
              value={formData.role}
              onChange={handlerChange}
              onBlur={handleBlur}
            >
              <option>Select a Role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            {touched.role && !formData.role && (
              <span className="text-sm italic text-error">
                Note: Role is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-base-100 col-span-2 rounded-md text-neutral text-xl p-2"
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_account_form;
