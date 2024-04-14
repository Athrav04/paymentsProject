import { useSearchParams , useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Send({user}){
	

	const [isDisable,setisDisable] = useState(false);
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const hasParams = search.has('name');
	if(!hasParams){
		navigate('/Dashboard');
	}
	const [Amount,setAmount] = useState("");
	const [note,setNote] = useState("");


	const alphabet:string = search.get('name')?.charAt(0).toUpperCase()
	const Username:string = search.get('name');
	async function handleClick(){
		setisDisable(true);

		axios.post(`http://localhost:3000/api/v1/account/transfer?transferTo=${search.get('name')}`,{
			amount:`${Amount}`,
			note:`${note}`
		},
		{
			headers:{
				Authorization : `Bearer ${localStorage.getItem("token")}`
			}
		}).then((response)=>{
			console.log(response.data)
			navigate(`/AfterMsg?amount=${Amount}&to=${search.get('name')}&note=${note}&time=${response.data.Time}`);
			setisDisable(false)
		})
	}
	
	return(
	<div className="flex justify-center items-center min-h-screen bg-gray-300">
		<div className="bg-white shadow-lg rounded-[20px] w-96 flex flex-col justify-center  mx-auto max-w-md gap-5 px-8 py-8">
			<div className="flex justify-center items-center">
			<p className="text-4xl font-bold text-black">
				Send Money
			</p>
			</div>
			
			<div className="flex flex-col justify-start items-start mt-16">
				<div className="flex justify-center gap-2">
			<div className="rounded-full bg-green-500 h-16 w-16 flex justify-center mt-1 mr-2 ">
					<p className="flex flex-col justify-center h-full text-3xl text-white">{alphabet}</p>
			</div>
			<div className="mt-4 font-bold text-lg">{Username}</div>
			</div>
			<div className="font-medium text-black mt-2">Amount</div>
			<input className="focus:outline-none focus:border-black border w-full rounded-md px-2 h-10" placeholder="Enter amount" type="number" onChange={(e)=>{
				setAmount(e.target.value);
			}}></input>
			<div className="font-medium text-black mt-2 flex gap-1">Note<p className=" text-slate-500 text-sm">(optional)</p></div>
			<input className="focus:outline-none focus:border-black border w-full rounded-md px-2 h-10" placeholder="Note..." type="text" onChange={(e)=>{
				setNote(e.target.value);
			}}></input>
			</div>
			
			<button className="bg-green-500 py-2 rounded-lg text-white cursor-pointer" onClick={handleClick} disabled={isDisable}> Transfer</button>
		</div>
	</div>
	)

}
