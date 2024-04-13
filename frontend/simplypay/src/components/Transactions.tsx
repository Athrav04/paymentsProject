import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Transactions(){
	const navigate = useNavigate()
	axios.get("http://localhost:3000/api/v1/user/transactions",{
		headers:{
			Authorization : `Bearer ${localStorage.getItem('token')}`
		}
	}).then((response)=>{
		const transactions = response.data.transactions;

		console.log(`transactions data form BE is ${response.data.Transactions}`)
	}).catch((err)=>{
		console.log(`error here ${err}`)
		 navigate('/Dashboard')
	})

	const alphabet = 'U';
	return(
		<section className="flex flex-col flex-wrap justify-center items-start gap-5">
			<nav className="flex justify-between w-full shadow-md px-7 py-7">
			<p className="text-4xl font-bold text-black">Payments App</p>
			<div className="flex ">
				<p className="text-xl text-black font-medium h-full  mr-1">Hello, </p>
				<div className="rounded-full bg-slate-500 h-12 w-12 flex justify-center mr-2 ">
					<p className="flex flex-col justify-center h-full text-lg m-0">{alphabet}</p>
				</div>
			</div>
		</nav>
		<p className="text-4xl font-bold ml-7">Transactions :</p>
		
		</section>
	)
}
