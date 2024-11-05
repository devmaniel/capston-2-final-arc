import { BsFillPersonPlusFill, BsFillPlusSquareFill, BsFillTrash3Fill, BsPencilSquare} from "react-icons/bs";

export default function BaseHistory({entry}) {
  return (
    <>
       
        
     
        

        <div className="border-b-white border-b-2 p-3 hover:bg-zinc-800 ">
          <a href="#" className="flex gap-2 items-center justify-between">
            <div>
              <p className="text-xl font-medium">{entry.Action} </p>
              <p className="text-sm italic">{entry.BookName}</p>
            </div>

           
          </a>
         
          
        </div>

    </>
  )
}
