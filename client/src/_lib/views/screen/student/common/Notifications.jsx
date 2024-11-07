import { BsBell } from "react-icons/bs";
import { Link } from "@tanstack/react-router";
import { BsThreeDots } from "react-icons/bs";
import { React, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

import { useAxiosNotifications } from "../../../../hook/useAxiosNotifications";
import { formatDistanceToNow } from "date-fns"; // Library to format time

export default function Notifications() {
  const { loading, data, error } = useAxiosNotifications();
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading notifications</div>;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Assuming `data.date` holds the date of notification
  const now = new Date();
  const notificationDate = new Date(data?.date); // Adjust according to your data structure
  const timeDiff = now - notificationDate;
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  const isRecent = hoursDiff < 24;

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost   bell">
        <BsBell />
        <div className="badge bg-primary dark:text-white border-none  text-sm rounded-xl">
          +99
        </div>
      </button>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-2 mr-2 shadow text-black bg-white  overflow-x-hidden rounded-md w-auto overflow-y-auto`}
      >
        <div className=" mx-2 my-4 flex items-center justify-between">
          <h1 className="text-[17px] font-bold">Notifications</h1>
          <BsThreeDots />
        </div>

        <div
          className={`${
            isExpanded ? "h-[500px] w-auto" : "h-[500px]"
          } overflow-x-hidden w-auto overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100`}
          style={{
            width: "400px",
            maxHeight: "300px",
            scrollbarWidth: "thin",
            scrollbarRadius: "10px",
            scrollBehavior: "smooth",
            WebkitScrollbarThumb: {
              backgroundColor: "#888",
              borderRadius: "10px",
              border: "3px solid #f1f1f1",
            },
          }}
        >
          <div className=" w-full">
            <div className="flex my-1 mb-2 mx-3 text-[14px]">
              <h1>All</h1>
              <h1 className="mx-3">Unread</h1>
            </div>

            <div className="mx-2 flex items-center justify-between my-4">
              <h1 className="text-[17px] font-bold">New</h1>
              <Link
                to="/student/notifications"
                activeProps={{ className: "text-primary font-black" }}
                activeOptions={{ exact: true }}
              >
                <h1 className="text-[12px] hover:underline mx-7">See All</h1>
              </Link>
            </div>

            {data && data.length > 0 ? (
              <>
                {data
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
                  .slice(0, isExpanded ? data.length : 4)
                  .map((notif) => (
                    <>
                      <Link to={notif.href}>
                        <div
                          className="notif my-2 w-full"
                          key={notif.account_id}
                        >
                          <div className="bg-white w-full flex mb-3 p-1 overflow-hidden hover:bg-[#f0f0f0] hover:rounded-md">
                            <img
                              src="/images/logo.png"
                              className="h-12 bg-white rounded-full"
                              alt="Logo"
                            />
                            <div className="my-2 mx-4 overflow-hidden">
                              <div className="flex">
                                <h1 className="text-[12px] font-bold">BBSHS</h1>
                                <h1 className="text-[12px] mx-1 truncate w-[250px]">
                                  {notif.descriptions}
                                </h1>
                              </div>
                              <div className="flex justify-between items-center">
                                <h1 className="text-[12px] text-primary">
                                  {formatDistanceToNow(
                                    new Date(notif.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </h1>

                                <BsThreeDots className="text-xl cursor-pointer" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  ))}
                {data.length > 4 && (
                  <button
                    className={`text-[12px] hover:bg-[#036FA3] w-full justify-center mx-auto bg-primary text-white  px-4 py-2 rounded flex items-center`}
                    onClick={handleToggle}
                  >
                    {isExpanded
                      ? "View recent notifications"
                      : "View previous notifications."}
                  </button>
                )}
              </>
            ) : (
              <div className="notif my-4 w-full max-w-md mx-auto">
                <div className="rounded-lg text-center overflow-hidden">
                  <img
                    src="../images/logo.png"
                    alt="Company Logo"
                    className="mx-auto h-24 w-24 mb-4"
                  />
                  <h1 className="text-lg font-bold text-gray-800">
                    No notifications yet.
                  </h1>
                  <p className="text-gray-500 mt-2">
                    Stay tuned! Notifications will appear here when available.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
}
