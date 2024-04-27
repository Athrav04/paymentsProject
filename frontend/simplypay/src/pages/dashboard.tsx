import UserCard from "../components/UserCard";
import Contacts from "../components/Contacts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect , useRef, useState} from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {currentUserSelector, userImage, userBalance } from "../store/atoms/currentUser";
import Button from "../components/Button";


export default function Dashboard(props){

	const logged_in_user = useRecoilValueLoadable(currentUserSelector);
	const [Filter , setFilter] = useState('');
	const [Users,setUsers] = useState([]);
	const [loading,setLoading] = useState(true);
	const navigate = useNavigate();
	const alphabet = useRecoilValue(userImage);
	const balance =  useRecoilValue(userBalance);

	useEffect(()=>{
		if(logged_in_user.contents == false){
			console.log(`redirecting you to signIn cause no token found or token malformed(expired)`);
			alert(`You were logged out , Please login again to continue`);
			navigate('/SignIn');
		}
	
	})


	let timeout = useRef();//To preserve the value of timeout across renders


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
		 axios.get("http://localhost:3000/api/v1/user/getAll?filter="+Filter,{
			headers : {
				Authorization : `Bearer ${localStorage.getItem("token")}`
			}
		}).then((res)=>{
			setUsers(res.data);
			setLoading(false);
			if(res.data.Users == 0){
				setUsers([]);
			}
		})
	},1000)

	
	useEffect(()=>{
		fetchUser();

	},[Filter])


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
		<p className="ml-7 mt-2 text-2xl font-bold text-black w-full">Your Balance ,  ${balance}</p>
		<div className="w-40 ml-7">
		<Button text={'Transactions'} onClick={()=>navigate('/transactions')} isDisabled={false}/>
		</div>
		<div className="min-w-full"> 
		<UserCard onChange={(e)=>{
			setFilter(e.target.value);
		}}/>
		</div>
		<div className="w-full">

			{
			loading? (<div className="flex justify-center items-center min-h-screen w-full">
				Loading...
			</div>):
					Users.length != 0 ? (Users.map((user)=><Contacts key={user._id} user={user} onClick={()=>{navigate(`/Send?name=${user.username}`)}}/>)):(
						
						<div className="flex justify-center items-center">
							<p className="text-xl font-medium text-black">No Users found...</p>
						</div>)
				
				
			}
		</div>
		
	</section>
	)

}
