export default function Contacts(){
    const alphabet:string = "A";
    const UserName:string = "Atharva"
     return(
        <div className="w-full flex justify-between ">
            <div className="flex justify-center gap-1">
            <div className="rounded-full bg-slate-300 h-14 w-14 flex justify-center mt-1 mr-2 ">
					<p className="flex flex-col justify-center h-full text-lg">{alphabet}</p>
				</div>
                <div className="mt-4">{UserName}</div>
            </div>
            <div className="mr-8">
                <div className=" w-40">
                    <button className=" mt-2 flex-wrap w-full bg-slate-800 flex justify-center items-center text-md text-white rounded-md h-full py-2">
                        Send Money
                    </button>
                </div>
            </div>
            
        </div>
    )
}