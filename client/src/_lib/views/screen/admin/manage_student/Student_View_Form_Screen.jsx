import React from "react";
import { FiEdit } from "react-icons/fi";

const Student_View_Form_Screen = ({ studentData }) => {

  const ACADEMIC_TRACKS = {
    ICT: "Information and Communications Technology (ICT)",
    ABM: "Accountancy, Business and Management (ABM)",
    HUMSS: "Humanities and Social Sciences (HUMSS)",
    GAS: "General Academic Strand (GAS)",
    COOKERY: "Cookery (CK)"
  };

  // Function to get track display name
  const getTrackDisplayName = (track) => {
    return ACADEMIC_TRACKS[track] || track;
  };


  return (
    <div className="bg-neutral rounded-md text-base-100 mb-5">
      <div className="border-base-100 p-5 border-b flex justify-between">
        <h1 className="font-black">View Profile</h1>
        <FiEdit className="text-2xl" />
      </div>

      <form className="p-5 leading-10 flex flex-col gap-3 text-base-100">
        {studentData.student.profileImage ? (
          // If profile image exists
          <div className="avatar placeholder:">
            <div className="mask mask-squircle  w-24">
              <img
                src={`/Profile Image/${studentData.student.profileImage}`}
                alt="Profile Image"
              />
            </div>
          </div>
        ) : (
          // If no profile image exists
          <div className="avatar placeholder">
            <div className="bg-base-100  text-neutral-content w-24 mask mask-squircle">
              <span className="text-neutral">
                {`${studentData.lrnData.first_name[0].toUpperCase()}${studentData.lrnData.last_name[0]?.toUpperCase() || ""}`}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-md font-semibold">Last Name:</h1>
            <input
              type="text"
              name="last_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.lrnData.last_name}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">First Name:</h1>
            <input
              type="text"
              name="first_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.lrnData.first_name}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Middle Name:</h1>
            <input
              type="text"
              name="middle_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.lrnData.first_name || ""}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">(LRN):</h1>
            <input
              type="text"
              name="lrn"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.lrnData.valid_lrn}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Section:</h1>
            <input
              type="text"
              name="section_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.lrnData.section}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Year Level:</h1>
            <input
              type="text"
              name="yearlvl"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.lrnData.year_level}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Track:</h1>
            <input
              type="text"
              name="track_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={getTrackDisplayName(studentData.lrnData.track)}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Role:</h1>
            <input
              type="text"
              name="role"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.lrnData.role}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Email:</h1>
            <input
              type="text"
              name="email"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.student.email}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Phone Number:</h1>
            <input
              type="text"
              name="phone_numbr"
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              value={studentData.student.phone_number}
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Address:</h1>
            <input
              type="text"
              name="address"
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-base-100 col-span-2 rounded-md text-neutral text-xl p-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Student_View_Form_Screen;
