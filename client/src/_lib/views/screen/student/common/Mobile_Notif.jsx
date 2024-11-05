import { BsBell } from "react-icons/bs";
import { Link } from "@tanstack/react-router";
import { IoIosArrowUp } from "react-icons/io";
import { BsBellFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { React, useState } from "react";

export default function Mobile_Notif() {
  return (
    <>
      <div>
        <Link
          to="/student/mobile_notif"
          className=" flex items-center justify-end sm:hidden text-[12px]"
        >
          <BsBellFill />
          <div className="badge badge-primary mx-2">+99</div>
        </Link>
      </div>
    </>
  );
}
