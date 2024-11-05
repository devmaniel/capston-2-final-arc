import { createFileRoute } from "@tanstack/react-router";
import Nav from "@_lib/views/screen/student/common/Nav";
import Footer from "../../_lib/views/screen/student/common/Footer";

export const Route = createFileRoute("/student/Spec_Events")({
  component: () => Spec_Events(),
});

export default function Spec_Events() {
  return (
    <>
      <div>
        <Nav />
        <div className="mb-10 relative w-full h-auto mx-auto max-w-full">
          <img
            src="/images/bbshsloc.JPG"
            className="h-[17rem] w-full object-cover"
            alt="Bagong Barrio Senior High School"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-y-0 left-8 flex items-center justify-center z-50 mx-auto">
            <div className="text-white px-4 tracking-[2px]">
              <h1 className="border-l-8 border-primary text-2xl font-extrabold bg-black bg-opacity-70 p-4   w-fit">
                Events at
              </h1>
              <h1 className="border-l-8 border-primary text-2xl font-extrabold bg-black bg-opacity-70 p-4   inline-block">
                Bagong Barrio Senior Highschool <br />
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1300px] h-auto p-5">
          <div className="mb-5">
            <h1 className="text-2xl md:text-3xl">Title</h1>
            <h2 className="text-sm text-gray-600">Posted: November 1, 2024</h2>
          </div>

          <div className="flex justify-center items-center mb-10">
            <img
              src="/images/bbshsloc.JPG"
              className="h-[300px] w-full object-cover rounded-md shadow-md md:h-[400px]"
            />
          </div>

          <div className="text-base md:text-lg border-b-2 border-t-2">
            <div className="mt-5">
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae ab dolore eveniet voluptatum vitae minima pariatur
                sequi corrupti aliquid repellat consequatur, eos nostrum placeat
                sit officia ullam veniam, quis harum?
              </p>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae ab dolore eveniet voluptatum vitae minima pariatur
                sequi corrupti aliquid repellat consequatur, eos nostrum placeat
                sit officia ullam veniam, quis harum?
              </p>

              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae ab dolore eveniet voluptatum vitae minima pariatur
                sequi corrupti aliquid repellat consequatur, eos nostrum placeat
                sit officia ullam veniam, quis harum?
              </p>

              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae ab dolore eveniet voluptatum vitae minima pariatur
                sequi corrupti aliquid repellat consequatur, eos nostrum placeat
                sit officia ullam veniam, quis harum?
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-auto mx-auto max-w-[1300px] mb-5 ">
          <div className="join mx-auto p-4 flex justify-center items-center">
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
          </div>
        </div>
        <div className="border-[3px] border-primary"></div>

        <Footer />
      </div>
    </>
  );
}
