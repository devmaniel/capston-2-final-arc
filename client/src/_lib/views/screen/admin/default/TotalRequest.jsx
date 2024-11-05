import { BsReceiptCutoff } from "react-icons/bs";
export default function TotalBooks({totalActive}) {
  return (
    <>
        <ul className="flex justify-between ">
            
            <h1 className="text-4xl p-3 bg-base-100 rounded-full"><BsReceiptCutoff className="text-neutral" /></h1>
            <a href="#" className="">...</a>
        </ul>

        <div className="mt-10">
         
            <h1 className="text-2xl font-bold">Total Request:</h1>
            <h1 className="text-2xl font-bold">{totalActive}</h1>
        </div>
    </>
  )
}
