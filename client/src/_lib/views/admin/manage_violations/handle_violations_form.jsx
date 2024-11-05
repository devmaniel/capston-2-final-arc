import React from 'react'

import { FiEdit } from "react-icons/fi";

const handle_violations_form = ({user_data}) => {
  return (
    <div className="bg-neutral rounded-md text-base-100 mb-5">
      <div className="border-base-100 p-5 border-b flex justify-between">
        <h1 className="font-black">View Profile</h1>
        <FiEdit className="text-2xl" />
      </div>

      <form className="p-5 leading-10 flex flex-col gap-3 text-base-100">
       
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-md font-semibold">Last Name:</h1>
            <input
              type="text"
              name="last_name"
              value={user_data.lastname}
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">First Name:</h1>
            <input
              type="text"
              name="first_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              value={user_data.firstname}
              readOnly
             
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Middle Name:</h1>
            <input
              type="text"
              name="middle_name"
              className="input bg-base-100 text-neutral rounded-md w-full"
              value={user_data.middlename}
              readOnly
             
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">(LRN):</h1>
            <input
              type="text"
              name="lrn"
              className="input bg-base-100 text-neutral rounded-md w-full"
              value={user_data.valid_lrn}
              readOnly
              
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Section:</h1>
            <input
              type="text"
              name="section_name"
              value={user_data.section}
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Year Level:</h1>
            <input
              type="text"
              name="yearlvl"
              value={user_data.year_level}
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Track:</h1>
            <input
              type="text"
              name="track_name"
              value={user_data.track}
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Role:</h1>
            <input
              type="text"
              name="role"
              value={user_data.role}
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Email:</h1>
            <input
              type="text"
              name="email"
              value={user_data.email}
              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Phone Number:</h1>
            <input
              type="text"
              name="phone_number"
              value={user_data.phone_number}

              className="input bg-base-100 text-neutral rounded-md w-full"
              readOnly
              
            />
          </div>

         

         
        </div>
      </form>
    </div>
  )
}

export default handle_violations_form
