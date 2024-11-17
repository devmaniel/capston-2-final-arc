import { BsReceiptCutoff } from "react-icons/bs";
export default function TotalBooks({totalActive}) {
  return (
    <>
        <ul className="flex justify-between text-base-100">
            
            <h1 className="text-4xl p-3 bg-gray-100 rounded-full"><BsReceiptCutoff className="text-primary" /></h1>
            <p className="text-sm font-bold">All</p>
        </ul>

        <div className="mt-10 text-base-100">
         
            <h1 className="text-2xl font-bold">Total Request:</h1>
            <h1 className="text-xl font-bold">{totalActive}</h1>
        </div>
    </>
  )
}
