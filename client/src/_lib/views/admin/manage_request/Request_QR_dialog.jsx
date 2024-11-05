import React from "react";

const Request_QR_dialog = ({url, dialogId}) => {
  return (
    <dialog id={dialogId} className="modal backdrop-blur-lg">
      <div className="modal-box text-base-100 text-start bg-neutral">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black bg-neutral">
            ✕
          </button>
        </form>
        <div className="">
          <h3 className="font-bold text-lg text-base-100">Request QR</h3>
          <div className="border-b-2 my-2"></div>
          <div className="mx-auto flex items-center justify-center p-5">
            {url === "pending" ? (
              <h1 className="text-xl font-thin">The request is still pending. ( NO QR )</h1>
            ) : (
              <img
                className="w-[80px] sm:w-[150px] rounded-lg shadow-lg md:w-[200px] h-[80px] sm:h-[150px] md:h-[200px] object-cover"
                src={`/QR Image/${url}`}
                alt="QR Code"
              />
            )}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
};

export default Request_QR_dialog;