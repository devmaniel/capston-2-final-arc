import { BsFillPersonFill } from "react-icons/bs";

export default function TotalStudent({totalActive}) {
  return (
    <div className="flex items-center gap-5 ">
        <BsFillPersonFill className="text-5xl text-neutral bg-base-100 rounded-sm p-2" />
        <ul>
            <li>
            <h1 className="font-bold text-lg">Active Account:</h1>
            </li>
            <li>
                <h1 className="text-lg">{totalActive}</h1>
            </li>
        </ul>
    </div>
   
  )
}
