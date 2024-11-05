import { BsExclamation } from "react-icons/bs";

export default function SiteStatus() {
  return (
    <div className="text-center bg-yellow-500 text-black p-2 ">
      <p className="flex justify-center gap-2">
        <span className="text-[16px]">
          <span className="font-bold mx-2 bg-yellow-700 px-2 py-0 rounded-[50%]">
            !
          </span>{" "}
          Libraries are open between 8:00am to 2:00pm Philippine time.
        </span>
      </p>
    </div>
  );
}
