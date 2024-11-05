import React from "react";

const Request_status_dialog = ({ steps, dialogId }) => {
  // Define the normal steps
  const normalSteps = ["pending", "accepted", "borrowed", "returned", "completed"];
  const violatedSteps = ["pending", "accepted", "borrowed", "returned", "violated"];

  // Initialize the step list based on the status
  let stepList = [...normalSteps];

  // Check if "cancelled" or "rejected" are in the steps
  const hasCancelled = steps.includes("cancelled");
  const hasRejected = steps.includes("rejected");

  // Modify the steps list if both "cancelled" and "rejected" are present
  if (hasCancelled && hasRejected) {
    stepList = ["pending", "cancelled/reject", "borrowed", "returned", "completed"];
  } else if (hasCancelled) {
    stepList = ["pending", "cancelled", "borrowed", "returned", "completed"];
  } else if (hasRejected) {
    stepList = ["pending", "rejected", "borrowed", "returned", "completed"];
  }

  // Determine if the status is violated
  const isViolated = steps.startsWith("violated");

  // Choose the steps based on whether it's violated
  stepList = isViolated ? violatedSteps : stepList;

  // Function to get the label for each step
  const getStepLabel = (step) => {
    if (step === "cancelled") {
      return "User Cancelled"; // Display "User Cancelled" for cancelled status
    }
    if (step === "cancelled/reject") {
      return "Cancelled/Reject"; // Custom label for combined cancelled/reject status
    }
    if (step === "returned") {
      return "Returned (Book inspection)";
    }
    return step.charAt(0).toUpperCase() + step.slice(1); // Capitalize first letter
  };

  // Function to determine the class for each step
  const getStepClass = (step) => {
    const currentIndex = stepList.indexOf(steps.toLowerCase());
    const stepIndex = stepList.indexOf(step);
  
    // If the status is violated, apply step-error to all steps
    if (isViolated) {
      return "step step-error";
    }
  
    // If the step is pending, cancelled, or rejected, apply step-error class
    if (step === "pending" || step === "cancelled" || step === "rejected") {
      return "step step-error";
    }
  
    // Apply primary class for current or past steps
    if (stepIndex <= currentIndex) {
      return "step step-success"; // Change to step-success for normal flow
    }
  
    // Default class for future steps
    return "step";
  };

  // Function to get the final step label
  const getFinalStepLabel = () => {
    if (steps === "violated-damages") {
      return "Book Damaged";
    } else if (steps === "violated-lost") {
      return "Lost or Not Returned";
    }
    return "Completed";
  };

  return (
    <dialog id={dialogId} className="modal backdrop-blur-lg">
      <div className="modal-box text-base-100 text-start bg-neutral">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black bg-neutral">
            ✕
          </button>
        </form>
        <div className="">
          <h3 className="font-bold text-lg text-base-100">Request Status</h3>
          <div className="border-b-2 my-2 mb-10"></div>
          <div className="mx-auto text-center mb-5">
            <ul className="steps mx-auto">
              {stepList.slice(0, -1).map((step, index) => (
                <li key={index} className={getStepClass(step)}>
                  {getStepLabel(step)} {/* Use getStepLabel for correct labeling */}
                </li>
              ))}
              <li className={getStepClass(stepList[stepList.length - 1])}>
                {getFinalStepLabel()}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
};

export default Request_status_dialog;
