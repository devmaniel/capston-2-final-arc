import { BsBookFill } from "react-icons/bs";

import React from "react";

const totalBook = ({ totalBooks }) => {
  return (
    <>
      <ul className="flex justify-between  ">
        <h1 className="text-4xl p-3  bg-gray-100 rounded-full">
          <BsBookFill className="text-primary" />
        </h1>
        <p className="text-sm font-bold">All</p>
      </ul>

      <div className="mt-10 ">
        <h1 className="text-2xl font-bold">Total Books:</h1>
        <h1 className="text-xl font-bold">{totalBooks}</h1>
      </div>
    </>
  );
};

export default totalBook;
