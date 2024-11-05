import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";

export const Route = createFileRoute("/test/getImage")({
  component: () => GetImage(),
});

import { useAxiosFetchImage } from "../../_lib/hook/axiosFetchwithImage";

function GetImage() {
  const { imageUrl, loading, error } = useAxiosFetchImage("/getImage");

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Fetched image" />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}
