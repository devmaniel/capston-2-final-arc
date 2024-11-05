import { createFileRoute } from "@tanstack/react-router";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../_lib/views/screen/student/common/Footer";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/student/Events")({
  component: Events,
});

const Ganap = [
  {
    id: 1,
    img: "/images/akopogi.jpg",
    title:
      "Preserving Voices, Saving Histories: Meet Lisa Nguyen, CLIR Grantee Spotlight",
    description:
      "By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical",
    date: "October 21, 2024",
  },
  {
    id: 2,
    img: "/images/akopogi.jpg",
    title:
      "Preserving Voices, Saving Histories: Meet Lisa Nguyen, CLIR Grantee Spotlight",
    description:
      " By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical",
    date: "October 21, 2024",
  },
  {
    id: 3,
    img: "/images/logo.png",
    title:
      "Preserving Voices, Saving Histories: Meet Lisa Nguyen, CLIR Grantee Spotlight",
    description:
      "By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical",
    date: "October 21, 2024",
  },
  {
    id: 2,
    img: "/images/bbshsloc.JPG",
    title:
      "Preserving Voices, Saving Histories: Meet Lisa Nguyen, CLIR Grantee Spotlight",
    description:
      " By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical",
    date: "October 21, 2024",
  },
  {
    id: 1,
    img: "/images/akopogi.jpg",
    title:
      "Preserving Voices, Saving Histories: Meet Lisa Nguyen, CLIR Grantee Spotlight",
    description:
      "By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical",
    date: "October 21, 2024",
  },
  {
    id: 2,
    img: "/images/bbshsloc.JPG",
    title:
      "Preserving Voices, Saving Histories: Meet Lisa Nguyen, CLIR Grantee Spotlight",
    description:
      " By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical",
    date: "October 21, 2024",
  },
  {
    id: 2,
    img: "/images/bbshsloc.JPG",
    title:
      "Preserving Voices, Saving Histories: Meet Lisa Nguyen, CLIR Grantee Spotlight",
    description:
      " By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical",
    date: "October 21, 2024",
  },
  {
    id: 1,
    img: "/images/akopogi.jpg",
    title:
      "Preserving Voices, Saving Histories: Meet Lisa Nguyen, CLIR Grantee Spotlight",
    description:
      "By William Carter As society continues its march into the digital era, the need to preserve historical records and make them accessible to the public is more critical",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:p-1 mt-2 mb-5  ">
            {Ganap.map((data) => (
              <>
                <Link to="/student/Spec_Events">
                  <div className="relative p-7 sm:p-0 sm:gap-6">
                    <div
                      key={data.title}
                      className="flex flex-col w-full bg-white hover:shadow-lg transition duration-300 "
                    >
                      <div className="relative w-full overflow-hidden h-auto md:h-72 lg:h-auto ">
                        <img
                          src={data.img}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          alt={data.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                        <h1 className="absolute top-5 left-5 bg-gradient-to-r from-sky-500 to-sky-600 tracking-[1px] w-fit px-2 py-1 font-bold text-[12px] text-white rounded-full">
                          BBSHS Events
                        </h1>
                      </div>

                      <div className="p-5 border-b-2 flex-grow text-[#333333]">
                        <h1 className="text-primary font-bold text-[18px] mb-1 line-clamp-3">
                          {data.title}
                        </h1>
                        <p className="text-[14px] my-2 line-clamp-5">
                          {data.description}
                        </p>
                      </div>

                      <div className="px-5 py-2 text-[#333333]">
                        <p className="text-[12px] font-bold">{data.date}</p>
                      </div>
                      <div className="absolute bg-white opacity-0 hover:opacity-5 hover:duration-300 transition w-full h-full"></div>
                    </div>
                  </div>
                </Link>
              </>
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
