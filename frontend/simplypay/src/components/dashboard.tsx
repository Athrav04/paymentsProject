import UserCard from "../miniComponents/UserCard";
import Contacts from "../miniComponents/Contacts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect , useRef, useState} from "react";


export default function Dashboard(props){
	const [Users,setUsers] = useState([]);
	const [filter , setFilter] = useState("");
	const navigate = useNavigate();
	const [userBalance,setUserBalance] = useState(0);
	const [alphabet,setAlphabet] = useState("U");
 

	useEffect(()=>{
		 axios.get("http://localhost:3000/api/v1/user/me",{
			headers : {
				Authorization : `Bearer ${localStorage.getItem("token")}`
			}
		 }
		 ).then((response)=>{
			const user = response.data;
			if(user.length == 0){
				navigate('/SignIn');
			}
			setAlphabet(user.username.charAt(0).toUpperCase());

			axios.get("http://localhost:3000/api/v1/account/balance",{
				headers : {
					Authorization : `Bearer ${localStorage.getItem("token")}`
				}
			}).then((res)=>{
				setUserBalance(res.data.Balance)
			}).catch((e)=>{
				console.log(`Some error while fetching balance ${e}`);
			})


		 }).catch((err)=>{
			console.log(err);
			navigate("/SignUp");
		 })
	},[])

	let timeout = useRef();
	function debounce(callBack,delay=1000){
		 timeout;
		return function (){
			clearTimeout(timeout.current);
			timeout.current = setTimeout(()=>{
				callBack()
			},delay);
		}
	}

	const fetchUser = debounce( ()=>{
		 axios.get("http://localhost:3000/api/v1/user/getAll?filter="+filter,{
			headers : {
				Authorization : `Bearer ${localStorage.getItem("token")}`
			}
		}).then((res)=>{
			setUsers(res.data);
			if(res.data.Users == 0){
				setUsers([]);
			}
		})
	},1000)
	useEffect(()=>{
		fetchUser();
	},[filter])

	return (
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
		<p className="ml-7 mt-2 text-2xl font-bold text-black w-full">Your Balance ,  ₹{userBalance}</p>
		<div className="min-w-full"> 
		<UserCard onChange={(e)=>{
			setFilter(e.target.value);
		}}/>
		</div>
		<div className="w-full">

			{Users.length != 0 ? (Users.map((user)=><Contacts key={user._id} user={user} toTransactions={()=>{navigate('/Transactions')}} onClick={()=>{navigate(`/Send?name=${user.username}`)}}/>)):(
				<div className="flex justify-center items-center">
					<p className="text-xl font-medium text-black">No Users found...</p>
				</div>

			)}
		</div>
		
	</section>
	)

}
