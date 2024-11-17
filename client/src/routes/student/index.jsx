import React, { useState, useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { FaRegBookmark } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { Link } from "@tanstack/react-router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// Common components
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../_lib/views/screen/student/common/Footer";
import { useTypewriter, Cursor } from "react-simple-typewriter";

// authentication api
import auth from "../../_lib/api/auth";

export const Route = createFileRoute("/student/")({
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
  component: () => index(),
});

const title = [
  {
    recent: "Frequently Asked Questions",
    topBooks: "Top Books",
    bago: "New!",
  },
];

const Events = [
  {
    id: 1,
    img: "/images/natio.jpg",
    title:
      "Bagong Barrio Senior High School lauds the dedication and passion of our Teachers and Celebrating the National Teachers Day. ",
    description:
      "Your unwavering commitment in shaping young minds and building a brighter future is truly inspiring. Thank you for your hard work, sacrifice,and heart to serve the next generation!",
    date: "September 5, 2024",
  },
  {
    id: 2,
    img: "/images/res.jpg",
    title:
      "National Disaster Resilience Month 2024 Theme: “Bantayog ng Katatagan at Pagbuklod sa Layuning Kahandaan",
    description:
      "This is in observance of the 36th National Disaster Resilience Month (NDRM), anchored on the theme “Bantayog ng Katatagan at ang Pagbubuklod sa Layuning Kahandaan",
    date: "July 19, 2024",
  },
  {
    id: 3,
    img: "/images/nutrition.jpg",
    title:
      "Brigada Eskwela ‘24 has been kicking off with theme of “Bayanihan para sa MATATAG na Paraalan”",
    description:
      "Bagong Barrio Senior High School invites students, and parents to join in the annual preparations for the opening of School Year 2024-2025 through Brigada Eskwela 2024",
    date: "July 22, 2024",
  },
];

const Slides = [
  {
    slides: 1,
    img: "https://i.pinimg.com/564x/06/64/c2/0664c206f7cea81adca5d5b6189714d9.jpg",
    title: "",
    date: "August 8, 2024",
  },
  {
    slides: 1,
    img: "https://i.pinimg.com/564x/10/49/e8/1049e8a2eb952be88ea770c311a8e769.jpg",
    title: "The Great Alone",
    date: "August 8, 2024",
  },
  {
    slides: 1,
    img: "https://i.pinimg.com/564x/f7/6b/9c/f76b9c6ba2b9a427114a1bbe2d2f885e.jpg",
    title: "National Distaster Resilience",
    date: "August 8, 2024",
  },
  {
    slides: 1,
    img: "https://i.pinimg.com/564x/b3/a9/34/b3a9344e5723429692084a8a6569b834.jpg",
    title: "Nutrition Month",
    date: "August 8, 2024",
  },
];

export default function index() {
  const images = [
    "/images/ba.jpg",
    "/images/bbshsloc.JPG",
    "/images/location.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const responsive = {
    superLarge: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    large: {
      breakpoint: { max: 3000, min: 1280 },
      items: 4,
    },
    medyo: {
      breakpoint: { max: 1279, min: 1024 },
      items: 3,
    },
    medium: {
      breakpoint: { max: 1023, min: 768 },
      items: 2,
    },
    small: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  const responsivee = {
    superLarge: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    large: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    medium: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    small: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };
  const [text] = useTypewriter({
    words: ["User! Welcome to Bagong Barrior Senior High School Library"],
    loop: true, // or loop: false depending on your needs
  });
  return (
    <>
      <Nav />
      <div
        className="relative mx-auto w-full h-[100vh] sm:h-[700px] bg-cover  rounded-b-[30px] sm:rounded-b-[100px] bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-black rounded-b-[30px] sm:rounded-b-[100px] opacity-65"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10 mx-auto w-full mt-[-70px]">
          <div className="flex flex-col lg:flex-row items-center justify-center w-[80%] max-w-[1300px] px-4">
            <img
              src="/images/logo.png"
              className="animate-slidein opacity-0 my-10 h-[200px] mb-4 sm:h-[250px] md:h-[250px] lg:h-[280px] rounded-full bg-white shadow-lg transition-transform transform hover:scale-105"
              alt="Bagong Barrio Senior Highschool Library"
              loading="lazy"
              style={{ animationDelay: "300ms" }}
            />
            <div className="text-center lg:text-center mx-auto text-white p-6 rounded-lg shadow-lg">
              <h1
                className=" text-[24px] font-extrabold sm:text-[34px] md:text-[40px] lg:text-[42px] xl:text-[47px] tracking-[2px] uppercase drop-shadow-xl leading-tight"
                style={{ animationDelay: "500ms" }}
              >
                Hello,
                <span className="mx-1">{text}</span>
                <Cursor />
              </h1>
              <blockquote
                className="animate-slidein opacity-0 mt-4 italic text-[14px] sm:text-[18px] lg:text-[16px] text-gray-200"
                style={{ animationDelay: "700ms" }}
              >
                "A library is not just a place to read, but a space to grow." –
                Anonymous
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  mx-auto max-w-[1300px] mb-5 my-5 text-black">
        <div className="text-center">
          <h1 className="font-bold tracking-[1px] text-red-600 text-lg md:text-xl">
            STAY UP TO DATE
          </h1>
          <h1 className="font-bold text-xl md:text-2xl tracking-[1px] my-2 text-neutral">
            The Latest Events
          </h1>
        </div>
        <div className="relative gap-5 mx-auto items-center w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {Events.map((data) => (
            <div
              className="bg-white  shadow-md relative flex flex-col h-[auto] w-full rounded-md hover:shadow-lg transition duration-500"
              key={data.id}
            >
              <div className="h-[240px] w-full rounded-t bg-no-repeat bg-center relative">
                <img
                  src={data.img}
                  className="h-full w-full object-cover rounded-t"
                />
                <div className="absolute top-0 left-0 bg-gradient-to-t from-black to-transparent opacity-50 w-full h-full rounded-t"></div>
                <h1 className="absolute top-5 left-5 bg-gradient-to-r from-sky-500 to-sky-600 tracking-[1px] w-fit px-2 py-1 font-bold text-xs text-white rounded-full">
                  BBSHS Events
                </h1>
              </div>
              <div className="flex-grow p-5 border-b-2">
                <h1 className="text-primary font-bold text-lg line-clamp-2">
                  {data.title}
                </h1>
                <p className="text-sm my-2 line-clamp-3">{data.description}</p>
              </div>
              <div className="px-5 py-2">
                <p className="text-sm font-bold">{data.date}</p>
              </div>
              <div className="absolute bg-white opacity-0 hover:opacity-5 hover:duration-300 transition w-full h-full"></div>
            </div>
          ))}
        </div>
        <div className="mx-auto text-center text-white my-3 mb-5 font-bold tracking-[1px]">
          <Link to="Events">
            <button className="bg-gradient-to-r from-sky-500 to-sky-600 p-3 text-sm md:text-base">
              Read More Events
            </button>
          </Link>
        </div>
      </div>

      <div
        className="no-repeat w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), 
             url('https://img.freepik.com/free-photo/abundant-collection-antique-books-wooden-shelves-generated-by-ai_188544-29660.jpg?t=st=1722880134~exp=1722883734~hmac=53d8e23ab8981eec3ee6dfd0828d0324fb4c4ee30e69c058edd39a19d129d4c1&w=826')`,
          backgroundAttachment: "fixed",
          padding: "2.5rem",
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto h-[500px] text-white">
          <div className="w-full h-32">
            <div className="p-4">
              <h1 className="text-2xl font-medium tracking-[1px] text-center sm:text-left">
                Library Events
              </h1>
            </div>
            <Carousel
              responsive={responsive}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              className="p-4"
            >
              {Slides.map((info) => (
                <div
                  key={info.id}
                  className="card flex-shrink-0 w-[300px] bg-gradient-to-r  shadow-lg from-[#0567BB] via-[#0676D0] to-[#0785E5] h-[380px] rounded-lg"
                >
                  <div className="img relative">
                    <img
                      src={info.img}
                      className="h-[380px] w-full rounded-lg "
                      alt={info.title}
                    />
                    <div className="absolute inset-0 bottom-[88%] flex justify-between items-center ml-4 pr-8">
                      <div className="bg-red-600 text-white bg-opacity-95 shadow px-2 py-1 flex items-center font-bold text-xs rounded">
                        Come and Join Us!
                      </div>
                      <div className="bg-red-600 w-10 h-12 shadow flex flex-col-reverse p-2 text-center font-bold text-white rounded-b-full">
                        <img
                          src="../images/logo.png"
                          className="h-8 w-10 rounded-full mx-auto bg-white"
                          alt="Logo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" absolute inset-x-0 bottom-8 p-5 text-black bg-[#FAF9F6] h-[100px] w-[85%] rounded-br-lg rounded-tr-lg">
                    <div>
                      <h3 className="font-bold pb-1">Book Fair</h3>
                      <div className="border-b-2"></div>
                      <p className="truncate text-gray-500 text-sm my-1">
                        October 22-25, 2024
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xs">
                          Have a nice year...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto mb-10 px-4">
        <div className="p-5 border-b-2 ">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-center  border-gainsboro">
            Location
          </h1>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-3 gap-10 w-full p-5 mx-auto">
          <div className="mx-auto lg:mx-0">
            <h1 className="font-bold text-center mb-5 text-lg">
              BBSHS Library Location
            </h1>
            <div>
              <img
                src="../images/bbshsloc.JPG"
                className="h-40 w-full md:h-64 lg:h-64 rounded my-2 object-cover shadow-lg"
                alt="Library"
              />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.932403921949!2d120.9959452741336!3d14.659777475627031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b69aad9ef6d5%3A0xd94462a46518155!2sBagong%20Barrio%20Senior%20High%20School!5e0!3m2!1sen!2sph!4v1722963530082!5m2!1sen!2sph"
                className="w-full h-64 md:h-80 lg:h-96 my-6 border-0 shadow"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map Location"
              />
              <div className="flex flex-col gap-5 my-5 text-center sm:text-left">
                <div className="flex items-center mx-auto sm:mx-0 font-bold">
                  <CiLocationOn className="text-lg md:text-xl" />
                  <p className="mx-1 my-3 text-sm md:text-base">Location</p>
                </div>
                <p className="text-sm md:text-base">
                  Bagong Barrio Senior High School, MX5X+WC2, Tirad pass cor, De
                  Jesus, Bagong Barrio West, Caloocan, 1400 Kalakhang Maynila
                </p>
                <div className="border-[.1rem] border-gainsboro"></div>
                <div className="flex items-center font-bold mx-auto sm:mx-0">
                  <IoCallOutline className="text-lg md:text-xl " />
                  <p className="mx-1 my-3 text-sm md:text-base">Telephone</p>
                </div>
                <p className="text-sm md:text-base">+63 2144-242-233</p>
              </div>
            </div>
          </div>
          <div className=" w-full mx-0 sm:mx-5">
            <h1 className="text-center font-bold mb-5 text-lg items-center ">
              BBSHS Social Media
            </h1>
            <div>
              <img
                src="/images/bbshs.png"
                className="h-48 w-[100%] md:h-64 lg:h-64 rounded my-2 items-center object-cover shadow-lg"
                alt="BBSHS Social Media"
              />
            </div>
            <p className="text-center my-5 text-sm md:text-base">
              "Follow us on Facebook and other platforms for the latest
              updates."
            </p>
          </div>
          <div className="mx-auto lg:mx-0 w-full">
            <h1 className="text-center font-bold mb-3 text-lg">
              Library Services
            </h1>
            <Carousel
              responsive={responsivee}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              className=" p-4 sm:p-0"
            >
              {Slides.map((info) => (
                <div
                  key={info.id}
                  className="card flex-shrink-0 mx-auto w-[300px] bg-gradient-to-r shadow-lg from-[#0567BB] via-[#0676D0] to-[#0785E5] h-[380px] rounded-lg"
                >
                  <div className="img relative">
                    <img
                      src={info.img}
                      className="h-[380px] w-full rounded-lg"
                      alt={info.title}
                    />
                    <div className="absolute inset-0 bottom-[88%] flex justify-between items-center ml-4 pr-8">
                      <div className="bg-red-600 text-white bg-opacity-95 shadow px-2 py-1 flex items-center font-bold text-xs rounded">
                        Come and Join Us!
                      </div>
                      <div className="bg-red-600 w-10 h-12 shadow flex flex-col-reverse p-2 text-center font-bold text-white rounded-b-full">
                        <img
                          src="../images/logo.png"
                          className="h-8 w-10 rounded-full mx-auto bg-white"
                          alt="Logo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-8 p-5 text-black bg-[#FAF9F6] h-[100px] w-[85%] rounded-br-lg rounded-tr-lg">
                    <div>
                      <h3 className="font-bold pb-1">Book Fair</h3>
                      <div className="border-b-2"></div>
                      <p className="truncate text-gray-500 text-sm my-1">
                        October 22-25, 2024
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xs">
                          Have a nice year...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="border-b-2"></div>
      </div>

      <Footer className="my-10" />
    </>
  );
}
