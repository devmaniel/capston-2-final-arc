import { BsBookFill } from "react-icons/bs";
import { Link, useMatch, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export default function About() {
  const [selected, setSelected] = useState("requestBooks");

  const handleSelect = (topic) => {
    setSelected(topic);
  };

  return (
    <>
      <div className="w-full h-[auto] bg-gradient-to-tl from-[#003C6C] to-[#0476D0] shadow-2xl text-white rounded-b-[50px] sm:rounded-b-full md:rounded-b-[50px] lg:rounded-b-full text-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wide text-white">
          About Page
        </h1>
        <p className="w-full max-w-2xl mt-4 mx-auto text-sm sm:text-base md:text-lg lg:text-lg">
          Welcome to the About Page, where you'll discover the rich history of
          our school, from its founding to its key milestones and achievements.
          Here, you can learn about our mission, which drives our commitment to
          delivering quality education, as well as our vision for the future,
          aiming to inspire and shape the next generation. Additionally, we
          highlight our core values, which serve as the foundation of our
          institution, fostering a supportive and inclusive learning environment
          for all.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row p-4 w-full max-w-[1253px] mx-auto mt-[40px] md:mt-[80px] mb-[100px] lg:mb-[150px] border-b border-zinc-500 pb-10">
        <AboutNav onSelect={handleSelect} selected={selected} />
        <div className="w-full lg:w-[2px] ml-0 lg:ml-5 mr-0 lg:mr-5 h-[2px] lg:h-[100%] rounded-sm bg-zinc-400 my-5 lg:my-0"></div>
        <AboutContent selected={selected} />
      </div>
    </>
  );
}

function AboutNav({ onSelect, selected }) {
  const getButtonClassName = (topic) => {
    return `uppercase h-auto font-medium tracking-wide text-left ${
      selected === topic
        ? "bg-primary text-base-100"
        : "bg-neutral text-base-100"
    } text-sm md:text-lg w-full p-3 md:p-5 border-b border-base-100`;
  };

  return (
    <div className="w-full p-4 lg:w-[350px] xl:w-[700px] about-nav rounded-lg border border-base-100 overflow-hidden">
      <button
        className={getButtonClassName("about")}
        onClick={() => onSelect("about")}
      >
        About Bagong Barrio Senior High School
      </button>
      <button
        className={getButtonClassName("vision")}
        onClick={() => onSelect("vision")}
      >
        School Vision, Mission, & Goals
      </button>

      <button
        className={getButtonClassName("requestBooks")}
        onClick={() => onSelect("requestBooks")}
      >
        Learn how to request books
      </button>
      <button
        className={getButtonClassName("returnBooks")}
        onClick={() => onSelect("returnBooks")}
      >
        Learn how to return books
      </button>
      <button
        className={getButtonClassName("bookPolicy")}
        onClick={() => onSelect("bookPolicy")}
      >
        Book Policy
      </button>
      <button
        className={getButtonClassName("violations")}
        onClick={() => onSelect("violations")}
      >
        Violations
      </button>
    </div>
  );
}

function AboutContent({ selected }) {
  switch (selected) {
    case "about":
      return (
        <div className="content w-full h-full p-5">
          <div className="content-desc">
            <h1 className="text-2xl sm:text-3xl md:text-4xl pb-5 text-center">
              About Bagong Barrior Senior High School
            </h1>
            <div className="w-full h-[1px] bg-zinc-400"></div>
          </div>
          <p className="px-5 mt-5 text-sm sm:text-base">
            At Bagong Barrio Senior High School, we are more than just an
            institution; we are a family that celebrates learning, growth, and
            community. We prioritize a holistic education that includes academic
            excellence, character-building, and active community involvement.
            Together, as students, parents, and educators, we are committed to
            making Bagong Barrio Senior High School a place where every
            student`s journey is valued and every voice is heard.
          </p>
          <p className="px-5 mt-5 text-sm sm:text-base">
            At Bagong Barrio Senior High School, we believe in nurturing the
            unique potential of each student. Through innovative teaching
            methods, extracurricular activities, and a supportive environment,
            we empower our learners to become critical thinkers, compassionate
            leaders, and responsible citizens. Our strong partnerships with
            parents and the community help create a collaborative atmosphere
            where students are encouraged to pursue their passions, overcome
            challenges, and contribute positively to society. Here, every
            student's success is our shared goal, and together, we build a
            brighter future for all.
          </p>
        </div>
      );
    case "vision":
      return (
        <div className="content w-full h-full p-5">
          <div className="content-desc">
            <h1 className="text-2xl sm:text-3xl md:text-4xl pb-5 text-center">
              School Vision, Mission, & Goals
            </h1>
            <div className="w-full h-[1px] bg-zinc-400"></div>
          </div>

          <p className="px-5 mt-5 text-sm flex flex-col sm:text-base">
            <span className="font-bold text-xl">Vision </span> To be a
            collaborative learning space that empowers students to become
            proficient in digital literacy, research, and critical thinking,
            fostering a productive and supportive environment that enhances
            their academic and personal growth.
          </p>

          <p className="px-5 mt-5 text-sm flex flex-col sm:text-base">
            <span className="font-bold text-xl">Mission </span> Develop
            essential digital and research skills, promote reading
            comprehension, and support the academic success of all students. We
            aim to collaborate with teachers to integrate the library into
            lessons and activities, creating a dynamic space where students can
            engage in research, digital learning, and productive collaboration.
          </p>
          <p className="px-5 mt-5 text-sm flex flex-col sm:text-base">
            <span className="font-bold text-xl">Mission </span>
            <li>Improve Reading and Research Skills</li>
            <p className="mx-8 text-[12px]">
              Strengthen reading comprehension and research skills through
              targeted programs and resources.
            </p>
            <li>Enhance Teacher Collaboration</li>
            <p className="mx-8 text-[12px]">
              Work with teachers to integrate library resources into their
              lessons.
            </p>
            <li>Foster Collaboration</li>
            <p className="mx-8 text-[12px]">
              Create spaces and programs that encourage student teamwork and
              productivity.
            </p>
          </p>
        </div>
      );

    case "requestBooks":
      return (
        <div className="content w-full h-full p-5">
          <div className="content-desc">
            <h1 className="text-2xl sm:text-3xl md:text-4xl pb-5 text-center">
              Learn how to request books
            </h1>
            <div className="w-full h-[1px] bg-zinc-400"></div>

            <ul className="steps step-class steps-vertical lg:steps-horizontal w-full md:w-[700px] mt-10">
              <li className="step step-info cursor-pointer">
                Pick a specific book
              </li>
              <li className="step step-info">Click Book Request</li>
              <li className="step step-info">Status Pending</li>
              <li className="step step-info">Status Accepted</li>
              <li className="step step-info">Status Borrowed</li>
              <li className="step step-info">SMS/MAIL Notifications</li>
            </ul>
          </div>

          <p className="px-5 mt-5 text-sm flex flex-col sm:text-base">
            <span className="font-bold text-md">
              Step 1 Pick a specific Books:{" "}
            </span>{" "}
            <p className="text-[14px]">
              Start by selecting the book you want to borrow from the library.
            </p>
          </p>
          <p className="px-5  text-sm flex flex-col sm:text-base">
            <span className="font-bold text-md">
              Step 2 Click Book Request:{" "}
            </span>
            <p className="text-[14px]">
              Submit your request by clicking the "Request" button for the
              chosen book.
            </p>
          </p>
          <p className="px-5  text-sm flex flex-col sm:text-base">
            <span className="font-bold text-md">Step 3 Status Pending: </span>
            <p className="text-[14px]">
              Your request is under review; please wait while it's being
              processed.
            </p>
          </p>
          <p className="px-5  text-sm flex flex-col sm:text-base">
            <span className="font-bold text-md">Step 4 Status Accepted: </span>
            <p className="text-[14px]">
              Your book request has been approved and is ready for the next
              steps.
            </p>
          </p>
          <p className="px-5  text-sm flex flex-col sm:text-base">
            <span className="font-bold text-md">Step 5 Status Borrowed: </span>
            <p className="text-[14px]">
              The book is now issued to you, and you can enjoy reading it.
            </p>
          </p>
          <p className="px-5  text-sm flex flex-col sm:text-base">
            <span className="font-bold text-md">
              Step 6 SMS/MAIL Notifications:{" "}
            </span>
            <p className="text-[14px]">
              You will receive a confirmation notification via SMS or email with
              all the details.
            </p>
          </p>
        </div>
      );
    case "returnBooks":
      return (
        <div className="content w-full h-full p-5">
          <div className="content-desc">
            <h1 className="text-2xl sm:text-3xl md:text-4xl pb-5 text-center">
              Learn how to return Books
            </h1>
            <div className="w-full h-[1px] bg-zinc-400"></div>

            <ul className="steps step-class steps-vertical lg:steps-horizontal w-full md:w-[700px] mt-10">
              <li className="step step-info cursor-pointer">
                Pick a specific book
              </li>
              <li className="step step-info">Click Book Request</li>
              <li className="step step-info">Status Pending</li>
              <li className="step step-info">Status Accepted</li>
              <li className="step step-info">Status Borrowed</li>
              <li className="step step-info">SMS/MAIL Notifications</li>
            </ul>
          </div>

          <p className="px-5 mt-5 text-sm sm:text-base">
            <span className="font-bold">Step 1: </span> Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Cumque voluptatibus quos dolorem
            reiciendis. Tenetur, facilis unde temporibus, exercitationem
            similique doloribus magnam sapiente, repellat soluta voluptas sit
            explicabo delectus? Corporis quia porro omnis voluptatibus esse.
          </p>

          <p className="px-5 mt-10 text-sm sm:text-base">
            <span className="font-bold">Reminders: </span> Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Cumque voluptatibus quos dolorem
            reiciendis. Tenetur, facilis unde temporibus, exercitationem
            similique doloribus magnam sapiente, repellat soluta voluptas sit
            explicabo delectus? Corporis quia porro omnis voluptatibus esse.
          </p>
        </div>
      );
    case "bookPolicy":
      return (
        <div className="content w-full h-full p-5">
          <div className="content-desc">
            <h1 className="text-2xl sm:text-3xl md:text-4xl pb-5 text-center">
              Book Policy
            </h1>
            <div className="w-full h-[1px] bg-zinc-400"></div>
          </div>

          <div className="my-5">
            <img src="../images/policy.jfif" className="rounded-md shadow-sm" />
          </div>
        </div>
      );
    case "violations":
      return (
        <div className="content w-full h-full p-5">
          <div className="content-desc">
            <h1 className="text-2xl sm:text-3xl md:text-4xl pb-5 text-center">
              Violations
            </h1>
            <div className="w-full h-[1px] bg-zinc-400"></div>

            <ul className="steps step-class steps-vertical lg:steps-horizontal w-full md:w-[700px] mt-10">
              <li className="step step-info cursor-pointer">
                Pick a specific book
              </li>
              <li className="step step-info">Click Book Request</li>
              <li className="step step-info">Status Pending</li>
              <li className="step step-info">Status Accepted</li>
              <li className="step step-info">Status Borrowed</li>
              <li className="step step-info">SMS/MAIL Notifications</li>
            </ul>
          </div>

          <p className="px-5 mt-5 text-sm sm:text-base">
            <span className="font-bold">Step 1: </span> Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Cumque voluptatibus quos dolorem
            reiciendis. Tenetur, facilis unde temporibus, exercitationem
            similique doloribus magnam sapiente, repellat soluta voluptas sit
            explicabo delectus? Corporis quia porro omnis voluptatibus esse.
          </p>

          <p className="px-5 mt-10 text-sm sm:text-base">
            <span className="font-bold">Reminders: </span> Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Cumque voluptatibus quos dolorem
            reiciendis. Tenetur, facilis unde temporibus, exercitationem
            similique doloribus magnam sapiente, repellat soluta voluptas sit
            explicabo delectus? Corporis quia porro omnis voluptatibus esse.
          </p>
        </div>
      );
    default:
      return (
        <div className="content w-full h-full p-5">
          <div className="content-desc">
            <h1 className="text-2xl sm:text-3xl md:text-4xl pb-5 text-center">
              About Bagong Barrior Senior High School
            </h1>
            <div className="w-full h-[1px] bg-zinc-400"></div>

            <ul className="steps step-class steps-vertical lg:steps-horizontal w-full md:w-[700px] mt-10">
              <li className="step step-info cursor-pointer">
                Pick a specific book
              </li>
              <li className="step step-info">Click Book Request</li>
              <li className="step step-info">Status Pending</li>
              <li className="step step-info">Status Accepted</li>
              <li className="step step-info">Status Borrowed</li>
              <li className="step step-info">SMS/MAIL Notifications</li>
            </ul>
          </div>

          <p className="px-5 mt-5 text-sm sm:text-base">
            <span className="font-bold">Step 1: </span> Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Cumque voluptatibus quos dolorem
            reiciendis. Tenetur, facilis unde temporibus, exercitationem
            similique doloribus magnam sapiente, repellat soluta voluptas sit
            explicabo delectus? Corporis quia porro omnis voluptatibus esse.
          </p>

          <p className="px-5 mt-10 text-sm sm:text-base">
            <span className="font-bold">Reminders: </span> Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Cumque voluptatibus quos dolorem
            reiciendis. Tenetur, facilis unde temporibus, exercitationem
            similique doloribus magnam sapiente, repellat soluta voluptas sit
            explicabo delectus? Corporis quia porro omnis voluptatibus esse.
          </p>
        </div>
      );
  }
}
