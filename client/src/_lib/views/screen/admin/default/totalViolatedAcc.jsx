import { BsFillPersonXFill } from "react-icons/bs";

export default function totalViolatedAcc({totalViolations}) {
  return (
    <div className="flex items-center gap-5 ">
        <BsFillPersonXFill className="text-5xl text-neutral bg-base-100 rounded-sm p-2" />
        <ul>
            <li>
            <h1 className="font-bold text-lg">Violated Account:</h1>
            </li>
            <li>
                <h1 className="text-lg">{totalViolations}</h1>
            </li>
        </ul>
    </div>
  )
}
