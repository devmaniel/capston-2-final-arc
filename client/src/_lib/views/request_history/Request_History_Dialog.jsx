import React from "react";
const Request_History_Dialog = ({ userData, requestData, modalId }) => {
  return (
    <dialog id={modalId} className="modal backdrop-blur-lg">
      <div className="modal-box text-base-100 text-start bg-neutral">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost text-base-100 absolute right-2 top-2 bg-neutral">
            ✕
          </button>
        </form>
        <div className="">
          <h3 className="font-bold text-lg text-base-100 ">Request History</h3>
          <div className="border-b-2 my-2"></div>
          <div className="form my-4">
            <form className="text-base-100" style={{ zIndex: "1" }}>
              <div className="grid grid-cols-2 gap-5 text-base-100">
                <div className="w-full">
                  <label className="font-bold tracking-[1px] py-2 mb-2 text-[15px]">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userData.first_name}
                    className={`border rounded text-black w-full border-gray-400 my-2 px-2 `}
                  />
                </div>

                <div>
                  <label className="text-base-100 mb-2 text-[15px] font-bold tracking-[1px]">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userData.first_name}
                    readOnly
                    className={`border rounded w-full text-black border-gray-400 my-2 px-2 `}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <label className="font-bold tracking-[1px] text-[15px]">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  readOnly
                  className={`border text-black rounded border-gray-400 my-2 px-2 `}
                />
              </div>
              <div className="grid grid-cols-2 gap-5 text-black">
                <div>
                  <label className="font-bold  tracking-[1px] text-base-100 mb-2 text-[15px]">
                    Pick-up Date:
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    placeholder="Return Date"
                    value={
                      new Date(requestData.pickupdate)
                        .toISOString()
                        .split("T")[0]
                    }
                    disabled
                    className="border w-full rounded bg-white my-2 px-2"
                  />
                </div>

                <div>
                  <label className="text-base-100 mb-2 text-[15px] font-bold tracking-[1px]">
                    Return Date:
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    placeholder="Return Date"
                    value={
                      new Date(requestData.returndate)
                        .toISOString()
                        .split("T")[0]
                    }
                    disabled
                    className="border w-full rounded bg-white my-2 px-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <label className="font-bold tracking-[1px] text-[15px]">
                  Comment:
                </label>
                <textarea
                  name="comment"
                  className="text-black px-2 rounded border border-gray-400"
                  rows="4"
                  cols="50"
                  readOnly
                  value={requestData.student_comment}
                ></textarea>
              </div>
              <div className="my-4"></div>

              <div className="grid grid-cols-1">
                <label className="font-bold tracking-[1px] text-[15px]">
                 Staff Comment:
                </label>
                <textarea
                  name="comment"
                  className="text-black px-2 rounded border border-gray-400"
                  rows="4"
                  cols="50"
                  readOnly
                  value={requestData.admin_comment}
                ></textarea>
              </div>
              <div className="my-4"></div>
            </form>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
};

export default Request_History_Dialog;
