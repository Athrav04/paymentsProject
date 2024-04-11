import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

import eyeOffOutline from "../assets/icons/eyeOffOutline.svg"
import eyeOutline from "../assets/icons/eyeOutline.svg"
import Button from "./Button"


export default function SingIn(){
	const navigate = useNavigate();
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
			<p className=" text-slate-400 text-lg">Enter your credentials to access your account</p>
			<form className="flex flex-col justify-center items-start w-full mt-5 gap-2">
				<p className=" text-black text-lg">username</p>
				<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" placeholder="John1234" onChange={(e)=>{
					setUsername(e.target.value);
					console.log(username);
				}}></input>
				<p className="  text-black text-lg">Email</p>
				<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" placeholder="John@gmail.com" onChange={(e)=>{
					setemail(e.target.value);
					console.log(email);
				}}></input>
				<p className=" text-black text-lg">Password</p>
				<div className="w-full relative flex jusitfy-center items-center">
				{show?<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" type="text" placeholder="12345" onChange={(e)=>{
					setPassword(e.target.value);
					console.log(password);
				}}></input>:
				<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" type="password" placeholder="12345" onChange={(e)=>{
					setPassword(e.target.value);
					console.log(password);
				}}></input>}
				<div className="absolute right-3">
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
				console.log(response.data.token)
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

