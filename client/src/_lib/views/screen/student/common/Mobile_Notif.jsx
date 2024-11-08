import { BsBell } from "react-icons/bs";
import { Link, useLocation } from "@tanstack/react-router";
import { IoIosArrowUp } from "react-icons/io";
import { BsBellFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { React, useState } from "react";
import { useAxiosNotifications } from "../../../../hook/useAxiosNotifications";

export default function Mobile_Notif() {
  const { loading, data, counter, error } = useAxiosNotifications();
  const { pathname } = useLocation();

  return (
    <>
      <div className="">
        <Link
          to="/student/mobile_notif"
          className=" flex items-center justify-end lg:hidden text-[12px]"
        >
          <BsBellFill className="text-[20px] mx-2" />
          {pathname === "/student/mobile_notif" ? (
            <div className="absolute top-3 right-0  text-[12px] bg-secondary px-1 mx-3 text-white  rounded-full">
              
            </div>
          ) : (
            <div className="absolute top-3 right-0  text-[12px] bg-secondary px-1 mx-3 text-white  rounded-full">
              {counter}
            </div>
          )}
        </Link>
      </div>
    </>
  );
}
