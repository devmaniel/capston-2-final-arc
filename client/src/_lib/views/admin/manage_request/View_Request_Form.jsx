import { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { IoIosInformationCircle } from "react-icons/io";

const View_Request_Form = ({
  data,
  postForm,
  handleInputChange,
  handleSubmit,
}) => {
  const [prematureStatus, setPrematureStatus] = useState(postForm.status);

  // Handle premature status change
  const handlePrematureStatus = (e) => {
    const { value } = e.target;
    setPrematureStatus(value);
  };

  // Generate options based on current status
  const renderStatusOptions = () => {
    switch (postForm.status) {
      case "pending":
        return (
          <>
            <option value="pending">Pending</option>
            <option value="accepted">Accept</option>
            <option value="rejected">Reject</option>
          </>
        );
      case "accepted":
        return (
          <>
            <option value="accepted">Accepted</option>
            <option value="borrowed">Borrow</option>
            <option value="cancelled">Cancel</option>
          </>
        );
      case "borrowed":
        return (
          <>
            <option value="borrowed">Borrowed</option>
            <option value="returned">Return</option>
            <option value="violated-lost">Violate - Lost/Didn’t Return</option>
            <option value="violated-damages">Violate - Book Damages</option>
          </>
        );
        case "returned":
          return (
            <>
              <option value="returned">Return</option>
              <option value="completed">Complete</option>
              <option value="violated-lost">Violate - Lost/Didn’t Return</option>
              <option value="violated-damages">Violate - Book Damages</option>
            </>
          );
      case "cancelled":
        return (
          <>
            <option value="cancelled">User Cancelled</option>
          </>
        );
      case "violated-lost":
        return (
          <>
            <option value="violated-lost" disabled>Violate - Lost/Didn’t Return</option>
          </>
        );
      case "violated-damages":
        return (
          <>
            <option value="violated-damages" disabled>Violate - Book Damages</option>
          </>
        );

      default:
        // Fallback options if needed
        return (
          <>
            <option value="pending">Pending</option>
            <option value="accepted">Accept</option>
            <option value="borrowed">Borrow</option>
            <option value="rejected">Reject</option>
            <option value="returned">Return</option>
            <option value="cancelled">User Cancelled</option>
            <option value="completed">Complete</option>
            <option value="violated-lost">Violate - Lost/Didn’t Return</option>
            <option value="violated-damages">Violate - Book Damages</option>
          </>
        );
    }
  };

  return (
    <div className="bg-neutral rounded-md text-base-100 mb-5 w-full">
      <div className="border-base-100 p-5 border-b items-center flex justify-between">
        <h1 className="font-black">View Request Form</h1>
        <IoIosInformationCircle className="text-xl" />
      </div>

      <form
        className="p-5 leading-10 flex flex-col gap-3 text-base-100"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission

          // Update postForm.status only on form submit
          postForm.status = prematureStatus;
          handleSubmit();
        }}
      >
        <h1 className="text-xl font-semibold uppercase">
          Requester Information
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-md font-semibold">Requester Code:</h1>
            <input
              type="text"
              value={data.request.requestCode}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Authorizer:</h1>
            <input
              type="text"
              value={data.request.authorizer}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Requester LRN:</h1>
            <input
              type="text"
              value={data.lrn.validLrn}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Requester Name:</h1>
            <input
              type="text"
              value={data.user.lastName + " " + data.user.firstName}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Requester Email:</h1>
            <input
              type="email"
              value={data.user.email}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Requester Phone Number:</h1>
            <input
              type="text"
              value={data.user.phoneNumber}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Requester Track:</h1>
            <input
              type="text"
              value={data.lrn.track}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Requester Section:</h1>
            <input
              type="text"
              value={data.lrn.section}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Requested Book:</h1>
            <input
              type="text"
              value={data.book.bookName}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Requested Book Quantity:</h1>
            <input
              type="numer"
              value={data.book.bookQuantity}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Number of Request:</h1>
            <input
              type="number"
              value={data.request.bookQty}
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Date of Borrowed:</h1>
            <input
              type="date"
              value={
                new Date(data.request.pickupDate).toISOString().split("T")[0]
              } // Extracting only the date part
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          <div>
            <h1 className="text-md font-semibold">Date of Returned:</h1>
            <input
              type="date"
              value={
                new Date(data.request.returnDate).toISOString().split("T")[0]
              } // Extracting only the date part
              readOnly
              className="input bg-base-100 text-neutral rounded-md w-full"
            />
          </div>

          {/* Adjusted textareas */}
          <div className="col-span-2 w-full">
            <h1 className="text-md font-semibold">Student Comment:</h1>
            <textarea
              value={data?.request?.studentComment || ""} // Ensure a default empty string if the value is undefined
              readOnly
              className="textarea textarea-bordered  text-neutral textarea-lg w-full"
            ></textarea>
          </div>

          <hr className="col-span-2 border-base-100 w-full" />
          <h1 className="text-xl font-semibold uppercase">Admin Information</h1>

          <div className="col-span-2">
            <h1 className="text-md font-semibold">Request Status:</h1>

            {/* Conditionally render the status options */}
            <select
              name="status"
              value={prematureStatus} // Use prematureStatus for selection
              onChange={handlePrematureStatus} // Change prematureStatus on select
              className="input bg-base-100 text-neutral rounded-md w-full"
            >
              {renderStatusOptions()}
            </select>
          </div>

          <div className="col-span-2 w-full">
            <h1 className="text-md font-semibold">Staff Comment:</h1>
            <textarea
              name="adminComment" // Match the state field
              value={postForm.adminComment}
              onChange={handleInputChange} // Handle comment change
              placeholder="Enter staff's comment"
              className="textarea text-neutral textarea-bordered textarea-lg w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-primary text-white col-span-2 rounded-md text-xl p-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default View_Request_Form;
