import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
const Paginations = ({ totalPages, handlePage, handleFilter }) => {
  const navigate = useNavigate();

  return (
    <div className="join justify-center flex mt-5">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className="join-item btn"
          onClick={() => handlePage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginations;
