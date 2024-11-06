import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";

export const Route = createFileRoute("/student/privacy/Privacy")({
  component: Privacy,
});

export default function Privacy() {
  return (
    <>
      <Nav />
      <div className="w-full max-w-[1300px] mx-auto mb-10">
        <div className="p-4">
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="About our policy"
            />
            <div role="tabpanel" className="tab-content p-10">
              <div className="grid grid-cols-2">
                <div>
                  <img src="/images/logo.png" />
                </div>
                <div>qweqwe</div>
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Tab 2"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content p-10">
              Tab content 2
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Tab 3"
            />
            <div role="tabpanel" className="tab-content p-10">
              Tab content 3
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
