import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";
import { FaArrowDown } from "react-icons/fa6";


// authentication api
import auth from "../../../_lib/api/auth";

export const Route = createFileRoute("/student/frequentlyAsk/FAQ")({
  beforeLoad: async () => {
    const role = "student";
    const authResult = await auth(role);
    
    if (authResult.success) {
      if (authResult.role !== role) {
        console.log(
          `Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`
        );
        throw redirect({
          to: authResult.role === "student" ? "/student" : "/login",
        });
      }
      // Proceed if session is valid and roles match
      return {};
    } else {
      switch (authResult.reason) {
        case "session_not_found":
        case "invalid_session":
        case "expired_session":
          console.log(`Error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
        case "pending_violations":
          console.log(
            "User has pending violations. Redirecting to /violations_page"
          );
          throw redirect({ to: "/violations_page" });
        case "role_mismatch":
          console.log(
            `Role mismatch. Redirecting to: ${role === "admin" ? "/student" : "/admin"}`
          );
          throw redirect({ to: role === "admin" ? "/student" : "/admin" });
        case "unenrolled":
          console.log("User is no longer enrolled. Redirecting to /noLonger");
          throw redirect({ to: "/noLonger" });
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }
  },
  component: FAQ,
});

const Question = [
  {
    id: 1,
    quest: "How do I borrow a book?",
    ans: "You can borrow a book by visiting the library and checking it out at the front desk.",
  },
  {
    id: 2,
    quest: "What is the borrowing period?",
    ans: "Books can be borrowed for a period of 2 weeks, with the option to renew.",
  },
  {
    id: 3,
    quest: "Can I return books late?",
    ans: "Yes, but there may be late fees applied for overdue books.",
  },
  {
    id: 4,
    quest: "How do I reserve a book?",
    ans: "You can reserve a book through our online catalog or at the library.",
  },
  {
    id: 5,
    quest: "What if I forget my library card?",
    ans: "You can still borrow books by providing a valid ID. We recommend bringing your library card next time.",
  },
  {
    id: 6,
    quest: "Are e-books available for borrowing?",
    ans: "Yes, we offer a selection of e-books that you can borrow through our digital platform.",
  },
  {
    id: 7,
    quest: "Can I suggest a book for the library?",
    ans: "Absolutely! We welcome suggestions from our patrons. Please fill out a suggestion form at the library.",
  },
  {
    id: 8,
    quest: "Is there a limit to how many books I can borrow?",
    ans: "Yes, you can borrow up to 5 books at a time, but this may vary by library policy.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Nav />
      <div className="w-full max-w-[1300px] mx-auto mb-10">
        <div className="h-auto p-4">
          <div className="">
            <h1 className="font-bold tracking-wide text-2xl mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-sm my-1 mb-1 text-gray-600">
              Quick answers to questions you may have. Can't find what you're
              looking for?
            </p>
            <div className="border-b-2 mt-2"></div>
          </div>
          <div className="grid grid-cols-1 w-full ">
            {Question.map((data, index) => (
              <>
                <div key={data.id} onClick={() => toggleAnswer(index)}>
                  <div className="p-4 flex justify-between items-center mt-5 hover:opacity-80 transition duration-300 delay-100 rounded-t-lg border-l-8 border-primary shadow bg-white cursor-pointer">
                    <div className="z-50">
                      <h2 className="text-primary font-bold text-xl">
                        {data.quest}
                      </h2>
                    </div>
                    <div className="border-2 rounded-full p-2">
                      <FaArrowDown
                        className={`text-[22px] ${activeIndex === index ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {activeIndex === index && (
                    <div className="bg-[#F2F2F2] p-5 rounded-b-xl shadow">
                      <p className="text-sm text-gray-500  ">{data.ans}</p>
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
