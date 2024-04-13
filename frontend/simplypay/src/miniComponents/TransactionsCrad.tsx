import ArrowOut from "../assets/icons/arrow_outward_FILL0_wght400_GRAD0_opsz24.svg"

export default function TransactionCard({transaction,send,recieve}){
    const Username = transaction.to;
    const alphabet = transaction.to.charAt(0).toUpperCase();
    const amount:number = transaction.amount;
    const note:string = transaction.note;
    return(
        <div className="min-w-full flex justify-between shadow rounded-lg m-10 ">
            <div className="flex justify-center gap-1 items-center ml-7">
            <div className="rounded-full bg-slate-300 h-14 w-14 flex justify-center mt-1 mr-2 ">
					<p className="flex flex-col justify-center h-full text-lg m-0">{alphabet}</p>
				</div>
                <div className=" text-lg font-bold">{Username}</div>
            </div>
            <div>
               {
                
               }
            </div>
        </div>
    )
}