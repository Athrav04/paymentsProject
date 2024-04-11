import UserCard from "./UserCard";
import Contacts from "./Contacts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect , useState} from "react";


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

	useEffect(()=>{
		axios.get("http://localhost:3000/api/v1/user/getAll?filter="+filter,{
			headers : {
				Authorization : `Bearer ${localStorage.getItem("token")}`
			}
		}).then((res)=>{
			console.log(res.data);
			setUsers(res.data);
		})
	},[filter])

	return (
	<section className="flex flex-col flex-wrap justify-center items-start gap-5">
		<nav className="flex justify-between w-full shadow-md px-7 py-7">
			<p className="text-4xl font-bold text-black">Payments App</p>
			<div className="flex ">
				<p className="text-xl text-black font-medium h-full mt-3 mr-1">Hello, </p>
				<div className="rounded-full bg-slate-500 h-12 w-12 flex justify-center mt-1 mr-2 ">
					<p className="flex flex-col justify-center h-full text-lg">{alphabet}</p>
				</div>
			</div>
		</nav>
		<p className="ml-7 mt-2 text-2xl font-bold text-black w-full">Your Balance ,  Rs.{userBalance}</p>
		<div className="min-w-full"> 
		<UserCard onChange={(e)=>{
			setFilter(e.target.value);
		}}/>
		</div>
		<div className="w-full ml-7">

			{Users.map((user)=><Contacts key={user._id} user={user}/>)}
		</div>
		
	</section>
	)

}
