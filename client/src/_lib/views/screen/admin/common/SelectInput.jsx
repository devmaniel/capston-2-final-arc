import React from "react";
import { MdFilterAlt } from "react-icons/md";

const SelectInput = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
          <span className="label-text-alt">
            <MdFilterAlt />
          </span>
        </div>
        <select
          className="select select-bordered"
          value={value}       // Correctly using value prop
          onChange={onChange} // Correctly using onChange prop
        >
          <option disabled value="">
            |---- SELECT ----|
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};


export default SelectInput;
