import React from 'react'

const Change_Account_Dialog = () => {
  return (
    <dialog id="my_modal_change_acc" className="modal backdrop-blur-lg">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Change Account Information</h3>
      <p className="text-[12px] my-1 text-gray-500">
        Update your Account information associated with your library records.
      </p>

      <form className="text-black my-2 gap-10 w-full">
        <div className="mb-10 gap-6">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name:</span>
            </div>
            <input
              type="text"
              placeholder="student"
              value={"student"}
              className="input input-bordered w-full bg-white"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="student"
              value={"student"}
              className="input input-bordered w-full bg-white"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Middle name</span>
            </div>
            <input
              type="text"
              placeholder="N/A"
              value={"N/A"}
              className="input input-bordered w-full bg-white"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Track</span>
            </div>
            <input
              type="text"
              placeholder="ICT"
              value={"ICT"}
              className="input input-bordered w-full bg-white"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Section</span>
            </div>
            <input
              type="text"
              placeholder="IT-401"
              value={"IT-401"}
              className="input input-bordered w-full bg-white"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">(LRN)</span>
            </div>
            <input
              type="text"
              placeholder="LRN12xxxxxxxxxx"
              value={"LRN12xxxxxxxxxx"}
              className="input input-bordered w-full bg-white"
            />
          </label>


          <div className="my-10 mb-10 flex justify-center sm:justify-end">
            <button className="btn btn-wide bg-primary text-white">
              Save Changes
            </button>
          </div>
        </div>
      </form>

      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-sm  btn-circle btn-ghost text-base-100 absolute right-5 top-5 bg-neutral">
            ✕
          </button>
        </form>
      </div>
    </div>
  </dialog>
  )
}

export default Change_Account_Dialog
