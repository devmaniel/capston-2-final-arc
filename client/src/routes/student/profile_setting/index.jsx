import { createFileRoute, redirect } from "@tanstack/react-router";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

// authentication api
import auth from "../../../_lib/api/auth";

export const Route = createFileRoute("/student/profile_setting/")({
  beforeLoad: async () => {
    const role = "student";
    const authResult = await auth(role);

    if (authResult.success) {
      if (authResult.role !== role) {
        console.log(
          `Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`
        );
        throw redirect({
          to: authResult.role === "student" ? "/student" : "/login",
        });
      }
      // Proceed if session is valid and roles match
      return {};
    } else {
      // Handle redirection based on the reason provided by the auth function
      switch (authResult.reason) {
        case "session_not_found":
        case "invalid_session":
        case "expired_session":
          console.log(`Error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
        case "pending_violations":
          console.log(
            "User has pending violations. Redirecting to /violations_page"
          );
          throw redirect({ to: "/violations_page" });
        case "role_mismatch":
          console.log(
            `Role mismatch. Redirecting to: ${role === "admin" ? "/student" : "/admin"}`
          );
          throw redirect({ to: role === "admin" ? "/student" : "/admin" });
        case "unenrolled":
          console.log("User is no longer enrolled. Redirecting to /noLonger");
          throw redirect({ to: "/noLonger" });
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }
  },
  component: () => profileSetting(),
});

import React, { useState } from "react";
import Footer from "../../../_lib/views/screen/student/common/Footer";
import Nav from "@_lib/views/screen/student/common/Nav";

import axiosFetchPostProfile from "../../../_lib/hook/axiosFetchPostProfile";

import Change_Account_Dialog from "../../../_lib/views/screen/student/Profile/Change_Account_Dialog";
import Password_Change_Dialog from "../../../_lib/views/screen/student/Profile/Password_Change_Dialog";

import Swal from "sweetalert2";

import axios from "../../../_lib/api/axios";

export default function profileSetting() {
  const { data: profileData, error, loading } = axiosFetchPostProfile();

  const [profileImg, setUploadProfileImg] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.size <= 5 * 1024 * 1024 &&
      file.type.startsWith("image/")
    ) {
      setUploadProfileImg(file);
      confirmUpload(file); // Pass the file directly to confirmUpload
    } else {
      Swal.fire(
        "Invalid file",
        "Please select an image file (max 5MB).",
        "error"
      );
    }
  };

  const confirmUpload = (file) => {
    Swal.fire({
      title: "Are you sure you want to upload your profile picture?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#0476D0",
      cancelButtonColor: "#FC2E20",
    }).then((result) => {
      if (result.isConfirmed) {
        uploadProfilePicture(file); // Pass the file to uploadProfilePicture
      } else {
        setUploadProfileImg(null);
      }
    });
  };

  const uploadProfilePicture = (file) => {
    const profileImagePath = `/Profile Image/${profileData.data.profileImage}`; // Construct the image path
    const formData = new FormData();
    const filename = `${new Date().toISOString().split("T")[0]}_${file.name}`; // Use the passed file
    formData.append("profileImage", file);
    formData.append("LRN", profileData?.data?.LRN || "");

    axios
      .post("/student/upload_pfp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: "Profile picture uploaded successfully!",
          icon: "success",
          background: "#f0f0f0",
          color: "#333",
          confirmButtonColor: "#0476D0",
          cancelButtonColor: "#FC2E20",
          confirmButtonText: "Okay",
          customClass: {
            popup: "custom-popup",
          },
          timer: 5000,
          timerProgressBar: true, // Show timer progress bar
        }).then(() => {
          window.location.reload();
        });

        const style = document.createElement("style");
        style.innerHTML = `
        .custom-popup {
          border-radius: 15px; 
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1); 
        }
      `;
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          "There was an error uploading your profile picture.",
          "error"
        );
      });
  };

  if (!profileData ) {
    return (
      <div className="max-w-[1400px] mx-auto h-screen p-4 sm:p-6 lg:p-8">
        <profileData />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log("Profile Data:", profileData); // Log the entire profileData

  return (
    <>
      <Nav />

      {/* Loading state */}
      {!profileData ? (
        <div className="max-w-[1400px] mx-auto h-screen p-4 sm:p-6 lg:p-8 text-center">
          <p>Loading profile data...</p>
        </div>
      ) : error ? (
        <div className="max-w-[1400px] mx-auto h-screen p-4 sm:p-6 lg:p-8 text-center">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto h-auto p-4 sm:p-6 lg:p-8">
          <div className="pt-8 w-full border-t-2 border-neutral">
            <div className="text-center sm:text-center md:text-left">
              <h1 className="font-bold text-[20px]">Personal Information</h1>
              <p className="text-sm my-2 text-gray-600">
                <strong>Note:</strong> To update your profile information,
                please visit the librarian and request the changes.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 lg:gap-[90px]">
              <div className="my-5 sm:my-0 lg:rounded-[50%] flex justify-center items-center lg:justify-start">
                <div className="text-base-100 mx-auto items-center">
                  <div className="flex mx-auto justify-center items-center ">
                    {profileData.data.profileImage ? (
                      <img
                        src={"/Profile Image/" + profileData.data.profileImage}
                        className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[200px] mx-auto flex justify-center items-center mb-2 object-cover shadow-2xl rounded-full"
                      />
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-[200px] h-[200px] rounded-full flex items-center justify-center">
                          <span className="text-4xl">
                            {profileData.data.firstName[0] +
                              "" +
                              profileData.data.lastName[0]}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <form>
                    <div className="p-2 rounded">
                      <input
                        type="file"
                        className="block w-full max-w-[250px] px-4 py-2 my-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleImageChange}
                      />
                      <p className="text-[12px] text-center mt-[-10px] text-gray-500">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              <form className="text-neutral my-2 gap-10 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full bg-white text-black"
                      value={profileData?.data?.lastName || ""} // Using optional chaining
                      readOnly
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full bg-white text-black"
                      value={profileData?.data?.firstName || ""} // Using optional chaining
                      readOnly
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Middle Name</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full bg-white text-black"
                      value={profileData?.data?.middleName || "N/A"} // Using optional chaining
                      readOnly
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 my-4">
                  <label className="form-control w-full col-span-1 sm:col-span-2">
                    <div className="label">
                      <span className="label-text">Email</span>
                    </div>
                    <input
                      type="email"
                      placeholder="Type here"
                      className="input input-bordered w-full bg-white text-black"
                      readOnly
                      value={profileData?.data?.email || ""} // Using optional chaining
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">(LRN)</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full bg-white text-black"
                      readOnly
                      value={profileData?.data?.LRN || ""} // Using optional chaining
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Contact Number</span>
                    </div>
                    <input
                      readOnly
                      value={profileData?.data?.contactNumber || ""} // Using optional chaining
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full text-black bg-white"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 my-4">
                  <label className="form-control w-full col-span-1 sm:col-span-2">
                    <div className="label">
                      <span className="label-text">Strand/Track</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      value={
                        profileData?.data?.track === "ICT"
                          ? "Information Communication Technology (ICT)"
                          : profileData?.data?.track === "ABM"
                            ? "Accountancy, Business and Management Strand (ABM)"
                            : profileData?.data?.track === "GAS"
                              ? "General Academic Strand (GAS)"
                              : profileData?.data?.track === "HUMSS"
                                ? "Humanities and Social Sciences Strand"
                                : profileData?.data?.track || ""
                      }
                      className="input input-bordered w-full text-black bg-white"
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Section</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      value={profileData?.data?.section || ""}
                      className="input input-bordered w-full text-black bg-white"
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Role</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      value={profileData?.data?.role || ""}
                      className="input input-bordered w-full text-black bg-white"
                    />
                  </label>
                </div>
                <div className="my-10 flex items-center justify-center gap-4 sm:flex-row sm:justify-end">
                  <button
                    className="btn btn-wide bg-primary text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("my_modal_passwordchange")
                        .showModal();
                    }}
                  >
                    Change Password
                  </button>

                  <Password_Change_Dialog
                    lrnvalue={profileData?.data?.LRN || ""}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
