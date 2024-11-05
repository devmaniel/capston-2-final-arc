import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FcPrevious, FcNext } from "react-icons/fc";

import { Link } from "@tanstack/react-router";

const responsive = {
  superLarge: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  large: {
    breakpoint: { max: 3000, min: 124 },
    items: 6,
  },
  medium: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  small: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

export default function Booklist({ props, deviceType, booksList }) {
  console.log("Test", booksList[0]);

  return (
    <>
      <div className="container mx-auto my-10 mb-5 w-full max-w-[1310px] px-4 sm:px-6 lg:px-8">
        <p className="text-[18px] tracking-[1px] mb-2 sm:text-[20px] lg:text-[22px]">
          Similar to the books
        </p>
        <div className="border-b-2"></div>
      </div>

      <Carousel
        className="w-full mb-10 max-w-[1280px] mx-auto cursor-grab"
        swipeable={true}
        draggable={true}
        arrows={true}
        responsive={responsive}
        ssr={true}
        autoPlay={deviceType !== "mobile"}
        autoPlaySpeed={15000}
        keyBoardControl={true}
      >
        {booksList.map((book) => (
          <a
            href={`/student/catalog/book?bookId=${book.id}`}
            key={book.id}
            className="p-4 flex flex-col overflow-hidden"
          >
            <div className="w-full relative group flex justify-center items-center">
              <div>
                <img
                  src={"/Book Image/" + book.book_img_file}
                  alt={book.book_img_file}
                  className="object-cover h-[350px] mb-3 w-[250px] sm:mb-0 sm:h-[250px] md:mx-0 lg:mx-0 md:mb-0 lg:mb-0 md:h-[350px] lg:h-[250px] shadow-md transition-transform duration-200 hover:scale-105"
                />
                <div className="absolute inset-0 top-0 w-[250px] h-[350px] mx-[3.4em] sm:mx-0 md:h-full md:w-full sm:h-[250px] bg-white opacity-0 hover:opacity-50 transition-opacity duration-200"></div>
              </div>
              <div className="absolute inset-0 top-0 mx-[3.4em] sm:mx-0 bg-[#eab208e0] h-[32px] w-12 p-2">
                <p className="mx-1 tracking-[1px] text-[12px] text-white">
                  NEW
                </p>
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="mt-3 tracking-[1px] font-semibold truncate mb-2 text-center sm:text-left md:text-center lg:text-left text-[14px]">
                {book.name}
              </p>
            </div>
          </a>
        ))}
      </Carousel>

      <style jsx>{`
        .custom-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: black;
          font-size: 24px;
        }
        .custom-arrow:first-child {
          left: 20px;
        }
        .custom-arrow:last-child {
          right: 20px;
        }
      `}</style>
    </>
  );
}
