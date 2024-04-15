import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms/currentUser";

export default function TransactionCard({transaction,send,recieve}){
    const [user,setUser] = useRecoilState(currentUser);
    console.log(`transaction from ${transaction.from}`)
    console.log(`user is ${user}`);
    const Username = transaction.to;
    const alphabet = transaction.to.charAt(0).toUpperCase();
    const amount:number = transaction.amount;
    const note:string = transaction.note;

    return(
        <div className="flex justify-between shadow rounded-lg m-10 mr-20 ">
            <div className="flex flex-col items=start gap-1">
            <div className="flex justify-center gap-1 items-center ml-7">
            <div className="rounded-full bg-slate-300 h-14 w-14 flex justify-center mt-1 mr-2 ">
					<p className="flex flex-col justify-center h-full text-lg m-0">{alphabet}</p>
				</div>
                <div className=" text-lg font-bold mx-auto">{Username}</div>
            </div>
            <div className="flex justify-end items-end ml-10 w-full">
                <p className="font-medium text-slate-700 ">Amount :${amount}</p>
            </div>
            <div className="flex justify-end items-end ml-10 w-full">
                <p className="font-medium text-slate-700 ">Note :{note}</p>
            </div>  
            </div>
            <div>
               {
                    transaction.from == user ? (
                        <div className="flex justify-start items-start m-5">
                            <img
                        src={send}
                        height={30}
                        width={30}
                        ></img>
                        </div>
                    ) : (
                        <div className="flex justify-start items-start m-5">
                            <img
                        src={recieve}
                        height={30}
                        width={30}
                        ></img>
                        </div>
                    )
               }
            </div>
        
        </div>
    )
}