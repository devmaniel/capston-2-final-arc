import {
  BsFillPersonPlusFill,
  BsFillPlusSquareFill,
  BsFillTrash3Fill,
  BsPencilSquare,
} from "react-icons/bs";
import { format } from "date-fns";

export default function BaseHistory({ entry }) {
  const formattedDate = format(new Date(entry.Date), "PPP");

  return (
    <>
      <div className="border-b-white   hover:bg-zinc-800 ">
        <div className="">
          <div className="border-b-2 mb-2">
            <p className="text-xl font-medium">Book Added</p>
            <div className="flex justify-between w-full pt-2 mb-1">
              <p className="text-lg italic font-bold">{entry.BookName}</p>
              <p className="text-sm italic">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
