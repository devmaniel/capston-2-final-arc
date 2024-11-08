import { BsBookFill } from "react-icons/bs";

import React from "react";

const totalBook = ({ totalBooks }) => {
  return (
    <>
      <ul className="flex justify-between  ">
        <h1 className="text-4xl p-3  bg-base-100 rounded-full">
          <BsBookFill className="text-neutral" />
        </h1>
        <a href="#" className="">
          ...
        </a>
      </ul>

      <div className="mt-10">
        <h1 className="text-2xl font-bold">Total Books:</h1>
        <h1 className="text-2xl font-bold">{totalBooks}</h1>
      </div>
    </>
  );
};

export default totalBook;
