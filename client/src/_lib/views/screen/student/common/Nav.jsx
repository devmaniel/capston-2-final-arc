import { Link, useMatch, useNavigate } from "@tanstack/react-router";

// components
import SiteStatus from "./Site_Status";
import ColorButton from "@colors/colorMode.jsx";
import { FaBellSlash } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";

// commn component
import Notifications from "./Notifications";
import Mobile_Notif from "./Mobile_Notif";

// styles
import "@styles/student/nav.scss";

// React icon

import useLogout from "../../../../api/logout";

const NavLink = ({ to, children }) => {
  const match = useMatch(to);
  return (
    <Link to={to} className={`font-black ${match ? "text-sky-500" : ""}`}>
      {children}
    </Link>
  );
};

import axiosFetchPostProfile from "../../../../hook/axiosFetchPostProfile";

export default function NavStudent() {
  const { logout, loading, error } = useLogout();

  const {
    data: profileData,
    error: pfpError,
    loading: pfpLoading,
  } = axiosFetchPostProfile();

  if (!profileData)
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

  return (
    <>
      <SiteStatus />
      <div className="drawer student-nav  w-full md:min-w-[650px] lg:min-w-[768px] xl:max-w-[1300px] ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar ">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </label>
            </div>
            <div className="flex-1 justify-between cursor-pointer font-extrabold tracking-[wide] text-md  sm:text-xl">
              <Link to="/student">
                <div className="flex items-center justify-between">
                  <img
                    src="/images/logo.png"
                    className="h-[35px] bg-white rounded-[50%]"
                    alt="Bagong Barrio Senior High School"
                  />
                  <h1 className=" mx-3">BBSHS LIBRARY</h1>
                </div>
              </Link>

              <Mobile_Notif />
            </div>
            <div className="flex-none items-center hidden lg:block">
              <ul className="menu menu-horizontal flex items-center text-lg">
                <li>
                  <Link
                    to="/student"
                    activeProps={{ className: "text-primary font-black" }}
                    activeOptions={{ exact: true }}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/student/catalog"
                    activeProps={{ className: "text-primary font-black" }}
                    activeOptions={{
                      exact: false,
                      includeQueryParams: true,
                      custom: (path, params) => {
                        return (
                          path.startsWith("/student/book") &&
                          params.bookId !== undefined
                        );
                      },
                    }}
                  >
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/student/bookmark"
                    activeProps={{ className: "text-primary font-black" }}
                    activeOptions={{ exact: true }}
                  >
                    Bookmark
                  </Link>
                </li>
                <li>
                  <Link
                    to="/student/request_history"
                    activeProps={{ className: "text-primary font-black" }}
                    activeOptions={{ exact: true }}
                  >
                    Request History
                  </Link>
                </li>

                <li>
                  <Link
                    to="/student/about"
                    activeProps={{ className: "text-primary font-black" }}
                    activeOptions={{ exact: true }}
                  >
                    About
                  </Link>
                </li>

                <Notifications />
                <li>
                  <ColorButton />
                </li>
                <li>
                  <div className="dropdown dropdown-end avatar placeholder">
                    {profileData.data.profileImage ? (
                      // Display image if profileImage is not empty or null
                      <div className="avatar online">
                        <div
                          className="w-11 h-11 rounded-full"
                          tabIndex={0}
                          role="button"
                        >
                          <img
                            src={
                              "/Profile Image/" + profileData.data.profileImage
                            }
                            alt="Profile"
                          />
                        </div>
                      </div>
                    ) : (
                      // Display initials if profileImage is empty or null

                      <div
                        tabIndex={0}
                        role="button"
                        className="avatar btn rounded-full  dark:border-black h6"
                      >
                        <span className="text-xs">
                          {" "}
                          {profileData.data.lastName[0]}
                          {profileData.data.firstName[0]}
                        </span>
                      </div>
                    )}

                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-neutral mt-48 mr-4 z-[1] p-2 shadow  text-base-100 rounded w-52"
                    >
                      <li>
                        <Link
                          to="/student/profile_setting"
                          activeProps={{ className: "text-primary font-black" }}
                          activeOptions={{ exact: true }}
                        >
                          Profile Settings
                        </Link>
                      </li>
                      <li>
                      <Link
                          to="/student/frequentlyAsk/FAQ"
                          activeProps={{ className: "text-primary font-black" }}
                          activeOptions={{ exact: true }}
                        >
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            logout();
                          }}
                        >
                          {loading ? "Logging out..." : "Logout"}
                        </button>
                        {error && <p className="error">{error}</p>}
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-lg">
            {/* Sidebar content here */}
            <li>
              <Link
                to="/student"
                activeProps={{ className: "text-primary font-black" }}
                activeOptions={{ exact: true }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/student/catalog"
                activeProps={{ className: "text-primary font-black" }}
                activeOptions={{ exact: true }}
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/student/bookmark"
                activeProps={{ className: "text-sky-500 font-black" }}
                activeOptions={{ exact: true }}
              >
                Bookmark
              </Link>
            </li>
            <li>
              <Link
                to="/student/request_history"
                activeProps={{ className: "text-sky-500 font-black" }}
                activeOptions={{ exact: true }}
              >
                Request History
              </Link>
            </li>
            <li>
              <Link
                to="/student/about"
                activeProps={{ className: "text-sky-500 font-black" }}
                activeOptions={{ exact: true }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/student/profile_setting"
                activeProps={{ className: "text-primary font-black" }}
                activeOptions={{ exact: true }}
              >
                Profile Settings
              </Link>
            </li>
            <li className="mt-5 color_mobile">
              <ColorButton />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
