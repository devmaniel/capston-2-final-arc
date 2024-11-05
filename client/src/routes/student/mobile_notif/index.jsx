import { createFileRoute } from "@tanstack/react-router";
import Nav from "@_lib/views/screen/student/common/Nav";
import { BsThreeDots } from "react-icons/bs";

export const Route = createFileRoute("/student/mobile_notif/")({
  component: () => index(),
});

export default function index() {
  return (
    <>
      <div>
        <Nav />
        <div className="w-full max-w-[1300px] mx-auto ">
          <div className="p-5">
            <div className="flex items-center justify-between ">
              <h1 className="font-bold">Notifications</h1>
              <BsThreeDots />
            </div>
            <ul className=" flex py-3 text-[12px] mx-3">
              <li>All</li>
              <li className="mx-2">Unread</li>
            </ul>
            <div>
              <h1 className="text-[12px]">New</h1>
            </div>
            <div className="notif my-2 text-black">
              <div className="bg-white w-[auto] h-auto rounded shadow-sm">
                <div className="flex mb-3 p-2 ">
                  <img
                    src="/images/logo.png"
                    className="h-12 object-cover bg-white rounded-[50%]"
                  />
                  <div className="my-2 mx-4  overflow-hidden">
                    <div className="flex text-black">
                      <h1 className="text-[12px] font-bold">BBSHS</h1>
                      <h1 className="text-[12px] mx-1 truncate ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque perferendis error nostrum vitae amet sunt
                        cupiditate laboriosam fugiat mollitia rerum blanditiis
                        porro architecto, quia deserunt quasi ea, provident
                        veniam. Libero.
                      </h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-[12px] text-primary">1h ago</h1>
                      <BsThreeDots />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-[12px]">Earlier</h1>
            </div>
            <div className="notif my-2">
              <div className="bg-white w-[auto] h-auto rounded shadow-sm">
                <div className="flex mb-3 p-2 ">
                  <img
                    src="/images/logo.png"
                    className="h-12 object-cover bg-white rounded-[50%]"
                  />
                  <div className="my-2 mx-4  overflow-hidden">
                    <div className="flex text-black">
                      <h1 className="text-[12px] font-bold">BBSHS</h1>
                      <h1 className="text-[12px] mx-1 truncate ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque perferendis error nostrum vitae amet sunt
                        cupiditate laboriosam fugiat mollitia rerum blanditiis
                        porro architecto, quia deserunt quasi ea, provident
                        veniam. Libero.
                      </h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-[12px] text-primary">1h ago</h1>
                      <BsThreeDots />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notif my-2">
              <div className="bg-white w-[auto] h-auto rounded shadow-sm">
                <div className="flex mb-3 p-2 ">
                  <img
                    src="/images/logo.png"
                    className="h-12 object-cover bg-white rounded-[50%]"
                  />
                  <div className="my-2 mx-4  overflow-hidden">
                    <div className="flex text-black">
                      <h1 className="text-[12px] font-bold">BBSHS</h1>
                      <h1 className="text-[12px] mx-1 truncate ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque perferendis error nostrum vitae amet sunt
                        cupiditate laboriosam fugiat mollitia rerum blanditiis
                        porro architecto, quia deserunt quasi ea, provident
                        veniam. Libero.
                      </h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-[12px] text-primary">1h ago</h1>
                      <BsThreeDots />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notif my-2">
              <div className="bg-white w-[auto] h-auto rounded shadow-sm">
                <div className="flex mb-3 p-2 ">
                  <img
                    src="/images/logo.png"
                    className="h-12 object-cover bg-white rounded-[50%]"
                  />
                  <div className="my-2 mx-4  overflow-hidden">
                    <div className="flex text-black">
                      <h1 className="text-[12px] font-bold">BBSHS</h1>
                      <h1 className="text-[12px] mx-1 truncate ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque perferendis error nostrum vitae amet sunt
                        cupiditate laboriosam fugiat mollitia rerum blanditiis
                        porro architecto, quia deserunt quasi ea, provident
                        veniam. Libero.
                      </h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-[12px] text-primary">1h ago</h1>
                      <BsThreeDots />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white w-[auto] h-auto rounded shadow-sm">
                <div className="flex mb-3 p-2 ">
                  <img
                    src="/images/logo.png"
                    className="h-12 object-cover bg-white rounded-[50%]"
                  />
                  <div className="my-2 mx-4  overflow-hidden">
                    <div className="flex text-black">
                      <h1 className="text-[12px] font-bold">BBSHS</h1>
                      <h1 className="text-[12px] mx-1 truncate ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque perferendis error nostrum vitae amet sunt
                        cupiditate laboriosam fugiat mollitia rerum blanditiis
                        porro architecto, quia deserunt quasi ea, provident
                        veniam. Libero.
                      </h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-[12px] text-primary">1h ago</h1>
                      <BsThreeDots />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white w-[auto] h-auto rounded shadow-sm">
                <div className="flex mb-3 p-2 ">
                  <img
                    src="/images/logo.png"
                    className="h-12 object-cover bg-white rounded-[50%]"
                  />
                  <div className="my-2 mx-4  overflow-hidden">
                    <div className="flex text-black">
                      <h1 className="text-[12px] font-bold">BBSHS</h1>
                      <h1 className="text-[12px] mx-1 truncate ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque perferendis error nostrum vitae amet sunt
                        cupiditate laboriosam fugiat mollitia rerum blanditiis
                        porro architecto, quia deserunt quasi ea, provident
                        veniam. Libero.
                      </h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-[12px] text-primary">1h ago</h1>
                      <BsThreeDots />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="text-white bg-primary p-2 w-full rounded shadow-md">
                See Previous Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
