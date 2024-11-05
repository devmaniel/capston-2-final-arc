import { BsBoxes, BsBackpack, BsBookHalf, BsReceipt, BsPersonFillGear,  BsPersonVcard } from "react-icons/bs";
import '@styles/admin/nav.scss';

export default function Nav() {
  return (
    <div className=" rounded-l-lg m-3 overflow-auto bg-neutral border-0 text-white h-screen w-62 p-4">
      <nav className="pl-1">
        <h1 className="font-bold text-xl pl-">BBSHS Library <br /> Admin</h1>
        <hr className="mt-5 border-neutral"  />

        <ul className="nav-item pt-5">
          <h1 className="font-semibold pb-2">Dashboard</h1>
            <li>
              <a href="#" >
                <BsBackpack />Default
              </a>
            </li>
        </ul>

        <ul className="nav-item pt-5">
          <h1 className="font-semibold pb-2">Components</h1>


          <li>
            <a href="#" >
              <BsBackpack />Students
            </a>
          </li>

          <li>
            <a href="#" >
              <BsBookHalf  />Book Management
            </a>
          </li>

          <li>
            <a href="#" >
            <BsReceipt />Request Management
            </a>
          </li>

          <li>
            <a href="#" >
            <BsPersonVcard /> Manage LRN
            </a>
          </li>
        </ul>

        <ul className="nav-item pt-5">
          <h1 className="font-semibold pb-2">Admin Account</h1>
          <li>
            <a href="#">
              <BsPersonFillGear/> Profile
            </a>
          </li>

          <li>
              <button
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
                {loading ? "Logging out..." : "Logout"}
              </button>
              {error && <p className="error">{error}</p>}
            </li>
        </ul>
      </nav>
    </div>
  );
}