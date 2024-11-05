const Request_Step_Dialog = ({ requestData, modalId }) => {
  // Define the normal, rejected, and cancelled steps
  const normalSteps = [
    "pending",
    "accepted",
    "borrowed",
    "returned",
    "completed",
  ];
  const rejectedSteps = [
    "pending",
    "rejected",
    "borrowed",
    "returned",
    "completed",
  ];
  const cancelledSteps = [
    "pending",
    "cancelled",
    "borrowed",
    "returned",
    "completed",
  ];

  // Determine the current status
  const isViolated = requestData.startsWith("violated");
  const isRejected = requestData === "rejected";
  const isCancelled = requestData === "cancelled";

  // Choose the steps based on the status
  const steps = isViolated
    ? normalSteps
    : isRejected
      ? rejectedSteps
      : isCancelled
        ? cancelledSteps
        : normalSteps;

  // Function to get the label for each step
  const getStepLabel = (step) => {
    if (step === "returned") {
      return "Returned (Book inspection)";
    }
    return step.charAt(0).toUpperCase() + step.slice(1); // Capitalize first letter
  };

  // Function to determine the class for each step
  const getStepClass = (step) => {
    const currentIndex = steps.indexOf(requestData.toLowerCase());
    const stepIndex = steps.indexOf(step);

    // If the status is violated, apply step-error to all steps
    if (isViolated) {
      return "step step-error";
    }

    // For rejected or cancelled statuses, apply step-error only to "pending" and "rejected/cancelled"
    if (isRejected || isCancelled) {
      if (step === "pending" || step === "rejected" || step === "cancelled") {
        return "step step-error"; // Apply step-error for "pending" and the respective rejection status
      }
      return "step"; // Other steps should render normally
    }

    // Always assign step-primary to "returned" if the status is "completed" or beyond
    if (step === "returned") {
      return currentIndex >= steps.indexOf("returned")
        ? "step step-primary"
        : "step";
    }

    // Apply primary class for current or past steps
    if (stepIndex === currentIndex || stepIndex < currentIndex) {
      return "step step-primary";
    }

    // Default class for future steps
    return "step";
  };

  // Function to get the final step label
  const getFinalStepLabel = () => {
    if (requestData === "violated-damages") {
      return "Book Damaged";
    } else if (requestData === "violated-lost") {
      return "Lost or Not Returned";
    }
    return "Completed";
  };

  return (
    <dialog id={modalId} className="modal backdrop-blur-lg">
      <div className="modal-box text-base-100 text-start bg-neutral">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-100 bg-neutral">
            ✕
          </button>
        </form>
        <div className="">
          <h3 className="font-bold text-lg text-base-100">Request Status</h3>
          <div className="border-b-2 my-2 mb-10"></div>
          <div className="mx-auto text-center mb-5">
            <ul className="steps mx-auto">
              {steps.slice(0, -1).map((step, index) => (
                <li key={index} className={getStepClass(step)}>
                  {getStepLabel(step)} {/* Use getStepLabel for correct labeling */}
                </li>
              ))}
              <li className={getStepClass(steps[steps.length - 1])}>
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

export default Request_Step_Dialog;
