import React from "react";

import { GiBookCover } from "react-icons/gi";

const Request_Screens = ({ requestData }) => {
  return (
    <div className=" h-[550px] w-[800px] mt-5 m-auto  flex overflow-hidden  text-base-100">
      <div className="flex flex-col gap-5 w-[400px] bg-gray-900 rounded-t-lg  rounded-b-lg p-5 text-white ">
        <h1 className="flex items-center gap-2 font-black">
          {" "}
          <GiBookCover className="text-3xl" />{" "}
          <span className="text-xl"> Book Informations</span>
        </h1>

        <img
          src={`/Book Image/${requestData.book.book_img_file}`}
          alt=""
          className="h-72 w-72 rounded-sm"
        />

        <div className="flex gap-4 flex-col">
          <div>
            <span className="font-bold text-sm">Book Name: </span>{" "}
            {requestData.book.book_name}
          </div>
          <div>
            <span className="font-bold text-sm">Book Author: </span>{" "}
            {requestData.book.book_author}
          </div>

          <div>
            <span className="font-bold text-sm">Classifications: </span>
            {requestData.book.classifications}
          </div>
        </div>
      </div>

      <div className=" w-[400px]  bg-white p-6 pt-10 border-2 rounded-tr-lg  rounded-br-lg border-gray-900 rounded-md">
        <div className=" h-[450px] rounded-md w-[350px] flex flex-col gap-2">
          <h2 className="text-sm text-black ">Student Information</h2>

          <label className="input input-bordered bg-white border border-black flex items-center gap-2 text-black">
            Code:
            <input
              type="text"
              className="grow rounded-none"
              value={requestData.request.request_code}
              readOnly
            />
          </label>

          <label className="input input-bordered bg-white border border-black flex items-center gap-2 text-black">
            Name:
            <input
              type="text"
              className="grow rounded-none"
              value={
                requestData.user.last_name + " " + requestData.user.first_name
              }
              readOnly
            />
          </label>

          <label className="input input-bordered bg-white border border-black flex items-center gap-2 text-black">
            Email:
            <input
              type="mail"
              className="grow rounded-none"
              value={requestData.user.email}
              readOnly
            />
          </label>

          <label className="input input-bordered bg-white border border-black flex items-center gap-2 text-black">
            Date pickup:
            <input
              type="date"
              className="grow rounded-none"
              value={
                requestData.request.pickupdate
                  ? new Date(requestData.request.pickupdate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              } // Format the date directly
              readOnly
            />
          </label>

          <label className="input input-bordered bg-white border border-black flex items-center gap-2 text-black">
            Return pickup:
            <input
              type="date"
              className="grow rounded-none"
              placeholder="DD/MM/YY"
              value={
                requestData.request.returndate
                  ? new Date(requestData.request.returndate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              readOnly
            />
          </label>

          <textarea
            className="textarea  bg-white border-black text-black focus:border-black border"
            placeholder="Student Comment"
            value={"Student Comment: " + requestData.request.student_comment}
            readOnly
          ></textarea>

          <textarea
            className="textarea  bg-white border-black text-black focus:border-black border"
            placeholder="Admin Comment"
            value={"Admin Comment: " + requestData.request.admin_comment || " "}
            readOnly
          ></textarea>

          <label className="input input-bordered border-2 input-secondary flex items-center gap-2 text-black bg-white">
            Status:
            <input
              type="text"
              className="grow rounded-none "
              placeholder="Borrowed "
              value={ requestData.request.status }
              readOnly
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Request_Screens;
