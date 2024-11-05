import React from "react";

import { IoMdBook } from "react-icons/io";
import { LuBookX } from "react-icons/lu";
import { GiBookmark } from "react-icons/gi";

const default_1 = ({TotalBookActive, TotalOutOfStock, TotalBookBorrowed}) => {
  return (
    <div className="grid grid-cols-3  gap-2 text-white">
      <div className="bg-gradient-to-l from-sky-300 via-sky-400 to-sky-500 p-4 rounded-md flex items-center justify-between">
        <h1 className="font-black">Total Books Active: {TotalBookActive} </h1>
        <IoMdBook className="text-white text-4xl" />
      </div>

      <div className="bg-gradient-to-l from-red-300 via-red-400 to-red-500 p-4 rounded-md flex items-center justify-between">
        <h1 className="font-black">Total Books Out of stock: {TotalOutOfStock} </h1>
        <LuBookX className="text-white text-4xl" />
      </div>

      <div className="bg-gradient-to-l from-purple-300 via-purple-400 to-purple-500 p-4 rounded-md flex items-center justify-between">
        <h1 className="font-black">Total Books Borrowed: {TotalBookBorrowed} </h1>
        <GiBookmark className="text-white text-4xl" />
      </div>
      
    
    </div>
  );
};

export default default_1;
