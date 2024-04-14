import Verified from "../assets/icons/verified_FILL1_wght400_GRAD200_opsz24.svg"
import Receipt from "../assets/icons/receipt_long_FILL0_wght400_GRAD0_opsz24.svg"
import { useSearchParams } from "react-router-dom"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import Dashboard from "./dashboard"

export default function SuccessMsg(){
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const amount = params.get('amount');
    const to = params.get('to');
    const note = params.get('note');
    const time = params.get('time');

    return(
        <section className="flex justify-center items-center min-h-screen bg-gray-300">
		<div className="bg-white flex shadow px-8 py-8 rounded-[20px] flex-col justify-center mx-auto items-center gap-2 ">
            <div className="flex min-w-full items-center gap-2 flex-nowrap">
            <img
            src={Verified}
            height={50}
            width={50}
            >
            </img>
           <div className=" flex flex-col items-start text-3xl font-bold text-black">Transaction Successful<p className=" m-0 text-sm text-gray-800">{time}</p></div>
            </div>
            <img
            src={Receipt}
            height={30}
            width={30}
            >
            </img>
            <div className="flex flex-col items-start w-full font-courier font-medium gap-1 text-xl text-slate-600">
                <div className="w-full">Paid To: 
                <div className="flex justify-between">
                <div className="flex justify-start">
                    <div className="rounded-full bg-green-500 h-14 w-14 flex justify-center items-center mt-2 mr-1 ">
					<p className="flex justify-center items-center h-full text-xl text-white">{to?.charAt(0).toUpperCase()}</p>
			        </div>
                    <p className="mt-5 ml-2">{to}</p>
                </div>
                <p className="text-xl mr-2 mt-5">₹{amount}</p>
                </div>
                
                </div>
                <div className="mt-2">Message: {note} </div>
            </div>
            <div className="flex justify-between gap-2 w-full">
                <Button text={'Send Again'} onClick={()=>{navigate(`/Send?name=${to}`)}} isDisabled={false} />
                <Button text={"Dashboard"} onClick={()=>{navigate('/Dashboard')}} isDisabled={false} />
            </div>
        </div>
        </section>
    
    )
}