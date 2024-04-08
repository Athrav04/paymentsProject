import { Link } from "react-router-dom"
import { useState } from "react"
import eyeOffOutline from "../assets/icons/eyeOffOutline.svg"
import eyeOutline from "../assets/icons/eyeOutline.svg"

export default function SignUp(){
	const [show,setShow] = useState(false);
	function toShow(){
		setShow(!show);
	}
	return(
	<section className="flex justify-center items-center min-h-screen">
	<div className="flex shadow-lg px-8 py-8 rounded-[20px] flex-col justify-center flex-wrap mx-auto max-w-md items-center gap-2 ">
		<h1 className=" text-4xl text-black font-bold">Sign Up</h1>
		<p className=" text-slate-400 text-lg">Enter your information to create an account</p>
		<form className="flex flex-col justify-center items-start w-full mt-5 gap-2">
			<p className=" text-black text-lg">Username</p>
			<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2"></input>
			<p className=" text-black text-lg">First Name</p>
			<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2"></input>
			<p className=" text-black text-lg">Last Name</p>
			<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2"></input>
			<p className=" text-black text-lg">Email</p>
			<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2"></input>
			<p className=" text-black text-lg">Password</p>
			<div className="w-full relative flex jusitfy-center items-center">
				{show?<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" type="text"></input>:
				<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" type="password"></input>}
				<div className="absolute right-3">
					{show? <img src={eyeOutline} onClick={toShow} height={30} width={30}></img>:
					<img src={eyeOffOutline} onClick={toShow} height={30} width={30}></img>}
					
				</div>
				</div>
			
			
		</form>
		<button type="submit" className=" bg-black px-2 py-2 w-full rounded-lg text-white text-lg mt-2">Sign Up</button>
		<p className=" text-lg text-black">Already have a account? <Link to='/SignIn' className=" underline decoration-solid">Login</Link></p>
	</div>
	</section>
	)
	}
