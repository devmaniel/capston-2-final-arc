import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";

export const Route = createFileRoute("/student/termsOfuse/Terms")({
  component: Terms,
});

export default function Terms() {
  return (
    <>
      <Nav />
      <div className="w-full max-w-[1300px] mx-auto">
        <div className="p-4">
          <div>
            <h1 className="font-bold tracking-wide text-2xl mb-2">
              Our Terms & Condition
            </h1>
            <p className="text-sm my-1 mb-1 text-gray-600">
              Quick answers to questions you may have. Can't find what you're
              looking for?
            </p>
            <div className="border-b-2 mt-2"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
