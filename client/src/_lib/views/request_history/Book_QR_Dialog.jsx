import React from "react";

const Book_QR_Dialog = ({requestData, modalId}) => {
  return (
    <dialog id={modalId} className="modal backdrop-blur-lg">
      <div className="modal-box text-base-100 text-start bg-neutral">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-base-100 bg-neutral">
            ✕
          </button>
        </form>
        <div className="">
          <h3 className="font-bold text-lg text-base-100 ">Book QR</h3>
          <div className="border-b-2 my-2"></div>
          <div className="mx-auto flex items-center justify-center p-5">
            <img
              className="w-[80px] sm:w-[150px] rounded-lg shadow-lg md:w-[200px] h-[80px] sm:h-[150px] md:h-[200px] object-cover"
              src={`/QR Image/${requestData.book_img_qr}`}
            />
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
};

export default Book_QR_Dialog;
