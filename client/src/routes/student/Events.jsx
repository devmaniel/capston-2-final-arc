import { createFileRoute } from "@tanstack/react-router";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../_lib/views/screen/student/common/Footer";
import { Link } from "@tanstack/react-router";

import auth from "../../_lib/api/auth";

export const Route = createFileRoute("/student/Events")({
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
  component: Events,
});

const Ganap = [
  {
    id: 1,
    img: "/images/doc.jfif",
    title:
      "Bagong Barrio Senior Higschool Congratulates Doc Neri For Passing the National Qualifying Exams for School Heads",
    description:
      "Congratulations Doc Neri on passing the NQESH! Your hard work and dedication have paid off, and we are excited for the amazing leadership you'll bring as a future school head!",
    date: "October 18, 2024",
  },
  {
    id: 2,
    img: "/images/don.jfif",
    title:
      "Donation of Cleaning Materials from Pandayan Bookstore to Bagong Barrio Senior High School ",
    description:
      " Bayanihan continues at Bagong Barrio Senior High School Thank you Pandayan Bookshop for donating these cleaning materials for our students.",
    date: "September 20, 2024",
  },
  {
    id: 3,
    img: "/images/op.jfif",
    title:
      "Announcement of Opening of Classes from Bagong Barrio Senior High School Confirmed.",
    description:
      "All incoming Grade 11 and Grade 12 students are invited to join the first Flag Ceremony tomorrow, July 29, 2024, as we commence School Year 2024-2025. Students are encouraged to arrive as early as 7:00AM.",
    date: "October 21, 2024",
  },
  {
    id: 2,
    img: "/images/paano.jfif",
    title:
      "Bagong Barrio Senior High School is Now Accepting Enrollees For S.Y. 2024-2025",
    description:
      " Magandang araw Bagong Barrio Senior High School! Narito ang mga detalye para sa enrolment ng mga mag-aaral para sa S.Y. 2024-2025 simula June 13,2024, 9:00 AM- 3:00 PM.",
    date: "October 21, 2024",
  },
  {
    id: 1,
    img: "/images/lpu.jfif",
    title:
      "Bagong Barrio Senior High School Celebrates the 2024 National Women’s Month",
    description:
      "The theme of this year's National Women's Month, “Lipunang Patas Sa Bagong Pilipinas: Kakayahan ng Kababaihan, Patutunayan!” emphasizes the importance of gender equality and the potential of women in our rapidly evolving nation.",
    date: "October 21, 2024",
  },
];

export default function Events() {
  return (
    <>
      <div>
        <Nav />
        <div className="mb-10 relative w-full h-auto mx-auto max-w-full">
          <img
            src="/images/even.jpg"
            className="h-[12rem] sm:h-[17rem] w-full object-cover"
            alt="Bagong Barrio Senior High School"
          />
          {/* <div className="absolute top-8 left-0 sm:left-8  flex items-center justify-center z-50 mx-auto">
            <div className="text-black  tracking-[2px]">
              <h1 className=" sm:text-4xl text-sm font-[900]   w-fit">
                Events at
              </h1>
              <h1 className=" sm:text-4xl text-sm font-[900]   inline-block">
                Bagong Barrio <br /> Senior  Highschool 
              </h1>
            </div>
          </div> */}
          <div className="absolute top-8 left-0 sm:left-4 flex items-center justify-center z-50 mx-auto">
            <div className="text-white px-4 tracking-[2px]">
              <h1 className="border-l-8 border-primary text-3xl font-extrabold bg-black bg-opacity-70 p-2   w-fit">
                Events at
              </h1>
              <h1 className="border-l-8 border-primary text-3xl font-extrabold bg-black bg-opacity-70 p-2   inline-block">
                Bagong Barrio ,1p 79lSenior Highschool
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full h-auto mx-auto max-w-[1300px] mb-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:p-1 mt-2 mb-5">
            {Ganap.map((data) => (
              <Link to="/student/Spec_Events" key={data.title}>
                <div className="relative  flex flex-col bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative w-full h-64 md:h-72 lg:h-[300px]">
                    <img
                      src={data.img}
                      alt={data.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                    <h1 className="absolute top-4 left-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                      BBSHS Events
                    </h1>
                  </div>

                  {/* Text Section */}
                  <div className="flex-grow p-4">
                    <h1 className="text-primary font-bold text-lg mb-2 line-clamp-2">
                      {data.title}
                    </h1>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {data.description}
                    </p>
                  </div>

                  {/* Date Section */}
                  <div className="px-4 py-2 text-sm font-semibold text-gray-800 border-t mt-3">
                    <p>{data.date}</p>
                  </div>

                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-5 transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>

          <div className="join mx-auto p-4 flex justify-center items-center">
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
          </div>
        </div>
        <div>
          <Footer className="" />
        </div>
      </div>
    </>
  );
}
