import { Link } from "@tanstack/react-router";

import React from "react";

const TabPagination = ({ tablink }) => {
  return (
    <div role="tablist" className="tabs tabs-boxed w-1/2 rounded-sm">
      {tablink.map((link) => (
        <Link
          key={link.path}
          role="tab"
          activeOptions={{ exact: true }}
          {...(location.pathname === link.path
            ? { className: " tab tab-active" }
            : { className: " tab" })}
          to={link.path}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};
export default TabPagination;
