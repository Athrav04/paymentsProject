import { useSearchParams } from "react-router-dom";


export default function Contacts({user,onClick,toTransactions}){

    const alphabet = user.username.charAt(0).toUpperCase();
    const Username = user.username;
    
     return(
        <div className="w-full flex justify-between shadow mt-1">
            <div className="flex justify-center gap-1 items-center ml-7">
            <div className="rounded-full bg-slate-300 h-14 w-14 flex justify-center mt-1 mr-2 ">
					<p className="flex flex-col justify-center h-full text-lg m-0">{alphabet}</p>
				</div>
                <div className=" text-lg font-bold">{Username}</div>
            </div>
            <div className="w-40">
                    <button className=" mt-2 flex-wrap w-full bg-slate-800 flex justify-center items-center text-md text-white rounded-md py-2" onClick={onClick}>
                        Send Money
                    </button>
                </div>
            
        </div>
    )
}