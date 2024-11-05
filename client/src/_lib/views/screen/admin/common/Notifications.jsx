import { BsBell } from "react-icons/bs";

export default function Notifications() {
  return (
    <>
      <div className="dropdown dropdown-end btn-neutral notification">
        <button className="btn bell text-base-100">
          <BsBell />
          <div className="badge bg-primary border-none  text-white text-sm rounded-xl">
            +99
          </div>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu mt-2 p-2 shadow bg-neutral text-base-100 rounded-s w-52"
        >
          <li>
            <a>New Notifications</a>
          </li>
          <li>
            <a>Notifications</a>
          </li>
        </ul>
      </div>
    </>
  );
}
