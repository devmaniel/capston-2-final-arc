import { Link, useMatch } from "@tanstack/react-router";

import "@styles/admin/Drawernav.scss";

import useLogout from "../../../../api/logout";
import { FaBan } from "react-icons/fa";
import {
  BsBoxes,
  BsBackpack,
  BsBookHalf,
  BsReceipt,
  BsPersonFillGear,
  BsBarChartFill,
  BsPersonVcard,
  BsBookFill,
  BsReceiptCutoff,
} from "react-icons/bs";

export default function Drawer({ dh }) {
  const { logout, loading, error } = useLogout();

  return (
    <>
      <div className={`drawer w-80 m-5  ${dh}  z-10 `}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col custom-drawer">
          {/* Navbar */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="w-full custom-drawer overflow-auto p-5 flex-col text-left rounded-l-lg h-full hidden lg:block text-base-100 bg-neutral">
            <div className="flex-1 text-lg  font-bold hidden lg:block">
              BBSHS Library{" "}
            </div>
            <div className="flex-none hidden lg:block h-full">
              <ul className="nav-item pt-5 admin_links">
                {/* Navbar menu content here */}
                <h1 className="text-lg font-medium">Dashboard</h1>
                <li>
                  <Link
                    to="/admin"
                    activeOptions={{ exact: true }}
                    {...(location.pathname === "/admin"
                      ? { className: "text-white" }
                      : {})}
                  >
                    <BsBoxes />
                    Default
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/analytics/"
                    activeOptions={{ exact: true }}
                    {...(location.pathname === "/admin/analytics/"
                      ? { className: "text-white" }
                      : {})}
                  >
                    <BsBarChartFill />
                    Analytics
                  </Link>
                </li>
              </ul>

              <ul className="nav-item pt-5 admin_links">
                {/* Navbar menu content here */}
                <h1 className=" text-lg font-medium">Components</h1>
                <li>
                  <Link to="/admin/manage_students">
                    <BsBackpack />
                    Manage Students
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/manage_violations"
                    {...(location.pathname === "/admin/manage_violations"
                      ? { className: "text-white" }
                      : {})}
                  >
                    <FaBan />
                    Manage Violations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/manage_books"
                    {...(location.pathname === "/admin/manage_books"
                      ? { className: "text-white" }
                      : {})}
                  >
                    <BsBookFill />
                    Manage Books
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/manage_request/"
                    {...(location.pathname === "/admin/manage_request/"
                      ? { className: "text-white" }
                      : {})}
                  >
                    <BsReceiptCutoff />
                    Manage Request
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/manage_lrn/"
                    {...(location.pathname === "/admin/manage_lrn/"
                      ? { className: "text-white" }
                      : {})}
                  >
                    <BsBookFill />
                    Manage LRN
                  </Link>
                </li>
              </ul>

              <ul className="nav-item pt-5 admin_links">
                {/* Navbar menu content here */}
                <h1 className=" text-lg font-medium">Account</h1>
                <li>
                  <a href="#">
                    <BsPersonFillGear />
                    Profile Setting
                  </a>
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
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-neutral text-base-100">
            <h1 className="px-2 text-lg mb-2 font-medium mt-2">Dashboard</h1>
            <li>
              <a href="#">
                <BsBackpack />
                Default
              </a>
            </li>
            <li>
              <a href="#">
                <BsBackpack />
                Analytics
              </a>
            </li>
            <h1 className="px-2 text-lg font-medium mt-2 mb-2">Components</h1>
            <li>
              <a href="#">
                <BsBackpack />
                Manage Students
              </a>
            </li>
            <li>
              <a href="#">
                <BsBackpack />
                Manage Books
              </a>
            </li>
            <li>
              <a href="#">
                <BsBackpack />
                Manage Request
              </a>
            </li>
            <li>
              <a href="#">
                <BsBackpack />
                Manage LRN
              </a>
            </li>

            <h1 className="px-2 text-lg font-medium mt-2 mb-2">Account</h1>
            <li>
              <a href="#">
                <BsBackpack />
                Profile Setting
              </a>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
