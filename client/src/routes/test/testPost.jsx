import { createFileRoute } from "@tanstack/react-router";
import axios from '../../_lib/api/axios';
import { useState } from "react";

export const Route = createFileRoute("/test/testPost")({
  component: () => TestPost(),
});

function TestPost() {
  let [file, setFile] = useState();

  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/postimage", formData)
      .then((res) => {})
      .err((err) => console.log(err));
  };

  return (
    <div className="test">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="button" onClick={upload}>Upload</button>
    </div>
  );
}
