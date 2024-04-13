import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import eyeOffOutline from "../assets/icons/eyeOffOutline.svg"
import eyeOutline from "../assets/icons/eyeOutline.svg"
import Button from "../miniComponents/Button"


export default function SingIn(){
	const navigate = useNavigate();
	const [isLoggedIn,setIsLoggedIn] = useState(false);


	useEffect(()=>{
		axios.get("http://localhost:3000/api/v1/user/me",{
		headers:{
			Authorization :`Bearer ${localStorage.getItem('token')}`
		}
	}).then(()=>{
		setIsLoggedIn(true);
	}).catch((err)=>{
		setIsLoggedIn(false);
	})

	},[]);

	if(isLoggedIn){
		navigate('/Dashboard')
	}
	
	const [loading,setLoading] = useState(false);
	const [show,setShow] = useState(false);
	const [username,setUsername] = useState("");
	const [email,setemail] = useState("");
	const [password,setPassword] = useState("");
	function toShow(){
		setShow(!show);
	}

	return (
		<section className="flex justify-center items-center min-h-screen bg-gray-300">
		<div className="bg-white flex shadow px-8 py-8 rounded-[20px] flex-col justify-center flex-wrap mx-auto max-w-md items-center gap-2 ">
			<h1 className=" text-4xl text-black font-bold">Sign In</h1>
			<p className=" text-slate-400 text-lg m-0">Enter your credentials to access your account</p>
			<form className="flex flex-col justify-center items-start w-full mt-5 gap-2">
				<p className=" text-black text-lg m-0">username</p>
				<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" placeholder="John1234" onChange={(e)=>{
					setUsername(e.target.value);
					console.log(username);
				}}></input>
				<p className="  text-black text-lg m-0">Email</p>
				<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" placeholder="John@gmail.com" onChange={(e)=>{
					setemail(e.target.value);
					console.log(email);
				}}></input>
				<p className=" text-black text-lg m-0">Password</p>
				<div className="w-full relative flex jusitfy-center items-center">
				{show?<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md min-w-full h-9 px-2 " type="text" placeholder="Password" onChange={(e)=>{
					setPassword(e.target.value);

				}}></input>:
				<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md min-w-full h-9 px-2" type="password" placeholder="Password" onChange={(e)=>{
					setPassword(e.target.value);

				}}></input>}
				<div className="absolute right-1">
					{show? <img src={eyeOutline} onClick={toShow} height={30} width={30}></img>:
					<img src={eyeOffOutline} onClick={toShow} height={30} width={30}></img>}
					
				</div>
				</div>
			</form>
			<Button onClick={async()=>{
				setLoading(true);
				const response = await axios.post("http://localhost:3000/api/v1/user/signIn",{
					username,
					password
				})
				setLoading(false);
				if(response.data.token){
				localStorage.setItem("token",response.data.token);
				console.log(localStorage.getItem("token"));
				}
				else{
					console.log('error occured');
				}
				console.log(`Sign In response ${response}`);
				if(response.status == 200){
					navigate('/Dashboard');
				}
			}} text="Sign In" isDisabled={loading} />
			<p className=" text-lg text-black">Don't have an Account? <Link to='/SignUp' className=" underline decoration-solid">Create Account</Link></p>
		</div>
		</section>
	)
}

