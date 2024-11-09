import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

import Swal from "sweetalert2";

import axios from "../../../../api/axios";

const LRN_View_Form = ({ studentData }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    // Only show the modal if we are entering edit mode (i.e., when editMode is false)
    if (!editMode) {
      Swal.fire({
        title: "You're entering edit mode",
        text: "Do you want to proceed?",
        icon: "question",
        showCancelButton: true, // Show the "No" button
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          // If user clicks "Yes", toggle the editMode state
          setEditMode(true);
        }
      });
    } else {
      // If already in edit mode, just toggle without showing the modal
      setEditMode(false);
    }
  };

  const [updateData, setUpdateData] = useState({
    acc_status: studentData.acc_status,
    last_name: studentData.last_name,
    first_name: studentData.first_name,
    middle_name: studentData.middle_name,
    lrn: studentData.valid_lrn,
    section: studentData.section,
    track: studentData.track,
    year_level: studentData.year_level,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePostUpdateLRN = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Show confirmation modal
    const confirmResult = await Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to update this student's information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        // Make the API call
        const response = await axios.post(
          "/admin/excellrnupdatespecificstudent",
          {
            id: studentData.id, // Include the student ID
            ...updateData,
          }
        );

        // Show success modal
        await Swal.fire({
          title: "Success!",
          text: "Student information has been updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Reload the page
        window.location.reload();
      } catch (error) {
        // Show error modal
        await Swal.fire({
          title: "Error!",
          text:
            error.response?.data?.message ||
            "Failed to update student information",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="bg-neutral rounded-md text-base-100 mb-5">
      <div className="byeaorder-base-100 p-5 border-b flex justify-between">
        <h1 className="font-black">View LRN Student Profile</h1>
        <FiEdit
          onClick={handleEditMode}
          className={`text-2xl  cursor-pointer ${editMode ? "text-primary" : ""}`}
        />
      </div>

      <form className="p-5 leading-10 flex flex-col gap-3 text-base-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-md font-semibold">Is Student Registered?:</h1>
            <input
              type="text"
              name="acc_status"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={
                Number.isInteger(updateData.acc_status)
                  ? "Registered"
                  : "Unregistered"
              }
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Last Name:</h1>
            <input
              type="text"
              name="last_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly={!editMode}
              value={updateData.last_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">First Name:</h1>
            <input
              type="text"
              name="first_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly={!editMode}
              value={updateData.first_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Middle Name:</h1>
            <input
              type="text"
              name="middle_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly={!editMode}
              onChange={handleChange}
              value={updateData.middle_name || ""}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">(LRN):</h1>
            <input
              type="text"
              name="lrn"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly={!editMode}
              onChange={handleChange}
              value={updateData.lrn}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Section:</h1>
            <input
              type="text"
              name="section_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly={!editMode}
              onChange={handleChange}
              value={updateData.section}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Year Level:</h1>
            <input
              type="text"
              name="yearlvl"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly={!editMode}
              onChange={handleChange}
              value={updateData.year_level}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Track:</h1>
            <input
              type="text"
              name="track_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly={!editMode}
              onChange={handleChange}
              value={updateData.track}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Role:</h1>
            <input
              type="text"
              name="role"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.role}
            />
          </div>

          <button
            type="submit"
            className="bg-base-100 col-span-2 rounded-md text-neutral text-xl p-2"
            onClick={(e) => handlePostUpdateLRN(e)}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default LRN_View_Form;
