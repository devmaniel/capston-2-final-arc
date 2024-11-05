import React from "react";

const StudentToast = () => {
    return (
      <div className="toast" style={{ position: "absolute", top: "10px", right: "-10px", zIndex: 9999 }}>
        <div className="alert alert-info">
          <span>New message arrived.</span>
        </div>
      </div>
    );
  };
  

export default StudentToast;
