import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import Drawer from "@screen/admin/common/Drawer";
import ColorMode from "../../../../src/_lib/colors/colorMode";
import Notifications from "@screen/admin/common/Notifications";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Pagination from "@screen/admin/common/Paginations";
import SelectInput from "../../../_lib/views/screen/admin/common/SelectInput";
import Searchj from "../../../../src/_lib/views/screen/admin/manage_books/searchj";

import auth from "../../../_lib/api/auth";

export const Route = createFileRoute(
  "/admin/profile_settings/profile_settings"
)({
  beforeLoad: async () => {
    const role = "admin";
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
        case "role_mismatch":
          console.log(
            `Role mismatch. Redirecting to: ${role === "admin" ? "/student" : "/admin"}`
          );
          throw redirect({ to: role === "admin" ? "/student" : "/admin" });
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }
  },
  component: profile_settings,
});

import axiosFetchPostProfile from "../../../_lib/hook/axiosFetchPostProfile";

import axios from "../../../_lib/api/axios";

import Swal from "sweetalert2";

export default function profile_settings() {
  const { data: profileData, error, loading } = axiosFetchPostProfile();

  if (loading) return <div>Loading...</div>;

  console.log("Profile Data:", profileData); // Log the entire profileData

  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Components", "Manage Violations"]} />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <section className="mx-5 ">
            {!profileData ? (
              <div className="max-w-[1400px] mx-auto h-screen p-4 sm:p-6 lg:p-8 text-center">
                <p>Loading profile data...</p>
              </div>
            ) : error ? (
              <div className="max-w-[1400px] mx-auto h-screen p-4 sm:p-6 lg:p-8 text-center">
                <p>Error: {error}</p>
              </div>
            ) : (
              <div className="border-t-2 border-neutral pt-2">
                <h1 className="font-bold text-[24px]">
                  Admin Profile Settings
                </h1>
                <div className="pt-5 flex">
                  <form className="h-full">
                    <div className="bg-white w-[300px] h-full rounded-md shadow-lg overflow-hidden">
                      <div className="avatar p-5 flex justify-center">
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
                      </div>
                      <div
                        className="p-5 leading-none -mt-5"
                        style={{ fontFamily: "poppins" }}
                      >
                        <h1 className="text-[#333333] text-xl font-semibold">
                        {`${profileData?.data?.lastName || ""}, ${profileData?.data?.firstName || ""}${profileData?.data?.middleName ? " " + profileData.data.middleName[0] + "." : ""}`.trim()}

                        </h1>
                        <h2 className="text-[#555555] text-xs">
                          Admin Librarian
                        </h2>
                      </div>

                      <div className="p-5 -mt-4">
                        <label
                          className="block mb-2 text-sm font-medium text-[#333333]"
                          htmlFor="small_size"
                        >
                          Upload an image
                        </label>
                        <input
                          className="block w-full mb-5 text-xs p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="small_size"
                          type="file"
                        />
                      </div>
                    </div>
                  </form>
                  <div className="mx-5 bg-white p-5 w-full rounded-md shadow-md">
                    <form className="w-full">
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-full-name"
                          >
                            Full Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-full-name"
                            type="text"
                            placeholder="Melco Maniel M. Gulbe"
                            value={`${profileData?.data?.lastName || ""}, ${profileData?.data?.firstName || ""}${profileData?.data?.middleName ? " " + profileData.data.middleName[0] + "." : ""}`.trim()}

                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-email"
                          >
                            Email
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={profileData?.data?.email || ""}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-phone"
                          >
                            Phone Number
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-phone"
                            type="text"
                            maxLength={12}
                            placeholder="xxxxxxxxxxx"
                            value={profileData?.data?.contactNumber || ""}
                          />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-role"
                          >
                            Role
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-role"
                            type="text"
                            placeholder="Role"
                            value={"Head Librarian / Admin"}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </section>

          <Pagination />
        </div>
      </div>
      <footer className="w-full h-10 mt-[500px]"></footer>
    </>
  );
}
