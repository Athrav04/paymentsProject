import downArrow from "../assets/icons/south_west_FILL0_wght400_GRAD0_opsz24.svg";
import sendArrow from  "../assets/icons/arrow_outward_FILL0_wght400_GRAD0_opsz24.svg"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionsCrad";
import { useRecoilValueLoadable , useRecoilValue } from "recoil";
import { currentUserSelector, userImage } from "../store/atoms/currentUser";


export default function Transactions(){
	const currentUser = useRecoilValueLoadable(currentUserSelector);
	const userImg = useRecoilValue(userImage);
	const [data,setData] = useState([]);
	const [isLoading,setIsLoading] = useState(true);
	const navigate = useNavigate()
	
	useEffect(()=>{
		axios.get("http://localhost:3000/api/v1/user/transactions",{
		headers:{
			Authorization : `Bearer ${localStorage.getItem('token')}`
		}
	}).then((response)=>{
		const data = response.data;
		 setData(data);
		 setIsLoading(false);

	}).catch((err)=>{
		console.log(`error in transactions page  ${err}`)
		 navigate('/Dashboard')
	})
	},[])

	return(
		<section className="flex flex-col flex-wrap justify-center items-start gap-5">
			<nav className="flex justify-between w-full shadow-md px-7 py-7">
			<p className="text-4xl font-bold text-black">Payments App</p>
			<div className="flex ">
				<p className="text-xl text-black font-medium h-full  mr-1">Hello, </p>
				<div className="rounded-full bg-slate-500 h-12 w-12 flex justify-center mr-2 ">
					<p className="flex flex-col justify-center h-full text-lg m-0">{userImg}</p>
				</div>
			</div>
		</nav>
		<h1 className="font-bold text-4xl">Transactions :</h1>
		<div className="w-full">
			{
				isLoading?
				<div className="w-full flex justify-center items-center mx-auto">
					<p className="text-xl font-bold text-black">Loading...</p>
				</div>
				:
				data.length != 0 ? ( 
					data.map((transaction,index)=><TransactionCard key={index} transaction={transaction} send={sendArrow} recieve={downArrow} currentUsername={currentUser.contents.username}/>)
				):(
					<div className="flex justify-center items-center min-h-full w-full">
						<p className="text-xl font-bold">No Transactions</p>	
					</div>
				)
			}
		</div>
		

		</section>
	)
}
